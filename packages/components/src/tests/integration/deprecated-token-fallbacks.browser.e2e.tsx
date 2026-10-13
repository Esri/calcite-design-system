import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";

type FallbackTestCase = {
  referenceToken: `--calcite-${string}`;
  referenceValue: string;
  targetProperty: string;
  themeToken: `--calcite-theme-${string}`;
  themeValue: string;
};

const testCases: Record<string, FallbackTestCase> = {
  colorBackground: {
    referenceToken: "--calcite-color-background",
    referenceValue: "rgb(1, 2, 3)",
    targetProperty: "background-color",
    themeToken: "--calcite-theme-color-surface-1",
    themeValue: "rgb(4, 5, 6)",
  },
  colorForeground1: {
    referenceToken: "--calcite-color-foreground-1",
    referenceValue: "rgb(1, 2, 3)",
    targetProperty: "background-color",
    themeToken: "--calcite-theme-color-surface-2",
    themeValue: "rgb(4, 5, 6)",
  },
  colorForeground2: {
    referenceToken: "--calcite-color-foreground-2",
    referenceValue: "rgb(1, 2, 3)",
    targetProperty: "background-color",
    themeToken: "--calcite-theme-color-surface-3",
    themeValue: "rgb(4, 5, 6)",
  },
  colorForeground3: {
    referenceToken: "--calcite-color-foreground-3",
    referenceValue: "rgb(1, 2, 3)",
    targetProperty: "background-color",
    themeToken: "--calcite-theme-color-surface-4",
    themeValue: "rgb(4, 5, 6)",
  },
  cornerRadiusRound: {
    referenceToken: "--calcite-corner-radius-round",
    referenceValue: "2px",
    targetProperty: "border-radius",
    themeToken: "--calcite-theme-corner-radius-sm",
    themeValue: "4px",
  },
  cornerRadiusSharp: {
    referenceToken: "--calcite-corner-radius-sharp",
    referenceValue: "2px",
    targetProperty: "border-radius",
    themeToken: "--calcite-theme-corner-radius-none",
    themeValue: "4px",
  },
  fontWeight: {
    referenceToken: "--calcite-font-weight-normal",
    referenceValue: "500",
    targetProperty: "font-weight",
    themeToken: "--calcite-theme-font-weight-regular",
    themeValue: "600",
  },
  spaceNone: {
    referenceToken: "--calcite-spacing-none",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-none",
    themeValue: "20px",
  },
  spacePx: {
    referenceToken: "--calcite-spacing-px",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-px",
    themeValue: "20px",
  },
  spaceBase: {
    referenceToken: "--calcite-spacing-base",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-base",
    themeValue: "20px",
  },
  spaceXxs: {
    referenceToken: "--calcite-spacing-xxs",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-2xs",
    themeValue: "20px",
  },
  spaceXs: {
    referenceToken: "--calcite-spacing-xs",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-xs",
    themeValue: "20px",
  },
  spaceSm: {
    referenceToken: "--calcite-spacing-sm",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-sm",
    themeValue: "20px",
  },
  spaceSmPlus: {
    referenceToken: "--calcite-spacing-sm-plus",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-sm-plus",
    themeValue: "20px",
  },
  spaceMd: {
    referenceToken: "--calcite-spacing-md",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-md",
    themeValue: "20px",
  },
  spaceMdPlus: {
    referenceToken: "--calcite-spacing-md-plus",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-md-plus",
    themeValue: "20px",
  },
  spaceLg: {
    referenceToken: "--calcite-spacing-lg",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-lg",
    themeValue: "20px",
  },
  spaceXl: {
    referenceToken: "--calcite-spacing-xl",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-xl",
    themeValue: "20px",
  },
  spaceXxl: {
    referenceToken: "--calcite-spacing-xxl",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-2xl",
    themeValue: "20px",
  },
  spaceXxxl: {
    referenceToken: "--calcite-spacing-xxxl",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-3xl",
    themeValue: "20px",
  },
  spaceFixedSm: {
    referenceToken: "--calcite-spacing-fixed-sm",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-sm",
    themeValue: "20px",
  },
  spaceFixedMd: {
    referenceToken: "--calcite-spacing-fixed-md",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-md",
    themeValue: "20px",
  },
  spaceFixedLg: {
    referenceToken: "--calcite-spacing-fixed-lg",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-md-plus",
    themeValue: "20px",
  },
};

describe.each(Object.entries(testCases))("deprecated %s token fallback", (_name, testCase) => {
  it("preserves reference token overrides and prioritizes the replacement theme token", async () => {
    const { el } = await mount(<div />);

    el.style.setProperty(
      testCase.targetProperty,
      `var(${testCase.themeToken}, var(${testCase.referenceToken}))`,
    );
    el.style.setProperty(testCase.referenceToken, testCase.referenceValue);

    await expect
      .poll(() => getComputedStyle(el).getPropertyValue(testCase.targetProperty))
      .toBe(testCase.referenceValue);

    el.style.setProperty(testCase.themeToken, testCase.themeValue);

    await expect
      .poll(() => getComputedStyle(el).getPropertyValue(testCase.targetProperty))
      .toBe(testCase.themeValue);
  });
});
