import React from "react";
import styled from "styled-components";
import { BiCalendar, BiTime } from "react-icons/bi";
import { useFieldArray } from "react-hook-form";
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

const AvailabilityInput = ({ control, register, error }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  const offsets = [
    "GMT-12", "GMT-11", "GMT-10", "GMT-9:30", "GMT-9",
    "GMT-8", "GMT-7", "GMT-6", "GMT-5", "GMT-4:30",
    "GMT-4", "GMT-3:30", "GMT-3", "GMT-2", "GMT-1",
    "GMT", "GMT+1", "GMT+2", "GMT+3", "GMT+3:30",
    "GMT+4", "GMT+4:30", "GMT+5", "GMT+5:30", "GMT+5:45",
    "GMT+6", "GMT+6:30", "GMT+7", "GMT+8", "GMT+8:45",
    "GMT+9", "GMT+9:30", "GMT+10", "GMT+10:30", "GMT+11",
    "GMT+11:30", "GMT+12", "GMT+12:45", "GMT+13", "GMT+14"
  ];

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
          <FormControl >
            <InputLabel id={`day-label-${field.id}`} style={{
              color: "var(--color-grey-0)",
              fontSize: "1.6rem",
            }}>
              {t("day")}
            </InputLabel>
            <StyleSelect
              labelId={`day-label-${field.id}`}
              {...register(`availability.${index}.day`, {
                required: t("required"),
              })}
              error={error?.[index]?.day}
              label={t("day")}
              id="outlined-required"
              InputAdornment={<BiCalendar />}
            >
              <MenuItem value="Sunday">{t("sunday")}</MenuItem>
              <MenuItem value="Monday">{t("monday")}</MenuItem>
              <MenuItem value="Tuesday">{t("tuesday")}</MenuItem>
              <MenuItem value="Wednesday">{t("wednesday")}</MenuItem>
              <MenuItem value="Thursday">{t("thursday")}</MenuItem>
              <MenuItem value="Friday">{t("friday")}</MenuItem>
              <MenuItem value="Saturday">{t("saturday")}</MenuItem>
            </StyleSelect>
            <FormHelperText style={{
              color: "#d32f2f",
              fontSize: "1.6rem",
            }}>{error?.[index]?.day?.message}</FormHelperText>
          </FormControl>
          {/* <StyleInput
            reg={{
              ...register(`availability.${index}.timezone`, {
                required: t("required"),
              }),
            }}
            error={error?.[index]?.timezone}
            type="select"
            label={t("timezone")}
          >
            <option value="">{t("selectTimezone")}</option>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </StyleInput> */}
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
            <StyleSelect
              labelId={`timezone-label-${field.id}`}
              {...register(`availability.${index}.timezone`, {
                required: t("required"),
              })}
              error={error?.[index]?.timezone}
              label={t("timezone")}
              id="timezone-select"
            >
              {offsets.map((offset) => (
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
              {error?.[index]?.timezone?.message}
            </FormHelperText>
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
