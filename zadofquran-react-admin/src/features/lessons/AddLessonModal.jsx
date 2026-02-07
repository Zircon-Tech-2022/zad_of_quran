import MyModal from "../../ui/MyModal";
import LessonForm from "./LessonForm";
import Button from "../../ui/Button";
const AddLessonModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditLesson">
                <Button>إضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="إضافة حلقة جديدة" name="createEditLesson">
                <LessonForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddLessonModal;
