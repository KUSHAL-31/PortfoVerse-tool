// API URLs for login, register and user related actions

export const loginUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/login`;

export const registerUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/register`;

export const getUserDetailsUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/details`;

export const userLogoutUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/logout`;

// User portfolio and website related URLs

export const getAllUserPortfolioUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/portfolio/getAll`;