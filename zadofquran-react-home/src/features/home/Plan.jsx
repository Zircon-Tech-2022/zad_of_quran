import React, { useState } from "react";
import styles from "./plans.module.css";
import { FaBookQuran } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import MyModal from "../../ui/MyModal";
import PlanForm from "../plans/PlanForm";
import { t } from "i18next";
import { useLangContext } from "../../context/LangContext";
const Plan = ({ plan, isLoading, isAuth, ...props }) => {
    const {
        currency,
        monthly_sessions,
        name,
        price,
        session_duration,
        weekly_sessions,
        discount,
        type,
        id,
    } = plan;
    const [working, setWorking] = useState(false);
    const navigate = useNavigate();
    const { language } = useLangContext();
    // 1. Load the authenticated user

    function handleClick() {
        setWorking(isLoading);
        if ((!isAuth && !isLoading) || !localStorage.getItem("token")) {
            navigate(`/${language}/login`);
        }
        // else {
        //     setWorking(false);
        // }
    }

    // 2. If there is NO authenticated user, redirect to the /login

    return (
        <div
            className={`${styles.plan} animated fade`}
            {...props}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="0"
        >
            {+discount ? (
                <div className={styles.discount}>
                    <span>{(+discount).toFixed(1)}%</span>
                    <span>{t("discount")}</span>
                </div>
            ) : (
                ""
            )}
            <div className={styles.HeadParent}>
                <h3 className={styles.planHead}>{name}</h3>
                <div className={styles.disPrice}>
                    <span className={styles.price}>
                        {+discount
                            ? Math.round(+price - (+price * +discount) / 100)
                            : Math.round(+price)}{" "}
                        {currency}
                    </span>
                    {+discount ? (
                        <span className={styles.dis}>
                            {Math.round(+price)}
                            {"   "}
                            {currency}
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <img
                        className={styles.check}
                        src="/imgs/home/box-check.svg"
                        alt="check"
                        width={20}
                        height={20}
                    />
                    <span className={styles.num}>{monthly_sessions}</span>
                    <span className={styles.text}>{t("perMonth")}</span>
                </li>
                <li className={styles.item}>
                    <img
                        className={styles.check}
                        src="/imgs/home/box-check.svg"
                        alt="check"
                        width={20}
                        height={20}
                    />
                    <span className={styles.num}>{weekly_sessions}</span>
                    <span className={styles.text}>{t("perWeek")}</span>
                </li>
                <li className={styles.item}>
                    <img
                        className={styles.check}
                        src="/imgs/home/box-check.svg"
                        alt="check"
                        width={20}
                        height={20}
                    />
                    <span className={styles.text}>{t("sessionDuration")}</span>
                    <span className={styles.num}>{session_duration}</span>
                    <span className={styles.text}>{t("minutes")}</span>
                </li>
            </ul>

            <MyModal>
                <MyModal.Open opens="createEdit" onClick={handleClick}>
                    <button
                        disabled={working || isLoading}
                        className={styles.subscribe}
                    >
                        <FaBookQuran />
                        {t("subscribe")}
                    </button>
                </MyModal.Open>

                <MyModal.Window title={t("subscription")} name="createEdit">
                    <PlanForm id={id} />
                </MyModal.Window>
            </MyModal>
            {/* {working && <Spinner />} */}
        </div>
    );
};

export default Plan;
