import {useQuery} from "@tanstack/react-query";
import StoreApi from "../../api/store.api.ts";
import {Link} from "react-router-dom";

const StoreList = () => {
    const {data, error} = useQuery({
        queryKey: ["stores"],
        queryFn: () => StoreApi.getAll()
    });

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <div>
            {data?.map((store) => (
                <Link key={store.data.name} to={`/${store.id}`}>{store.data.name}</Link>
            ))}
        </div>
    );
};

export default StoreList;
