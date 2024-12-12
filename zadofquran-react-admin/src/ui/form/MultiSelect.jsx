// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import CircularProgress from "@mui/material/CircularProgress";
// import { Checkbox, Paper } from "@mui/material";
// import { BiSquare } from "react-icons/bi";
// import { BsCheckSquareFill } from "react-icons/bs";
// import styled from "styled-components";
// import { Controller, useForm } from "react-hook-form";

// const MyOption = styled.li`
//     font-size: 1.6rem;
//     color: var(--color-grey-600);
// `;

// export default function MultiSelect({
//     fieldName,
//     name = "test",
//     type = "",
//     control,
//     error: selectError,
//     setFormValue,
//     onChange,
//     myOptions,
//     hasApi = "",
//     defaultValue,
// }) {
//     const [open, setOpen] = React.useState(false);
//     const [options, setOptions] = React.useState([]);
//     const [error, setError] = React.useState(undefined); // State variable to store the selected values
//     const loading = open && options.length === 0 && !error;
//     const { register } = useForm();
//     let FetchData = async () => {
//         let data = await fetch(`${hasApi}`);
//         if (!data.ok) {
//             throw new Error("wrong wrong");
//         }
//         let res = await data.json();

//         return res;
//     };

//     React.useEffect(() => {
//         if (defaultValue) {
//             setFormValue(name, defaultValue);
//         }
//         let active = true;
//         if (!myOptions) {
//             if (!loading) {
//                 return undefined;
//             }

//             (async () => {
//                 if (active) {
//                     try {
//                         let data = await FetchData();

//                         setOptions(data);
//                     } catch (err) {
//                         setError("wrong man");
//                     }
//                 }
//             })();
//         } else {
//             setOptions(myOptions);
//         }

//         return () => {
//             active = false;
//         };
//     }, [loading]);

//     React.useEffect(() => {
//         if (!myOptions) {
//             if (!open) {
//                 setOptions([]);
//             }
//         }
//     }, [open]);
//     const CustomPaper = (props) => {
//         return (
//             <Paper
//                 {...props}
//                 dir="rtl"
//                 sx={{
//                     background: "var(--color-grey-0)",
//                     fontSize: "9.9rem",
//                     "& > * ": {
//                         fontSize: "1.6rem",
//                         fontFamily: "inherit",
//                     },
//                 }}
//             />
//         );
//     };
//     return (
//         <Controller
//             rules={{
//                 required: "ادخل هذا الحقل",
//             }}
//             {...register(name, {
//                 required: "Please select at least one fruit",
//                 validate: (value) =>
//                     value?.length > 0 || "Please select at least one fruit",
//             })}
//             control={control}
//             render={({ field, fieldState }) => {
//                 const { onChange, value, ref } = field;
//                 return (
//                     <Autocomplete
//                         id={name}
//                         defaultValue={
//                             defaultValue
//                                 ? { value: name, title: defaultValue }
//                                 : null
//                         }
//                         multiple={type == "multi"}
//                         disableCloseOnSelect={type == "multi"}
//                         PaperComponent={CustomPaper}
//                         limitTags={3}
//                         sx={{
//                             "& .MuiFormControl-root .MuiInputBase-root": {
//                                 padding: "10.5px 14px 10.5px 50px !important",
//                                 maxHeight: "20rem",
//                                 overflowY: "auto",
//                             },

//                             ".MuiInputBase-root": {
//                                 padding: "1rem 1rem 1rem 1rem",
//                             },
//                             "& .MuiAutocomplete-hasPopupIcon": {
//                                 paddingRight: "0px",
//                             },
//                             "& .MuiAutocomplete-hasClearIcon": {
//                                 paddingRight: "0px",
//                             },
//                             "& .MuiAutocomplete-inputRoot": {
//                                 paddingRight: "0px",
//                             },

//                             ".MuiFormControl-root": {
//                                 direction: "rtl",
//                             },
//                             ".MuiChip-root": {
//                                 background: "var(--color-brand-50)",
//                                 direction: "ltr",
//                             },
//                             ".MuiChip-deleteIcon path": {
//                                 fontSize: "1.8rem",
//                                 color: "var(--color-brand-600)",
//                             },

//                             ".MuiInputLabel-root.Mui-focused": {
//                                 fontSize: "1.8rem",
//                                 color: "var(--color-brand-600)",
//                                 transform: "translate(-14px, -9px) scale(0.75)",
//                             },
//                             ".MuiChip-label": {
//                                 fontSize: "1.8rem",
//                                 color: "var(--color-brand-700)",
//                             },

