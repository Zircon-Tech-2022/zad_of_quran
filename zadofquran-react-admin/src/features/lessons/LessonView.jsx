import React, { useContext } from "react";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useLessonShow } from "./useLessonShow";
import Spinner from "../../ui/Spinner";
import TimezoneButton from "../../ui/TimezoneButton";
import { calculateTimezone } from "../../utils/helpers";
import LessonsTable from "../teachers/LessonsTable";
import { Typography } from "@mui/material";
import ProfileInfo from "../teachers/ProfileInfo";
import SubscriberProfileInfo from "../subscribers/ProfileInfo";
import styles from "./lesson.module.css";
import { Link } from "react-router-dom";
import CoursesList from "../teachers/CoursesList";

const DivStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const LessonView = ({ lessonToView }) => {
    let defaultTimezone = "GMT+2";
    const { isLoading, lesson, updateTimezone, isUpdateTimezoneLoading } = useLessonShow(lessonToView?.id, defaultTimezone);

    const { close } = useContext(ModalContext);

    if (!isLoading && !isUpdateTimezoneLoading && lesson?.data?.availabilities[0]) {
        defaultTimezone = calculateTimezone(lesson.data.availabilities[0].start_times['local'],
            lesson.data.availabilities[0].start_times['gmt']);
    }

    const handleTimezoneChange = async (newValue) => {
        updateTimezone({ id: lessonToView?.id, timezone: newValue });
    }

    if (isLoading || isUpdateTimezoneLoading) {
        return <Spinner />;
    }

    return (
        <>
            {!isLoading && lesson && (
                <DivStyle>
                    <Typography variant="h3">{`حلقة #${lesson.data.id}`}</Typography>
                    <Link
                        to={`/teachers?q=${lesson.data.staff.email}`}
                        className={styles.link}
                    >
                        <Typography variant="h4">{"بيانات المعلم"}</Typography>
                    </Link>
                    <ProfileInfo user={lesson.data.staff} />
                    <SubscriberProfileInfo subscriber={lesson.data.subscriber} />
                    <CoursesList courses={[lesson.data.course]} />
                    <TimezoneButton defaultValue={defaultTimezone} handleChange={handleTimezoneChange} />
                    <LessonsTable lessons={[lesson.data]} />
                </DivStyle>
            )}
            <MyModal.Footer>
                <Button onClick={close} variation="third" type="button">
                    إلغاء
                </Button>
            </MyModal.Footer>
        </>
    );
};

export default LessonView;
