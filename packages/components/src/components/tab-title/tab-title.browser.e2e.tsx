import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-tab-title", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-tab-title"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-tab-title"), { display: "block" });
  });
});
