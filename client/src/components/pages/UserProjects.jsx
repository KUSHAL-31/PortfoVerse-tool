import React, { useState, useRef } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";


const ProjectSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const { portfolioLoading, portfolio } = useSelector(
    (state) => state.userPortfolio
  );

  const [projects, setProjects] = useState([]);
  const fileInputRefs = useRef({});

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
      setProjects([...projects, newProject]);
      // Create a ref for the file input
      fileInputRefs.current[newProject.id] = React.createRef();
    } else {
      alert("You can add a maximum of 4 projects");
    }
  };

  // Remove a project
  const removeProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Handle project field changes
  const handleProjectChange = (id, field, value) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  // Handle image upload
  const handleImageUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleProjectChange(id, "imageUrl", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = (id) => {
    fileInputRefs.current[id].current.click();
  };

  // Save projects
  const saveProjects = () => {
    // Here you would typically dispatch an action to save to Redux or API
    console.log("Saving projects data:", projects);
    // Example dispatch (uncomment and modify as needed):
    // dispatch(saveUserProjects(projects));
    // alert("Projects saved successfully!");
    dispatch({ type: INCREMENT_PAGE_COUNT });
  };

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
        {projects.map((project) => (
          <Grid item xs={12} key={project.id}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 2,
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
                  }}
                >
                  <Typography variant="h5" component="div" fontWeight="bold">
                    Project Details
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => removeProject(project.id)}
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Grid container spacing={3}>
                  {/* Project Title */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Project Title"
                      variant="outlined"
                      value={project.title}
                      onChange={(e) =>
                        handleProjectChange(project.id, "title", e.target.value)
                      }
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
                        justifyContent: project.imageUrl
                          ? "flex-start"
                          : "center",
                        alignItems: "center",
                      }}
                    >
                      {project.imageUrl ? (
                        <>
                          <CardMedia
                            component="img"
                            image={project.imageUrl}
                            alt={project.title || "Project image"}
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
                            onClick={() => triggerFileInput(project.id)}
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
                            onClick={() => triggerFileInput(project.id)}
                          >
                            Upload Image
                          </Button>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={fileInputRefs.current[project.id]}
                        onChange={(e) => handleImageUpload(project.id, e)}
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
                      value={project.description}
                      onChange={(e) =>
                        handleProjectChange(
                          project.id,
                          "description",
                          e.target.value
                        )
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
                        value={project.demoUrl}
                        onChange={(e) =>
                          handleProjectChange(
                            project.id,
                            "demoUrl",
                            e.target.value
                          )
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
                        value={project.sourceCodeUrl}
                        onChange={(e) =>
                          handleProjectChange(
                            project.id,
                            "sourceCodeUrl",
                            e.target.value
                          )
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
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
    </Container>
  );
};

export default ProjectSection;
