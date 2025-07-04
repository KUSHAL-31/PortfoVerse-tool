import Header from "./components/Header/Header";
import EditProfile from "./components/pages/EditProfile";
import Home from "./components/pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import UserPortfolio from "./components/Portfolio/UserPortfolios";
import UserProjects from "./components/pages/UserProjects";
import UserSkills from "./components/pages/UserSkills";
import UserServices from "./components/pages/UserServices";
import UserTestimonials from "./components/pages/UserTestimonials";
import UserMetaData from "./components/MetaData/UserMetaData";
import PortfolioWebsiteDetails from "./components/PortfolioWebsiteDetails";
import { CircularProgress } from "@mui/material";

function App() {
  const { loading, authUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser === undefined || !authUser) {
      store.dispatch(loadUser());
    }
    if (authUser) {
      navigate("/view-portfolio");
    }
  }, [authUser]);

  if (loading === undefined || loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute authUser={authUser} />}>
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/view-portfolio" element={<UserPortfolio />} />
          <Route
            exact
            path="/portfolio/details"
            element={<PortfolioWebsiteDetails />}
          />
          <Route exact path="/metadata" element={<UserMetaData />} />
          <Route exact path="/projects" element={<UserProjects />} />
          <Route exact path="/services" element={<UserServices />} />
          <Route exact path="/skills" element={<UserSkills />} />
          <Route exact path="/testimonials" element={<UserTestimonials />} />
          {/* <Route exact path="/education" element={<UserEducations />} /> */}
          {/* <Route exact path="/experience" element={<UserExperiences />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
