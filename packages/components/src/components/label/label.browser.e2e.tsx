import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-label", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-label"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-label"), { display: "flex" });
  });
});
