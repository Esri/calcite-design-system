import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-stepper", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-stepper"),
      [
        {
          propertyName: "icon",
          defaultValue: false,
        },
        {
          propertyName: "layout",
          defaultValue: "horizontal",
        },
        {
          propertyName: "numbered",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-stepper"),
      [
        {
          propertyName: "icon",
          value: true,
        },
        {
          propertyName: "layout",
          value: "horizontal",
        },
        {
          propertyName: "numbered",
          value: true,
        },
        {
          propertyName: "scale",
          value: "m",
        },
      ],
    );
  });
});
