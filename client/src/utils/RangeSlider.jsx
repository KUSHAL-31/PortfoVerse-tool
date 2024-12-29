import { Box, Slider } from "@mui/material";
import React from "react";

const RangeSlider = ({ selectedValue, onChange }) => {
  return (
    <Box width="100%" m={3}>
      <Slider
        defaultValue={selectedValue}
        min={0}
        max={100}
        step={10}
        marks={[
          { value: 0, label: "0" },
          { value: 100, label: "100" },
        ]}
        valueLabelDisplay="auto"
        aria-label="Marks"
        onChange={(event, newValue) => onChange(newValue)}
      />
    </Box>
  );
};

export default RangeSlider;
