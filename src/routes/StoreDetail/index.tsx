import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import StoreApi from "../../api/store.api.ts";

const StoreDetail = () => {
    const { storeId } = useParams();

    const {data, error} = useQuery({
        queryKey: ["store", storeId],
        queryFn: () => StoreApi.getOne(storeId),
    });

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};

export default StoreDetail;
