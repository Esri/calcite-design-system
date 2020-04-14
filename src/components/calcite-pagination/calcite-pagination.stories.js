import { storiesOf } from "@storybook/html";
import { withKnobs, number, select } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Pagination", module)
.addDecorator(withKnobs)
.add(
  "Simple",
  () => `
    <calcite-pagination
      start="${number("start", 1)}"
      total="${number("total", 128)}"
      num="${number("num", 20)}"
      dir="${select("dir", ["ltr", "rtl"],"ltr")}"
      theme="light"
    >
    </calcite-pagination>
  `,
  { notes }
)
.add(
  "Dark Mode",
  () => `
    <calcite-pagination
      start="${number("start", 1)}"
      total="${number("total", 128)}"
      num="${number("num", 20)}"
      dir="${select("dir", ["ltr", "rtl"],"ltr")}"
      theme="dark"
    >
    </calcite-pagination>
  `,
  { notes, backgrounds: darkBackground }
);