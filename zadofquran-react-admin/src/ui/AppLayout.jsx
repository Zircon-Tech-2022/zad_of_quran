import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { styled } from "styled-components";
import SideBar from "./sidebar/SideBar";
import { Container } from "@mui/material";
import { useSideBarContext } from "../context/SideBarContext";

const StyledAppLayout = styled.div`
    display: flex;
`;

const BodyContainer = styled.div`
    max-width: 100%;
    width: calc(100%);
    transition: 0.4s all ease;
    padding: 2rem 5rem 2rem 0rem;
`;
const Main = styled.div`
    width: 100%;
    min-height: 100vh;
    overflow: hidden;

    display: flex;
    background: var(--color-grey-0);
    min-height: 100vh;
    transition: 0.4s all ease;
    max-width: 100%;

    &.openSide {
        ${BodyContainer} {
            padding-right: 28rem;
        }
    }
`;

const AppLayout = () => {
    const [width, setWindowWidth] = useState(0);
    const { sideState } = useSideBarContext();
    useEffect(() => {
        updateDimensions();

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);
    const updateDimensions = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
    };
    return (
        <StyledAppLayout>
            <SideBar />
            <Main className={width >= 992 ? sideState : ""}>
                <BodyContainer>
                    <Container maxWidth="xl">
                        <Outlet />
                    </Container>
                </BodyContainer>
            </Main>
        </StyledAppLayout>
    );
};

export default AppLayout;
