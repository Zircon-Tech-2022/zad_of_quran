import styled, { css } from "styled-components";

const sizes = {
    small: css`
        font-size: 1.2rem;
        padding: 0.4rem 0.8rem;
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
    `,
    medium: css`
        font-size: 1.4rem;
        padding: 1.2rem 1.6rem;
        font-weight: 500;
    `,
    large: css`
        font-size: 1.6rem;
        padding: 1.4rem 3rem;
        font-weight: 500;
    `,
};

const variations = {
    primary: css`
        color: var(--color-grey-0);
        background-color: var(--color-brand-600);
        &:after {
            background: var(--color-brand-500);
        }
    `,
    secondary: css`
        color: var(--color-grey-0);
        background: var(--color-sec-600);
        &:after {
            background: var(--color-sec-500);
        }
    `,
    third: css`
        color: var(--color-grey-0);
        background: var(--color-grey-500);
        &:after {
            background: var(--color-grey-400);
        }
        &:hover {
            color: var(--color-grey-0) !important;
        }
    `,
    danger: css`
        color: var(--color-red-100);
        background-color: var(--color-red-700);
        &:after {
            background: var(--color-red-800);
        }
        &:hover {
            color: var(--color-grey-0) !important;
        }
    `,
};

const Button = styled.button`
    border: none;
    box-shadow: var(--shadow-sm);
    ${(props) => sizes[props.size]}
    ${(props) => variations[props.variation]}
    border-radius: .5rem;
    position: relative;
    z-index: 2;
    overflow: hidden;
    transition: 0.3s all ease;

    &::after {
        content: "";
        position: absolute;
        transition: 0.3s all ease;
        top: -25px;
        left: -30px;
        width: 5rem;
        height: 5rem;
        z-index: -1;
        border-radius: 50%;
    }
    &:hover:after {
        width: 100%;

        height: 100%;
        top: 0px;
        left: 0;
        border-radius: 0;
    }
    &:hover {
        color: var(--color-grey-800);
    }
`;
Button.defaultProps = {
    size: "large",
    variation: "primary",
};
export default Button;
