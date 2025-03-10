import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Rating,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
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
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";
import { addNewTestimonialSection, deleteTestimonialSection, editTestimonialSection, getPortfolioTestimonialDetails } from "../../redux/actions/portfolioActions";

// Extract and memoize the TestimonialModal component
const TestimonialModal = memo(
  ({
    open,
    onClose,
    currentTestimonial,
    onTestimonialChange,
    onSave,
    testimonials,
  }) => {
    const fileInputRef = useRef(null);

    // Trigger file input click
    const triggerFileInput = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    // Handle image upload
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onTestimonialChange("image", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    if (!currentTestimonial) return null;

    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="testimonial-modal-title"
      >
        <DialogTitle id="testimonial-modal-title" sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="div" fontWeight="bold">
              {currentTestimonial.id &&
              testimonials.some((t) => t.id === currentTestimonial.id)
                ? "Edit Testimonial"
                : "Add New Testimonial"}
            </Typography>
            <IconButton onClick={onClose} size="large">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
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
                  justifyContent: currentTestimonial.image
                    ? "flex-start"
                    : "center",
                  alignItems: "center",
                }}
              >
                {currentTestimonial.image ? (
                  <>
                    <Avatar
                      src={currentTestimonial.image}
                      alt={currentTestimonial.employerName || "Employer"}
                      sx={{
                        width: 120,
                        height: 120,
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

            {/* Testimonial Details */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
                <TextField
                  fullWidth
                  label="Employer Name"
                  placeholder="John Doe"
                  variant="outlined"
                  value={currentTestimonial.employerName}
                  onChange={(e) =>
                    onTestimonialChange("employerName", e.target.value)
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
                  value={currentTestimonial.employerRole}
                  onChange={(e) =>
                    onTestimonialChange("employerRole", e.target.value)
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
                  value={currentTestimonial.companyName}
                  onChange={(e) =>
                    onTestimonialChange("companyName", e.target.value)
                  }
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Rating:
                </Typography>
                <Rating
                  name="rating"
                  value={currentTestimonial.rating}
                  onChange={(event, newValue) => {
                    onTestimonialChange("rating", newValue);
                  }}
                  precision={1}
                  size="large"
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <CommentIcon sx={{ mr: 1, mt: 2, color: "text.secondary" }} />
                <TextField
                  fullWidth
                  label="Comment (Optional)"
                  placeholder="Write the testimonial here..."
                  variant="outlined"
                  multiline
                  rows={4}
                  value={currentTestimonial.comment}
                  onChange={(e) =>
                    onTestimonialChange("comment", e.target.value)
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} variant="outlined" size="large">
            Cancel
          </Button>
          <Button
            onClick={onSave}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
          >
            {currentTestimonial.id &&
            testimonials.some((t) => t.id === currentTestimonial.id)
              ? "Update Testimonial"
              : "Add Testimonial"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

// Extract and memoize the DeleteConfirmationDialog component
const DeleteConfirmationDialog = memo(({ open, onClose, onDelete }) => (
  <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title">
    <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this testimonial? This action cannot be
        undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onDelete} color="error" variant="contained">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
));

// Extract and memoize the TestimonialCard component
const TestimonialCard = memo(({ testimonial, index, onEdit, onDelete }) => {
  return (
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
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {testimonial.image ? (
              <Avatar
                src={testimonial.image}
                alt={testimonial.employerName || "Employer"}
                sx={{ width: 40, height: 40, mr: 1.5 }}
              />
            ) : (
              <Avatar sx={{ width: 40, height: 40, mr: 1.5 }}>
                {testimonial.employerName?.charAt(0) || "?"}
              </Avatar>
            )}
            <Typography variant="h6" component="div" fontWeight="bold">
              Testimonial #{index + 1}
            </Typography>
          </Box>
          <Box>
            <IconButton
              color="primary"
              onClick={() => onEdit(testimonial.id)}
              size="medium"
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => onDelete(testimonial.id)}
              size="medium"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h6" component="div" gutterBottom>
          {testimonial.employerName || "No Name Specified"}
          {testimonial.employerRole && ` (${testimonial.employerRole})`}
        </Typography>

        <Box sx={{ my: 1.5 }}>
          <Rating
            value={testimonial.rating}
            readOnly
            size="small"
            precision={1}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </Box>

        {testimonial.comment && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              mb: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            "{testimonial.comment}"
          </Typography>
        )}

        <Divider sx={{ my: 1 }} />

        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => onEdit(testimonial.id)}
          size="small"
          sx={{ mt: 1 }}
        >
          Edit Details
        </Button>
      </CardContent>
    </Card>
  );
});

const TestimonialsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const { currentPortfolio, portfolioTestimonials, isPageLoading } =
    useSelector((state) => state.userPortfolio);

  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

  // Add a new testimonial - memoize the function to prevent recreating on each render
  const addTestimonial = useCallback(() => {
    if (testimonials.length < 4) {
      const newTestimonial = {
        id: Date.now() + Math.random(),
        employerName: "",
        employerRole: "",
        companyName: "",
        image: null,
        comment: "",
        rating: 5,
      };
      setCurrentTestimonial(newTestimonial);
      setModalOpen(true);
    } else {
      alert("You can add a maximum of 4 testimonials");
    }
  }, [testimonials.length]);

  // Open edit modal for a testimonial - memoize
  const handleEditClick = useCallback(
    (id) => {
      const testimonialToEdit = testimonials.find((t) => t.id === id);
      if (testimonialToEdit) {
        setCurrentTestimonial({ ...testimonialToEdit });
        setModalOpen(true);
      }
    },
    [testimonials]
  );

  // Confirm before deleting a testimonial - memoize
  const confirmDelete = useCallback((id) => {
    setTestimonialToDelete(id);
    setDeleteConfirmOpen(true);
  }, []);

  // Remove a testimonial - memoize
  const removeTestimonial = (testimonialId) => {
    dispatch(deleteTestimonialSection(testimonialId));
    setDeleteConfirmOpen(false);
    setTestimonialToDelete(null);
  }

  // Handle testimonial field changes in the modal - memoize
const handleTestimonialChange = useCallback((field, value) => {
  setCurrentTestimonial((prev) => ({
    ...prev,
    [field]: value,
    ...(field === "image" ? { isImageEdited: true } : {}), // Add isImageEdited if field is image
  }));
}, []);

  // Save the current testimonial from modal - memoize
  const saveCurrentTestimonial =()=>{
    if (currentTestimonial) {
      // Check if this is a new testimonial or an update
      const exists = testimonials.some((t) => t.id === currentTestimonial.id);
        if (exists) {
          dispatch(editTestimonialSection(currentTestimonial));
        } else {
         dispatch(addNewTestimonialSection(currentTestimonial));
        }
      // Close modal and reset current testimonial
      setModalOpen(false);
      setCurrentTestimonial(null);
    }
  }

  // Save all testimonials - memoize
  const saveTestimonials = useCallback(() => {
    dispatch({ type: INCREMENT_PAGE_COUNT });
  }, [dispatch]);

  // Handle modal close - memoize
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setCurrentTestimonial(null);
  }, []);

  // Handle delete dialog close - memoize
  const handleDeleteDialogClose = useCallback(() => {
    setDeleteConfirmOpen(false);
    setTestimonialToDelete(null);
  }, []);

  useEffect(() => {
    if (portfolioTestimonials && portfolioTestimonials.length > 0) {
      const formattedTestimonials = portfolioTestimonials.map((review) => ({
        id: review.testimonialId,
        employerName: review.employerName,
        employerRole: review.employerRole,
        companyName: review.companyName,
        image: review.image ? review.image.url : null,
        comment: review.comment,
        rating: review.rating,
      }));
      setTestimonials(formattedTestimonials);
    } else {
      dispatch(getPortfolioTestimonialDetails(currentPortfolio._id));
    }
  }, [dispatch, portfolioTestimonials, isPageLoading]);

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

      <Grid container spacing={3}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} lg={4} key={testimonial.id}>
            <TestimonialCard
              testimonial={testimonial}
              index={index}
              onEdit={handleEditClick}
              onDelete={confirmDelete}
            />
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

      {/* Modal for Adding/Editing Testimonial */}
      <TestimonialModal
        open={modalOpen}
        onClose={handleModalClose}
        currentTestimonial={currentTestimonial}
        onTestimonialChange={handleTestimonialChange}
        onSave={saveCurrentTestimonial}
        testimonials={testimonials}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteConfirmOpen}
        onClose={handleDeleteDialogClose}
        onDelete={()=>removeTestimonial(testimonialToDelete)}
      />
    </Container>
  );
};

export default TestimonialsSection;
