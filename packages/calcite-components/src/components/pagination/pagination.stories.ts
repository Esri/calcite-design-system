import { locales, numberingSystems, defaultLocale, defaultNumberingSystem } from "../../utils/locale";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { scale } = ATTRIBUTES;

interface PaginationArgs {
  scale: string;
  startItem: number;
  lang: string;
  numberingSystem: string;
  totalItems: number;
  pageSize: number;
}

export default {
  title: "Components/Pagination",
  args: {
    scale: scale.defaultValue,
    startItem: 1,
    lang: defaultLocale,
    numberingSystem: defaultNumberingSystem,
    totalItems: 123456789,
    pageSize: 10,
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    lang: {
      options: locales,
      control: { type: "select" },
    },
    numberingSystem: {
      options: numberingSystems,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const simple = (args: PaginationArgs): string => html`
  <style>
    .sb-show-main.sb-main-centered #storybook-root {
      padding: 0 !important;
      flex: 1;
      width: 100%;
    }
  </style>
  <calcite-pagination
    scale="${args.scale}"
    start-item="${args.startItem}"
    lang="${args.lang}"
    numbering-system="${args.numberingSystem}"
    total-items="${args.totalItems}"
    page-size="${args.pageSize}"
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
      lang="${defaultLocale}"
      numbering-system="${defaultNumberingSystem}"
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
  <div style="width:480px;">
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
  </div>
`;

darkModeFrenchLocaleAndLargeScaleGetsMediumChevron_TestOnly.parameters = { themes: modesDarkDefault };

export const arabicNumberingSystemAndRTL_TestOnly = (): string => html`
  <div style="width:480px;">
    <calcite-pagination
      dir="rtl"
      numbering-system="arab"
      start-item="1"
      lang="fr"
      total-items="123456789"
      page-size="10"
    >
    </calcite-pagination>
  </div>
`;

arabicNumberingSystemAndRTL_TestOnly.parameters = {
  chromatic: { diffThreshold: 1 },
};

export const theming_TestOnly = (): string => html`
  <div style="width:480px;">
    <calcite-pagination
      total-items="1200"
      page-size="100"
      start-item="1"
      style="
      --calcite-pagination-item-text-color: green;
      --calcite-pagination-item-text-color-hover: darkgreen;
      --calcite-pagination-item-text-color-selected: teal;
      --calcite-pagination-item-background-color: lightyellow;
      --calcite-pagination-item-background-color-hover: yellow;
      --calcite-pagination-item-background-color-active: gold;
      --calcite-pagination-item-border-color-selected: green;
      --calcite-pagination-item-border-color-hover: orange;
      --calcite-pagination-arrow-icon-color: blue;
      --calcite-pagination-arrow-icon-color-hover: pink;
      --calcite-pagination-arrow-icon-color-active: red;
      --calcite-pagination-arrow-background-color: lightyellow;
      --calcite-pagination-arrow-background-color-hover: orange;
      --calcite-pagination-arrow-background-color-active: gold;
    "
    ></calcite-pagination>
  </div>
`;
