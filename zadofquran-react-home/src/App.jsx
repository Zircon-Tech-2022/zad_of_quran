import { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material";
import { useLangContext } from "./context/LangContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import AOS from "aos";

import i18n from "./i18n";
import AppLayout from "./ui/AppLayout";
import NotFound from "./pages/NotFound";
import AuthLayout from "./ui/AuthLayout";
import Home from "./pages/Home";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import ProtectedAuth from "./ui/ProtectedAuth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Faq from "./pages/Faq";
import TeacherLanding from "./pages/TeacherLanding";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherSignup from "./pages/TeacherSignup";
import TeacherUpdateProfile from "./pages/TeacherUpdateProfile";

import "aos/dist/aos.css";
import "./globals.css";
import ProtectedTeacherAuth from "./ui/ProtectedTeacherAuth";
import AuthTeacherLayout from "./ui/AuthTeacherLayout";

function App() {
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
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 0,
            },
        },
    });
    useEffect(() => {
        AOS.init({
            // initialise with other settings
            duration: 1000,
        });
    }, []);
    const { language } = useLangContext();
    return (
        <>
            <I18nextProvider i18n={i18n}>
                <ThemeProvider theme={theme}>
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools initialIsOpen={false} />

                        <Routes>
                            <Route
                                element={
                                    <ProtectedRoutes>
                                        <AppLayout />
                                    </ProtectedRoutes>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <Navigate replace to={`${language}`} />
                                    }
                                />
                                <Route path="/:langParam" element={<Home />} />
                                <Route
                                    path="/:langParam/faq"
                                    element={<Faq />}
                                />
                                <Route
                                    path="/:langParam/blogs"
                                    element={<Blogs />}
                                />
                                <Route
                                    path="/:langParam/blogs/:blogSlug"
                                    element={<Blog />}
                                />
                                <Route
                                    path="/:langParam/teacher"
                                    element={<TeacherLanding />}
                                />
                                <Route
                                    path="/:langParam/teacher/update-profile"
                                    element={<TeacherUpdateProfile />}
                                />
                            </Route>
                            <Route
                                element={
                                    <ProtectedAuth>
                                        <AuthLayout />
                                    </ProtectedAuth>
                                }
                            >
                                <Route
                                    path="/:langParam/login"
                                    element={<Login />}
                                />
                                <Route
                                    path="/:langParam/signup"
                                    element={<Signup />}
                                />
                            </Route>
                            <Route
                                element={
                                    <ProtectedTeacherAuth>
                                        <AuthTeacherLayout />
                                    </ProtectedTeacherAuth>
                                }
                            >
                                <Route
                                    path="/:langParam/teacher/login"
                                    element={<TeacherLogin />}
                                />
                                <Route
                                    path="/:langParam/teacher/signup"
                                    element={<TeacherSignup />}
                                />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>

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
                    </QueryClientProvider>
                </ThemeProvider>
            </I18nextProvider>
        </>
    );
}

export default App;
