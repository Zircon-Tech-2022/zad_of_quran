import { Container } from "@mui/material";

import { useEffect, useState } from "react";
import styles from "./teachers.module.css";
import { FaUserTie } from "react-icons/fa6";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { API_URL } from "../../Constants";
import { t } from "i18next";
import Slider from "react-slick";
import { useLangContext } from "../../context/LangContext";

const breakpoints = {
    0: {
        slidesPerView: 1,
        spaceBetween: 20,
    },
    500: {
        slidesPerView: 1.25,
        spaceBetween: 30,
    },
    800: {
        slidesPerView: 2,
        spaceBetween: 30,
    },
    1200: {
        slidesPerView: 2.7,
        spaceBetween: 40,
    },
    1360: {
        slidesPerView: 3,
        spaceBetween: 30,
    },
    1450: {
        slidesPerView: 4,
        spaceBetween: 10,
    },
};
async function getTeachers(language) {
    const res = await fetch(`${API_URL}staff`, {
        headers: {
            "accept-language": language,
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer `,
        },
    });
    if (!res.ok) throw new Error("lol");
    return res.json();
}
var settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    // initialSlide: 0,
    //space between items
    swipeToSlide: true,
    responsive: [
        {
            breakpoint: 1360,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};
const Teachers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLangContext();
    useEffect(() => {
        async function callFun() {
            try {
                const data = await getTeachers(language);

                setData(data.data);
                setLoading(false);
            } catch (err) { }
        }
        callFun();
    }, [language]);
    return (
        <section
            className="section-padding"
            id="teachers"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="0"
        >
            <Container maxWidth="xl">
                <h2
                    className="mainHeading"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="0"
                >
                    {t("team")}
                </h2>
                <div className={styles.teachers}>
                    {!data.length && !loading && (
                        <Empty text={t("no-teachers")} />
                    )}

                    {loading && <Spinner />}
                    {(!loading && data.length && (
                        <Slider {...settings}>
                            {data.map((item, i) => (
                                <div className="slideitem">
                                    <div className={styles.item}>
                                        <div className={styles.cover}>
                                            <div className={styles.teacherImg}>
                                                <img
                                                    src={item.image}
                                                    alt="teacher"
                                                    width={300}
                                                    height={400}
                                                />
                                            </div>
                                            <div className={styles.info}>
                                                <span
                                                    className={styles.infoIcon}
                                                >
                                                    <FaUserTie />
                                                </span>
                                                <h4
                                                    className={styles.infoTitle}
                                                >
                                                    {item.name}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className={styles.realContent}>
                                            <h3
                                                className={`${styles.hoverName} mainHeading`}
                                            >
                                                {item.name}
                                            </h3>
                                            <div
                                                className={styles.content}
                                                dangerouslySetInnerHTML={{
                                                    __html: item.qualifications,
                                                }}
                                                dir="auto"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )) ||
                        null}
                </div>
            </Container>
        </section>
    );
};

export default Teachers;