//                             ".MuiFormLabel-root": {
//                                 fontSize: "1.8rem",
//                                 right: "0",
//                                 left: "unset",
//                                 transformOrigin: "top right",
//                                 textAlign: "right",
//                                 transform: "translate(-14px, 16px) scale(1)",
//                                 color: "var(--color-grey-700)",
//                                 fontWeight: "500",
//                             },
//                             " .MuiInputLabel-root[data-shrink='true']": {
//                                 transform: "translate(-14px, -9px) scale(0.75)",
//                             },
//                             ".MuiOutlinedInput-input": {
//                                 fontSize: "1.6rem",
//                                 color: "var(--color-grey-600)",
//                                 marginLeft: "1rem",
//                                 width: "100%",
//                             },

//                             ".MuiOutlinedInput-notchedOutline": {
//                                 // borderWidth: "2px ",
//                                 fontSize: "1.8rem",
//                                 color: "var(--color-grey-0)",
//                                 // left: "0px",
//                                 // right: "0px",
//                                 textAlign: "right",
//                                 border: selectError
//                                     ? "1px solid #d32f2f !important"
//                                     : "",
//                             },
//                             ".MuiAutocomplete-popupIndicator .MuiSvgIcon-root ":
//                                 {
//                                     fontSize: "2.2rem",
//                                     color: "var(--color-grey-600)",
//                                 },
//                             ".MuiAutocomplete-endAdornment": {
//                                 left: "10px",
//                                 right: "unset !important",
//                                 direction: "rtl",
//                             },
//                             ".Mui-focused .MuiOutlinedInput-notchedOutline": {
//                                 border: selectError
//                                     ? "1px solid #d32f2f !important"
//                                     : "2px solid var(--color-brand-600) !important",
//                                 minHeight: "100%",
//                                 // overflowY: "scroll",
//                             },
//                             ".MuiFormHelperText-root": {
//                                 fontSize: "1.4rem",
//                                 textAlign: "right",
//                             },
//                         }}
//                         open={open}
//                         onOpen={() => {
//                             setOpen(true);
//                         }}
//                         onClose={() => {
//                             setOpen(false);
//                         }}
//                         isOptionEqualToValue={(option, value) =>
//                             option.title === value.title
//                         }
//                         getOptionLabel={(option) => {
//                             return option.title;
//                         }}
//                         onChange={(event, value) => {
//                             setFormValue(name, value.value);
//                         }}
//                         options={options}
//                         loading={loading}
//                         noOptionsText={error ? "حدث خطأ" : "لا يوجد"}
//                         loadingText="جاري التحميل"
//                         renderOption={(props, option, { selected }) => {
//                             console.log(option.title);
//                             console.log(value);
//                             return (
//                                 <MyOption {...props}>
//                                     <Checkbox
//                                         icon={<BiSquare />}
//                                         checkedIcon={<BsCheckSquareFill />}
//                                         style={{ marginRight: 8 }}
//                                         checked={option.value === value}
//                                     />
//                                     {option.title}
//                                 </MyOption>
//                             );
//                         }}
//                         renderInput={(params) => {
//                             return (
//                                 <TextField
//                                     error={selectError?.message}
//                                     helperText={selectError?.message}
//                                     inputRef={ref}
//                                     {...params}
//                                     label={fieldName}
//                                     InputProps={{
//                                         ...params.InputProps,
//                                         endAdornment: (
//                                             <React.Fragment>
//                                                 {loading ? (
//                                                     <CircularProgress
//                                                         color="inherit"
//                                                         size={20}
//                                                         sx={{
//                                                             color: "var(--color-sec-600)",
//                                                         }}
//                                                     />
//                                                 ) : null}
//                                                 {params.InputProps.endAdornment}
//                                             </React.Fragment>
//                                         ),
//                                     }}
//                                 />
//                             );
//                         }}
//                     />
//                 );
//             }}
//         ></Controller>
//     );
// }
// {
//     /* <MultiSelect
//                 control={control}
//                 type="multi"
//                 fieldName="اختر مراحل المدرس"
//                 id="courses"
//                 error={errors?.courses}
//                 setFormValue={setValue}
//                 name="courses"
//                 hasApi="https://jsonplaceholder.typicode.com/todos"
//             /> */
// }

import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Checkbox, Paper } from "@mui/material";
import { BiSquare } from "react-icons/bi";
import { BsCheckSquareFill } from "react-icons/bs";
import styled from "styled-components";
import { Controller, set, useForm } from "react-hook-form";
import { useLangContext } from "../../context/LangContext";

const MyOption = styled.li`
    font-size: 1.6rem;
    color: var(--color-grey-600);
`;

