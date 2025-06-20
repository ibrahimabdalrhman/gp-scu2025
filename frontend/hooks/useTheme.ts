"use client";
import { getThemeCookie } from "@/libs/darkMode-cookies";
import { useEffect } from "react";


export const useTheme = () => {
  useEffect(() => {
    const savedTheme = getThemeCookie();
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);
};
