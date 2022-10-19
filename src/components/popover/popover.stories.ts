import { select, number, text } from "@storybook/addon-knobs";
import { html } from "../../../support/formatting";
import { boolean, createSteps, stepStory, storyFilters } from "../../../.storybook/helpers";
import { placements, repositionDebounceTimeout } from "../../utils/floating-ui";
import readme from "./readme.md";
import { defaultPopoverPlacement } from "../popover/resources";
import { themesDarkDefault } from "../../../.storybook/utils";

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
    notes: [readme]
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      ${boolean("dismissible", false)}
      ${boolean("disable-flip", false)}
      ${boolean("disable-pointer", false)}
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

export const darkThemeRTL_TestOnly = (): string => html` <div style="width: 400px;">
  ${referenceElementHTML}
  <calcite-popover
    ${boolean("dismissible", false)}
    ${boolean("disable-flip", false)}
    ${boolean("disable-pointer", false)}
    reference-element="reference-element"
    placement="${select("placement", placements, defaultPopoverPlacement)}"
    offset-distance="${number("offset-distance", 6)}"
    offset-skidding="${number("offset-skidding", 0)}"
    ${boolean("open", true)}
    text-close="${text("text-close", "Close")}"
    dir="${select("dir", ["ltr", "rtl"], "rtl")}"
    class="calcite-theme-dark"
  >
    ${contentHTML}
  </calcite-popover>
</div>`;

darkThemeRTL_TestOnly.parameters = { themes: themesDarkDefault };

export const nested = (): string => html`
  <div style="width: 400px;">
    ${referenceElementHTML}
    <calcite-popover
      ${boolean("dismissible", true)}
      reference-element="reference-element"
      placement="${select("placement", placements, defaultPopoverPlacement)}"
      ${boolean("open", true)}
    >
      <div style="width: 300px; padding:12px 16px;">${nestedReferenceElementHTML}</div>
      <calcite-popover
        heading="${text("heading", "Heading")}"
        ${boolean("dismissible", true)}
        reference-element="reference-element-nested"
        placement="${select("placement", placements, defaultPopoverPlacement)}"
        ${boolean("open", true)}
      >
        ${contentHTML}
      </calcite-popover>
    </calcite-popover>
  </div>
`;

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
