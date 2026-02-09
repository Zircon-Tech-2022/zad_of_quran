import React, { useContext, useEffect } from "react";
import MyInput from "../../ui/form/MyInput";
import { useCreateLesson } from "./useCreateLesson";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { useEditLesson } from "./useEditLesson";
import AvailabilityInput from "../../ui/form/AvailabilityInput";
import { FormControl, FormHelperText, InputLabel, MenuItem, Rating, Select } from "@mui/material";
import { API_URL } from "../../Constants";
import { useLessonShow } from "./useLessonShow";
import Spinner from "../../ui/Spinner";
import { calculateTimezone } from "../../utils/helpers";
import { matchTeachers } from "../../services/apiTeacher";

const FormStyle = styled.form`
    position: relative;
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

const LessonForm = ({ lessonToEdit = null }) => {
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [selectedSupervisor, setSelectedSupervisor] = React.useState(null);
    const [courses, setCourses] = React.useState([]);
    const [supervisors, setSupervisors] = React.useState([]);

    const [suggested, setSuggested] = React.useState({
        exact: [],
        maybe: [],
        random: []
    });

    const subscriberData = React.useRef(lessonToEdit);

    const [isLoadingSomething, setIsLoadingSomething] = React.useState(false);

    const isEditSession = Boolean(lessonToEdit?.id); // check if we are editing a lesson

    let defaultTimezone = "Africa/Cairo";
    const { isLoading, lesson } = useLessonShow(lessonToEdit?.id, defaultTimezone);
    const lessonData = React.useRef(lessonToEdit);

    if (!isLoading && lessonData.current && lesson) {
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
    }

    const {
        register,
        handleSubmit,
        reset,
        formState,
        control,
        getValues,
        setError,
        clearErrors,
    } = useForm({
        defaultValues: isEditSession ? lessonData.current : {},
    });

    const { isEditing, editLesson } = useEditLesson(setError);
    const { isCreating, createLesson } = useCreateLesson(setError);
    const data = getValues();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingSomething(true);

            try {
                const token = localStorage.getItem("token");
                const headers = {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                };
                const authHeaders = token ? { ...headers, Authorization: `Bearer ${token}` } : headers;

                const [coursesRes, supervisorsRes] = await Promise.all([
                    fetch(`${API_URL}availableCourses`, { headers }),
                    fetch(`${API_URL}supervisors`, { headers: authHeaders }),
                ]);

                if (!coursesRes.ok || !supervisorsRes.ok) {
                    throw new Error(
                        `Failed to fetch data: ${coursesRes.statusText}, ${supervisorsRes.statusText}`
                    );
                }

                const [coursesData, supervisorsData] = await Promise.all([
                    coursesRes.json(),
                    supervisorsRes.json(),
                ]);

                setCourses(coursesData.data);
                setSupervisors(supervisorsData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoadingSomething(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (isEditSession && !isLoading && lessonData?.current) {
            reset({
                ...lessonData.current,
                name: lessonData.current.subscriber.name,
                phone: lessonData.current.subscriber.phone,
                age: parseInt(lessonData.current.subscriber.age),
                gender: lessonData.current.subscriber.gender,
                staff_id: lessonData.current.staff_id ?? '',
            },
                { keepDirty: true, keepTouched: true }
            );

            setSelectedCourse(lessonData.current.course.id);
            setSelectedSupervisor(lessonData.current.supervisor.id);
            setSuggested({
                exact: lessonData.current.staff?.iصd ? [lessonData.current.staff] : [],
            });
            subscriberData.current = lessonData.current.subscriber;
        }
    }, [isEditSession, isLoading, lessonData, reset]);

    const isWorking = isCreating || isEditing || isLoadingSomething || isLoading; // loading state

    const { errors } = formState;

    const { close } = useContext(ModalContext);

    function onSubmit() {
        const data = getValues();
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

        if (isEditSession) {
            editLesson(
                {
                    newLessonData: {
                        ...data,
                        course_id: isNaN(parseInt(data.course)) ? data.course.id : data.course,
                        staff_id: parseInt(data.staff_id) ? data.staff_id : '',
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
            const obj = {
                ...data,
                course_id: data.course,
                supervisor_id: data.supervisor,
                staff_id: parseInt(data.staff_id) ? data.staff_id : '',
            };
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

        setIsLoadingSomething(true);
        const response = await matchTeachers(data);
        setIsLoadingSomething(false);
        setSuggested({
            exact: response.data.exact,
            maybe: response.data.maybe,
            random: response.data.random
        });
    }

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
            <MyInput
                label="اسم المشترك"
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
                label="رقم الهاتف"
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
            <AvailabilityInput control={control} register={register} error={errors?.availability} clearErrors={clearErrors} />
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
                <InputLabel id="supervisors-select-label" style={{
                    fontSize: "1.6rem",
                }}>
                    المشرف
                </InputLabel>
                <Select
                    labelId="supervisors-select-label"
                    {...register("supervisor", {
                        required: "يجب ادخال هذا الحقل",
                    })}
                    value={selectedSupervisor}
                    onChange={(e) => setSelectedSupervisor(e.target.value)}
                    error={errors?.supervisor}
                    label="المشرف"
                    id="outlined-required"
                >
                    {supervisors.map((supervisor) => (
                        <MenuItem key={supervisor.id} value={supervisor.id}>
                            {supervisor.name} | {supervisor.email}
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText style={{
                    color: "#d32f2f",
                    fontSize: "1.6rem",
                }}>{errors?.supervisor?.message}</FormHelperText>
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
                // disabled={isWorking}
                type="button"
                variation="secondary"
                style={{ minWidth: "fit-content", width: "20%" }}
                onClick={handleMatching}
            >
                عرض نتائج التوافق
            </Button>

            {suggested && (
                <>
                    <FormControl>
                        <InputLabel id="staff-exact-select-label" style={{
                            fontSize: "1.6rem",
                        }}>
                            المعلمون المقترحون
                        </InputLabel>
                        <Controller
                            name="staff_id"
                            control={control}
                            rules={{ required: "" }}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <>
                                    <Select
                                        labelId="staff-exact-select-label"
                                        value={value || lessonData.current?.staff_id || ""} // Ensure value is not undefined
                                        onChange={(e) => onChange(e.target.value)} // Update React Hook Form state
                                        error={!!error}
                                        label="المعلمون المقترحون"
                                        id="outlined-required"
                                    >
                                        <MenuItem value="0">غير محدد</MenuItem>
                                        {suggested?.exact?.length > 0 ? (
                                            suggested.exact.map((suggestedTeacher) => (
                                                <MenuItem key={suggestedTeacher.id} value={suggestedTeacher.id}>
                                                    {suggestedTeacher.name} | <Rating
                                                        readOnly
                                                        style={{ direction: "ltr" }}
                                                        precision={0.5}
                                                        name="simple-rating"
                                                        value={suggestedTeacher.rate} // Use value instead of defaultValue
                                                    /> | <p style={{ direction: 'ltr', display: 'inline' }}>{suggestedTeacher.phone}</p> | السن: <span style={{ color: suggestedTeacher.details.age < data.age ? "red" : "" }}>{suggestedTeacher.details.age}</span>
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="">لا يوجد نتائج مطابقة</MenuItem>
                                        )}
                                    </Select>
                                </>
                            )}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="staff-maybe-select-label" style={{
                            fontSize: "1.6rem",
                        }}>
                            معلمون قد تناسبهم
                        </InputLabel>
                        <Controller
                            name="staff_id"
                            control={control}
                            rules={{ required: "" }}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <>
                                    <Select
                                        labelId="staff-maybe-select-label"
                                        value={value || lessonData.current?.staff_id || ""} // Ensure value is not undefined
                                        onChange={(e) => onChange(e.target.value)} // Update React Hook Form state
                                        error={!!error}
                                        label="معلمون قد تناسبهم"
                                        id="outlined-required"
                                    >
                                        <MenuItem value="0">غير محدد</MenuItem>
                                        {suggested?.maybe?.length > 0 ? (
                                            suggested.maybe.map((suggestedTeacher) => (
                                                <MenuItem key={suggestedTeacher.id} value={suggestedTeacher.id}>
                                                    {suggestedTeacher.name} | <Rating
                                                        readOnly
                                                        style={{ direction: "ltr" }}
                                                        precision={0.5}
                                                        name="simple-rating"
                                                        value={suggestedTeacher.rate} // Use value instead of defaultValue
                                                    /> | <p style={{ direction: 'ltr', display: 'inline' }}>{suggestedTeacher.phone}</p> | السن: <span style={{ color: suggestedTeacher.details.age < data.age ? "red" : "" }}>{suggestedTeacher.details.age}</span>
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="">لا يوجد نتائج مقترحة</MenuItem>
                                        )}
                                    </Select>
                                </>
                            )}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="staff-random-select-label" style={{
                            fontSize: "1.6rem",
                        }}>
                            ترشيح معلم عشوائي
                        </InputLabel>
                        <Controller
                            name="staff_id"
                            control={control}
                            rules={{ required: "" }}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <>
                                    <Select
                                        labelId="staff-random-select-label"
                                        value={value || lessonData.current?.staff_id || ""} // Ensure value is not undefined
                                        onChange={(e) => onChange(e.target.value)} // Update React Hook Form state
                                        error={!!error}
                                        label="ترشيح معلم عشوائي"
                                        id="outlined-required"
                                    >
                                        <MenuItem value="0">غير محدد</MenuItem>
                                        {suggested?.random?.length > 0 ? (
                                            suggested.random.map((suggestedTeacher) => (
                                                <MenuItem key={suggestedTeacher.id} value={suggestedTeacher.id}>
                                                    {suggestedTeacher.name} | <Rating
                                                        readOnly
                                                        style={{ direction: "ltr" }}
                                                        precision={0.5}
                                                        name="simple-rating"
                                                        value={suggestedTeacher.rate} // Use value instead of defaultValue
                                                    /> | <p style={{ direction: 'ltr', display: 'inline' }}>{suggestedTeacher.phone}</p> | السن: <span style={{ color: suggestedTeacher.details.age < data.age ? "red" : "" }}>{suggestedTeacher.details.age}</span>
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="">لا يوجد نتائج مقترحة</MenuItem>
                                        )}
                                    </Select>
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
