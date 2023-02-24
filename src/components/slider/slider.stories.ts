import { array, boolean as booleanFn, number, select, text } from "@storybook/addon-knobs";
import { boolean, screenshotDelay, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Slider",
  parameters: {
    notes: readme,
    chromatic: {
      // https://www.chromatic.com/docs/threshold
      diffThreshold: Number(process.env.CHROMATIC_DIFF_THRESHOLD) || 0.3,
      delay: screenshotDelay
    }
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-slider
    min="${number("min", 0)}"
    max="${number("max", 100)}"
    value="${number("value", 50)}"
    step="${number("step", 1)}"
    min-label="${text("min-label", "Temperature")}"
    ${boolean("disabled", false)}
    ${boolean("label-handles", false)}
    ${boolean("label-ticks", false)}
    ticks="${number("ticks", 0)}"
    page-step="${number("page-step", 5)}"
    ${boolean("precise", false)}
    ${boolean("mirrored", false)}
    ${boolean("snap", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-slider>
`;

export const range = (): string => html`
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
    ${boolean("mirrored", false)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-slider>
`;

export const darkModeMirroredRange_TestOnly = (): string => html`
  <calcite-slider
    class="calcite-mode-dark"
    mirrored
    min="${number("min", 0)}"
    min-label="${text("min-label", "Temperature, lower bound")}"
    min-value="${number("min-value", 25)}"
    max="${number("max", 100)}"
    max-label="${text("max-label", "Temperature, upper bound")}"
    max-value="${number("max-value", 75)}"
    step="${number("step", 1)}"
    ${boolean("label-handles", true)}
    ${boolean("label-ticks", true)}
    ticks="${number("ticks", 20)}"
    ${boolean("precise", true)}
    ${boolean("snap", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
  ></calcite-slider>
`;

darkModeMirroredRange_TestOnly.story = {
  parameters: { modes: modesDarkDefault }
};

export const rangeLabeledTicks_TestOnly = (): string => html`
  <calcite-slider
    min="${number("min", 5)}"
    min-label="${text("min-label", "Temperature, lower bound")}"
    min-value="${number("min-value", 95)}"
    max="${number("max", 100)}"
    max-label="${text("max-label", "Temperature, upper bound")}"
    max-value="${number("max-value", 100)}"
    step="${number("step", 10)}"
    ${boolean("label-handles", true)}
    ${boolean("label-ticks", true)}
    ${boolean("precise", false)}
    ${boolean("snap", true)}
  ></calcite-slider>
`;

rangeLabeledTicks_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 }
};

export const rangeLabeledTicksOverlappingAtMax_TestOnly = (): string => html`
  <calcite-slider
    min="${number("min", 5)}"
    min-label="${text("min-label", "Temperature, lower bound")}"
    min-value="${number("min-value", 100)}"
    max="${number("max", 100)}"
    max-label="${text("max-label", "Temperature, upper bound")}"
    max-value="${number("max-value", 100)}"
    step="${number("step", 10)}"
    ${boolean("label-handles", true)}
    ${boolean("label-ticks", true)}
    ${boolean("precise", false)}
    ${boolean("snap", true)}
  ></calcite-slider>
`;

rangeLabeledTicksOverlappingAtMax_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 }
};

export const rangeLabeledTicksOverlappingAtMin_TestOnly = (): string => html`
  <calcite-slider
    min="${number("min", 5)}"
    min-label="${text("min-label", "Temperature, lower bound")}"
    min-value="${number("min-value", 5)}"
    max="${number("max", 100)}"
    max-label="${text("max-label", "Temperature, upper bound")}"
    max-value="${number("max-value", 5)}"
    step="${number("step", 10)}"
    ${boolean("label-handles", true)}
    ${boolean("label-ticks", true)}
    ${boolean("precise", false)}
    ${boolean("snap", true)}
  ></calcite-slider>
`;

rangeLabeledTicksOverlappingAtMin_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 }
};

export const rangeLabeledTicksEdgePositioningAtMax_TestOnly = (): string => html`
  <calcite-slider
    min="${number("min", 5)}"
    min-label="${text("min-label", "Temperature, lower bound")}"
    min-value="${number("min-value", 99.5)}"
    max="${number("max", 100)}"
    max-label="${text("max-label", "Temperature, upper bound")}"
    max-value="${number("max-value", 100)}"
    step="${number("step", 10)}"
    ${boolean("label-handles", true)}
    ${boolean("label-ticks", true)}
    ${boolean("precise", false)}
    ${boolean("snap", true)}
  ></calcite-slider>
`;

rangeLabeledTicksEdgePositioningAtMax_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 }
};

export const rangeLabeledTicksEdgePositioningAtMin_TestOnly = (): string => html`
  <calcite-slider
    min="${number("min", 5)}"
    min-label="${text("min-label", "Temperature, lower bound")}"
    min-value="${number("min-value", 5)}"
    max="${number("max", 100)}"
    max-label="${text("max-label", "Temperature, upper bound")}"
    max-value="${number("max-value", 5.5)}"
    step="${number("step", 10)}"
    ${boolean("label-handles", true)}
    ${boolean("label-ticks", true)}
    ${boolean("precise", false)}
    ${boolean("snap", true)}
  ></calcite-slider>
`;

rangeLabeledTicksEdgePositioningAtMin_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 }
};

export const Histogram = (): HTMLCalciteSliderElement => {
  const slider = document.createElement("calcite-slider") as HTMLCalciteSliderElement;
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
    ] as any,
    "  "
  ) as any;
  slider.labelHandles = booleanFn("label-handles", false);
  slider.labelTicks = booleanFn("label-ticks", false);
  slider.ticks = number("ticks", 10);
  slider.precise = booleanFn("precise", false);
  slider.snap = booleanFn("snap", false);
  slider.scale = select("scale", ["s", "m", "l"], "m");
  slider.style.minWidth = "60vw";
  return slider;
};

export const HistogramWithColors = (): HTMLCalciteSliderElement => {
  const slider = document.createElement("calcite-slider") as HTMLCalciteSliderElement;
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
    ] as any,
    "  "
  ) as any;
  slider.style.minWidth = "60vw";
  const colors = array("histogram colors", ["red", "green", "blue"]);
  const offsets = array(
    "histogram color offsets",
    colors.map((_, i) => `${(1 / (colors.length - 1)) * i}`)
  );
  slider.histogramStops = colors.map((color, i) => ({ offset: parseFloat(offsets[i]), color }));
  slider.scale = select("scale", ["s", "m", "l"], "m");
  return slider;
};

export const darkModeHistogramRTL_TestOnly = (): HTMLCalciteSliderElement => {
  const slider = document.createElement("calcite-slider") as HTMLCalciteSliderElement;
  slider.min = number("min", 0);
  slider.minValue = number("min-value", 25);
  slider.max = number("max", 100);
  slider.maxValue = number("max-value", 75);
  slider.histogram = [
    [0, 0],
    [20, 12],
    [40, 25],
    [60, 55],
    [80, 10],
    [100, 0]
  ];
  slider.labelHandles = booleanFn("label-handles", false);
  slider.labelTicks = booleanFn("label-ticks", false);
  slider.ticks = number("ticks", 10);
  slider.precise = booleanFn("precise", false);
  slider.snap = booleanFn("snap", false);
  slider.scale = select("scale", ["s", "m", "l"], "m");
  slider.style.minWidth = "60vw";
  slider.className = "calcite-mode-dark";
  return slider;
};

darkModeHistogramRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-slider disabled value="5"></calcite-slider>`;

export const wordBreakDoesNotAffectLabels_TestOnly = (): string =>
  html`<calcite-slider
    min="-100"
    max="100"
    min-value="-100"
    max-value="100"
    step="10"
    ticks="10"
    label-handles
    label-ticks
    style="word-break: break-all"
  ></calcite-slider>`;

export const WithLabelHandlesAndNoValue_TestOnly = (): string => html` <calcite-slider max="750"></calcite-slider> `;
