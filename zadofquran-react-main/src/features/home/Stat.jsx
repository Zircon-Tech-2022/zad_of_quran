import { Container, Grid } from "@mui/material";

import React from "react";
import styles from "./stat.module.css";
import { t } from "i18next";
import { useLangContext } from "../../context/LangContext";

const Stat = () => {
    const { language } = useLangContext();
    let xlValue, lgValue, mdValue, smValue, xsValue;
    const items = [
        {
            img: "/imgs/home/users-between-lines.svg",
            title: "+1750",
            type: t("students"),
        },
        {
            img: "/imgs/home/chalkboard-user.svg",
            title: "+80",
            type: t("teachers"),
        },
        {
            img: "/imgs/home/clock-desk.svg",
            title: "+10000",
            type: t("hours"),
        },
        {
            img: "/imgs/home/book-open-cover.svg",
            title: "+20000",
            type: t("lessons"),
        },
    ];
    if (language === "ar") {
        xlValue = 2.4;
        lgValue = 3;
        mdValue = 4.5;
        smValue = 6;
        xsValue = 6;
    } else {
        xlValue = 4;
        lgValue = 5;
        mdValue = 6;
        smValue = 9;
        xsValue = 11;
    }
    return (
        <section className={styles.statHead}>
            <Container maxWidth="xl">
                <Grid container spacing="3rem" justifyContent="center">
                    {items?.map((item, index) => {
                        return (
                            <Grid
                                item
                                xl={2.4}
                                lg={3}
                                md={4.5}
                                sm={6}
                                xs={6}
                                key={index + 1}
                                className="ontop"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay={`${index * 100}`}
                            >
                                <div className={`${styles.stat}`}>
                                    <div className={styles.statImg}>
                                        <img
                                            src={item.img}
                                            alt="statistics image"
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                    <div className={styles.statContent}>
                                        <span className={styles.title}>
                                            {item.title}
                                        </span>
                                        <span className={styles.type}>
                                            {item.type}
                                        </span>
                                    </div>
                                </div>
                            </Grid>
                        );
                    })}
                    <Grid
                        item
                        xl={xlValue}
                        lg={lgValue}
                        md={mdValue}
                        sm={smValue}
                        xs={xsValue}
                        className="ontop"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="500"
                    >
                        <div className={`${styles.stat}`}>
                            <div className={styles.statImg}>
                                <img
                                    src={"/imgs/home/earth-africa.svg"}
                                    alt="statistics image"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div className={styles.statContent}>
                                <span className={styles.type}>
                                    {t("represented")}
                                </span>
                                <span className={styles.title}>7</span>
                                <span className={styles.type}>
                                    {t("countries")}
                                </span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Stat;
