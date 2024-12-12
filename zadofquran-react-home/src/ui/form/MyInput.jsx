import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useLangContext } from "../../context/LangContext";

const MyInput = ({
    type = "text",
    label = "اختر",
    name,
    reg,
    error,
    icon,
    action,
    labelColor = "var(--color-grey-500)",
    inputColor = "var(--color-grey-700)",
    getValues,
    labelSize = "1.6rem",
    inputSize = "1.6rem",
    bgColor = "transparent",
    ...props
}) => {
    const { language } = useLangContext();
    return (
        <TextField
            inputProps={reg}
            dir="rtl"
            type={type}
            name={name}
            error={error}
            helperText={error?.message}
            onChange={(e) => {
                // getValue && getValue(e.currentTarget.value.trim());
                // console.log(getValue(e.target.name));
                // getValue && getValue(e.target.name.trim());
                action && action();
                // console.log(getValues());
                // console.log(getValues(e.target.name));
            }}
            sx={{
                width: "100%",
                background: bgColor,
                direction: "ltr",
                ...(language === "ar" && {
                    direction: "rtl",
                }),
                "& input": {
                    fontSize: inputSize,
                    padding: "1rem 0 ",
                    color: inputColor,
                },
                ".MuiInputBase-root": {
                    flexDirection: "row",
                    padding: "0 1.5rem",
                },
                ".MuiInputAdornment-root": {
                    fontSize: "2.2rem",
                },
                "& label": {
                    fontSize: labelSize,
                },
                ".MuiInputLabel-root.Mui-focused": {
                    // fontSize: "1.8rem",
                    color: "var(--color-brand-600)",
                    top: 0,
                    transform: "translate(14px, -9px) scale(0.75)",
                    ...(language === "ar" && {
                        top: 0,
                        transform: "translate(-14px, -9px) scale(0.75)",
                    }),
                },
                ".MuiChip-label": {
                    transition: ".2s all ease",
                    fontSize: labelSize,
                    color: "var(--color-brand-600)",
                },

                ".MuiFormLabel-root": {
                    fontSize: labelSize,
                    top: "50%",
                    transition: ".2s all ease",
                    transform: "translate(14px,-50%) scale(1)",
                    ...(language === "ar" && {
                        right: "0",
                        left: "unset",
                        transformOrigin: "top right",
                        textAlign: "right",
                        top: "50%",
                        transform: "translate(-14px, -50%) scale(1)",
                    }),

                    color: labelColor,
                    fontWeight: "500",
                },
                ".MuiFormLabel-filled": {
                    top: 0,
                    transform: "translate(14px, -9px) scale(0.75)",
                    ...(language === "ar" && {
                        top: 0,
                        transform: "translate(-14px, -9px) scale(0.75)",
                    }),
                },

                ".MuiOutlinedInput-notchedOutline": {
                    fontSize: labelSize,
                    border: "2px solid var(--color-grey-300)",
                    ...(language === "ar" && {
                        textAlign: "right",
                    }),
                },
                ".MuiFormHelperText-root": {
                    position: "absolute",
                    top: "100%",
                    transform: "translateY(-30%)",
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
                            <InputAdornment
                                position={language === "ar" ? "start" : "end"}
                            >
                                {icon}
                            </InputAdornment>
                        )}
                    </>
                ),
            }}
            {...props}
            id="outlined-required"
            label={label}
        />
    );
};

export default MyInput;
