import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { defaults, hidden, renders, disabled, themed } from "../../tests/common";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-list-item-group"),
    [
      {
        propertyName: "heading",
        defaultValue: undefined,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "filterHidden",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-list-item-group"));
});

describe("renders", () => {
  renders(() => mount("calcite-list-item-group"), { display: "flex" });
});

describe("disabled", () => {
  disabled(() => mount("calcite-list-item-group"), { focusTarget: "none" });
});

describe("themed", () => {
  describe("default", () => {
    themed(() => mount(<calcite-list-item-group heading="Buildings" />), {
      "--calcite-list-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-list-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
      },
    });
  });
});

describe("a11y attributes", () => {
  it("should set aria-colspan to 1 by default when column count is 0", async () => {
    await mount(<calcite-list-item-group heading="Buildings" />);
    const heading = page.getByRole("cell");

    await expect.element(heading).toHaveAttribute("aria-colspan", "1");
  });

  it("should set aria-colspan to 1 when column count is less than 1", async () => {
    await mount(<calcite-list-item-group columnCount={0} heading="Buildings" />);
    const heading = page.getByRole("cell");

    await expect.element(heading).toHaveAttribute("aria-colspan", "1");
  });

  it("should render aria-colspan with column count when greater than 1", async () => {
    await mount(<calcite-list-item-group columnCount={2} heading="Buildings" />);
    const heading = page.getByRole("cell");

    await expect.element(heading).toHaveAttribute("aria-colspan", "2");
  });
});
