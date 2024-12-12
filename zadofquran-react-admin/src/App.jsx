import { ThemeProvider, createTheme } from "@mui/material";
import { LangProvider } from "./context/LangContext";

import GlobalStyle from "./styles/GlobalStyles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import TeacherCrud from "./pages/TeacherCrud";
import AuthLayout from "./ui/AuthLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import LoginForm from "./pages/Loginform";
import ProtectedAuth from "./ui/ProtectedAuth";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SideBarProvider } from "./context/SideBarContext";
import PlansCrud from "./pages/PlansCrud";
import BlogsCrud from "./pages/BlogsCrud";
import FaqCrud from "./pages/FaqCrud";
import CourseCrud from "./pages/CourseCrud";
import TestimoinalsCrud from "./pages/TestimoinalsCrud";
import UsersCrud from "./pages/UsersCrud";

function App() {
    const theme = createTheme({
        typography: {
            fontFamily: ["Tajawal", ""].join(","),
            fontSize: 20,
        },
        palette: {
            primary: {
                main: "#6d50dd",
            },
            secondary: {
                main: "#FF9E03",
            },
        },
        components: {
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        fontSize: "1.2em",
                    },
                },
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
    return (
        <>
            <LangProvider>
                <ThemeProvider theme={theme}>
                    <SideBarProvider>
                        <QueryClientProvider client={queryClient}>
                            <ReactQueryDevtools initialIsOpen={false} />
                            <GlobalStyle />
                            <BrowserRouter>
                                <Routes>
                                    <Route
                                        element={
                                            <ProtectedRoute>
                                                <AppLayout />
                                            </ProtectedRoute>
                                        }
                                    >
                                        <Route
                                            index
                                            element={
                                                <Navigate replace to="/users" />
                                            }
                                        />
                                        <Route
                                            path="/users"
                                            element={<UsersCrud />}
                                        />
                                        <Route
                                            path="/teachers"
                                            element={<TeacherCrud />}
                                        />
                                        <Route
                                            path="/plans"
                                            element={<PlansCrud />}
                                        />
                                        <Route
                                            path="/blogs"
                                            element={<BlogsCrud />}
                                        />
                                        <Route
                                            path="/testimonials"
                                            element={<TestimoinalsCrud />}
                                        />
                                        <Route
                                            path="/faq"
                                            element={<FaqCrud />}
                                        />
                                        <Route
                                            path="/courses"
                                            element={<CourseCrud />}
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
                                            path="/login"
                                            element={<Login />}
                                        />
                                        <Route
                                            path="/newlogin"
                                            element={<LoginForm />}
                                        />
                                    </Route>
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </BrowserRouter>
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
                    </SideBarProvider>
                </ThemeProvider>
            </LangProvider>
        </>
    );
}

export default App;
