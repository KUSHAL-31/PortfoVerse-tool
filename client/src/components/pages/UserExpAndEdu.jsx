import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
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
    <>
      <div className="edu_and_exp_section">
        <div className="education_section">
          <h1>Experience details</h1>
          {educations.map((education, index) => (
            <Card
              key={education.id}
              variant="outlined"
              style={{ marginBottom: "20px", width: "100%" }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  #{index + 1}
                </Typography>
                {/* <Typography variant="subtitle1">Degree / Course</Typography> */}
                <TextField
                  fullWidth
                  label="Enter your degree / course name"
                  variant="outlined"
                  value={education.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                />
                {/* <Typography variant="subtitle1">School / University</Typography> */}
                <TextField
                  fullWidth
                  label="Enter your school / university name"
                  variant="outlined"
                  value={education.school}
                  onChange={(e) =>
                    handleEducationChange(index, "school", e.target.value)
                  }
                  style={{ marginBottom: "10px" }}
                />
                <div className="education_dates_container">
                  <div>
                    <Typography variant="subtitle1">Start Date</Typography>
                    <DatePickerComponent
                      selectedDate={education.startDate}
                      setSelectedDate={(date) =>
                        handleEducationChange(index, "startDate", date)
                      }
                    />
                  </div>
                  <div>
                    <Typography variant="subtitle1">End Date</Typography>
                    <DatePickerComponent
                      selectedDate={education.endDate}
                      setSelectedDate={(date) =>
                        handleEducationChange(index, "endDate", date)
                      }
                    />
                  </div>
                </div>

                {/* <Typography variant="subtitle1">Result</Typography> */}
                <TextField
                  fullWidth
                  label="Enter your result"
                  variant="outlined"
                  value={education.result}
                  onChange={(e) =>
                    handleEducationChange(index, "result", e.target.value)
                  }
                  inputProps={{
                    inputMode: "decimal",
                    pattern: "[0-9]*[.]?[0-9]*",
                  }}
                  style={{ marginBottom: "10px", marginTop: "20px" }}
                />
                {/* <Typography variant="subtitle1">
                  Any achievements or comments
                </Typography> */}
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
          ))}
          <Button variant="outlined" onClick={addEducation}>
            Add Education
          </Button>
        </div>
        <div className="experience_section">
          <h1>Experience details</h1>
          {experiences.map((experience, index) => (
            <>
              <Card
                key={experience.id}
                variant="outlined"
                style={{ marginBottom: "20px", width: "100%" }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    #{index + 1}
                  </Typography>
                  <TextField
                    fullWidth
                    label="Enter your job title"
                    variant="outlined"
                    value={experience.title}
                    onChange={(e) =>
                      handleExperienceChange(index, "title", e.target.value)
                    }
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    fullWidth
                    label="Enter your company name"
                    variant="outlined"
                    value={experience.company}
                    onChange={(e) =>
                      handleExperienceChange(index, "company", e.target.value)
                    }
                    style={{ marginBottom: "10px" }}
                  />

                  <Typography variant="subtitle1">Present</Typography>
                  <RadioGroup
                    row
                    value={experience.isPresent ? "yes" : "no"}
                    onChange={(e) => handleRadioChange(index, e)}
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

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "48%" }}>
                      <Typography variant="subtitle1">Start Date</Typography>
                      <DatePickerComponent
                        selectedDate={experience.startDate}
                        setSelectedDate={(date) =>
                          handleExperienceChange(index, "startDate", date)
                        }
                      />
                    </div>

                    <div style={{ width: "48%" }}>
                      <div>
                        <Typography variant="subtitle1">End Date</Typography>
                        <DatePickerComponent
                          isDisabled={experience.isPresent}
                          selectedDate={experience.endDate}
                          setSelectedDate={(date) =>
                            handleExperienceChange(index, "endDate", date)
                          }
                        />
                      </div>
                    </div>
                  </div>

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
                  <TextField
                    fullWidth
                    label="Enter your certificate link"
                    variant="outlined"
                    value={experience.certificate}
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        "certificateLink",
                        e.target.value
                      )
                    }
                  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeExperience(experience.id)}
                  >
                    Remove Job
                  </Button>
                </CardActions>
              </Card>
            </>
          ))}
          <Button variant="outlined" onClick={addExperience}>
            Add Experience
          </Button>
        </div>
      </div>
      <div className="section_save_button">
        <Button1
          text={"Save and proceed"}
          onClick={() => dispatch({ type: INCREMENT_PAGE_COUNT })}
        />
      </div>
    </>
  );
};

export default UserExpAndEdu;
