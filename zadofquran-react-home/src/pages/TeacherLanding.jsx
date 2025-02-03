import React, { useEffect, useState } from "react";
import Body from "../ui/Body";
import Header from "../ui/Header";
import Spinner from "../ui/Spinner";
import PageLayout from "../ui/PageLayout";
import { t } from "i18next";
import styles from "./teacher.module.css";
import { Link } from "react-router-dom";

import { Avatar, Menu, MenuItem } from "@mui/material";
import { BiLogOut } from "react-icons/bi";
import { FaGraduationCap, FaUserGraduate } from "react-icons/fa6";
import { useUser } from "./../features/authentication/useUser";
import { useLogout } from "../features/useLogout";
import { useLangContext } from "./../context/LangContext";
import ProfileInfo from './../features/teachers/ProfileInfo';
import TimezoneButton from "../features/teachers/TimezoneButton";
import CoursesList from "../features/teachers/CoursesList";
import AvailabilityTable from './../features/teachers/AvailabilityTable';
import LessonsTable from "../features/teachers/LessonsTable";
import { calculateTimezone } from "./../utils/helpers";

const TeacherLanding = () => {
    const { isLoading, isAuth, user, updateTimezone, isUpdateTimezoneLoading } = useUser();
    const { logout, isLoading: isLogout } = useLogout();
    const [anchorEl, setAnchorEl] = useState(null);
    const { language } = useLangContext();
    const open = Boolean(anchorEl);

    let defaultTimezone = "GMT+2";
    let isProfileCompleted = null;
    const isTeacher = localStorage.getItem('user-type') === "teacher";

    if (!isLoading && !isUpdateTimezoneLoading && user?.data?.user?.availabilities[0]) {
        defaultTimezone = calculateTimezone(user.data.user.availabilities[0].start_times['local'],
            user.data.user.availabilities[0].start_times['gmt']);
        isProfileCompleted = user?.data?.user?.courses?.length && user?.data?.user?.availabilities?.length;
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTimezoneChange = async (newValue) => {
        updateTimezone(newValue);
    }

    return (
        <PageLayout>
            <Header title={t("teacher")} />
            <Body>
                <div className={`animated fade ${styles.btnContainer}`}
                    style={{
                        justifyContent: !isAuth ? "center" : "start",
                        alignItems: !isAuth ? "center" : "start",
                    }}
                >
                    {(isLoading || isUpdateTimezoneLoading) && <Spinner />}
                    {((!localStorage.getItem("token") && !isAuth && !isLoading && !isUpdateTimezoneLoading) ||
                        (localStorage.getItem("token") && isAuth && !isTeacher && !isLoading && !isUpdateTimezoneLoading))
                        && (
                            <>
                                <Link
                                    to={`/${language}/teacher/login`}
                                    className={`${styles.nonSolid} ${styles.mainAction} ${styles.link} ${styles.mainLink}`}
                                >
                                    <span className={styles.icon}>
                                        <FaUserGraduate />
                                    </span>
                                    {t("teacher-login-title")}
                                </Link>
                            </>
                        )}

                    {!isLoading && !isUpdateTimezoneLoading && isTeacher && isAuth && localStorage.getItem("token") && (
                        (isProfileCompleted) ? (
                            <>
                                <button
                                    className={`${styles.nonSolid} ${styles.mainAction} ${styles.btn} animated fade`}
                                    open={open}
                                    onClick={handleClick}
                                >
                                    <span >
                                        <Avatar alt={user?.data?.user?.name} src={user?.data?.user?.image} />
                                    </span>
                                    {user?.data?.user?.name}
                                </button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <Link
                                        to={`/${language}/teacher/update-profile`}
                                    >
                                        <MenuItem
                                            sx={{ gap: "1.5rem", fontSize: "1.6rem" }}
                                        >
                                            {t("update-profile")}
                                        </MenuItem>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleClose();
                                            logout();
                                        }}
                                        disabled={isLogout}
                                    >
                                        <MenuItem
                                            sx={{ gap: "1.5rem", fontSize: "1.6rem" }}
                                        >
                                            {t("logout")}
                                            <span className={styles.icon}>
                                                <BiLogOut />
                                            </span>
                                        </MenuItem>
                                    </button>
                                    {isLogout && <Spinner />}
                                </Menu>
                            </>
                        ) : (
                            <Link
                                to={`/${language}/teacher/signup`}
                                className={`${styles.solid} ${styles.mainAction} ${styles.link}`}
                            >
                                <span className={styles.icon}>
                                    <FaGraduationCap />
                                </span>
                                {t("teacher-signup-title")}
                            </Link>
                        )
                    )}
                </div>
                {!isLoading && !isUpdateTimezoneLoading && user?.data?.user && (
                    (isProfileCompleted) && (
                        <div className={styles.profileContainer}>
                            <ProfileInfo user={user?.data?.user} />
                            <TimezoneButton defaultValue={defaultTimezone} handleChange={handleTimezoneChange} />
                            <CoursesList courses={user?.data?.user.courses} />
                            <AvailabilityTable availabilities={user?.data?.user.availabilities} />
                            <LessonsTable lessons={user?.data?.user.lessons} />
                        </div>
                    )
                )}
            </Body>
        </PageLayout >
    );
};

export default TeacherLanding;
