/**
 * External dependencies.
 */
import { shallowMount } from '@vue/test-utils';
import { it, describe, expect } from 'vitest';

/**
 * Internal dependencies.
 */
import ProductsListing from './ProductsListing.vue';

describe('ProductsListing.vue', () => {
    it('can be render', () => {
        const wrapper = shallowMount(ProductsListing);

        expect(wrapper.find('.products-listing').exists()).toBeTruthy();
    });
});
