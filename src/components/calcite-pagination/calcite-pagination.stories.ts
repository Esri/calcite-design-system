import { storiesOf } from "@storybook/html";
import { number, select } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";

storiesOf("Components/Pagination", module)
  .addParameters({ notes: readme })
  .add(
    "Simple",
    () => `
    <calcite-pagination
      scale="${select("scale", ["s", "m", "l"], "m")}"
      start="${number("start", 1)}"
      total="${number("total", 128)}"
      num="${number("num", 20)}"
      dir="${select("dir", ["ltr", "rtl"], "ltr")}"
      theme="light"
    >
    </calcite-pagination>
  `
  )
  .add(
    "Dark Mode",
    () => `
    <calcite-pagination
      scale="${select("scale", ["s", "m", "l"], "m")}"
      start="${number("start", 1)}"
      total="${number("total", 128)}"
      num="${number("num", 20)}"
      dir="${select("dir", ["ltr", "rtl"], "ltr")}"
      theme="dark"
    >
    </calcite-pagination>
  `,
    { backgrounds: darkBackground }
  );
