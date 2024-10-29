import { useLangContext } from "../context/LangContext";
import { useUser } from "../features/authentication/useUser";

const ProtectedRoutes = ({ children }) => {
    const { language } = useLangContext();
    // 1. Load the authenticated user
    // const { isLoading, isAuth } = useUser();

    // 2. If there is NO authenticated user, redirect to the /login
    // useEffect(
    //     function () {
    //         if (!isAuth && !isLoading) router.push("/auth/login");
    //     },
    //     [router, isAuth, isLoading]
    // );

    // // 3. While loading, show a spinner

    // 4. If there IS a user, render the app
    // if (isAuth) return children;
    // if (isAuth) return <>{children}</>;
    return <div key={language}>{children}</div>;
};

export default ProtectedRoutes;
