import {
  CREATE_NEW_PORTFOLIO_FAILURE,
  CREATE_NEW_PORTFOLIO_REQUEST,
  CREATE_NEW_PORTFOLIO_SUCCESS,
  GET_ALL_USER_PORTFOLIO_FAILURE,
  GET_ALL_USER_PORTFOLIO_REQUEST,
  GET_ALL_USER_PORTFOLIO_SUCCESS,
  GET_PORTFOLIO_DETAILS_FAILURE,
  GET_PORTFOLIO_DETAILS_REQUEST,
  GET_PORTFOLIO_DETAILS_SUCCESS,
  PORTFOLIO_ALL_EDUCATION_FAILURE,
  PORTFOLIO_ALL_EDUCATION_REQUEST,
  PORTFOLIO_ALL_EDUCATION_SUCCESS,
  PORTFOLIO_ALL_EXPERIENCE_FAILURE,
  PORTFOLIO_ALL_EXPERIENCE_REQUEST,
  PORTFOLIO_ALL_EXPERIENCE_SUCCESS,
  PORTFOLIO_METADATA_FAILURE,
  PORTFOLIO_METADATA_REQUEST,
  PORTFOLIO_METADATA_SUCCESS,
  PORTFOLIO_PROJECTS_FAILURE,
  PORTFOLIO_PROJECTS_REQUEST,
  PORTFOLIO_PROJECTS_SUCCESS,
  PORTFOLIO_SERVICES_FAILURE,
  PORTFOLIO_SERVICES_REQUEST,
  PORTFOLIO_SERVICES_SUCCESS,
  PORTFOLIO_SKILLS_FAILURE,
  PORTFOLIO_SKILLS_REQUEST,
  PORTFOLIO_SKILLS_SUCCESS,
  PORTFOLIO_TESTIMONIALS_FAILURE,
  PORTFOLIO_TESTIMONIALS_REQUEST,
  PORTFOLIO_TESTIMONIALS_SUCCESS,
} from "../constants";

import axios from "axios";
import {
  createNewPortfolioUrl,
  getAllUserPortfolioUrl,
  getPortfolioDetailByIdUrl,
  portfolioEducationDetailsUrl,
  portfolioExperienceDetailsUrl,
  portfolioMetaDataUrl,
  portfolioProjectsDetailsUrl,
  portfolioServicesDetailsUrl,
  portfolioSkillsDetailsUrl,
  portfolioTestimonialsDetailsUrl,
} from "../service/api_url";
import store from "../store";

