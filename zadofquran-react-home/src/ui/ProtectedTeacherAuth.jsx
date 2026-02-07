import { useEffect } from "react";
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
const ProtectedTeacherAuth = ({ children }) => {
    const navigate = useNavigate();
    const { language } = useLangContext();
    // 1. Load the authenticated user and check if is teacher
    const { isLoading, isAuth } = useUser();
    const isAuthTeacher = localStorage.getItem('user-type') === "teacher";
    // 2. If there is NO authenticated user, redirect to the /login
    useEffect(
        function () {
            if (isAuth && isAuthTeacher && !isLoading) navigate(`/${language}/teacher`);
        },
        [navigate, isAuth, isLoading, language, isAuthTeacher]
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
    if (!isAuth || !isAuthTeacher) return <>{children}</>;
};

export default ProtectedTeacherAuth;
