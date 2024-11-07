import {useQuery} from "@tanstack/react-query";
import StoreApi from "../../api/store.api.ts";
import {Link} from "react-router-dom";
import ROUTES from "../../routes.ts";

const StoreList = () => {
    const {data, error} = useQuery({
        queryKey: ["stores"],
        queryFn: StoreApi.getAll
    });

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <div>
            <h2 className="text-2xl">Seleziona lo store da gestire</h2>
            <ul>
                {data?.map((store) => (
                    <li className="mt-2" key={store.data.name}>
                        <Link to={ROUTES.STORE_DETAIL.replace(":storeId", store.id || "")}>{store.data.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StoreList;
