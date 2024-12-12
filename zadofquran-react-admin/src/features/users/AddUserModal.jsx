import React from "react";
import MyModal from "../../ui/MyModal";
import UserForm from "./UserForm";
import Button from "../../ui/Button";
const AddUserModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditUser">
                <Button>اضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="اضافة طالب جديد" name="createEditUser">
                <UserForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddUserModal;
