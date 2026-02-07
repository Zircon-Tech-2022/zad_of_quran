import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider, createTheme } from "@mui/material";
import styled from "styled-components";
import ProtectedAuth from "./ProtectedAuth";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;
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

const AuthLayout = ({ children }) => {
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
                <ProtectedAuth>
                    <Outlet />
                </ProtectedAuth>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default AuthLayout;
