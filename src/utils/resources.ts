import { ThemeClass, ThemeName } from "../components/interfaces";

export const autoTheme = "calcite-mode-auto";
export const darkTheme = "calcite-mode-dark";
const lightTheme = "calcite-mode-light";

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
