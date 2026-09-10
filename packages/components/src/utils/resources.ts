import { ModeClass, ModeName } from "../components/types";

/* [Deprecated] in v5.1.3, removal target v7.0.0 - Set the `color-scheme: light dark;` CSS property instead. */
export const autoMode = "calcite-mode-auto";
/* [Deprecated] in v5.1.3, removal target v7.0.0 - Set the `color-scheme: dark;` CSS property instead. */
export const darkMode = "calcite-mode-dark";
/* [Deprecated] in v5.1.3, removal target v7.0.0 - Set the `color-scheme: light;` CSS property instead. */
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
  screenReaderText: "screen-reader-text",
};

export const TEXT = {
  loading: "Loading",
};

export const DEBOUNCE = {
  filter: 250,
  nextTick: 0,
  resize: 150,
  reposition: 100,
};

export const resizeStep = 10;
export const resizeShiftStep = 25;
