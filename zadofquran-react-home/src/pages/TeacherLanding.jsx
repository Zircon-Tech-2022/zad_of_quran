import React, { useState } from "react";
import Body from "../ui/Body";
import Header from "../ui/Header";
import Spinner from "../ui/Spinner";
import PageLayout from "../ui/PageLayout";
import { t } from "i18next";
import styles from "./teacher.module.css";
import { Link } from "react-router-dom";

import { Menu, MenuItem } from "@mui/material";
import { BiLogOut } from "react-icons/bi";
import { FaGraduationCap, FaUserGraduate } from "react-icons/fa6";
import { useUser } from "./../features/authentication/useUser";
import { useLogout } from "../features/useLogout";
import { useLangContext } from "./../context/LangContext";

const TeacherLanding = () => {
    const { isLoading, isAuth, user } = useUser();
    const { logout, isLoading: isLogout } = useLogout();
    const [anchorEl, setAnchorEl] = useState(null);
    const { language } = useLangContext();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    {!localStorage.getItem("token") && !isAuth && !isLoading && (
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
                            <Link
                                to={`/${language}/teacher/signup`}
                                className={`${styles.solid} ${styles.mainAction} ${styles.link}`}
                            >
                                <span className={styles.icon}>
                                    <FaGraduationCap />
                                </span>
                                {t("teacher-signup-title")}
                            </Link>
                        </>
                    )}

                    {!isLoading && isAuth && localStorage.getItem("token") && (
                        <>
                            <button
                                className={`${styles.nonSolid} ${styles.mainAction} ${styles.btn} animated fade`}
                                open={open}
                                onClick={handleClick}
                            >
                                <span className={styles.icon}>
                                    <FaGraduationCap />
                                </span>
                                {user?.data?.name}
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
                    )}
                </div>
            </Body>
        </PageLayout >
    );
};

export default TeacherLanding;
