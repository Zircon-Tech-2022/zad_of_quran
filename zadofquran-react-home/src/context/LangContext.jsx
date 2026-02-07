import { createContext, useContext, useLayoutEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import i18n from "../i18n";

const LangContext = createContext();

function LangProvider({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    // Extract the language from the URL or use the default language ('en' if no language is specified)
    const language = location.pathname.split("/")[1] || "ar";
    const setLanguage = (language) => {
        navigate(
            `/${language}/${location.pathname.split("/").slice(2).join("")}${
                location.search
            }`
        );
        i18n.changeLanguage(language);
    };
    // Set the language in i18next
    if (i18n.language !== language) {
        i18n.changeLanguage(language);
    }
    // const [lang, setLang] = useLocalStorageState("en", "lang");
    useLayoutEffect(
        function () {
            if (supportedLanguages.includes(language)) {
                document.documentElement.setAttribute("lang", language);
                localStorage.setItem("lang", language);
            }
        },
        [language, setLanguage]
    );
    // function to sum two numbers

    // Check if the language is supported, otherwise redirect to the default language
    const supportedLanguages = ["en", "ar"]; // Add other supported languages as needed
    if (!supportedLanguages.includes(language)) {
        return <Navigate to={`/${i18n.options.fallbackLng}`} />;
    }

    return (
        <LangContext.Provider value={{ language, setLanguage }}>
            {children}
        </LangContext.Provider>
    );
}

function useLangContext() {
    const context = useContext(LangContext);
    if (context === undefined)
        throw new Error("LangContext was used outside of LangProvider");
    return context;
}

export { LangProvider, useLangContext };
