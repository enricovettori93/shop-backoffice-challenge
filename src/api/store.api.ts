import {Store} from "../models";
import betterFetch from "../helpers/fetch.ts";
import {StoreDetailResponse, StoreListResponse} from "../models";

interface StoreApiInterface {
    getAll(): Promise<StoreListResponse>
    getOne(id: Store["id"]): Promise<StoreDetailResponse>
}

class StoreApi implements StoreApiInterface {
    async getAll(): Promise<StoreListResponse> {
        return await betterFetch<StoreListResponse>("/api/stores");
    }

    async getOne(id: Store["id"]): Promise<StoreDetailResponse> {
        return await betterFetch<StoreDetailResponse>(`/api/stores/${id}`);
    }
}

export default new StoreApi();
