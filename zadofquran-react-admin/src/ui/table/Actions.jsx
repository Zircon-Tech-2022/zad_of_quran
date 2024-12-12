import { Button } from "@mui/material";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

const Actions = ({ onClick, open }) => {
    return (
        <Button
            sx={{ fontSize: "2.2rem", width: "fit-content" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={onClick}
        >
            <BsThreeDots />
        </Button>
    );
};

export default Actions;
