import React, { useContext } from "react";
import MyInput from "../../ui/form/MyInput";
import { useCreatePlans } from "./useCreatePlans";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEditPlans } from "./useEditPlans";
import { Textarea } from "../../ui/form/Textarea";
import MultiSelect from "../../ui/form/MultiSelect";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const PlansForm = (plansToEdit = {}) => {
    const plansData = plansToEdit?.plansToEdit;

    const isEditSession = Boolean(plansData?.id);

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
        defaultValues: isEditSession ? plansData : {},
    });

    const { isEditing, editPlans } = useEditPlans(setError);
    const { isCreating, createPlans } = useCreatePlans(setError);

    const isWorking = isCreating || isEditing;

    const { errors, isSubmitted } = formState;
    //
    const { close } = useContext(ModalContext);
    function onSubmit(data) {
        if (isEditSession) {
            console.log(data.type);
            editPlans(
                {
                    newPlansData: {
                        ...data,
                    },
                    type: data.type.value,
                    id: plansData.id,
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
            createPlans(obj, {
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
                label="اسم الخطة"
                id="name"
                reg={{
                    ...register("name", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.name}
                disabled={isWorking}
            />
            <MyInput
                label="عدد الحصص الشهرية"
                type="number"
                id="monthly_sessions"
                reg={{
                    ...register("monthly_sessions", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.monthly_sessions}
                disabled={isWorking}
            />
            <MyInput
                label="عدد الحصص الاسبوعية"
                type="number"
                id="weekly_sessions"
                reg={{
                    ...register("weekly_sessions", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.weekly_sessions}
                disabled={isWorking}
            />
            <MyInput
                type="number"
                label="مدة الحصة"
                id="session_duration"
                reg={{
                    ...register("session_duration", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.session_duration}
                disabled={isWorking}
            />
            <MultiSelect
                fieldName="حالة الخطة"
                id="locale"
                setFormValue={setValue}
                defaultValue={plansData?.locale}
                error={errors?.locale}
                name="locale"
                control={control}
                myOptions={[
                    { value: "ar", title: "عرب" },
                    { value: "en", title: "اعاجم" },
                ]}
            />
            <MultiSelect
                control={control}
                fieldName="النوع"
                id="type"
                error={errors?.type}
                setFormValue={setValue}
                name="type"
                defaultValue={plansData?.type}
                myOptions={[
                    { value: "سنوي", title: "سنوي" },
                    {
                        value: "نصف سنوي",
                        title: "نصف سنوي",
                    },
                    {
                        value: "شهري",
                        title: "شهري",
                    },
                ]}
            />
            <MyInput
                label="السعر"
                type="number"
                id="price"
                reg={{
                    ...register("price", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.price}
                disabled={isWorking}
            />
            <MyInput
                label="نسبة الخصم"
                type="number"
                id="discount"
                reg={{
                    ...register("discount", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.discount}
                disabled={isWorking}
            />
            <MyInput
                label="العملة"
                id="currency"
                reg={{
                    ...register("currency", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.currency}
                disabled={isWorking}
            />

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

export default PlansForm;
