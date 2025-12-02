import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-segmented-control-item", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-segmented-control-item"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-segmented-control-item"), { display: "flex" });
  });
});
