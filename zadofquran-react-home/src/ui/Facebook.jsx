import React from "react";
import { FaFacebook } from "react-icons/fa6";

const Facebook = ({ className = "mainFacebook" }) => {
    return (
        <a
            href="https://www.facebook.com/zadofquran?mibextid=LQQJ4d"
            className={`${className} socialIcon`}
            name="facebook"
            title="facebook"
        >
            <FaFacebook />
        </a>
    );
};

export default Facebook;
