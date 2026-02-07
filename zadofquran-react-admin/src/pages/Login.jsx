import LoginForm from "../features/authentication/LoginForm";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import Heading from "../ui/Heading";

const StyleLogin = styled.div`
    min-height: 100vh;
    background: url(/imgs/auth/loginBG.png);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyleGrid = styled(Grid)`
    background: linear-gradient(
            to right,
            rgb(57 37 135 / 90%),
            rgb(57 37 135 / 90%)
        ),
        url(/imgs/auth/login.jpg) no-repeat;
    min-width: 80rem;
    background-size: cover;
    border-radius: 1.5rem;
    margin: 0 auto;
    padding: 3rem;
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
    background: rgb(37, 25, 83);
    padding: 5rem 3rem;
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
        background: var(--color-brand-600);
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
const LeftLogo = styled.div`
    display: none;

    @media (max-width: 899px) {
        display: block;
    }
`;
const Login = () => {
    return (
        <StyleLogin>
            <Container maxWidth="xl">
                <StyleGrid container alignItems={"center"} width="70%">
                    <Grid item md={6} xs={12}>
                        <Right>
                            <Logo>
                                <img src="/imgs/logo.svg" alt="" />
                            </Logo>
                            <Heading
                                as="h3"
                                color="var(--color-grey-0)"
                                weight="700"
                                size="2.8"
                            >
                                سجل دخولك في لوحة تحكم زيركون
                            </Heading>
                        </Right>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Left>
                            <LeftLogo>
                                <Logo>
                                    <img src="/imgs/logo.svg" alt="" />
                                </Logo>
                            </LeftLogo>

                            <HeadLogin
                                as="h2"
                                size="3"
                                weight="600"
                                color="var(--color-grey-0)"
                            >
                                تسجيل الدخول
                            </HeadLogin>
                            <LoginForm />
                        </Left>
                    </Grid>
                </StyleGrid>
            </Container>
        </StyleLogin>
    );
};

export default Login;
