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
  Rating,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import ImageIcon from "@mui/icons-material/Image";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import CommentIcon from "@mui/icons-material/Comment";
import StarIcon from "@mui/icons-material/Star";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";

const TestimonialsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const { portfolioLoading, portfolio } = useSelector(
    (state) => state.userPortfolio
  );

  const [testimonials, setTestimonials] = useState([]);
  const fileInputRefs = useRef({});

  // Add a new testimonial
  const addTestimonial = () => {
    if (testimonials.length < 4) {
      const newTestimonial = {
        id: Date.now() + Math.random(),
        employerName: "",
        employerRole: "",
        companyName: "",
        imageUrl: null,
        comment: "",
        rating: 5,
      };
      setTestimonials([...testimonials, newTestimonial]);
      // Create a ref for the file input
      fileInputRefs.current[newTestimonial.id] = React.createRef();
    } else {
      alert("You can add a maximum of 4 testimonials");
    }
  };

  // Remove a testimonial
  const removeTestimonial = (id) => {
    setTestimonials(
      testimonials.filter((testimonial) => testimonial.id !== id)
    );
  };

  // Handle testimonial field changes
  const handleTestimonialChange = (id, field, value) => {
    setTestimonials(
      testimonials.map((testimonial) =>
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
      )
    );
  };

  // Handle image upload
  const handleImageUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleTestimonialChange(id, "imageUrl", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = (id) => {
    fileInputRefs.current[id].current.click();
  };

  // Save testimonials
  const saveTestimonials = () => {
    // Here you would typically dispatch an action to save to Redux or API
    // console.log("Saving testimonials data:", testimonials);
    // // Example dispatch (uncomment and modify as needed):
    // // dispatch(saveUserTestimonials(testimonials));
    // alert("Testimonials saved successfully!");
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
          Testimonials
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={addTestimonial}
          disabled={testimonials.length >= 4}
          fullWidth={isMobile}
          size={isMobile ? "medium" : "large"}
          sx={{
            mb: 4,
            py: 1.2,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          Add New Testimonial{" "}
          {testimonials.length < 4 ? "" : "(Maximum Reached)"}
        </Button>
      </Box>

      {testimonials.length === 0 && (
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
            No testimonials added yet. Click the button above to add your first
            testimonial.
          </Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        {testimonials.map((testimonial) => (
          <Grid item xs={12} key={testimonial.id}>
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
                    Testimonial Details
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => removeTestimonial(testimonial.id)}
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Grid container spacing={3}>
                  {/* Employer Image */}
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        border: "1px dashed grey",
                        borderRadius: 2,
                        p: 2,
                        minHeight: 240,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: testimonial.imageUrl
                          ? "flex-start"
                          : "center",
                        alignItems: "center",
                      }}
                    >
                      {testimonial.imageUrl ? (
                        <>
                          <Avatar
                            src={testimonial.imageUrl}
                            alt={testimonial.employerName || "Employer"}
                            sx={{
                              width: 120,
                              height: 120,
                              mb: 2,
                            }}
                          />
                          <Button
                            variant="outlined"
                            startIcon={<UploadFileIcon />}
                            onClick={() => triggerFileInput(testimonial.id)}
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
                            onClick={() => triggerFileInput(testimonial.id)}
                          >
                            Upload Image
                          </Button>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={fileInputRefs.current[testimonial.id]}
                        onChange={(e) => handleImageUpload(testimonial.id, e)}
                      />
                    </Box>
                  </Grid>

                  {/* Testimonial Details */}
                  <Grid item xs={12} md={8}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <TextField
                        fullWidth
                        label="Employer Name"
                        placeholder="John Doe"
                        variant="outlined"
                        value={testimonial.employerName}
                        onChange={(e) =>
                          handleTestimonialChange(
                            testimonial.id,
                            "employerName",
                            e.target.value
                          )
                        }
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <WorkIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <TextField
                        fullWidth
                        label="Employer Role"
                        placeholder="Senior Manager"
                        variant="outlined"
                        value={testimonial.employerRole}
                        onChange={(e) =>
                          handleTestimonialChange(
                            testimonial.id,
                            "employerRole",
                            e.target.value
                          )
                        }
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <BusinessIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <TextField
                        fullWidth
                        label="Company Name"
                        placeholder="Acme Inc."
                        variant="outlined"
                        value={testimonial.companyName}
                        onChange={(e) =>
                          handleTestimonialChange(
                            testimonial.id,
                            "companyName",
                            e.target.value
                          )
                        }
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Rating:
                      </Typography>
                      <Rating
                        name={`rating-${testimonial.id}`}
                        value={testimonial.rating}
                        onChange={(event, newValue) => {
                          handleTestimonialChange(
                            testimonial.id,
                            "rating",
                            newValue
                          );
                        }}
                        precision={1}
                        size="large"
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <CommentIcon
                        sx={{ mr: 1, mt: 2, color: "text.secondary" }}
                      />
                      <TextField
                        fullWidth
                        label="Comment (Optional)"
                        placeholder="Write the testimonial here..."
                        variant="outlined"
                        multiline
                        rows={4}
                        value={testimonial.comment}
                        onChange={(e) =>
                          handleTestimonialChange(
                            testimonial.id,
                            "comment",
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

      {testimonials.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            color="success"
            startIcon={<SaveIcon />}
            onClick={saveTestimonials}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              fontSize: "1.1rem",
              boxShadow: 3,
            }}
          >
            Save Testimonials
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default TestimonialsSection;
