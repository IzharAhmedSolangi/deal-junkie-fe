// api.js
import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setRefreshToken,
} from "../storage/storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add access token to requests
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 and refresh token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    const isAuthEndpoint = originalRequest.url.includes("/api/accounts/login/");

    // Only try refresh if it's NOT an auth endpoint and we haven't retried yet
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/accounts/refresh-token/`,
          { refresh_token: getRefreshToken() }
        );
        const newAccessToken = response?.data?.access_token;
        const newRefreshToken = response?.data?.refresh_token;
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // retry original request
      } catch (e) {
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/";
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
