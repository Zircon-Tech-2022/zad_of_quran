import React, { useContext, useEffect } from "react";
import MultiSelect from "../../ui/form/MultiSelect";
import MyInput from "../../ui/form/MyInput";
import { useCreateTeacher } from "./useCreateTeacher";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import FileInput from "../../ui/form/FileInput";
import Editor from "../../ui/form/Editor";
import { useEditTeacher } from "./useEditTeacher";
import AvailabilityInput from "./AvailabilityInput";
import { BiLock } from "react-icons/bi";
import { Avatar, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { API_URL } from "../../../Constants";
import { useTeacherShow } from "./useTeacherShow";
import Spinner from "../../ui/Spinner";
import { calculateTimezone } from "../../utils/helpers";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const TeacherForm = ({ teacherToEdit = {} }) => {
    const [selectedCourses, setSelectedCourses] = React.useState([]);
    const [courses, setCourses] = React.useState([]);

    const isEditSession = Boolean(teacherToEdit?.id); // check if we are editing a teacher

    const { isLoading, data } = useTeacherShow(teacherToEdit?.id);
    const teacherData = React.useRef(teacherToEdit);

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
        defaultValues: {
            "availability": [
                { day: "", start_time: "", end_time: "", timezone: "" }
            ]
        },
    });

    if (!isLoading && teacherData.current && data) {
        teacherData.current = data.data;
        const availability = teacherData.current?.availabilities.map((item) => {
            return {
                day: item.days.local,
                start_time: item.start_times.local,
                end_time: item.end_times.local,
                timezone: calculateTimezone(item.start_times.local, item.start_times.gmt),
            }
        });

        teacherData.current.availability = availability;
    }

    const { isEditing, editTeacher } = useEditTeacher(setError);
    const { isCreating, createTeacher } = useCreateTeacher(setError);

    useEffect(() => {
        const fetchCourses = async () => {
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
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (isEditSession && !isLoading && teacherData?.current) {
            reset(teacherData.current);
            setSelectedCourses(teacherData.current.courses.map((item) => item.id));
        }
    }, [isEditSession, isLoading, teacherData, reset]);


    const isWorking = isCreating || isEditing; // loading state

    const { errors, isSubmitted } = formState;

    const { close } = useContext(ModalContext);

    function onSubmit(data) {
        const image = typeof data.image === "string" ? null : data.image[0];
        let availability = {};
        let courses = {};

        data.availability.forEach((item, index) => {
            availability[`availability[${index}][day]`] = item.day;
            availability[`availability[${index}][start_time]`] = item.start_time;
            availability[`availability[${index}][end_time]`] = item.end_time;
            availability[`availability[${index}][timezone]`] = item.timezone;
        });
        data.courses.forEach((item, index) => {
            courses[`courses[${index}]`] = item.id ?? item;
        });

        data.qualifications = data.qualifications.replace("<p>", "");
        data.qualifications = data.qualifications.replace("</p>", "");

        if (isEditSession) {
            editTeacher(
                {
                    newTeacherData: {
                        ...data, ...availability, ...courses, image
                    },
                    id: teacherToEdit.id,
                },
                {
                    onSuccess: (data) => {
                        reset();
                        close?.();
                    },
                }
            );
        } else {
            const obj = { ...data, ...availability, ...courses, image };
            createTeacher(obj, {
                onSuccess: (data) => {
                    reset();
                    close();
                },
            });
        }
    }

    if (isEditSession && isLoading) {
        return <Spinner />;
    }

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <MyInput
                label="اسم المدرس"
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
                label="سن المدرس"
                id="age"
                reg={{
                    ...register("age", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                type="number"
                error={errors?.age}
                disabled={isWorking}
            />
            <MyInput
                label="رقم الهاتف(201111111111+)"
                id="phone"
                reg={{
                    ...register("phone", {
                        required: "يجب ادخال هذا الحقل",
                    }),
                }}
                error={errors?.phone}
                disabled={isWorking}
            />
            {!isEditSession && (
                <>
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
                                required: "يجب ادخال هذا الحقل",
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
                                required: "يجب ادخال هذا الحقل",
                            }),
                        }}
                        name="password_confirmation"
                        type="password"
                        label="تأكيد كلمة المرور"
                        icon={<BiLock />}
                    />
                </>
            )}
            <MultiSelect
                fieldName="النوع"
                id="gender"
                setFormValue={setValue}
                defaultValue={teacherData.current?.gender}
                error={errors?.gender}
                name="gender"
                control={control}
                myOptions={[
                    { value: "male", title: "ذكر" },
                    { value: "female", title: "أنثى" },
                ]}
            />
            <FormControl sx={{}}>
                <InputLabel id="courses-select-label" style={{
                    fontSize: "1.6rem",
                }}>
                    الدورات
                </InputLabel>
                <Select
                    labelId="courses-select-label"
                    {...register("courses", {
                        required: "يجب ادخال هذا الحقل",
                    })}
                    multiple
                    value={selectedCourses}
                    onChange={(e) => setSelectedCourses(e.target.value)}
                    error={errors?.courses}
                    label="الدورات"
                    id="outlined-required"
                >
                    {courses.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                            {course.name}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText style={{
                    color: "#d32f2f",
                    fontSize: "1.6rem",
                }}>{errors?.courses?.message}</FormHelperText>
            </FormControl>
            <AvailabilityInput control={control} register={register} error={errors?.availability} />
            <InputLabel
                style={{
                    fontSize: "1.6rem",
                }}
            >
                المؤهلات
            </InputLabel>
            <div style={{ marginBottom: "3rem" }}>
                <Editor
                    control={control}
                    name="qualifications"
                    setValue={setValue}
                    isEditSession={isEditSession}
                    editValue={teacherData.current?.qualifications}
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
            <div>
                {isEditSession && (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                        <Avatar alt={teacherData.current?.name} src={teacherData.current?.image}
                            sx={{ width: 100, height: 100 }}
                        />
                    </div>
                )}
                <FileInput
                    id="image"
                    setValue={setValue}
                    accept="image/*"
                    reg={{
                        ...register("image", {
                            required: isEditSession ? false : "الصورة مطلوبة",
                        }),
                    }}
                    isSubmitted={isSubmitted}
                    getValues={getValues}
                />
                <span style={{ color: "#d32f2f" }}>
                    {errors?.image?.message}
                </span>
            </div>
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
                    إلغاء
                </Button>
            </MyModal.Footer>
        </FormStyle>
    );
};

export default TeacherForm;
