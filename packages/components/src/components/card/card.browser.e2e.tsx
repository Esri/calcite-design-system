import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-card", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-card"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-card"), { display: "block" });
  });
});
