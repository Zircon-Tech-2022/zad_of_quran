import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Checkbox, Paper } from "@mui/material";
import { BiSquare } from "react-icons/bi";
import { BsCheckSquareFill } from "react-icons/bs";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";

const MyOption = styled.li`
    font-size: 1.6rem;
    color: var(--color-grey-600);
`;

export default function FilterSelect({
    label,
    name = "test",
    type = "",
    control,
    error: selectError,
    setFormValue,
    onChange,
    myOptions,
    hasApi = "",
    defaultValue,
}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [error, setError] = React.useState(undefined); // State variable to store the selected values
    const loading = open && options.length === 0 && !error;

    const { register } = useForm();
    let FetchData = async () => {
        let data = await fetch(`${hasApi}`);
        if (!data.ok) {
            throw new Error("wrong wrong");
        }
        let res = await data.json();

        return res;
    };
    React.useEffect(() => {
        let active = true;
        if (!myOptions) {
            if (!loading) {
                return undefined;
            }

            (async () => {
                if (active) {
                    try {
                        let data = await FetchData();

                        setOptions(data);
                    } catch (err) {
                        setError("wrong man");
                    }
                }
            })();
        } else {
            setOptions(myOptions);
        }

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!myOptions) {
            if (!open) {
                setOptions([]);
            }
        }
    }, [open]);
    const CustomPaper = (props) => {
        return (
            <Paper
                {...props}
                dir="rtl"
                sx={{
                    background: "var(--color-grey-0)",
                    fontSize: "9.9rem",
                    "& > * ": {
                        fontSize: "1.6rem",
                        fontFamily: "inherit",
                    },
                }}
            />
        );
    };
    return (
        <Autocomplete
            id={name}
            multiple={type == "multi"}
            disableCloseOnSelect={type == "multi"}
            PaperComponent={CustomPaper}
            limitTags={3}
            sx={{
                "& .MuiFormControl-root .MuiInputBase-root": {
                    padding: "10.5px 14px 10.5px 50px !important",
                    maxHeight: "20rem",
                    overflowY: "auto",
                },

                ".MuiInputBase-root": {
                    padding: "1rem 1rem 1rem 1rem",
                },
                "& .MuiAutocomplete-hasPopupIcon": {
                    paddingRight: "0px",
                },
                "& .MuiAutocomplete-hasClearIcon": {
                    paddingRight: "0px",
                },
                "& .MuiAutocomplete-inputRoot": {
                    paddingRight: "0px",
                },

                ".MuiFormControl-root": {
                    direction: "rtl",
                },
                ".MuiChip-root": {
                    background: "var(--color-brand-50)",
                    direction: "ltr",
                },
                ".MuiChip-deleteIcon path": {
                    fontSize: "1.8rem",
                    color: "var(--color-brand-600)",
                },

                ".MuiInputLabel-root.Mui-focused": {
                    fontSize: "1.8rem",
                    color: "var(--color-brand-600)",
                    transform: "translate(-14px, -9px) scale(0.75)",
                },
                ".MuiChip-label": {
                    fontSize: "1.8rem",
                    color: "var(--color-brand-700)",
                },

                ".MuiFormLabel-root": {
                    fontSize: "1.8rem",
                    right: "0",
                    left: "unset",
                    transformOrigin: "top right",
                    textAlign: "right",
                    transform: "translate(-14px, 16px) scale(1)",
                    color: "var(--color-grey-700)",
                    fontWeight: "500",
                },
                " .MuiInputLabel-root[data-shrink='true']": {
                    transform: "translate(-14px, -9px) scale(0.75)",
                },
                ".MuiOutlinedInput-input": {
                    fontSize: "1.6rem",
                    color: "var(--color-grey-600)",
                    marginLeft: "1rem",
                    width: "100%",
                },

                ".MuiOutlinedInput-notchedOutline": {
                    // borderWidth: "2px ",
                    fontSize: "1.8rem",
                    color: "var(--color-grey-0)",
                    // left: "0px",
                    // right: "0px",
                    textAlign: "right",
                    border: selectError ? "1px solid #d32f2f !important" : "",
                },
                ".MuiAutocomplete-popupIndicator .MuiSvgIcon-root ": {
                    fontSize: "2.2rem",
                    color: "var(--color-grey-600)",
                },
                ".MuiAutocomplete-endAdornment": {
                    left: "10px",
                    right: "unset !important",
                    direction: "rtl",
                },
                ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: selectError
                        ? "1px solid #d32f2f !important"
                        : "2px solid var(--color-brand-600) !important",
                    minHeight: "100%",
                    // overflowY: "scroll",
                },
                ".MuiFormHelperText-root": {
                    fontSize: "1.4rem",
                    textAlign: "right",
                },
            }}
            defaultValue={
                defaultValue ? { value: name, title: defaultValue } : null
            }
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) =>
                option.title === value.title
            }
            getOptionLabel={(option) => {
                return option.title;
            }}
            onChange={(event, value) => {
                setFormValue(name, value);
            }}
            options={options}
            loading={loading}
            noOptionsText={error ? "حدث خطأ" : "لا يوجد"}
            loadingText="جاري التحميل"
            renderOption={(props, option, { selected }) => {
                return (
                    <MyOption {...props}>
                        <Checkbox
                            icon={<BiSquare />}
                            checkedIcon={<BsCheckSquareFill />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.title}
                    </MyOption>
                );
            }}
            renderInput={(params) => {
                return (
                    <TextField
                        error={selectError?.message}
                        helperText={selectError?.message}
                        {...params}
                        label={label}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                            sx={{
                                                color: "var(--color-sec-600)",
                                            }}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                );
            }}
        />
    );
}
