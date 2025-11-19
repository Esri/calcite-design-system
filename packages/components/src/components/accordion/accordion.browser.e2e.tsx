import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-accordion", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-accordion"),
      [
        {
          propertyName: "appearance",
          defaultValue: "solid",
        },
        {
          propertyName: "iconPosition",
          defaultValue: "end",
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "selectionMode",
          defaultValue: "multiple",
        },
        {
          propertyName: "iconType",
          defaultValue: "chevron",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-accordion"),
      [
        {
          propertyName: "iconPosition",
          value: "start",
        },
        {
          propertyName: "iconPosition",
          value: "end",
        },
        {
          propertyName: "selectionMode",
          value: "single-persist",
        },
        {
          propertyName: "selectionMode",
          value: "single",
        },
        {
          propertyName: "selectionMode",
          value: "multiple",
        },
      ],
    );
  });
});
