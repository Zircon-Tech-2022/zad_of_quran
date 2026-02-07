import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router";
import { styled } from "styled-components";
import { IoIosSend } from "react-icons/io";
import { FaMessage, FaXmark } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { useState } from "react";
import { t } from "i18next";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});
const theme = createTheme({
    typography: {
        fontFamily: ["Tajawal", ""].join(","),
        fontSize: 20,
    },
    palette: {
        primary: {
            main: "#85a514",
        },
        secondary: {
            main: "#315259",
        },
    },
});
const Chat = styled.div`
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    z-index: 99;
    width: fit-content;
    width: 90%;
    max-width: 32rem;
    display: flex;
    flex-direction: column;
    &:lang(en) {
        align-items: flex-end;
    }
`;
const ChatContent = styled.div`
    background: var(--color-grey-50);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    overflow: hidden;
    width: 100%;
`;
const ChatHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    color: #fff;
    & svg {
        font-size: 2.2rem;
    }
    background: #2cd464;
`;
const AreaParent = styled.div`
    width: 100%;
    padding: 2rem 1.5rem;
    & textarea {
        width: 100%;
        padding: 1rem;
        border: none;
        margin-top: 2rem;
        border-radius: 1rem;
        resize: none;
        background: var(--color-grey-200);
        &:focus {
            outline: 2px solid #2cd464;
        }
    }
`;
const ChatHeading = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ChatIcon = styled.div`
    display: flex;
    align-items: center;
`;
const ChatFooter = styled.div`
    padding: 0.5rem 1.5rem 2rem;
    display: flex;
    justify-content: center;
`;
const SendBtn = styled.button`
    display: flex;
    align-items: center;
    padding: 1.2rem 1.5rem;
    color: var(--color-grey-0);
    border: 1px solid #2cd464;
    background: #2cd464;
    border-radius: 1rem;
    font-size: 1.7rem;
    font-weight: 700;
    &:hover {
        background: var(--color-grey-0);
        color: #2cd464;
    }
`;
const WhatsStyle = styled.button`
    font-size: 4.6rem;
    width: 8rem;
    height: 8rem;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    align-items: center;
    background: #2cd464;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    /* padding: 1.5rem; */
    border-radius: 50%;
    transition: all 0.3s ease;
    color: #fff;
    &:hover {
        background: #0d8f38;
    }
`;
const AppLayout = () => {
    const ref = useRef();
    const [open, setOpen] = useState(true);
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Toaster
                    gutter={12}
                    position="top-center"
                    containerStyle={{ margin: "0px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },

                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-700)",
                        },
                    }}
                />
                <ProtectedRoutes>
                    <Chat>
                        {open && (
                            <ChatContent className="animated fade">
                                <ChatHead>
                                    <ChatIcon>
                                        <FaMessage />
                                    </ChatIcon>
                                    <ChatHeading>
                                        <h4>{t("zadTeam")}</h4>
                                        <button
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <FaXmark />
                                        </button>
                                    </ChatHeading>
                                </ChatHead>
                                <AreaParent>
                                    <p>{t("zadTeam-p")}</p>
                                    <textarea
                                        placeholder={t("zadTeam-p-1")}
                                        ref={ref}
                                    ></textarea>
                                </AreaParent>
                                <ChatFooter>
                                    <SendBtn
                                        className="buttonFill"
                                        onClick={() => {
                                            window.open(
                                                `https://wa.me/+966594698967?text=${ref.current.value}`
                                            );
                                        }}
                                    >
                                        {t("zadTeam-p-2")}
                                        <IoIosSend />
                                    </SendBtn>
                                </ChatFooter>
                            </ChatContent>
                        )}
                        <WhatsStyle
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            <BsWhatsapp />
                        </WhatsStyle>
                    </Chat>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </ProtectedRoutes>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default AppLayout;
