import Cookies from "js-cookie";

const AUTH_COOKIE_NAME = "authToken"; 

export const setAuthCookie = (token : string) => {
  Cookies.set(AUTH_COOKIE_NAME, token, { expires: 30, secure: process.env.NEXT_PUBLIC_NODE_ENV === "production"
  });
};

export const getAuthCookie = () => {
  return Cookies.get(AUTH_COOKIE_NAME) || "";
};

export const removeAuthCookie = () => {
  Cookies.remove(AUTH_COOKIE_NAME);
};

export const isAuthCookieSet = () => {
  return !!Cookies.get(AUTH_COOKIE_NAME);
};
