import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import {
  Person,
  Psychology,
  Newspaper,
  RateReview,
  Language,
} from "@mui/icons-material";
import React from "react";
import "./CreatePortfolioSteps.scss";

const CreatePortfolioSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Basic details</Typography>,
      icon: <Person />,
    },
    {
      label: <Typography>Skills</Typography>,
      icon: <Psychology />,
    },
    {
      label: <Typography>Projects</Typography>,
      icon: <Newspaper />,
    },
    {
      label: <Typography>Testimonials</Typography>,
      icon: <RateReview />,
    },
    {
      label: <Typography>Website details</Typography>,
      icon: <Language />,
    },
  ];

  const stepStyle = {
    boxSizing: "border-box",
    width: "100%",
    marginTop: "80px",
  };

  return (
    <div className="checkOutSteps">
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((step, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              icon={step.icon}
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CreatePortfolioSteps;
