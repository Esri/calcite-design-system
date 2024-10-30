import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Slider } from "./slider";
const { scale } = ATTRIBUTES;

interface SliderStoryArgs
  extends Pick<
    Slider,
    | "min"
    | "max"
    | "value"
    | "step"
    | "minLabel"
    | "disabled"
    | "labelHandles"
    | "labelTicks"
    | "ticks"
    | "pageStep"
    | "precise"
    | "mirrored"
    | "snap"
    | "scale"
    | "layout"
  > {
  temperature: string;
}

export default {
  title: "Components/Controls/Slider",
  args: {
    min: 0,
    max: 100,
    value: 50,
    step: 1,
    minLabel: "Temperature",
    disabled: false,
    labelHandles: false,
    labelTicks: false,
    ticks: 0,
    pageStep: 5,
    precise: false,
    mirrored: false,
    snap: true,
    scale: scale.defaultValue,
    layout: "horizontal",
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      // https://www.chromatic.com/docs/threshold
      diffThreshold: Number(process.env.CHROMATIC_DIFF_THRESHOLD) || 0.3,
      delay: 500,
    },
  },
};

const verticalAdjustment = "padding-top: 200px; padding-left: 100px; height: 200px";

export const simple = (args: SliderStoryArgs): string => html`
  <calcite-slider
    min="${args.min}"
    max="${args.max}"
    value="${args.value}"
    step="${args.step}"
    min-label="${args.minLabel}"
    ${boolean("disabled", args.disabled)}
    ${boolean("label-handles", args.labelHandles)}
    ${boolean("label-ticks", args.labelTicks)}
    ticks="${args.ticks}"
    page-step="${args.pageStep}"
    ${boolean("precise", args.precise)}
    ${boolean("mirrored", args.mirrored)}
    ${boolean("snap", args.snap)}
    scale="${args.scale}"
    layout="${args.layout}"
  ></calcite-slider>
`;

export const range = (): string => html`
  <calcite-slider
    min="0"
    min-label="Temperature, lower bound"
    min-value="25"
    max="100"
    max-label="Temperature, upper bound"
    max-value="75"
    step="1"
    ticks="20"
    snap
    scale="m"
    layout="horizontal"
  ></calcite-slider>
  <calcite-slider
    min="0"
    min-label="Temperature, lower bound"
    min-value="25"
    max="100"
    max-label="Temperature, upper bound"
    max-value="75"
    step="1"
    ticks="20"
    snap
    scale="m"
    layout="vertical"
    style="${verticalAdjustment}"
  ></calcite-slider>
`;

export const darkModeMirroredRange_TestOnly = (): string => html`
  <calcite-slider
    class="calcite-mode-dark"
    mirrored
    min="0"
    min-label="Temperature, lower bound"
    min-value="25"
    max="100"
    max-label="Temperature, upper bound"
    max-value="75"
    step="1"
    label-handles
    label-ticks
    ticks="20"
    precise
    snap
    scale="m"
  ></calcite-slider>
  <calcite-slider
    class="calcite-mode-dark"
    mirrored
    min="0"
    min-label="Temperature, lower bound"
    min-value="25"
    max="100"
    max-label="Temperature, upper bound"
    max-value="75"
    step="1"
    label-handles
    label-ticks
    ticks="20"
    precise
    snap
    scale="m"
    layout="vertical"
    style="${verticalAdjustment}"
  ></calcite-slider>
`;

darkModeMirroredRange_TestOnly.story = {
  parameters: { themes: modesDarkDefault },
};

export const rangeLabeledTicks_TestOnly = (): string => html`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="95"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
    layout="horizontal"
  ></calcite-slider>
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="95"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
    layout="vertical"
    style="${verticalAdjustment}"
  ></calcite-slider>
`;

rangeLabeledTicks_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

export const rangeLabeledTicksOverlappingAtMax_TestOnly = (): string => html`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="100"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="100"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
    layout="vertical"
    style="${verticalAdjustment}"
  ></calcite-slider>
`;

