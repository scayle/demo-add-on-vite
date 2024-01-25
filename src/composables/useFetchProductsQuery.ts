/**
 * External dependencies.
 */
import { Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

/**
 * Internal dependencies.
 */
import { startTimeout, wrapInRef } from '@/utils';
import { Product, ProductStatus } from '@/types/Product';
import products from '@/mocks/products';

export type ProductsFilters = {
    search?: string,
    name?: string;
    status?: ProductStatus[];
};

export type ProductsPaginationData = {
    total: number;
    lastPage: number;
    currentPage: number;
    hasNextPage: boolean;
    products: Product[];
};

export type UseFetchProductsQueryOptions = {
    page?: Ref<number>;
    perPage?: Ref<number>;
    filters?: Ref<ProductsFilters>;
};

const applyFilters = (filters: ProductsFilters, data: Product[]) => {
    let localProducts = data;

    if (filters?.name) {
        localProducts = localProducts.filter(product => product.name.includes(filters.name as string));
    }

    if (filters?.search) {
        const search = filters.search;
        localProducts = localProducts.filter(
            product => product.name.includes(search) ||
                product.id?.toString() == search ||
                product.product_id?.toString() == search ||
                product.merchant?.includes(search)
        )
    }

    if (filters?.status?.length) {
        localProducts = localProducts.filter((product) => filters?.status?.includes(product.status));
    }

    return localProducts;
}

export default function useFetchProductsQuery({ perPage, page, filters }: UseFetchProductsQueryOptions = {}) {
    const localPage = wrapInRef(page, 1);
    const localPerPage = wrapInRef(perPage, 15);
    const localFilters = wrapInRef<ProductsFilters>(filters, {});

    const {
        isLoading,
        isFetching,
        data
    } = useQuery<ProductsPaginationData>(['products', localFilters, localPage, localPerPage], async () => {
        await startTimeout(1000);

        let localProducts = [...products()];

        if (localFilters?.value) {
            localProducts = applyFilters(localFilters.value, localProducts);
        }

        const total = localProducts.length;
        const skipPagination = total <= localPerPage.value;
        const shouldHavePagination = !skipPagination;
        let hasNextPage = false;

        if (shouldHavePagination) {
            const start = (localPage.value - 1) * localPerPage.value
            const end = localPage.value * localPerPage.value;

            localProducts = localProducts.slice(start, end);

            hasNextPage = end < total;
        }

        return {
            total,
            hasNextPage,
            products: localProducts,
            lastPage: localPage.value,
            currentPage: localPage.value,
        };
    }, { keepPreviousData: true });

    return {
        isLoading,
        isFetching,
        pagination: data,
    };
}
