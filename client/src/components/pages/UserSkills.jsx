import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryIcon from "@mui/icons-material/Category";
import SaveIcon from "@mui/icons-material/Save";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";

const UserSkills = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const { portfolioLoading, portfolio, portfolioExpAndEdu } = useSelector(
    (state) => state.userPortfolio
  );

  const [skillSections, setSkillSections] = useState([
    {
      id: Date.now(),
      title: "Professional Skills",
      skills: [],
    },
  ]);

  // Add a new skill section
  const addSkillSection = () => {
    if (skillSections.length < 4) {
      setSkillSections([
        ...skillSections,
        {
          id: Date.now() + Math.random(),
          title: "New Skill Section",
          skills: [],
        },
      ]);
    } else {
      alert("You can add a maximum of 4 skill sections");
    }
  };

  // Remove a skill section
  const removeSkillSection = (sectionId) => {
    setSkillSections(
      skillSections.filter((section) => section.id !== sectionId)
    );
  };

  // Update section title
  const updateSectionTitle = (sectionId, newTitle) => {
    setSkillSections(
      skillSections.map((section) =>
        section.id === sectionId ? { ...section, title: newTitle } : section
      )
    );
  };

  // Add a new skill to a section
  const addSkill = (sectionId) => {
    setSkillSections(
      skillSections.map((section) => {
        if (section.id === sectionId) {
          if (section.skills.length < 12) {
            return {
              ...section,
              skills: [
                ...section.skills,
                {
                  id: Date.now() + Math.random(),
                  name: "",
                  rating: 75,
                },
              ],
            };
          } else {
            alert("You can add a maximum of 12 skills per section");
            return section;
          }
        }
        return section;
      })
    );
  };

  // Remove a skill from a section
  const removeSkill = (sectionId, skillId) => {
    setSkillSections(
      skillSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              skills: section.skills.filter((skill) => skill.id !== skillId),
            }
          : section
      )
    );
  };

  // Handle skill name change
  const handleNameChange = (sectionId, skillId, value) => {
    setSkillSections(
      skillSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              skills: section.skills.map((skill) =>
                skill.id === skillId ? { ...skill, name: value } : skill
              ),
            }
          : section
      )
    );
  };

  // Handle skill rating change
  const handleRatingChange = (sectionId, skillId, value) => {
    setSkillSections(
      skillSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              skills: section.skills.map((skill) =>
                skill.id === skillId ? { ...skill, rating: value } : skill
              ),
            }
          : section
      )
    );
  };

  // Save all skills data
  const saveSkills = () => {
    // Here you would typically dispatch an action to save to Redux or API
    // console.log("Saving skills data:", skillSections);
    // // Example dispatch (uncomment and modify as needed):
    // // dispatch(saveUserSkills(skillSections));
    // alert("Skills saved successfully!");
    dispatch({ type: INCREMENT_PAGE_COUNT });
  };


  // Custom mark labels for the slider
  const marks = [
    { value: 0, label: "Beginner" },
    { value: 25, label: "Basic" },
    { value: 50, label: "Intermediate" },
    { value: 75, label: "Advanced" },
    { value: 100, label: "Expert" },
  ];

  // For small screens, show fewer marks
  const mobileMarks = [
    { value: 0, label: "Beg" },
    { value: 50, label: "Int" },
    { value: 100, label: "Exp" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Skills Profile
        </Typography>

        <Button
          variant="contained"
          startIcon={<CategoryIcon />}
          onClick={addSkillSection}
          disabled={skillSections.length >= 4}
          fullWidth={isMobile}
          size={isMobile ? "medium" : "large"}
          sx={{
            mb: 4,
            py: 1.2,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          Add New Skill Category{" "}
          {skillSections.length < 4 ? "" : "(Maximum Reached)"}
        </Button>
      </Box>

      {skillSections.map((section, sectionIndex) => (
        <Card
          key={section.id}
          elevation={3}
          sx={{
            mb: 4,
            borderRadius: 2,
            overflow: "visible",
            border: `1px solid ${theme.palette.divider}`,
            position: "relative",
          }}
        >
          <CardContent>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                label="Section Title"
                variant="outlined"
                value={section.title}
                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                sx={{
                  mb: 2,
                  flexGrow: 1,
                  mr: 2,
                }}
              />

              {skillSections.length > 1 && (
                <IconButton
                  color="error"
                  onClick={() => removeSkillSection(section.id)}
                  sx={{ mb: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>

            <Button
              variant="outlined"
              startIcon={<AddCircleIcon />}
              onClick={() => addSkill(section.id)}
              fullWidth={isMobile}
              sx={{
                mb: 3,
                py: 1,
                borderRadius: 2,
              }}
            >
              Add Skill to {section.title}
            </Button>

            {section.skills.length === 0 && (
              <Box
                sx={{
                  p: 3,
                  textAlign: "center",
                  border: "1px dashed grey",
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <Typography variant="body1" color="textSecondary">
                  No skills added to this section yet. Click the button above to
                  add skills.
                </Typography>
              </Box>
            )}

            <Grid container spacing={3}>
              {section.skills.map((skill) => (
                <Grid item xs={12} sm={6} md={4} key={skill.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      p: 2,
                      height: "100%",
                      borderRadius: 2,
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: 4,
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <TextField
                        fullWidth
                        label="Skill Name"
                        variant="outlined"
                        value={skill.name}
                        onChange={(e) =>
                          handleNameChange(section.id, skill.id, e.target.value)
                        }
                        sx={{ mr: 1 }}
                      />
                      <IconButton
                        color="error"
                        onClick={() => removeSkill(section.id, skill.id)}
                        size="large"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    <Box sx={{ px: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Typography variant="body2" color="textSecondary">
                          Proficiency
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {skill.rating}%
                        </Typography>
                      </Box>

                      <Slider
                        value={skill.rating}
                        onChange={(e, value) =>
                          handleRatingChange(section.id, skill.id, value)
                        }
                        step={5}
                        min={0}
                        max={100}
                        marks={isMobile ? mobileMarks : marks}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}%`}
                        sx={{
                          color: theme.palette.secondary.main,
                          "& .MuiSlider-thumb": {
                            height: 20,
                            width: 20,
                          },
                          "& .MuiSlider-markLabel": {
                            fontSize: isMobile ? "0.65rem" : "0.75rem",
                          },
                        }}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
        <Button
          variant="contained"
          size="large"
          color="success"
          startIcon={<SaveIcon />}
          onClick={saveSkills}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            fontSize: "1.1rem",
            boxShadow: 3,
          }}
        >
          Save Skills Profile
        </Button>
      </Box>
    </Container>
  );
};

export default UserSkills;
