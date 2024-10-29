import React from "react";
import MyModal from "../../ui/MyModal";
import TeacherForm from "./TeacherForm";
const AddEditTeacherModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditTeacher">
                <button>اضافة مدرس</button>
            </MyModal.Open>

            <MyModal.Window title="اضافة مدرس جديد" name="createEditTeacher">
                <TeacherForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddEditTeacherModal;
