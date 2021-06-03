import { number, select } from "@storybook/addon-knobs";

import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Pagination",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <calcite-pagination
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start="${number("start", 1)}"
    total="${number("total", 128)}"
    num="${number("num", 20)}"
    dir="${select("dir", ["ltr", "rtl"], "ltr")}"
    theme="light"
  >
  </calcite-pagination>
`;

export const DarkMode = (): string => html`
  <calcite-pagination
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start="${number("start", 1)}"
    total="${number("total", 128)}"
    num="${number("num", 20)}"
    dir="${select("dir", ["ltr", "rtl"], "ltr")}"
    theme="dark"
  >
  </calcite-pagination>
`;

DarkMode.story = {
  parameters: { backgrounds: darkBackground }
};

export const RTL = (): string => html`
  <calcite-pagination
    dir="rtl"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start="${number("start", 1)}"
    total="${number("total", 128)}"
    num="${number("num", 20)}"
    dir="${select("dir", ["ltr", "rtl"], "ltr")}"
    theme="light"
  >
  </calcite-pagination>
`;
