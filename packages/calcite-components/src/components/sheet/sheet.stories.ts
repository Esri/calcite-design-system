import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Sheet } from "./sheet";

const { logicalFlowPosition, displayMode } = ATTRIBUTES;

type SheetStoryArgs = Pick<Sheet, "open" | "position" | "displayMode" | "resizable">;

export default {
  title: "Components/Sheet",
  args: {
    open: true,
    resizable: false,
    position: logicalFlowPosition.values[0],
    displayMode: displayMode.values[1],
  },
  argTypes: {
    position: {
      options: logicalFlowPosition.values,
      control: { type: "select" },
    },
    displayMode: {
      options: displayMode.values,
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

export const simple = (args: SheetStoryArgs): string => html`
  <calcite-sheet
    label="libero nunc"
    ${boolean("open", args.open)}
    ${boolean("resizable", args.resizable)}
    position="${args.position}"
    display-mode="${args.displayMode}"
    >${panelHTML}</calcite-sheet
  >
`;

export const simpleDarkMode = (args: SheetStoryArgs): string => html`
  <calcite-sheet
    label="libero nunc"
    ${boolean("open", args.open)}
    position="${args.position}"
    display-mode="${args.displayMode}"
    >${panelHTML}</calcite-sheet
  >
`;
simpleDarkMode.parameters = { themes: modesDarkDefault };

export const resizable = (): string =>
  html`<calcite-sheet resizable label="libero nunc" open position="inline-start">${panelHTML}</calcite-sheet>`;

export const resizableWithDropdown = (): string =>
  html`<calcite-sheet width="s" resizable label="libero nunc" open position="inline-start">
    <calcite-panel heading="Map" id="panel-start">
      <calcite-dropdown open width="m" overlay-positioning="fixed">
        <calcite-button slot="trigger">Select landform</calcite-button>
        <calcite-dropdown-group group-title="Natural places">
          <calcite-dropdown-item>Mountain</calcite-dropdown-item>
          <calcite-dropdown-item>River</calcite-dropdown-item>
          <calcite-dropdown-item>Waterfall</calcite-dropdown-item>
          <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
          <calcite-dropdown-item>Tundra</calcite-dropdown-item>
          <calcite-dropdown-item>Desert</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    </calcite-panel></calcite-sheet
  >`;

export const resizableBlockStart = (): string =>
  html`<calcite-sheet resizable label="libero nunc" open position="block-start">${panelHTML}</calcite-sheet>`;

export const resizableFloatInlineStart = (): string =>
  html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-start"
    >${panelHTML}</calcite-sheet
  >`;

export const resizableFloatInlineEnd = (): string =>
  html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="inline-end"
    >${panelHTML}</calcite-sheet
  >`;

export const resizableFloatBlockStart = (): string =>
  html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-start"
    >${panelHTML}</calcite-sheet
  >`;

export const resizableFloatBlockEnd = (): string =>
  html`<calcite-sheet display-mode="float" resizable label="libero nunc" open position="block-end"
    >${panelHTML}</calcite-sheet
  >`;

export const resizableLoremIpsum = (): string =>
  html`<calcite-sheet resizable label="libero nunc" open position="inline-end"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel viverra purus. Vestibulum fringilla fringilla orci
    ac elementum. Sed viverra risus eu nibh facilisis imperdiet. Maecenas sed semper lacus, imperdiet placerat risus.
    Sed at urna sit amet tellus egestas condimentum a non nisi. Integer vehicula urna eros. Nunc ante quam, porttitor
    vel ex vel, volutpat ultrices mi. Aenean cursus tempor mi, eget accumsan ligula pellentesque nec. Nulla non
    facilisis libero. Praesent purus risus, suscipit porttitor odio nec, aliquam placerat elit. Vivamus id justo porta,
    pharetra tortor vitae, convallis lorem. Proin at molestie metus. Vestibulum quis mauris neque. Integer ornare, nisi
    a blandit dignissim, odio tortor maximus nisi, at placerat ex dui ut nisi. Aliquam metus dolor, ullamcorper sit amet
    ornare eget, gravida a erat. Quisque a lacus fringilla, fermentum est sed, ultrices eros. Praesent posuere felis eu
    arcu pulvinar commodo at sodales diam. Morbi eu iaculis nunc. Pellentesque habitant morbi tristique senectus et
    netus et malesuada fames ac turpis egestas. Duis sed auctor velit, ut tempus mauris. Donec fermentum sagittis tortor
    et posuere. Pellentesque posuere nunc non augue suscipit cursus. Donec feugiat in nisi non dignissim. Proin
    vulputate, justo ac rhoncus porttitor, velit nunc molestie nisi, ac bibendum erat magna et magna. Interdum et
    malesuada fames ac ante ipsum primis in faucibus. Quisque urna sapien, tempus in tortor eu, elementum dictum ligula.
    Mauris mollis condimentum quam. Curabitur a efficitur velit, non pellentesque massa. Etiam sit amet nulla nulla.
    Cras volutpat eros in velit euismod, at accumsan velit pulvinar.
  </calcite-sheet>`;

export const inlineStartFloat_TestOnly = (): string =>
  html`<calcite-sheet label="libero nunc" open position="inline-start" display-mode="float"
    >${panelHTML}</calcite-sheet
  >`;

export const blockStartFloat_TestOnly = (): string =>
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
