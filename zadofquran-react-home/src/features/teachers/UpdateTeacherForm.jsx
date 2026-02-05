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

const dayNameToKeyMap = {
  saturday: 6,
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
};

const normalizeDay = (day) => {
  if (typeof day === "number") return day;
  if (typeof day === "string") return dayNameToKeyMap[day.toLowerCase()];
  return null;
};

const normalizeSlot = (slot) => ({
  day: normalizeDay(slot.day),
  start_time: slot.start_time ?? "",
  end_time: slot.end_time ?? "",
  timezone: slot.timezone.startsWith("GMT") ? "Africa/Cairo" : slot.timezone ,
});

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
                const normalizedAvailability = data[key]
                    .filter(
                        (item) =>
                        item.day !== null &&
                        item.start_time &&
                        item.end_time
                    )
                    .map(normalizeSlot);

                normalizedAvailability.forEach((item, index) => {
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
                style={{ direction: "ltr"}}
            />

            {isLoading && <Spinner />}
            <Button disabled={isLoading} type="submit">
                {t("update-profile")}
            </Button>
        </StyleForm >
    );
};

export default UpdateTeacherForm;
