import {Link, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import productApi from "../../api/product.api.ts";
import {useContext} from "react";
import {ModalContext} from "../../context/modal.context.tsx";
import DeleteProductModal from "./components/delete-product-modal";
import toast from 'react-hot-toast';
import ROUTES from "../../routes.ts";
import {FaTrashAlt} from 'react-icons/fa';

const ProductDetail = () => {
    const {storeId, productId} = useParams();
    const navigate = useNavigate();
    const {showModal, removeModal} = useContext(ModalContext);

    const {data, isPending, error} = useQuery({
        queryKey: ["store", storeId, "product", productId],
        queryFn: () => productApi.getOne(storeId, productId),
    });

    const {mutateAsync} = useMutation({
        mutationFn: ({storeId, productId}) => productApi.delete(storeId, productId),
        onSuccess: () => {
            toast("Prodotto cancellato");
            removeModal();
            navigate(`/${storeId}`);
        },
        onError: (error) => toast.error(error.message || "Errore durante la cancellazione del prodotto"),
    });

    const handleDelete = async () => {
        await mutateAsync({storeId, productId});
    }

    const showDeleteModal = () => {
        showModal(<DeleteProductModal onCancel={removeModal} onConfirm={handleDelete}/>);
    }

    if (error) {
        return <div>Errore nel dettaglio del prodotto {error.message}</div>
    }

    return (
        <div className="flex flex-col">
            <div>
                <Link to={ROUTES.STORE_DETAIL.replace(":storeId", storeId || "")}> ⬅️ Torna al dettaglio dello
                    shop</Link>
            </div>
            <h2 className="text-2xl mt-10">Dettaglio del prodotto</h2>
            <button className="button--danger button-fab" onClick={showDeleteModal}>
                <FaTrashAlt/>
            </button>
            {JSON.stringify(data)}
        </div>
    );
};

export default ProductDetail;
