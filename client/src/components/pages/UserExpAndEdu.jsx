import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GradeIcon from "@mui/icons-material/Grade";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";

const EducationExperienceSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { portfolioLoading, portfolio } = useSelector(
    (state) => state.userPortfolio
  );

  // Get user experience and education data from redux
  const userExpEdu = useSelector((state) => state.userPortfolio.userExpEdu);

  // Education state
  const [educations, setEducations] = useState([]);

  // Experience state
  const [experiences, setExperiences] = useState([]);

  // Load data from reducer when component mounts or when userExpEdu changes
  useEffect(() => {
    if (userExpEdu && userExpEdu.education && userExpEdu.education.length > 0) {
      const formattedEducations = userExpEdu.education.map((edu) => ({
        id: edu.educationId || Date.now() + Math.random(),
        degree: edu.degree || "",
        school: edu.school || "",
        startDate: edu.startDate ? formatDateForInput(edu.startDate) : "",
        endDate: edu.endDate ? formatDateForInput(edu.endDate) : "",
        result: edu.result || "",
        comments: edu.comments || "",
      }));
      setEducations(formattedEducations);
    }

    if (
      userExpEdu &&
      userExpEdu.experience &&
      userExpEdu.experience.length > 0
    ) {
      const formattedExperiences = userExpEdu.experience.map((exp) => ({
        id: exp.experienceId || Date.now() + Math.random(),
        title: exp.title || "",
        company: exp.company || "",
        startDate: exp.startDate ? formatDateForInput(exp.startDate) : "",
        endDate: exp.endDate ? formatDateForInput(exp.endDate) : "",
        description: Array.isArray(exp.description)
          ? exp.description.join("\n")
          : exp.description || "",
        isPresent: exp.isPresent || false,
        certificate: exp.certificate || "",
      }));
      setExperiences(formattedExperiences);
    }
  }, [userExpEdu]);

  // Format ISO date string to YYYY-MM-DD for input fields
  const formatDateForInput = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  // Add a new education entry
  const addEducation = () => {
    if (educations.length < 4) {
      const newEducation = {
        id: Date.now() + Math.random(),
        degree: "",
        school: "",
        startDate: "",
        endDate: "",
        result: "",
        comments: "",
      };
      setEducations([...educations, newEducation]);
    } else {
      alert("Maximum of 4 education entries allowed.");
    }
  };

  // Add a new experience entry
  const addExperience = () => {
    if (experiences.length < 4) {
      const newExperience = {
        id: Date.now() + Math.random(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        isPresent: false,
        certificate: "",
      };
      setExperiences([...experiences, newExperience]);
    } else {
      alert("Maximum of 4 experience entries allowed.");
    }
  };

  // Remove an education entry
  const removeEducation = (id) => {
    setEducations(educations.filter((education) => education.id !== id));
  };

  // Remove an experience entry
  const removeExperience = (id) => {
    setExperiences(experiences.filter((experience) => experience.id !== id));
  };

  // Handle education field changes
  const handleEducationChange = (id, field, value) => {
    setEducations(
      educations.map((education) =>
        education.id === id ? { ...education, [field]: value } : education
      )
    );
  };

  // Handle experience field changes
  const handleExperienceChange = (id, field, value) => {
    setExperiences(
      experiences.map((experience) =>
        experience.id === id ? { ...experience, [field]: value } : experience
      )
    );
  };

  // Handle radio button change for isPresent
  const handlePresentChange = (id, event) => {
    const isPresentValue = event.target.value === "yes";

    setExperiences(
      experiences.map((experience) => {
        if (experience.id === id) {
          return {
            ...experience,
            isPresent: isPresentValue,
            // Clear endDate if now present
            endDate: isPresentValue ? "" : experience.endDate,
          };
        }
        return experience;
      })
    );
  };

  // Save all data
  const saveData = () => {
    // // Format the data to match the backend structure
    // const formattedEducation = educations.map((edu) => ({
    //   educationId: edu.id,
    //   degree: edu.degree,
    //   school: edu.school,
    //   startDate: edu.startDate,
    //   endDate: edu.endDate,
    //   result: edu.result,
    //   comments: edu.comments,
    // }));

    // const formattedExperience = experiences.map((exp) => ({
    //   experienceId: exp.id,
    //   title: exp.title,
    //   company: exp.company,
    //   startDate: exp.startDate,
    //   endDate: exp.isPresent ? null : exp.endDate,
    //   isPresent: exp.isPresent,
    //   description: exp.description.split("\n"), // Convert to array of lines
    //   certificate: exp.certificate,
    // }));

    // console.log("Saving education data:", formattedEducation);
    // console.log("Saving experience data:", formattedExperience);
    // alert("Education and Experience details saved successfully!");
    dispatch({ type: INCREMENT_PAGE_COUNT });

    // Here you would dispatch an action to save data to Redux
    // dispatch({ type: "SAVE_EDUCATION_EXPERIENCE", payload: { education: formattedEducation, experience: formattedExperience } });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={isMobile ? 6 : 4}>
        {/* Education Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              gutterBottom
              align={isMobile ? "center" : "left"}
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <SchoolIcon sx={{ mr: 1, fontSize: "inherit" }} />
              Education
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={addEducation}
              disabled={educations.length >= 4}
              fullWidth={isMobile}
              size={isMobile ? "medium" : "large"}
              sx={{
                mb: 4,
                mt: 2,
                py: 1.2,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              Add Education {educations.length < 4 ? "" : "(Maximum Reached)"}
            </Button>
          </Box>

          {educations.length === 0 && (
            <Box
              sx={{
                p: 5,
                textAlign: "center",
                border: "1px dashed grey",
                borderRadius: 2,
                mb: 4,
              }}
            >
              <Typography variant="body1" color="textSecondary">
                No education entries added yet. Click the button above to add
                your first education details.
              </Typography>
            </Box>
          )}

          {educations.map((education, index) => (
            <Card
              key={education.id}
              elevation={3}
              sx={{
                borderRadius: 2,
                mb: 3,
                overflow: "visible",
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" component="div" fontWeight="bold">
                    Education #{index + 1}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => removeEducation(education.id)}
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {!isMobile && (
                    <SchoolIcon sx={{ mr: 1, color: "text.secondary" }} />
                  )}
                  <TextField
                    fullWidth
                    label="Degree / Education"
                    placeholder="Bachelor of Science in Computer Science"
                    variant="outlined"
                    value={education.degree}
                    onChange={(e) =>
                      handleEducationChange(
                        education.id,
                        "degree",
                        e.target.value
                      )
                    }
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {!isMobile && (
                    <BusinessIcon sx={{ mr: 1, color: "text.secondary" }} />
                  )}
                  <TextField
                    fullWidth
                    label="School / University"
                    placeholder="University of California"
                    variant="outlined"
                    value={education.school}
                    onChange={(e) =>
                      handleEducationChange(
                        education.id,
                        "school",
                        e.target.value
                      )
                    }
                  />
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {!isMobile && (
                        <CalendarTodayIcon
                          sx={{ mr: 0.5, fontSize: "small" }}
                        />
                      )}{" "}
                      Start Date
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      value={education.startDate}
                      onChange={(e) =>
                        handleEducationChange(
                          education.id,
                          "startDate",
                          e.target.value
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {!isMobile && (
                        <CalendarTodayIcon
                          sx={{ mr: 0.5, fontSize: "small" }}
                        />
                      )}{" "}
                      End Date
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      value={education.endDate}
                      onChange={(e) =>
                        handleEducationChange(
                          education.id,
                          "endDate",
                          e.target.value
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {!isMobile && (
                    <GradeIcon sx={{ mr: 1, color: "text.secondary" }} />
                  )}
                  <TextField
                    fullWidth
                    label="Result (CGPA/Percentage)"
                    placeholder="3.8 GPA / 85%"
                    variant="outlined"
                    value={education.result}
                    onChange={(e) =>
                      handleEducationChange(
                        education.id,
                        "result",
                        e.target.value
                      )
                    }
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  {!isMobile && (
                    <EmojiEventsIcon
                      sx={{ mr: 1, mt: 2, color: "text.secondary" }}
                    />
                  )}
                  <TextField
                    fullWidth
                    label="Achievements / Additional Information"
                    placeholder="Dean's List, Scholarships, Academic achievements..."
                    variant="outlined"
                    multiline
                    rows={3}
                    value={education.comments}
                    onChange={(e) =>
                      handleEducationChange(
                        education.id,
                        "comments",
                        e.target.value
                      )
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Experience Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              gutterBottom
              align={isMobile ? "center" : "left"}
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <WorkIcon sx={{ mr: 1, fontSize: "inherit" }} />
              Experience
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={addExperience}
              disabled={experiences.length >= 4}
              fullWidth={isMobile}
              size={isMobile ? "medium" : "large"}
              sx={{
                mb: 4,
                mt: 2,
                py: 1.2,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              Add Experience {experiences.length < 4 ? "" : "(Maximum Reached)"}
            </Button>
          </Box>

          {experiences.length === 0 && (
            <Box
              sx={{
                p: 5,
                textAlign: "center",
                border: "1px dashed grey",
                borderRadius: 2,
                mb: 4,
              }}
            >
              <Typography variant="body1" color="textSecondary">
                No experience entries added yet. Click the button above to add
                your first work experience.
              </Typography>
            </Box>
          )}

          {experiences.map((experience, index) => (
            <Card
              key={experience.id}
              elevation={3}
              sx={{
                borderRadius: 2,
                mb: 3,
                overflow: "visible",
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" component="div" fontWeight="bold">
                    Experience #{index + 1}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => removeExperience(experience.id)}
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {!isMobile && (
                    <WorkIcon sx={{ mr: 1, color: "text.secondary" }} />
                  )}
                  <TextField
                    fullWidth
                    label="Job Title"
                    placeholder="Software Engineer"
                    variant="outlined"
                    value={experience.title}
                    onChange={(e) =>
                      handleExperienceChange(
                        experience.id,
                        "title",
                        e.target.value
                      )
                    }
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {!isMobile && (
                    <BusinessIcon sx={{ mr: 1, color: "text.secondary" }} />
                  )}
                  <TextField
                    fullWidth
                    label="Company Name"
                    placeholder="Google Inc."
                    variant="outlined"
                    value={experience.company}
                    onChange={(e) =>
                      handleExperienceChange(
                        experience.id,
                        "company",
                        e.target.value
                      )
                    }
                  />
                </Box>

                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <FormLabel component="legend">
                    Currently Working Here?
                  </FormLabel>
                  <RadioGroup
                    row
                    value={experience.isPresent ? "yes" : "no"}
                    onChange={(e) => handlePresentChange(experience.id, e)}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {!isMobile && (
                        <CalendarTodayIcon
                          sx={{ mr: 0.5, fontSize: "small" }}
                        />
                      )}{" "}
                      Start Date
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      value={experience.startDate}
                      onChange={(e) =>
                        handleExperienceChange(
                          experience.id,
                          "startDate",
                          e.target.value
                        )
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {!isMobile && (
                        <CalendarTodayIcon
                          sx={{ mr: 0.5, fontSize: "small" }}
                        />
                      )}{" "}
                      End Date
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      value={experience.endDate}
                      onChange={(e) =>
                        handleExperienceChange(
                          experience.id,
                          "endDate",
                          e.target.value
                        )
                      }
                      disabled={experience.isPresent}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText={
                        experience.isPresent
                          ? "Not applicable for current job"
                          : ""
                      }
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  {!isMobile && (
                    <DescriptionIcon
                      sx={{ mr: 1, mt: 2, color: "text.secondary" }}
                    />
                  )}
                  <TextField
                    fullWidth
                    label="Job Description"
                    placeholder="Describe your roles, responsibilities, and achievements..."
                    variant="outlined"
                    multiline
                    rows={3}
                    value={experience.description}
                    onChange={(e) =>
                      handleExperienceChange(
                        experience.id,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {!isMobile && (
                    <LinkIcon sx={{ mr: 1, color: "text.secondary" }} />
                  )}
                  <TextField
                    fullWidth
                    label="Certificate Link / Supporting Document"
                    placeholder="https://example.com/certificate"
                    variant="outlined"
                    value={experience.certificate}
                    onChange={(e) =>
                      handleExperienceChange(
                        experience.id,
                        "certificate",
                        e.target.value
                      )
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
        <Button
          variant="contained"
          size="large"
          color="success"
          startIcon={<SaveIcon />}
          onClick={saveData}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            fontSize: "1.1rem",
            boxShadow: 3,
          }}
        >
          Save and Continue
        </Button>
      </Box>
    </Container>
  );
};

export default EducationExperienceSection;
