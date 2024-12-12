import React, { createContext, useContext, useState } from "react";

const SideBarContext = createContext();
const SideBarProvider = ({ children }) => {
    const [sideState, setSideState] = useState("openSide");
    return (
        <SideBarContext.Provider
            value={{
                sideState,
                setSideState,
            }}
        >
            {children}
        </SideBarContext.Provider>
    );
};

function useSideBarContext() {
    const context = useContext(SideBarContext);
    if (context === undefined)
        throw new Error(
            "language context was used outside of language provider"
        );
    return context;
}
export { SideBarProvider, useSideBarContext };
