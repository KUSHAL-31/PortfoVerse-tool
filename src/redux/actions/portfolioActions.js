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
  PAGE_LOADED,
  PAGE_LOADING,
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
  addNewEducationUrl,
  addNewExperienceUrl,
  addNewProjectsUrl,
  addNewServicesUrl,
  addNewSkillsUrl,
  addNewTestimonialsUrl,
  createNewPortfolioUrl,
  deleteEducationUrl,
  deleteExperienceUrl,
  deleteProjectsUrl,
  deleteServicesUrl,
  deleteSkillsUrl,
  deleteTestimonialsUrl,
  editEducationUrl,
  editExperienceUrl,
  editProjectsUrl,
  editServicesUrl,
  editSkillsUrl,
  editTestimonialsUrl,
  editWebsiteDetailsUrl,
  getAllUserPortfolioUrl,
  getPortfolioDetailByIdUrl,
  isWebsiteNameAvailableUrl,
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
  console.log("Creating new portfolio");
  dispatch({ type: CREATE_NEW_PORTFOLIO_REQUEST });
  try {
    const { user } = store.getState().user;
    const username = user.username;
    const headerTitle = user.username;
    const websiteName = username.split(" ").join("-");
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const websiteNameWithDigits = `${websiteName}-${randomDigits}`;

    // console.log(data);

    const data = {
      headerTitle,
      websiteName: websiteNameWithDigits,
    };

    await axios.post(createNewPortfolioUrl, data, {
      withCredentials: true, // This ensures cookies are saved from the response
    });
    
    dispatch({ type: CREATE_NEW_PORTFOLIO_SUCCESS });

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
    console.log("Skills", data);
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

export const getPortfolioProjectsDetails =
  (portfolioId) => async (dispatch) => {
    console.log(portfolioId);
    try {
      dispatch({ type: PORTFOLIO_PROJECTS_REQUEST });
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

export const getPortfolioServicesDetails =
  (portfolioId) => async (dispatch) => {
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

export const getPortfolioTestimonialDetails =
  (portfolioId) => async (dispatch) => {
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

export const addNewEducation = (education) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  console.log("Education", education);
  try {
    const { data } = await axios.post(
      `${addNewEducationUrl}`,
      { ...education, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    console.log("Data", data);
    if (data.success) {
      dispatch(getPortfolioEducationDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    console.log("Error", error);
  }
};

export const editEducation = (education) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.patch(
      `${editEducationUrl}`,
      { ...education, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioEducationDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
};

export const deleteEducation = (educationId) => async (dispatch) => {
  const { currentPortfolio } = store.getState().userPortfolio;
  dispatch({ type: PAGE_LOADING });
  try {
    const { data } = await axios.post(
      `${deleteEducationUrl}`,
      { educationIds: [educationId], portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    console.log("Data", data);
    if (data.success) {
      dispatch(getPortfolioEducationDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
};


export const addNewExperience = (experience) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  console.log("Experience", experience);
  try {
    const { data } = await axios.post(
      `${addNewExperienceUrl}`,
      { ...experience, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioExperienceDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    console.log("Error", error);
  }
}

export const editExperience = (experience) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.patch(
      `${editExperienceUrl}`,
      { ...experience, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioExperienceDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}

export const deleteExperience = (experienceId) => async (dispatch) => {
  const { currentPortfolio } = store.getState().userPortfolio;
  dispatch({ type: PAGE_LOADING });
  try {
    const { data } = await axios.post(
      `${deleteExperienceUrl}`,
      { experienceId, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    console.log("Data", data);
    if (data.success) {
      dispatch(getPortfolioExperienceDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}


export const addNewSkillSection = (skillSection) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.post(
      `${addNewSkillsUrl}`,
      { ...skillSection, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioSkillsDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    console.log("Error", error);
  }
}

export const editSkillSection = (skillSection) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.patch(
      `${editSkillsUrl}`,
      { ...skillSection, portfolioId: currentPortfolio._id, skillId : skillSection.id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioSkillsDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}

export const deleteSkillSection = (skillId) => async (dispatch) => {
  const { currentPortfolio } = store.getState().userPortfolio;
  dispatch({ type: PAGE_LOADING });
  try {
    const { data } = await axios.post(
      `${deleteSkillsUrl}`,
      { skillId, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    console.log("Data", data);
    if (data.success) {
      dispatch(getPortfolioSkillsDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}

export const addNewProjectSection = (project) => async (dispatch) => { 
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.post(
      `${addNewProjectsUrl}`,
      { ...project, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioProjectsDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    console.log("Error", error);
  }
}

export const editProjectSection = (project) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.patch(
      `${editProjectsUrl}`,
      { ...project, portfolioId: currentPortfolio._id, projectId : project.id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioProjectsDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}

export const deleteProjectSection = (projectId) => async (dispatch) => {
  const { currentPortfolio } = store.getState().userPortfolio;
  dispatch({ type: PAGE_LOADING });
  try {
    const { data } = await axios.post(
      `${deleteProjectsUrl}`,
      { projectId, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    console.log("Data", data);
    if (data.success) {
      dispatch(getPortfolioProjectsDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}


export const addNewServiceSection = (service) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.post(
      `${addNewServicesUrl}`,
      { ...service, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioServicesDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    console.log("Error", error);
  }
}

export const editServiceSection = (service) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.patch(
      `${editServicesUrl}`,
      { ...service, portfolioId: currentPortfolio._id, serviceId : service.id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioServicesDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}

export const deleteServiceSection = (serviceId) => async (dispatch) => {
  const { currentPortfolio } = store.getState().userPortfolio;
  dispatch({ type: PAGE_LOADING });
  try {
    const { data } = await axios.post(
      `${deleteServicesUrl}`,
      { serviceId, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    console.log("Data", data);
    if (data.success) {
      dispatch(getPortfolioServicesDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}

export const addNewTestimonialSection = (testimonial) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.post(
      `${addNewTestimonialsUrl}`,
      { ...testimonial, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    console.log("Data", data);
    if (data.success) {
      dispatch(getPortfolioTestimonialDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    console.log("Error", error);
  }
}

export const editTestimonialSection = (testimonial) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.patch(
      `${editTestimonialsUrl}`,
      { ...testimonial, portfolioId: currentPortfolio._id, testimonialId : testimonial.id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioTestimonialDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}

export const deleteTestimonialSection = (testimonialId) => async (dispatch) => {
  const { currentPortfolio } = store.getState().userPortfolio;
  dispatch({ type: PAGE_LOADING });
  try {
    const { data } = await axios.post(
      `${deleteTestimonialsUrl}`,
      { testimonialId, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    console.log("Data", data);
    if (data.success) {
      dispatch(getPortfolioTestimonialDetails(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}

export const editWebsiteDetails = (websiteDetails) => async (dispatch) => {
  dispatch({ type: PAGE_LOADING });
  const { currentPortfolio } = store.getState().userPortfolio;
  try {
    const { data } = await axios.post(
      `${editWebsiteDetailsUrl}`,
      { ...websiteDetails, portfolioId: currentPortfolio._id },
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    if (data.success) {
      dispatch(getPortfolioMetaData(currentPortfolio._id));
    }
    dispatch({ type: PAGE_LOADED });
  } catch (error) {
    dispatch({ type: PAGE_LOADED });
    console.log("Error", error);
  }
}

export const checkWebsiteNameAvailability = (websiteName) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${isWebsiteNameAvailableUrl}?websiteName=${websiteName}`,
      {
        withCredentials: true, // This ensures cookies are saved from the response
      }
    );
    return data.isAvailable;
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};