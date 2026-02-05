import React, { useContext } from "react";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useSupervisorShow } from "./useSupervisorShow";
import Spinner from "../../ui/Spinner";
import { calculateTimezone } from "../../utils/helpers";
import ProfileInfo from "./ProfileInfo";
import TimezoneButton from "../../ui/TimezoneButton";
import LessonsTable from "./LessonsTable";

const DivStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const SupervisorProfile = ({ supervisorToView }) => {
    let defaultTimezone = "Africa/Cairo";
    const { isLoading, user, updateTimezone, isUpdateTimezoneLoading } = useSupervisorShow(supervisorToView?.id, defaultTimezone);
    const { close } = useContext(ModalContext);

    if (!isLoading && !isUpdateTimezoneLoading && user?.data?.lessons[0]?.availabilities[0]) {
        defaultTimezone = calculateTimezone(user.data.lessons[0].availabilities[0].start_times['local'],
            user.data.lessons[0].availabilities[0].start_times['gmt']);
    }

    const handleTimezoneChange = async (newValue) => {
        updateTimezone({ id: supervisorToView?.id, timezone: newValue });
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

export default SupervisorProfile;
