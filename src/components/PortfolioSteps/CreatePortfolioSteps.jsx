import React from "react";
import {
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
  styled,
} from "@mui/material";
import {
  Person,
  Psychology,
  Newspaper,
  RateReview,
  Language,
  DesignServices,
  School,
} from "@mui/icons-material";

// Custom styled components for enhanced visual appeal
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
  background: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
  position: "relative",
  overflow: "hidden",
}));

const StyledStepContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  transition: "all 0.3s ease",
}));

const StyledIconBox = styled(Box)(({ theme, active, completed }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  marginBottom: theme.spacing(1),
  transition: "all 0.3s ease",
  background: completed
    ? theme.palette.primary.main
    : active
    ? theme.palette.primary.light
    : theme.palette.grey[200],
  color: completed || active ? "#fff" : theme.palette.text.secondary,
  boxShadow: completed || active ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
  width: theme.spacing(5),
  height: theme.spacing(5),
  "& svg": {
    fontSize: theme.spacing(2.5),
  },
}));

const StyledConnector = styled(Box)(({ theme, completed }) => ({
  height: 3,
  flex: 1,
  backgroundColor: completed
    ? theme.palette.primary.main
    : theme.palette.grey[300],
  transition: "all 0.3s ease",
}));

const CreatePortfolioSteps = ({ activeStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const steps = [
    {
      label: "Basic Details",
      icon: <Person />,
    },
    {
      label: "Education & Experience",
      icon: <School />,
    },
    {
      label: "Skills",
      icon: <Psychology />,
    },
    {
      label: "Projects",
      icon: <Newspaper />,
    },
    {
      label: "Services",
      icon: <DesignServices />,
    },
    {
      label: "Testimonials",
      icon: <RateReview />,
    },
    {
      label: "Website Details",
      icon: <Language />,
    },
  ];

  // For mobile view, show only current, previous and next step
  const mobileSteps = () => {
    const result = [];

    // Always include the active step
    result.push({
      ...steps[activeStep],
      index: activeStep,
    });

    // Add previous step if it exists
    if (activeStep > 0) {
      result.unshift({
        ...steps[activeStep - 1],
        index: activeStep - 1,
      });
    }

    // Add next step if it exists
    if (activeStep < steps.length - 1) {
      result.push({
        ...steps[activeStep + 1],
        index: activeStep + 1,
      });
    }

    return result;
  };

  // For tablet view, show 5 steps max
  const tabletSteps = () => {
    const result = [];
    let startIdx = Math.max(0, activeStep - 2);
    const endIdx = Math.min(steps.length - 1, startIdx + 4);

    // Adjust start index if we're near the end
    if (endIdx === steps.length - 1 && endIdx - startIdx < 4) {
      startIdx = Math.max(0, steps.length - 5);
    }

    for (let i = startIdx; i <= endIdx; i++) {
      result.push({
        ...steps[i],
        index: i,
      });
    }

    return result;
  };

  const displaySteps = isMobile
    ? mobileSteps()
    : isTablet
    ? tabletSteps()
    : steps.map((step, index) => ({ ...step, index }));

  return (
    <StyledPaper elevation={0}>
      {isMobile ? (
        // Mobile view - custom stepper
        <Box sx={{ display: "flex", alignItems: "center", px: 1, pb: 2 }}>
          {displaySteps.map((step, idx) => (
            <React.Fragment key={step.index}>
              {idx > 0 && (
                <StyledConnector completed={activeStep >= step.index} />
              )}

              <StyledStepContainer>
                <StyledIconBox
                  active={activeStep === step.index}
                  completed={activeStep > step.index}
                >
                  {step.icon}
                </StyledIconBox>
                <Typography
                  variant="caption"
                  align="center"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: activeStep === step.index ? 600 : 400,
                    color:
                      activeStep >= step.index
                        ? "primary.main"
                        : "text.secondary",
                    maxWidth: 80,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {step.label}
                </Typography>
              </StyledStepContainer>
            </React.Fragment>
          ))}
        </Box>
      ) : (
        // Tablet and Desktop view
        <Box sx={{ px: { xs: 1, sm: 2, md: 3 }, pb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Connector line that spans across all steps */}
            <Box
              sx={{
                position: "absolute",
                left: "2.5%",
                right: "2.5%",
                top: theme.spacing(2.5),
                height: 3,
                backgroundColor: theme.palette.grey[300],
                zIndex: 0,
              }}
            />

            {/* Active connector line that grows based on active step */}
            <Box
              sx={{
                position: "absolute",
                left: "2.5%",
                width: `${Math.min(
                  100,
                  (activeStep / (steps.length - 1)) * 100
                )}%`,
                top: theme.spacing(2.5),
                height: 3,
                backgroundColor: theme.palette.primary.main,
                zIndex: 1,
                transition: "width 0.5s ease-in-out",
              }}
            />

            {/* Step circles and labels */}
            {displaySteps.map((step) => (
              <StyledStepContainer key={step.index}>
                <StyledIconBox
                  active={activeStep === step.index}
                  completed={activeStep > step.index}
                  sx={{ zIndex: 2 }}
                  onClick={() => console.log(step.index)}
                >
                  {step.icon}
                </StyledIconBox>
                <Typography
                  variant="caption"
                  align="center"
                  sx={{
                    fontWeight: activeStep === step.index ? 600 : 400,
                    color:
                      activeStep >= step.index
                        ? "primary.main"
                        : "text.secondary",
                    fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                    maxWidth: { xs: 70, sm: 90, md: "none" },
                    whiteSpace: { xs: "nowrap", sm: "normal" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: { xs: 32, sm: 40 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  {step.label}
                </Typography>
              </StyledStepContainer>
            ))}
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 1,
          px: 2,
          borderTop: `1px solid ${theme.palette.grey[100]}`,
          pt: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Step {activeStep + 1} of {steps.length}
        </Typography>
        <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
          {Math.round((activeStep / (steps.length - 1)) * 100)}% Complete
        </Typography>
      </Box>
    </StyledPaper>
  );
};

export default CreatePortfolioSteps;
