import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";

const UserSkills = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const { portfolioLoading, portfolio } = useSelector(
    (state) => state.userPortfolio
  );

  const userSkills = useSelector(
    (state) => state.userPortfolio.portfolioSkills
  );

  const [skillSections, setSkillSections] = useState([
    {
      id: Date.now(),
      title: "Professional Skills",
      skills: [],
    },
  ]);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [isNewSection, setIsNewSection] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

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

  // Open modal to add a new skill section
  const openAddSectionModal = () => {
    if (skillSections.length < 4) {
      setIsNewSection(true);
      setCurrentSection({
        id: Date.now() + Math.random(),
        title: "New Skill Section",
        skills: [],
      });
      setModalOpen(true);
    } else {
      alert("You can add a maximum of 4 skill sections");
    }
  };

  // Open modal to edit an existing skill section
  const openEditSectionModal = (sectionId) => {
    const sectionToEdit = skillSections.find(
      (section) => section.id === sectionId
    );
    if (sectionToEdit) {
      setIsNewSection(false);
      setCurrentSection({ ...sectionToEdit });
      setModalOpen(true);
    }
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentSection(null);
  };

  // Save section changes from modal
  const saveSection = () => {
    if (isNewSection) {
      // Add new section
      setSkillSections([...skillSections, currentSection]);
    } else {
      // Update existing section
      setSkillSections(
        skillSections.map((section) =>
          section.id === currentSection.id ? currentSection : section
        )
      );
    }
    closeModal();
  };

  // Remove a skill section
  const removeSkillSection = (sectionId) => {
    setSkillSections(
      skillSections.filter((section) => section.id !== sectionId)
    );
  };

  // Update section title in modal
  const updateModalSectionTitle = (newTitle) => {
    setCurrentSection({
      ...currentSection,
      title: newTitle,
    });
  };

  // Add a new skill in modal
  const addSkillInModal = () => {
    if (currentSection.skills.length < 12) {
      setCurrentSection({
        ...currentSection,
        skills: [
          ...currentSection.skills,
          {
            id: Date.now() + Math.random(),
            name: "",
            rating: 75,
          },
        ],
      });
    } else {
      alert("You can add a maximum of 12 skills per section");
    }
  };

  // Remove a skill in modal
  const removeSkillInModal = (skillId) => {
    setCurrentSection({
      ...currentSection,
      skills: currentSection.skills.filter((skill) => skill.id !== skillId),
    });
  };

  // Handle skill name change in modal
  const handleNameChangeInModal = (skillId, value) => {
    setCurrentSection({
      ...currentSection,
      skills: currentSection.skills.map((skill) =>
        skill.id === skillId ? { ...skill, name: value } : skill
      ),
    });
  };

  // Handle skill rating change in modal
  const handleRatingChangeInModal = (skillId, value) => {
    setCurrentSection({
      ...currentSection,
      skills: currentSection.skills.map((skill) =>
        skill.id === skillId ? { ...skill, rating: value } : skill
      ),
    });
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

  useEffect(() => {
    if (
      userSkills &&
      userSkills.skillSection &&
      userSkills.skillSection.length > 0
    ) {
      // Transform backend data to component state format
      const formattedSections = userSkills.skillSection.map((section) => ({
        id: section.skillId,
        title: section.heading,
        skills: section.list.map((skill) => ({
          id: skill._id,
          name: skill.name,
          rating: skill.rating,
        })),
      }));

      setSkillSections(formattedSections);
    } else if (skillSections.length === 0) {
      // If no data and no sections, initialize with one empty section
      setSkillSections([
        {
          id: Date.now(),
          title: "Professional Skills",
          skills: [],
        },
      ]);
    }
  }, [portfolio, userSkills]);

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
          onClick={openAddSectionModal}
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

      <Grid container spacing={3}>
        {skillSections.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={section.id}>
            <Card
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
                    Skill Category #{index + 1}
                  </Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => openEditSectionModal(section.id)}
                      size="medium"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => removeSkillSection(section.id)}
                      size="medium"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="h6" component="div" gutterBottom>
                  {section.title || "Untitled Section"}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  {section.skills.length} skills in this category
                </Typography>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => openEditSectionModal(section.id)}
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Edit Skills
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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

      {/* Edit/Add Modal */}
      {/* Edit/Add Modal */}
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 2 },
            width: { xs: "100%", sm: "90%", md: "80%" },
            maxHeight: { xs: "100%", sm: "90vh" },
            margin: { xs: 0, sm: 2 },
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                fontWeight: 600,
              }}
            >
              {isNewSection
                ? "Add New Skill Category"
                : `Edit: ${currentSection?.title}`}
            </Typography>
            <IconButton
              onClick={closeModal}
              edge="end"
              sx={{
                color: "grey.500",
                "&:hover": { color: "error.main" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            p: { xs: 2, sm: 3 },
            overflowY: "auto",
          }}
        >
          {currentSection && (
            <>
              <TextField
                label="Section Title"
                variant="outlined"
                fullWidth
                value={currentSection.title}
                onChange={(e) => updateModalSectionTitle(e.target.value)}
                sx={{
                  mb: 3,
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  },
                }}
              />

              <Button
                variant="outlined"
                startIcon={<AddCircleIcon />}
                onClick={addSkillInModal}
                fullWidth
                sx={{
                  mb: 3,
                  py: { xs: 0.8, sm: 1 },
                  borderRadius: 2,
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                }}
              >
                Add Skill to this Category
              </Button>

              {currentSection.skills.length === 0 && (
                <Box
                  sx={{
                    p: { xs: 2, sm: 3 },
                    textAlign: "center",
                    border: "1px dashed grey",
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                  >
                    No skills added to this section yet. Click the button above
                    to add skills.
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 2 }}>
                {currentSection.skills.map((skill, index) => (
                  <Card
                    key={skill.id}
                    variant="outlined"
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 2,
                      mb: 2,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "stretch", sm: "center" },
                        mb: { xs: 1.5, sm: 2 },
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Skill Name"
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={skill.name}
                        onChange={(e) =>
                          handleNameChangeInModal(skill.id, e.target.value)
                        }
                        sx={{
                          flexGrow: 1,
                          mb: { xs: 1, sm: 0 },
                          mr: { xs: 0, sm: 1 },
                        }}
                      />
                      <IconButton
                        color="error"
                        onClick={() => removeSkillInModal(skill.id)}
                        sx={{
                          alignSelf: { xs: "flex-end", sm: "center" },
                          ml: { xs: 0, sm: 1 },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>

                    <Box sx={{ px: { xs: 0.5, sm: 1 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                        >
                          Proficiency
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                        >
                          {skill.rating}%
                        </Typography>
                      </Box>

                      <Slider
                        value={skill.rating}
                        onChange={(e, value) =>
                          handleRatingChangeInModal(skill.id, value)
                        }
                        step={5}
                        min={0}
                        max={100}
                        marks={isMobile ? mobileMarks : marks}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}%`}
                        sx={{
                          color: theme.palette.secondary.main,
                          height: { xs: 4, sm: 8 },
                          "& .MuiSlider-thumb": {
                            height: { xs: 16, sm: 20 },
                            width: { xs: 16, sm: 20 },
                          },
                          "& .MuiSlider-markLabel": {
                            fontSize: { xs: "0.6rem", sm: "0.75rem" },
                            transform: "translateX(-50%)",
                            whiteSpace: "nowrap",
                          },
                          "& .MuiSlider-rail": {
                            height: { xs: 4, sm: 8 },
                          },
                          "& .MuiSlider-track": {
                            height: { xs: 4, sm: 8 },
                          },
                        }}
                      />
                    </Box>
                  </Card>
                ))}
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: { xs: 1.5, sm: 2, md: 3 },
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "stretch",
          }}
        >
          <Button
            onClick={closeModal}
            variant="outlined"
            fullWidth={isMobile}
            sx={{
              mb: { xs: 1, sm: 0 },
              mr: { xs: 0, sm: 2 },
              py: { xs: 0.8, sm: 1 },
              order: { xs: 2, sm: 1 },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={saveSection}
            variant="contained"
            color="primary"
            fullWidth={isMobile}
            startIcon={<SaveIcon />}
            sx={{
              order: { xs: 1, sm: 2 },
              mb: { xs: 1, sm: 0 },
              py: { xs: 0.8, sm: 1 },
              fontWeight: "bold",
            }}
          >
            {isNewSection ? "Add Section" : "Update Section"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserSkills;
