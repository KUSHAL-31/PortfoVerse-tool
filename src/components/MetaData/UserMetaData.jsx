import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import WorkIcon from "@mui/icons-material/Work";
import LinkIcon from "@mui/icons-material/Link";
import { updateUserMetaData } from "../../redux/actions/userActions";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";
import { getPortfolioMetaData } from "../../redux/actions/portfolioActions";
import ImageUploadSection from "./ImageUploadSection";

const UserMetaData = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { portfolioLoading, portfolioMetaData, portfolio, currentPortfolio } =
    useSelector((state) => state.userPortfolio);

  const dispatch = useDispatch();

  const [roles, setRoles] = useState([]);
  const [socials, setSocials] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resume, setResume] = useState("");
  // Inside your UserMetaData component, add these state variables:
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [portfolioImageUrls, setPortfolioImageUrls] = useState([]);

  const socialMediaOptions = [
    "LinkedIn",
    "Github",
    "Twitter",
    "Instagram",
    "Leetcode",
  ];

  // Function to add a new role
  const addRole = () => {
    setRoles([...roles, { id: Date.now(), text: "" }]);
  };

  // Function to remove a specific role
  const removeRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handleRoleTextChange = (id, value) => {
    setRoles(
      roles.map((role) => (role.id === id ? { ...role, text: value } : role))
    );
  };

  // Function to add a new social media link
  const addSocial = () => {
    const selectedValues = socials.map((social) => social.selected);
    const firstAvailableOption = socialMediaOptions.find(
      (option) => !selectedValues.includes(option)
    );

    if (firstAvailableOption) {
      setSocials([
        ...socials,
        { id: Date.now(), selected: firstAvailableOption, url: "" },
      ]);
    }
  };

  // Function to remove a specific social media link
  const removeSocial = (id) => {
    setSocials(socials.filter((social) => social.id !== id));
  };

  const handleSelectChange = (id, selectedValue) => {
    setSocials(
      socials.map((social) =>
        social.id === id ? { ...social, selected: selectedValue } : social
      )
    );
  };

  const handleUrlChange = (id, url) => {
    setSocials(
      socials.map((social) => (social.id === id ? { ...social, url } : social))
    );
  };

  // Add this function inside your component
