import React, { useContext } from "react";
import MultiSelect from "../../ui/form/MultiSelect";
import MyInput from "../../ui/form/MyInput";
import { useCreateTeacher } from "./useCreateTeacher";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FileInput from "../../ui/form/FileInput";
import Editor from "../../ui/form/Editor";
import { useEditTeacher } from "./useEditTeacher";
import FilterSelect from "../../ui/form/FilterSelect";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const TeacherForm = (teacherToEdit = {}) => {
    const teacherData = teacherToEdit?.teacherToEdit;

    const isEditSession = Boolean(teacherData?.id);
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
        defaultValues: isEditSession ? teacherData : {},
    });

    const { isEditing, editTeacher } = useEditTeacher(setError);
    const { isCreating, createTeacher } = useCreateTeacher(setError);

    const isWorking = isCreating || isEditing;

    const { errors, isSubmitted } = formState;

    const { close } = useContext(ModalContext);
    console.log(teacherData);
    function onSubmit(data) {
        const image = typeof data.image === "string" ? null : data.image[0];

        if (isEditSession) {
            editTeacher(
                {
                    newTeacherData: {
                        ...data,
                        image: image,
                        phone: "",
                        email: "",
                    },
                    id: teacherData.id,
                },
                {
                    onSuccess: (data) => {
                        reset();
                        close?.();
                    },
                }
            );
        } else {
            const obj = { ...data, image: image, phone: "", email: "" };
            createTeacher(obj, {
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
                label="اسم المدرس"
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
                fieldName="حالة المعلم"
                id="locale"
                setFormValue={setValue}
                defaultValue={teacherData?.locale}
                error={errors?.locale}
                name="locale"
                control={control}
                myOptions={[
                    { value: "ar", title: "عرب" },
                    { value: "en", title: "اعاجم" },
                ]}
            />
            {/* <MyInput
                label="رقم الهاتف"
                id="phone"
                reg={{
                    ...register("phone", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.phone}
                disabled={isCreating}
            />
            <MyInput
                label="البريد الالكتروني"
                id="email"
                reg={{
                    ...register("email", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.email}
                disabled={isCreating}
            /> */}
            <div style={{ marginBottom: "3rem" }}>
                <Editor
                    control={control}
                    name="qualifications"
                    setValue={setValue}
                    isEditSession={isEditSession}
                    editValue={teacherData?.qualifications}
                    reg={{
                        ...register("qualifications", {
                            required: "يجب ادخال هذا الحقل",
                        }),
                    }}
                />
                <span style={{ color: "#d32f2f" }}>
                    {errors?.qualifications?.message}
                </span>
            </div>
            <div>
                <FileInput
                    id="image"
                    setValue={setValue}
                    accept="image/*"
                    reg={{
                        ...register("image", {
                            required: isEditSession ? false : "الصورة مطلوبة",
                        }),
                    }}
                    isSubmitted={isSubmitted}
                    getValues={getValues}
                />
                <span style={{ color: "#d32f2f" }}>
                    {errors?.image?.message}
                </span>
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

export default TeacherForm;
