import { inject, InjectionKey } from 'vue';
import { AddOnCustomProps } from '@scayle/add-on-utils';

export const ADDON_PROPERTIES_KEY: InjectionKey<AddOnCustomProps> = Symbol('addonPropertiesKey');

export default function useAddonProperties() {
    return inject(ADDON_PROPERTIES_KEY);
}
