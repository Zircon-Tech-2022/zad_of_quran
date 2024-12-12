import React from "react";
import MyModal from "../../ui/MyModal";
import PlansForm from "./PlansForm";
import Button from "../../ui/Button";
const AddPlansModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEdit">
                <Button>اضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="اضافة خطة جديد" name="createEdit">
                <PlansForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddPlansModal;
