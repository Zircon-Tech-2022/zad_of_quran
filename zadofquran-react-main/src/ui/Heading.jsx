import React from "react";
import styled, { css } from "styled-components";

const Heading = styled.h2`
    z-index: 1;
    line-height: 1.4;
    ${(props) =>
        css`
            font-size: ${props.size}rem;
            font-weight: ${props.weight};
            color: ${props.color};
        `}
    position: relative;
    &::after {
        ${(props) =>
            css`
                content: "${props.after}";
                color: transparent;
                -webkit-text-stroke: 2px ${props.aftercolor};
                stroke: 2px ${props.aftercolor};
            `}
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -55%);
        z-index: -1;

        width: 100%;
        font-weight: 900;
        //text-align: center;
        ${(props) =>
            css`
                font-size: ${props.size * 2}rem;
            `};

        @media screen and (max-width: 768px) {
            ${(props) =>
                css`
                    font-size: ${props.size * 1.5}rem;
                `}
        }
    }
    @media screen and (max-width: 768px) {
        ${(props) =>
            css`
                font-size: ${props.size * 0.85}rem;
            `}
    }
`;
Heading.defaultProps = {
    size: 2,
    weight: 500,
    color: " var(--color-grey-600)",
    aftercolor: " var(--color-brand-300)",
};

export default Heading;
