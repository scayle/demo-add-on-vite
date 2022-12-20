export type ProductsData = {
    id: number;
    product_id: number;
    name: string,
    merchant: string;
    brand?: string;
    status: string;
    image_hash: string;
    stock: { stockCount: string; variantCount: number; }
};
