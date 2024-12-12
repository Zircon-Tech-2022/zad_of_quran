import React from "react";
import MyModal from "../../ui/MyModal";
import FaqForm from "./FaqForm";
import Button from "../../ui/Button";
const AddFaqModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEdit">
                <Button>اضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="اضافة سؤال جديد" name="createEdit">
                <FaqForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddFaqModal;
