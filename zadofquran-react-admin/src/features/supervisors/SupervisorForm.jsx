import React, { useContext } from "react";
import MultiSelect from "../../ui/form/MultiSelect";
import MyInput from "../../ui/form/MyInput";
import { useCreateSupervisor } from "./useCreateSupervisor";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FileInput from "../../ui/form/FileInput";
import { Textarea } from "../../ui/form/Textarea";
import { useEditSupervisor } from "./useEditSupervisor";
import { BiLock } from "react-icons/bi";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const SupervisorForm = (supervisorToEdit = {}) => {
    const supervisorData = supervisorToEdit?.supervisorToEdit;

    const isEditSession = Boolean(supervisorData?.id);
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
        defaultValues: isEditSession ? supervisorData : {},
    });
    const { isEditing, editSupervisor } = useEditSupervisor(setError);
    const { isCreating, createSupervisor } = useCreateSupervisor(setError);

    const isWorking = isCreating || isEditing;

    const { errors } = formState;

    const { close } = useContext(ModalContext);
    function onSubmit(data) {
        if (isEditSession) {
            editSupervisor(
                {
                    newSupervisorData: { ...data },
                    id: supervisorData.id,
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
            createSupervisor(obj, {
                onSuccess: (data) => {
                    close();
                },
            });
        }
    }

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                label="الاسم"
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
                label="البريد الالكتروني"
                id="email"
                reg={{
                    ...register("email", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.email}
                disabled={isWorking}
            />
            <MyInput
                error={errors?.password}
                reg={{
                    ...register("password", {
                        required: !isEditSession ? "يجب ادخال هذا الحقل" : "",
                    }),
                }}
                type="password"
                label="كلمة المرور"
                icon={<BiLock />}
            />
            <MyInput
                error={errors?.password}
                reg={{
                    ...register("password_confirmation", {
                        required: !isEditSession ? "يجب ادخال هذا الحقل" : "",
                    }),
                }}
                name="password_confirmation"
                type="password"
                label="تأكيد كلمة المرور"
                icon={<BiLock />}
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

export default SupervisorForm;