// Use useCallback to memoize the function to prevent unnecessary re-renders
const handleImagesUpdate = useCallback((imageFiles, imageUrls) => {
  console.log("Image update called with:", { 
    fileCount: imageFiles.length, 
    urlCount: imageUrls.length 
  });
  
  setPortfolioImages(imageFiles);
  setPortfolioImageUrls(imageUrls);
}, []);
  // Initialize data when portfolioMetaData changes
  useEffect(() => {
    if (
      portfolioLoading === false &&
      (portfolioMetaData !== undefined || portfolioMetaData !== null) &&
      portfolioMetaData?.length !== 0
    ) {
      setTitle(portfolioMetaData?.title);
      setDescription(portfolioMetaData?.description);
      setResume(portfolioMetaData?.resume);
      if (portfolioMetaData?.roles && !roles.length) {
        setRoles(
          portfolioMetaData.roles.map((role) => ({
            id: Date.now() + Math.random(),
            text: role,
          }))
        );
      }
      if (portfolioMetaData?.socials && !socials.length) {
        setSocials(
          portfolioMetaData.socials.map((social) => ({
            id: Date.now() + Math.random(),
            selected: social.name,
            url: social.url,
          }))
        );
      }
    } else {
      if (currentPortfolio) {
        dispatch(getPortfolioMetaData(currentPortfolio._id));
      }
    }
  }, [portfolioLoading]);

  // Save metadata function
  // const saveMetaData = async () => {
  //   const portfolioData = {
  //     portfolioId: portfolio._id,
  //     title,
  //     description,
  //     resume,
  //     roles: roles.map((role) => role.text),
  //     socials: socials.map((social) => ({
  //       name: social.selected,
  //       url: social.url,
  //     })),
  //   };
  //   const doesExist = portfolioMetaData !== null ? true : false;
  //   // dispatch(updateUserMetaData(doesExist, portfolioData));
  //   dispatch({ type: INCREMENT_PAGE_COUNT });
  // };

  // Modify your saveMetaData function to include images
  const saveMetaData = async () => {
    var portfolioData = {
      portfolioId: portfolio._id,
      title,
      description,
      resume,
      roles: roles.map((role) => role.text),
      socials: socials.map((social) => ({
        name: social.selected,
        url: social.url,
      })),
      // Add this line to include existing image URLs
      // existingImages: portfolioImageUrls,
    };

    const doesExist = portfolioMetaData !== null ? true : false;

    // // Create a FormData object if there are new images to upload
    // if (portfolioImages.length > 0) {
    //   portfolioData = {...portfolioData, images: portfolioImages};
    // }
    // dispatch(updateUserMetaData(doesExist, portfolioData));
    dispatch({ type: INCREMENT_PAGE_COUNT });
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
          Portfolio Details
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          sx={{ mb: 4 }}
        >
          Fill the following details and click on save to proceed
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Basic Information Section */}
        <Grid item xs={12}>
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
                Basic Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="portfolio-title"
                    label="Portfolio Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mb: 3 }}
                  />

                  <TextField
                    fullWidth
                    id="resume-link"
                    label="Resume Link"
                    variant="outlined"
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <LinkIcon sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="portfolio-description"
                    label="Portfolio Description"
                    multiline
                    rows={6}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Professional Roles Section */}
        <Grid item xs={12}>
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
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h5" component="div" fontWeight="bold">
                  Professional Roles
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={addRole}
                  disabled={roles.length >= 4}
                  size={isMobile ? "small" : "medium"}
                >
                  Add Role
                </Button>
              </Box>

              {roles.length === 0 && (
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
                    No roles added yet. Click the button above to add your
                    professional roles.
                  </Typography>
                </Box>
              )}

              <Grid container spacing={2}>
                {roles.map((role) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={role.id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <WorkIcon sx={{ mr: 1, color: "text.secondary" }} />
                      <TextField
                        fullWidth
                        label="Role"
                        variant="outlined"
                        value={role.text}
                        onChange={(e) =>
                          handleRoleTextChange(
                            role.id,
                            e.target.value.slice(0, 25)
                          )
                        }
                        helperText={role?.text ? `${role.text.length}/25` : ""}
                        FormHelperTextProps={{
                          style: { textAlign: "right", marginTop: "5px" },
                        }}
                      />
                      <IconButton
                        color="error"
                        onClick={() => removeRole(role.id)}
                        edge="end"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Social Media Links Section */}
        <Grid item xs={12}>
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
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h5" component="div" fontWeight="bold">
                  Social Media Links
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={addSocial}
                  disabled={socials.length >= socialMediaOptions.length}
                  size={isMobile ? "small" : "medium"}
                >
                  Add Link
                </Button>
              </Box>

              {socials.length === 0 && (
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
                    No social media links added yet. Click the button above to
                    add your profiles.
                  </Typography>
                </Box>
              )}

              <Grid container spacing={3}>
                {socials.map((social) => (
                  <Grid item xs={12} md={6} key={social.id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Select
                        value={social.selected}
                        onChange={(e) =>
                          handleSelectChange(social.id, e.target.value)
                        }
                        variant="outlined"
                        sx={{ minWidth: 120, mr: 2 }}
                      >
                        {socialMediaOptions
                          .filter(
                            (option) =>
                              !socials
                                .map((s) => s.selected)
                                .includes(option) || option === social.selected
                          )
                          .map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                      </Select>
                      <TextField
                        fullWidth
                        label="URL"
                        variant="outlined"
                        value={social.url}
                        onChange={(e) =>
                          handleUrlChange(social.id, e.target.value)
                        }
                        InputProps={{
                          startAdornment: (
                            <LinkIcon sx={{ mr: 1, color: "text.secondary" }} />
                          ),
                        }}
                      />
                      <IconButton
                        color="error"
                        onClick={() => removeSocial(social.id)}
                        edge="end"
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
        <Button
          variant="contained"
          size="large"
          color="success"
          startIcon={<SaveIcon />}
          onClick={saveMetaData}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            fontSize: "1.1rem",
            boxShadow: 3,
          }}
        >
          Save and Proceed
        </Button>
      </Box>
    </Container>
  );
};

export default UserMetaData;
