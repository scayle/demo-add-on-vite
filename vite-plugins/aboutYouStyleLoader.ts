import path from 'path';
import { nanoid } from 'nanoid';
import type { Plugin, ResolvedConfig } from 'vite';
import { generateWindowKeyFromAddon } from './aboutYouGlobalWindowEventLoader';

const commonjsProxyRE = /\?commonjs-proxy/;
const SPECIAL_QUERY_RE = /[?&](?:worker|sharedworker|raw|url)\b/

export type AboutYouStyleLoaderOptions = {
    external?: string[],
    attributes?: Record<string, string>,
    shadowDomContainerSelector?: string;
    addOnId: string;
};

export const generateCSSModuleCode = ({
        css,
        mode,
        command,
        moduleId,
        addOnId,
        attributes = {},
        shouldExport = true,
        destroyOnHotReload = false,
        shouldInjectImmediately = false,
        shadowDomContainerSelector = '.single-spa-container',
    }: {
        css: string;
        mode: string;
        moduleId: string;
        command: 'build' | 'serve'
        shouldExport?: boolean;
        destroyOnHotReload?: boolean; // destroy previous style tag, when hot reload on module ocurrs
        shouldInjectImmediately?: boolean;
        addOnId: AboutYouStyleLoaderOptions['addOnId'];
        attributes?: AboutYouStyleLoaderOptions['attributes'];
        shadowDomContainerSelector?: AboutYouStyleLoaderOptions['shadowDomContainerSelector'];
    }
) => {
    // when we have shadow dom container selector
    // replace :root in css with that container
    // to define variables for elements inside the shadow DOM
    if (shadowDomContainerSelector) {
        css = css.replace(/:root/gi, shadowDomContainerSelector);
    }
    let hmrCode = '';
    let hmrDocumentCode = '';

    if (command === 'serve') {
        if (destroyOnHotReload) {
            hmrCode = `
                import.meta.hot.accept((module) => {
                    styleDocument.destroy();
                });
            `;
        } else {
            hmrCode = `
                import.meta.hot.accept((module) => {
                    styleDocument.update(module.default.cssContent);
                    styleDocument.updateId(module.default.id);
                });
            `;
        }

        hmrDocumentCode = `
            id: id,
            updateId(newId) {
                const oldId = id;
                id = newId;

                const parent = getParent();
                const element = parent.querySelector('#' + escapeCSSSelector(oldId));

                if (!element) {
                    console.log('[ADDON_VITE_HMR] Element not found with id: ' + oldId);
                    return;
                }

                element.setAttribute('id', newId);
            },
            cssContent: ${css},
        `;
    }
    let styleId = `style-${nanoid()}`;

    if (mode === 'development') {
        const fileName = path.basename(moduleId);
        styleId += '-' + fileName;
    }

    let injectCode = '';

    if (shouldInjectImmediately) {
        const windowKey = generateWindowKeyFromAddon(addOnId);
        injectCode += `
            styleDocument.use();

            window['${windowKey}']?.listen(() => styleDocument.use());
        `;
    }

    return `
        const escapeCSSSelector = (selector) => {
            if (!window.CSS) {
                return selector;
            }

            return CSS.escape(selector);
        };
        const initDocumentCreation = () => {
            let id = '${styleId}';

            const getParent = () => {
                let parent = document.querySelector('head');
                const shadowRoot = document.querySelector('.single-spa-shadow-dom-container')?.shadowRoot;

                if (shadowRoot) {
                    parent = shadowRoot.querySelector('.single-spa-container');
                }

                return parent;
            }

            return {
                use() {
                    const parent = getParent();
                    let element = parent.querySelector('#' + escapeCSSSelector(id));

                    // set the direction of the parent if it is not set
                    if (!parent?.getAttribute('dir')) {
                        const dir = document.querySelector('[dir]').getAttribute('dir') || 'ltr';
                        parent.setAttribute('dir', dir);
                    }

                    if (element && element?.sheet) {
                        element.sheet.disabled = false;

                        return;
                    }

                    element = document.createElement('style');
                    element.setAttribute('id', id);
                    ${
                    Object.keys(attributes)
                        .map((key) => `element.setAttribute('${key}', '${attributes[key]}');`)
                        .join('\n')
                    }
                    element.appendChild(document.createTextNode(${css}));

                    parent.appendChild(element);
                },
                unuse() {
                    const parent = getParent();
                    const element = parent.querySelector('#' + escapeCSSSelector(id));

                    if (!element || !element?.sheet) {
                        return;
                    }

                    element.sheet.disabled = true;
                },
                destroy() {
                    const parent = getParent();
                    const element = parent.querySelector('#' + escapeCSSSelector(id));

                    if (!element || !element?.sheet) {
                        return;
                    }

                    element.parentElement.removeChild(element);
                },
                update(newCssContent) {
                    const parent = getParent();
                    let element = parent.querySelector('#' + escapeCSSSelector(id));

                    if (!element) {
                        return;
                    }

                    element.innerHTML = '';
                    element.appendChild(document.createTextNode(newCssContent));
                },
                ${hmrDocumentCode}
            }
        };

        const styleDocument = initDocumentCreation();

        ${hmrCode}

        ${injectCode}

        ${shouldExport ? 'export default styleDocument;' : ''}
    `;
};

