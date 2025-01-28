import React, { useContext } from "react";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useTeacherShow } from "./useTeacherShow";
import Spinner from "../../ui/Spinner";
import { calculateTimezone } from "../../utils/helpers";
import ProfileInfo from "./ProfileInfo";
import TimezoneButton from "../../ui/TimezoneButton";
import CoursesList from "./CoursesList";
import AvailabilityTable from "./AvailabilityTable";
import LessonsTable from "./LessonsTable";

const DivStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const TeacherProfile = ({ teacherToView }) => {
    let defaultTimezone = "GMT+2";
    const { isLoading, user, updateTimezone, isUpdateTimezoneLoading } = useTeacherShow(teacherToView?.id, defaultTimezone);
    const { close } = useContext(ModalContext);

    if (!isLoading && !isUpdateTimezoneLoading && user?.data?.user?.availabilities[0]) {
        defaultTimezone = calculateTimezone(user.data.user.availabilities[0].start_times['local'],
            user.data.user.availabilities[0].start_times['gmt']);
    }

    const handleTimezoneChange = async (e) => {
        updateTimezone({ id: teacherToView?.id, timezone: e.target.value });
    }

    if (isLoading || isUpdateTimezoneLoading) {
        return <Spinner />;
    }

    return (
        <>
            {!isLoading && !isUpdateTimezoneLoading && user && (
                <DivStyle>
                    <ProfileInfo user={user?.data} />
                    <TimezoneButton defaultValue={defaultTimezone} handleChange={handleTimezoneChange} />
                    <CoursesList courses={user?.data?.courses} />
                    <AvailabilityTable availabilities={user?.data?.availabilities} />
                    <LessonsTable lessons={user?.data?.lessons} />
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

export default TeacherProfile;
