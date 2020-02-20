import { storiesOf } from "@storybook/html";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Button with Overflow", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-button-with-overflow
        color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
        scale="${select("size", ["xs", "s", "m", "l", "xl"], "xs")}"
        loading="${boolean("loading", false)}"
        disabled="${boolean("disabled", false)}">
      <calcite-button scale="xs" appearance="transparent" width="full">
        Secondary Action
      </calcite-button>
    </calcite-button-with-overflow>
  `,
    { notes }
  )
  .add(
    "RTL",
    () => `
    <div dir='rtl'>
      <calcite-button-with-overflow
          color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
          scale="${select("size", ["xs", "s", "m", "l", "xl"], "xs")}"
          loading="${boolean("loading", false)}"
          disabled="${boolean("disabled", false)}">
        <calcite-button scale="xs" appearance="transparent" width="full">
          Secondary Action
        </calcite-button>
      </calcite-button-with-overflow>
    </div>
  `,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <calcite-button-with-overflow
        color="${select("color", ["blue", "red", "dark", "light"], "blue")}"
        scale="${select("size", ["xs", "s", "m", "l", "xl"], "xs")}"
        loading="${boolean("loading", false)}"
        disabled="${boolean("disabled", false)}"
        theme="dark">
      <calcite-button scale="xs" appearance="transparent" width="full">
        Secondary Action
      </calcite-button>
    </calcite-button-with-overflow>
  `,
    { notes, backgrounds: darkBackground }
  )
