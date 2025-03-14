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
import LinkIcon from "@mui/icons-material/Link";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { updateUserMetaData } from "../../redux/actions/userActions";
import { INCREMENT_PAGE_COUNT } from "../../redux/constants";
import { getPortfolioMetaData } from "../../redux/actions/portfolioActions";

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
  const [profileImage, setProfileImage] = useState(null);
  const [isImageEdited, setIsImageEdited] = useState(false);

  // Inside your UserMetaData component, add these state variables:

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

  // Handle image file upload using FileReader (like your example)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        setIsImageEdited(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleRemoveImage = () => {
    setProfileImage(null);
    setIsImageEdited(true); // Mark as edited to indicate the image was removed
  };

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
      // Set the profile image if it exists in metadata
      if (portfolioMetaData?.images.length > 0) {
        setProfileImage(portfolioMetaData.images[0].url);
        setIsImageEdited(false);
      }
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
      image: profileImage,
      isImageEdited: isImageEdited,
    };

    const doesExist = portfolioMetaData !== null ? true : false;

    dispatch(updateUserMetaData(doesExist, portfolioData));
// 
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

        {/* Image Upload Section */}
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
                Portfolio Image
              </Typography>

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      border: "1px dashed",
                      borderColor: "divider",
                      borderRadius: 2,
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: 200,
                      backgroundColor: "background.paper",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {profileImage ? (
                      <Box
                        component="img"
                        src={profileImage}
                        alt="Portfolio Profile"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                    ) : (
                      <Typography color="textSecondary" align="center">
                        No image uploaded yet
                      </Typography>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      height: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body1">
                      Upload a professional image for your portfolio. The
                      recommended size is 800x600 pixels.
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 2 }}
                    >
                      Supported formats: JPG, PNG (max 5MB)
                    </Typography>

                    <input
                      type="file"
                      accept="image/*"
                      id="portfolio-image-upload"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="portfolio-image-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={
                          profileImage ? <AutorenewIcon /> : <CloudUploadIcon />
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                      >
                        {profileImage ? "Change Image" : "Upload Image"}
                      </Button>
                    </label>

                    {profileImage && (
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </Button>
                    )}
                  </Box>
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
                  color="primary"
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
          startIcon={<SaveIcon />}
          onClick={saveMetaData}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            fontSize: "1.1rem",
            boxShadow: 3,
            width: "100%", // Full width/ Align with left edge
          }}
        >
          Save and Proceed
        </Button>
      </Box>
    </Container>
  );
};

export default UserMetaData;
