import React from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import styled from "styled-components";
import { BiLock, BiMailSend, BiPhone, BiUser } from "react-icons/bi";
import Spinner from "../../ui/Spinner";
import MyInput from "../../ui/form/MyInput";
import Button from "../../ui/Button";
import { t } from "i18next";
const StyleForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;
const StyleInput = styled(MyInput)`
    .MuiInputBase-input {
        color: var(--color-grey-0);
    }
    & .MuiOutlinedInput-notchedOutline {
        border-color: var(--color-grey-0);
    }
    & .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline {
        border-color: var(--color-grey-0);
    }

    & .MuiFormLabel-root {
        color: var(--color-grey-0) !important;
    }
    .MuiInputLabel-shrink {
        color: var(--color-sec-500) !important;
    }
    .Mui-focused .MuiOutlinedInput-notchedOutline {
        border: "1px solid var(--color-grey-0)";
    }
    .MuiInputAdornment-root {
        color: var(--color-grey-0);
    }
`;
const SignupForm = () => {
    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { signup, isLoading } = useSignup(setError);
    function onSubmit(data) {
        signup(data);
    }
    return (
        <StyleForm onSubmit={handleSubmit(onSubmit)}>
            <StyleInput
                reg={{
                    ...register("name", {
                        required: t("required"),
                    }),
                }}
                error={errors?.name}
                type="text"
                label={t("name")}
                icon={<BiUser />}
            />
            <StyleInput
                error={errors?.phone}
                reg={{
                    ...register("phone", {
                        required: t("required"),
                    }),
                }}
                type="text"
                label={t("phone")}
                icon={<BiPhone />}
            />
            <StyleInput
                reg={{
                    ...register("email", {
                        required: t("required"),
                    }),
                }}
                error={errors?.email}
                type="text"
                label={t("email")}
                icon={<BiMailSend />}
            />
            <StyleInput
                error={errors?.password}
                reg={{
                    ...register("password", {
                        required: t("required"),
                    }),
                }}
                type="password"
                label={t("password")}
                icon={<BiLock />}
            />
            <StyleInput
                error={errors?.password}
                reg={{
                    ...register("password_confirmation", {
                        required: t("required"),
                    }),
                }}
                name="password_confirmation"
                type="password"
                label={t("confirmPassword")}
                icon={<BiLock />}
            />

            {isLoading && <Spinner />}
            <Button disabled={isLoading} type="submit">
                {t("send")}
            </Button>
        </StyleForm>
    );
};

export default SignupForm;
