import { select, number, text } from "@storybook/addon-knobs";
import { html } from "../../tests/utils";
import { boolean, createSteps, stepStory, setTheme, setKnobs } from "../../../.storybook/helpers";
import readme from "./readme.md";
import managerReadme from "../calcite-popover-manager/readme.md";

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
    notes: [readme, managerReadme]
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
  createSteps("calcite-popover")
    // Default
    .snapshot("Default")

    // Open
    .click("#reference-element")
    .snapshot("Open")

    // Open RTL
    .rtl()
    .snapshot("Open RTL")

    // Open Dark
    .ltr()
    .executeScript(setTheme("dark"))
    .snapshot("Open Dark")

    // Open RTL Dark
    .rtl()
    .snapshot("Open RTL Dark")

    // Open Dismissable
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(setKnobs({ story: "components-popover--simple", knobs: [{ name: "dismissible", value: "true" }] }))
    .snapshot("Open Dismissible")

    // Open Dismissable RTL
    .rtl()
    .snapshot("Open Dismissible RTL")

    // Open Dismissable Dark
    .ltr()
    .executeScript(setTheme("dark"))
    .snapshot("Open Dismissible Dark")

    // Open Dismissable RTL Dark
    .rtl()
    .executeScript(setTheme("dark"))
    .snapshot("Open Dismissible RTL Dark")

    // Open Disable Pointer
    .ltr()
    .executeScript(setTheme("light"))
    .executeScript(
      setKnobs({ story: "components-popover--simple", knobs: [{ name: "disable-pointer", value: "true" }] })
    )
    .snapshot("Open Disable Pointer")

    // Open Disable Pointer RTL
    .rtl()
    .snapshot("Open Disable Pointer RTL")

    // Open Disable Pointer Dark
    .ltr()
    .executeScript(setTheme("dark"))
    .snapshot("Open Disable Pointer Dark")

    // Open Disable Pointer RTL Dark
    .rtl()
    .executeScript(setTheme("dark"))
    .snapshot("Open Disable Pointer RTL Dark")
);
