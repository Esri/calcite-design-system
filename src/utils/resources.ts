import { ModeClass, ModeName } from "../components/interfaces";

export const autoMode = "calcite-mode-auto";
export const darkMode = "calcite-mode-dark";
const lightMode = "calcite-mode-light";

interface Mode {
  name: ModeName;
  className: ModeClass;
}

export const MODES: Mode[] = [
  {
    name: "light",
    className: lightMode
  },
  {
    name: "dark",
    className: darkMode
  },
  {
    name: "auto",
    className: autoMode
  }
];

export const CSS_UTILITY = {
  autoMode,
  darkMode,
  lightMode,
  rtl: "calcite--rtl"
};

export const TEXT = {
  loading: "Loading"
};
