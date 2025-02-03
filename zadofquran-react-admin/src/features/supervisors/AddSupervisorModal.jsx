import React from "react";
import MyModal from "../../ui/MyModal";
import SupervisorForm from "./SupervisorForm";
import Button from "../../ui/Button";
const AddSupervisorModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditSupervisor">
                <Button>إضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="إضافة مشرف جديد" name="createEditSupervisor">
                <SupervisorForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddSupervisorModal;
