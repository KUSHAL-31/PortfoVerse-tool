import React, { useState, useEffect, useCallback, memo } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  Divider,
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
import EditIcon from "@mui/icons-material/Edit";
import { ADD_NEW_EDUCATION, EDIT_EDUCATION, INCREMENT_PAGE_COUNT } from "../../redux/constants";
import { getPortfolioEducationDetails, getPortfolioExperienceDetails, saveEducationDetails } from "../../redux/actions/portfolioActions";

// Education Modal Component
const EducationModal = memo(({
  open,
  handleClose,
  education,
  handleEducationChange,
  saveEducation,
  isEdit,
}) => {
  // Local state to keep track of form values
  const [formData, setFormData] = useState({ ...education });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Update form data when education prop changes
  useEffect(() => {
    setFormData({ ...education });
  }, [education]);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    handleEducationChange(formData.id, "degree", formData.degree);
    handleEducationChange(formData.id, "school", formData.school);
    handleEducationChange(formData.id, "startDate", formData.startDate);
    handleEducationChange(formData.id, "endDate", formData.endDate);
    handleEducationChange(formData.id, "result", formData.result);
    handleEducationChange(formData.id, "comments", formData.comments);
    saveEducation();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          p: 2,
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          {isEdit ? "Edit Education" : "Add New Education"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            {!isMobile && (
              <SchoolIcon sx={{ mr: 1, color: "text.secondary" }} />
            )}
            <TextField
              fullWidth
              label="Degree / Education"
              placeholder="Bachelor of Science in Computer Science"
              variant="outlined"
              value={formData.degree}
              onChange={(e) => handleFieldChange("degree", e.target.value)}
              required
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            {!isMobile && (
              <BusinessIcon sx={{ mr: 1, color: "text.secondary" }} />
            )}
            <TextField
              fullWidth
              label="School / University"
              placeholder="University of California"
              variant="outlined"
              value={formData.school}
              onChange={(e) => handleFieldChange("school", e.target.value)}
              required
            />
          </Box>

          <Grid container spacing={2} sx={{ mb: 3 }}>
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
                value={formData.startDate}
                onChange={(e) => handleFieldChange("startDate", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
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
                value={formData.endDate}
                onChange={(e) => handleFieldChange("endDate", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            {!isMobile && (
              <GradeIcon sx={{ mr: 1, color: "text.secondary" }} />
            )}
            <TextField
              fullWidth
              label="Result (CGPA/Percentage)"
              placeholder="3.8 GPA / 85%"
              variant="outlined"
              value={formData.result}
              onChange={(e) => handleFieldChange("result", e.target.value)}
              required
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
              value={formData.comments}
              onChange={(e) => handleFieldChange("comments", e.target.value)}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!formData.degree || !formData.school || !formData.startDate || !formData.endDate || !formData.result}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

// Experience Modal Component
const ExperienceModal = memo(({
  open,
  handleClose,
  experience,
  handleExperienceChange,
  handlePresentChange,
  saveExperience,
  isEdit,
}) => {
  // Local state to keep track of form values
  const [formData, setFormData] = useState({ ...experience });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Update form data when experience prop changes
  useEffect(() => {
    setFormData({ ...experience });
  }, [experience]);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onPresentChangeLocal = (e) => {
    const isPresentValue = e.target.value === "yes";
    setFormData(prev => ({
      ...prev,
      isPresent: isPresentValue,
      endDate: isPresentValue ? "" : prev.endDate,
    }));
  };

  const handleSubmit = () => {
    // Update all fields at once
    handleExperienceChange(formData.id, "title", formData.title);
    handleExperienceChange(formData.id, "company", formData.company);
    handleExperienceChange(formData.id, "startDate", formData.startDate);
    handleExperienceChange(formData.id, "endDate", formData.endDate);
    handleExperienceChange(formData.id, "description", formData.description);
    handleExperienceChange(formData.id, "certificate", formData.certificate);
    
    // Handle isPresent separately
    const event = { target: { value: formData.isPresent ? "yes" : "no" } };
    handlePresentChange(formData.id, event);
    
    saveExperience();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          p: 2,
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          {isEdit ? "Edit Experience" : "Add New Experience"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            {!isMobile && (
              <WorkIcon sx={{ mr: 1, color: "text.secondary" }} />
            )}
            <TextField
              fullWidth
              label="Job Title"
              placeholder="Software Engineer"
              variant="outlined"
              value={formData.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              required
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            {!isMobile && (
              <BusinessIcon sx={{ mr: 1, color: "text.secondary" }} />
            )}
            <TextField
              fullWidth
              label="Company Name"
              placeholder="Google Inc."
              variant="outlined"
              value={formData.company}
              onChange={(e) => handleFieldChange("company", e.target.value)}
              required
            />
          </Box>

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">
              Currently Working Here?
            </FormLabel>
            <RadioGroup
              row
              value={formData.isPresent ? "yes" : "no"}
              onChange={onPresentChangeLocal}
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

          <Grid container spacing={2} sx={{ mb: 3 }}>
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
                value={formData.startDate}
                onChange={(e) => handleFieldChange("startDate", e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
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
                value={formData.endDate}
                onChange={(e) => handleFieldChange("endDate", e.target.value)}
                disabled={formData.isPresent}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={
                  formData.isPresent
                    ? "Not applicable for current job"
                    : ""
                }
                required={!formData.isPresent}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
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
              value={formData.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
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
              value={formData.certificate}
              onChange={(e) => handleFieldChange("certificate", e.target.value)}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!formData.title || !formData.company || !formData.startDate || (!formData.endDate && !formData.isPresent)}
        >
          {isEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

// Memoized Education Card Component for summary view
const EducationSummaryCard = memo(({ 
  education, 
  index, 
  isMobile, 
  removeEducation,
  handleEditClick
}) => {
  return (
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
            Education #{index + 1}
          </Typography>
          <Box>
            <IconButton
              color="primary"
              onClick={() => handleEditClick(education.id)}
              size="medium"
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => removeEducation(education.id)}
              size="medium"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h6" component="div" gutterBottom>
          {education.degree || "No Degree Specified"}
        </Typography>
        
        <Divider sx={{ my: 1 }} />
        
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => handleEditClick(education.id)}
          size="small"
          sx={{ mt: 1 }}
        >
          Edit Details
        </Button>
      </CardContent>
    </Card>
  );
});

// Memoized Experience Card Component for summary view
const ExperienceSummaryCard = memo(({ 
  experience, 
  index, 
  isMobile, 
  removeExperience,
  handleEditClick
}) => {
  return (
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
            Experience #{index + 1}
          </Typography>
          <Box>
            <IconButton
              color="primary"
              onClick={() => handleEditClick(experience.id)}
              size="medium"
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => removeExperience(experience.id)}
              size="medium"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h6" component="div" gutterBottom>
          {experience.title || "No Title Specified"}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {experience.company || "No Company Specified"}
        </Typography>
        
        <Divider sx={{ my: 1 }} />
        
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => handleEditClick(experience.id)}
          size="small"
          sx={{ mt: 1 }}
        >
          Edit Details
        </Button>
      </CardContent>
    </Card>
  );
});

const EducationExperienceSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  
  // Get user experience and education data from redux
  const { portfolioEducations, portfolioExperiences, currentPortfolio } =
    useSelector((state) => state.userPortfolio);
  
  // Education state
  const [educations, setEducations] = useState([]);
  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState(null);
  const [isEditEducation, setIsEditEducation] = useState(false);

  // Experience state
  const [experiences, setExperiences] = useState([]);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [isEditExperience, setIsEditExperience] = useState(false);

  // Format ISO date string to YYYY-MM-DD for input fields
  const formatDateForInput = useCallback((isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  }, []);

  useEffect(() => {
    dispatch(getPortfolioEducationDetails(currentPortfolio._id));
    dispatch(getPortfolioExperienceDetails(currentPortfolio._id));
  }, []);

  // Load data from reducer when component mounts or when portfolioEducations changes
  useEffect(() => {
    if (portfolioEducations?.length > 0) {
      const formattedEducations = portfolioEducations.map((edu) => ({
        isEdited: true,
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

    if (portfolioExperiences?.length > 0) {
      const formattedExperiences = portfolioExperiences.map((exp) => ({
        isEdited: true,
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
  }, [portfolioExperiences, formatDateForInput]);

  // Education handlers
  const addEducation = useCallback(() => {
    if (educations.length < 4) {
      const newEducation = {
        isEdited: false,
        id: Date.now() + Math.random(),
        degree: "",
        school: "",
        startDate: "",
        endDate: "",
        result: "",
        comments: "",
      };
      setCurrentEducation(newEducation);
      setIsEditEducation(false);
      setEducationModalOpen(true);
    } else {
      alert("Maximum of 4 education entries allowed.");
    }
  }, [educations.length]);

  const removeEducation = useCallback((id) => {
    setEducations(prev => prev.filter(education => education.id !== id));
  }, []);

  const handleEducationChange = useCallback((id, field, value) => {
    setEducations(prev => 
      prev.map(education =>
        education.id === id ? { ...education, [field]: value } : education
      )
    );
  }, []);

  const handleEducationEdit = useCallback((id) => {
    const educationToEdit = educations.find(edu => edu.id === id);
    if (educationToEdit) {
      setCurrentEducation(educationToEdit);
      setIsEditEducation(true);
      setEducationModalOpen(true);
    }
  }, [educations]);

  const saveEducation = useCallback(() => {
    if (!isEditEducation) {
      setEducations(prev => [...prev, currentEducation]);
    }
    // No need to update for edit case as it's handled by handleEducationChange
  }, [currentEducation, isEditEducation]);

  // Experience handlers
  const addExperience = useCallback(() => {
    if (experiences.length < 4) {
      const newExperience = {
        isEdited: false,
        id: Date.now() + Math.random(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        isPresent: false,
        certificate: "",
      };
      setCurrentExperience(newExperience);
      setIsEditExperience(false);
      setExperienceModalOpen(true);
    } else {
      alert("Maximum of 4 experience entries allowed.");
    }
  }, [experiences.length]);

  const removeExperience = useCallback((id) => {
    setExperiences(prev => prev.filter(experience => experience.id !== id));
  }, []);

  const handleExperienceChange = useCallback((id, field, value) => {
    setExperiences(prev => 
      prev.map(experience =>
        experience.id === id ? { ...experience, [field]: value } : experience
      )
    );
  }, []);

  const handlePresentChange = useCallback((id, event) => {
    const isPresentValue = event.target.value === "yes";
    setExperiences(prev => 
      prev.map(experience => {
        if (experience.id === id) {
          return {
            ...experience,
            isPresent: isPresentValue,
            endDate: isPresentValue ? "" : experience.endDate,
          };
        }
        return experience;
      })
    );
  }, []);

  const handleExperienceEdit = useCallback((id) => {
    const experienceToEdit = experiences.find(exp => exp.id === id);
    if (experienceToEdit) {
      setCurrentExperience(experienceToEdit);
      setIsEditExperience(true);
      setExperienceModalOpen(true);
    }
  }, [experiences]);

  const saveExperience = useCallback(() => {
    if (!isEditExperience) {
      setExperiences(prev => [...prev, currentExperience]);
    }
    // No need to update for edit case as it's handled by handleExperienceChange
  }, [currentExperience, isEditExperience]);

  // Save all data
  const saveData = useCallback(() => {
    // Format the data to match the backend structure
    educations.forEach((edu) => {
      if(edu.isEdited) {
        dispatch({type: EDIT_EDUCATION, payload: edu});
      } else {
        dispatch({ type: ADD_NEW_EDUCATION, payload: edu });
      }
    });

    dispatch(saveEducationDetails());

    // For implementation
    dispatch({ type: INCREMENT_PAGE_COUNT });
  }, [educations, dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Education Modal */}
      {educationModalOpen && (
        <EducationModal
          open={educationModalOpen}
          handleClose={() => setEducationModalOpen(false)}
          education={currentEducation}
          handleEducationChange={handleEducationChange}
          saveEducation={saveEducation}
          isEdit={isEditEducation}
        />
      )}

      {/* Experience Modal */}
      {experienceModalOpen && (
        <ExperienceModal
          open={experienceModalOpen}
          handleClose={() => setExperienceModalOpen(false)}
          experience={currentExperience}
          handleExperienceChange={handleExperienceChange}
          handlePresentChange={handlePresentChange}
          saveExperience={saveExperience}
          isEdit={isEditExperience}
        />
      )}

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
            <EducationSummaryCard
              key={education.id}
              education={education}
              index={index}
              isMobile={isMobile}
              removeEducation={removeEducation}
              handleEditClick={handleEducationEdit}
            />
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
            <ExperienceSummaryCard
              key={experience.id}
              experience={experience}
              index={index}
              isMobile={isMobile}
              removeExperience={removeExperience}
              handleEditClick={handleExperienceEdit}
            />
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
            px: 6,
            borderRadius: 2,
            boxShadow: 2,
          }}
          
        >
          Save Data
        </Button>
      </Box>
    </Container>
  );
}

export default EducationExperienceSection;