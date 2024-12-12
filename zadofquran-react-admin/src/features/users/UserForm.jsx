import React, { useContext } from "react";
import MyInput from "../../ui/form/MyInput";
import { useCreateUser } from "./useCreateUser";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEditUser } from "./useEditUser";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const UserForm = (userToEdit = {}) => {
    const userData = userToEdit?.userToEdit;

    const isEditSession = Boolean(userData?.id);
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
        defaultValues: isEditSession ? userData : {},
    });

    const { isEditing, editUser } = useEditUser(setError);
    const { isCreating, createUser } = useCreateUser(setError);

    const isWorking = isCreating || isEditing;

    const { errors, isSubmitted } = formState;

    const { close } = useContext(ModalContext);

    function onSubmit(data) {
        if (isEditSession) {
            editUser(
                {
                    newUserData: { ...data },
                    id: userData.id,
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
            createUser(obj, {
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
                label="اسم الطالب"
                id="name"
                reg={{
                    ...register("name", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.name}
                disabled={isCreating}
            />
            <MyInput
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
            />
            <MyInput
                label="كلمة المرور"
                id="password"
                reg={{
                    ...register("password", {
                        required: isEditSession ? false : "هذا الحقل مطلوب",
                    }),
                }}
                error={errors?.password}
                disabled={isCreating}
            />
            <MyInput
                label="تأكيد كلمة المرور"
                id="password_confirmation"
                reg={{
                    ...register("password_confirmation", {
                        required: isEditSession ? false : "هذا الحقل مطلوب",
                    }),
                }}
                error={errors?.password}
                disabled={isCreating}
            />

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

export default UserForm;
