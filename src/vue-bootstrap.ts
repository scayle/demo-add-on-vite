/**
 * External dependencies.
 */
import ScayleComponents from '@scayle/components';
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';
import { AddOnCustomProps, AddOnPropsPlugin, mockCustomProps } from '@scayle/add-on-utils';

/**
 * Internal dependencies.
 */
import { App } from 'vue';
import { minutesToMilliseconds } from '@/utils';
import { ADDON_PROPERTIES_KEY } from '@/composables/useAddonProperties';
import router from './router';

export type InitVuePluginsOptions = {
    addonCustomProps?: AddOnCustomProps,
};

export const initVuePlugins = (instance: App<Element>, {
    addonCustomProps
}: InitVuePluginsOptions = {}) => {
    instance
        // Add fake add-on custom props when in standalone mode
        .use(AddOnPropsPlugin, {customProps: addonCustomProps || mockCustomProps()})
        .use(router)
        .use(ScayleComponents)
        .use(VueQueryPlugin, {
            queryClientConfig: {
                defaultOptions: {
                    queries: {
                        refetchOnMount: false, // do not refetch queries on mount
                        staleTime: minutesToMilliseconds(1)
                    }
                }
            }
        } as VueQueryPluginOptions);

    instance.provide(ADDON_PROPERTIES_KEY, instance.config.globalProperties.$addOn);
}
