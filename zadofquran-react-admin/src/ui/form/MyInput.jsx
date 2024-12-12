import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { BiPhone } from "react-icons/bi";

const MyInput = ({
    type = "text",
    label = "اختر",
    name,
    reg,
    error,
    icon,
    getValue,
    ...props
}) => {
    return (
        <TextField
            inputProps={reg}
            dir="rtl"
            name={name}
            error={error}
            helperText={error?.message}
            onChange={(e) => {
                getValue && getValue(e.currentTarget.value.trim());
            }}
            sx={{
                width: "100%",
                "& input": {
                    fontSize: "1.6rem",
                    padding: "1.4rem 0 ",
                },
                ".MuiInputBase-root": {
                    flexDirection: "row",
                    paddingLeft: ".5rem",
                },
                ".MuiInputAdornment-root": {
                    fontSize: "2.4rem",
                },
                "& label": {
                    fontSize: "1.8rem",
                },
                ".MuiInputLabel-root.Mui-focused": {
                    fontSize: "1.8rem",
                    color: "var(--color-brand-600)",
                    transform: "translate(-14px, -9px) scale(0.75)",
                },
                ".MuiChip-label": {
                    fontSize: "1.8rem",
                    color: "var(--color-brand-600)",
                },

                ".MuiFormLabel-root": {
                    fontSize: "1.8rem",
                    right: "0",
                    left: "unset",
                    transformOrigin: "top right",
                    textAlign: "right",
                    transform: "translate(-14px, 12px) scale(1)",
                    color: "var(--color-grey-700)",
                    fontWeight: "500",
                },
                ".MuiFormLabel-filled": {
                    transform: "translate(-14px, -9px) scale(0.75)",
                },

                ".MuiOutlinedInput-notchedOutline": {
                    fontSize: "1.8rem",
                    textAlign: "right",
                },
                ".MuiFormHelperText-root": {
                    fontSize: "1.4rem",
                    textAlign: "right",
                },
                ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid var(--color-brand-600) ",
                },
            }}
            InputProps={{
                endAdornment: (
                    <>
                        {icon && (
                            <InputAdornment position="end">
                                {icon}
                            </InputAdornment>
                        )}
                    </>
                ),
            }}
            {...props}
            id="outlined-required"
            label={label}
            type={type}
        />
    );
};

export default MyInput;
