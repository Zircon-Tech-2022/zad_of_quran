import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AuthLayout = ({ children }) => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
