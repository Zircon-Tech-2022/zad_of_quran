import { useEffect, useState } from "react";
import styles from "./testimonials.module.css";
import { Container } from "@mui/material";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { API_URL } from "../../Constants";
import { t } from "i18next";
import { useLangContext } from "../../context/LangContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

async function getTestimonials(language) {
    const res = await fetch(`${API_URL}testimonials`, {
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
const Testimonials = () => {
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
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLangContext();

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
    useEffect(() => {
        setLoading(true);
        async function callFun() {
            try {
                const data = await getTestimonials(language);

                setData(data.data);
                setLoading(false);
            } catch (err) { }
        }
        callFun();
    }, [language]);
    return (
        <section
            className={`section-padding slider-container ${styles.coursesParent}`}
            id="testimonials"
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
                    {t("testimonials")}
                </h2>
                <div className={styles.testimonials}>
                    {loading && <Spinner />}
                    {!data.length && !loading && (
                        <Empty text={t("no-testimonials")} />
                    )}
                    {(!loading && data.length && (
                        <Slider {...settings}>
                            {data.map((item, i) => (
                                <div key={i} className="slideitem">
                                    <div className={styles.testimonial}>
                                        <span className={styles.TestiIcon}>
                                            <img
                                                src="/imgs/home/quote.svg"
                                                width={50}
                                                height={50}
                                                alt="testimonial icon"
                                            />
                                        </span>
                                        <img
                                            className={styles.highlight}
                                            src="/imgs/zad-solid.svg"
                                            width={50}
                                            height={50}
                                            alt="testimonial pic"
                                        />
                                        <div className={styles.content}>
                                            <h3>{item.name}:</h3>
                                            <p>{item.content}</p>
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

export default Testimonials;
