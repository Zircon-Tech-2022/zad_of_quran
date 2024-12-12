import React from "react";
import styles from "./button.module.css";
const Button = ({ className, children, ...props }) => {
    return (
        <button
            className={`${styles[className] ? styles[className] : ""} ${
                styles.button
            } ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
