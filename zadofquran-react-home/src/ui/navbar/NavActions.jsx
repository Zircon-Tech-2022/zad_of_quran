import React from "react";
import styles from "./navbar.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Menu, MenuItem } from "@mui/material";
import { BiLogOut } from "react-icons/bi";
import { FaGraduationCap, FaUserGraduate } from "react-icons/fa6";
import { useUser } from "../../features/authentication/useUser";
import { useLogout } from "../../features/useLogout";
import Spinner from "../Spinner";
import { useLangContext } from "../../context/LangContext";
import { t } from "i18next";

const NavActions = () => {
    const location = useLocation();

    const { isLoading, isAuth, user } = useUser();
    const { logout, isLoading: isLogout } = useLogout();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { language, setLanguage } = useLangContext();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open2 = Boolean(anchorEl2);

    const containsTeacher = location.pathname.includes('teacher');
    const isAuthTeacher = localStorage.getItem('user-type') === "teacher";

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className={`${styles.navAction} animated fade`}>
            {!isLoading && !localStorage.getItem("token") && !isAuth && !containsTeacher ? (
                <>
                    <Link
                        to={`/${language}/login`}
                        className={`${styles.nonSolid} ${styles.mainAction}`}
                    >
                        <span className={styles.icon}>
                            <FaUserGraduate />
                        </span>
                        {t("login")}
                    </Link>
                    <Link
                        to={`/${language}/signup`}
                        className={`${styles.solid} ${styles.mainAction}`}
                    >
                        <span className={styles.icon}>
                            <FaGraduationCap />
                        </span>
                        {t("signup")}
                    </Link>
                </>
            ) : (
                ""
            )}

            {!isLoading && !containsTeacher && isAuth && localStorage.getItem("token") && !isAuthTeacher && (
                <>
                    <button
                        className={`${styles.nonSolid} ${styles.mainAction} animated fade`}
                        open={open}
                        onClick={handleClick}
                    >
                        <span className={styles.icon}>
                            <FaGraduationCap />
                        </span>
                        {user.data?.name}
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
            <div className={styles.langParent}>
                <button
                    id="basic-button"
                    aria-controls={open ? "basic-menu2" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick2}
                >
                    <div className={styles.langImg}>
                        {/* <img
                            src={`/imgs/${language}Flag.webp`}
                            alt="language "
                            width={30}
                            height={30}
                        /> */}
                        {/* {language === "ar"
                            ? language === "ar"
                                ? "العربية"
                                : "الإنجليزية"
                            : ""}
                        {language === "en"
                            ? language === "en"
                                ? "English"
                                : "Arabic"
                            : ""} */}
                        {language === "en" ? "English" : "العربية"}
                    </div>
                </button>
                <Menu
                    id="basic-menu2"
                    anchorEl={anchorEl2}
                    open={open2}
                    onClose={handleClose2}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                    sx={{
                        ".MuiPaper-root": {
                            width: "8rem",
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            handleClose2();
                            setLanguage(language === "ar" ? "en" : "ar");
                            localStorage.setItem("lang", language);
                            navigate(`/${language === "ar" ? "en" : "ar"}`);
                        }}
                    >
                        {/* <div className={styles.langImg}>
                            <img
                                src={`/imgs/${
                                    language === "ar" ? "en" : "ar"
                                }Flag.webp`}
                                alt="language "
                                width={30}
                                height={30}
                            />
                        </div> */}
                        {/* {language === "ar"
                            ? language === "ar"
                                ? "الإنجليزية"
                                : "العربية"
                            : ""}
                        {language === "en"
                            ? language === "en"
                                ? "Arabic"
                                : "English"
                            : ""} */}

                        {language === "en" ? "العربية" : "English"}
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default NavActions;
