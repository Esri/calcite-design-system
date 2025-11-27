import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, focusable } from "../../tests/commonTests/browser";

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

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-sort-handle"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-sort-handle"), { display: "flex" });
  });

  describe("focusable", () => {
    focusable(() => mount(<calcite-sort-handle label="test" set-position="4" set-size="10" />));
  });
});
