import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { BiTimer } from "react-icons/bi";

const timezoneOffsets = [
    "GMT-12", "GMT-11", "GMT-10", "GMT-9:30", "GMT-9",
    "GMT-8", "GMT-7", "GMT-6", "GMT-5", "GMT-4:30",
    "GMT-4", "GMT-3:30", "GMT-3", "GMT-2", "GMT-1",
    "GMT", "GMT+1", "GMT+2", "GMT+3", "GMT+3:30",
    "GMT+4", "GMT+4:30", "GMT+5", "GMT+5:30", "GMT+5:45",
    "GMT+6", "GMT+6:30", "GMT+7", "GMT+8", "GMT+8:45",
    "GMT+9", "GMT+9:30", "GMT+10", "GMT+10:30", "GMT+11",
    "GMT+11:30", "GMT+12", "GMT+12:45", "GMT+13", "GMT+14"
];

const TimezoneButton = ({ defaultValue, handleChange }) => (
    <FormControl
        style={{
            width: "200px",
        }}
    >
        <InputLabel
            sx={{ fontSize: "1.6rem", }}
            id="timezone-label">المنطقة الزمنية</InputLabel>
        <Select
            sx={{
                textAlign: "left",
                borderColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.secondary.main,
                "& .MuiSelect-icon": {
                    color: (theme) => theme.palette.secondary.main,
                    fontSize: "2.5rem",
                }
            }}
            defaultValue={defaultValue}
            IconComponent={BiTimer}
            onChange={(e) => handleChange(e)}
            labelId={`timezone-label`}
            label="المنطقة الزمنية"
            id="timezone-select"
        >
            {timezoneOffsets.map((offset) => (
                <MenuItem key={offset} value={offset}>
                    {offset}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default TimezoneButton;
