import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, focusable } from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(() => mount("calcite-table-cell"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("focusable", () => {
  focusable(() => mount("calcite-table-cell"));
});
