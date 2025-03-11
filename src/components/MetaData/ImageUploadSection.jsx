import React, { useState, useEffect, useRef } from "react";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Dialog, 
  DialogContent, 
  Grid, 
  IconButton, 
  Typography, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";

const ImageUploadSection = ({ portfolioMetaData, updateImages }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [images, setImages] = useState([]);
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  
  // Use useRef to prevent infinite re-renders
  const initializedRef = useRef(false);
  const imagesRef = useRef(images);

  // Initialize images from portfolioMetaData if available only once
  useEffect(() => {
    if (!initializedRef.current && 
        portfolioMetaData?.images && 
        portfolioMetaData.images.length > 0 &&
        images.length === 0) {
      
      const initialImages = portfolioMetaData.images.map(img => ({
        public_id : img.public_id,
        url: img.url,
        file: null
      }));
      
      setImages(initialImages);
      imagesRef.current = initialImages;
      initializedRef.current = true;
    }
  }, [portfolioMetaData, images.length]);

  // Update parent component only when images actually change
  useEffect(() => {
    // Compare current images with the previous reference
    const hasChanged = JSON.stringify(images) !== JSON.stringify(imagesRef.current);
    
    if (hasChanged && updateImages && initializedRef.current) {
      // Convert images to the format needed by parent component
      const imageFiles = images
        .filter(img => img.file !== null)
        .map(img => img.file);
      
      const imageUrls = images
        .filter(img => img.url && !img.file)
        .map(img => img.url);
      
      // Update the ref to match current images  
      imagesRef.current = images;
      
      // Call the update function with memoized values
      updateImages(imageFiles, imageUrls);
    }
  }, [images, updateImages]);

  const handleImageUpload = (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    if (images.length >= 2) {
      alert("You can only upload a maximum of 2 images.");
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (loadEvent) => {
      const newImage = { 
        id: Date.now(), 
        url: loadEvent.target.result, 
        file: file 
      };
      
      setImages(prevImages => [...prevImages, newImage]);
    };
    
    reader.readAsDataURL(file);
    
    // Reset input value to allow selecting the same file again
    e.target.value = null;
  };

  const removeImage = (id) => {
    console.log(id)
    setImages(prevImages => prevImages.filter(image => image.id !== id));
  };

  const openImageFullscreen = (image) => {
    setFullscreenImage(image);
    setOpenFullscreen(true);
  };

  const closeFullscreen = () => {
    setOpenFullscreen(false);
  };

  return (
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
              Portfolio Images
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<AddPhotoAlternateIcon />}
              disabled={images.length >= 2}
              size={isMobile ? "small" : "medium"}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Box>

          {images.length === 0 && (
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
                No images uploaded yet. Click the button above to add images to your portfolio (maximum 2).
              </Typography>
            </Box>
          )}

          <Grid container spacing={3}>
            {images.map((image) => (
              <Grid item xs={12} sm={6} key={image.public_id}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    height: 200,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box
                    component="img"
                    src={image.url}
                    alt="Portfolio image"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      display: "flex",
                      p: 1,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openImageFullscreen(image)}
                      sx={{ color: "white", mr: 1 }}
                    >
                      <FullscreenIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => removeImage(image.public_id)}
                      sx={{ color: "white" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: "block", 
                    mt: 1, 
                    color: image.file ? "primary.main" : "text.secondary" 
                  }}
                >
                  {image.file ? "New upload" : "Existing image"}
                </Typography>
              </Grid>
            ))}

            {/* Placeholder for upload slot when there's one image */}
            {images.length === 1 && (
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                    border: `1px dashed ${theme.palette.divider}`,
                    borderRadius: 2,
                    p: 3,
                    cursor: "pointer",
                  }}
                  component="label"
                >
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <ImageIcon 
                    sx={{ 
                      fontSize: 40, 
                      color: "text.secondary",
                      mb: 2 
                    }} 
                  />
                  <Typography 
                    variant="body2" 
                    color="textSecondary"
                    align="center"
                  >
                    Click to add one more image
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="textSecondary">
              * Maximum 2 images allowed. Recommended size: 1200x800 pixels.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Fullscreen Image Dialog */}
      <Dialog
        open={openFullscreen}
        onClose={closeFullscreen}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent 
          sx={{ 
            p: 0, 
            position: "relative",
            height: { xs: "50vh", sm: "70vh" } 
          }}
        >
          {fullscreenImage && (
            <Box
              component="img"
              src={fullscreenImage.url}
              alt="Portfolio image fullscreen"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          )}
          <IconButton
            onClick={closeFullscreen}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default ImageUploadSection;