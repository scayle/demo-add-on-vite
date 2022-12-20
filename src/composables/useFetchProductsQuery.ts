/**
 * External dependencies.
 */
import { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

/**
 * Internal dependencies.
 */
import { startTimeout, wrapInRef } from '@/utils';
import { ProductsData } from '@/types/ProductsData';

export type ProductsFilters = {
    name?: string;
};

export type ProductsPaginationData = {
    total: number;
    lastPage: number;
    currentPage: number;
    hasNextPage: boolean;
    products: ProductsData[];
};

export type UseFetchProductsQueryOptions = {
    page?: Ref<number>;
    perPage?: Ref<number>;
    filters?: Ref<ProductsFilters>;
};

export default function useFetchProductsQuery({ perPage, page, filters }: UseFetchProductsQueryOptions = {}) {
    page = wrapInRef(page, 1);
    perPage = wrapInRef(perPage, 15);
    filters = wrapInRef<ProductsFilters>(filters, {});

    const {
        isLoading,
        isFetching,
        data
    } = useQuery<ProductsPaginationData>(['products', filters, page, perPage], async () => {
        await startTimeout(1000);

        let products = (await import('@/mocks/products.json')).default.data;

        if (filters?.value?.name) {
            products = products.filter(product => product.name.includes(filters?.value?.name));
        }

        const total = products.length;

        if (total <= perPage.value) {
            return {
                total,
                products,
                hasNextPage: false,
                lastPage: page.value,
                currentPage: page.value,
            };
        }

        const start = (page.value - 1) * perPage.value
        const end = (page.value * perPage.value) + 1;

        products = products.slice(start, end);

        return {
            total,
            products,
            hasNextPage: end < total,
            lastPage: page.value,
            currentPage: page.value,
        };
    }, { keepPreviousData: true });

    return {
        isLoading,
        isFetching,
        pagination: data,
    };
}
