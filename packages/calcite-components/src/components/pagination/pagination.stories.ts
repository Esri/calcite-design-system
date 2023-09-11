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

export const responsiveSmall = (): string => html`
  <div style="width: 475px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="s"></calcite-pagination>
  </div>
  <div style="width: 476px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="s"></calcite-pagination>
  </div>
  <div style="width: 768px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="s"></calcite-pagination>
  </div>
  <div style="width: 1152px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="s"></calcite-pagination>
  </div>

  <div style="width: 475px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="s"></calcite-pagination>
  </div>
  <div style="width: 476px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="s"></calcite-pagination>
  </div>
  <div style="width: 768px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="s"></calcite-pagination>
  </div>
  <div style="width: 1152px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="s"></calcite-pagination>
  </div>

  <div style="width: 475px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="s"></calcite-pagination>
  </div>
  <div style="width: 476px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="s"></calcite-pagination>
  </div>
  <div style="width: 768px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="s"></calcite-pagination>
  </div>
  <div style="width: 1152px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="s"></calcite-pagination>
  </div>
`;

export const responsiveMedium = (): string => html`<div style="width: 475px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="m"></calcite-pagination>
  </div>
  <div style="width: 476px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="m"></calcite-pagination>
  </div>
  <div style="width: 768px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="m"></calcite-pagination>
  </div>
  <div style="width: 1152px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="m"></calcite-pagination>
  </div>

  <div style="width: 475px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="m"></calcite-pagination>
  </div>
  <div style="width: 476px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="m"></calcite-pagination>
  </div>
  <div style="width: 768px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="m"></calcite-pagination>
  </div>
  <div style="width: 1152px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="m"></calcite-pagination>
  </div>

  <div style="width: 475px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="m"></calcite-pagination>
  </div>
  <div style="width: 476px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="m"></calcite-pagination>
  </div>
  <div style="width: 768px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="m"></calcite-pagination>
  </div>
  <div style="width: 1152px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="m"></calcite-pagination>
  </div>`;

export const responsiveLarge = (): string => html`<div style="width: 475px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="l"></calcite-pagination>
  </div>
  <div style="width: 476px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="l"></calcite-pagination>
  </div>
  <div style="width: 768px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="l"></calcite-pagination>
  </div>
  <div style="width: 1152px">
    <calcite-pagination total-items="150000" page-size="100" start-item="5400" scale="l"></calcite-pagination>
  </div>

  <div style="width: 475px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="l"></calcite-pagination>
  </div>
  <div style="width: 476px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="l"></calcite-pagination>
  </div>
  <div style="width: 768px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="l"></calcite-pagination>
  </div>
  <div style="width: 1152px">
    <calcite-pagination total-items="150000" page-size="100" start-item="1" scale="l"></calcite-pagination>
  </div>

  <div style="width: 475px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="l"></calcite-pagination>
  </div>
  <div style="width: 476px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="l"></calcite-pagination>
  </div>
  <div style="width: 768px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="l"></calcite-pagination>
  </div>
  <div style="width: 1152px">
    <calcite-pagination total-items="150000" page-size="100" start-item="149901" scale="l"></calcite-pagination>
  </div>`;

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
