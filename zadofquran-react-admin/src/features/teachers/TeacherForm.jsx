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
import AvailabilityInput from "../../ui/form/AvailabilityInput";
import { BiLock } from "react-icons/bi";
import { Avatar, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { API_URL } from "../../Constants";
import { useTeacherShow } from "./useTeacherShow";
import Spinner from "../../ui/Spinner";
import { calculateTimezone } from "../../utils/helpers";

const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 3rem;
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

const TeacherForm = ({ teacherToEdit = null }) => {
    const [selectedCourses, setSelectedCourses] = React.useState([]);
    const [courses, setCourses] = React.useState([]);
    const [displayResults, setDisplayResults] = React.useState({
        display: false,
        data: null,
    });

    const isEditSession = Boolean(teacherToEdit?.id); // check if we are editing a teacher

    let defaultTimezone = "Africa/Cairo";
    const { isLoading, user } = useTeacherShow(teacherToEdit?.id, defaultTimezone);
    const teacherData = React.useRef(teacherToEdit);

    if (!isLoading && teacherData.current && user) {
        teacherData.current = user.data;
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

    const {
        register,
        handleSubmit,
        reset,
        formState,
        control,
        getValues,
        clearErrors,
        setError,
        setValue,
    } = useForm({
        defaultValues: isEditSession ? teacherData.current : {
            "availability": [
                { day: "", start_time: "", end_time: "", timezone: "Africa/Cairo" }
            ]
        },
    });

    const { isEditing, editTeacher } = useEditTeacher(setError);
    const { isCreating, createTeacher } = useCreateTeacher(setError);

    useEffect(() => {
        const fetchCourses = async () => {
            if (isEditSession) {
                const res = await fetch(`${API_URL}availableCourses`, {
                    headers: {
                        "accept-language": "ar",
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch courses: ${res.statusText}`);
                }

                const courses = await res.json();
                setCourses(courses.data);
            }
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
        let image = null;
        if (data.image && typeof data.image !== "string") {
            image = data.image[0];
        }
        let courses = {};

        if (data.availability) {
            const normalizedAvailability = data.availability
                .filter(
                    (item) =>
                    item.day !== null &&
                    item.start_time &&
                    item.end_time
                )
                .map(normalizeSlot);

            const availabilityArray = normalizedAvailability.map(item => ({
                day: item.day,
                start_time: item.start_time,
                end_time: item.end_time,
                timezone: item.timezone,
            }));

            data.availability = availabilityArray;
        }

        if (data.courses) {
            data.courses.forEach((item, index) => {
                courses[`courses[${index}]`] = item.id ?? item;
            });
        }

        if (isEditSession) {
            editTeacher(
                {
                    newTeacherData: {
                        ...data, ...courses, image
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
            const obj = { ...data, ...courses, image };
            createTeacher(obj, {
                onSuccess: (data) => {
                    reset();
                    setDisplayResults({
                        display: true,
                        data: data.data,
                    });
                },
            });
        }
    }

    if (isEditSession && isLoading) {
        return <Spinner />;
    }

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            {isEditSession && (
                <>
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
                        style={{ direction: "ltr"}}
                    />
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
                    <FormControl>
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
                    <AvailabilityInput control={control} register={register} error={errors?.availability}  clearErrors={clearErrors} />
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
                                ...register("qualifications"),
                            }}
                        />
                        <span style={{ color: "#d32f2f" }}>
                            {errors?.qualifications?.message}
                        </span>
                    </div>
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                            <Avatar alt={teacherData.current?.name} src={teacherData.current?.image}
                                sx={{ width: 100, height: 100 }}
                            />
                        </div>
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
                </>
            )}
            {!isEditSession && (
                <>
                    {!displayResults.display && (
                        <>
                            <MyInput
                                label="البريد الالكتروني أو اسم المستخدم"
                                id="email"
                                reg={{
                                    ...register("email", {
                                        required: "",
                                    }),
                                }}
                                error={errors?.email}
                                disabled={isWorking}
                            />
                            <MyInput
                                error={errors?.password}
                                reg={{
                                    ...register("password", {
                                        required: "",
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
                                        required: "",
                                    }),
                                }}
                                name="password_confirmation"
                                type="password"
                                label="تأكيد كلمة المرور"
                                icon={<BiLock />}
                            />
                            <FormHelperText style={{
                                fontSize: "1.6rem",
                                textAlign: "right"
                            }}>
                                اترك حقل كلمة المرور والتأكيد فاغين إن شئت ليتم التوليد التلقائي
                            </FormHelperText>
                        </>
                    )}
                    {displayResults.display && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                البريد الإلكتروني أو اسم المستخدم: {displayResults.data.email}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                كلمة المرور: {displayResults.data.password}
                            </Typography>
                        </>
                    )}
                </>
            )}
            <MyModal.Footer>
                {!displayResults.display && (<Button
                    disabled={isWorking}
                    style={{
                        background: isWorking ? "var(--color-grey-300)" : "",
                    }}
                    type="submit"
                >
                    حفظ
                </Button>)
                }
                <Button onClick={close} variation="third" type="button">
                    {displayResults.display ? "إغلاق" : "إلغاء"}
                </Button>
            </MyModal.Footer>
        </FormStyle>
    );
};

export default TeacherForm;
