/**
 * External dependencies.
 */
// This script is run to set up the environment for the unit tests
// We want to mock the $addOn data in components and also provide
// fake local and session storage APIs
import Storage from 'dom-storage';
import { config } from '@vue/test-utils';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { AddOnPropsPlugin, mockCustomProps }  from '@scayle/add-on-utils';

/**
 * Internal dependencies.
 */
// @ts-ignore
import router from './src/router';

(global as any).localStorage = new Storage(null, { strict: true });
(global as any).sessionStorage = new Storage(null, { strict: true });

config.global.plugins = [
    [AddOnPropsPlugin, {customProps: mockCustomProps()}],
    [VueQueryPlugin],
    [router]
];
