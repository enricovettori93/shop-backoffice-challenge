import {Employe} from "./employe.ts";
import {Review} from "./review.ts";
import {ApiListResponse} from "./api.ts";

export interface Product {
    title: string
    category: string
    employee: Employe
    description: string
    reviews: Review[]
}

export type ProductListResponse = ApiListResponse<Product[]>
export type ProductDetailResponse = Product
export type CreateProductBody = Product
