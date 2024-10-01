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

const simple = {};
for (const l of ["horizontal", "vertical"]) {
  simple[l] = (args: SliderStoryArgs): string => html`
    <div style="padding-top: 200px; padding-left: 100px; height: 200px">
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
        layout=${l}
      ></calcite-slider>
    </div>
  `;
}
export const simpleH = simple["horizontal"];
export const simpleV = simple["vertical"];

const range = {};
for (const l of ["horizontal", "vertical"]) {
  range[l] = (): string => html`
    <div style="padding-top: 200px; padding-left: 100px; height: 200px">
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
        layout=${l}
      ></calcite-slider>
    </div>
  `;
}
export const rangeH = range["horizontal"];
export const rangeV = range["vertical"];

const darkMode = {};
for (const l of ["horizontal", "vertical"]) {
  darkMode[l] = (): string => html`
    <div style="padding-top: 200px; padding-left: 100px; height: 200px">
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
        layout=${l}
      ></calcite-slider>
    </div>
  `;
}
export const darkModeMirroredRangeH_TestOnly = darkMode["horizontal"];
export const darkModeMirroredRangeV_TestOnly = darkMode["vertical"];

darkModeMirroredRangeH_TestOnly.story = darkModeMirroredRangeV_TestOnly.story = {
  parameters: { themes: modesDarkDefault },
};

const rangeLabeledTicks = {};
for (const l of ["horizontal", "vertical"]) {
  rangeLabeledTicks[l] = (): string => html`
    <div style="padding-top: 200px; padding-left: 100px; height: 200px">
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
        layout=${l}
      ></calcite-slider>
    </div>
  `;
}
export const rangeLabeledTicksH_TestOnly = rangeLabeledTicks["horizontal"];
export const rangeLabeledTicksV_TestOnly = rangeLabeledTicks["vertical"];

rangeLabeledTicksH_TestOnly.parameters = rangeLabeledTicksV_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

const rangeLabeledTicksOverlappingAtMax = {};
for (const l of ["horizontal", "vertical"]) {
  rangeLabeledTicksOverlappingAtMax[l] = (): string => html`
    <div style="padding-top: 200px; padding-left: 100px; height: 200px">
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
        layout=${l}
      ></calcite-slider>
    </div>
  `;
}
export const rangeLabeledTicksOverlappingAtMaxH_TestOnly = rangeLabeledTicksOverlappingAtMax["horizontal"];
export const rangeLabeledTicksOverlappingAtMaxV_TestOnly = rangeLabeledTicksOverlappingAtMax["vertical"];

rangeLabeledTicksOverlappingAtMaxH_TestOnly.parameters = rangeLabeledTicksOverlappingAtMaxV_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

const rangeLabeledTicksOverlappingAtMin = {};
for (const l of ["horizontal", "vertical"]) {
  rangeLabeledTicksOverlappingAtMin[l] = (): string => html`
    <div style="padding-top: 200px; padding-left: 100px; height: 200px">
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
        layout=${l}
      ></calcite-slider>
    </div>
  `;
}
export const rangeLabeledTicksOverlappingAtMinH_TestOnly = rangeLabeledTicksOverlappingAtMin["horizontal"];
export const rangeLabeledTicksOverlappingAtMinV_TestOnly = rangeLabeledTicksOverlappingAtMin["vertical"];

rangeLabeledTicksOverlappingAtMinH_TestOnly.parameters = rangeLabeledTicksOverlappingAtMinV_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

const rangeLabeledTicksEdgePositioningAtMax = {};
for (const l of ["horizontal", "vertical"]) {
  rangeLabeledTicksEdgePositioningAtMax[l] = (): string => html`
    <div style="padding-top: 200px; padding-left: 100px; height: 200px">
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
        layout=${l}
      ></calcite-slider>
    </div>
  `;
}
export const rangeLabeledTicksEdgePositioningAtMaxH_TestOnly = rangeLabeledTicksEdgePositioningAtMax["horizontal"];
export const rangeLabeledTicksEdgePositioningAtMaxV_TestOnly = rangeLabeledTicksEdgePositioningAtMax["vertical"];

rangeLabeledTicksEdgePositioningAtMaxH_TestOnly.parameters =
  rangeLabeledTicksEdgePositioningAtMaxV_TestOnly.parameters = {
    chromatic: { diffThreshold: 1 },
  };

const rangeLabeledTicksEdgePositioningAtMin = {};
for (const l of ["horizontal", "vertical"]) {
  rangeLabeledTicksEdgePositioningAtMin[l] = (): string => html`
    <div style="padding-top: 200px; padding-left: 100px; height: 200px">
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
        layout=${l}
      ></calcite-slider>
    </div>
  `;
}
export const rangeLabeledTicksEdgePositioningAtMinH_TestOnly = rangeLabeledTicksEdgePositioningAtMin["horizontal"];
export const rangeLabeledTicksEdgePositioningAtMinV_TestOnly = rangeLabeledTicksEdgePositioningAtMin["vertical"];

