import styles from "./payments.module.css";

import { Container } from "@mui/material";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slider from "react-slick";

const breakpoints = {
    0: { slidesToShow: 1.5, slidesToScroll: 1 },
    400: { slidesToShow: 2, slidesToScroll: 1 },
    500: { slidesToShow: 3, slidesToScroll: 1 },
    800: { slidesToShow: 4, slidesToScroll: 1 },
    1200: { slidesToShow: 4, slidesToScroll: 1 },
    1360: { slidesToShow: 5, slidesToScroll: 1 },
    1450: { slidesToShow: 6, slidesToScroll: 1 },
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

var settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 400,
    slidesToShow: 6, 
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
        <button className="slick-prev slick-arrow">
            <BsArrowRight />
        </button>
    ),
    nextArrow: (
        <button className="slick-next slick-arrow">
            <BsArrowLeft />
        </button>
    ),
    responsive: [
        { breakpoint: 0, settings: breakpoints[0] },
        { breakpoint: 400, settings: breakpoints[400] },
        { breakpoint: 500, settings: breakpoints[500] },
        { breakpoint: 800, settings: breakpoints[800] },
        { breakpoint: 1200, settings: breakpoints[1200] },
        { breakpoint: 1360, settings: breakpoints[1360] },
        { breakpoint: 1450, settings: breakpoints[1450] },
    ],
};

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
                <Slider {...settings}>
                    {payments.map((item, index) => (
                        <div key={index} className={styles.payment}>
                            <img src={item} alt="payment" width={200} height={100} />
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>
    );
};

export default Payments;
