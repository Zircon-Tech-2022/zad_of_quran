import React from "react";
import { FaTelegram } from "react-icons/fa6";

const Telegram = ({ className = "mainTelegram" }) => {
    return (
        <a
            href="https://t.me/zadofquran"
            className={`${className} socialIcon`}
            name="telegram"
            title="telegram"
        >
            <FaTelegram />
        </a>
    );
};

export default Telegram;
