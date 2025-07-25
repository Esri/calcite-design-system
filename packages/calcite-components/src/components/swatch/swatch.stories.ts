import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Swatch } from "./swatch";

const { scale } = ATTRIBUTES;

type SwatchStoryArgs = Pick<Swatch, "scale" | "selected" | "label">;

export default {
  title: "Components/Swatch",
  args: {
    scale: scale.defaultValue,
    selected: false,
    label: "My great swatch",
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    label: {
      control: { type: "text" },
    },
  },
};

export const simple = (args: SwatchStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="${args.scale}" label="${args.label}" ${boolean("selected", args.selected)}></calcite-swatch>
  </div>
`;

export const withIcon = (args: SwatchStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="${args.label}"> </calcite-swatch>
  </div>
`;

export const withImage = (args: SwatchStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="${args.label}"> </calcite-swatch>
  </div>
`;

export const withSlottedImage = (): string => {
  return html`
    <div style="background-color:white;padding:100px">
      <calcite-swatch scale="m" label="color"> </calcite-swatch>
    </div>
  `;
};

export const overriddenIconColor = (): string =>
  html`<calcite-swatch icon="banana" style="--calcite-icon-color: #ac9f42" label="Banana"></calcite-swatch>`;

export const darkModeRTL_TestOnly = (args: SwatchStoryArgs): string => html`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-swatch class="calcite-mode-dark" label="${args.label}"></calcite-swatch>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
