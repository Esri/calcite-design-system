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
  color: {
    referenceToken: "--calcite-color-foreground-1",
    referenceValue: "rgb(1, 2, 3)",
    targetProperty: "background-color",
    themeToken: "--calcite-theme-color-surface-2",
    themeValue: "rgb(4, 5, 6)",
  },
  cornerRadius: {
    referenceToken: "--calcite-corner-radius-round",
    referenceValue: "2px",
    targetProperty: "border-radius",
    themeToken: "--calcite-theme-corner-radius-sm",
    themeValue: "4px",
  },
  fontWeight: {
    referenceToken: "--calcite-font-weight-normal",
    referenceValue: "500",
    targetProperty: "font-weight",
    themeToken: "--calcite-theme-font-weight-regular",
    themeValue: "600",
  },
  space: {
    referenceToken: "--calcite-spacing-sm",
    referenceValue: "10px",
    targetProperty: "padding-inline-start",
    themeToken: "--calcite-theme-space-sm",
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