rangeLabeledTicksEdgePositioningAtMinH_TestOnly.parameters;
rangeLabeledTicksEdgePositioningAtMinV_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

const histograms = {};
for (const l of ["horizontal", "vertical"]) {
  histograms[l] = (): HTMLCalciteSliderElement => {
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
    slider.style.paddingTop = "200px";
    slider.style.paddingLeft = "100px";
    slider.style.height = "400px";
    slider.layout = l;
    return slider;
  };
}
export const HistogramH = histograms["horizontal"];
export const HistogramV = histograms["vertical"];

const histogramWithColors = {};
for (const l of ["horizontal", "vertical"]) {
  histogramWithColors[l] = (): HTMLCalciteSliderElement => {
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
    slider.layout = l;
    return slider;
  };
}
export const HistogramWithColorsH = histogramWithColors["horizontal"];
export const HistogramWithColorsV = histogramWithColors["vertical"];

const darkModeHistogramRTL = {};
for (const l of ["horizontal", "vertical"]) {
  darkModeHistogramRTL[l] = (): HTMLCalciteSliderElement => {
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
    slider.layout = l;
    return slider;
  };
}
export const darkModeHistogramRTLH_TestOnly = darkModeHistogramRTL["horizontal"];
export const darkModeHistogramRTLV_TestOnly = darkModeHistogramRTL["vertical"];

darkModeHistogramRTLH_TestOnly.parameters = darkModeHistogramRTLV_TestOnly.parameters = {
  themes: modesDarkDefault,
};

const disabledSlider = {};
for (const l of ["horizontal", "vertical"]) {
  disabledSlider[l] = (): string => html`<calcite-slider disabled value="5" layout=${l}></calcite-slider>`;
}
export const disabledH_TestOnly = disabledSlider["horizontal"];
export const disabledV_TestOnly = disabledSlider["vertical"];

