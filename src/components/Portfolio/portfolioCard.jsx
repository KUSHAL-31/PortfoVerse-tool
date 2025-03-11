import React from "react";
import "./portfolioCard.scss";

const PortfolioCard = ({ portfolio, onClick }) => {
  return (
    <div className="portfolio_card" onClick={() => onClick(portfolio)}>
      {/* <img src={portfolio?.logo?.url} alt="logo" /> */}
      <img src={"https://mittarv.com/assets/EW-1-519eb78f.svg"} alt="logo" />
      <h3>{portfolio?.details?.websiteName}</h3>
      <p>{`Status : ${portfolio?.isPublished ? "live" : "Offline"}`}</p>
    </div>
  );
};

export default PortfolioCard;
