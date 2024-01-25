/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */
import { Product } from '@/types/Product';

let products: Product[] = [];
/**
 * We assume we load the products, before any module uses it
 * Do not do this on production, use an API and do the requests on queries or mutations
 */
import('@/mocks/products.json').then((response) => replaceProducts(response.default.data as Product[]))

export const replaceProducts = (data: Product[]) => {
    products = [...data];

    return products;
}

export const removeProducts = (ids: (Product['id'])[]) => {
    return replaceProducts(
        products.filter(product => !ids.includes(product.id)),
    );
}

export default () => products;