const wordBreakDoesNotAffectLabels = {};
for (const l of ["horizontal", "vertical"]) {
  wordBreakDoesNotAffectLabels[l] = (): string =>
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
      layout=${l}
    ></calcite-slider>`;
}
export const wordBreakDoesNotAffectLabelsH_TestOnly = wordBreakDoesNotAffectLabels["horizontal"];
export const wordBreakDoesNotAffectLabelsV_TestOnly = wordBreakDoesNotAffectLabels["vertical"];

const withLabelHandlesAndNoValue = {};
for (const l of ["horizontal", "vertical"]) {
  withLabelHandlesAndNoValue[l] = (): string => html` <calcite-slider max="750" layout=${l}></calcite-slider> `;
}
export const WithLabelHandlesAndNoValueH_TestOnly = withLabelHandlesAndNoValue["horizontal"];
export const WithLabelHandlesAndNoValueV_TestOnly = withLabelHandlesAndNoValue["vertical"];

const withLargeFontSize = {};
for (const l of ["horizontal", "vertical"]) {
  withLargeFontSize[l] = (): string =>
    html`<html lang="en">
      <head>
        <style>
          html {
            font-size: 24px;
          }
          calcite-label {ssss
            padding: 10px;
          }
          calcite-slider {
            ${l === "vertical" ? "height: 100px; margin-top: 90px" : ""}
          }
        </style>
      </head>
      <body>
        <div style="width: 400px; padding: 20px">
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
              layout=${l}
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
              layout=${l}
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
              layout=${l}
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
              layout=${l}
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
              layout=${l}
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
              layout=${l}
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
              layout=${l}
            ></calcite-slider>
          </calcite-label>
        </div>
      </body>
    </html>`;
}
export const WithLargeFontSizeH_TestOnly = withLargeFontSize["horizontal"];
export const WithLargeFontSizeV_TestOnly = withLargeFontSize["vertical"];

const maxTickRendering = {};
for (const l of ["horizontal", "vertical"]) {
  maxTickRendering[l] = (): string => html`
    <style>
      ${l === "horizontal"
          ? "calcite-slider {width: 60vw;}"
          : "calcite-slider {height: 100px; margin-top: 200px; width: auto; max-width: none; margin-bottom: 80px}"}
        div {
        width: 400px;
        padding: 20px;
      }
    </style>

    <div>
      <calcite-slider min="-100" max="100" ticks="1" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-100" max="100" ticks="5" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-100" max="100" ticks="10" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-250" max="250" ticks="1" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-250" max="250" ticks="5" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-250" max="250" ticks="10" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-500" max="500" ticks="1" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-500" max="500" ticks="5" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-500" max="500" ticks="10" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-1000" max="1000" ticks="1" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-1000" max="1000" ticks="5" layout=${l}></calcite-slider>
    </div>
    <div>
      <calcite-slider min="-1000" max="1000" ticks="10" layout=${l}></calcite-slider>
    </div>
  `;
}
export const maxTickRenderingH_TestOnly = maxTickRendering["horizontal"];
export const maxTickRenderingV_TestOnly = maxTickRendering["vertical"];

const rendersWhenTrackRelatedPropChanges = {};
for (const l of ["horizontal", "vertical"]) {
  rendersWhenTrackRelatedPropChanges[l] = (): string => html`
    <calcite-slider
      id="example-slider"
      label-ticks
      max="32"
      value="24"
      min="16"
      snap
      step="8"
      ticks="8"
      layout=${l}
    ></calcite-slider>
    <script>
      (async () => {
        await customElements.whenDefined("calcite-slider");
        const slider = await document.querySelector("calcite-slider").componentOnReady();
        await new Promise((resolve) => requestAnimationFrame(resolve));

        slider.max = 64;
        slider.min = 48;
        slider.step = 16;
        slider.ticks = 16;
        slider.value = 64;
      })();
    </script>
  `;
}
export const rendersWhenTrackRelatedPropChangesH_TestOnly = rendersWhenTrackRelatedPropChanges["horizontal"];
export const rendersWhenTrackRelatedPropChangesV_TestOnly = rendersWhenTrackRelatedPropChanges["vertical"];

rendersWhenTrackRelatedPropChangesH_TestOnly.parameters = rendersWhenTrackRelatedPropChangesV_TestOnly.parameters = {
  chromatic: { delay: 500 },
};

const spaceGroupSeparatorNoBreak = {};
for (const l of ["horizontal", "vertical"]) {
  spaceGroupSeparatorNoBreak[l] = (): string => html`
    <calcite-slider
      lang="ru"
      value="1000"
      label-handles
      label-ticks
      group-separator
      max-value="100000"
      max="10000"
      ticks="2000"
      layout=${l}
    ></calcite-slider>
  `;
}
export const spaceGroupSeparatorNoBreakH_TestOnly = spaceGroupSeparatorNoBreak["horizontal"];
export const spaceGroupSeparatorNoBreakV_TestOnly = spaceGroupSeparatorNoBreak["vertical"];

export const fillPlacementsH = (): string => html`
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

export const fillPlacementsV = (): string => html`
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

export const customLabelsAndTicksH = (): string => html`
  <label>Label formatter (single value)</label>
  <calcite-slider
    id="singleFormattedLabelSlider"
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
    id="minMaxFormattedLabelSlider"
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

  <script>
    const singleValueSlider = document.getElementById("singleFormattedLabelSlider");

    singleValueSlider.labelFormatter = function (value, type) {
      if (type === "value") {
        return value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
      }

      if (type === "tick") {
        return value === singleValueSlider.min ? "Cold" : value === singleValueSlider.max ? "Hot" : undefined;
      }
    };

    const minMaxValueSlider = document.getElementById("minMaxFormattedLabelSlider");

    minMaxValueSlider.labelFormatter = function (value, type) {
      if (type === "min" || type === "max") {
        const status = value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
        return type === "min" ? value + "ºF" + " " + status : status + " " + value + "ºF";
      }

      if (type === "tick") {
        return value === minMaxValueSlider.max ? value + "ºF" : value + "º";
      }
    };
  </script>
`;

customLabelsAndTicksH.parameters = {
  chromatic: { delay: 500 },
};

export const customLabelsAndTicksV = (): string => html`
  <div style="display: flex">
    <div style="display: flex; flex-direction: column">
      <label style="margin-bottom: 100px">Label formatter (single value)</label>
      <calcite-slider
        id="singleFormattedLabelSlider"
        label-handles
        label-ticks
        ticks="100"
        min="0"
        max="100"
        value="50"
        step="1"
        min-label="Temperature"
        layout="vertical"
      ></calcite-slider>
    </div>

    <div style="display: flex; flex-direction: column">
      <label style="margin-bottom: 100px">Label formatter (min/max value)</label>
      <calcite-slider
        id="minMaxFormattedLabelSlider"
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
      ></calcite-slider>
    </div>
  </div>

  <script>
    const singleValueSlider = document.getElementById("singleFormattedLabelSlider");

    singleValueSlider.labelFormatter = function (value, type) {
      if (type === "value") {
        return value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
      }

      if (type === "tick") {
        return value === singleValueSlider.min ? "Cold" : value === singleValueSlider.max ? "Hot" : undefined;
      }
    };

    const minMaxValueSlider = document.getElementById("minMaxFormattedLabelSlider");

    minMaxValueSlider.labelFormatter = function (value, type) {
      if (type === "min" || type === "max") {
        const status = value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
        return status + " " + value + "ºF";
      }

      if (type === "tick") {
        return value === minMaxValueSlider.max ? value + "ºF" : value + "º";
      }
    };
  </script>
`;

customLabelsAndTicksV.parameters = {
  chromatic: { delay: 500 },
};
