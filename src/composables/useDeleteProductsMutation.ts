/**
 * External dependencies.
 */

import { useMutation, useQueryClient } from '@tanstack/vue-query';

/**
 * Internal dependencies.
 */
import { startTimeout } from '@/utils';
import { Product } from '@/types/Product';
import { replaceProducts, removeProducts } from '@/mocks/products';

export default function useDeleteProductsMutation() {
    const queryClient = useQueryClient();
    const {
        isLoading: isDeleting,
        mutateAsync: deleteProducts,
    } = useMutation({
        mutationFn: async (ids: (Product['id'])[]) => {
            await startTimeout(1000);

            removeProducts(ids);
        },
        onSuccess: () => {
            return queryClient.invalidateQueries(['products']);
        }
    });

    return {
        isDeleting,
        deleteProducts,
    };
}
