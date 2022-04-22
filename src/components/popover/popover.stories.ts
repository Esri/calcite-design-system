import { select, number, text } from "@storybook/addon-knobs";
import { html } from "../../../support/formatting";
import { boolean, createSteps, stepStory, setTheme, setKnobs } from "../../../.storybook/helpers";
import { popperPlacements } from "../../utils/popper";
import readme from "./readme.md";
import { defaultPopoverPlacement } from "../popover/resources";

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
  }
};

export const Simple = stepStory(
  (): string => html`
    <div style="width: 400px;">
      ${referenceElementHTML}
      <calcite-popover
        ${boolean("dismissible", false)}
        ${boolean("disable-flip", false)}
        ${boolean("disable-pointer", false)}
        reference-element="reference-element"
        placement="${select("placement", popperPlacements, defaultPopoverPlacement)}"
        offset-distance="${number("offset-distance", 6)}"
        offset-skidding="${number("offset-skidding", 0)}"
        ${boolean("open", false)}
        text-close="${text("text-close", "Close")}"
      >
        ${contentHTML}
      </calcite-popover>
    </div>
  `,
  createSteps("calcite-popover")
    .snapshot("Default")
    .click("#reference-element")
    .snapshot("Open")
    .executeScript(setKnobs({ story: "components-popover--simple", knobs: [{ name: "dismissible", value: "true" }] }))
    .click("#reference-element")
    .snapshot("dismissible")
    .rtl()
    .snapshot("Rtl")
    .ltr()
    .executeScript(setTheme("dark"))
    .snapshot("Dark theme")
);

export const Nested = stepStory(
  (): string => html`
    <div style="width: 400px;">
      ${referenceElementHTML}
      <calcite-popover
        ${boolean("dismissible", true)}
        reference-element="reference-element"
        placement="${select("placement", popperPlacements, defaultPopoverPlacement)}"
        ${boolean("open", false)}
      >
        <div style="width: 300px; padding:12px 16px;">${nestedReferenceElementHTML}</div>
        <calcite-popover
          ${boolean("dismissible", true)}
          reference-element="reference-element-nested"
          placement="${select("placement", popperPlacements, defaultPopoverPlacement)}"
          ${boolean("open", false)}
        >
          ${contentHTML}
        </calcite-popover>
      </calcite-popover>
    </div>
  `,
  createSteps("calcite-popover")
    .click("#reference-element")
    .snapshot("Single popover open")
    .click("#reference-element-nested")
    .snapshot("Multiple popovers open")
);
