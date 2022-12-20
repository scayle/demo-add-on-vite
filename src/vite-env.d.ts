import type { AddOnCustomProps } from '@scayle/add-on-utils';

/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// TODO: Could this be added to the add-on-utils and added automatically?
// How does vue-router do it?
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $addOn: AddOnCustomProps
    }
}
