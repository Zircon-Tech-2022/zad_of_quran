import { NavLink } from "react-router-dom";
import styled from "styled-components";
const StyleSideItem = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 1.2rem 1.5rem;
    border-left: 5px solid transparent;
    color: var(--color-grey-600);
    border-radius: 0.5rem;
    font-weight: 600;
    & span {
        transition: 0.3s all ease;
    }
    &.active span {
        color: var(--color-brand-700);
        background: var(--color-grey-50);
    }
    &.active {
        background: var(--color-grey-50);
        border-left: 5px solid var(--color-brand-700);
    }
`;

export const NavHead = styled.span`
    transition: 0.3s all ease;
    transform: scale(0);
    opacity: 0;
    font-size: 0;
`;

export const NavIcon = styled.span`
    font-size: 1.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logout = ({ item, to, ...props }) => {
    return (
        <StyleSideItem to={to} {...props}>
            <NavIcon>{item.icon}</NavIcon>
            <NavHead>{item.name}</NavHead>
        </StyleSideItem>
    );
};

export default Logout;
