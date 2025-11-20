import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects } from "../../tests/commonTests/browser";

describe("calcite-table", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-table"),
      [
        {
          propertyName: "bordered",
          defaultValue: false,
        },
        {
          propertyName: "groupSeparator",
          defaultValue: false,
        },
        {
          propertyName: "layout",
          defaultValue: "auto",
        },
        {
          propertyName: "numbered",
          defaultValue: false,
        },
        {
          propertyName: "pageSize",
          defaultValue: 0,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "selectionMode",
          defaultValue: "none",
        },
        {
          propertyName: "striped",
          defaultValue: false,
        },
      ],
    );
  });

  describe("hidden", () => {
    hidden(() => mount("calcite-table"));
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-table"),
      [
        {
          propertyName: "layout",
          value: "auto",
        },
        {
          propertyName: "scale",
          value: "m",
        },
        {
          propertyName: "selectionMode",
          value: "none",
        },
      ],
    );
  });
});
