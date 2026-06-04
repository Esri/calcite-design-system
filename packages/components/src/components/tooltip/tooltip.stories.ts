import { html } from "../../../support/formatting";
import { placements } from "../../utils/floating-ui";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { Tooltip } from "./tooltip";

const contentHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;

const referenceElementHTML = `Ut enim ad minim veniam, quis <calcite-button appearance="transparent" kind="neutral" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

type TooltipStoryArgs = Pick<
  Tooltip,
  "placement" | "offsetDistance" | "offsetSkidding" | "open" | "pointerDisabled" | "scale"
>;

export default {
  title: "Components/Tooltip",
  args: {
    placement: placements[0],
    offsetDistance: 6,
    offsetSkidding: 0,
    open: false,
    pointerDisabled: false,
    scale: "m",
  },
  argTypes: {
    placement: {
      options: placements,
      control: { type: "select" },
    },
    scale: {
      options: ["s", "m", "l"],
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
      ${boolean("pointer-disabled", args.pointerDisabled)}
      scale="${args.scale}"
      ${boolean("open", args.open)}
    >
      <span> ${contentHTML} </span>
    </calcite-tooltip>
  </div>
`;

export const scaleVariants = (): string => html`
  <style>
    .tooltip-scale-variants {
      display: flex;
      flex-direction: column;
      gap: 56px;
      padding: 24px 24px 96px;
    }

    .tooltip-scale-variants__row {
      display: grid;
      grid-template-columns: repeat(2, minmax(220px, 1fr));
      gap: 32px;
    }

    .tooltip-scale-variants__row--header {
      align-items: start;
    }

    .tooltip-scale-variants__heading {
      font-weight: 600;
      text-align: center;
    }

    .tooltip-scale-variants__example {
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .tooltip-scale-variants__example--s {
      min-height: 96px;
    }

    .tooltip-scale-variants__example--m {
      min-height: 112px;
    }

    .tooltip-scale-variants__example--l {
      min-height: 128px;
    }
  </style>
  <div class="tooltip-scale-variants">
    <div class="tooltip-scale-variants__row tooltip-scale-variants__row--header">
      <div class="tooltip-scale-variants__heading">pointer</div>
      <div class="tooltip-scale-variants__heading">pointer disabled</div>
    </div>
    <div class="tooltip-scale-variants__row">
      <div class="tooltip-scale-variants__example tooltip-scale-variants__example--s">
        <calcite-button appearance="transparent" kind="neutral" id="reference-element-s">small</calcite-button>
        <calcite-tooltip open placement="bottom" reference-element="reference-element-s" scale="s"
          >Tooltip content</calcite-tooltip
        >
      </div>
      <div class="tooltip-scale-variants__example tooltip-scale-variants__example--s">
        <calcite-button appearance="transparent" kind="neutral" id="reference-element-s-no-pointer"
          >small</calcite-button
        >
        <calcite-tooltip
          open
          placement="bottom"
          pointer-disabled
          reference-element="reference-element-s-no-pointer"
          scale="s"
          >Tooltip content</calcite-tooltip
        >
      </div>
    </div>
    <div class="tooltip-scale-variants__row">
      <div class="tooltip-scale-variants__example tooltip-scale-variants__example--m">
        <calcite-button appearance="transparent" kind="neutral" id="reference-element-m">medium</calcite-button>
        <calcite-tooltip open placement="bottom" reference-element="reference-element-m" scale="m"
          >Tooltip content</calcite-tooltip
        >
      </div>
      <div class="tooltip-scale-variants__example tooltip-scale-variants__example--m">
        <calcite-button appearance="transparent" kind="neutral" id="reference-element-m-no-pointer"
          >medium</calcite-button
        >
        <calcite-tooltip
          open
          placement="bottom"
          pointer-disabled
          reference-element="reference-element-m-no-pointer"
          scale="m"
          >Tooltip content</calcite-tooltip
        >
      </div>
    </div>
    <div class="tooltip-scale-variants__row">
      <div class="tooltip-scale-variants__example tooltip-scale-variants__example--l">
        <calcite-button appearance="transparent" kind="neutral" id="reference-element-l">large</calcite-button>
        <calcite-tooltip open placement="bottom" reference-element="reference-element-l" scale="l"
          >Tooltip content</calcite-tooltip
        >
      </div>
      <div class="tooltip-scale-variants__example tooltip-scale-variants__example--l">
        <calcite-button appearance="transparent" kind="neutral" id="reference-element-l-no-pointer"
          >large</calcite-button
        >
        <calcite-tooltip
          open
          placement="bottom"
          pointer-disabled
          reference-element="reference-element-l-no-pointer"
          scale="l"
          >Tooltip content</calcite-tooltip
        >
      </div>
    </div>
  </div>
`;

export const smallViewport = (): string => html`
  <calcite-button appearance="transparent" kind="neutral" id="reference-element">nostrud</calcite-button>
  <calcite-tooltip reference-element="reference-element" open
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua</calcite-tooltip
  >
`;
smallViewport.parameters = { chromatic: { viewports: [300, 300] } };

export const open = (): string => html`
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

export const darkModeRTL = (): string => html`
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

darkModeRTL.parameters = { themes: modesDarkDefault };

export const rightAligned = (): string =>
  html`<div style="width:800px; height:800px;">
    <div style="text-align: right; width: 600px;">
      <a href="#" id="tooltip-button">Hover for Tooltip</a>
      <calcite-tooltip open reference-element="tooltip-button">
        <span>Tooltip content lorem ipsum</span>
      </calcite-tooltip>
    </div>
  </div>`;

export const transparentBG = (): string => html`
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

export const sharedReferenceElement = (): string =>
  html`<p style="margin:200px">
      Some text
      <button id="ref1">Button</button>
    </p>
    <calcite-tooltip placement="leading-start" reference-element="ref1" open>Content 1</calcite-tooltip>
    <calcite-tooltip placement="top-start" reference-element="ref1" open>Content 2</calcite-tooltip>
    <calcite-tooltip placement="bottom-start" reference-element="ref1" open>Content 3</calcite-tooltip>`;
