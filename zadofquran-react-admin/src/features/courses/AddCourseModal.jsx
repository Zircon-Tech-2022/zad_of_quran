import React from "react";
import MyModal from "../../ui/MyModal";
import CourseForm from "./CourseForm";
import Button from "../../ui/Button";
const AddCourseModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditCourse">
                <Button>إضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="إضافة دورة جديد" name="createEditCourse">
                <CourseForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddCourseModal;
