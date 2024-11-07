import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import ModalContextProvider from "./context/modal.context.tsx";
import 'react-loading-skeleton/dist/skeleton.css';
import router from "./router.tsx";
import {RouterProvider} from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ModalContextProvider>
                <RouterProvider router={router}/>
            </ModalContextProvider>
        </QueryClientProvider>
    </StrictMode>,
)
