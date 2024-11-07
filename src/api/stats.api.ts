import {StatsCategories, Store} from "../models";
import betterFetch from "../helpers/fetch.ts";
import {StoreDetailResponse, StoreListResponse} from "../models";

interface StatsApiInterface {
    getStoreStats(id: Store["id"]): Promise<StatsCategories[]>
}

class StoreApi implements StatsApiInterface {
    async getStoreStats(id: Store["id"]): Promise<StatsCategories[]> {
        return await betterFetch<StatsCategories[]>(`/api/stores/${id}/stats/categories`);
    }
}

export default new StoreApi();
