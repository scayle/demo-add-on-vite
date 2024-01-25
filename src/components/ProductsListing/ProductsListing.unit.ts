/**
 * External dependencies.
 */
import { mount } from '@vue/test-utils';
import { it, describe, expect } from 'vitest';

/**
 * Internal dependencies.
 */
import ProductsListing from './ProductsListing.vue';

describe('ProductsListing.vue', () => {
    it('can be render', () => {
        const wrapper = mount(ProductsListing);

        expect(wrapper.find('.spinner').exists()).toBeTruthy();
    });
});
