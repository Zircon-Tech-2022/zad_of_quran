import React from "react";
import { FaInstagram } from "react-icons/fa6";

const Insta = ({ className = "mainInsta" }) => {
    return (
        <a
            href="https://instagram.com/zadofquran?igshid=YTQwZjQ0NmI0OA%3D%3D&utm_source=qr"
            className={`${className} socialIcon`}
            name="insta"
            title="insta"
        >
            <FaInstagram />
        </a>
    );
};

export default Insta;
