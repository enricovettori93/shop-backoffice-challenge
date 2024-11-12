import {Product, ProductListResponse} from "../../../../models";
import {Link, useParams} from "react-router-dom";
import ROUTES from "../../../../routes.ts";
import {useState} from "react";
import {InputWrapper} from "../../../../components/inputs";
import classNames from "classnames";
import Card, {CardComposition} from "../../../../components/card";

interface detailProps {
    id: string
    product: Product
    className?: string
}

const Detail = ({id: productId, product, className = ""}: detailProps) => {
    const {storeId} = useParams();

    const cardClasses = classNames({
        "flex flex-col gap-2": true,
        [className]: true
    });

    return (
        <Link to={ROUTES.PRODUCT_DETAIL.replace(":storeId", storeId || "").replace(":productId", productId)}>
            <Card className={cardClasses}>
                <CardComposition.Title className="font-semibold space-x-2">
                    <span>{product!.title}</span>
                    <span className="text-green-600">{product!.price}€</span>
                </CardComposition.Title>
                <CardComposition.Content>
                    <div className="text-ellipsis overflow-hidden line-clamp-3">
                        <span>{product.description}</span>
                    </div>
                    <div className="font-semibold mt-auto">
                        <span>Sono presenti: {product.reviews.length} recensioni</span>
                    </div>
                </CardComposition.Content>
            </Card>
        </Link>
    )
}

interface listProps {
    className?: string
    products: ProductListResponse
}

type view = "grid" | "list"

const ProductList = ({className = "", products}: listProps) => {
    const [view, setView] = useState<view>("list");

    const ulClasses = classNames({
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3": view === "grid",
        "flex flex-col gap-3": view === "list",
    });

    if (products.length === 0) return <h2 className="text-2xl">Non sono presenti prodotti</h2>;

    return (
        <div className={className}>
            <div className="flex justify-between">
                <h2 className="text-2xl mt-4">Sono presenti i seguenti prodotti</h2>
                <InputWrapper className="min-h-0 mt-1">
                    <div className="flex flex-row gap-2">
                        <label className="order-last" htmlFor="view-type">Visualizza come lista</label>
                        <input id="view-type" type="checkbox" checked={view === "list"}
                               onChange={() => setView(view === "list" ? "grid" : "list")}/>
                    </div>
                </InputWrapper>
            </div>
            <div className={ulClasses}>
                {products.map((product) => (
                    <div key={product.id}>
                        <Detail id={product.id} product={product.data} className={view === "grid" ? "h-80" : ""}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
