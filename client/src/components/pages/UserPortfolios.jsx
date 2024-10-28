import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserPortfolios } from "../../redux/actions/portfolioActions";
import PortfolioCard from "../cards/portfolioCard";
import "./Pages.scss";

const UserPortfolio = () => {
  const dispatch = useDispatch();

  const { portfolioLoading, userPortfolios } = useSelector(
    (state) => state.userPortfolio
  );

  useEffect(() => {
    dispatch(getAllUserPortfolios());
  }, []);

  return (
    <div>
      {portfolioLoading === undefined || portfolioLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="portfolio-list">
          {userPortfolios &&
            userPortfolios.map((portfolio, index) => (
              <PortfolioCard key={index} portfolio={portfolio} />
            ))}
          <div className="create-new-portfolio-card">
            <h3>Create New Portfolio</h3>
            <p>Click here to create a new portfolio</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPortfolio;
