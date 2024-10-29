import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPortfolio,
  getAllUserPortfolios,
} from "../../redux/actions/portfolioActions";
import PortfolioCard from "./portfolioCard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import "./UserPortfolios.scss";
import { Dialog } from "@mui/material";
import { SET_CURRENT_PORTFOLIO } from "../../redux/constants";
import { useNavigate } from "react-router-dom";

const UserPortfolio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch({ type: SET_CURRENT_PORTFOLIO, payload: portfolio });
    navigate("/metadata");
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
          <Dialog
            open={showModal}
            className=""
            onClose={() => setShowModal(false)}
          >
            <div className="new-portfolio-modal">
              {userPortfolios.length === 0 ? (
                <>
                  <p>Do you really want to proceed ? </p>
                  <button onClick={handleYesClick} className="btn btn-primary">
                    Yes
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </>
              ) : (
                <>
                  <p>Only one portfolio available </p>
                </>
              )}
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default UserPortfolio;
