import type { Plugin } from 'vite';
import MagicString from 'magic-string';

export const generateWindowKeyFromAddon = (addOnId: string) => {
    let normalizedAddOnId = addOnId
        .replace('-', '_')
        .replace(' ', '_')

    return `__VITE_ADDON_EVENT_${normalizedAddOnId}__`;
}

const windowGlobalEventHandlerCode = (addOnId: string) => {
    const windowKey = generateWindowKeyFromAddon(addOnId);
    const windowObj = `window['${windowKey}']`;

    return `
        const initWindowGlobalHandler = () => {
            if (${windowObj}) {
                return;
            }

            ${windowObj} = {
                listeners: [],
                listen(callback) {
                    this.listeners.push(callback);
                },
                async trigger() {
                    try {
                        for (const callback of this.listeners) {
                            callback();
                        }
                    } catch (e) {
                        // do nothing if an error happens
                    }
                }
            };
        };
        initWindowGlobalHandler();

        onBeforeMount(() => ${windowObj}?.trigger());
    `;
};

const getSetupFunctionIndex = (code: string) => {
    const regex = /(setup\(.*\)\s*\{)/;
    const found = regex.exec(code);

    if (!found?.[0]) {
        return;
    }

    return found.index + found?.[0].length;
}

const getBeforeMountImportIndex = (code: string) => {
    const regex = /import\s*(\{).*from\s*'vue';/;
    const found = regex.exec(code);

    if (!found?.[0]) {
        return;
    }

    if (found?.[0].includes('onBeforeMount')) {
        return;
    }

    return found.index + found[0].search('{') + 1;
}

export default function aboutYouAddonLoader({
    addOnId
}: { addOnId: string }): Plugin {
    return {
        enforce: 'pre',

        name: 'about-you-global-window-event-loader',

        transform(code, id) {
            if (!/App\.vue($|\?)/.test(id)) {
                return;
            }

            if (id.includes('type=style') || id.includes('type=script')) {
                return;
            }

            const setupFunctionStartIndex = getSetupFunctionIndex(code);
            const onBeforeMountImportIndex = getBeforeMountImportIndex(code);

            if (!setupFunctionStartIndex) {
                throw new Error('App.vue does not have a setup method! Please add a setup method.');
            }

            const newCode = new MagicString(code)

            newCode.appendLeft(setupFunctionStartIndex, windowGlobalEventHandlerCode(addOnId));

            if (onBeforeMountImportIndex) {
                newCode.appendLeft(onBeforeMountImportIndex, 'onBeforeMount, ')
            }

            return { code: newCode.toString()};
        }
    };
}
