import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Link, useParams} from "react-router-dom";
import StoreApi from "../../api/store.api.ts";
import ProductApi from "../../api/product.api.ts";
import ProductList from "./components/product-list";
import ListLoader from "../../components/list-loader";
import {useContext} from "react";
import {ModalContext} from "../../context/modal.context.tsx";
import CreateProductModal from "./components/create-product-modal";
import {CreateProductBody, Store} from "../../models";
import toast from "react-hot-toast";
import ROUTES from "../../routes.ts";
import StoreInfo from "./components/store-info";
import {FaPlus} from "react-icons/fa";

const StoreDetail = () => {
    const {storeId} = useParams();
    const {showModal, removeModal} = useContext(ModalContext);
    const queryClient = useQueryClient();

    const {data: shopDetail, error, isPending: isPendingStore} = useQuery({
        queryKey: ["store", storeId],
        queryFn: () => StoreApi.getOne(storeId),
    });

    const {data: products, isPending: isPendingProducts} = useQuery({
        queryKey: ["products", storeId],
        queryFn: () => ProductApi.getAll(storeId),
    });

    const {mutateAsync} = useMutation({
        mutationFn: (data: CreateProductBody) => ProductApi.create(storeId, data),
        onSuccess: async () => {
            removeModal();
            toast.success("Prodotto aggiunto");
            await queryClient.invalidateQueries({queryKey: ["products", storeId]})
        },
        onError: (error) => toast.error(error.message || "Errore durante l'aggiunta del prodotto"),
    });

    const showAddProductModal = () => {
        showModal(<CreateProductModal onCancel={removeModal} onConfirm={mutateAsync}/>);
    }

    if (isPendingStore) {
        return (
            <div>
                Sto caricando i dettagli dello shop...
                <ListLoader/>
            </div>
        );
    }

    if (error) {
        return <div>Errore nel dettaglio dello shop {error.message}</div>;
    }

    return (
        <div>
            <div>
                <Link to={ROUTES.HOME}> ⬅️ Torna alla lista degli shop</Link>
            </div>
            <h2 className="text-2xl mt-10">Stai gestendo lo shop <span className="font-bold">{shopDetail?.name}</span>
            </h2>
            <StoreInfo store={shopDetail as Store}/>
            {isPendingProducts && <ListLoader/>}
            <ProductList products={products || []} className="mt-4"/>
            <button className="button--primary button-fab" onClick={showAddProductModal}>
                <FaPlus/>
            </button>
        </div>
    );
};

export default StoreDetail;
