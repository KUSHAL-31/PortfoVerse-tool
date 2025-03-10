import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EditIcon from "@mui/icons-material/Edit";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";

const ProjectSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const { portfolioLoading, portfolio } = useSelector(
    (state) => state.userPortfolio
  );

  const userProjects = useSelector(
    (state) => state.userPortfolio.portfolioProjects
  );

  const [projects, setProjects] = useState([]);
  const fileInputRef = useRef(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Add a new project
  const addProject = () => {
    if (projects.length < 4) {
      const newProject = {
        id: Date.now() + Math.random(),
        title: "",
        description: "",
        imageUrl: null,
        demoUrl: "",
        sourceCodeUrl: "",
      };
      setCurrentProject(newProject);
      setIsEditing(false);
      setModalOpen(true);
    } else {
      alert("You can add a maximum of 4 projects");
    }
  };

  // Handle editing a project
  const handleEditClick = (id) => {
    const projectToEdit = projects.find((project) => project.id === id);
    setCurrentProject(projectToEdit);
    setIsEditing(true);
    setModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentProject(null);
  };

  // Remove a project
  const removeProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Handle project field changes
  const handleProjectChange = (field, value) => {
    setCurrentProject({
      ...currentProject,
      [field]: value,
    });
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleProjectChange("imageUrl", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Save current project (from modal)
  const saveCurrentProject = () => {
    if (isEditing) {
      // Update existing project
      setProjects(
        projects.map((project) =>
          project.id === currentProject.id ? currentProject : project
        )
      );
    } else {
      // Add new project
      setProjects([...projects, currentProject]);
    }
    setModalOpen(false);
    setCurrentProject(null);
  };

  // Save all projects
  const saveProjects = () => {
    console.log("Saving projects data:", projects);
    dispatch({ type: INCREMENT_PAGE_COUNT });
  };

  useEffect(() => {
    if (
      userProjects &&
      userProjects.projects &&
      userProjects.projects.length > 0
    ) {
      console.log("User projects:", userProjects.projects);
      const formattedSections = userProjects.projects.map((project) => ({
        id: project.projectId,
        title: project.title,
        description: project.description,
        imageUrl: project.image ? project.image.url : null,
        demoUrl: project.url,
        sourceCodeUrl: project.sourceCode,
      }));
      setProjects(formattedSections);
    }
  }, [portfolio, userProjects]);

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
          Project Showcase
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={addProject}
          disabled={projects.length >= 4}
          fullWidth={isMobile}
          size={isMobile ? "medium" : "large"}
          sx={{
            mb: 4,
            py: 1.2,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          Add New Project {projects.length < 4 ? "" : "(Maximum Reached)"}
        </Button>
      </Box>

      {projects.length === 0 && (
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
            No projects added yet. Click the button above to add your first
            project.
          </Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 2,
                mb: 3,
                overflow: "visible",
                transition: "all 0.3s",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "56.25%",
                  overflow: "hidden",
                }}
              >
                {project.imageUrl ? (
                  <CardMedia
                    component="img"
                    image={project.imageUrl}
                    alt={project.title || "Project image"}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "grey.200",
                    }}
                  >
                    <ImageIcon sx={{ fontSize: 60, color: "text.secondary" }} />
                  </Box>
                )}
              </Box>

              <CardContent
                sx={{
                  p: 3,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" component="div" fontWeight="bold">
                    Project #{index + 1}
                  </Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(project.id)}
                      size="medium"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => removeProject(project.id)}
                      size="medium"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="h6" component="div" gutterBottom>
                  {project.title || "Untitled Project"}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ mt: "auto" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(project.id)}
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    Edit Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {projects.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            color="success"
            startIcon={<SaveIcon />}
            onClick={saveProjects}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              fontSize: "1.1rem",
              boxShadow: 3,
            }}
          >
            Save Projects
          </Button>
        </Box>
      )}

      {/* Project Edit/Create Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        aria-labelledby="project-dialog-title"
      >
        <DialogTitle id="project-dialog-title">
          {isEditing ? "Edit Project" : "Add New Project"}
        </DialogTitle>

        <DialogContent dividers>
          {currentProject && (
            <Grid container spacing={3}>
              {/* Project Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Title"
                  variant="outlined"
                  value={currentProject.title}
                  onChange={(e) => handleProjectChange("title", e.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>

              {/* Project Image */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    border: "1px dashed grey",
                    borderRadius: 2,
                    p: 2,
                    minHeight: 240,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: currentProject.imageUrl
                      ? "flex-start"
                      : "center",
                    alignItems: "center",
                  }}
                >
                  {currentProject.imageUrl ? (
                    <>
                      <CardMedia
                        component="img"
                        image={currentProject.imageUrl}
                        alt={currentProject.title || "Project image"}
                        sx={{
                          borderRadius: 1,
                          maxHeight: 300,
                          objectFit: "contain",
                          mb: 2,
                        }}
                      />
                      <Button
                        variant="outlined"
                        startIcon={<UploadFileIcon />}
                        onClick={triggerFileInput}
                        size="small"
                      >
                        Change Image
                      </Button>
                    </>
                  ) : (
                    <>
                      <ImageIcon
                        sx={{
                          fontSize: 60,
                          color: "text.secondary",
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        gutterBottom
                      >
                        No image uploaded
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<UploadFileIcon />}
                        onClick={triggerFileInput}
                      >
                        Upload Image
                      </Button>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </Box>
              </Grid>

              {/* Project Description and URLs */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Project Description"
                  variant="outlined"
                  multiline
                  rows={6}
                  value={currentProject.description}
                  onChange={(e) =>
                    handleProjectChange("description", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LinkIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <TextField
                    fullWidth
                    label="Demo URL"
                    placeholder="https://example.com"
                    variant="outlined"
                    value={currentProject.demoUrl}
                    onChange={(e) =>
                      handleProjectChange("demoUrl", e.target.value)
                    }
                  />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CodeIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <TextField
                    fullWidth
                    label="Source Code URL"
                    placeholder="https://github.com/username/repo"
                    variant="outlined"
                    value={currentProject.sourceCodeUrl}
                    onChange={(e) =>
                      handleProjectChange("sourceCodeUrl", e.target.value)
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleModalClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={saveCurrentProject}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            {isEditing ? "Update Project" : "Save Project"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectSection;
