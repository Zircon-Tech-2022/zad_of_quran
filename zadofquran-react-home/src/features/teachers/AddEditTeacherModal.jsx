import MyModal from "../../ui/MyModal";
import TeacherForm from "./TeacherForm";
const AddEditTeacherModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditTeacher">
                <button>إضافة مدرس</button>
            </MyModal.Open>

            <MyModal.Window title="إضافة مدرس جديد" name="createEditTeacher">
                <TeacherForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddEditTeacherModal;
