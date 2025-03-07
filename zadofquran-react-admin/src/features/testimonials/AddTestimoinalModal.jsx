import React from "react";
import MyModal from "../../ui/MyModal";
import TestimoinalForm from "./TestimoinalForm";
import Button from "../../ui/Button";
const AddTestimoinalModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEdit">
                <Button>إضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="إضافة رأي جديد" name="createEdit">
                <TestimoinalForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddTestimoinalModal;
