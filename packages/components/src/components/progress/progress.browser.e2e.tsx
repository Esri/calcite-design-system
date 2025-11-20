import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-progress", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-progress"));
  });

  describe("renders", () => {
    renders(() => mount(<calcite-progress value={20} />), { display: "block" });
  });
});
