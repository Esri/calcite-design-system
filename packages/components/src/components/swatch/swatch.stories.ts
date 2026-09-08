import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Swatch } from "./swatch";
import "./swatch"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

const { scale } = ATTRIBUTES;

type SwatchStoryArgs = Pick<Swatch, "scale" | "selected" | "label">;
type SwatchSimpleStoryArgs = Pick<Swatch, "color" | "disabled" | "label" | "scale" | "selected">;

export default {
  title: "Components/Swatch",
  args: { color: "", disabled: false, scale: scale.defaultValue, selected: false, label: "My great swatch" },
  argTypes: { scale: { options: scale.values, control: { type: "select" } }, label: { control: { type: "text" } } },
};

export const simple = (args: SwatchSimpleStoryArgs): string => html`
  <div style="background-color:white;padding:100px">
    <calcite-swatch
      scale="${args.scale}"
      color="${args.color}"
      label="${args.label}"
      ${boolean("disabled", args.disabled)}
      ${boolean("selected", args.selected)}
    ></calcite-swatch>
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
    <calcite-swatch scale="m" label="${args.label}" disabled>
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

export const darkModeRTL = (args: SwatchStoryArgs): string => html`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-swatch class="calcite-mode-dark" label="${args.label}"></calcite-swatch>
  </div>
`;

darkModeRTL.parameters = { themes: modesDarkDefault };
