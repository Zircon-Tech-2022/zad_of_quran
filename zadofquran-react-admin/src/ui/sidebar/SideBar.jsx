import React, { useEffect, useState, useRef } from "react";

import { useSideBarContext } from "../../context/SideBarContext";
import styled from "styled-components";
import { FaBars, FaPersonCircleQuestion, FaUsersGear } from "react-icons/fa6";
import { ImPriceTags } from "react-icons/im";
import { BsChatLeftQuote, BsWindowStack } from "react-icons/bs";
import { MdGroup, MdOutlineLocalPostOffice } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import SideItem, { NavHead, NavIcon } from "./SideItem";
import SideBarBrand, { Brand, BrandImg, Type, Zircon } from "./SideBarBrand";
import { useLogout } from "../../features/authentication/useLogout";

const Items = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    width: 100%;
`;
const Bars = styled.button`
    font-size: 2rem;
    padding: 0rem 1rem 1rem;
    width: 100%;
    transition: all 0.5s ease;
    @media (max-width: 992px) {
        display: none;
    }
`;
const StyleSidebar = styled.div`
    & {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        box-shadow: 0 3px 17px 1px rgb(51, 48, 60, 0.1);
        background: var(--color-grey-0);
        height: 100%;
        width: 5rem;
        overflow: hidden;
        z-index: 999;
        transition: 0.4s all ease;
        padding: 3rem 0;
        overflow: auto;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    &:hover,
    &.openSide {
        ${Bars} {
            width: auto;
            margin-right: auto;
        }
        ${NavHead} {
            font-size: 1.7rem;
            opacity: 1;
            transform: scale(1);
        }
        ${NavIcon} {
            margin-left: 0.8rem;
        }
        ${BrandImg} {
            width: 8rem;
        }
        ${Type} {
            font-size: 1.7rem;
            opacity: 1;
            transform: scale(1);
        }
        ${Zircon} {
            font-size: 2.6rem;
            opacity: 1;
            transform: scale(1);
        }
        ${Brand} {
            gap: 2rem;
        }
    }
    &.openSide,
    &:hover {
        width: 27rem;
    }
`;
const items = [
    {
        name: "كل الطلاب",
        to: "/users",
        icon: <MdGroup />,
    },
    {
        name: "كل المدرسين",
        to: "/teachers",
        icon: <FaUsersGear />,
    },
    {
        name: "خطط التسعير",
        to: "/plans",
        icon: <ImPriceTags />,
    },
    {
        name: "الدورات التعليمية",
        to: "/courses",
        icon: <BsWindowStack />,
    },

    {
        name: "الاراء",
        to: "/testimonials",
        icon: <BsChatLeftQuote />,
    },
    {
        name: "التدوينات",
        to: "/blogs",
        icon: <MdOutlineLocalPostOffice />,
    },
    {
        name: "الاسئلة الشائعة",
        to: "/faq",
        icon: <FaPersonCircleQuestion />,
    },
];

const SideBar = (props) => {
    const { sideState, setSideState } = useSideBarContext();
    const [width, setWindowWidth] = useState(0);
    const sideBarRef = useRef();
    const { logout } = useLogout();
    useEffect(() => {
        updateDimensions();

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);
    const updateDimensions = () => {
        const width = window.innerWidth;
        setWindowWidth(width);
    };
    const toggleSideBar = function () {
        setSideState((prev) => {
            if (prev === "openSide") {
                return "";
            } else {
                return "openSide";
            }
        });
    };
    return (
        <StyleSidebar
            ref={sideBarRef}
            className={`sideBar ${width >= 992 ? sideState : ""}`}
        >
            <Bars onClick={toggleSideBar}>
                <FaBars />{" "}
            </Bars>
            <SideBarBrand />
            <Items>
                {items.map((item, index) => {
                    return <SideItem key={index} item={item} to={item.to} />;
                })}
                <button
                    onClick={() => {
                        logout();
                    }}
                >
                    <SideItem
                        color="var(--color-sec-600)"
                        item={{ name: "تسجيل خروج", icon: <LuLogOut /> }}
                    />
                </button>
            </Items>
        </StyleSidebar>
    );
};

export default SideBar;
