import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden } from "../../tests/commonTests/browser";

describe("calcite-swatch-group", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-swatch-group"));
  });
});
