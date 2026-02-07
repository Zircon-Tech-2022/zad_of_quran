import { useEffect, useState } from "react";
import styles from "./plans.module.css";
import { Container, Grid } from "@mui/material";
import Button from "../../ui/Button";
import Plan from "./Plan";
import Empty from "../../ui/Empty";
import { useUser } from "../authentication/useUser";
import ContactButton from "../../ui/ContactButton";
import { API_URL } from "../../Constants";
import { t } from "i18next";
import { useLangContext } from "../../context/LangContext";
async function getPlans(language) {
    const res = await fetch(
        `${API_URL}plans`,
        {
            headers: {
                "accept-language": language,
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer `,
            },
        },
        { cache: "no-cache" }
    );
    // if (!res.ok) throw new Error("lol");
    return res.json();
}
const Plans = () => {
    const [active, setActive] = useState("شهري");
    const [data, setData] = useState({});
    const [realData, setRealData] = useState(data[active]);
    const { isLoading, isAuth } = useUser();
    const [loading, setLoading] = useState(true);
    const { language } = useLangContext();
    useEffect(() => {
        async function callFun() {
            try {
                const data = await getPlans(language);

                setData(data.data);
                setRealData(data.data[active]);

                setLoading(false);
            } catch (err) {}
        }
        callFun();
    }, [language]);
    return (
        <section className="section-padding" id="plans">
            <Container maxWidth="xl">
                <div className={styles.actions}>
                    <h2
                        className={`${styles.planHeading} mainHeading`}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="0"
                    >
                        {t("plans")}
                    </h2>
                    <div
                        className={styles.buttons}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="100"
                    >
                        <Button
                            className={active === "شهري" ? "active" : ""}
                            onClick={() => {
                                setActive("شهري");
                                setRealData(data["شهري"]);
                            }}
                        >
                            {t("monthly")}
                        </Button>
                        <Button
                            className={active === "نصف سنوي" ? "active" : ""}
                            onClick={() => {
                                setActive("نصف سنوي");
                                setRealData(data["نصف سنوي"]);
                            }}
                        >
                            {t("semiannual")}
                        </Button>
                        <Button
                            className={active === "سنوي" ? "active" : ""}
                            onClick={() => {
                                setActive("سنوي");
                                setRealData(data["سنوي"]);
                            }}
                        >
                            {t("yearly")}
                        </Button>
                    </div>
                </div>
                {(!loading && realData?.length && (
                    <Grid
                        container
                        spacing="3rem"
                        justifyContent="center"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="0"
                    >
                        {!realData?.length ? (
                            <Empty
                                className="animated fade"
                                text={t("no-plans")}
                            />
                        ) : (
                            realData.map((item, index) => {
                                return (
                                    <Grid
                                        item
                                        xl={3}
                                        lg={4}
                                        md={5}
                                        sm={6}
                                        xs={11.5}
                                        key={index}
                                    >
                                        <Plan
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                            data-aos-delay={`${
                                                (index % 4) * 100
                                            }`}
                                            isLoading={isLoading}
                                            isAuth={isAuth}
                                            plan={item}
                                        />
                                    </Grid>
                                );
                            })
                        )}
                        <Grid item xl={10} lg={11} xs={12}>
                            <div className={styles.custome}>
                                <span className={styles.UnderLine}>
                                    {t("specifically").split(" ")[0]}
                                </span>
                                <p>
                                    {t("specifically")
                                        .split(" ")
                                        .slice(1, -2)
                                        .join(" ")}
                                    <span>
                                        {" "}
                                        {t("specifically")
                                            .split(" ")
                                            .slice(-2)
                                            .join(" ")}
                                    </span>
                                </p>
                                <ContactButton />
                            </div>
                        </Grid>
                    </Grid>
                )) ||
                    null}
            </Container>
        </section>
    );
};

export default Plans;
