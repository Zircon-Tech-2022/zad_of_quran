import React, { useRef } from "react";
import styled from "styled-components";
import { Controller, useFieldArray } from "react-hook-form";
import Button from "../../ui/Button";
import { TextField, Box, Typography, Grid } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import TimezoneButton from './../TimezoneButton';
import { useLocation } from "react-router-dom";
import { convertToGMT3 } from "../../utils/helpers";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input[type="time"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

const daysOfWeek = [
  { en: "saturday", ar: "السبت" },
  { en: "sunday", ar: "الأحد" },
  { en: "monday", ar: "الإثنين" },
  { en: "tuesday", ar: "الثلاثاء" },
  { en: "wednesday", ar: "الأربعاء" },
  { en: "thursday", ar: "الخميس" },
  { en: "friday", ar: "الجمعة" },
];

const AvailabilityInput = ({ control, register, errors }) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "availability",
  });

  const location = useLocation();
  const isLesson = location.pathname.includes('lesson');

  const defaultTimezoneRef = useRef("GMT+2");

  const handleAddSlot = (day) => {
    append({ day: day.en, start_time: "", end_time: "", timezone: defaultTimezoneRef.current });
  };

  const handleRemoveSlot = (id) => {
    const index = fields.findIndex((slot) => slot.id === id);
    remove(index)
  };

  const handleChange = (id, field, value) => {
    const index = fields.findIndex((slot) => slot.id === id);
    update(index, { ...fields[index], [field]: value });
  };

  const handleTimezoneChange = async (newValue) => {
    defaultTimezoneRef.current = newValue;
  }

  return (
    <Wrapper>
      <Typography
        variant="h6"
        style={{
          fontSize: "1.6rem",
        }}
      >
        الإتاحة
      </Typography>

      {isLesson && (<TimezoneButton defaultValue={defaultTimezoneRef.current} handleChange={handleTimezoneChange} />)}
      {daysOfWeek.map((day) => (
        <Box
          key={day.en}
          sx={{ mb: 3, p: 2, border: "1px solid #ddd", borderRadius: "8px" }}
        >
          <Typography variant="h6" style={{ marginBottom: "5px" }}>
            {day.ar}
          </Typography>
          {fields
            .filter((slot) => slot.day === day.en)
            .map((slot, index) => (
              <Grid
                container
                spacing={2}
                key={slot.id}
                style={{ marginBottom: "10px" }}
                alignItems="center"
              >
                <Grid item xs={5}>
                  <Controller
                    name={`availability.${day.en}.${index}.start_time`}
                    control={control}
                    defaultValue={slot.start_time}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          type="time"
                          label="من"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleChange(slot.id, "start_time", e.target.value);
                          }}
                        />
                        <p>يعادل: <span style={{ direction: "ltr", display: "inline-block" }}>
                          {convertToGMT3(field.value, defaultTimezoneRef.current)}</span></p>
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Controller
                    name={`availability.${day.en}.${index}.end_time`}
                    control={control}
                    defaultValue={slot.end_time}
                    render={({ field }) => (
                      <>
                        <TextField
                          {...field}
                          type="time"
                          label="إلى"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleChange(slot.id, "end_time", e.target.value);
                          }}
                        />
                        <p>يعادل: <span style={{ direction: "ltr", display: "inline-block" }}>
                          {convertToGMT3(field.value, defaultTimezoneRef.current)}</span></p>
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => handleRemoveSlot(slot.id)}
                  >
                    <FaRegTrashAlt />
                  </Button>
                </Grid>
                <p>بتوقيت المملكة العربية السعودية</p>
              </Grid>
            ))}
          <Button
            type="button"
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={() => handleAddSlot(day)}
          >
            إضافة فترة
          </Button>
        </Box>
      ))}
    </Wrapper>
  );
};

export default AvailabilityInput;