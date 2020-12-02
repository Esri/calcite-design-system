import { storiesOf } from "@storybook/html";
import { select, text } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Avatar", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    (): string => `
      <calcite-avatar
        scale="${select("scale", ["s", "m", "l"], "m")}"
        full-name="${text("full-name", "John Doe")}"
        username="${text("username", "jdoe")}"
        user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
        thumbnail="${text("thumbnail", "http://placekitten.com/120/120")}"
      >
      </calcite-avatar>
    `
  )
  .add(
    "Missing thumbnail",
    (): string => `
      <calcite-avatar
        scale="${select("scale", ["s", "m", "l"], "m")}"
        full-name="${text("full-name", "John Doe")}"
        username="${text("username", "jdoe")}"
        user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
      >
      </calcite-avatar>
    `,
    { backgrounds: darkBackground }
  )
  .add(
    "Dark",
    (): string => `
      <calcite-avatar
        theme="dark"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        full-name="${text("full-name", "John Doe")}"
        username="${text("username", "jdoe")}"
        user-id="${text("user-id", "9a7c50e6b3ce4b859f7b31e302437164")}"
      >
      </calcite-avatar>
    `,
    { backgrounds: darkBackground }
  );
