import {Product, Store} from "../models";
import betterFetch from "../helpers/fetch.ts";
import {CreateProductBody, ProductDetailResponse, ProductListResponse} from "../models";

interface ProductApiInterface {
    getAll(storeId: Store["id"]): Promise<ProductListResponse>
    getOne(storeId: Store["id"], productId: Product["id"]): Promise<ProductDetailResponse>
    create(storeId: Store["id"], product: CreateProductBody): Promise<string>
    delete(storeId: Store["id"], productId: Product["id"]): Promise<string>
}

class ProductApi implements ProductApiInterface {
    async getAll(storeId: Store["id"]): Promise<ProductListResponse> {
        return await betterFetch<ProductListResponse>(`/api/stores/${storeId}/products`);
    }

    async getOne(storeId: Store["id"], productId: Store["id"]): Promise<ProductDetailResponse> {
        return await betterFetch<ProductDetailResponse>(`/api/stores/${storeId}/products/${productId}`);
    }

    async create(storeId: Store["id"], product: CreateProductBody): Promise<string> {
        return await betterFetch<string>(`/api/stores/${storeId}/products`, {
            method: "POST",
            body: JSON.stringify(product),
        });
    }

    async delete(storeId: Store["id"], productId: Product["id"]): Promise<string> {
        return await betterFetch<string>(`/api/stores/${storeId}/products/${productId}`, {
            method: "DELETE",
        });
    }
}

export default new ProductApi();
