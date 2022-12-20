/**
 * External dependencies.
 */
import { useQuery } from '@tanstack/vue-query';

/**
 * Internal dependencies.
 */
import { startTimeout } from '@/utils';

export default function useFetchTopProductsQuery() {
    const {
        data,
        isLoading,
    } = useQuery<any>(['top-products'], async () => {
        await startTimeout(1000);
        const { default: products } = await import('@/mocks/top-products.json');

        return products;
    });

    return {
        isLoading,
        products: data,
    }
}