rangeLabeledTicksOverlappingAtMax_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

export const rangeLabeledTicksOverlappingAtMin_TestOnly = (): string => html`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="5"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="5"
    step="10"
    label-handles
    label-ticks
    snap
    layout="vertical"
    style="${verticalAdjustment}"
  ></calcite-slider>
`;

rangeLabeledTicksOverlappingAtMin_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

export const rangeLabeledTicksEdgePositioningAtMax_TestOnly = (): string => html`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="99.5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="99.5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
    layout="vertical"
    style="${verticalAdjustment}"
  ></calcite-slider>
`;

rangeLabeledTicksEdgePositioningAtMax_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

export const rangeLabeledTicksEdgePositioningAtMin_TestOnly = (): string => html`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="5.5"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="5.5"
    step="10"
    label-handles
    label-ticks
    snap
    layout="vertical"
    style="${verticalAdjustment}"
  ></calcite-slider>
`;

rangeLabeledTicksEdgePositioningAtMin_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

export const Histogram = (): HTMLDivElement => {
  const div = document.createElement("div");
  const slider = document.createElement("calcite-slider");
  slider.min = -100;
  slider.minValue = -33.32;
  slider.max = 100;
  slider.maxValue = 30.87;
  slider.histogram = [
    [-90, 0],
    [-60, 12],
    [-20, 25],
    [20, 55],
    [60, 10],
    [90, 0],
  ] as any;
  slider.ticks = 10;
  slider.scale = "m";
  slider.style.minWidth = "60vw";
  div.appendChild(slider);
  const sliderVertical = document.createElement("calcite-slider");
  sliderVertical.min = -100;
  sliderVertical.minValue = -33.32;
  sliderVertical.max = 100;
  sliderVertical.maxValue = 30.87;
  sliderVertical.histogram = [
    [-90, 0],
    [-60, 12],
    [-20, 25],
    [20, 55],
    [60, 10],
    [90, 0],
  ] as any;
  sliderVertical.ticks = 10;
  sliderVertical.scale = "m";
  sliderVertical.style.minWidth = "60vw";
  sliderVertical.style.paddingTop = "350px";
  sliderVertical.style.paddingLeft = "100px";
  sliderVertical.style.height = "600px";
  sliderVertical.layout = "vertical";
  div.appendChild(sliderVertical);
  return div;
};

export const HistogramWithColors = (): HTMLDivElement => {
  const div = document.createElement("div");
  const slider = document.createElement("calcite-slider");
  slider.min = 0;
  slider.minValue = 35;
  slider.max = 100;
  slider.maxValue = 55;
  slider.histogram = [
    [0, 0],
    [20, 12],
    [40, 25],
    [60, 55],
    [80, 10],
    [100, 0],
  ] as any;
  slider.style.minWidth = "60vw";
  const colors = ["red", "green", "blue"];
  const offsets = colors.map((_, i) => `${(1 / (colors.length - 1)) * i}`);
  slider.histogramStops = colors.map((color, i) => ({ offset: parseFloat(offsets[i]), color }));
  slider.scale = "m";
  div.appendChild(slider);
  const sliderVertical = document.createElement("calcite-slider");
  sliderVertical.min = 0;
  sliderVertical.minValue = 35;
  sliderVertical.max = 100;
  sliderVertical.maxValue = 55;
  sliderVertical.histogram = [
    [0, 0],
    [20, 12],
    [40, 25],
    [60, 55],
    [80, 10],
    [100, 0],
  ] as any;
  sliderVertical.style.minWidth = "60vw";
  sliderVertical.histogramStops = colors.map((color, i) => ({ offset: parseFloat(offsets[i]), color }));
  sliderVertical.scale = "m";
  sliderVertical.style.paddingTop = "350px";
  sliderVertical.style.paddingLeft = "100px";
  sliderVertical.style.height = "600px";
  sliderVertical.layout = "vertical";
  div.appendChild(sliderVertical);
  return div;
};

