import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, focusable } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-navigation-logo"),
    [
      {
        propertyName: "active",
        defaultValue: undefined,
      },
      {
        propertyName: "href",
        defaultValue: undefined,
      },
      {
        propertyName: "rel",
        defaultValue: undefined,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "target",
        defaultValue: undefined,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-navigation-logo"),
    [
      {
        propertyName: "active",
        value: "true",
      },
      {
        propertyName: "href",
        value: "#logo",
      },
      {
        propertyName: "rel",
        value: "external",
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "target",
        value: "_self",
      },
      {
        propertyName: "headingLevel",
        value: 1,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-navigation-logo"));
});

describe("renders", () => {
  renders(() => mount(<calcite-navigation-logo heading="test" />), { display: "inline-flex" });
});

describe("is focusable", () => {
  focusable(() => mount(<calcite-navigation-logo heading="esri" href=" " />));
});

describe("heading", () => {
  it("renders standalone heading when description is not provided", async () => {
    await mount(`<calcite-navigation-logo heading="John Doe"></calcite-navigation-logo>`);

    const heading = page.getBySelector(`calcite-navigation-logo .${CSS.heading}`);
    const standaloneHeading = page.getBySelector(
      `calcite-navigation-logo .${CSS.heading}.${CSS.standalone}`,
    );
    const description = page.getBySelector(`calcite-navigation-logo .${CSS.description}`);

    await expect.element(heading).toBeInTheDocument();
    await expect.element(standaloneHeading).toBeInTheDocument();
    await expect.element(description).not.toBeInTheDocument();
  });
});
