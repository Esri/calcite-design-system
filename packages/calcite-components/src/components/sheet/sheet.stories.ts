import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Sheet",
  parameters: {
    notes: readme,
    chromatic: {
      delay: 1000,
    },
  },
  ...storyFilters(),
};

const panelHTML = html`<calcite-panel heading="Ultrices neque"
  ><p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
  <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
</calcite-panel>`;

export const simple = (): string => html`
  <calcite-sheet
    label="libero nunc"
    ${boolean("open", true)}
    position="${select("position", ["inline-start", "inline-end", "block-start", "block-end"], "inline-start")}"
    display-mode="${select("display-mode", ["overlay", "float"], "overlay")}"
    >${panelHTML}</calcite-sheet
  >
`;

export const simpleDarkMode = (): string => html`
  <calcite-sheet
    label="libero nunc"
    ${boolean("open", true)}
    ${select("position", ["inline-start", "inline-end", "block-start", "block-end"], "inline-start")}
    ${select("display-mode", ["overlay", "float"], "overlay")}
    >${panelHTML}</calcite-sheet
  >
`;
simpleDarkMode.parameters = { modes: modesDarkDefault };

export const inlineStartfloat_TestOnly = (): string =>
  html`<calcite-sheet label="libero nunc" open position="inline-start" display-mode="float"
    >${panelHTML}</calcite-sheet
  >`;

export const blockStartfloat_TestOnly = (): string =>
  html`<calcite-sheet label="libero nunc" open position="block-start" display-mode="float"
    >${panelHTML}</calcite-sheet
  >`;

export const inlineStart_TestOnly = (): string =>
  html`<calcite-sheet label="libero nunc" open position="inline-start">${panelHTML}</calcite-sheet>`;

export const inlineEnd_TestOnly = (): string =>
  html`<calcite-sheet label="libero nunc" open position="inline-end">${panelHTML}</calcite-sheet>`;

export const blockStart_TestOnly = (): string =>
  html`<calcite-sheet label="libero nunc" open position="block-start">${panelHTML}</calcite-sheet>`;

export const blockEnd_TestOnly = (): string =>
  html`<calcite-sheet label="libero nunc" open position="block-end">${panelHTML}</calcite-sheet>`;

export const darkModeFloatRTL_TestOnly = (): string =>
  html`<div dir="rtl">
    <calcite-sheet label="libero nunc" open position="inline-start" display-mode="float">${panelHTML}</calcite-sheet>
  </div>`;

darkModeFloatRTL_TestOnly.parameters = { modes: modesDarkDefault };
