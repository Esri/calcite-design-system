import { select, number, text } from "@storybook/addon-knobs";
import readme from "./readme.md";
import { html } from "../../tests/utils";
import { boolean, createSteps, stepStory, themeToggleScript } from "../../../.storybook/helpers";

const placements = [
  "auto",
  "auto-start",
  "auto-end",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end"
];

const calcite_placements = placements.concat([
  "leading-start",
  "leading",
  "leading-end",
  "trailing-end",
  "trailing",
  "trailing-start",
  "leading-leading",
  "leading-trailing",
  "trailing-leading",
  "trailing-trailing",
  "top-leading",
  "top-trailing",
  "bottom-leading",
  "bottom-trailing",
  "right-leading",
  "right-trailing",
  "left-leading",
  "left-trailing"
]);

const contentHTML = `
<div style="width: 300px; padding:12px 16px;">
  <b>I am a title!</b> <br>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <calcite-link>I am an inline link</calcite-link>
</div>
`;

const referenceElementHTML = `<calcite-popover-manager>Ut enim ad minim veniam, quis <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.</calcite-popover-manager>`;

export default {
  title: "Components/Popover",

  parameters: {
    notes: readme
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
        placement="${select("placement", calcite_placements, "auto")}"
        offset-distance="${number("offset-distance", 6)}"
        offset-skidding="${number("offset-skidding", 0)}"
        ${boolean("open", false)}
        text-close="${text("text-close", "Close")}"
      >
        ${contentHTML}
      </calcite-popover>
    </div>
  `,
  createSteps()
    .click("calcite-button")
    .snapshot("Default")
    .executeScript('window.location.href = "?path=/story/components-popover--simple&knob-dismissible=true"')
    .snapshot("dismissible")
    .rtl()
    .snapshot("Rtl")
    .ltr()
    .executeScript(themeToggleScript)
    .snapshot("Dark theme")
);
