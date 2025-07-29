import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Swatch } from "./swatch";

const { scale } = ATTRIBUTES;

type SwatchStoryArgs = Pick<Swatch, "scale" | "selected" | "label">;

export default {
  title: "Components/Swatch",
  args: { scale: scale.defaultValue, selected: false, label: "My great swatch" },
  argTypes: { scale: { options: scale.values, control: { type: "select" } }, label: { control: { type: "text" } } },
};

export const simple = (args: SwatchStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="${args.scale}" label="${args.label}" ${boolean("selected", args.selected)}></calcite-swatch>
  </div>
`;

export const withHex = (args: SwatchStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="#FF0000" label="${args.label}"> </calcite-swatch>
  </div>
`;

export const withRgba = (args: SwatchStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="rgba(255, 0, 0, 0.5)" label="${args.label}"> </calcite-swatch>
  </div>
`;

export const hexDisabled = (args: SwatchStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" color="#FF0000" label="${args.label}" disabled> </calcite-swatch>
  </div>
`;

export const emptyDisabled = (args: SwatchStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="${args.label}" disabled> </calcite-swatch>
  </div>
`;

export const withImage = (args: SwatchStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="${args.label}">
      <img
        src="${placeholderImage({
          width: 24,
          height: 24,
        })}"
        slot="image"
      />
    </calcite-swatch>
  </div>
`;

export const withImageDisabled = (args: SwatchStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch scale="m" label="${args.label}">
      <img
        src="${placeholderImage({
          width: 24,
          height: 24,
        })}"
        slot="image"
        disabled
      />
    </calcite-swatch>
  </div>
`;

export const darkModeRTL_TestOnly = (args: SwatchStoryArgs): string => html`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-swatch class="calcite-mode-dark" label="${args.label}"></calcite-swatch>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
