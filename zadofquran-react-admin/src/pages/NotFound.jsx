import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Lay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
    min-height: 100vh;
`;
const ErorrImg = styled.div`
    width: 95%;
    max-width: 50rem;
`;
const StyleButton = styled(Link)`
    background: #ff9e03;
    padding: 1.5rem 3rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: 0.3s all ease;
    color: var(--color-grey-0);
    &:hover {
        background: #db8905;
    }
`;
const Icon = styled.span`
    display: flex;
    align-items: center;
`;
const NotFound = () => {
    return (
        <Lay>
            <ErorrImg>
                <img src="/imgs/404.svg" alt="404, Not Found"/>
            </ErorrImg>
            <StyleButton to="/">
                الصفحة الرئيسية
                <Icon>
                    <BsArrowLeft />
                </Icon>
            </StyleButton>
        </Lay>
    );
};

export default NotFound;
