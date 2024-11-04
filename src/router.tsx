import {createBrowserRouter} from "react-router-dom";
import StoreDetail from "./routes/StoreDetail";
import StoreList from "./routes/StoreList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <StoreList />,
    },
    {
        path: "/:storeId",
        element: <StoreDetail />,
    },
]);

export default router;
