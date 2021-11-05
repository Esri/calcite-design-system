import { text, number, array, boolean as booleanFn } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Controls/Slider",

  parameters: {
    notes: readme
  }
};

export const SingleValue = (): string => html`
  <calcite-slider
    min="${number("min", 0)}"
    max="${number("max", 100)}"
    value="${number("value", 50)}"
    step="${number("step", 1)}"
    label="${text("label", "Temperature")}"
    ${boolean("disabled", false)}
    ${boolean("label-handles", false)}
    ${boolean("label-ticks", false)}
    ticks="${number("ticks", 0)}"
    page-step="${number("page-step", 5)}"
    ${boolean("precise", false)}
    ${boolean("snap", true)}
  ></calcite-slider>
`;

SingleValue.story = {
  name: "Single value"
};

export const Range = (): string => html`
  <calcite-slider
    min="${number("min", 0)}"
    min-label="${text("min-label", "Temperature, lower bound")}"
    min-value="${number("min-value", 25)}"
    max="${number("max", 100)}"
    max-label="${text("max-label", "Temperature, upper bound")}"
    max-value="${number("max-value", 75)}"
    step="${number("step", 1)}"
    ${boolean("label-handles", false)}
    ${boolean("label-ticks", false)}
    ticks="${number("ticks", 20)}"
    ${boolean("precise", false)}
    ${boolean("snap", true)}
  ></calcite-slider>
`;

export const RangeLabeledTicks = (): string => html`
  <calcite-slider
    min="${number("min", 5)}"
    min-label="${text("min-label", "Temperature, lower bound")}"
    min-value="${number("min-value", 95)}"
    max="${number("max", 100)}"
    max-label="${text("max-label", "Temperature, upper bound")}"
    max-value="${number("max-value", 75)}"
    step="${number("step", 10)}"
    ${boolean("label-handles", false)}
    ${boolean("label-ticks", true)}
    ${boolean("precise", false)}
    ${boolean("snap", true)}
  ></calcite-slider>
`;

export const Histogram = (): HTMLCalciteSliderElement => {
  const slider = document.createElement("calcite-slider");
  slider.min = number("min", -100);
  slider.minValue = number("min-value", -33.32);
  slider.max = number("max", 100);
  slider.maxValue = number("max-value", 30.87);
  slider.histogram = array(
    "histogram",
    [
      [-90, 0],
      [-60, 12],
      [-20, 25],
      [20, 55],
      [60, 10],
      [90, 0]
    ],
    "  "
  );
  slider.labelHandles = booleanFn("label-handles", false);
  slider.labelTicks = booleanFn("label-ticks", false);
  slider.ticks = number("ticks", 10);
  slider.precise = booleanFn("precise", false);
  slider.snap = booleanFn("snap", false);
  slider.style.minWidth = "60vw";
  return slider;
};

export const HistogramWithColors = (): HTMLCalciteSliderElement => {
  const slider = document.createElement("calcite-slider");
  slider.min = number("min", 0);
  slider.minValue = number("min-value", 35);
  slider.max = number("max", 100);
  slider.maxValue = number("max-value", 55);
  slider.histogram = array(
    "histogram",
    [
      [0, 0],
      [20, 12],
      [40, 25],
      [60, 55],
      [80, 10],
      [100, 0]
    ],
    "  "
  );
  slider.style.minWidth = "60vw";
  const colors = array("histogram colors", ["red", "green", "blue"]);
  const offsets = array(
    "histogram color offsets",
    colors.map((_, i) => `${(1 / (colors.length - 1)) * i}`)
  );
  slider.histogramStops = colors.map((color, i) => ({ offset: parseFloat(offsets[i]), color }));
  return slider;
};

export const DarkMode = (): string => html`
  <calcite-slider min="0" max="100" value="50" step="1" label="Temperature" class="calcite-theme-dark"></calcite-slider>
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { themes: themesDarkDefault }
};

export const HistogramDark = (): HTMLCalciteSliderElement => {
  const slider = document.createElement("calcite-slider");
  slider.min = number("min", 0);
  slider.minValue = number("min-value", 25);
  slider.max = number("max", 100);
  slider.maxValue = number("max-value", 75);
  slider.histogram = array(
    "histogram",
    [
      [0, 0],
      [20, 12],
      [40, 25],
      [60, 55],
      [80, 10],
      [100, 0]
    ],
    "  "
  );
  slider.labelHandles = booleanFn("label-handles", false);
  slider.labelTicks = booleanFn("label-ticks", false);
  slider.ticks = number("ticks", 10);
  slider.precise = booleanFn("precise", false);
  slider.snap = booleanFn("snap", false);
  slider.style.minWidth = "60vw";
  slider.className = "calcite-theme-dark";
  return slider;
};

HistogramDark.story = {
  name: "Histogram Dark theme",
  parameters: { themes: themesDarkDefault }
};
