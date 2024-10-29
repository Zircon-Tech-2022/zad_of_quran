import React from "react";
import styles from "./payments.module.css";

import { Container } from "@mui/material";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
SwiperCore.use([Autoplay, Navigation]);

const breakpoints = {
    0: {
        slidesPerView: 1.5,
        spaceBetween: 20,
    },
    400: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    500: {
        slidesPerView: 3,
        spaceBetween: 30,
    },
    800: {
        slidesPerView: 4,
        spaceBetween: 30,
    },
    1200: {
        slidesPerView: 4,
        spaceBetween: 40,
    },
    1360: {
        slidesPerView: 5,
        spaceBetween: 30,
    },
    1450: {
        slidesPerView: 6,
        spaceBetween: 30,
    },
};
const payments = [
    "/imgs/home/payments/1.webp",
    "/imgs/home/payments/2.webp",
    "/imgs/home/payments/3.webp",
    "/imgs/home/payments/4.webp",
    "/imgs/home/payments/5.webp",
    "/imgs/home/payments/6.webp",
    "/imgs/home/payments/7.webp",
    "/imgs/home/payments/8.webp",
    "/imgs/home/payments/9.webp",
];
const Payments = () => {
    return (
        <section className={styles.payments}>
            <img
                className={styles.pattern}
                src="/imgs/pattern.webp"
                width={1500}
                height={400}
                alt="pattern"
            />
            <Container maxWidth="xl">
                <Swiper
                    spaceBetween={30}
                    grabCursor
                    breakpoints={breakpoints}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                    }}
                    speed={400}
                    navigation={{
                        prevEl: ".swiper-button-prev",
                        nextEl: ".swiper-button-next",
                    }}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="100"
                >
                    {payments.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.payment}>
                                    <img
                                        src={item}
                                        alt="payment"
                                        width={200}
                                        height={100}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                    <button
                        className="swiper-button-prev swiperControl"
                        name="payment_prev"
                        id="payment_prev"
                        title="payment_prev"
                    >
                        <span>
                            <BsArrowRight />
                        </span>
                    </button>
                    <button
                        className="swiper-button-next swiperControl"
                        name="payment_next"
                        id="payment_next"
                        title="payment_next"
                    >
                        <span>
                            <BsArrowLeft />
                        </span>
                    </button>
                </Swiper>
            </Container>
        </section>
    );
};

export default Payments;
