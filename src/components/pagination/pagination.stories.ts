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

export const simple = (): string => html`
  <calcite-pagination
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start="${number("start", 1)}"
    lang="${select("lang", locales, "en")}"
    total="${number("total", 123456789)}"
    num="${number("num", 10)}"
    dir="${select("dir", ["ltr", "rtl"], "ltr")}"
  >
  </calcite-pagination>
`;

export const darkThemeFrenchLocaleAndRTL = (): string => html`
  <calcite-pagination
    class="calcite-theme-dark"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start="${number("start", 1)}"
    lang="fr"
    total="${number("total", 123456789)}"
    num="${number("num", 10)}"
    dir="rtl"
    }
  >
  </calcite-pagination>
`;

darkThemeFrenchLocaleAndRTL.parameters = { themes: themesDarkDefault };
