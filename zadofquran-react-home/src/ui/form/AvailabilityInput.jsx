import React from "react";
import styled from "styled-components";
import { BiCalendar } from "react-icons/bi";
import { Controller, useFieldArray } from "react-hook-form";
import { t } from "i18next";
import Button from "../../ui/Button";
import MyInput from "../../ui/form/MyInput";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Entry = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

const StyleInput = styled(MyInput)`
.MuiInputBase-input {
    color: var(--color-grey-0);
}
& .MuiOutlinedInput-notchedOutline {
    border-color: var(--color-grey-0);
}
& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: var(--color-grey-0);
}

& .MuiFormLabel-root {
    color: var(--color-grey-0) !important;
}
.MuiInputLabel-shrink {
    color: var(--color-sec-500) !important;
}
.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: "1px solid var(--color-grey-0)";
}
.MuiInputAdornment-root {
    color: var(--color-grey-0);
}
`;

const StyleSelect = styled(Select)`
.MuiSvgIcon-root {
    color: var(--color-grey-0) !important;
}
.MuiInputBase-input {
    color: var(--color-grey-0);
}
& .MuiOutlinedInput-notchedOutline {
    border-color: var(--color-grey-0);
}
& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: var(--color-grey-0);
}

& .MuiFormLabel-root {
    color: var(--color-grey-0) !important;
}
.MuiInputLabel-shrink {
    color: var(--color-sec-500) !important;
}

.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: "1px solid var(--color-grey-0)";
}
.MuiInputAdornment-root {
    color: var(--color-grey-0);
}
`;

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

const daysOfWeek = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

const AvailabilityInput = ({ control, register, error }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  return (
    <Wrapper>
      <InputLabel style={{
        color: "var(--color-grey-0)",
        fontSize: "1.6rem",
      }}>
        {t("availability")}
      </InputLabel>
      {fields.map((field, index) => (
        <Entry key={field.id}>
          <FormControl>
            <InputLabel
              id={`day-label-${field.id}`}
              style={{
                color: "var(--color-grey-0)",
                fontSize: "1.6rem",
              }}
            >
              {t("day")}
            </InputLabel>
            <Controller
              name={`availability.${index}.day`}
              control={control}
              rules={{ required: t("required") }}
              render={({ field: controllerField, fieldState: { error } }) => (
                <>
                  <StyleSelect
                    {...controllerField}
                    labelId={`day-label-${field.id}`}
                    error={!!error}
                    label={t("day")}
                    id="outlined-required"
                    InputAdornment={<BiCalendar />}
                  >
                    {daysOfWeek.map((day) => (
                      <MenuItem key={day} value={day}>
                        {t(day)}
                      </MenuItem>)
                    )}
                  </StyleSelect>
                  <FormHelperText
                    style={{
                      color: "#d32f2f",
                      fontSize: "1.6rem",
                    }}
                  >
                    {error?.message}
                  </FormHelperText>
                </>
              )}
            />
          </FormControl>

          <FormControl>
            <InputLabel
              id={`timezone-label-${field.id}`}
              style={{
                color: "var(--color-grey-0)",
                fontSize: "1.6rem",
              }}
            >
              {t("timezone")}
            </InputLabel>
            <Controller
              name={`availability.${index}.timezone`}
              control={control}
              rules={{ required: t("required") }}
              render={({ field: controllerField, fieldState: { error } }) => (
                <>
                  <StyleSelect
                    {...controllerField}
                    labelId={`timezone-label-${field.id}`}
                    error={!!error}
                    label={t("timezone")}
                    id="timezone-select"
                  >
                    {timezoneOffsets.map((offset) => (
                      <MenuItem key={offset} value={offset}>
                        {offset}
                      </MenuItem>
                    ))}
                  </StyleSelect>
                  <FormHelperText
                    style={{
                      color: "#d32f2f",
                      fontSize: "1.6rem",
                    }}
                  >
                    {error?.message}
                  </FormHelperText>
                </>
              )}
            />
          </FormControl>

          <StyleInput
            reg={{
              ...register(`availability.${index}.start_time`, {
                required: t("required"),
              }),
            }}
            error={error?.[index]?.start_time}
            type="time"
            label={t("startTime")}
          />
          <StyleInput
            reg={{
              ...register(`availability.${index}.end_time`, {
                required: t("required"),
              }),
            }}
            error={error?.[index]?.end_time}
            type="time"
            label={t("endTime")}
          />

          <Button
            type="button"
            onClick={() => remove(index)}
            style={{ marginTop: "10px" }}
          >
            {t("removeEntry")}
          </Button>
        </Entry>
      ))}

      <Button type="button" onClick={() => append({ day: "", start_time: "", end_time: "", timezone: "" })}>
        {t("addNewEntry")}
      </Button>
    </Wrapper>
  );
};

export default AvailabilityInput;
