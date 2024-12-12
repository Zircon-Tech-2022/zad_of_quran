import { Container, Grid } from "@mui/material";

import React from "react";
import { FaBookQuran } from "react-icons/fa6";
import styles from "./header.module.css";
import { scrollToSection } from "../../utils/helpers";
import Facebook from "../../ui/Facebook";
import Whatsapp from "../../ui/Whatsapp";
import Telegram from "../../ui/Telegram";
import ContactButton from "../../ui/ContactButton";
import Insta from "../../ui/Insta";
import Snap from "../../ui/Snap";
import { useTranslation } from "react-i18next";
import TikTok from "../../ui/TikTok";
const Header = () => {
    const { t } = useTranslation();
    return (
        <header className={styles.header}>
            <div className={styles.headerContact}>
                <h4
                    className={styles.contactText}
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    data-aos-delay="0"
                >
                    {t("contact-us")}
                </h4>

                <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    data-aos-delay="0"
                >
                    <Facebook />
                </span>
                <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    data-aos-delay="0"
                >
                    <Insta />
                </span>
                <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    data-aos-delay="0"
                >
                    <Snap />
                </span>
                <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    data-aos-delay="0"
                >
                    <Whatsapp />
                </span>

                <span
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    data-aos-delay="0"
                >
                    <Telegram />
                </span>
            </div>
            <Container maxWidth="xl">
                <Grid
                    container
                    alignItems="center"
                    spacing="3rem"
                    justifyContent="center"
                >
                    <Grid item md={7}>
                        <div className={styles.content}>
                            <h1
                                className={styles.heading}
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                data-aos-delay="0"
                            >
                                {t("hero-title").split(" ")[0]}{" "}
                                <span className={styles.sub}>
                                    {t("hero-title").split(" ")[1]}{" "}
                                </span>
                                {t("hero-title").split(" ").slice(2).join(" ")}
                            </h1>
                            <ul
                                className={styles.list}
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                data-aos-delay="100"
                            >
                                <li className={styles.item}>{t("hero-p-1")}</li>
                                <li className={styles.item}>{t("hero-p-2")}</li>
                                <li className={styles.item}>{t("hero-p-3")}</li>
                                <li className={styles.item}>{t("hero-p-4")}</li>
                                <li className={styles.item}>{t("hero-p-5")}</li>
                            </ul>
                            <div
                                className={styles.headrButtons}
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay="0"
                            >
                                <button
                                    className={styles.free}
                                    onClick={() =>
                                        scrollToSection(
                                            document?.getElementById("plans")
                                        )
                                    }
                                >
                                    <span>
                                        <FaBookQuran />
                                    </span>
                                    <span>{t("free-session")} </span>
                                </button>

                                <ContactButton />
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={5}>
                        <div
                            className={styles.image}
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-delay="0"
                        >
                            <img
                                src="/imgs/logo.svg"
                                alt="academyLogo"
                                width={100}
                                height={100}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </header>
    );
};

export default Header;
