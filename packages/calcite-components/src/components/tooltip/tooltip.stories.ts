import { select, number } from "@storybook/addon-knobs";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { placements } from "../../utils/floating-ui";
import { modesDarkDefault } from "../../../.storybook/utils";

const contentHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;

const referenceElementHTML = `Ut enim ad minim veniam, quis <calcite-button appearance="transparent" kind="neutral" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

export default {
  title: "Components/Tooltip",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip
      reference-element="reference-element"
      placement="${select("placement", placements, "auto")}"
      offset-distance="${number("offset-distance", 6)}"
      offset-skidding="${number("offset-skidding", 0)}"
      ${boolean("open", false)}
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
      placement="${select("placement", placements, "auto")}"
      offset-distance="${number("offset-distance", 6)}"
      offset-skidding="${number("offset-skidding", 0)}"
      ${boolean("open", true)}
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
      placement="${select("placement", placements, "auto")}"
      offset-distance="${number("offset-distance", 6)}"
      offset-skidding="${number("offset-skidding", 0)}"
      ${boolean("open", false)}
    >
      <span> ${contentHTML} </span>
    </calcite-tooltip>
  </div>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const rightAligned_TestOnly = (): string => html`<div style="text-align: right">
  <a href="#" id="tooltip-button">Hover for Tooltip</a>
  <calcite-tooltip open reference-element="tooltip-button">
    <span>Tooltip content lorem ipsum</span>
  </calcite-tooltip>
</div>`;

export const transparentBG_TestOnly = (): string => html`
  <style>
    calcite-tooltip {
      --calcite-ui-foreground-1: rgba(0, 0, 0, 0.5);
      --calcite-ui-text-1: orange;
    }
  </style>
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-tooltip reference-element="reference-element" placement="auto" open> ${contentHTML} </calcite-tooltip>
  </div>
`;
