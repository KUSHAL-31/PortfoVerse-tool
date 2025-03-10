// API URLs for login, register and user related actions

export const loginUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/login`;

export const registerUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/register`;

export const getUserDetailsUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/details`;

export const userLogoutUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/logout`;

// User portfolio and website related URLs

export const getAllUserPortfolioUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/portfolio/getAll`;

export const createNewPortfolioUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/portfolio/create`;

export const updateNewPortfolioUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/portfolio/update`;

export const getPortfolioDetailByIdUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/portfolio/details`;

export const portfolioMetaDataUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/metadata/details`;

export const portfolioEducationDetailsUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/education/getAll`;

export const portfolioExperienceDetailsUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/experience/getAll`;

export const portfolioSkillsDetailsUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/skills/getAll`;

export const portfolioProjectsDetailsUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/projects/getAll`;

export const portfolioTestimonialsDetailsUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/testimonials/getAll`;

export const portfolioServicesDetailsUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/services/getAll`;


// User meta data related URLs

export const createUserMetaDataUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/metadata/create`;

export const updateUserMetaDataUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/metadata/edit`;
