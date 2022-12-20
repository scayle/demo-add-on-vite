import { h, createApp } from 'vue';
import type { App } from 'vue';

import type { AddOnCustomProps } from '@scayle/add-on-utils';

import singleSpaVue from '@scayle/single-spa-vue';

import { initVuePlugins } from '@/vue-bootstrap';
import RootApp from './App.vue';


const vueLifecycles = singleSpaVue<AddOnCustomProps, App>({
    createApp,
    shadow: import.meta.env.PANEL_USE_SHADOW_DOM === 'true',
    appOptions: {
        render() {
            return h(RootApp);
        },
        el: '#app',
    },
    handleInstance(instance, props) {
        initVuePlugins(instance, { addonCustomProps: props });
    },
});

export const { bootstrap, mount, unmount } = vueLifecycles;
