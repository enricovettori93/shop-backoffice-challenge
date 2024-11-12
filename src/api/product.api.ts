import betterFetch from "../helpers/fetch.ts";
import {CreateProductBody, ProductDetailResponse, ProductListResponse} from "../models";

interface ProductApiInterface {
    getAll(storeId: string): Promise<ProductListResponse>
    getOne(storeId: string, productId: string): Promise<ProductDetailResponse>
    create(storeId: string, product: CreateProductBody): Promise<string>
    delete(storeId: string, productId: string): Promise<string>
}

class ProductApi implements ProductApiInterface {
    async getAll(storeId: string): Promise<ProductListResponse> {
        return await betterFetch<ProductListResponse>(`/api/stores/${storeId}/products`);
    }

    async getOne(storeId: string, productId: string): Promise<ProductDetailResponse> {
        return await betterFetch<ProductDetailResponse>(`/api/stores/${storeId}/products/${productId}`);
    }

    async create(storeId: string, product: CreateProductBody): Promise<string> {
        return await betterFetch<string>(`/api/stores/${storeId}/products`, {
            method: "POST",
            body: JSON.stringify(product),
        });
    }

    async delete(storeId: string, productId: string): Promise<string> {
        return await betterFetch<string>(`/api/stores/${storeId}/products/${productId}`, {
            method: "DELETE",
        });
    }
}

export default new ProductApi();
