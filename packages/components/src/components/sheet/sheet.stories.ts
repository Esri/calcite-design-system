import { expect, waitFor } from "storybook/test";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Sheet } from "./sheet";
import "../action/action";
import "../button/button"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import { Dropdown } from "../dropdown/dropdown";
import "../dropdown-group/dropdown-group"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../dropdown-item/dropdown-item"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "../panel/panel"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "./sheet"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

const { logicalFlowPosition, displayMode, scale } = ATTRIBUTES;

type SheetStoryArgs = Pick<
  Sheet,
  "displayMode" | "heightScale" | "modal" | "open" | "position" | "resizable" | "width"
>;

export default {
  title: "Components/Sheet",
  args: {
    modal: true,
    open: true,
    resizable: false,
    position: logicalFlowPosition.values[0],
    displayMode: displayMode.values[1],
    width: scale.defaultValue,
    heightScale: scale.defaultValue,
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
    width: {
      options: scale.values,
      control: { type: "select" },
    },
    heightScale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 1000,
    },
  },
};

const contentHTML = html`
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
  <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
  <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
`;

export const simple = (args: SheetStoryArgs): string => html`
  <calcite-sheet
    close-disabled
    label="libero nunc"
    ${boolean("modal", args.modal)}
    ${boolean("open", args.open)}
    ${boolean("resizable", args.resizable)}
    position="${args.position}"
    display-mode="${args.displayMode}"
    width="${args.width}"
    height-scale="${args.heightScale}"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >
`;

export const headerSlots = (): string => html`
  <style>
    .sheet-header-slots {
      --calcite-sheet-background-color: var(--calcite-color-foreground-2);
      --calcite-sheet-header-background-color: var(--calcite-color-background);
      --calcite-sheet-heading-text-color: var(--calcite-color-brand);
      --calcite-sheet-description-text-color: var(--calcite-color-text-1);
      --calcite-sheet-icon-color: var(--calcite-color-brand);
      --calcite-sheet-header-top-space: var(--calcite-space-lg);
      --calcite-sheet-space: var(--calcite-space-md);
      --calcite-sheet-footer-background-color: var(--calcite-color-foreground-3);
      --calcite-sheet-footer-space: var(--calcite-space-md);
    }
  </style>
  <calcite-sheet
    class="sheet-header-slots"
    heading-level="2"
    icon="layers"
    label="Map layers"
    menu-open
    menu-placement="bottom-start"
    modal
    open
    top-layer-disabled
  >
    <div slot="header-top">Map tools</div>
    <span slot="heading"><strong>Layers</strong></span>
    <span slot="description">Manage the layers in this map.</span>
    <calcite-action icon="gear" slot="header-menu-actions" text="Layer settings"></calcite-action>
    <calcite-action-bar layout="horizontal" slot="content-top">
      <calcite-action icon="plus" text="Add layer"></calcite-action>
    </calcite-action-bar>
    <p>Layer content</p>
    <calcite-button slot="footer">Add layer</calcite-button>
  </calcite-sheet>
`;

export const panelBackground = (): string => html`
  <style>
    .sheet-panel-background {
      --calcite-sheet-background-color: var(--calcite-color-foreground-2);
    }
  </style>
  <calcite-sheet close-disabled class="sheet-panel-background" heading="Layer details" label="Map layers" modal open>
    <p>Population density</p>
  </calcite-sheet>
`;

export const customPanelBackground = (): string => html`
  <style>
    .sheet-custom-panel-background {
      --calcite-sheet-background-color: var(--calcite-color-foreground-3);
    }
  </style>
  <calcite-sheet class="sheet-custom-panel-background" label="Map layers" modal open>
    <calcite-panel heading="Layers" slot="custom-content">
      <p>Population density</p>
    </calcite-panel>
  </calcite-sheet>
`;

export const disabled = (): string => html`
  <calcite-sheet disabled heading="Layers" label="Map layers" modal open resizable>
    <calcite-button>Add layer</calcite-button>
  </calcite-sheet>
`;

export const disabledCustomContent = (): string => html`
  <calcite-sheet disabled label="Map layers" modal open resizable>
    <calcite-panel heading="Layers" slot="custom-content">
      <calcite-button>Add layer</calcite-button>
    </calcite-panel>
  </calcite-sheet>
`;

export const disabledBackgroundOcclusion = (): string => html`
  <style>
    .disabled-sheet-background {
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        45deg,
        var(--calcite-color-brand) 0 var(--calcite-space-lg),
        var(--calcite-color-background) var(--calcite-space-lg) calc(2 * var(--calcite-space-lg))
      );
    }
  </style>
  <div class="disabled-sheet-background"></div>
  <calcite-sheet disabled heading="Built-in panel" label="Built-in panel" open resizable width="s">
    <p>The background stripes must not show through this disabled sheet.</p>
    <calcite-button slot="footer">Add layer</calcite-button>
  </calcite-sheet>
  <calcite-sheet disabled display-mode="float" label="Custom panel" open position="inline-end" resizable width="s">
    <calcite-panel heading="Custom panel" slot="custom-content">
      <p>The background stripes must not show through this disabled sheet.</p>
      <calcite-button slot="footer">Add layer</calcite-button>
    </calcite-panel>
  </calcite-sheet>
`;

