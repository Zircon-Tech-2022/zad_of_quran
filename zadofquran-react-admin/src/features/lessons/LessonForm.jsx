import React, { useContext, useEffect } from "react";
import MyInput from "../../ui/form/MyInput";
import { useCreateLesson } from "./useCreateLesson";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { useEditLesson } from "./useEditLesson";
import AvailabilityInput from "../../ui/form/AvailabilityInput";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { API_URL } from "../../Constants";
import { useLessonShow } from "./useLessonShow";
import Spinner from "../../ui/Spinner";
import { calculateTimezone } from "../../utils/helpers";
import { getSubscriberData, getSubscribers } from "../../services/apiSubscribers";
import SubscriberProfileInfo from "../subscribers/ProfileInfo";
import { matchTeachers } from "../../services/apiTeacher";

const FormStyle = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

const DivStyle = styled.div`
    display: flex;
    gap: 2rem;
`;

const LessonForm = ({ lessonToEdit = null }) => {
    const [selectedCourse, setSelectedCourse] = React.useState([]);
    const [selectedSubscriber, setSelectedSubscriber] = React.useState("");
    const [courses, setCourses] = React.useState([]);
    const [subscribers, setSubscribers] = React.useState([]);
    const [suggested, setSuggested] = React.useState([]);
    const subscriberData = React.useRef(lessonToEdit);

    const [isLoadingSomething, setIsLoadingSomething] = React.useState(false);

    const [search, setSearch] = React.useState("");

    const isEditSession = Boolean(lessonToEdit?.id); // check if we are editing a lesson

    let defaultTimezone = "GMT+2";
    const { isLoading, lesson } = useLessonShow(lessonToEdit?.id, defaultTimezone);
    const lessonData = React.useRef(lessonToEdit);

    const {
        register,
        handleSubmit,
        reset,
        formState,
        control,
        getValues,
        setError,
    } = useForm({
        defaultValues: {
            subscriber_id: "",
            age: "",
            gender: "",
            course: "",
            staff_id: "",
            availability: [
                { day: "", start_time: "", end_time: "", timezone: "" }
            ]
        },
    });

    const { isEditing, editLesson } = useEditLesson(setError);
    const { isCreating, createLesson } = useCreateLesson(setError);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoadingSomething(true);
            const res = await fetch(`${API_URL}courses?all=1`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch courses: ${res.statusText}`);
            }
            const courses = await res.json();
            setIsLoadingSomething(false);
            setCourses(courses.data);
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const getSubsctiberDataRequest = async () => {
            if (selectedSubscriber) {
                setIsLoadingSomething(true);
                const res = await getSubscriberData(selectedSubscriber, localStorage.getItem("token"));
                setIsLoadingSomething(false);
                subscriberData.current = res.data;
                reset({
                    subscriber_id: selectedSubscriber,
                    age: parseInt(res.data.age),
                    gender: res.data.gender,
                    availability: getValues().availability,
                    staff_id: getValues().staff_id,
                    course: selectedCourse,
                });
            }
        }
        getSubsctiberDataRequest();
    }, [selectedSubscriber, reset, getValues]);

    useEffect(() => {
        if (!isLoadingSomething && subscriberData?.current) {
            reset({
                subscriber_id: selectedSubscriber,
                age: parseInt(subscriberData.current.age),
                gender: subscriberData.current.gender,
                availability: getValues().availability,
                staff_id: getValues().staff_id,
                course: selectedCourse,
            });
        }
    }, [isLoadingSomething, reset, selectedSubscriber, getValues]);

    useEffect(() => {
        if (isEditSession && !isLoading && lesson) {
            lessonData.current = lesson.data;
            const availability = lessonData.current?.availabilities.map((item) => {
                return {
                    day: item.days.local,
                    start_time: item.start_times.local,
                    end_time: item.end_times.local,
                    timezone: calculateTimezone(item.start_times.local, item.start_times.gmt),
                }
            });

            lessonData.current.availability = availability;

            setSelectedCourse(lessonData.current.course.id);
            setSuggested([lessonData.current.staff]);
            subscriberData.current = lessonData.current.subscriber;

            reset({
                age: parseInt(lessonData.current.subscriber.age),
                gender: lessonData.current.subscriber.gender,
                availability,
                course: selectedCourse,
                subscriber_id: lessonData.current.subscriber_id,
                staff_id: lessonData.current.staff_id
            },
                { keepDirty: true, keepTouched: true }
            );
        }
    }, [isEditSession, isLoading, lessonData, reset]);



    const isWorking = isCreating || isEditing || isLoadingSomething || isLoading; // loading state

    const { errors } = formState;

    const { close } = useContext(ModalContext);

    function onSubmit(data) {
        let availability = {};

        data.availability.forEach((item, index) => {
            availability[`availability[${index}][day]`] = item.day;
            availability[`availability[${index}][start_time]`] = item.start_time;
            availability[`availability[${index}][end_time]`] = item.end_time;
            availability[`availability[${index}][timezone]`] = item.timezone;
        });

        if (isEditSession) {
            editLesson(
                {
                    newLessonData: {
                        ...data, ...availability, course_id: data.course,
                    },
                    id: lessonToEdit.id,
                },
                {
                    onSuccess: (data) => {
                        reset();
                        close?.();
                    },
                }
            );
        } else {
            const obj = { ...data, ...availability, course_id: data.course };
            createLesson(obj, {
                onSuccess: (data) => {
                    reset();
                    close();
                },
            });
        }
    }

    async function handleMatching() {
        const data = getValues();
        setIsLoadingSomething(true);
        const response = await matchTeachers(data);
        setIsLoadingSomething(false);
        setSuggested(response.data);
    }

    const handleSearchSubscribers = async (e) => {
        e.preventDefault();
        if (search) {
            setIsLoadingSomething(true);
            const res = await getSubscribers({ search }, localStorage.getItem("token"), 1);
            setIsLoadingSomething(false);
            setSubscribers(res.data);
        }
    };

    if (isEditSession && isLoading) {
        return <Spinner />;
    }

    return (
        <FormStyle onSubmit={handleSubmit(onSubmit)}>
            {isLoadingSomething && <Spinner style={{
                position: "sticky",
                top: "50%",
                left: "50%",
                margin: "-3.7rem auto",
            }} />}

            {!isEditSession && (
                <DivStyle>
                    <MyInput style={{ width: "80%" }} getValue={setSearch} label="ابحث عن المشترك" id="subscriberSearch" />
                    <Button
                        disabled={isWorking}
                        variation="secondary"
                        style={{ minWidth: "fit-content", width: "20%" }}
                        type="submit"
                        onClick={(e) => handleSearchSubscribers(e)}
                    >
                        ابحث
                    </Button>
                </DivStyle>
            )}

            {!lessonToEdit?.id && subscribers && (
                <>
                    <FormControl>
                        <InputLabel
                            style={{
                                fontSize: "1.6rem",
                            }}
                            id="Teacher-select-label"
                        >
                            اختر المشترك
                        </InputLabel>
                        <Controller
                            name="subscriber_id"
                            control={control}
                            rules={{ required: "يجب ادخال هذا الحقل" }}
                            render={({ field: controllerField, fieldState: { error } }) => (
                                <>
                                    <Select
                                        labelId="subscriber-select-label"
                                        value={selectedSubscriber}
                                        onChange={(e) => setSelectedSubscriber(e.target.value)}
                                        error={errors?.subscriber_id}
                                        label="اختر المشترك"
                                        id="outlined-required"
                                    >
                                        {subscribers.length > 0 ? (
                                            subscribers.map((subscriber) => (
                                                <MenuItem key={subscriber.id} value={subscriber.id}>
                                                    {subscriber.name} | {subscriber.email} | {subscriber.phone}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="">لا يوجد نتائج</MenuItem>
                                        )}

                                    </Select>
                                    <FormHelperText
                                        style={{
                                            color: "#d32f2f",
                                            fontSize: "1.6rem",
                                        }}
                                    >
                                        {error?.message}
                                    </FormHelperText>
                                </>
                            )}
                        />
                    </FormControl>
                </>
            )}

            {subscriberData.current && (
                <SubscriberProfileInfo subscriber={subscriberData.current} />
            )}

            {subscriberData.current && (<AvailabilityInput control={control} register={register} error={errors?.availability} />)}

            <Controller
                name="age"
                control={control}
                rules={{
                    required: "يجب ادخال هذا الحقل",
                }}
                render={({ field, fieldState }) => (
                    <MyInput
                        label="سن المشترك"
                        id="age"
                        type="number"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error}
                        disabled={isWorking}
                    />
                )}
            />

            <FormControl>
                <InputLabel id="gender-select-label" style={{
                    fontSize: "1.6rem",
                }}>
                    النوع
                </InputLabel>
                <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "يجب ادخال هذا الحقل" }}
                    render={({ field: controllerField, fieldState: { error } }) => (
                        <Select
                            {...controllerField}
                            value={controllerField.value || ""}
                            onChange={(e) => {
                                controllerField.onChange(e);
                            }}
                            label="النوع"
                            labelId="gender-select-label"
                            error={!!errors?.gender}
                            disabled={isWorking}
                        >
                            <MenuItem value="male">ذكر</MenuItem>
                            <MenuItem value="female">أنثى</MenuItem>
                        </Select>
                    )}
                />
            </FormControl>

            <FormControl>
                <InputLabel id="courses-select-label" style={{
                    fontSize: "1.6rem",
                }}>
                    الدورة
                </InputLabel>
                <Select
                    labelId="courses-select-label"
                    {...register("course", {
                        required: "يجب ادخال هذا الحقل",
                    })}
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    error={errors?.course}
                    label="الدورة"
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
                }}>{errors?.course?.message}</FormHelperText>
            </FormControl>

            <Button
                disabled={isWorking}
                variation="secondary"
                style={{ minWidth: "fit-content", width: "20%" }}
                onClick={handleMatching}
            >
                عرض نتائج التوافق
            </Button>

            {suggested && (
                <>
                    <FormControl>
                        <InputLabel id="staff-select-label" style={{
                            fontSize: "1.6rem",
                        }}>
                            المعلمين المقترحين
                        </InputLabel>
                        <Controller
                            name="staff_id"
                            control={control}
                            rules={{ required: "يجب ادخال هذا الحقل" }}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <>
                                    <Select
                                        labelId="staff-select-label"
                                        value={value || lessonData.current?.staff_id || ""} // Ensure value is not undefined
                                        onChange={(e) => onChange(e.target.value)} // Update React Hook Form state
                                        error={!!error}
                                        label="المعلمين المقترحين"
                                        id="outlined-required"
                                    >
                                        {suggested.length > 0 ? (
                                            suggested.map((suggestedTeacher) => (
                                                <MenuItem key={suggestedTeacher.id} value={suggestedTeacher.id}>
                                                    {suggestedTeacher.name} | {suggestedTeacher.email} | {suggestedTeacher.phone}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="">لا يوجد نتائج</MenuItem>
                                        )}
                                    </Select>
                                    <FormHelperText
                                        style={{
                                            color: "#d32f2f",
                                            fontSize: "1.6rem",
                                        }}
                                    >
                                        {error?.message}
                                    </FormHelperText>
                                </>
                            )}
                        />
                    </FormControl>
                </>
            )}

            <MyModal.Footer>
                <Button
                    disabled={isWorking}
                    style={{
                        background: isWorking ? "var(--color-grey-300)" : "",
                    }}
                    type="submit"
                >
                    {isEditSession ? "تعديل الحلقة" : "إنشاء الحلقة"}
                </Button>
                <Button onClick={close} variation="third" type="button">
                    إلغاء
                </Button>
            </MyModal.Footer>
        </FormStyle>
    );
};

export default LessonForm;
