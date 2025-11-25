import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-swatch", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-swatch"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-swatch"), { display: "block" });
  });
});
