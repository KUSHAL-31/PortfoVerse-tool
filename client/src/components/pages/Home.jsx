import React from "react";
import PortfolioSteps from "../../components/PortfolioSteps/PortfolioSteps";
import Login from "../../components/Auth/Login";
import { useSelector } from "react-redux";

const Home = () => {
  const { showLoginBox } = useSelector((state) => state.globalReducer);

  return (
    <>
      {showLoginBox && <Login />}
      <PortfolioSteps />
    </>
  );
};

export default Home;
