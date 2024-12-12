import React from "react";
import styles from "./why.module.css";
import { Container, Grid } from "@mui/material";
import { t } from "i18next";

const Why = () => {
    const items = [
        {
            img: "/imgs/home/why/clock.svg",
            title: t("why-1-title"),
            text: t("why-1-p"),
        },
        {
            img: "/imgs/home/why/group.svg",
            title: t("why-2-title"),
            text: t("why-2-p"),
        },
        {
            img: "/imgs/home/why/language.svg",
            title: t("why-3-title"),
            text: t("why-3-p"),
        },
        {
            img: "/imgs/home/why/book.svg",
            title: t("why-4-title"),
            text: t("why-4-p"),
        },
        {
            img: "/imgs/home/why/certificate.svg",
            title: t("why-5-title"),
            text: t("why-5-p"),
        },
        {
            img: "/imgs/home/why/signature.svg",
            title: t("why-6-title"),
            text: t("why-6-p"),
        },
    ];
    return (
        <section className={`${styles.why} section-padding`} id="why">
            <Container maxWidth="xl">
                <Grid container spacing="3rem">
                    <Grid item lg={4} sx={{ position: "relative" }}>
                        <div
                            className={styles.whyZad}
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            data-aos-delay="0"
                        >
                            <div className={styles.zadImg}>
                                <img
                                    src="/imgs/home/zad.svg"
                                    width={150}
                                    height={150}
                                    alt="why zad"
                                />
                            </div>
                            <h2 className="mainHeading">{t("why-zad")}</h2>
                        </div>
                    </Grid>
                    <Grid item lg={8}>
                        <Grid container spacing="6rem">
                            {items.map((item, index) => {
                                return (
                                    <Grid key={index} item md={6} xs={12}>
                                        <div
                                            className={styles.item}
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                            data-aos-delay={`${index * 100}`}
                                        >
                                            <div>
                                                <img
                                                    className={styles.itemImg}
                                                    src={item.img}
                                                    alt={item.title}
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                            <div className={styles.itemContent}>
                                                <h3>{item.title}</h3>
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Why;
