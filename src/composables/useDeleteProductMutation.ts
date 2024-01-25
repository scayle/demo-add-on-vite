/**
 * Internal dependencies.
 */
import { Product } from '@/types/Product';
import useDeleteProductsMutation from '@/composables/useDeleteProductsMutation';

export default function useDeleteProductMutation() {
    const { deleteProducts, ...rest } = useDeleteProductsMutation();
    const deleteProduct = (id: Product['id']) => deleteProducts([id]);

    return {
        ...rest,
        deleteProduct
    };
}
