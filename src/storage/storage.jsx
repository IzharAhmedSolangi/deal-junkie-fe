import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get("current_session", false);
};

export const setAccessToken = (token) => {
  return Cookies.set("current_session", token, { expires: 7 });
};

export const removeAccessToken = () => {
  return Cookies.remove("current_session");
};

export const getRefreshToken = () => {
  return Cookies.get("refresh_session", false);
};

export const setRefreshToken = (refresh_token) => {
  return Cookies.set("refresh_session", refresh_token, { expires: 7 });
};

export const removeRefreshToken = () => {
  return Cookies.remove("refresh_session");
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
