import { storiesOf } from "@storybook/html";
import { select, text } from "@storybook/addon-knobs";
import { boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";

storiesOf("Components/Time", module)
  .addParameters({ notes: readme })
  .add(
    "Basic",
    () => `
      <calcite-time
        ${boolean("active", false)}
        ${boolean("disabled", false)}
        ${boolean("focused", false)}
        ${boolean("hidden", false)}
        name="${text("name", "basic")}"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        value="${text("value", "")}"
      >
      </calcite-time>
  `
  );
