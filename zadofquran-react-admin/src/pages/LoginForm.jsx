import { useForm } from "react-hook-form";
import { API_URL } from "../Constants";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Simulate API call to login
            const response = await fetch(
                `${API_URL}auth/login`,
                {
                    method: "POST",
                    headers: {
                        "accept-language": "en",
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                    }),
                    Authorization: "Bearer ",
                }
            );

            if (response.ok) {
            } else {
                const errorData = await response.json();
                setError("email", { message: errorData.message });
            }
        } catch (error) { }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    {...register("email", {
                        required: "This field is required",
                    })}
                />
                {errors?.email && <span>{errors?.email?.message}</span>}
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    {...register("password", {
                        required: "This field is required",
                    })}
                />
                {errors?.password && <span>{errors?.password?.message}</span>}
            </div>

            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
