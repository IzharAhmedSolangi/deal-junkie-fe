import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get("access_token", false);
};

export const setAccessToken = (token) => {
  return Cookies.set("access_token", token);
};

export const removeAccessToken = () => {
  return Cookies.remove("access_token");
};

export const getRefreshToken = () => {
  return Cookies.get("refresh_token", false);
};

export const setRefreshToken = (token) => {
  return Cookies.set("refresh_token", token);
};

export const removeRefreshToken = () => {
  return Cookies.remove("refresh_token");
};

export const setLanguage = (language_code) => {
  return Cookies.set("googtrans", language_code);
};

export const getLanguage = () => {
  return Cookies.get("googtrans");
};

export const removeLanguage = () => {
  return Cookies.remove("googtrans");
};
