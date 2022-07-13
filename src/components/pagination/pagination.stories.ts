import { number, select } from "@storybook/addon-knobs";
import { locales } from "../../utils/locale";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

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
    total="${number("total", 123456789)}"
    num="${number("num", 10)}"
    dir="${select("dir", ["ltr", "rtl"], "ltr")}"
  >
  </calcite-pagination>
`;

export const Locales = (): string => html`
  <calcite-pagination
    lang="${select("lang", locales, "fr")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start="${number("start", 1)}"
    total="${number("total", 123456789)}"
    num="${number("num", 10)}"
    dir="${select("dir", ["ltr", "rtl"], "ltr")}"
  >
  </calcite-pagination>
`;

export const DarkMode = (): string => html`
  <calcite-pagination
    class="calcite-theme-dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start="${number("start", 1)}"
    total="${number("total", 123456789)}"
    num="${number("num", 10)}"
    dir="${select("dir", ["ltr", "rtl"], "ltr")}"
    class="calcite-theme-dark"
  >
  </calcite-pagination>
`;

DarkMode.parameters = { themes: themesDarkDefault };

export const RTL = (): string => html`
  <calcite-pagination
    dir="rtl"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start="${number("start", 1)}"
    total="${number("total", 123456789)}"
    num="${number("num", 10)}"
    dir="${select("dir", ["ltr", "rtl"], "ltr")}"
  >
  </calcite-pagination>
`;
