import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateTeacher } from "./useUpdateTeacher";
import styled from "styled-components";
import { BiFemale, BiLock, BiMailSend, BiMale, BiPhone, BiUser } from "react-icons/bi";
import Spinner from "../../ui/Spinner";
import MyInput from "../../ui/form/MyInput";
import Button from "../../ui/Button";
import { t } from "i18next";
import { Avatar, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import AvailabilityInput from "../../ui/form/AvailabilityInput";
import Editor from "../../ui/form/Editor";

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

const UpdateTeacherForm = ({ values }) => {
    const [imageFile, setImageFile] = React.useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
        setValue,
    } = useForm({
        defaultValues: values,
    });

    const {
        updateProfile,
        isLoading } = useUpdateTeacher(setError);
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
            } else {
                formData.append(key, data[key]);
            }
        }

        if (imageFile) {
            formData.append("image", imageFile);
        } else {
            formData.delete("image");
        }

        updateProfile(formData);
    }
    return (
        <StyleForm onSubmit={handleSubmit(onSubmit)}>
            <StyleInput
                reg={{
                    ...register("name"),
                }}
                error={errors?.name}
                type="text"
                label={t("name")}
                icon={<BiUser />}
            />
            <StyleInput
                reg={{
                    ...register("age"),
                }}
                error={errors?.age}
                type="number"
                label={t("age")}
            />
            <InputLabel
                style={{
                    color: "var(--color-grey-0)",
                    fontSize: "1.6rem",
                    marginBottom: "-1rem",
                }}
            >
                المؤهلات
            </InputLabel>
            <div style={{
                marginBottom: "3rem",
                color: "var(--color-grey-700)",
            }}>
                <Editor
                    control={control}
                    name="qualifications"
                    setValue={setValue}
                    isEditSession={true}
                    editValue={values?.qualifications}
                    reg={{
                        ...register("qualifications", {
                            required: "يجب ادخال هذا الحقل",
                        }),
                    }}
                />
                <span style={{ color: "#d32f2f" }}>
                    {errors?.qualifications?.message}
                </span>
            </div>
            <InputLabel style={{
                color: "var(--color-grey-0)",
                fontSize: "1.6rem",
                marginBottom: "-1rem",
            }}>
                {t("image")}
            </InputLabel>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Avatar alt={values.name} src={values.image}
                    sx={{ width: 100, height: 100 }}
                />
            </div>
            < StyleInput
                reg={{
                    ...register(`image`, {
                        onChange: (e) => handleImageChange(e),
                    }),
                }}
                error={errors?.image}
                type="file"
                label=""
            />
            <FormControl>
                <InputLabel
                    id="gender-select-label"
                    style={{
                        color: "var(--color-grey-0)",
                        fontSize: "1.6rem",
                    }}
                >
                    {t("gender")}
                </InputLabel>
                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <StyleSelect
                            {...field}
                            labelId="gender-select-label"
                            error={!!errors?.gender}
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
                    )}
                />
                <FormHelperText
                    style={{
                        color: "#d32f2f",
                        fontSize: "1.6rem",
                    }}
                >
                    {errors?.gender?.message}
                </FormHelperText>
            </FormControl>
            <AvailabilityInput control={control} register={register} error={errors?.availability} />
            <StyleInput
                error={errors?.phone}
                reg={{
                    ...register("phone"),
                }}
                type="text"
                label={t("phone")}
                icon={<BiPhone />}
            />
            <StyleInput
                error={errors?.password}
                reg={{
                    ...register("password"),
                }}
                type="password"
                label={t("password")}
                icon={<BiLock />}
            />
            {!errors?.password && (<FormHelperText
                style={{
                    color: "#fff",
                    fontSize: "1.6rem",
                    marginTop: "-1.7rem",
                }}
            >
                {t("leave-password-empty-to-keep-the-same")}
            </FormHelperText>)}
            <StyleInput
                error={errors?.password}
                reg={{
                    ...register("password_confirmation"),
                }}
                name="password_confirmation"
                type="password"
                label={t("confirmPassword")}
                icon={<BiLock />}
            />

            {isLoading && <Spinner />}
            <Button disabled={isLoading} type="submit">
                {t("update-profile")}
            </Button>
        </StyleForm >
    );
};

export default UpdateTeacherForm;
