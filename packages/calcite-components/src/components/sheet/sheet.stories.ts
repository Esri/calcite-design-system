import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { logicalFlowPosition, displayMode } = ATTRIBUTES;

interface SheetArgs {
  open: boolean;
  position: string;
  displayMode: string;
}

export default {
  title: "Components/Sheet",
  args: {
    open: true,
    position: logicalFlowPosition.values[0],
    displayMode: displayMode.values[2],
  },
  argTypes: {
    position: {
      options: logicalFlowPosition.values,
      control: { type: "select" },
    },
    displayMode: {
      options: displayMode.values.filter((option) => option !== "dock"),
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 1000,
    },
  },
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

export const simple = (args: SheetArgs): string => html`
  <calcite-sheet
    label="libero nunc"
    ${boolean("open", args.open)}
    position="${args.position}"
    display-mode="${args.displayMode}"
    >${panelHTML}</calcite-sheet
  >
`;

export const simpleDarkMode = (args: SheetArgs): string => html`
  <calcite-sheet
    label="libero nunc"
    ${boolean("open", args.open)}
    position="${args.position}"
    display-mode="${args.displayMode}"
    >${panelHTML}</calcite-sheet
  >
`;
simpleDarkMode.parameters = { themes: modesDarkDefault };

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

darkModeFloatRTL_TestOnly.parameters = { themes: modesDarkDefault };
