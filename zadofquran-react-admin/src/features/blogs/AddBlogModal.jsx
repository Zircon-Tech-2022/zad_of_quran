import MyModal from "../../ui/MyModal";
import BlogForm from "./BlogForm";
import Button from "../../ui/Button";
const AddBlogModal = () => {
    return (
        <MyModal>
            <MyModal.Open opens="createEditBlog">
                <Button>إضافة +</Button>
            </MyModal.Open>

            <MyModal.Window title="إضافة تدوينة جديدة" name="createEditBlog">
                <BlogForm />
            </MyModal.Window>
        </MyModal>
    );
};

export default AddBlogModal;
