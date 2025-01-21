import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import styled from "styled-components";
import { BiLock, BiMailSend } from "react-icons/bi";
import Spinner from "../../ui/Spinner";
import MyInput from "../../ui/form/MyInput";
import Button from "../../ui/Button";
import { t } from "i18next";
import { useLocation } from "react-router-dom";
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
const LoginForm = () => {
    const location = useLocation();
    const containsTeacher = location.pathname.includes('teacher');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { login, isLoading } = useLogin(setError);

    function onSubmit(data) {
        if (containsTeacher) {
            data.type = "teacher";
        }
        login(data);
    }
    return (
        <StyleForm onSubmit={handleSubmit(onSubmit)}>
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
            {isLoading && <Spinner />}
            <Button disabled={isLoading} type="submit">
                {t("login")}
            </Button>
        </StyleForm>
    );
};

export default LoginForm;
