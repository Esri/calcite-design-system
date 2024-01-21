import { number, select } from "@storybook/addon-knobs";
import { locales, numberingSystems } from "../../utils/locale";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
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
  <style>
    .sb-show-main.sb-main-centered #root {
      padding: 0 !important;
      flex: 1;
      width: 100%;
    }
  </style>
  <calcite-pagination
    scale="${select("scale", ["s", "m", "l"], "m")}"
    start-item="${number("start-item", 1)}"
    lang="${select("lang", locales, "en")}"
    numbering-system="${select("numbering-system", numberingSystems, "latn")}"
    total-items="${number("total-items", 123456789)}"
    page-size="${number("page-size", 10)}"
  >
  </calcite-pagination>
`;

const getResponsiveTemplate = ({
  totalItems,
  pageSize,
  type,
}: {
  totalItems: number;
  pageSize: number;
  type: "first" | "last" | "middle";
}) => {
  return html`
    <calcite-pagination
      lang="${select("locale", locales, "en")}"
      numbering-system="${select("numbering-system", numberingSystems, "latn")}"
      total-items="${totalItems}"
      page-size="${pageSize}"
      start-item="${type === "last"
        ? totalItems - pageSize + 1
        : type === "middle"
          ? totalItems / 2 - Math.max(pageSize / 2, 1) + 1
          : 1}"
      scale="{scale}"
    ></calcite-pagination>
  `;
};

export const responsiveLargeNumberFirstPage_TestOnly = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 150000, pageSize: 100, type: "first" }));

export const responsiveLargeNumberMiddlePage_TestOnly = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 150000, pageSize: 100, type: "middle" }));

export const responsiveLargeNumberLastPage_TestOnly = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 150000, pageSize: 100, type: "last" }));

export const responsiveSmallNumberFirstPage_TestOnly = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 50, pageSize: 10, type: "first" }));

export const responsiveSmallNumberMiddlePage_TestOnly = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 50, pageSize: 10, type: "middle" }));

export const responsiveSmallNumberLastPage_TestOnly = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 50, pageSize: 10, type: "last" }));

export const responsiveTinyNumberFirstPage_TestOnly = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 12, pageSize: 1, type: "first" }));

export const responsiveTinyNumberMiddlePage_TestOnly = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 12, pageSize: 1, type: "middle" }));

export const responsiveTinyNumberLastPage_TestOnly = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 12, pageSize: 1, type: "last" }));

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

export const arabicNumberingSystemAndRTL_TestOnly = (): string =>
  html`<calcite-pagination
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
