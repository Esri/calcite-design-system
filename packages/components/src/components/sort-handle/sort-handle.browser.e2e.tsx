import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-sort-handle", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-sort-handle"),
      [
        {
          propertyName: "sortDisabled",
          defaultValue: false,
        },
        {
          propertyName: "setPosition",
          defaultValue: undefined,
        },
        {
          propertyName: "setSize",
          defaultValue: undefined,
        },
        {
          propertyName: "moveToItems",
          defaultValue: [],
        },
        {
          propertyName: "addToItems",
          defaultValue: [],
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-sort-handle"),
      [
        {
          propertyName: "sortDisabled",
          value: true,
        },
      ],
    );
  });
});
