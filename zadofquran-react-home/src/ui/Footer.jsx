import { Container, Grid } from "@mui/material";
import React from "react";
import styles from "./footer.module.css";

import ContactForm from "./ContactForm";
import Whatsapp from "./Whatsapp";
import Facebook from "./Facebook";
import Telegram from "./Telegram";
import Youtube from "./Youtube";
import Insta from "./Insta";
import Snap from "./Snap";
import { t } from "i18next";
import TikTok from "./TikTok";
import { useLocation } from "react-router-dom";
const Footer = () => {
    const location = useLocation();
    const containsTeacher = location.pathname.includes('teacher');

    return (
        <section id="footer" className={styles.footer}>
            {!containsTeacher && (<div className={styles.contanct}>
                <Container maxWidth="xl">
                    <Grid container spacing="3rem" justifyContent="center">
                        <Grid
                            item
                            xl={7}
                            md={6}
                            style={{ position: "relative" }}
                        >
                            <div
                                className={styles.content}
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                data-aos-delay="0"
                            >
                                <div className={styles.zadImg}>
                                    <img
                                        src="/imgs/home/zad.svg"
                                        width={150}
                                        height={150}
                                        alt=" zad"
                                    />
                                </div>
                                <h2 className="mainHeading">
                                    {t("freeTrial")}
                                </h2>
                            </div>
                        </Grid>
                        <Grid
                            item
                            xl={5}
                            md={6}
                            sm={9}
                            xs={12}
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-delay="0"
                        >
                            <ContactForm />
                        </Grid>
                    </Grid>
                </Container>
            </div>)}
            <img
                src="/imgs/footer.svg"
                alt="footer"
                width={1500}
                height={400}
            />

            <div className={styles.copyRight}>
                <Container>
                    <div className={styles.FooterLinks}>
                        <Telegram />
                        <Whatsapp />
                        <Youtube />
                        <Snap />
                        <Insta />
                        <Facebook />
                        <TikTok />
                    </div>
                    <div className={styles.copyRightText}>
                        <p>
                            {t("copyRight")} {new Date().getFullYear()}
                        </p>
                        <span className={styles.line}>|</span>
                        <p>
                            made with ❤️ by{" "}
                            <a
                                title="zircon-page"
                                name="zircon-page"
                                href="https://www.facebook.com/zircon.tech.eg"
                                className={styles.zircon}
                            >
                                ZIRCON TECH
                            </a>
                        </p>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default Footer;
