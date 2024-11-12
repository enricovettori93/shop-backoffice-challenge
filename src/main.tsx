import {createRoot} from 'react-dom/client'
import './index.css'
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query"
import ModalContextProvider from "./context/modal.context.tsx";
import 'react-loading-skeleton/dist/skeleton.css';
import router from "./router.tsx";
import {RouterProvider} from "react-router-dom";
import toast from "react-hot-toast";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, meta: any) => {
            toast.error(meta.errorMessage || error.message || "Errore");
        }
    }),
});

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
            <RouterProvider router={router}/>
        </ModalContextProvider>
    </QueryClientProvider>
)
