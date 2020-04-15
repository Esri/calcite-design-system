import { storiesOf } from "@storybook/html";
import {
  withKnobs,
  boolean,
  select,
  number,
  text
} from "@storybook/addon-knobs";
import { parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

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
  "trailing-start"
]);

const contentHTML = `
<div style="padding:12px 16px">
  <b>I am a title!</b> <br>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <calcite-link>I am an inline link</calcite-link>
</div>
`;

const referenceElementHTML = `<calcite-popover-manager>Ut enim ad minim veniam, quis <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button> ullamco laboris nisi ut aliquip ex ea commodo consequat.</calcite-popover-manager>`;

storiesOf("Popover", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => {
      return `
      <div>
        ${referenceElementHTML}
        <calcite-popover
          theme="light"
          close-button="${boolean("close-button", false)}"
          disable-flip="${boolean("disable-flip", false)}"
          disable-pointer="${boolean("disable-pointer", false)}"
          reference-element="reference-element"
          placement="${select("placement", calcite_placements, "auto")}"
          offset-distance="${number("offset-distance", 6)}"
          offset-skidding="${number("offset-skidding", 0)}"
          open="${boolean("open", true)}"
          text-close="${text("text-close", "Close")}"
        >
          ${contentHTML}
        </calcite-popover>
      </div>
    `;
    },
    { notes }
  )
  .add(
    "Dark Mode",
    () => {
      return `
      <div>
        ${referenceElementHTML}
        <calcite-popover
          theme="dark"
          close-button="${boolean("close-button", false)}"
          disable-flip="${boolean("disable-flip", false)}"
          disable-pointer="${boolean("disable-pointer", false)}"
          reference-element="reference-element"
          placement="${select("placement", calcite_placements, "auto")}"
          offset-distance="${number("offset-distance", 6)}"
          offset-skidding="${number("offset-skidding", 0)}"
          open="${boolean("open", true)}"
          text-close="${text("text-close", "Close")}"
        >
          ${contentHTML}
        </calcite-popover>
      </div>
    `;
    },
    { notes }
  );
