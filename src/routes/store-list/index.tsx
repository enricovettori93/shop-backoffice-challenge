import {useQuery} from "@tanstack/react-query";
import StoreApi from "../../api/store.api.ts";
import {Link} from "react-router-dom";
import ROUTES from "../../routes.ts";
import ListLoader from "../../components/list-loader";
import Card, {CardComposition} from "../../components/card";

const StoreList = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["stores"],
        queryFn: StoreApi.getAll
    });

    if (error) {
        return <div>Errore nel caricamento degli shop {error.message}</div>;
    }

    if (isLoading) {
        return <ListLoader />;
    }

    return (
        <div>
            <h2 className="text-2xl">Seleziona lo store da gestire</h2>
            <ul>
                {data?.map((store) => (
                    <li className="mt-2" key={store.data.name}>
                        <Link to={ROUTES.STORE_DETAIL.replace(":storeId", store.id || "")}>
                            <Card>
                                <CardComposition.Title>
                                    {store.data.name}
                                </CardComposition.Title>
                            </Card>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StoreList;
