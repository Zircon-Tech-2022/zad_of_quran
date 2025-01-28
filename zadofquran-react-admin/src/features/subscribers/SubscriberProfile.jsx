import React, { useContext } from "react";
import MyModal, { ModalContext } from "../../ui/MyModal";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useSubscriberShow } from "./useSubscriberShow";
import Spinner from "../../ui/Spinner";
import ProfileInfo from "./ProfileInfo";
import LessonsTable from "./LessonsTable";
import TimezoneButton from "../teachers/TimezoneButton";
import { calculateTimezone } from "../../utils/helpers";

const DivStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const SubscriberProfile = ({ subscriberToView }) => {
    let defaultTimezone = "GMT+2";
    const { isLoading, user, updateTimezone, isUpdateTimezoneLoading } = useSubscriberShow(subscriberToView?.id, defaultTimezone);

    const { close } = useContext(ModalContext);

    if (!isLoading && !isUpdateTimezoneLoading && user?.data?.lessons[0]?.availabilities[0]) {
        defaultTimezone = calculateTimezone(user.data.lessons[0].availabilities[0].start_times['local'],
            user.data.lessons[0].availabilities[0].start_times['gmt']);
    }

    const handleTimezoneChange = async (e) => {
        updateTimezone({ id: subscriberToView?.id, timezone: e.target.value });
    }

    if (isLoading || isUpdateTimezoneLoading) {
        return <Spinner />;
    }

    return (
        <>
            {!isLoading && user && (
                <DivStyle>
                    <ProfileInfo subscriber={user?.data} />
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

export default SubscriberProfile;
