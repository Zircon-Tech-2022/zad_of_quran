import { createContext, useContext, useState } from "react";

const LangContext = createContext();
const LangProvider = ({ children }) => {
    const [language, setLang] = useState("ar");
    return (
        <LangContext.Provider
            value={{
                language,
                setLang,
            }}
        >
            {children}
        </LangContext.Provider>
    );
};

function useLangContext() {
    const context = useContext(LangContext);
    if (context === undefined)
        throw new Error(
            "language context was used outside of language provider"
        );
    return context;
}
export { LangProvider, useLangContext };
