<template>
  <div class="container mx-auto flex flex-col h-full">
    <router-view />
  </div>
</template>

<script lang="ts">
/**
 * External dependencies.
 */
import { defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';
import componentStyles from '@scayle/components/dist/style.css';

/**
 * Internal dependencies.
 */
import appStyles from './app.css';

export default defineComponent({
    name: 'App',

    setup() {
        const mountStyle = (styleSheet: { use: () => void } | string) => {
            // the css is an object only when shadow dom is enabled
            if (typeof styleSheet !== 'object') {
                return;
            }

            styleSheet.use();
        };
        const unmountStyle = (styleSheet: { unuse: () => void } | string) => {
            // the css is an object only when shadow dom is enabled
            if (typeof styleSheet !== 'object') {
                return;
            }

            styleSheet.unuse();
        };
        onBeforeMount(() => {
            mountStyle(componentStyles);
            mountStyle(appStyles);
        });

        onBeforeUnmount(() => {
            unmountStyle(componentStyles);
            unmountStyle(appStyles);
        });
    },
});
</script>
