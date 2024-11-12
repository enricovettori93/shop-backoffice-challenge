import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import React, {Suspense} from 'react';
import {Link, useParams} from "react-router-dom";
import StoreApi from "../../api/store.api.ts";
import ProductApi from "../../api/product.api.ts";
import ProductList from "./components/product-list";
import ListLoader from "../../components/list-loader";
import {useContext} from "react";
import {ModalContext} from "../../context/modal.context.tsx";
import CreateProductModal from "./components/create-product-modal";
import {CreateProductBody} from "../../models";
import toast from "react-hot-toast";
import ROUTES from "../../routes.ts";
import StoreInfo from "./components/store-info";
import {FaPlus, FaDeezer, FaAngleLeft} from "react-icons/fa";

const ChartStatsModal = React.lazy(() => import("./components/chart-stats-modal"));

const StoreDetail = () => {
    const {storeId} = useParams();
    const {showModal, removeModal} = useContext(ModalContext);
    const queryClient = useQueryClient();

    const {data: shopDetail, error, isPending: isPendingStore} = useQuery({
        queryKey: ["store", storeId],
        queryFn: () => StoreApi.getOne(storeId!),
    });

    const {data: products, isPending: isPendingProducts} = useQuery({
        queryKey: ["products", storeId],
        queryFn: () => ProductApi.getAll(storeId!),
    });

    const {data: stats} = useQuery({
        queryKey: ["store", storeId, "stats"],
        queryFn: () => StoreApi.getStats(storeId!),
    });

    const {mutateAsync} = useMutation({
        mutationFn: async (data: CreateProductBody) => ProductApi.create(storeId!, data),
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

    const showChart = () => {
        showModal(
            <Suspense>
                <ChartStatsModal closeModal={removeModal} stats={stats || []}/>
            </Suspense>
        )
    }

    if (isPendingStore) return <ListLoader/>;

    if (error) return <div>Errore nel dettaglio dello shop {error.message}</div>;

    return (
        <>
            <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between">
                <h2 className="text-2xl order-last md:order-1">Stai gestendo lo shop <span
                    className="font-bold">{shopDetail?.name}</span>
                </h2>
                <Link to={ROUTES.HOME} className="flex items-center md:order-2 underline">
                    <FaAngleLeft/>&nbsp;Torna alla lista degli shop
                </Link>
            </div>
            <StoreInfo store={shopDetail!}/>
            {isPendingProducts ? <ListLoader/> : <ProductList products={products!}/>}
            <button className="button--info flex flex-row items-center mt-10" onClick={showChart} aria-label="Visualizza il grafico">
                <FaDeezer className="mr-2"/>
                Visualizza il grafico
            </button>
            <button className="button--primary button-fab" onClick={showAddProductModal} aria-label="Aggiugnere un prodotto">
                <FaPlus/>
            </button>
        </>
    );
};

export default StoreDetail;
