import { ThemeClass, ThemeName } from "../components/interfaces";

export const autoTheme = "calcite-theme-auto";
export const darkTheme = "calcite-theme-dark";
const lightTheme = "calcite-theme-light";

interface Theme {
  name: ThemeName;
  className: ThemeClass;
}

export const THEMES: Theme[] = [
  {
    name: "light",
    className: lightTheme
  },
  {
    name: "dark",
    className: darkTheme
  },
  {
    name: "auto",
    className: autoTheme
  }
];

export const CSS_UTILITY = {
  autoTheme,
  darkTheme,
  lightTheme,
  rtl: "calcite--rtl"
};

export const TEXT = {
  loading: "Loading"
};
