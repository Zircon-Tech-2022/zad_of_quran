import React from "react";
import { ImWhatsapp } from "react-icons/im";

const Whatsapp = ({ className = "mainWhatsapp", ...props }) => {
    return (
        <a
            href="https://wa.me/+966594698967"
            className={`${className} socialIcon`}
            name="whatsapp"
            title="whatsapp"
            {...props}
        >
            <ImWhatsapp />
        </a>
    );
};

export default Whatsapp;
