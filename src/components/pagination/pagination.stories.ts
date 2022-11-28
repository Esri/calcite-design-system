import { number, select } from "@storybook/addon-knobs";
import { locales } from "../../utils/locale";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { storyFilters } from "../../../.storybook/helpers";

export default {
  title: "Components/Pagination",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string => html`
  <calcite-pagination
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start="${number("start", 1)}"
    lang="${select("lang", locales, "en")}"
    total="${number("total", 123456789)}"
    num="${number("num", 10)}"
  >
  </calcite-pagination>
`;

export const darkThemeFrenchLocaleAndRTL_TestOnly = (): string => html`
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

darkThemeFrenchLocaleAndRTL_TestOnly.parameters = { themes: themesDarkDefault };
