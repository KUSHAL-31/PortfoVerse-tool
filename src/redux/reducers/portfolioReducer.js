import { createReducer } from "@reduxjs/toolkit";
import { CLEAR_CURRENT_PORTFOLIO, CREATE_NEW_PORTFOLIO_FAILURE, CREATE_NEW_PORTFOLIO_REQUEST, CREATE_NEW_PORTFOLIO_SUCCESS, GET_ALL_USER_PORTFOLIO_FAILURE, GET_ALL_USER_PORTFOLIO_REQUEST, GET_ALL_USER_PORTFOLIO_SUCCESS, SET_CURRENT_PORTFOLIO, GET_PORTFOLIO_DETAILS_REQUEST, GET_PORTFOLIO_DETAILS_SUCCESS, GET_PORTFOLIO_DETAILS_FAILURE, UPDATE_USER_META_DATA_REQUEST, UPDATE_USER_META_DATA_SUCCESS, UPDATE_USER_META_DATA_FAILURE, RESET_ALL_PORTFOLIO_DETAILS, ADD_NEW_EDUCATION, EDIT_EDUCATION, PORTFOLIO_METADATA_REQUEST, PORTFOLIO_METADATA_SUCCESS, PORTFOLIO_METADATA_FAILURE, PORTFOLIO_ALL_EDUCATION_REQUEST, PORTFOLIO_ALL_EDUCATION_SUCCESS, PORTFOLIO_ALL_EDUCATION_FAILURE, PORTFOLIO_ALL_EXPERIENCE_REQUEST, PORTFOLIO_ALL_EXPERIENCE_SUCCESS, PORTFOLIO_ALL_EXPERIENCE_FAILURE, PORTFOLIO_SKILLS_REQUEST, PORTFOLIO_SKILLS_SUCCESS, PORTFOLIO_SKILLS_FAILURE, PORTFOLIO_PROJECTS_REQUEST, PORTFOLIO_PROJECTS_SUCCESS, PORTFOLIO_PROJECTS_FAILURE, PORTFOLIO_SERVICES_REQUEST, PORTFOLIO_SERVICES_SUCCESS, PORTFOLIO_SERVICES_FAILURE, PORTFOLIO_TESTIMONIALS_REQUEST, PORTFOLIO_TESTIMONIALS_SUCCESS, PORTFOLIO_TESTIMONIALS_FAILURE, PAGE_LOADING, PAGE_LOADED } from "../constants";

const initialState = {
  portfolioMetaData: [],
  portfolioEducations: [],
  portfolioExperiences: [],
  portfolioSkills: [],
  portfolioProjects: [],
  portfolioServices: [],
  portfolioTestimonials: [],
  isPageLoading: false,
};

