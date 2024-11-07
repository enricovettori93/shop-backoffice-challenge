import {createBrowserRouter} from "react-router-dom";
import StoreDetail from "./routes/store-detail";
import ProductDetail from "./routes/product-detail";
import ROUTES from "./routes.ts";
import Layout from "./layout";
import StoreList from "./routes/store-list";

const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <StoreList />,
            },
            {
                path: ROUTES.STORE_DETAIL,
                element: <StoreDetail />,
            },
            {
                path: ROUTES.PRODUCT_DETAIL,
                element: <ProductDetail />,
            },
        ],
    },
]);

export default router;
