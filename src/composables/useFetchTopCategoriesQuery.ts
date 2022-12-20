/**
 * External dependencies.
 */
import { useQuery } from '@tanstack/vue-query';

/**
 * Internal dependencies.
 */
import { startTimeout } from '@/utils';

export default function useFetchTopCategoriesQuery() {
    const {
        data,
        isLoading,
    } = useQuery<any>(['top-categories'], async () => {
        await startTimeout(2000);
        const { default: categories } = await import('@/mocks/top-categories.json');

        return categories;
    });

    return {
        isLoading,
        categories: data,
    }
}
