import React from "react";
import styled from "styled-components";
import { Controller, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import { TextField, Box, Typography, Grid } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input[type="time"]::-webkit-calendar-picker-indicator {
    filter: invert(1); /* Invert the color to make it white */
    cursor: pointer;
  }
`;

const daysOfWeek = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const AvailabilityInput = ({ control, register, errors }) => {
  const { t } = useTranslation();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "availability",
  });

  const handleAddSlot = (day) => {
    append({ day, start_time: "", end_time: "", timezone: "GMT+2" });
  };

  const handleRemoveSlot = (id) => {
    const index = fields.findIndex((slot) => slot.id === id);
    remove(index)
  };

  const handleChange = (id, field, value) => {
    const index = fields.findIndex((slot) => slot.id === id);
    update(index, { ...fields[index], [field]: value });
  };

  return (
    <Wrapper>
      <Typography
        variant="h6"
        style={{
          color: "var(--color-grey-0)",
          fontSize: "1.6rem",
        }}
      >
        {t("availability")}
      </Typography>
      {daysOfWeek.map((day) => (
        <Box
          key={day}
          sx={{ mb: 3, p: 2, border: "1px solid #ddd", borderRadius: "8px" }}
        >
          <Typography variant="h6" style={{ marginBottom: "5px" }}>
            {t(day)}
          </Typography>
          {fields
            .filter((slot) => slot.day === day)
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
                    name={`availability.${day}.${index}.start_time`}
                    control={control}
                    defaultValue={slot.start_time}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="time"
                        label={t("startTime")}
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "white" },
                        }}
                        inputProps={{
                          step: 300, // 5 min
                          style: { color: "white" },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                          },
                        }}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handleChange(slot.id, "start_time", e.target.value);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Controller
                    name={`availability.${day}.${index}.end_time`}
                    control={control}
                    defaultValue={slot.end_time}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="time"
                        label={t("endTime")}
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "white" },
                        }}
                        inputProps={{
                          step: 300, // 5 min
                          style: { color: "white" },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                          },
                        }}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          handleChange(slot.id, "end_time", e.target.value);
                        }}
                      />
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
              </Grid>
            ))}
          <Button
            type="button"
            variant="outlined"
            sx={{ mt: 1 }}
            onClick={() => handleAddSlot(day)}
          >
            {t("addNewEntry")}
          </Button>
        </Box>
      ))}
    </Wrapper>
  );
};

export default AvailabilityInput;