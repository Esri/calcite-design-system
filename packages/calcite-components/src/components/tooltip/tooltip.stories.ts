import { html } from "../../../support/formatting";
import { placements } from "../../utils/floating-ui";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { Tooltip } from "./tooltip";

const contentHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;

const referenceElementHTML = `Ut enim ad minim veniam, quis <calcite-button appearance="transparent" kind="neutral" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

type TooltipStoryArgs = Pick<Tooltip, "placement" | "offsetDistance" | "offsetSkidding" | "open">;

export default {
  title: "Components/Tooltip",
  args: {
    placement: placements[0],
    offsetDistance: 6,
    offsetSkidding: 0,
    open: false,
  },
  argTypes: {
    placements: {
      options: placements,
      control: { type: "select" },
    },
  },
};

export const simple = (args: TooltipStoryArgs): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip
      reference-element="reference-element"
      placement="${args.placement}"
      offset-distance="${args.offsetDistance}"
      offset-skidding="${args.offsetSkidding}"
      ${boolean("open", args.open)}
    >
      <span> ${contentHTML} </span>
    </calcite-tooltip>
  </div>
`;

export const open_TestOnly = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip
      reference-element="reference-element"
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
      open
    >
      <span> ${contentHTML} </span>
    </calcite-tooltip>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip
      class="calcite-mode-dark"
      dir="rtl"
      reference-element="reference-element"
      placement="auto"
      offset-distance="6"
      offset-skidding="0"
    >
      <span> ${contentHTML} </span>
    </calcite-tooltip>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const rightAligned_TestOnly = (): string =>
  html`<div style="width:800px; height:800px;">
    <div style="text-align: right; width: 600px;">
      <a href="#" id="tooltip-button">Hover for Tooltip</a>
      <calcite-tooltip open reference-element="tooltip-button">
        <span>Tooltip content lorem ipsum</span>
      </calcite-tooltip>
    </div>
  </div>`;

export const transparentBG_TestOnly = (): string => html`
  <style>
    calcite-tooltip {
      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);
      --calcite-color-text-1: orange;
    }
  </style>
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip reference-element="reference-element" placement="auto" open> ${contentHTML} </calcite-tooltip>
  </div>
`;

export const withInteractiveContent = (): string =>
  html`<div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip reference-element="reference-element" placement="auto" open
      ><img width="100%" src="${placeholderImage({ width: 360, height: 90 })}" /> <p>${contentHTML}</p> <calcite-button>Click me</calcite-button
    </calcite-tooltip>
  </div>`;