// There are not vite plugins that support features similar to webpack's `style-loader`
// @link: https://github.com/vitejs/vite/issues/4222
export default function aboutYouStyleLoader({
    addOnId,
    external = [],
    attributes = {},
    shadowDomContainerSelector = '.single-spa-container',
}: Partial<AboutYouStyleLoaderOptions> = {}): Plugin {
    let resolvedConfig: ResolvedConfig;

    return {
        enforce: 'post',

        name: 'aboutyou-style-loader',

        configResolved(config) {
            resolvedConfig = config;

            config.plugins.forEach((plugin) => {
                if (plugin.name === 'vite:css-post') {
                    delete plugin['renderChunk'];

                    const oldPluginTransform = plugin.transform as Function;
                    plugin.transform = (css, id, options) => {
                        // add inline
                        // to css files on serve mode
                        // so that we do not transform the code in vite:css-post plugin
                        if (config.command === 'serve') {
                            id = id + '?inline';
                        } else {
                            let isExternalPackage = false;
                            for (const externalPackage of external) {
                                // external packages are always under node_modules
                                if (id.includes('node_modules/' + externalPackage)) {
                                    isExternalPackage = true;
                                }
                            }

                            // add used id to external css packages
                            if (isExternalPackage) {
                                id = id + '?used';
                            }
                        }


                        return oldPluginTransform(css, id, options);
                    }
                }

                return plugin;
            });

        },

        transform(code, id) {
            // Checks retrieved from vite css plugin
            // @link: https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/css.ts#L348

            if (
                !/\.css($|\?)/.test(id) ||
                /type=style/.test(id) ||
                commonjsProxyRE.test(id) ||
                SPECIAL_QUERY_RE.test(id)
            ) {
                return
            }

            let cssContents = JSON.stringify(code);
            cssContents = cssContents.replace('export default ', '');
            cssContents = JSON.parse(cssContents);

            let isExternalPackage = false;
            for (const externalPackage of external) {
                // external packages are always under node_modules
                if (id.includes('node_modules/' + externalPackage)) {
                    isExternalPackage = true;
                }
            }

            return {
                code: generateCSSModuleCode({
                    attributes,
                    addOnId,
                    moduleId: id,
                    css: cssContents,
                    mode: resolvedConfig.mode,
                    shadowDomContainerSelector,
                    command: resolvedConfig.command,
                    shouldInjectImmediately: isExternalPackage,
                }),
            };
        }
    };
}
