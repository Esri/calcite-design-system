import { select, number } from "@storybook/addon-knobs";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { boolean, createSteps, stepStory, setTheme } from "../../../.storybook/helpers";
import { placements } from "../../utils/floating-ui";

const contentHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;

const referenceElementHTML = `Ut enim ad minim veniam, quis <calcite-button appearance="inline" title="Reference element" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

export default {
  title: "Components/Tooltip",

  parameters: {
    notes: readme
  }
};

export const Simple = stepStory(
  (): string => html`
    <div style="width: 400px;">
      ${referenceElementHTML}
      <calcite-tooltip
        reference-element="reference-element"
        placement="${select("placement", placements, "auto")}"
        offset-distance="${number("offset-distance", 6)}"
        offset-skidding="${number("offset-skidding", 0)}"
        ${boolean("open", false)}
      >
        ${contentHTML}
      </calcite-tooltip>
    </div>
  `,
  createSteps("calcite-tooltip")
    .snapshot("Default")
    .hover("#reference-element")
    .snapshot("Open")
    .rtl()
    .snapshot("Rtl")
    .ltr()
    .executeScript(setTheme("dark"))
    .snapshot("Dark theme")
);
