import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import MyInput from "../../ui/form/MyInput";
import Button from "../../ui/Button";
import styled from "styled-components";
import { BiLock, BiMailSend } from "react-icons/bi";
import Spinner from "../../ui/Spinner";
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
        color: var(--color-brand-500) !important;
    }
    .Mui-focused .MuiOutlinedInput-notchedOutline {
        border: "1px solid var(--color-grey-0)";
    }
    .MuiInputAdornment-root {
        color: var(--color-grey-0);
    }
`;
const LoginForm = () => {
    const {
        register,

        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { login, isLoading } = useLogin(setError);

    function onSubmit(data) {
        login(data);
    }
    return (
        <StyleForm onSubmit={handleSubmit(onSubmit)}>
            <StyleInput
                reg={{
                    ...register("email", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.email}
                type="text"
                label="البريد الالكتروني"
                icon={<BiMailSend />}
            />
            <StyleInput
                error={errors?.password}
                reg={{
                    ...register("password", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                type="password"
                label="كلمة المرور"
                icon={<BiLock />}
            />
            {isLoading && <Spinner />}
            <Button disabled={isLoading} type="submit">
                تسجيل الدخول
            </Button>
        </StyleForm>
    );
};

export default LoginForm;
