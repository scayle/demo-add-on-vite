export type ProductStatus = 'blocked' | 'problem' | 'live';

export type Product = {
    id: number;
    product_id: number;
    name: string,
    merchant: string;
    status: ProductStatus;
    image_hash: string;
    stock: { stockCount: string; variantCount: number; }
};
