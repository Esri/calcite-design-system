import { ModeClass, ModeName } from "../components/types";

/**
 * Uses the user's preferred color scheme.
 *
 * @deprecated in v5.2.0, removal target v7.0.0. Use the CSS `color-scheme` property to set the theme.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
 */
export const autoMode = "calcite-mode-auto";
/**
 * Uses the dark color scheme.
 *
 * @deprecated in v5.2.0, removal target v7.0.0. Use the CSS `color-scheme` property to set the theme.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
 */
export const darkMode = "calcite-mode-dark";
/**
 * Uses the light color scheme.
 *
 * @deprecated in v5.2.0, removal target v7.0.0. Use the CSS `color-scheme` property to set the theme.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
 */
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