export default function MultiSelect({
    fieldName,
    name = "test",
    type = "",
    control,
    error: selectError,
    setFormValue,
    myOptions,
    hasApi,
    defaultValue,
    labelColor = "var(--color-grey-500)",
    inputColor = "var(--color-grey-700)",
    labelSize = "1.6rem",
    inputSize = "1.6rem",
    bgColor = "transparent",
}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [def, setDef] = React.useState([]);
    const [error, setError] = React.useState(undefined); // State variable to store the selected values
    const loading = options.length === 0 && !error;
    const [load, setLoad] = React.useState(hasApi ? true : false);
    const { language } = useLangContext();
    const { register } = useForm();

    let FetchData = async () => {
        let data = await fetch(`${hasApi}`);
        if (!data.ok) {
            throw new Error("wrong wrong");
        }
        let res = await data.json();

        return res;
    };
    React.useLayoutEffect(() => {
        if (defaultValue) {
            setFormValue(name, defaultValue);
        }
        let active = true;
        if (!myOptions) {
            if (!loading) {
                return undefined;
            }

            (async () => {
                if (active) {
                    try {
                        let data = await FetchData();
                        setOptions([
                            { value: "ar", title: "lol" },
                            { value: "en", title: "as" },
                            { value: "as", title: "ds" },
                            { value: "ew", title: "qw" },
                            { value: "aq", title: "se" },
                        ]);
                        setLoad(false);
                        // setOptions(data);
                    } catch (err) {
                        setError("wrong man");
                    }
                }
            })();
        } else {
            setOptions(myOptions);
        }
        // calculate two n
        return () => {
            active = false;
        };
    }, []); // [loading,options]
    React.useEffect(() => {
        // if (!myOptions) {
        //     if (!open) {
        //         setOptions([]);
        //     }
        // }
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
        !load && (
            <Controller
                rules={{
                    required: "ادخل هذا الحقل",
                }}
                {...register(name, {
                    required: "Please select at least one fruit",
                    validate: (value) =>
                        value?.length > 0 || "Please select at least one fruit",
                })}
                control={control}
                render={({ field, fieldState }) => {
                    const { onChange, value, ref } = field;

                    let result;
                    const fun = (array) => {
                        const defValue =
                            type === "multi"
                                ? defaultValue
                                    ? array?.filter((ele) =>
                                          defaultValue?.includes(ele.value)
                                      )
                                    : [{ value: name, title: "حدث خطأ" }]
                                : defaultValue
                                ? {
                                      value: name,
                                      title:
                                          array?.find(
                                              (ele) =>
                                                  ele?.value === defaultValue
                                          )?.title || "",
                                  }
                                : { value: name, title: "حدث خطأ" };

                        return defValue;
                    };
                    if (hasApi) {
                        result = fun(options);
                    } else {
                        result = fun(myOptions);
                    }

                    return (
                        <Autocomplete
                            id={name}
                            // defaultValue={result}
                            defaultValue={defaultValue && result}
                            multiple={type == "multi"}
                            disableCloseOnSelect={type == "multi"}
                            PaperComponent={CustomPaper}
                            limitTags={3}
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            isOptionEqualToValue={(option, value) => {
                                return option.title === value.title;
                            }}
                            getOptionLabel={(option) => {
                                return option.title;
                            }}
                            onChange={(event, value) => {
                                if (type === "multi") {
                                    setFormValue(
                                        name,
                                        value?.map((ele) => ele?.value)
                                    );
                                } else {
                                    setFormValue(name, value?.value);
                                }
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
                                            checked={
                                                type === "multi"
                                                    ? value.includes(
                                                          option.value
                                                      )
                                                    : selected

                                                // : option.value === value
                                            }
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
                                        inputRef={ref}
                                        {...params}
                                        label={fieldName}
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
                                                    {
                                                        params.InputProps
                                                            .endAdornment
                                                    }
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                );
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
                                    padding: ".5rem 1.5rem !important",
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
                                    transform:
                                        "translate(14px, -9px) scale(0.75)",
                                    ...(language === "ar" && {
                                        top: 0,
                                        transform:
                                            "translate(-14px, -9px) scale(0.75)",
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
                                        transform:
                                            "translate(-14px, -50%) scale(1)",
                                    }),

                                    color: labelColor,
                                    fontWeight: "500",
                                },
                                ".MuiFormLabel-filled": {
                                    top: 0,
                                    transform:
                                        "translate(14px, -9px) scale(0.75)",
                                    ...(language === "ar" && {
                                        top: 0,
                                        transform:
                                            "translate(-14px, -9px) scale(0.75)",
                                    }),
                                },

                                ".MuiOutlinedInput-notchedOutline": {
                                    fontSize: labelSize,
                                    border: "2px solid var(--color-grey-100)",
                                    ...(language === "ar" && {
                                        textAlign: "right",
                                    }),
                                },
                                ".MuiFormHelperText-root": {
                                    fontSize: "1.4rem",
                                    textAlign: "right",
                                },

                                ".Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: selectError
                                            ? "1px solid #d32f2f !important"
                                            : "2px solid var(--color-brand-600) !important",
                                        minHeight: "100%",
                                    },

                                ".MuiAutocomplete-endAdornment": {
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    ...(language === "ar" && {
                                        right: "unset !important",
                                        left: "10px",
                                    }),
                                },
                            }}
                        />
                    );
                }}
            ></Controller>
        )
    );
}
