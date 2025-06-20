import Cookies from "js-cookie";

const THEME_COOKIE_NAME = "theme"; 

export const setThemeCookie = (theme: "light" | "dark"): void => {
  Cookies.set(THEME_COOKIE_NAME, theme);
};


export const getThemeCookie = (): "light" | "dark" | null => {
  const theme = Cookies.get(THEME_COOKIE_NAME);
  if (theme === "light" || theme === "dark") {
    return theme;
  }
  return null;
};


export const removeThemeCookie = (): void => {
  Cookies.remove(THEME_COOKIE_NAME);
};

export const isThemeCookieSet = (): boolean => {
  return !!Cookies.get(THEME_COOKIE_NAME);
};
