import styled from "styled-components";
// import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    // 1. Load the authenticated user
    const { isLoading, isAuth } = useUser();

    // 2. If there is NO authenticated user, redirect to the /login
    useEffect(
        function () {
            if (!isAuth && !isLoading) navigate("/login");
        },
        [navigate, isAuth, isLoading]
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
    if (isAuth) return children;
    // return children;
}

export default ProtectedRoute;
