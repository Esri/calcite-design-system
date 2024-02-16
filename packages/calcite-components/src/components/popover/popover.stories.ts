import { select, number, text } from "@storybook/addon-knobs";
import { html } from "../../../support/formatting";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { placements } from "../../utils/floating-ui";
import readme from "./readme.md";
import { defaultPopoverPlacement } from "../popover/resources";
import { modesDarkDefault } from "../../../.storybook/utils";

const contentHTML = `
<div style="width: 300px; padding:12px 16px;">
  <b>I am a title!</b> <br>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <calcite-link>I am an inline link</calcite-link>
</div>
`;

const referenceElementHTML = `Ut enim ad minim veniam, quis <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
const nestedReferenceElementHTML = `Ut enim ad minim veniam, quis <calcite-button title="Nested Reference Element" id="reference-element-nested">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

export default {
  title: "Components/Popover",
  parameters: {
    notes: [readme],
    chromatic: {
      delay: 500,
    },
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      ${boolean("closable", false)}
      ${boolean("flip-disabled", false)}
      ${boolean("pointer-disabled", false)}
      reference-element="reference-element"
      placement="${select("placement", placements, defaultPopoverPlacement)}"
      offset-distance="${number("offset-distance", 6)}"
      offset-skidding="${number("offset-skidding", 0)}"
      ${boolean("open", true)}
      text-close="${text("text-close", "Close")}"
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`;

export const darkModeRTL_TestOnly = (): string =>
  html` <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      ${boolean("closable", false)}
      ${boolean("flip-disabled", false)}
      ${boolean("pointer-disabled", false)}
      reference-element="reference-element"
      placement="${select("placement", placements, defaultPopoverPlacement)}"
      offset-distance="${number("offset-distance", 6)}"
      offset-skidding="${number("offset-skidding", 0)}"
      ${boolean("open", true)}
      text-close="${text("text-close", "Close")}"
      dir="${select("dir", ["ltr", "rtl"], "rtl")}"
      class="calcite-mode-dark"
    >
      ${contentHTML}
    </calcite-popover>
  </div>`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const nested = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      ${boolean("closable", true)}
      reference-element="reference-element"
      placement="${select("placement", placements, defaultPopoverPlacement)}"
      ${boolean("open", true)}
    >
      <div style="width: 300px; padding:12px 16px;">${nestedReferenceElementHTML}</div>
      <calcite-popover
        heading="${text("heading", "Heading")}"
        ${boolean("closable", true)}
        reference-element="reference-element-nested"
        placement="${select("placement", placements, defaultPopoverPlacement)}"
        ${boolean("open", true)}
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

export const theming_TestOnly = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      style="
      --calcite-popover-background-color: lightblue;
      --calcite-popover-border-color: green;
      --calcite-popover-text-color: purple;
      --calcite-popover-corner-radius: 20px;
      --calcite-floating-ui-z-index: 100;
    "
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
    >
      ${contentHTML}
    </calcite-popover>
  </div>
`;