export const simpleDarkMode = (args: SheetStoryArgs): string => html`
  <calcite-sheet
    close-disabled
    label="libero nunc"
    modal
    ${boolean("open", args.open)}
    position="${args.position}"
    display-mode="${args.displayMode}"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >
`;
simpleDarkMode.parameters = { themes: modesDarkDefault };

export const nonModalInlineEnd = (): string => html`
  <calcite-sheet close-disabled label="Non-modal inline sheet" open position="inline-end" heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >
`;

export const nonModalBlockEnd = (): string => html`
  <calcite-sheet close-disabled label="Non-modal block sheet" open position="block-end" heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >
`;

export const resizable = (): string =>
  html`<calcite-sheet
    close-disabled
    modal
    resizable
    label="libero nunc"
    open
    position="inline-start"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const resizableRTL = (): string =>
  html`<calcite-sheet
    close-disabled
    dir="rtl"
    modal
    resizable
    label="libero nunc"
    open
    position="inline-start"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const resizableWithDropdown = (): string =>
  html`<calcite-sheet
    close-disabled
    focus-trap-disabled
    width="s"
    modal
    resizable
    label="libero nunc"
    open
    position="inline-start"
    heading="Map"
    id="panel-start"
  >
    <calcite-dropdown width="m" overlay-positioning="fixed">
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
  </calcite-sheet>`;

resizableWithDropdown.play = async ({ canvasElement }: { canvasElement: HTMLElement }): Promise<void> => {
  const sheet = canvasElement.querySelector("calcite-sheet")!;
  const dropdown = canvasElement.querySelector<Dropdown["el"]>("calcite-dropdown")!;
  const firstItem = canvasElement.querySelector("calcite-dropdown-item");

  await new Promise<void>((resolve) => {
    sheet.addEventListener("calciteSheetOpen", () => resolve(), { once: true });
  });
  dropdown.open = true;

  await waitFor(async () => {
    await expect(firstItem).toHaveFocus();
  });
};
resizableWithDropdown.parameters = { chromatic: { delay: 0 } };

export const resizableBlockStart = (): string =>
  html`<calcite-sheet
    close-disabled
    modal
    resizable
    label="libero nunc"
    open
    position="block-start"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const resizableFloatInlineStart = (): string =>
  html`<calcite-sheet
    close-disabled
    display-mode="float"
    modal
    resizable
    label="libero nunc"
    open
    position="inline-start"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const resizableFloatInlineEnd = (): string =>
  html`<calcite-sheet
    close-disabled
    display-mode="float"
    modal
    resizable
    label="libero nunc"
    open
    position="inline-end"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const resizableFloatBlockStart = (): string =>
  html`<calcite-sheet
    close-disabled
    display-mode="float"
    modal
    resizable
    label="libero nunc"
    open
    position="block-start"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const resizableFloatBlockEnd = (): string =>
  html`<calcite-sheet
    close-disabled
    display-mode="float"
    modal
    resizable
    label="libero nunc"
    open
    position="block-end"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const resizableLoremIpsum = (): string =>
  html`<calcite-sheet modal resizable label="libero nunc" open position="inline-end" close-disabled
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

export const inlineStartFloat = (): string =>
  html`<calcite-sheet
    close-disabled
    label="libero nunc"
    modal
    open
    position="inline-start"
    display-mode="float"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const blockStartFloat = (): string =>
  html`<calcite-sheet
    close-disabled
    label="libero nunc"
    modal
    open
    position="block-start"
    display-mode="float"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const inlineStart = (): string =>
  html`<calcite-sheet close-disabled label="libero nunc" modal open position="inline-start" heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const inlineEnd = (): string =>
  html`<calcite-sheet close-disabled label="libero nunc" modal open position="inline-end" heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const blockStart = (): string =>
  html`<calcite-sheet close-disabled label="libero nunc" modal open position="block-start" heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const blockEnd = (): string =>
  html`<calcite-sheet close-disabled label="libero nunc" modal open position="block-end" heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >`;

export const darkModeFloatRTL = (): string =>
  html`<div dir="rtl">
    <calcite-sheet
      close-disabled
      label="libero nunc"
      modal
      open
      position="inline-start"
      display-mode="float"
      heading="Ultrices neque"
      >${contentHTML}</calcite-sheet
    >
  </div>`;

darkModeFloatRTL.parameters = { themes: modesDarkDefault };

export const shadowAcrossModesAndPositions = (): string => html`
  <style>
    :root {
      --calcite-sheet-scrim-background: transparent;
      --calcite-sheet-shadow: 0 8px 24px blue;
    }
  </style>
  <calcite-sheet close-disabled label="overlay + block" modal open position="block-start" heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >
  <calcite-sheet
    close-disabled
    display-mode="float"
    label="float + block"
    modal
    open
    position="block-end"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >
  <calcite-sheet close-disabled label="overlay + inline" modal open position="inline-start" heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >
  <calcite-sheet
    close-disabled
    display-mode="float"
    label="float + inline"
    modal
    open
    position="inline-end"
    heading="Ultrices neque"
    >${contentHTML}</calcite-sheet
  >
`;
