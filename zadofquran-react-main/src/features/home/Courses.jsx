import React, { useEffect, useState } from "react";
import styles from "./courses.module.css";
import { Container } from "@mui/material";

import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import { scrollToSection } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { API_URL } from "../../Constants";
import { t } from "i18next";
import { useLangContext } from "../../context/LangContext";
import Slider from "react-slick";
SwiperCore.use([Autoplay, Navigation]);
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
        slidesPerView: 3.5,
        spaceBetween: 30,
    },
};
async function getCourses(lang) {
    const res = await fetch(`${API_URL}courses`, {
        headers: {
            "accept-language": lang || "ar",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer `,
        },
    });
    // if (!res.ok) throw new Error("lol");
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
const Courses = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLangContext();
    useEffect(() => {
        async function callFun() {
            try {
                const data = await getCourses(language);

                setData(data.data);
                setLoading(false);
            } catch (err) {}
        }
        callFun();
    }, [language]);
    return (
        <section
            className={`section-padding ${styles.coursesParent}`}
            id="courses"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="0"
        >
            <Container maxWidth="xl">
                <h2 className="mainHeading">{t("courses")}</h2>
                <div className={styles.courses}>
                    {!data.length && !loading && (
                        <Empty text={t("no-courses")} />
                    )}
                    {loading && <Spinner />}
                    {(!loading && data.length && (
                        // <Swiper
                        //     style={{ width: "100%" }}
                        //     spaceBetween={30}
                        //     grabCursor
                        //     breakpoints={breakpoints}
                        //     autoplay={{
                        //         delay: 2500,
                        //         disableOnInteraction: true,
                        //     }}
                        //     speed={400}
                        //     navigation={{
                        //         prevEl: ".swiper-button-prev",
                        //         nextEl: ".swiper-button-next",
                        //     }}
                        //     data-aos="fade-up"
                        //     data-aos-duration="1000"
                        //     data-aos-delay="100"
                        // >
                        //     {data.map((course, i) => (
                        //         <SwiperSlide key={i}>
                        //             <div className={styles.course}>
                        //                 <div className={styles.courseImg}>
                        //                     <img
                        //                         src={course.image}
                        //                         width={400}
                        //                         height={200}
                        //                         alt="course picture"
                        //                     />
                        //                 </div>
                        //                 <div className={styles.content}>
                        //                     <h3 dir="auto">{course.name} </h3>
                        //                     <Button
                        //                         className={styles.contact}
                        //                         onClick={() =>
                        //                             scrollToSection(
                        //                                 document?.getElementById(
                        //                                     "plans"
                        //                                 )
                        //                             )
                        //                         }
                        //                     >
                        //                         {t("subscribe")}
                        //                     </Button>
                        //                 </div>
                        //             </div>
                        //         </SwiperSlide>
                        //     ))}
                        //     <button
                        //         className="swiper-button-prev swiperControl"
                        //         name="portfolio_prev"
                        //         id="portfolio_prev"
                        //         title="portfolio_prev"
                        //     >
                        //         <span>
                        //             <BsArrowRight />
                        //         </span>
                        //     </button>
                        //     <button
                        //         className="swiper-button-next swiperControl"
                        //         name="portfolio_next"
                        //         id="portfolio_next"
                        //         title="portfolio_next"
                        //     >
                        //         <span>
                        //             <BsArrowLeft />
                        //         </span>
                        //     </button>
                        // </Swiper>
                        <Slider {...settings}>
                            {data.map((course, i) => (
                                <div className="slideitem" key={i}>
                                    <div className={styles.course}>
                                        <div className={styles.courseImg}>
                                            <img
                                                src={course.image}
                                                width={400}
                                                height={200}
                                                alt="course picture"
                                            />
                                        </div>
                                        <div className={styles.content}>
                                            <h3 dir="auto">{course.name} </h3>
                                            <Button
                                                className={styles.contact}
                                                onClick={() =>
                                                    scrollToSection(
                                                        document?.getElementById(
                                                            "plans"
                                                        )
                                                    )
                                                }
                                            >
                                                {t("subscribe")}
                                            </Button>
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

export default Courses;
