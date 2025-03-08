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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";

const ServiceSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const { portfolioLoading, portfolio } = useSelector(
    (state) => state.userPortfolio
  );

   const userServices = useSelector(
     (state) => state.userPortfolio.portfolioServices
   );
    

  const [services, setServices] = useState([]);

  // Add a new service
  const addService = () => {
    if (services.length < 4) {
      setServices([
        ...services,
        {
          id: Date.now() + Math.random(),
          title: "",
          description: "",
        },
      ]);
    } else {
      alert("You can add a maximum of 4 services");
    }
  };

  // Remove a service
  const removeService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  // Handle service field changes
  const handleServiceChange = (id, field, value) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  // Save services
  const saveServices = () => {
    // Here you would typically dispatch an action to save to Redux or API
    // console.log("Saving services data:", services);
    // // Example dispatch (uncomment and modify as needed):
    // // dispatch(saveUserServices(services));
    // alert("Services saved successfully!");
    dispatch({ type: INCREMENT_PAGE_COUNT });
  };

  useEffect(() => {
      if (userServices && userServices.services.length > 0) {
        console.log("User projects:", userServices.services);
        const formattedServices = userServices.services.map((service) => ({
          id: service.serviceId,
          title: service.title,
          description: service.description,
        }));
        setServices(formattedServices);
      }
    }, [portfolio]);

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
        {services.map((service) => (
          <Grid item xs={12} md={6} key={service.id}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                borderRadius: 2,
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
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
                      Service {services.indexOf(service) + 1}
                    </Typography>
                  </Box>
                  <IconButton
                    color="error"
                    onClick={() => removeService(service.id)}
                    size="medium"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <TextField
                  fullWidth
                  label="Service Title"
                  variant="outlined"
                  value={service.title}
                  onChange={(e) =>
                    handleServiceChange(service.id, "title", e.target.value)
                  }
                  sx={{ mb: 2 }}
                  placeholder="e.g., Web Development, UI/UX Design, SEO Optimization"
                />

                <TextField
                  fullWidth
                  label="Service Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={service.description}
                  onChange={(e) =>
                    handleServiceChange(
                      service.id,
                      "description",
                      e.target.value
                    )
                  }
                  sx={{ mb: 2, flexGrow: 1 }}
                  placeholder="Describe what this service entails, your approach, and what value it delivers to clients."
                />
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
    </Container>
  );
};

export default ServiceSection;
