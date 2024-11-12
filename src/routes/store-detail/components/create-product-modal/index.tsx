import Modal from "../../../../components/modal";
import {useContext} from "react";
import {ModalContext} from "../../../../context/modal.context.tsx";
import {CreateProductBody} from "../../../../models";
import InputWrapper from "../../../../components/inputs/input-wrapper";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProductSchema} from "../../../../helpers/validators.ts";

interface props {
    onConfirm: (data: CreateProductBody) => void
    onCancel: () => void
}

const CreateProductModal = ({onCancel, onConfirm}: props) => {
    const {removeModal} = useContext(ModalContext);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm<CreateProductBody>({
        resolver: zodResolver(ProductSchema)
    });

    const submitForm: SubmitHandler<CreateProductBody> = (payload) => {
        onConfirm(payload);
    }

    return (
        <Modal.Container closeModal={removeModal}>
            <form onSubmit={handleSubmit(submitForm)}>
                <Modal.Title>
                    Crea un nuovo prodotto
                </Modal.Title>
                <Modal.Content>
                    <InputWrapper error={errors.title}>
                        <label htmlFor="title">Nome</label>
                        <input id="title" type="text" {...register("title")}/>
                    </InputWrapper>
                    <InputWrapper error={errors.category}>
                        <label htmlFor="category">Categoria</label>
                        <input id="category" type="text" {...register("category")}/>
                    </InputWrapper>
                    <InputWrapper error={errors.employee}>
                        <label htmlFor="employee">Impiegato</label>
                        <input id="employee" type="text" {...register("employee")}/>
                    </InputWrapper>
                    <InputWrapper error={errors.price}>
                        <label htmlFor="price">Prezzo</label>
                        <input id="price" type="number" step="0.1" {...register("price", {valueAsNumber: true})}/>
                    </InputWrapper>
                    <InputWrapper error={errors.reviews}>
                        <label htmlFor="reviews">Recensioni (separate da virgola)</label>
                        <input id="reviews" type="text" {...register("reviews")}/>
                    </InputWrapper>
                    <InputWrapper error={errors.description}>
                        <label htmlFor="description">Descrizione</label>
                        <textarea id="description" cols={1} rows={3} {...register("description")}></textarea>
                    </InputWrapper>

                </Modal.Content>
                <Modal.Actions>
                    <button onClick={onCancel} className="button--info">
                        Annulla
                    </button>
                    <button type="submit" className="button--danger">
                        Conferma
                    </button>
                </Modal.Actions>
            </form>
        </Modal.Container>
    );
};

export default CreateProductModal;