export const portfolioReducer = createReducer(initialState, (builder) => {
    builder.addCase(GET_ALL_USER_PORTFOLIO_REQUEST, (state) => {
        state.portfolioLoading = true;
    });
    builder.addCase(GET_ALL_USER_PORTFOLIO_SUCCESS, (state, action) => {
        state.portfolioLoading = false;
        state.userPortfolios = action.payload;
    });
    builder.addCase(GET_ALL_USER_PORTFOLIO_FAILURE, (state, action) => {
        state.portfolioLoading = false;
        state.userPortfolios = null;
        state.portfolioError = action.payload;
    });
    builder.addCase(CREATE_NEW_PORTFOLIO_REQUEST, (state) => {
        state.portfolioLoading = true;
    });
    builder.addCase(CREATE_NEW_PORTFOLIO_SUCCESS, (state) => {
        state.portfolioLoading = false;
    });
    builder.addCase(CREATE_NEW_PORTFOLIO_FAILURE, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.payload;
    });
    builder.addCase(SET_CURRENT_PORTFOLIO, (state, action) => {
        state.currentPortfolio = action.payload;
    });
    builder.addCase(CLEAR_CURRENT_PORTFOLIO, (state) => {
        state.currentPortfolio = null;
    });
    builder.addCase(GET_PORTFOLIO_DETAILS_REQUEST, (state) => {
        state.portfolioLoading = true;
    });
    builder.addCase(GET_PORTFOLIO_DETAILS_SUCCESS, (state, action) => {
        state.portfolioLoading = false;
        state.portfolio = action.payload.portfolio;
    });
    builder.addCase(GET_PORTFOLIO_DETAILS_FAILURE, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.payload;
    });
    builder.addCase(UPDATE_USER_META_DATA_REQUEST, (state) => {
        state.portfolioLoading = true;
    });
    builder.addCase(UPDATE_USER_META_DATA_SUCCESS, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioMetaData = action.payload;
    });
    builder.addCase(UPDATE_USER_META_DATA_FAILURE, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.payload;
    });
    builder.addCase(RESET_ALL_PORTFOLIO_DETAILS, () => {
        return initialState;
    });
    builder.addCase(PORTFOLIO_METADATA_REQUEST, (state, action) => {
        state.portfolioLoading = true;
    });
    builder.addCase(PORTFOLIO_METADATA_SUCCESS, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioMetaData = action.payload;
    });
    builder.addCase(PORTFOLIO_METADATA_FAILURE, (state, action) => {
        state.portfolioLoading = false;
        state.portfolioError = action.payload;
    });
    builder.addCase(PORTFOLIO_ALL_EDUCATION_REQUEST, (state) => {
      state.portfolioLoading = true;
    });
    builder.addCase(PORTFOLIO_ALL_EDUCATION_SUCCESS, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioEducations = action.payload;
    });
    builder.addCase(PORTFOLIO_ALL_EDUCATION_FAILURE, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioError = action.payload;
    });
    builder.addCase(PORTFOLIO_ALL_EXPERIENCE_REQUEST, (state) => {
      state.portfolioLoading = true;
    });
    builder.addCase(PORTFOLIO_ALL_EXPERIENCE_SUCCESS, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioExperiences = action.payload;
    });
    builder.addCase(PORTFOLIO_ALL_EXPERIENCE_FAILURE, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioError = action.payload;
    });
    builder.addCase(PORTFOLIO_SKILLS_REQUEST, (state) => {
      state.portfolioLoading = true;
    });
    builder.addCase(PORTFOLIO_SKILLS_SUCCESS, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioSkills = action.payload;
    });
    builder.addCase(PORTFOLIO_SKILLS_FAILURE, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioError = action.payload;
    });
    builder.addCase(PORTFOLIO_PROJECTS_REQUEST, (state) => {
      state.portfolioLoading = true;
    });
    builder.addCase(PORTFOLIO_PROJECTS_SUCCESS, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioProjects = action.payload;
    });
    builder.addCase(PORTFOLIO_PROJECTS_FAILURE, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioError = action.payload;
    });
    builder.addCase(PORTFOLIO_SERVICES_REQUEST, (state) => {
      state.portfolioLoading = true;
    });
    builder.addCase(PORTFOLIO_SERVICES_SUCCESS, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioServices = action.payload;
    });
    builder.addCase(PORTFOLIO_SERVICES_FAILURE, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioError = action.payload;
    });
    builder.addCase(PORTFOLIO_TESTIMONIALS_REQUEST, (state) => {
      state.portfolioLoading = true;
    });
    builder.addCase(PORTFOLIO_TESTIMONIALS_SUCCESS, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioTestimonials = action.payload;
    });
    builder.addCase(PORTFOLIO_TESTIMONIALS_FAILURE, (state, action) => {
      state.portfolioLoading = false;
      state.portfolioError = action.payload;
    });
    builder.addCase(PAGE_LOADING, (state) => {
      state.isPageLoading = true;
    });
    builder.addCase(PAGE_LOADED, (state) => {
    state.isPageLoading = false;
    });
});

