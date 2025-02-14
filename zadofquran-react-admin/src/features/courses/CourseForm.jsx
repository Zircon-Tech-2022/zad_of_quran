import React, { useContext } from "react";
import MultiSelect from "../../ui/form/MultiSelect";
import MyInput from "../../ui/form/MyInput";
import { useCreateCourse } from "./useCreateCourse";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FileInput from "../../ui/form/FileInput";
import { Textarea } from "../../ui/form/Textarea";
import Editor from "../../ui/form/Editor";
import { useEditCourse } from "./useEditCourse";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const CourseForm = (courseToEdit = {}) => {
    const courseData = courseToEdit?.courseToEdit;

    const isEditSession = Boolean(courseData?.id);
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
        defaultValues: isEditSession ? courseData : {},
    });
    const { isEditing, editCourse } = useEditCourse(setError);
    const { isCreating, createCourse } = useCreateCourse(setError);

    const isWorking = isCreating || isEditing;

    const { errors, isSubmitted } = formState;

    const { close } = useContext(ModalContext);
    function onSubmit(data) {
        const image =
            typeof data.image === "string" ? null : data.image[0] || "";

        if (isEditSession) {
            editCourse(
                {
                    newCourseData: { ...data, image: image },
                    id: courseData.id,
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
            createCourse(obj, {
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
                label="اسم الدورة"
                id="name"
                reg={{
                    ...register("name", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.name}
                disabled={isCreating}
            />
            <MultiSelect
                fieldName="حالة الكورس"
                id="locale"
                setFormValue={setValue}
                defaultValue={courseData?.locale}
                error={errors?.locale}
                name="locale"
                control={control}
                myOptions={[
                    { value: "ar", title: "عرب" },
                    { value: "en", title: "اعاجم" },
                ]}
            />
            <div>
                <Textarea
                    name="description"
                    setValue={setValue}
                    isEditSession={isEditSession}
                    editValue={courseData?.description}
                    placeholder="الاجابة"
                    {...register("description")}
                ></Textarea>
                <span style={{ color: "#d32f2f" }}>
                    {errors?.description?.message}
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
                    disabled={isCreating}
                    style={{
                        background: isCreating ? "var(--color-grey-300)" : "",
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

export default CourseForm;
