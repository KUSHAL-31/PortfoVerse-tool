const tokenKey = "authToken";

export const getAuthToken = () => localStorage.getItem(tokenKey);

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(tokenKey, token);
  }
};

export const clearAuthToken = () => {
  localStorage.removeItem(tokenKey);
};

export const getAuthConfig = () => {
  const token = getAuthToken();
  if (!token) {
    return {};
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
