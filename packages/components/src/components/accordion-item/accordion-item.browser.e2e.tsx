import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-accordion-item", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-accordion-item"),
      [
        {
          propertyName: "headingLevel",
          defaultValue: undefined,
        },
        {
          propertyName: "scale",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-accordion-item"),
      [
        {
          propertyName: "headingLevel",
          value: 2,
        },
        {
          propertyName: "scale",
          value: "m ",
        },
      ],
    );
  });
});
