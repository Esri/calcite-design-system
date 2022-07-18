import { ThemeClass, ThemeName } from "../components/interfaces";

const autoTheme = "calcite-theme-auto";
const darkTheme = "calcite-theme-dark";
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

export const SLOTS = {
  actionsStart: "actions-start",
  actionsEnd: "actions-end"
};

export const CSS = {
  icon: "icon",
  header: "header",
  headerContent: "header-content",
  actionsStart: "actions-start",
  actionsEnd: "actions-end",
  headerText: "header-text",
  heading: "heading",
  description: "description",
  expandIcon: "expand-icon",
  content: "content"
};
