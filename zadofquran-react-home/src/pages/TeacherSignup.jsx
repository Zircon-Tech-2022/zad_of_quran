import React from "react";

import { Container, Grid } from "@mui/material";

import styled from "styled-components";
import Heading from "../ui/Heading";
import { Link } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SignupForm from "../features/authentication/SignupForm";
import { t } from "i18next";
import { useLangContext } from "../context/LangContext";
import AddEditTeacherModal from './../features/teachers/AddEditTeacherModal';

const StyleLogin = styled.div`
    min-height: 100vh;
    background: linear-gradient(
            to right,
            rgb(49, 82, 89, 0.9),
            rgb(49, 82, 89, 0.9)
        ),
        url(/imgs/quran.webp) no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyleGrid = styled(Grid)`
    background: linear-gradient(
            to right,
            rgb(49, 82, 89, 0.9),
            rgb(49, 82, 89, 0.9)
        ),
        url(/imgs/pattern.webp) no-repeat;
    min-width: 80rem;
    background-size: cover;
    border-radius: 1.5rem;
    margin: 0 auto;
    padding: 3rem;
    background-position: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.16);

    @media (max-width: 899px) {
        min-width: 40rem;
        padding: 0;
    }
    @media (max-width: 600px) {
        min-width: 100%;
    }
`;
const Left = styled.div`
    color: var(--color-grey-0);
    display: flex;
    flex-direction: column;
    gap: 3rem;
    border-radius: 1rem;
    background: #083039;
    padding: 5rem 3rem;
    max-height: 70vh;
    overflow-y: auto;
`;
const HeadLogin = styled(Heading)`
    position: relative;
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    &::after {
        content: "";
        position: absolute;
        left: 10%;
        top: 100%;
        width: 15%;
        height: 4px;
        background: var(--color-sec-600);
    }
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2rem 0 5rem;
    justify-content: center;
    text-align: center;
    @media (max-width: 899px) {
        display: none;
    }
`;
const Logo = styled.div`
    width: 15rem;
    margin: 0 auto;
    /* padding-left: 3rem; */
`;
const Back = styled(Link)`
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--color-grey-0);
    font-size: 1.6rem;
    transition: all ease 0.3s;
    &:hover {
        color: var(--color-sec-600);
    }
`;
const Has = styled.p`
    font-size: 1.8rem;
    & a {
        text-decoration: underline;
        color: var(--color-sec-600);
    }
    & a:hover {
        color: var(--color-sec-700);
    }
`;
const LeftLogo = styled.div`
    display: none;

    @media (max-width: 899px) {
        display: block;
    }
`;
const TeacherSignup = () => {
    const { language } = useLangContext();
    return (
        <StyleLogin>
            <AddEditTeacherModal />
            <Container maxWidth="xl">
                <StyleGrid container alignItems={"center"} width="70%">
                    <Grid item md={4} xs={12}>
                        <Right>
                            <Logo>
                                <img
                                    src="/imgs/logo.svg"
                                    alt="logo"
                                    width={100}
                                    height={200}
                                />
                            </Logo>
                            <Heading
                                as="h3"
                                color="var(--color-grey-0)"
                                weight="700"
                                size="2.8"
                            >
                                {t("teacher-signup-title")}
                            </Heading>
                        </Right>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Left>
                            <LeftLogo>
                                <Logo>
                                    <img
                                        src="/imgs/logo.svg"
                                        alt="logo"
                                        width={100}
                                        height={200}
                                    />
                                </Logo>
                            </LeftLogo>
                            <Back to={`/${language}`}>
                                {t("home-page")}
                                {language === "ar" ? (
                                    <BsArrowLeft />
                                ) : (
                                    <BsArrowRight />
                                )}
                            </Back>
                            <HeadLogin
                                as="h2"
                                size="3"
                                weight="600"
                                color="var(--color-grey-0)"
                            >
                                {t("signup")}
                            </HeadLogin>
                            <SignupForm />
                            <Has className={StyleSheet}>
                                {t("have-account")}{" "}
                                <Link to={`/${language}/teacher/login`}>
                                    {t("login")}
                                </Link>
                            </Has>
                        </Left>
                    </Grid>
                </StyleGrid>
            </Container>
        </StyleLogin>
    );
};

export default TeacherSignup;