export const getAllUserPortfolios = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_PORTFOLIO_REQUEST });

    // Set `withCredentials` to allow cross-origin cookies
    const { data } = await axios.get(getAllUserPortfolioUrl, {
      withCredentials: true, // This ensures cookies are saved from the response
    });

    dispatch({
      type: GET_ALL_USER_PORTFOLIO_SUCCESS,
      payload: data.portfolios,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_PORTFOLIO_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const createNewPortfolio = () => async (dispatch) => {
  dispatch({ type: CREATE_NEW_PORTFOLIO_REQUEST });
  try {
    const { user } = store.getState().user;
    const username = user.username;
    const headerTitle = user.username;
    const websiteName = username.split(" ").join("-");
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const websiteNameWithDigits = `${websiteName}-${randomDigits}`;
    const websiteUrl = `${
      import.meta.env.VITE_REACT_APP_PORTFOLIO_URL
    }/${websiteNameWithDigits}`;

    // console.log(data);

    dispatch({ type: CREATE_NEW_PORTFOLIO_SUCCESS, payload: data });

    dispatch(getAllUserPortfolios());
  } catch (error) {
    dispatch({
      type: CREATE_NEW_PORTFOLIO_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const getPortfolioDetailById = (portfolioId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PORTFOLIO_DETAILS_REQUEST });
    // Set `withCredentials` to allow cross-origin cookies
    const { data } = await axios.post(
      getPortfolioDetailByIdUrl,
      {
        portfolioId,
      },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );

    dispatch({ type: GET_PORTFOLIO_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PORTFOLIO_DETAILS_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const saveEducationDetails = () => async (dispatch) => {
  const { user } = store.getState().user;
  const { newlyAddedEducations, editedEducations } =
    store.getState().userPortfolio;
  newlyAddedEducations.map((edu) => console.log(edu));
  editedEducations.map((edu) => console.log(edu));
};

export const getPortfolioMetaData = (portfolioId) => async (dispatch) => {
  try {
    dispatch({ type: PORTFOLIO_METADATA_REQUEST });
    // Set `withCredentials` to allow cross-origin cookies
    const { data } = await axios.get(`${portfolioMetaDataUrl}/${portfolioId}`, {
      withCredentials: true, // This ensures cookies are saved from the response
    });
    dispatch({ type: PORTFOLIO_METADATA_SUCCESS, payload: data.userMetaData });
  } catch (error) {
    dispatch({
      type: PORTFOLIO_METADATA_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const getPortfolioEducationDetails =
  (portfolioId) => async (dispatch) => {
    try {
      dispatch({ type: PORTFOLIO_ALL_EDUCATION_REQUEST });
      // Set `withCredentials` to allow cross-origin cookies
      const { data } = await axios.get(
        `${portfolioEducationDetailsUrl}/${portfolioId}`,
        {
          withCredentials: true, // This ensures cookies are saved from the response
        }
      );
      dispatch({
        type: PORTFOLIO_ALL_EDUCATION_SUCCESS,
        payload: data.education,
      });
    } catch (error) {
      dispatch({
        type: PORTFOLIO_ALL_EDUCATION_FAILURE,
        payload: error.response?.data?.message || "An error occurred",
      });
    }
  };

export const getPortfolioExperienceDetails =
  (portfolioId) => async (dispatch) => {
    try {
      dispatch({ type: PORTFOLIO_ALL_EXPERIENCE_REQUEST });
      // Set `withCredentials` to allow cross-origin cookies
      const { data } = await axios.get(
        `${portfolioExperienceDetailsUrl}/${portfolioId}`,
        {
          withCredentials: true, // This ensures cookies are saved from the response
        }
      );
      dispatch({
        type: PORTFOLIO_ALL_EXPERIENCE_SUCCESS,
        payload: data.experience,
      });
    } catch (error) {
      dispatch({
        type: PORTFOLIO_ALL_EXPERIENCE_FAILURE,
        payload: error.response?.data?.message || "An error occurred",
      });
    }
  };

export const getPortfolioSkillsDetails = (portfolioId) => async (dispatch) => {
  try {
    dispatch({ type: PORTFOLIO_SKILLS_REQUEST });
    // Set `withCredentials` to allow cross-origin cookies
    const { data } = await axios.get(
      `${portfolioSkillsDetailsUrl}/${portfolioId}`,
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    dispatch({
      type: PORTFOLIO_SKILLS_SUCCESS,
      payload: data.skills,
    });
  } catch (error) {
    dispatch({
      type: PORTFOLIO_SKILLS_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const getPortfolioProjectsDetails = (portfolioId) => async (dispatch) => {
  console.log(portfolioId);
  try {
    dispatch({ type: PORTFOLIO_PROJECTS_REQUEST});
    // Set `withCredentials` to allow cross-origin cookies
    const { data } = await axios.get(
      `${portfolioProjectsDetailsUrl}/${portfolioId}`,
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    dispatch({
      type: PORTFOLIO_PROJECTS_SUCCESS,
      payload: data.projects,
    });
  } catch (error) {
    dispatch({
      type: PORTFOLIO_PROJECTS_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const getPortfolioServicesDetails = (portfolioId) => async (dispatch) => {
  try {
    dispatch({ type: PORTFOLIO_SERVICES_REQUEST });
    // Set `withCredentials` to allow cross-origin cookies
    const { data } = await axios.get(
      `${portfolioServicesDetailsUrl}/${portfolioId}`,
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    dispatch({
      type: PORTFOLIO_SERVICES_SUCCESS,
      payload: data.services,
    });
  } catch (error) {
    dispatch({
      type: PORTFOLIO_SERVICES_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const getPortfolioTestimonialDetails = (portfolioId) => async (dispatch) => {
  try {
    dispatch({ type: PORTFOLIO_TESTIMONIALS_REQUEST });
    // Set `withCredentials` to allow cross-origin cookies
    const { data } = await axios.get(
      `${portfolioTestimonialsDetailsUrl}/${portfolioId}`,
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    dispatch({
      type: PORTFOLIO_TESTIMONIALS_SUCCESS,
      payload: data.testimonials,
    });
  } catch (error) {
    dispatch({
      type: PORTFOLIO_TESTIMONIALS_FAILURE,
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};
