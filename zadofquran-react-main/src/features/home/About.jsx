import React, { useState } from "react";
import styles from "./about.module.css";
import { Container, Grid } from "@mui/material";

import Button from "../../ui/Button";
import Play from "../../ui/Play";
import Portal from "./Portal";
import { t } from "i18next";
const About = () => {
    const [active, setActive] = useState("message");
    const [show, setShow] = useState(false);

    return (
        <section className={styles.about} id="about">
            <img
                src="/imgs/pattern.webp"
                width={1300}
                height={700}
                alt="pattern"
                className={styles.pattern}
            />
            <Container maxWidth="xl">
                <Grid container spacing="5rem">
                    <Grid item lg={5}>
                        <div
                            className={styles.content}
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            data-aos-delay="0"
                        >
                            <h2 className="mainHeading">
                                {t("about-academy")}
                            </h2>
                            <div className={styles.buttons}>
                                <Button
                                    className={
                                        active === "message" ? "active" : ""
                                    }
                                    onClick={() => setActive("message")}
                                >
                                    {t("mission")}
                                </Button>
                                <Button
                                    className={
                                        active === "vision" ? "active" : ""
                                    }
                                    onClick={() => setActive("vision")}
                                >
                                    {t("vision")}
                                </Button>
                                <Button
                                    className={
                                        active === "goals" ? "active" : ""
                                    }
                                    onClick={() => setActive("goals")}
                                >
                                    {t("objectives")}
                                </Button>
                            </div>
                            {active === "message" && (
                                <p className="animated fade">
                                    {t("mission-p")}
                                </p>
                            )}
                            {active === "goals" && (
                                <p className="animated fade">
                                    <ul className={styles.goals}>
                                        <li>
                                            <span>{t("objectives-p-1")}</span>
                                        </li>
                                        <li>
                                            <span>{t("objectives-p-2")}</span>
                                        </li>
                                        <li>
                                            <span>{t("objectives-p-3")}</span>
                                        </li>
                                        <li>
                                            <span>{t("objectives-p-4")}</span>
                                        </li>
                                        <li>
                                            <span>{t("objectives-p-5")}</span>
                                        </li>
                                    </ul>
                                </p>
                            )}
                            {active === "vision" && (
                                <p className="animated fade">
                                    <p className="animated fade">
                                        <ul className={styles.goals}>
                                            <li>
                                                <span>{t("vision-p-1")}</span>
                                            </li>
                                            <li>
                                                <span>{t("vision-p-2")}</span>
                                            </li>
                                            <li>
                                                <span>{t("vision-p-3")}</span>
                                            </li>
                                        </ul>
                                    </p>
                                </p>
                            )}
                        </div>
                    </Grid>
                    <Grid
                        item
                        style={{ position: "relative" }}
                        lg={7}
                        xs={12}
                        alignSelf={{ lg: "flex-end" }}
                    >
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-delay="0"
                        >
                            <div className={styles.video}>
                                <img
                                    src="/imgs/home/sheikh.svg"
                                    alt="teacher svg"
                                    width={100}
                                    height={200}
                                    className={styles.sheikh}
                                />
                                <button
                                    className={styles.videoPicParent}
                                    onClick={() => setShow(true)}
                                >
                                    <img
                                        src="/imgs/home/quran.webp"
                                        alt="video pic"
                                        width={400}
                                        height={200}
                                        className={styles.videoPic}
                                    />
                                    <span className={styles.playOverlay}>
                                        <Play />
                                    </span>
                                </button>
                                <Portal show={show} setShow={setShow} />
                                <img
                                    src="/imgs/home/frame.png"
                                    alt="teacher svg"
                                    width={400}
                                    height={400}
                                    className={styles.frame}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default About;
