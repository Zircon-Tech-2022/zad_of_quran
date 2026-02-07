import MyModal from "../../ui/MyModal";
import UserForm from "./UserForm";
import Button from "../../ui/Button";
const AddUserModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditUser">
                <Button>إضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="إضافة طالب جديد" name="createEditUser">
                <UserForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddUserModal;
