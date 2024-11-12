import {StatsCategories} from "../models";
import betterFetch from "../helpers/fetch.ts";
import {StoreDetailResponse, StoreListResponse} from "../models";

interface StoreApiInterface {
    getAll(): Promise<StoreListResponse>
    getOne(id: string): Promise<StoreDetailResponse>
    getStats(id: string): Promise<StatsCategories[]>
}

class StoreApi implements StoreApiInterface {
    async getAll(): Promise<StoreListResponse> {
        return await betterFetch<StoreListResponse>("/api/stores");
    }

    async getOne(id: string): Promise<StoreDetailResponse> {
        return await betterFetch<StoreDetailResponse>(`/api/stores/${id}`);
    }

    async getStats(id: string): Promise<StatsCategories[]> {
        return await betterFetch<StatsCategories[]>(`/api/stores/${id}/stats/categories`);
    }
}

export default new StoreApi();
