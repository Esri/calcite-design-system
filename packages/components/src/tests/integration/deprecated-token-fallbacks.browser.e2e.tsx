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
