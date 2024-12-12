import styled, { css } from "styled-components";
import { useLangContext } from "../context/LangContext";

const StyledRow = styled.div`
    display: flex;
    width: 100%;
    ${(props) =>
        props.type === "horizontal" &&
        css`
            /* justify-content: space-between; */
            align-items: center;
            ${props.both === "both" &&
            css`
                flex-direction: ${props.lang === "en" ? "row" : "row-reverse"};
            `}
            justify-content: start;
        `}

    ${(props) =>
        props.type === "vertical" &&
        css`
            flex-direction: column;
            gap: 1.6rem;
        `}
`;
StyledRow.defaultProps = {
    type: "horizontal",
    lang: "both",
};

const Row = ({ children, ...props }) => {
    const { lang } = useLangContext();
    return (
        <StyledRow lang={lang} {...props}>
            {children}
        </StyledRow>
    );
};

export default Row;
