import {Link, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import productApi from "../../api/product.api.ts";
import {useContext} from "react";
import {ModalContext} from "../../context/modal.context.tsx";
import DeleteProductModal from "./components/delete-product-modal";
import toast from 'react-hot-toast';
import ROUTES from "../../routes.ts";
import {FaAngleLeft, FaTrashAlt} from 'react-icons/fa';
import ListLoader from "../../components/list-loader";
import Card, {CardComposition} from "../../components/card";

const ProductDetail = () => {
    const {storeId, productId} = useParams();
    const navigate = useNavigate();
    const {showModal, removeModal} = useContext(ModalContext);

    const {data, isPending, error} = useQuery({
        queryKey: ["store", storeId, "product", productId],
        queryFn: () => productApi.getOne(storeId!, productId!),
    });

    const {mutateAsync} = useMutation({
        mutationFn: async ({storeId, productId}: { storeId: string, productId: string }) => productApi.delete(storeId, productId),
        onSuccess: () => {
            toast("Prodotto cancellato con successo");
            removeModal();
            navigate(`/${storeId}`);
        },
        onError: (error) => toast.error(error.message || "Errore durante la cancellazione del prodotto"),
    });

    const handleDelete = async () => {
        await mutateAsync({storeId: storeId!, productId: productId!});
    }

    const showDeleteModal = () => {
        showModal(<DeleteProductModal onCancel={removeModal} onConfirm={handleDelete}/>);
    }

    if (error) return <div>Errore nel caricamento del dettaglio del prodotto {error.message}</div>;

    if (isPending) return <ListLoader/>;

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-end">
                    <Link to={ROUTES.STORE_DETAIL.replace(":storeId", storeId || "")}
                          className="flex items-center underline">
                        <FaAngleLeft/>&nbsp;Torna al dettaglio dello shop
                    </Link>
                </div>
                <Card>
                    <CardComposition.Title>
                        <h2 className="text-2xl font-semibold text-gray-800 flex gap-3">
                            {data!.title}
                            <span className="font-semibold text-green-600">{data!.price}€</span>
                        </h2>
                    </CardComposition.Title>
                    <CardComposition.Content>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <span className="font-bold">Impiegato:</span>
                                <span className="text-gray-600">{data!.employee}</span>
                            </div>

                            <div className="flex gap-3">
                                <span className="font-bold">Categoria:</span>
                                <span className="text-gray-600">{data!.category}</span>
                            </div>

                            <div className="flex gap-3">
                                <span className="font-bold">Descrizione:</span>
                                <span className="text-gray-600">{data!.description}</span>
                            </div>

                            <div>
                                <p className="font-bold">{data!.reviews.length} Recensioni</p>
                                <ul className="space-y-3 overflow-y-auto mt-2">
                                    {data!.reviews.map((review, index) => (
                                        <li key={index} className="bg-gray-50 p-2 rounded-md shadow">
                                            <p className="text-sm font-medium text-gray-800">{review}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </CardComposition.Content>
                </Card>
            </div>
            <button className="button--danger button-fab" onClick={showDeleteModal}>
                <FaTrashAlt/>
            </button>
        </>
    )
};

export default ProductDetail;
