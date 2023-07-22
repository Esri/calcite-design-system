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
    className: lightMode,
  },
  {
    name: "dark",
    className: darkMode,
  },
  {
    name: "auto",
    className: autoMode,
  },
];

export const CSS_UTILITY = {
  autoMode,
  darkMode,
  lightMode,
  rtl: "calcite--rtl",
  calciteAnimate: "calcite-animate",
  calciteAnimateIn: "calcite-animate__in",
  calciteAnimateInUp: "calcite-animate__in-up",
  calciteAnimateInDown: "calcite-animate__in-down",
  calciteAnimateInRight: "calcite-animate__in-right",
  calciteAnimateInLeft: "calcite-animate__in-left",
  calciteAnimateInScale: "calcite-animate__in-scale",
};

export const TEXT = {
  loading: "Loading",
};
