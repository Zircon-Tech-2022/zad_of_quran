import React, { useEffect } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useLangContext } from "../context/LangContext";
const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ProtectedAuth = ({ children }) => {
    const navigate = useNavigate();
    const { language } = useLangContext();
    // 1. Load the authenticated user
    const { isLoading, isAuth } = useUser();
    // 2. If there is NO authenticated user, redirect to the /login
    useEffect(
        function () {
            if (isAuth && !isLoading) navigate(`/${language}`);
        },
        [navigate, isAuth, isLoading, language]
    );

    // 3. While loading, show a spinner
    if (isLoading)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 4. If there IS a user, render the app
    // if (isAuth) return children;
    if (!isAuth) return <>{children}</>;
};

export default ProtectedAuth;
