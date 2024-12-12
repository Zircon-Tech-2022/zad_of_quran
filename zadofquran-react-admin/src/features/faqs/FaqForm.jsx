import React, { useContext } from "react";
import MyInput from "../../ui/form/MyInput";
import { useCreateFaq } from "./useCreateFaq";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEditFaq } from "./useEditFaq";
import { Textarea } from "../../ui/form/Textarea";
import MultiSelect from "../../ui/form/MultiSelect";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const FaqForm = (faqToEdit = {}) => {
    const faqData = faqToEdit?.faqToEdit;

    const isEditSession = Boolean(faqData?.id);
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
        defaultValues: isEditSession ? faqData : {},
    });

    const { isEditing, editFaq } = useEditFaq(setError);
    const { isCreating, createFaq } = useCreateFaq(setError);

    const isWorking = isCreating || isEditing;

    const { errors, isSubmitted } = formState;

    const { close } = useContext(ModalContext);

    function onSubmit(data) {
        if (isEditSession) {
            editFaq(
                {
                    newFaqData: { ...data },
                    id: faqData.id,
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
            createFaq(obj, {
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
                label="اسم السؤال"
                id="question"
                reg={{
                    ...register("question", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.question}
                disabled={isCreating}
            />
            <MultiSelect
                fieldName="حالة السؤال"
                id="locale"
                setFormValue={setValue}
                defaultValue={faqData?.locale}
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
                    name="answer"
                    setValue={setValue}
                    isEditSession={isEditSession}
                    editValue={faqData?.answer}
                    placeholder="الاجابة"
                    {...register("answer", {
                        required: "يجب ادخال هذا الحقل",
                    })}
                ></Textarea>
                <span style={{ color: "#d32f2f" }}>
                    {errors?.answer?.message}
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

export default FaqForm;
