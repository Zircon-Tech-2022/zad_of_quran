import React from "react";
import MyModal from "../../ui/MyModal";
import CourseForm from "./CourseForm";
import Button from "../../ui/Button";
const AddCourseModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditCourse">
                <Button>اضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="اضافة دورة جديد" name="createEditCourse">
                <CourseForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddCourseModal;
