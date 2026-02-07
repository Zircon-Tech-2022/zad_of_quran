import { BiSolidContact } from "react-icons/bi";
import { scrollToSection } from "../utils/helpers";
import styled from "styled-components";
import { t } from "i18next";
const StyleButton = styled.button`
    border: 1px solid var(--color-grey-0);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 1rem;
    font-weight: 600;
    &:lang(en) {
        font-weight: 400;
    }
    padding: 0.9rem 1.5rem;
    &:hover {
        color: var(--color-sec-600);
        background: var(--color-grey-0);
    }
`;
const ContactButton = () => {
    return (
        <StyleButton
            onClick={() => scrollToSection(document?.getElementById("footer"))}
        >
            <span>
                <BiSolidContact />
            </span>
            <span>{t("contact-us")}</span>
        </StyleButton>
    );
};

export default ContactButton;
