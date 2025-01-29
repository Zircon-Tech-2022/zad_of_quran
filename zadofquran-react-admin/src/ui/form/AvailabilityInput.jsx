import React from "react";
import styled from "styled-components";
import { BiCalendar } from "react-icons/bi";
import { Controller, useFieldArray } from "react-hook-form";
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

const AvailabilityInput = ({ control, register, error }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  return (
    <Wrapper>
      <InputLabel style={{
        fontSize: "1.6rem",
      }}>
        الإتاحة
      </InputLabel>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Entry>
            <FormControl>
              <InputLabel
                id={`day-label-${field.id}`}
                style={{
                  fontSize: "1.6rem",
                }}
              >
                اليوم
              </InputLabel>
              <Controller
                name={`availability.${index}.day`}
                control={control}
                defaultValue="" // Ensure a default value is provided
                rules={{ required: "يجب ادخال هذا الحقل" }}
                render={({ field: controllerField, fieldState: { error } }) => (
                  <>
                    <Select
                      {...controllerField}
                      labelId={`day-label-${field.id}`}
                      error={!!error}
                      label="اليوم"
                      id="outlined-required"
                      InputAdornment={<BiCalendar />}
                    >
                      <MenuItem key="saturday" value="saturday">السبت</MenuItem>
                      <MenuItem key="sunday" value="sunday">الأحد</MenuItem>
                      <MenuItem key="monday" value="monday">الإثنين</MenuItem>
                      <MenuItem key="tuesday" value="tuesday">الثلاثاء</MenuItem>
                      <MenuItem key="wednesday" value="wednesday">الأربعاء</MenuItem>
                      <MenuItem key="thursday" value="thursday">الخميس</MenuItem>
                      <MenuItem key="friday" value="friday">الجمعة</MenuItem>
                    </Select>
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
                  fontSize: "1.6rem",
                }}
              >
                المنطقة الزمنية
              </InputLabel>
              <Controller
                name={`availability.${index}.timezone`}
                control={control}
                defaultValue="" // Ensure a default value is provided
                rules={{ required: "يجب ادخال هذا الحقل" }}
                render={({ field: controllerField, fieldState: { error } }) => (
                  <>
                    <Select
                      {...controllerField}
                      labelId={`timezone-label-${field.id}`}
                      error={!!error}
                      label="المنطقة الزمنية"
                      id="timezone-select"
                    >
                      {timezoneOffsets.map((offset) => (
                        <MenuItem key={offset} value={offset}>
                          {offset}
                        </MenuItem>
                      ))}
                    </Select>
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

            <MyInput
              reg={{
                ...register(`availability.${index}.start_time`, {
                  required: "يجب ادخال هذا الحقل",
                }),
              }}
              error={error?.[index]?.start_time}
              type="time"
              label="وقت البدء (من)"
            />
            <MyInput
              reg={{
                ...register(`availability.${index}.end_time`, {
                  required: "يجب ادخال هذا الحقل",
                }),
              }}
              error={error?.[index]?.end_time}
              type="time"
              label="وقت النهاية (إلى)"
            />
          </Entry>
          <Button
            type="button"
            onClick={() => remove(index)}
            style={{
              marginTop: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            variation="third"
          >
            حذف حقل الإدخال
          </Button>
        </React.Fragment>
      ))}

      <Button
        style={{
          marginTop: "10px",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        type="button" onClick={() => append({ day: "", start_time: "", end_time: "", timezone: "" })}>
        إضافة حقل إدخال جديد
      </Button>
    </Wrapper>
  );
};

export default AvailabilityInput;
