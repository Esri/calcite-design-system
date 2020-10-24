import { storiesOf } from "@storybook/html";
import { select, text } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Avatar", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    () => `
    <calcite-avatar
      scale="${select("scale", ["s", "m", "l"], "m")}"
      first-name="${text("first-name", "John")}"
      last-name="${text("last-name", "Doe")}"
      src="${text("src", "http://placekitten.com/120/120")}"
    >
    </calcite-avatar>
  `
  )
  .add(
    "Dark Theme",
    () => `
    <calcite-avatar
    theme="dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    first-name="${text("first-name", "John")}"
    last-name="${text("last-name", "Doe")}"
    src="${text("src", "http://placekitten.com/120/120")}"
  >
  </calcite-avatar>
    `,
    { backgrounds: darkBackground }
  );
