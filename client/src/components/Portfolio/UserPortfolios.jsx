import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPortfolio,
  getAllUserPortfolios,
  getPortfolioDetailById,
} from "../../redux/actions/portfolioActions";
import { SET_CURRENT_PORTFOLIO } from "../../redux/constants";
import { useNavigate } from "react-router-dom";
import { Modal1, Modal2 } from "../../design/modals/Modals";
import "./UserPortfolios.scss";

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
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import WebIcon from "@mui/icons-material/Web";

// Portfolio Card Component
const PortfolioCard = ({ portfolio, onClick }) => {
  const theme = useTheme();

  // Determine icon based on portfolio type (fallback to WebIcon)
  const getPortfolioIcon = () => {
    const type = portfolio.type?.toLowerCase() || "";
    if (type.includes("code") || type.includes("dev")) return <CodeIcon />;
    if (type.includes("design") || type.includes("ui"))
      return <DesignServicesIcon />;
    return <WebIcon />;
  };

  // Get a color for the type chip
  const getTypeColor = () => {
    const type = portfolio.type?.toLowerCase() || "";
    if (type.includes("code") || type.includes("dev")) return "primary";
    if (type.includes("design") || type.includes("ui")) return "secondary";
    return "default";
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
            image={
              (portfolio.logo
                ? portfolio.logo.url
                : `https://source.unsplash.com/random/300x200?creative`) || ""
            }
            alt={portfolio.name || "Project thumbnail"}
            sx={{
              objectFit: "cover",
              filter: "brightness(0.9)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 2,
            }}
          >
            <Chip
              icon={getPortfolioIcon()}
              label={portfolio.type || "Web"}
              size="small"
              color={getTypeColor()}
              sx={{
                fontWeight: "bold",
                backdropFilter: "blur(8px)",
                background: "rgba(255, 255, 255, 0.85)",
              }}
            />
          </Box>

          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: "1.4rem",
              }}
            >
              {portfolio.details.websiteName}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {portfolio.details.websiteUrl}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "auto",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {new Date(
                  portfolio.updatedAt || Date.now()
                ).toLocaleDateString()}
              </Typography>

              <Box sx={{ display: "flex", gap: 0.5 }}>
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
    if (userPortfolios === undefined || userPortfolios.length === 0) {
      dispatch(getAllUserPortfolios());
    } else {
      console.log(userPortfolios);
    }
  }, [dispatch, userPortfolios]);

  const handleModalClick = () => {
    setShowModal(true);
  };

  const handleYesClick = () => {
    dispatch(createNewPortfolio());
    setShowModal(false);
  };

  const handlePortfolioClick = (portfolio) => {
    dispatch({ type: SET_CURRENT_PORTFOLIO, payload: portfolio });
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
        >
          My Portfolio Collection
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            mb: 3,
            maxWidth: 700,
            fontWeight: "normal",
          }}
        >
          Showcasing my creative work, projects, and professional achievements
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
          title={"Only one free portfolio available"}
        />
      )}
    </Container>
  );
};

export default UserPortfolio;
