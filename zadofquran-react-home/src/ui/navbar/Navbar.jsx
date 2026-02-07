import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import styles from "./navbar.module.css";

import Brand from "./Brand";
import { Link, useNavigate } from "react-router-dom";

import { ObserverFun } from "../../utils/helpers";
import { NavLinks, langsArr } from "../../Constants";
import NavActions from "./NavActions";
import { useLangContext } from "../../context/LangContext";
const Navbar = () => {
    const [activeScroll, setActiveScroll] = useState(false);
    const [activeMobile, setActiveMobile] = useState(false);
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const [activeSection, setActiveSection] = useState(null);
    const [showItems] = useState(NavLinks);
    const { language } = useLangContext();
    useEffect(() => {
        ObserverFun(setActiveSection);
    }, [pathname]);
    useEffect(function () {
        function handle() {
            if (window.scrollY > 0) {
                setActiveScroll(true);
            } else {
                setActiveScroll(false);
            }
        }
        handle();

        window.addEventListener("scroll", handle);
    }, []);
    return (
        <nav
            className={`${styles.nav} ${activeScroll && styles.active} ${
                activeMobile && styles.activeMobile
            }`}
        >
            <Container maxWidth="xl">
                <div className={styles.navContent}>
                    <Brand activeScroll={activeScroll} />
                    <div className={styles.items}>
                        <ul className={styles.list}>
                            {showItems?.map((item, index) => {
                                if (item.onClick) {
                                    return (
                                        <li
                                            onClick={() =>
                                                setActiveMobile(false)
                                            }
                                            key={index}
                                            className={`${styles.listItem} ${
                                                activeSection === item.id &&
                                                (pathname === "/" ||
                                                    langsArr.includes(
                                                        `${pathname.replace(
                                                            "/",
                                                            ""
                                                        )}`
                                                    ))
                                                    ? styles.activeListItem
                                                    : ""
                                            }`}
                                        >
                                            <button
                                                onClick={() => {
                                                    if (
                                                        pathname !== "/" &&
                                                        !langsArr.includes(
                                                            `${pathname.replace(
                                                                "/",
                                                                ""
                                                            )}`
                                                        ) &&
                                                        item.id !== "footer"
                                                    ) {
                                                        navigate(
                                                            `/${language}`
                                                        );
                                                    } else {
                                                        item.onClick();
                                                    }
                                                }}
                                            >
                                                {item[language]}
                                            </button>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li
                                            onClick={() =>
                                                setActiveMobile(false)
                                            }
                                            key={index}
                                            className={`${styles.listItem} ${
                                                pathname ===
                                                `/${language}/${item.to}`
                                                    ? styles.activeListItem
                                                    : ""
                                            }`}
                                        >
                                            <Link
                                                to={`/${language || "ar"}/${
                                                    item.to
                                                }`}
                                            >
                                                {item[language]}
                                            </Link>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                        <NavActions />
                    </div>
                    <button
                        className={styles.toggleBarBtn}
                        onClick={() =>
                            setActiveMobile((last) => {
                                return !last;
                            })
                        }
                    >
                        <span className={styles.topLine}></span>
                        <span className={styles.middleLine}></span>
                        <span className={styles.bottomLine}></span>
                    </button>
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
