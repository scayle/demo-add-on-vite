/**
 * External dependencies.
 */
import { transform } from 'esbuild';
import MagicString from 'magic-string';
import type { Plugin, ResolvedConfig } from 'vite';

/**
 * Internal dependencies.
 */
import { AboutYouStyleLoaderOptions, generateCSSModuleCode } from './aboutYouStyleLoader';

export type AboutYouVueStyleLoaderOptions = Omit<AboutYouStyleLoaderOptions, 'external'> & {
    command: 'build' | 'serve',
};

// compile css with postcss only
const minifyCSS = async (code: string) => {
    const { code: css, warnings } = await transform(code, {
        loader: 'css',
        minify: true,
    })

    console.warn(warnings.join('\n'));

    return css;
};

// Since we are using shadow dom features
//
export default function aboutYouVueStyleLoader({
    attributes = {},
    command = 'build',
    shadowDomContainerSelector = '.single-spa-container',
}: Partial<AboutYouVueStyleLoaderOptions> = {}): Plugin {
    let resolvedConfig: ResolvedConfig;
    const styles: Map<string, string> = new Map<string, string>()
    const plugin: Plugin = {
        name: 'aboutyou-vue-style-loader',

        configResolved(config) {
            resolvedConfig = config;
        },

        // this is called both on build and serve
        transform(code, id) {
            if (!/type=style/.test(id)) {
                return;
            }

            styles.set(id, code);

            if (command === 'build') {
                return;
            }

            let cssContents = JSON.stringify(code);
            cssContents = cssContents.replace('export default ', '');
            cssContents = JSON.parse(cssContents);
            cssContents = generateCSSModuleCode({
                attributes,
                moduleId: '',
                css: cssContents,
                mode: resolvedConfig.mode,
                shadowDomContainerSelector,
                command: resolvedConfig.command,
                shouldInjectImmediately: true,
            });

            return { code: cssContents };
        },

        // this is only called on build
        async renderChunk(code, chunk) {
            let chunkCSS = ''

            const ids = Object.keys(chunk.modules)
            for (const id of ids) {
                if (styles.has(id)) {
                    chunkCSS += styles.get(id)
                }
            }

            if (!chunkCSS) {
                return null
            }


            // the legacy build should avoid inserting entry CSS modules here, they
            // will be collected into `chunk.viteMetadata.importedCss` and injected
            // later by the `'vite:build-html'` plugin into the `index.html`
            if (chunk.isEntry && !resolvedConfig.build.lib) {
                return null
            }
            chunkCSS = await minifyCSS(chunkCSS)
            const cssString = JSON.stringify(chunkCSS)
            // might have to support assert urls
            const injectCode = generateCSSModuleCode({
                attributes,
                moduleId: '',
                css: cssString,
                shouldExport: false,
                mode: resolvedConfig.mode,
                shadowDomContainerSelector,
                command: resolvedConfig.command,
                shouldInjectImmediately: true,
            });
            const wrapIdx = code.indexOf('System.register')
            const insertMark = '\'use strict\';'
            const insertIdx = code.indexOf(insertMark, wrapIdx)
            const s = new MagicString(code)
            s.appendLeft(insertIdx + insertMark.length, injectCode)

            return { code: s.toString() }
        }
    };

    if (command === 'serve') {
        plugin.enforce = 'post';
    }

    return plugin;
}

