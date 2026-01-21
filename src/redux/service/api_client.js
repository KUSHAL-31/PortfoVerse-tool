import axios from "axios";
import { clearAuthToken, getAuthToken } from "./auth";

const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers || {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthToken();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
