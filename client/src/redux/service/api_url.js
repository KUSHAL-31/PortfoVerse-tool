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


// User meta data related URLs

export const createUserMetaDataUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/metadata/create`;

export const updateUserMetaDataUrl = `${import.meta.env.VITE_REACT_APP_HOSTED_URL}/api/v1/user/metadata/edit`;