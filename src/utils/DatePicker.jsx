import React from "react";
import DatePicker from "react-datepicker";
import { TextField, InputAdornment } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import "react-datepicker/dist/react-datepicker.css"; // Ensure to include the default styles for DatePicker

const DatePickerComponent = ({
  selectedDate,
  setSelectedDate,
  isDisabled = false,
}) => {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {" "}
      {/* Set relative positioning */}
      <DatePicker
        disabled={isDisabled}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MMMM d, yyyy"
        placeholderText="Click to select a date"
        showPopperArrow={false}
        customInput={
          <TextField
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: "10px" }} // Adjust margin if needed
          />
        }
        popperModifiers={{
          preventOverflow: {
            enabled: true,
            options: {
              padding: 10, // Adjust padding if needed
            },
          },
        }}
      />
    </div>
  );
};

export default DatePickerComponent;
