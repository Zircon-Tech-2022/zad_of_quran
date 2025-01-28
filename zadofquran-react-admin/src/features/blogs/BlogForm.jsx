import React, { useContext } from "react";
import MultiSelect from "../../ui/form/MultiSelect";
import MyInput from "../../ui/form/MyInput";
import { useCreateBlog } from "./useCreateBlog";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FileInput from "../../ui/form/FileInput";
import Editor from "../../ui/form/Editor";
import { useEditBlog } from "./useEditBlog";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const BlogForm = (blogToEdit = {}) => {
    const blogData = blogToEdit?.blogToEdit;

    const isEditSession = Boolean(blogData?.id);
    const {
        register,
        handleSubmit,
        reset,
        formState,
        control,
        getValues,
        setError,
        setValue,
    } = useForm({
        defaultValues: isEditSession ? blogData : {},
    });
    const { isEditing, editBlog } = useEditBlog(setError);
    const { isCreating, createBlog } = useCreateBlog(setError);

    const isWorking = isCreating || isEditing;

    const { errors, isSubmitted } = formState;
    const { close } = useContext(ModalContext);
    function onSubmit(data) {
        const image =
            typeof data.image === "string" ? null : data.image[0] || "";

        if (isEditSession) {
            editBlog(
                {
                    newBlogData: { ...data, image: image },
                    id: blogData.id,
                },
                {
                    onSuccess: (data) => {
                        reset();
                        close?.();
                    },
                }
            );
        } else {
            const obj = { ...data, image: image };
            createBlog(obj, {
                onSuccess: (data) => {
                    reset();
                    close();
                },
            });
        }
    }

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                label="العنوان"
                id="title"
                reg={{
                    ...register("title", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.title}
                disabled={isWorking}
            />
            <MyInput
                label="الوصف"
                id="description"
                reg={{
                    ...register("description", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.description}
                disabled={isWorking}
            />
            <MultiSelect
                fieldName="حالة المدونة"
                id="locale"
                setFormValue={setValue}
                defaultValue={blogData?.locale}
                error={errors?.locale}
                name="locale"
                control={control}
                myOptions={[
                    { value: "ar", title: "عرب" },
                    { value: "en", title: "اعاجم" },
                ]}
            />
            <div>
                {/* <Textarea
                    name="content"
                    setValue={setValue}
                    isEditSession={isEditSession}
                    editValue={blogData?.content}
                    placeholder="الاجابة"
                    {...register("content", {
                        required: "يجب ادخال هذا الحقل",
                    })}
                ></Textarea> */}
                <Editor
                    control={control}
                    name="content"
                    setValue={setValue}
                    isEditSession={isEditSession}
                    editValue={blogData?.content}
                    reg={{
                        ...register("content", {
                            required: "يجب ادخال هذا الحقل",
                        }),
                    }}
                />
                <span style={{ color: "#d32f2f" }}>
                    {errors?.content?.message}
                </span>
            </div>

            <div>
                <FileInput
                    id="image"
                    setValue={setValue}
                    accept="image/*"
                    reg={{
                        ...register("image", {}),
                    }}
                    isSubmitted={isSubmitted}
                    getValues={getValues}
                />
            </div>
            <MyModal.Footer>
                <Button
                    disabled={isWorking}
                    style={{
                        background: isWorking ? "var(--color-grey-300)" : "",
                    }}
                    type="submit"
                >
                    حفظ
                </Button>
                <Button onClick={close} variation="third" type="button">
                    الغاء
                </Button>
            </MyModal.Footer>
        </FormStyle>
    );
};

export default BlogForm;
