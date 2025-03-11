import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import EditIcon from "@mui/icons-material/Edit";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";
import { addNewServiceSection, deleteServiceSection, editServiceSection, getPortfolioServicesDetails } from "../../redux/actions/portfolioActions";

const ServiceSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const { currentPortfolio, portfolioServices, isPageLoading } = useSelector(
    (state) => state.userPortfolio
  );

  const [services, setServices] = useState([]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Add a new service
  const addService = () => {
    if (services.length < 4) {
      const newService = {
        id: Date.now() + Math.random(),
        title: "",
        description: "",
      };
      setCurrentService(newService);
      setIsEditing(false);
      setModalOpen(true);
    } else {
      alert("You can add a maximum of 4 services");
    }
  };

  // Handle editing a service
  const handleEditClick = (id) => {
    const serviceToEdit = services.find((service) => service.id === id);
    setCurrentService(serviceToEdit);
    setIsEditing(true);
    setModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentService(null);
  };

  // Remove a service
  const removeService = (id) => {
    dispatch(deleteServiceSection(id));
  };

  // Handle service field changes
  const handleServiceChange = (field, value) => {
    setCurrentService({
      ...currentService,
      [field]: value,
    });
  };

  // Save current service (from modal)
  const saveCurrentService = () => {
    if (isEditing) {
      dispatch(editServiceSection(currentService));
    } else {
      dispatch(addNewServiceSection(currentService));
    };
    handleModalClose();
  }

  // Save all services
  const saveServices = () => {
    dispatch({ type: INCREMENT_PAGE_COUNT });
  };

  useEffect(() => {
    if (portfolioServices && portfolioServices.length > 0) {
      const formattedServices = portfolioServices.map((service) => ({
        id: service.serviceId,
        title: service.title,
        description: service.description,
      }));
      setServices(formattedServices);
    } else {
      dispatch(getPortfolioServicesDetails(currentPortfolio._id));
    }
  }, [portfolioServices, isPageLoading]);

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
          Services Offered
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={addService}
          disabled={services.length >= 4}
          fullWidth={isMobile}
          size={isMobile ? "medium" : "large"}
          sx={{
            mb: 4,
            py: 1.2,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          Add New Service {services.length < 4 ? "" : "(Maximum Reached)"}
        </Button>
      </Box>

      {services.length === 0 && (
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
            No services added yet. Click the button above to add your first
            service.
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} key={service.id}>
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <BusinessCenterIcon
                      sx={{
                        mr: 1,
                        color: theme.palette.primary.main,
                        fontSize: 28,
                      }}
                    />
                    <Typography variant="h6" component="div" fontWeight="bold">
                      Service #{index + 1}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(service.id)}
                      size="medium"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => removeService(service.id)}
                      size="medium"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="h6" component="div" gutterBottom>
                  {service.title || "Untitled Service"}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, flexGrow: 1 }}
                >
                  {service.description
                    ? service.description.length > 100
                      ? `${service.description.substring(0, 100)}...`
                      : service.description
                    : "No description provided"}
                </Typography>

                <Box sx={{ mt: "auto" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(service.id)}
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

      {services.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            color="success"
            startIcon={<SaveIcon />}
            onClick={saveServices}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              fontSize: "1.1rem",
              boxShadow: 3,
            }}
          >
            Save Services
          </Button>
        </Box>
      )}

      {/* Service Edit/Create Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        aria-labelledby="service-dialog-title"
      >
        <DialogTitle id="service-dialog-title">
          {isEditing ? "Edit Service" : "Add New Service"}
        </DialogTitle>

        <DialogContent dividers>
          {currentService && (
            <Grid container spacing={3}>
              {/* Service Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Service Title"
                  variant="outlined"
                  value={currentService.title}
                  onChange={(e) => handleServiceChange("title", e.target.value)}
                  sx={{ mb: 2 }}
                  placeholder="e.g., Web Development, UI/UX Design, SEO Optimization"
                />
              </Grid>

              {/* Service Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Service Description"
                  variant="outlined"
                  multiline
                  rows={6}
                  value={currentService.description}
                  onChange={(e) =>
                    handleServiceChange("description", e.target.value)
                  }
                  placeholder="Describe what this service entails, your approach, and what value it delivers to clients."
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleModalClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={saveCurrentService}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            {isEditing ? "Update Service" : "Save Service"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServiceSection;
