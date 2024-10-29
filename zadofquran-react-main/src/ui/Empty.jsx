import React from "react";

const style = {
    fontSize: "3.8rem",
    color: "var(--color-brand-600)",
    textAlign: "center",
};

const Empty = ({ text, ...props }) => {
    return (
        <p {...props} style={style}>
            {text}
        </p>
    );
};

export default Empty;
