import MyModal from "../../ui/MyModal";
import TeacherForm from "./TeacherForm";
import Button from "../../ui/Button";
const AddTeacherModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditTeacher">
                <Button>إضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="إضافة مدرس جديد" name="createEditTeacher">
                <TeacherForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddTeacherModal;
