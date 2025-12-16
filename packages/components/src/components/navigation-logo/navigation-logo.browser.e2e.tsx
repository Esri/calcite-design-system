import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-navigation-logo", () => {
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
});