export const darkModeHistogramRTL_TestOnly = (): HTMLDivElement => {
  const div = document.createElement("div");
  const slider = document.createElement("calcite-slider");
  slider.min = 0;
  slider.minValue = 25;
  slider.max = 100;
  slider.maxValue = 75;
  slider.histogram = [
    [0, 0],
    [20, 12],
    [40, 25],
    [60, 55],
    [80, 10],
    [100, 0],
  ];
  slider.ticks = 10;
  slider.scale = "m";
  slider.style.minWidth = "60vw";
  slider.className = "calcite-mode-dark";
  div.appendChild(slider);
  const sliderVertical = document.createElement("calcite-slider");
  sliderVertical.min = 0;
  sliderVertical.minValue = 25;
  sliderVertical.max = 100;
  sliderVertical.maxValue = 75;
  sliderVertical.histogram = [
    [0, 0],
    [20, 12],
    [40, 25],
    [60, 55],
    [80, 10],
    [100, 0],
  ];
  sliderVertical.ticks = 10;
  sliderVertical.scale = "m";
  sliderVertical.style.minWidth = "60vw";
  sliderVertical.className = "calcite-mode-dark";
  sliderVertical.style.paddingTop = "350px";
  sliderVertical.style.paddingLeft = "100px";
  sliderVertical.style.height = "600px";
  sliderVertical.layout = "vertical";
  div.appendChild(sliderVertical);
  return div;
};

darkModeHistogramRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const disabled_TestOnly = (): string =>
  html`<calcite-slider disabled value="5"></calcite-slider>
    <calcite-slider disabled value="5" layout="vertical" style="${verticalAdjustment}"></calcite-slider>`;

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
    ></calcite-slider>
    <calcite-slider
      min="-100"
      max="100"
      min-value="-100"
      max-value="100"
      step="10"
      ticks="10"
      label-handles
      label-ticks
      style="word-break: break-all; ${verticalAdjustment}"
      layout="vertical"
    ></calcite-slider>`;

export const WithLabelHandlesAndNoValue_TestOnly = (): string =>
  html` <calcite-slider max="750"></calcite-slider>
    <calcite-slider max="750" layout="vertical" style="${verticalAdjustment}"></calcite-slider>`;

export const WithLargeFontSize_TestOnly = (): string =>
  html`<html lang="en">
    <head>
      <style>
        html {
          font-size: 24px;
        }
        calcite-label {
          padding: 10px;
        }
        calcite-slider[layout="vertical"] {
          height: 100px;
          margin-top: 90px;
        }
        div.container {
          display: flex;
        }
        div.side {
          flex: 1;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="side">
          <div style="width: 200px; padding: 20px">
            <calcite-label>
              precise with label-handles
              <calcite-slider scale="s" min="10" max="100" value="50" step="10" precise label-handles></calcite-slider
            ></calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              precise with label-handles mirrored
              <calcite-slider
                scale="s"
                min="10"
                max="100"
                value="50"
                step="10"
                label-handles
                precise
                mirrored
              ></calcite-slider>
            </calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              precise with label-handles & label-ticks
              <calcite-slider
                min="0"
                max="100"
                value="40"
                step="10"
                ticks="10"
                scale="s"
                label-handles
                label-ticks
                precise
              ></calcite-slider>
            </calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              precise with label-handles & label-ticks mirrored
              <calcite-slider
                min="0"
                max="100"
                value="40"
                step="10"
                ticks="10"
                scale="s"
                label-handles
                precise
                mirrored
                label-ticks
              ></calcite-slider>
            </calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              range slider with label-handles & label-ticks
              <calcite-slider
                min="10"
                max="100"
                min-value="20"
                max-value="90"
                step="10"
                min-label="Temperature range (lower)"
                max-label="Temperature range (upper)"
                scale="s"
                label-handles
                ticks="10"
                label-ticks
              ></calcite-slider>
            </calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              precise range slider with label-handles & label-ticks
              <calcite-slider
                min="10"
                max="100"
                min-value="20"
                max-value="90"
                step="10"
                min-label="Temperature range (lower)"
                max-label="Temperature range (upper)"
                scale="s"
                label-handles
                ticks="10"
                precise
                label-ticks
              ></calcite-slider>
            </calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              precise range slider with label-handles & label-ticks mirrored
              <calcite-slider
                min="10"
                max="100"
                min-value="20"
                max-value="90"
                step="10"
                min-label="Temperature range (lower)"
                max-label="Temperature range (upper)"
                scale="s"
                label-handles
                ticks="10"
                precise
                label-ticks
                mirrored
              ></calcite-slider>
            </calcite-label>
          </div>
        </div>
        <div>
          <div style="width: 200px; padding: 20px">
            <calcite-label>
              precise with label-handles
              <calcite-slider
                scale="s"
                min="10"
                max="100"
                value="50"
                step="10"
                precise
                label-handles
                layout="vertical"
              ></calcite-slider
            ></calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              precise with label-handles mirrored
              <calcite-slider
                scale="s"
                min="10"
                max="100"
                value="50"
                step="10"
                label-handles
                precise
                mirrored
                layout="vertical"
              ></calcite-slider>
            </calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              precise with label-handles & label-ticks
              <calcite-slider
                min="0"
                max="100"
                value="40"
                step="10"
                ticks="10"
                scale="s"
                label-handles
                label-ticks
                precise
                layout="vertical"
              ></calcite-slider>
            </calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              precise with label-handles & label-ticks mirrored
              <calcite-slider
                min="0"
                max="100"
                value="40"
                step="10"
                ticks="10"
                scale="s"
                label-handles
                precise
                mirrored
                label-ticks
                layout="vertical"
              ></calcite-slider>
            </calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              range slider with label-handles & label-ticks
              <calcite-slider
                min="10"
                max="100"
                min-value="20"
                max-value="90"
                step="10"
                min-label="Temperature range (lower)"
                max-label="Temperature range (upper)"
                scale="s"
                label-handles
                ticks="10"
                label-ticks
                layout="vertical"
              ></calcite-slider>
            </calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              precise range slider with label-handles & label-ticks
              <calcite-slider
                min="10"
                max="100"
                min-value="20"
                max-value="90"
                step="10"
                min-label="Temperature range (lower)"
                max-label="Temperature range (upper)"
                scale="s"
                label-handles
                ticks="10"
                precise
                label-ticks
                layout="vertical"
              ></calcite-slider>
            </calcite-label>
          </div>
          <div style="width: 400px; padding: 20px">
            <calcite-label>
              precise range slider with label-handles & label-ticks mirrored
              <calcite-slider
                min="10"
                max="100"
                min-value="20"
                max-value="90"
                step="10"
                min-label="Temperature range (lower)"
                max-label="Temperature range (upper)"
                scale="s"
                label-handles
                ticks="10"
                precise
                label-ticks
                mirrored
                layout="vertical"
              ></calcite-slider>
            </calcite-label>
          </div>
        </div>
      </div>
    </body>
  </html>`;

export const maxTickRendering_TestOnly = (): string => html`
  <style>
    calcite-slider {
      width: 60vw;
    }
    div.container {
      display: flex;
    }
    div.side {
      flex: 1;
    }
    div.side.vertical calcite-slider {
      height: 100px;
      width: 400px;
      max-width: none;
      margin-bottom: 350px;
    }
    div.side.vertical calcite-slider.first {
      margin-top: 200px;
    }
  </style>
  <div class="container">
    <div class="side">
      <div>
        <calcite-slider min="-100" max="100" ticks="1"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-100" max="100" ticks="5"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-100" max="100" ticks="10"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-250" max="250" ticks="1"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-250" max="250" ticks="5"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-250" max="250" ticks="10"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-500" max="500" ticks="1"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-500" max="500" ticks="5"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-500" max="500" ticks="10"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-1000" max="1000" ticks="1"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-1000" max="1000" ticks="5"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-1000" max="1000" ticks="10"></calcite-slider>
      </div>
    </div>
    <div class="side vertical">
      <div>
        <calcite-slider class="first" min="-100" max="100" ticks="1" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-100" max="100" ticks="5" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-100" max="100" ticks="10" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-250" max="250" ticks="1" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-250" max="250" ticks="5" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-250" max="250" ticks="10" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-500" max="500" ticks="1" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-500" max="500" ticks="5" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-500" max="500" ticks="10" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-1000" max="1000" ticks="1" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-1000" max="1000" ticks="5" layout="vertical"></calcite-slider>
      </div>
      <div>
        <calcite-slider min="-1000" max="1000" ticks="10" layout="vertical"></calcite-slider>
      </div>
    </div>
  </div>
`;

export const rendersWhenTrackRelatedPropChanges_TestOnly = (): string => html`
  <calcite-slider id="example-slider" label-ticks max="32" value="24" min="16" snap step="8" ticks="8"></calcite-slider>
  <calcite-slider
    id="example-slider"
    label-ticks
    max="32"
    value="24"
    min="16"
    snap
    step="8"
    ticks="8"
    layout="vertical"
    style="${verticalAdjustment}"
  ></calcite-slider>
  <script>
    (async () => {
      const undefinedElements = document.querySelectorAll(":not(:defined)");
      const promises = [...undefinedElements].map((e) => customElements.whenDefined(e.localName));
      await Promise.all(promises);
      const sliders = document.querySelectorAll("calcite-slider");
      await new Promise((resolve) => requestAnimationFrame(resolve));

      sliders[0].max = sliders[1].max = 64;
      sliders[0].min = sliders[1].min = 48;
      sliders[0].step = sliders[1].step = 16;
      sliders[0].ticks = sliders[1].ticks = 16;
      sliders[0].value = sliders[1].value = 64;
    })();
  </script>
`;

rendersWhenTrackRelatedPropChanges_TestOnly.parameters = {
  chromatic: { delay: 500 },
};

export const spaceGroupSeparatorNoBreak_TestOnly = (): string => html`
  <calcite-slider
    lang="ru"
    value="1000"
    label-handles
    label-ticks
    group-separator
    max-value="100000"
    max="10000"
    ticks="2000"
  ></calcite-slider>
  <calcite-slider
    lang="ru"
    value="1000"
    label-handles
    label-ticks
    group-separator
    max-value="100000"
    max="10000"
    ticks="2000"
    layout="vertical"
    style="${verticalAdjustment}"
  ></calcite-slider>
`;
export const fillPlacements = (): string => html`
  <h1>single</h1>

  <h2>start (default)</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="start"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="start"></calcite-slider>
  <br />
  <h2>none</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="none"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="none"></calcite-slider>
  <br />
  <h2>end</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="end"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="end"></calcite-slider>

  <h1>range</h1>

  <h2>start (default)</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" min-value=25" max-value="75" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="start"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="start"></calcite-slider>
  <br />
  <h2>none</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" min-value=25" max-value="75"  fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="none"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="none"></calcite-slider>
  <br />
  <h2>end</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" min-value=25" max-value="75"  fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="end"></calcite-slider>
  <br />
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="end"></calcite-slider>
`;

export const fillPlacementsVertical = (): string => html`
  <style>
    .parent {
      display: flex;
      flex-direction: column;
    }
    .child {
      display: flex;
      align-items: center;
      height: 220px;
    }
    .child calcite-slider {
      width: 220px;
    }
  </style>
  <div class="parent">
  <h1>single</h1>
  <h2>start (default)</h2>
  
  <div class="child">
  <calcite-slider min="0" max="100" value="0" fill-placement="start" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="start" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="start" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="start" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="start" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="start" layout="vertical"></calcite-slider>
  </div>
  <h2>none</h2>
  <div class="child">
  <calcite-slider min="0" max="100" value="0" fill-placement="none" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="none" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="none" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="none" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="none" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="none" layout="vertical"></calcite-slider>
  </div>
  <h2>end</h2>
  <div class="child">
  <calcite-slider min="0" max="100" value="0" fill-placement="end" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="end" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="end" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="0" fill-placement="end" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="50" fill-placement="end" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" value="100" fill-placement="end" layout="vertical"></calcite-slider>
  </div>

  <h1>range</h1>
  <h2>start (default)</h2>
  
  <div class="child">
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="start" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" min-value=25" max-value="75" fill-placement="start" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="start" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="start" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="start" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="start" layout="vertical"></calcite-slider>
  </div>
  <h2>none</h2>
  <div class="child">
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="none" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" min-value=25" max-value="75"  fill-placement="none" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="none"  layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="none" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="none" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="none" layout="vertical"></calcite-slider>
  </div>
  <h2>end</h2>
  <div class="child">
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="end" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" min-value=25" max-value="75"  fill-placement="end" layout="vertical"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="end" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="0" max-value="25" fill-placement="end" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value=25" max-value="75"  fill-placement="end" layout="vertical"></calcite-slider>
  <calcite-slider ticks="10" handle-ticks min="0" max="100" min-value="75" max-value="100" fill-placement="end" layout="vertical"></calcite-slider>
  </div>
  </div>
`;

export const customLabelsAndTicks = (): string => html`
  <style>
    div.container {
      display: flex;
      gap: 3.75rem;
    }
    div.side {
      flex: 1;
    }
  </style>
  <div class="container">
    <div class="side">
      <label>Label formatter (single value)</label>
      <calcite-slider
        class="singleFormattedLabelSlider"
        label-handles
        label-ticks
        ticks="100"
        min="0"
        max="100"
        value="50"
        step="1"
        min-label="Temperature"
      ></calcite-slider>

      <label>Label formatter (min/max value)</label>
      <calcite-slider
        class="minMaxFormattedLabelSlider"
        label-handles
        label-ticks
        ticks="10"
        min="0"
        max="100"
        min-value="25"
        max-value="75"
        step="1"
        min-label="Temperature"
      ></calcite-slider>
    </div>
    <div class="side">
      <label>Label formatter (single value)</label>
      <calcite-slider
        class="singleFormattedLabelSlider"
        label-handles
        label-ticks
        ticks="100"
        min="0"
        max="100"
        value="50"
        step="1"
        min-label="Temperature"
        layout="vertical"
        style="margin-top: 6.25rem; margin-bottom: 7.5rem"
      ></calcite-slider>

      <label>Label formatter (min/max value)</label>
      <calcite-slider
        class="minMaxFormattedLabelSlider"
        label-handles
        label-ticks
        ticks="10"
        min="0"
        max="100"
        min-value="25"
        max-value="75"
        step="1"
        min-label="Temperature"
        layout="vertical"
        style="margin-top: 6.25rem"
      ></calcite-slider>
    </div>
  </div>

  <script>
    const singleValueSlider = document.querySelectorAll(".singleFormattedLabelSlider");

    singleValueSlider.forEach((e) => {
      e.labelFormatter = function (value, type) {
        if (type === "value") {
          return value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
        }

        if (type === "tick") {
          return value === e.min ? "Cold" : value === e.max ? "Hot" : undefined;
        }
      };
    });

    const minMaxValueSlider = document.querySelectorAll(".minMaxFormattedLabelSlider");

    minMaxValueSlider.forEach((e, i) => {
      e.labelFormatter = function (value, type) {
        if (type === "min" || type === "max") {
          const status = value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
          return type === "min" || i === 1 ? value + "ºF" + " " + status : status + " " + value + "ºF";
        }

        if (type === "tick") {
          return value === minMaxValueSlider.max ? value + "ºF" : value + "º";
        }
      };
    });
  </script>
`;

customLabelsAndTicks.parameters = {
  chromatic: { delay: 500 },
};
