import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPortfolio,
  getAllUserPortfolios,
  getPortfolioDetailById,
} from "../../redux/actions/portfolioActions";
import PortfolioCard from "./portfolioCard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "./UserPortfolios.scss";
import { Dialog } from "@mui/material";
import { RESET_PAGE_COUNT, SET_CURRENT_PORTFOLIO } from "../../redux/constants";
import { useNavigate } from "react-router-dom";
import { Modal1, Modal2 } from "../../design/modals/Modals";

const UserPortfolio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const { portfolioLoading, userPortfolios } = useSelector(
    (state) => state.userPortfolio
  );

  useEffect(() => {
    if (userPortfolios === undefined || userPortfolios.length === 0) {
      dispatch(getAllUserPortfolios());
    }
  }, []);

  const handleModalClick = () => {
    setShowModal(true);
  };

  const handleYesClick = () => {
    dispatch(createNewPortfolio());
    setShowModal(false);
  };

  const handlePortfolioClick = (portfolio) => {
    // dispatch({ type: RESET_PAGE_COUNT });
    dispatch({ type: SET_CURRENT_PORTFOLIO, payload: portfolio });
    dispatch(getPortfolioDetailById(portfolio._id));
    navigate("/portfolio/details");
  };

  return (
    <div>
      {portfolioLoading === undefined || portfolioLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="portfolio-list">
          {userPortfolios &&
            userPortfolios.map((portfolio, index) => (
              <PortfolioCard
                key={index}
                portfolio={portfolio}
                onClick={handlePortfolioClick}
              />
            ))}
          <div className="create-new-portfolio" onClick={handleModalClick}>
            <AddBoxIcon className="create-new-portfolio-icon" />
            <h3>New</h3>
            <p>Click here to create a new portfolio</p>
          </div>
          {userPortfolios.length === 0 ? (
            <Modal1
              showModal={showModal}
              setShowModal={setShowModal}
              title={"Do you really want to proceed ?"}
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
        </div>
      )}
    </div>
  );
};

export default UserPortfolio;
