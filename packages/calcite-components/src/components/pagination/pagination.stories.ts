import { number, select } from "@storybook/addon-knobs";
import { locales } from "../../utils/locale";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";
import { storyFilters } from "../../../.storybook/helpers";
import { Scale } from "../interfaces";

export default {
  title: "Components/Pagination",
  parameters: {
    notes: readme,
    chromatic: {
      delay: 500,
    },
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-pagination
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start-item="${number("start-item", 1)}"
    lang="${select("lang", locales, "en")}"
    total-items="${number("total-items", 123456789)}"
    page-size="${number("page-size", 10)}"
  >
  </calcite-pagination>
`;

const breakpoints = [475, 476, 768, 1152];

const getResponsiveTemplate = (width: number, scale: Scale) => {
  return html`<strong>Width: ${width}px</strong>
    <div style="width: ${width}px; margin: 1em 0;">
      <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="${scale}"></calcite-pagination>
      <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="${scale}"></calcite-pagination>
      <calcite-pagination
        total-items="150000"
        page-size="100"
        start-item="149901"
        scale="${scale}"
      ></calcite-pagination>
    </div>`;
};

export const responsiveSmall = (): string => breakpoints.map((width) => getResponsiveTemplate(width, "s")).join("");

export const responsiveMedium = (): string => breakpoints.map((width) => getResponsiveTemplate(width, "m")).join("");

export const responsiveLarge = (): string => breakpoints.map((width) => getResponsiveTemplate(width, "l")).join("");

export const darkModeFrenchLocaleAndLargeScaleGetsMediumChevron_TestOnly = (): string => html`
  <calcite-pagination
    class="calcite-mode-dark"
    start-item="1"
    lang="fr"
    group-separator
    total-items="123456789"
    page-size="10"
    scale="l"
  >
  </calcite-pagination>
`;

darkModeFrenchLocaleAndLargeScaleGetsMediumChevron_TestOnly.parameters = { modes: modesDarkDefault };

export const arabicNumberingSystemAndRTL_TestOnly = (): string => html`<calcite-pagination
  dir="rtl"
  numbering-system="arab"
  start-item="1"
  lang="fr"
  total-items="123456789"
  page-size="10"
>
</calcite-pagination>`;

arabicNumberingSystemAndRTL_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};
