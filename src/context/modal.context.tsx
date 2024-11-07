import {createContext, ReactNode, useEffect, useState} from "react";
import classNames from "classnames";

interface ModalContextInterface {
    modal: ReactNode | null
    showModal: (modal: ReactNode | null) => void
    removeModal: () => void
}

const initialState: ModalContextInterface = {
    modal: null,
    showModal: (modal) => {},
    removeModal: () => {}
}

export const ModalContext = createContext(initialState);

const ModalContextProvider = ({children}: {children: ReactNode}) => {
    const [modal, setModal] = useState<ReactNode | null>(null);

    useEffect(() => {
        document.querySelector("body")!.style.overflow = modal ? "hidden" : "initial";

        return (() => {
            document.querySelector("body")!.style.overflow = "initial";
        })
    }, [modal]);

    const showModal = (modal: ReactNode) => {
        setModal(modal);
    }

    const removeModal = () => {
        setModal(null);
    }

    const overlayClasses = classNames({
        "fixed w-screen h-screen flex items-center justify-center bg-black/50 transition-all top-0 bottom-0 z-40": true,
        "invisible opacity-0 pointer-events-none": !modal,
        "visible opacity-100": modal
    });

    const modalClasses = classNames({
        "modal-container relative": true,
        "w-52 h-0": !modal,
        "w-1/2 h-auto": modal
    });

    return (
        <ModalContext.Provider value={{modal, showModal, removeModal}}>
            {children}
            <div className={overlayClasses}>
                <div className={modalClasses}>{modal}</div>
            </div>
        </ModalContext.Provider>
    )
}

export default ModalContextProvider;
