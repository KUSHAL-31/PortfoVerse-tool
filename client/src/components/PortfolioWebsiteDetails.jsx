import React from "react";
import UserMetaData from "./MetaData/UserMetaData";
import UserSkills from "./pages/UserSkills";
import UserProjects from "./pages/UserProjects";
import UserTestimonials from "./pages/UserTestimonials";
import UserExpAndEdu from "./pages/UserExpAndEdu";
import UserWebsite from "./pages/UserWebsite";
import CreatePortfolioSteps from "./PortfolioSteps/CreatePortfolioSteps";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
import UserServices from "./pages/UserServices";

const PortfolioWebsiteDetails = () => {
  // const dispatch = useDispatch();
  const { pageCount } = useSelector((state) => state.globalReducer);

  const pages = [
    <UserMetaData />,
    <UserExpAndEdu />,
    <UserSkills />,
    <UserProjects />,
    <UserServices />,
    <UserTestimonials />,
    <UserExpAndEdu />,
    <UserWebsite />,
  ];

  return (
    <div>
      <CreatePortfolioSteps activeStep={pageCount - 1} />
      {pages[pageCount - 1]}
    </div>
  );
};

export default PortfolioWebsiteDetails;
