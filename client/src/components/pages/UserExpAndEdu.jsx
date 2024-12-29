import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePickerComponent from "../../utils/DatePicker";
import "./styles/UserExpAndEdu.scss";
import { Button1 } from "../../design/buttons/Buttons";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";

const UserExpAndEdu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { portfolioLoading, portfolio, portfolioExpAndEdu } = useSelector(
    (state) => state.userPortfolio
  );
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const addEducation = () => {
    if (educations.length < 4) {
      setEducations([
        ...educations,
        {
          id: Date.now() + Math.random(),
          degree: "",
          school: "",
          startDate: null,
          endDate: null,
          result: "",
          comments: "",
        },
      ]);
    } else {
      alert("Maximum of 4 education entries allowed.");
    }
  };

  const addExperience = () => {
    if (experiences.length < 4) {
      setExperiences([
        ...experiences,
        {
          id: Date.now() + Math.random(),
          title: "",
          company: "",
          startDate: null,
          endDate: null,
          description: "",
          isPresent: true,
          certificate: "",
        },
      ]);
    } else {
      alert("Maximum of 4 experience entries allowed.");
    }
  };

  const removeEducation = (id) => {
    setEducations(educations.filter((education) => education.id !== id));
  };

  const removeExperience = (id) => {
    setExperiences(experiences.filter((experience) => experience.id !== id));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const handleRadioChange = (index, event) => {
    const isPresentValue = event.target.value === "yes";
    console.log(isPresentValue);
    handleExperienceChange(index, "isPresent", isPresentValue); // Update the isPresent value
    if (isPresentValue) {
      handleExperienceChange(index, "endDate", null); // Reset endDate if "Present" is selected
    }
  };

  useEffect(() => {
    if (portfolioLoading === false && portfolioExpAndEdu) {
      const education = portfolioExpAndEdu.education;
      const newEducations = education.map((edu) => ({
        id: Date.now() + Math.random(),
        degree: edu.degree,
        school: edu.school,
        startDate: new Date(edu.startDate),
        endDate: new Date(edu.endDate),
        result: edu.result,
        comments: edu.comments,
      }));
      setEducations(newEducations);
    }
    if (portfolioLoading === false && portfolioExpAndEdu) {
      const experience = portfolioExpAndEdu.experience;
      const newExperiences = experience.map((exp) => ({
        id: Date.now() + Math.random(),
        title: exp.title,
        company: exp.company,
        startDate: new Date(exp.startDate),
        endDate: exp.isPresent ? null : new Date(exp.endDate),
        description: exp.description,
        isPresent: exp.isPresent,
        certificate: exp.certificate,
      }));
      setExperiences(newExperiences);
    }
  }, [portfolioLoading, portfolioExpAndEdu]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Education & Experience Details
      </Typography>

      {/* Education Section */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Education Details
        </Typography>
        <Grid container spacing={5}>
          {educations.map((education, index) => (
            <Grid item xs={12} md={6} key={education.id}>
              <Card sx={{ borderLeft: "5px solid #4caf50" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Education #{index + 1}
                  </Typography>
                  <TextField
                    label="Degree / Course"
                    fullWidth
                    margin="dense"
                    value={education.degree}
                    onChange={(e) =>
                      handleEducationChange(index, "degree", e.target.value)
                    }
                  />
                  <TextField
                    label="School / University"
                    fullWidth
                    margin="dense"
                    value={education.school}
                    onChange={(e) =>
                      handleEducationChange(index, "school", e.target.value)
                    }
                  />
                  <Box display="flex" gap={2}>
                    <DatePickerComponent
                      selectedDate={education.startDate}
                      setSelectedDate={(date) =>
                        handleEducationChange(index, "startDate", date)
                      }
                      label="Start Date"
                    />
                    <DatePickerComponent
                      selectedDate={education.endDate}
                      setSelectedDate={(date) =>
                        handleEducationChange(index, "endDate", date)
                      }
                      label="End Date"
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Achievements or comments"
                    multiline
                    rows={4}
                    value={education.comments}
                    onChange={(e) =>
                      handleEducationChange(index, "comments", e.target.value)
                    }
                    style={{ marginBottom: "10px" }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeEducation(education.id)}
                  >
                    Remove Education
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button onClick={addEducation} variant="contained" sx={{ mt: 2 }}>
          Add Education
        </Button>
      </Box>

      {/* Experience Section */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Experience Details
        </Typography>
        <Grid container spacing={2}>
          {experiences.map((experience, index) => (
            <Grid item xs={12} md={6} key={experience.id}>
              <Card sx={{ borderLeft: "5px solid #FF9800" }}>
                <CardContent>
                  <Typography variant="h6">Experience #{index + 1}</Typography>
                  <TextField
                    label="Job Title"
                    fullWidth
                    margin="dense"
                    value={experience.title}
                    onChange={(e) =>
                      handleExperienceChange(index, "title", e.target.value)
                    }
                  />
                  <TextField
                    label="Company"
                    fullWidth
                    margin="dense"
                    value={experience.company}
                    onChange={(e) =>
                      handleExperienceChange(index, "company", e.target.value)
                    }
                  />
                  <RadioGroup
                    row
                    value={experience.isPresent ? "yes" : "no"}
                    onChange={(e) => handleRadioChange(index, e)}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Present"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="Not Present"
                    />
                  </RadioGroup>
                  <Box display="flex" gap={2}>
                    <DatePickerComponent
                      selectedDate={experience.startDate}
                      setSelectedDate={(date) =>
                        handleExperienceChange(index, "startDate", date)
                      }
                      label="Start Date"
                    />
                    {!experience.isPresent && (
                      <DatePickerComponent
                        selectedDate={experience.endDate}
                        setSelectedDate={(date) =>
                          handleExperienceChange(index, "endDate", date)
                        }
                        label="End Date"
                      />
                    )}
                  </Box>
                  <TextField
                    fullWidth
                    label="Enter your job description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={experience.description}
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    style={{ margin: "20px 0" }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeExperience(experience.id)}
                  >
                    Remove Experience
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button onClick={addExperience} variant="contained" sx={{ mt: 2 }}>
          Add Experience
        </Button>
      </Box>

      <Box mt={4} textAlign="center">
        <Button1
          text="Save and Proceed"
          onClick={() => dispatch({ type: INCREMENT_PAGE_COUNT })}
        />
      </Box>
    </Box>
  );
};

export default UserExpAndEdu;
