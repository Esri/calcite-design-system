import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { placements } from "../../utils/floating-ui";
import { modesDarkDefault } from "../../../.storybook/utils";
import { defaultPopoverPlacement } from "./resources";
import { Popover } from "./popover";

const contentHTML = `
<div style="width: 300px; padding:12px 16px;">
  <b>I am a title!</b> <br>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <calcite-link>I am an inline link</calcite-link>
</div>
`;

const referenceElementHTML = `Ut enim ad minim veniam, quis <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
const nestedReferenceElementHTML = `Ut enim ad minim veniam, quis <calcite-button title="Nested Reference Element" id="reference-element-nested">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

interface PopoverStoryArgs
  extends Pick<
    Popover,
    "closable" | "flipDisabled" | "pointerDisabled" | "placement" | "offsetDistance" | "offsetSkidding" | "open"
  > {
  textClose: string;
}

export default {
  title: "Components/Popover",
  args: {
    closable: false,
    flipDisabled: false,
    pointerDisabled: false,
    placement: defaultPopoverPlacement,
    offsetDistance: 6,
    offsetSkidding: 0,
    open: true,
    textClose: "Close",
  },
  argTypes: {
    placement: {
      options: placements,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const simple = (args: PopoverStoryArgs): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      ${boolean("closable", args.closable)}
      ${boolean("flip-disabled", args.flipDisabled)}
      ${boolean("pointer-disabled", args.pointerDisabled)}
      reference-element="reference-element"
      placement="${args.placement}"
      offset-distance="${args.offsetDistance}"
      offset-skidding="${args.offsetSkidding}"
      ${boolean("open", args.open)}
      text-close="${args.textClose}"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`;

export const smallViewport = (): string => html`
  ${referenceElementHTML}
  <calcite-popover reference-element="reference-element" open>
    <b>I am a title!</b> <br />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </p>
    <calcite-link>I am an inline link</calcite-link>
  </calcite-popover>
`;
smallViewport.parameters = { chromatic: { viewports: [300, 300] } };

export const darkModeRTL_TestOnly = (): string =>
  html` <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      reference-element="reference-element"
      placement="${defaultPopoverPlacement}"
      offset-distance="6"
      offset-skidding="0"
      open
      text-close="Close"
      dir="rtl"
      class="calcite-mode-dark"
    >
      ${contentHTML}
    </calcite-popover>
  </div>`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const nested = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover closable reference-element="reference-element" placement="${defaultPopoverPlacement}" open>
      <div style="width: 300px; padding:12px 16px;">${nestedReferenceElementHTML}</div>
      <calcite-popover
        heading="Heading"
        closable
        reference-element="reference-element-nested"
        placement="${defaultPopoverPlacement}"
        open
      >
        ${contentHTML}
      </calcite-popover>
    </calcite-popover>
  </div>
`;

nested.parameters = {
  chromatic: { delay: 1500 },
};

export const flipPlacements_TestOnly = (): string => html`
  <div style="height: 100px; overflow:scroll; width: 200px;">
    <div class="my-popover-reference">
      <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button>
    </div>
    <calcite-popover class="my-popover" reference-element="reference-element" open placement="top" heading="Heading">
      ${contentHTML}
    </calcite-popover>
  </div>
  <script>
    document.querySelector(".my-popover").flipPlacements = ["right"];
  </script>
`;

export const scaleConsistencyPopoverHeadingActionSlottedIcon_TestOnly = (): string => html`
  <div style="width: 800px; height:800px;">
    <div style="width: 400px;">
      ${referenceElementHTML}
      <calcite-popover
        heading="Dreams didn't make us kings. Dragons did. 🐉"
        reference-element="reference-element"
        placement="auto"
        open
        closable
        scale="m"
      >
        ${contentHTML}
      </calcite-popover>
    </div>
  </div>
`;

export const smallScaleLayout_TestOnly = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="s"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`;

export const mediumScaleLayout_TestOnly = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="m"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`;

export const largeScaleLayout_TestOnly = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`;

export const transparentBG_TestOnly = (): string => html`
  <style>
    calcite-popover {
      --calcite-color-foreground-1: rgba(0, 0, 0, 0.5);
      --calcite-color-text-1: orange;
    }
  </style>
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`;

export const closedShouldNotCauseScrollbars = (): string =>
  html`<calcite-popover reference-element="button">
      <div style="width:10000px; height:10000px;">Popover</div>
    </calcite-popover>
    <calcite-button id="button">Button</calcite-button>`;
