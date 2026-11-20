import { defaultLocale } from "@arcgis/toolkit/intl";
import { defaultNumberingSystem } from "../../utils/locale";
import { boolean, createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Pagination } from "./pagination";
import "./pagination"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

const { numberingSystem, scale, supportedNlsLocale } = ATTRIBUTES;

interface PaginationStoryArgs extends Pick<
  Pagination,
  "groupSeparator" | "numberingSystem" | "pageSize" | "scale" | "startItem" | "totalItems"
> {
  lang: string;
}

export default {
  title: "Components/Pagination",
  args: {
    scale: scale.defaultValue,
    startItem: 1,
    lang: defaultLocale,
    numberingSystem: numberingSystem.defaultValue,
    groupSeparator: false,
    totalItems: 123456789,
    pageSize: 10,
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    lang: {
      options: supportedNlsLocale.values,
      control: { type: "select" },
    },
    numberingSystem: {
      options: numberingSystem.values,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const simple = (args: PaginationStoryArgs): string => html`
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
    ${boolean("group-separator", args.groupSeparator)}
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

export const responsiveLargeNumberFirstPage = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 150000, pageSize: 100, type: "first" }));

export const responsiveLargeNumberMiddlePage = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 150000, pageSize: 100, type: "middle" }));

export const responsiveLargeNumberLastPage = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 150000, pageSize: 100, type: "last" }));

export const responsiveSmallNumberFirstPage = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 50, pageSize: 10, type: "first" }));

export const responsiveSmallNumberMiddlePage = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 50, pageSize: 10, type: "middle" }));

export const responsiveSmallNumberLastPage = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 50, pageSize: 10, type: "last" }));

export const responsiveTinyNumberFirstPage = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 12, pageSize: 1, type: "first" }));

export const responsiveTinyNumberMiddlePage = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 12, pageSize: 1, type: "middle" }));

export const responsiveTinyNumberLastPage = (): string =>
  createBreakpointStories(getResponsiveTemplate({ totalItems: 12, pageSize: 1, type: "last" }));

export const darkModeFrenchLocaleAndLargeScaleGetsMediumChevron = (): string => html`
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

darkModeFrenchLocaleAndLargeScaleGetsMediumChevron.parameters = { themes: modesDarkDefault };

export const arabicNumberingSystemAndRTL = (): string =>
  html`<calcite-pagination
    dir="rtl"
    numbering-system="arab"
    start-item="1"
    lang="fr"
    total-items="123456789"
    page-size="10"
  >
  </calcite-pagination>`;

arabicNumberingSystemAndRTL.parameters = {
  chromatic: { diffThreshold: 1 },
};
