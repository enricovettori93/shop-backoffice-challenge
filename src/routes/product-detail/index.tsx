import {Link, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import productApi from "../../api/product.api.ts";
import React, {useContext} from "react";
import {ModalContext} from "../../context/modal.context.tsx";
import DeleteProductModal from "./components/delete-product-modal";
import toast from 'react-hot-toast';
import ROUTES from "../../routes.ts";
import {FaAngleLeft, FaTrashAlt} from 'react-icons/fa';

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
            <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
                <h2 className="text-2xl order-last md:order-1">Dettaglio del prodotto</h2>
                <Link to={ROUTES.STORE_DETAIL.replace(":storeId", storeId || "")} className="flex items-center md:order-2 underline">
                    <FaAngleLeft/>&nbsp;Torna al dettaglio dello shop
                </Link>
            </div>
            <button className="button--danger button-fab" onClick={showDeleteModal}>
                <FaTrashAlt/>
            </button>
            {JSON.stringify(data)}
        </div>
    );
};

export default ProductDetail;
