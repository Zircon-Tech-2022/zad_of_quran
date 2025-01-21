import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import styled from "styled-components";
import { BiFemale, BiLock, BiMailSend, BiMale, BiPhone, BiUser } from "react-icons/bi";
import Spinner from "../../ui/Spinner";
import MyInput from "../../ui/form/MyInput";
import Button from "../../ui/Button";
import { t } from "i18next";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import AvailabilityInput from "../../ui/form/AvailabilityInput";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../Constants";


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

const StyleSelect = styled(Select)`
    .MuiSvgIcon-root {
        color: var(--color-grey-0) !important;
    }
    .MuiInputBase-input {
        color: var(--color-grey-0);
    }
    & .MuiOutlinedInput-notchedOutline {
        border-color: var(--color-grey-0);
    }
    & .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline {
        border-color: var(--color-sec-500);
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
    const location = useLocation();
    const containsTeacher = location.pathname.includes('teacher');

    const [selectedCourses, setSelectedCourses] = React.useState([]);
    const [courses, setCourses] = React.useState([]);
    const [imageFile, setImageFile] = React.useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            if (containsTeacher) {
                const res = await fetch(`${API_URL}courses`, {
                    headers: {
                        "accept-language": "ar",
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch courses: ${res.statusText}`);
                }

                const data = await res.json();
                setCourses(data.data);
            }
        };

        fetchCourses();
    }, [containsTeacher]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm({
        defaultValues: {
            "availability": [
                { day: "", start_time: "", end_time: "", timezone: "" }
            ]
        }
    });

    const { signup, isLoading } = useSignup(setError);
    function onSubmit(data) {
        const formData = new FormData();

        for (const key in data) {
            if (key === "availability" && Array.isArray(data[key])) {
                data[key].forEach((item, index) => {
                    formData.append(`${key}[${index}][day]`, item.day);
                    formData.append(`${key}[${index}][start_time]`, item.start_time);
                    formData.append(`${key}[${index}][end_time]`, item.end_time);
                    formData.append(`${key}[${index}][timezone]`, item.timezone);
                });
            } else if (key === "courses" && Array.isArray(data[key])) {
                data[key].forEach((course, index) => {
                    formData.append(`${key}[${index}]`, course);
                });
            } else {
                formData.append(key, data[key]);
            }
        }

        if (imageFile) {
            formData.append("image", imageFile);
        }

        if (containsTeacher) {
            formData.append("type", "teacher");
        }

        signup(formData);
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
            {containsTeacher && (
                <>
                    <StyleInput
                        reg={{
                            ...register("age", {
                                required: t("required"),
                            }),
                        }}
                        error={errors?.age}
                        type="number"
                        label={t("age")}
                    />
                    <StyleInput
                        reg={{
                            ...register("qualifications", {
                                required: t("required"),
                            }),
                        }}
                        error={errors?.qualifications}
                        type="text"
                        label={t("qualifications")}
                    />
                    <InputLabel style={{
                        color: "var(--color-grey-0)",
                        fontSize: "1.6rem",
                        marginBottom: "-1rem",
                    }}>
                        {t("image")}
                    </InputLabel>
                    < StyleInput
                        reg={{
                            ...register(`image`, {
                                required: t("required"),
                                onChange: (e) => handleImageChange(e),
                            }),
                        }}
                        error={errors?.image}
                        type="file"
                        label=""
                    />
                    <FormControl sx={{}}>
                        <InputLabel id="gender-select-label" style={{
                            color: "var(--color-grey-0)",
                            fontSize: "1.6rem",
                        }}>
                            {t("gender")}
                        </InputLabel>
                        <StyleSelect
                            labelId="gender-select-label"
                            {...register("gender", {
                                required: t("required"),
                            })}
                            error={errors?.gender}
                            label={t("gender")}
                            id="outlined-required"
                        >
                            <MenuItem value="male" style={{ display: "flex", justifyContent: "space-between" }}>
                                {t("male")}
                                <BiMale style={{ marginRight: "8px" }} />
                            </MenuItem>
                            <MenuItem value="female" style={{ display: "flex", justifyContent: "space-between" }}>
                                {t("female")}
                                <BiFemale style={{ marginRight: "8px" }} />
                            </MenuItem>
                        </StyleSelect>
                        <FormHelperText style={{
                            color: "#d32f2f",
                            fontSize: "1.6rem",
                        }}>{errors?.gender?.message}</FormHelperText>
                    </FormControl>
                    <AvailabilityInput control={control} register={register} error={errors?.availability} />
                    <FormControl sx={{}}>
                        <InputLabel id="courses-select-label" style={{
                            color: "var(--color-grey-0)",
                            fontSize: "1.6rem",
                        }}>
                            {t("coursesWord")}
                        </InputLabel>
                        <StyleSelect
                            labelId="courses-select-label"
                            {...register("courses", {
                                required: t("required"),
                            })}
                            multiple
                            value={selectedCourses}
                            onChange={(e) => setSelectedCourses(e.target.value)}
                            error={errors?.courses}
                            label={t("coursesWord")}
                            id="outlined-required"
                        >
                            {courses.map((course) => (
                                <MenuItem key={course.id} value={course.id}>
                                    {course.name}
                                </MenuItem>
                            ))}
                        </StyleSelect>
                        <FormHelperText style={{
                            color: "#d32f2f",
                            fontSize: "1.6rem",
                        }}>{errors?.courses?.message}</FormHelperText>
                    </FormControl>
                </>
            )}
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
        </StyleForm >
    );
};

export default SignupForm;
