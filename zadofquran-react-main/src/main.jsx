import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LangProvider } from "./context/LangContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <LangProvider>
                <App />
            </LangProvider>
        </BrowserRouter>
    </React.StrictMode>
);