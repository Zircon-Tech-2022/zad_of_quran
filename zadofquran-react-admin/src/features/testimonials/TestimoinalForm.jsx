import React, { useContext } from "react";
import MyInput from "../../ui/form/MyInput";
import { useCreateTestimoinal } from "./useCreateTestimoinal";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEditTestimoinal } from "./useEditTestimoinal";
import { Textarea } from "../../ui/form/Textarea";
import MultiSelect from "../../ui/form/MultiSelect";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const TestimoinalForm = (testimoinalToEdit = {}) => {
    const testimoinalData = testimoinalToEdit?.testimoinalToEdit;

    const isEditSession = Boolean(testimoinalData?.id);
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
        defaultValues: isEditSession ? testimoinalData : {},
    });

    const { isEditing, editTestimoinal } = useEditTestimoinal(setError);
    const { isCreating, createTestimoinal } = useCreateTestimoinal(setError);

    const isWorking = isCreating || isEditing;

    const { errors, isSubmitted } = formState;

    const { close } = useContext(ModalContext);

    function onSubmit(data) {
        if (isEditSession) {
            editTestimoinal(
                {
                    newTestimoinalData: { ...data },
                    id: testimoinalData.id,
                },
                {
                    onSuccess: (data) => {
                        reset();
                        close?.();
                    },
                }
            );
        } else {
            const obj = { ...data };
            createTestimoinal(obj, {
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
                label="اسم الشخص"
                id="name"
                reg={{
                    ...register("name", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.name}
                disabled={isWorking}
            />
            <MultiSelect
                fieldName="حالة المعلم"
                id="locale"
                setFormValue={setValue}
                defaultValue={testimoinalData?.locale}
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
                    name="content"
                    setValue={setValue}
                    isEditSession={isEditSession}
                    editValue={testimoinalData?.content}
                    placeholder="ادخل الرأي"
                    {...register("content", {
                        required: "يجب ادخال هذا الحقل",
                    })}
                ></Textarea>
                <span style={{ color: "#d32f2f" }}>
                    {errors?.content?.message}
                </span>
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

export default TestimoinalForm;
