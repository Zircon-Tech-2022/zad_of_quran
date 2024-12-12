import React from "react";
import MyModal from "../../ui/MyModal";
import BlogForm from "./BlogForm";
import Button from "../../ui/Button";
const AddBlogModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditBlog">
                <Button>اضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="اضافة تدوينة جديدة" name="createEditBlog">
                <BlogForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddBlogModal;
