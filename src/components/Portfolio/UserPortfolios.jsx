import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPortfolio,
  getAllUserPortfolios,
  getPortfolioDetailById,
} from "../../redux/actions/portfolioActions";
import {
  RESET_ALL_PORTFOLIO_DETAILS,
  RESET_PAGE_COUNT,
  SET_CURRENT_PORTFOLIO,
} from "../../redux/constants";
import { useNavigate } from "react-router-dom";
import { Modal1, Modal2 } from "../../design/modals/Modals";
import "./UserPortfolios.scss";
import DefaultPortfolioImage from "../../assets/images/default_portfolio.jpg";

// MUI Imports
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Skeleton,
  Fade,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LinkIcon from "@mui/icons-material/Link";

// Portfolio Card Component
const PortfolioCard = ({ portfolio, onClick }) => {
  const [copied, setCopied] = useState(false);

  const isOnline = portfolio.isPublished;

  const handleCopyLink = (e) => {
    e.stopPropagation(); // Prevent the card click event
    navigator.clipboard.writeText(import.meta.env.VITE_REACT_APP_TEMPLATE_URL + portfolio.details.websiteName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation(); // Prevent the card click event
    window.open(
      import.meta.env.VITE_REACT_APP_TEMPLATE_URL +
        portfolio.details.websiteName,
      "_blank"
    );
  };

  return (
    <Fade in={true} timeout={500}>
      <Card
        elevation={4}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 16px 30px rgba(0, 0, 0, 0.15)",
          },
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CardActionArea
          onClick={() => onClick(portfolio)}
          sx={{ height: "100%" }}
        >
          <CardMedia
            component="img"
            height="180"
            image={portfolio.logo ? portfolio.logo.url : DefaultPortfolioImage}
            alt={portfolio.name || "Project thumbnail"}
            sx={{
              objectFit: "cover",
              filter: "brightness(0.9)",
            }}
          />

          <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", sm: "1.4rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {portfolio.details.websiteName}
            </Typography>

            {/* Status indicator */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: isOnline
                    ? "rgba(46, 125, 50, 0.1)"
                    : "rgba(211, 47, 47, 0.1)",
                  borderRadius: "12px",
                  px: 1.5,
                  py: 0.5,
                  maxWidth: "fit-content",
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: isOnline ? "#2e7d32" : "#d32f2f",
                    mr: 0.8,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: isOnline ? "#2e7d32" : "#d32f2f",
                    fontWeight: 500,
                  }}
                >
                  {isOnline ? "Live" : "Offline"}
                </Typography>
              </Box>
            </Box>

            {/* Website URL with hyperlink if online */}
            {isOnline && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="body2"
                  color={isOnline ? "primary.main" : "text.secondary"}
                  sx={{
                    cursor: isOnline ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    mr: 1,
                    maxWidth: "calc(100% - 40px)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  onClick={isOnline ? handleLinkClick : undefined}
                >
                  {import.meta.env.VITE_REACT_APP_TEMPLATE_URL +
                    portfolio.details.websiteName}
                  {isOnline && (
                    <LinkIcon
                      fontSize="small"
                      sx={{ ml: 0.5, fontSize: "1rem", flexShrink: 0 }}
                    />
                  )}
                </Typography>

                {/* Copy button */}
                <Tooltip title={copied ? "Copied!" : "Copy URL"}>
                  <IconButton
                    size="small"
                    onClick={handleCopyLink}
                    sx={{ p: 0.5, flexShrink: 0 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "auto",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                gap: { xs: 1, sm: 0 },
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  order: { xs: 2, sm: 1 },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                {new Date(
                  portfolio.updatedAt || Date.now()
                ).toLocaleDateString()}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  order: { xs: 1, sm: 2 },
                  width: { xs: "100%", sm: "auto" },
                  flexWrap: "wrap",
                  justifyContent: { xs: "flex-start", sm: "flex-end" },
                }}
              >
                {portfolio.tags
                  ?.slice(0, 3)
                  .map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ height: 22, fontSize: "0.7rem" }}
                    />
                  )) || (
                  <Chip
                    label="Portfolio"
                    size="small"
                    variant="outlined"
                    sx={{ height: 22, fontSize: "0.7rem" }}
                  />
                )}
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fade>
  );
};

