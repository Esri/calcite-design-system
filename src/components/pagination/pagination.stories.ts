import { number, select } from "@storybook/addon-knobs";
import { locales } from "../../utils/locale";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { storyFilters } from "../../../.storybook/helpers";

export default {
  title: "Components/Pagination",
  parameters: {
    notes: readme,
    chromatic: {
      delay: 500
    }
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

export const darkModeFrenchLocale_TestOnly = (): string => html`<calcite-pagination
  class="calcite-mode-dark"
  start="1"
  lang="fr"
  group-separator
  total="123456789"
  num="10"
>
</calcite-pagination>`;

darkModeFrenchLocale_TestOnly.parameters = { modes: modesDarkDefault };

export const arabicNumberingSystemAndRTL_TestOnly = (): string => html`<calcite-pagination
  dir="rtl"
  numbering-system="arab"
  start="1"
  lang="fr"
  total="123456789"
  num="10"
>
</calcite-pagination>`;

arabicNumberingSystemAndRTL_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 }
};
