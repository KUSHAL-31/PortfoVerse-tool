import React, { useState } from "react";
import Header from "../../components/Header/Header";
import PortfolioSteps from "../../components/PortfolioSteps/PortfolioSteps";
import Login from "../../components/Auth/Login";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}

      {/* {showLogin && <Login />} */}
      <Header setShowLogin={setShowLogin} />
      <PortfolioSteps />
    </>
  );
};

export default Home;