// Create New Portfolio Card
const CreateNewPortfolioCard = ({ onClick }) => {
  const theme = useTheme();

  return (
    <Fade in={true} timeout={700}>
      <Card
        elevation={3}
        onClick={onClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.3s",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.12)",
            "& .add-icon": {
              transform: "scale(1.1) rotate(90deg)",
            },
          },
          borderRadius: "16px",
          padding: 4,
          background: `linear-gradient(45deg, ${theme.palette.primary.light}22, ${theme.palette.secondary.light}22)`,
          border: `2px dashed ${theme.palette.primary.main}55`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            opacity: 0.07,
            backgroundImage:
              "url('https://source.unsplash.com/random/400x300?creative')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        <AddBoxIcon
          className="add-icon"
          sx={{
            fontSize: 60,
            color: theme.palette.primary.main,
            mb: 2,
            transition:
              "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            zIndex: 1,
          }}
        />

        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          align="center"
          sx={{
            color: theme.palette.text.primary,
            zIndex: 1,
          }}
        >
          Create New Portfolio
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{
            mt: 1,
            maxWidth: "85%",
            zIndex: 1,
          }}
        >
          Showcase your latest creative work and projects
        </Typography>
      </Card>
    </Fade>
  );
};

const UserPortfolio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [showModal, setShowModal] = useState(false);

  const { portfolioLoading, userPortfolios } = useSelector(
    (state) => state.userPortfolio
  );

  useEffect(() => {
    dispatch(getAllUserPortfolios());
  }, []);

  const handleModalClick = () => {
    setShowModal(true);
  };

  const handleYesClick = () => {
    dispatch(createNewPortfolio());
    setShowModal(false);
  };

  const handlePortfolioClick = (portfolio) => {
    dispatch({ type: RESET_ALL_PORTFOLIO_DETAILS });
    dispatch({ type: SET_CURRENT_PORTFOLIO, payload: portfolio });
    dispatch({ type: RESET_PAGE_COUNT });
    dispatch(getPortfolioDetailById(portfolio._id));
    navigate("/portfolio/details");
  };

  // Loading skeletons
  const renderSkeletons = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
          <Skeleton
            variant="rectangular"
            height={280}
            sx={{ borderRadius: 4 }}
            animation="wave"
          />
        </Grid>
      ));
  };

  // Empty state
  const renderEmptyState = () => {
    if (userPortfolios && userPortfolios.length === 0) {
      return (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 3,
            mb: 4,
            borderRadius: 4,
            background: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
          }}
        >
          <DesignServicesIcon
            sx={{
              fontSize: 60,
              color: theme.palette.primary.main,
              mb: 2,
              opacity: 0.7,
            }}
          />
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Start Your Portfolio Journey
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", mb: 3 }}
          >
            Create your first portfolio to showcase your skills and projects.
            Highlight your best work and share it with potential clients or
            employers.
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box
        sx={{
          mb: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          sx={{
            mb: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: isMobile ? "2rem" : "2.5rem",
          }}
          className="text-color-1"
        >
          Your Portfolio Collection
        </Typography>
        <Divider sx={{ width: "100%", mb: 2 }} />
      </Box>

      {renderEmptyState()}

      {portfolioLoading === undefined || portfolioLoading ? (
        <Grid container spacing={4}>
          {renderSkeletons()}
        </Grid>
      ) : (
        <Grid container spacing={4}>
          {userPortfolios &&
            userPortfolios.map((portfolio, index) => (
              <Grid item xs={12} sm={6} md={4} key={portfolio._id || index}>
                <PortfolioCard
                  portfolio={portfolio}
                  onClick={handlePortfolioClick}
                />
              </Grid>
            ))}
          <Grid item xs={12} sm={6} md={4}>
            <CreateNewPortfolioCard onClick={handleModalClick} />
          </Grid>
        </Grid>
      )}

      {userPortfolios && userPortfolios.length === 0 ? (
        <Modal1
          showModal={showModal}
          setShowModal={setShowModal}
          title={"Do you really want to proceed?"}
          button1Text={"Yes"}
          button2Text={"No"}
          onClick1={handleYesClick}
          onClick2={() => setShowModal(false)}
        />
      ) : (
        <Modal2
          showModal={showModal}
          setShowModal={setShowModal}
          title={"Only one free portfolio available. Premium plans coming soon!"}
        />
      )}
    </Container>
  );
};

export default UserPortfolio;
