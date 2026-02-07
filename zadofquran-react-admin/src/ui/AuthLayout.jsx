import { Outlet } from "react-router-dom";

const AuthLayout = ({ children }) => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
