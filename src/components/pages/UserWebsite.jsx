import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import UploadIcon from "@mui/icons-material/Upload";
import EditIcon from "@mui/icons-material/Edit";
import LanguageIcon from "@mui/icons-material/Language";
import TitleIcon from "@mui/icons-material/Title";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { editWebsiteDetails } from "../../redux/actions/portfolioActions";
import { checkWebsiteNameAvailability } from "../../redux/actions/portfolioActions";
import { useNavigate } from "react-router-dom";

const PortfolioWebsiteDetails = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { portfolioLoading, portfolio } = useSelector(
    (state) => state.userPortfolio
  );

  const [logoImage, setLogoImage] = useState(null);
  const [headerTitle, setHeaderTitle] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isLogoEdited, setIsLogoEdited] = useState(false);

  // New states for website name availability
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isWebsiteNameAvailable, setIsWebsiteNameAvailable] = useState(null);
  const [originalWebsiteName, setOriginalWebsiteName] = useState("");

  // Debounce timer for name checking
  const availabilityTimerRef = useRef(null);

  const fileInputRef = useRef(null);

  // Load existing data from backend if available
  useEffect(() => {
    if (portfolio) {
      setLogoImage(
        portfolio.logo && portfolio.logo.url ? portfolio.logo.url : null
      );
      setHeaderTitle(portfolio.headerTitle);
      setWebsiteName(portfolio.details.websiteName);
      setOriginalWebsiteName(portfolio.details.websiteName);
      setIsPublished(portfolio.isPublished);
    }
  }, [portfolio]);

  // Check website name availability when it changes
  const handleWebsiteNameChange = (e) => {
    const newName = e.target.value;
    setWebsiteName(newName);

    // Clear previous timer
    if (availabilityTimerRef.current) {
      clearTimeout(availabilityTimerRef.current);
    }

    // Skip check if empty or if it's the original name
    if (!newName || newName === originalWebsiteName) {
      setIsWebsiteNameAvailable(null);
      return;
    }

    // Set checking state
    setIsCheckingAvailability(true);

    // Debounce the API call (only check after 500ms of no typing)
    availabilityTimerRef.current = setTimeout(async () => {
      const isAvailable = await dispatch(checkWebsiteNameAvailability(newName));
      setIsWebsiteNameAvailable(isAvailable);
      setIsCheckingAvailability(false);
    }, 500);
  };

  // Handle logo image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoImage(e.target.result);
        setIsLogoEdited(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Save website details
  const saveWebsiteDetails = () => {
    const websiteData = {
      portfolioId: portfolio._id,
      isLogoEdited,
      logo: isLogoEdited ? logoImage : null,
      headerTitle,
      websiteName,
      isPublished,
    };

    dispatch(editWebsiteDetails(websiteData));
    // You might want to show a success message or redirect after saving
    // alert("Website details saved successfully!");

    // Update original website name after saving
    setOriginalWebsiteName(websiteName);
    navigate("/view-portfolio");
  };

  // Get the appropriate helper text for website name field
  const getWebsiteNameHelperText = () => {
    if (isCheckingAvailability) {
      return "Checking availability...";
    }

    if (websiteName === originalWebsiteName) {
      return "This will be used in browser tab titles and SEO";
    }

    if (websiteName && isWebsiteNameAvailable === true) {
      return "✓ This website name is available!";
    }

    if (websiteName && isWebsiteNameAvailable === false) {
      return "✗ This website name is already taken";
    }

    return "This will be used in browser tab titles and SEO";
  };

  // Get color for helper text
  const getHelperTextColor = () => {
    if (isWebsiteNameAvailable === true) return "success.main";
    if (isWebsiteNameAvailable === false) return "error.main";
    return "text.secondary";
  };

  if (portfolioLoading === undefined || portfolioLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

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
          Portfolio Website Details
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{ mb: 4 }}
        >
          Customize your portfolio website appearance and settings
        </Typography>
      </Box>

      <Card
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "visible",
          transition: "all 0.3s",
          "&:hover": {
            boxShadow: 6,
          },
          mb: 4,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Website Branding
          </Typography>

          <Grid container spacing={4} alignItems="center">
            {/* Logo Upload Section */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Avatar
                  src={logoImage}
                  alt="Website Logo"
                  sx={{
                    width: { xs: 120, md: 150 },
                    height: { xs: 120, md: 150 },
                    mb: 2,
                    border: `4px solid ${theme.palette.primary.main}`,
                    boxShadow: 3,
                  }}
                >
                  {!logoImage && <LanguageIcon sx={{ fontSize: 60 }} />}
                </Avatar>

                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />

                <Button
                  variant="contained"
                  startIcon={logoImage ? <EditIcon /> : <UploadIcon />}
                  onClick={triggerFileInput}
                  sx={{ mt: 1 }}
                >
                  {logoImage ? "Change Logo" : "Upload Logo"}
                </Button>

                <Typography
                  variant="caption"
                  color="textSecondary"
                  align="center"
                  sx={{ mt: 1, display: "block" }}
                >
                  Recommended: Square image, at least 200×200px
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Website Identity
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    mb: 3,
                  }}
                >
                  <TitleIcon sx={{ mt: 2, mr: 2, color: "text.secondary" }} />
                  <TextField
                    fullWidth
                    label="Header Title"
                    variant="outlined"
                    placeholder="Your Portfolio Header Title"
                    value={headerTitle}
                    onChange={(e) => setHeaderTitle(e.target.value)}
                    helperText="This appears in the navigation bar of your portfolio website"
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <LanguageIcon
                    sx={{ mt: 2, mr: 2, color: "text.secondary" }}
                  />
                  <TextField
                    fullWidth
                    label="Website Name"
                    variant="outlined"
                    placeholder="Your Portfolio Website Name"
                    value={websiteName}
                    onChange={handleWebsiteNameChange}
                    helperText={getWebsiteNameHelperText()}
                    FormHelperTextProps={{
                      sx: { color: getHelperTextColor() },
                    }}
                    InputProps={{
                      endAdornment: websiteName &&
                        websiteName !== originalWebsiteName && (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {isCheckingAvailability ? (
                              <CircularProgress size={20} />
                            ) : isWebsiteNameAvailable ? (
                              <CheckCircleIcon color="success" />
                            ) : isWebsiteNameAvailable === false ? (
                              <CancelIcon color="error" />
                            ) : null}
                          </Box>
                        ),
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
          <Typography
            variant="h5"
            component="div"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Website Visibility
          </Typography>

          <Box sx={{ pl: 2 }}>
            <FormControl component="fieldset">
              <Typography variant="subtitle1" gutterBottom>
                Publish Status
              </Typography>
              <RadioGroup
                row
                value={isPublished.toString()}
                onChange={(e) => setIsPublished(e.target.value === "true")}
              >
                <FormControlLabel
                  value="true"
                  control={
                    <Radio
                      color="success"
                      icon={<PublicOffIcon />}
                      checkedIcon={<PublicIcon />}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body1">Published</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Your portfolio is live and accessible to visitors
                      </Typography>
                    </Box>
                  }
                  sx={{
                    mr: 4,
                    p: 1,
                    border: isPublished
                      ? `1px solid ${theme.palette.success.main}`
                      : "1px solid transparent",
                    borderRadius: 1,
                    bgcolor: isPublished ? "success.light" : "transparent",
                    opacity: isPublished ? 1 : 0.8,
                    transition: "all 0.2s",
                    "& .MuiFormControlLabel-label": {
                      color: isPublished ? "success.dark" : "text.primary",
                    },
                  }}
                />
                <FormControlLabel
                  value="false"
                  control={
                    <Radio
                      color="error"
                      icon={<PublicIcon />}
                      checkedIcon={<PublicOffIcon />}
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body1">Unpublished</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Your portfolio is hidden from public view
                      </Typography>
                    </Box>
                  }
                  sx={{
                    p: 1,
                    border: !isPublished
                      ? `1px solid ${theme.palette.error.main}`
                      : "1px solid transparent",
                    borderRadius: 1,
                    bgcolor: !isPublished ? "error.light" : "transparent",
                    opacity: !isPublished ? 1 : 0.8,
                    transition: "all 0.2s",
                    "& .MuiFormControlLabel-label": {
                      color: !isPublished ? "error.dark" : "text.primary",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={saveWebsiteDetails}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            fontSize: "1.1rem",
            boxShadow: 3,
            width: "100%", // Full width/ Align with left edge
          }}
          disabled={isCheckingAvailability || isWebsiteNameAvailable === false}
        >
          Save and Proceed
        </Button>
      </Box>
    </Container>
  );
};

export default PortfolioWebsiteDetails;
