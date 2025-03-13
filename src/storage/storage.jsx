import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get("current-session", false);
};

export const setAccessToken = (token) => {
  return Cookies.set("current-session", token);
};

export const removeAccessToken = () => {
  return Cookies.remove("current-session");
};

export const getRefreshToken = () => {
  return Cookies.get("refresh-session", false);
};

export const setRefreshToken = (token) => {
  return Cookies.set("refresh-session", token);
};

export const removeRefreshToken = () => {
  return Cookies.remove("refresh-session");
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
