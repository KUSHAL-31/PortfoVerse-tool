import { Box, Slider, Typography } from "@mui/material";
import React from "react";

const RangeSlider = ({ selectedValue, onChange }) => {
  return (
    <Box width={300} m={3}>
      <Slider
        defaultValue={selectedValue}
        min={0}
        max={100}
        step={10}
        marks
        valueLabelDisplay="auto"
        aria-label="Marks"
        onChange={() => onChange()}
      />
    </Box>
  );
};

export default RangeSlider;
