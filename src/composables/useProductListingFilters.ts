/**
 * External dependencies.
 */

import { ref } from 'vue';

/**
 * Internal dependencies.
 */
import { ProductsFilters } from '@/composables/useFetchProductsQuery';

export default function useProductListingFilters() {
    const page = ref(1);
    const perPage = ref(30);
    const filters = ref<ProductsFilters>({});

    return {
        page,
        perPage,
        filters,
    }
}
