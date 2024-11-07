import {Product, ProductListResponse} from "../../../../models";
import {Link, useParams} from "react-router-dom";
import ROUTES from "../../../../routes.ts";

interface detailProps {
    id: Product["id"]
    product: Product
}

const Detail = ({id: productId, product}: detailProps) => {
    const {storeId} = useParams();
    return (
        <Link to={ROUTES.PRODUCT_DETAIL.replace(":storeId", storeId || "").replace(":productId", productId)}>
            {product.title}
        </Link>
    )
}

interface listProps {
    className?: string
    products: ProductListResponse
}

const ProductList = ({className = "", products}: listProps) => {
    return (
        <div className={className}>
            {
                products.length === 0 && <h2 className="text-2xl">Non sono presenti prodotti</h2>
            }
            {
                products.length > 0 && (
                    <>
                        <h2 className="text-2xl">Sono presenti i seguenti prodotti</h2>
                        <ul>
                            {products.map((product) => (
                                <li key={product.id}>
                                    <Detail id={product.id} product={product.data}/>
                                </li>
                            ))}
                        </ul>
                    </>
                )
            }
        </div>
    );
};

export default ProductList;
