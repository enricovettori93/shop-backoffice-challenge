import {Employe} from "./employe.ts";
import {ApiListResponse} from "./api.ts";

export interface Store {
    name: string
    category: string
    employees: Employe[]
}

export type StoreListResponse = ApiListResponse<Store>[]
export type StoreDetailResponse = Store
