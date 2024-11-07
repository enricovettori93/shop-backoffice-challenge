import Modal from "../../../../components/modal";
import {useContext} from "react";
import {ModalContext} from "../../../../context/modal.context.tsx";

interface props {
    onConfirm: () => void
    onCancel: () => void
}

const DeleteProductModal = ({onCancel, onConfirm}: props) => {
    const {removeModal} = useContext(ModalContext);
    return (
        <Modal.Container closeModal={removeModal}>
            <Modal.Title>
                Vuoi eliminare il prodotto?
            </Modal.Title>
            <Modal.Content>
                L'azione non può essere ripristinata.
            </Modal.Content>
            <Modal.Actions>
                <button onClick={onCancel} className="btn--secondary">Annulla</button>
                <button onClick={onConfirm} className="btn--danger">Conferma</button>
            </Modal.Actions>
        </Modal.Container>
    );
};

export default DeleteProductModal;
