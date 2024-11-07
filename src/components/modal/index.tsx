import {ReactNode, useRef} from "react";
import classNames from "classnames";
import useEscListener from "../../hooks/useEscListener.ts";
import Card from "../card";
import {FaPlus} from 'react-icons/fa';

interface commonProps {
    children: ReactNode
    className?: string
}

const ModalTitle = ({children, className = ""}: commonProps) => {
    return (
        <div className={`modal__title text-xl font-semibold ${className}`}>{children}</div>
    )
}

const ModalContent = ({children, className = ""}: commonProps) => {
    return (
        <div className={`modal__content mt-5 ${className}`}>{children}</div>
    )
}

const ModalActions = ({children, className = ""}: commonProps) => {
    return (
        <div className={`modal__actions mt-5 flex justify-center gap-5 items-center ${className}`}>{children}</div>
    )
}

interface modalContainerProps extends commonProps {
    closeModal: () => void
}

const ModalContainer = ({children, closeModal = () => {}, className = ""}: modalContainerProps) => {
    const ref = useRef(null);
    const cardClasses = classNames({
        "relative transition-all": true,
        [className]: true
    });

    useEscListener(closeModal);

    return (
        <Card ref={ref} className={cardClasses}>
            <button onClick={closeModal} className="absolute top-0 right-0 flex flex-col rotate-45">
                <FaPlus />
            </button>
            {children}
        </Card>
    )
}

export default {
    Container: ModalContainer,
    Title: ModalTitle,
    Actions: ModalActions,
    Content: ModalContent
}
