import React, { useEffect } from "react";
import PortfolioSteps from "../../components/PortfolioSteps/PortfolioSteps";
import Login from "../../components/Auth/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { showLoginBox } = useSelector((state) => state.globalReducer);
  const { authUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/view-portfolio");
    }
  }, [authUser]);

  return (
    <>
      {showLoginBox && <Login />}
      <PortfolioSteps />
    </>
  );
};

export default Home;
