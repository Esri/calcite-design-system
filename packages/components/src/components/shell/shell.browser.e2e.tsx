import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-shell", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-shell"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-shell"), { display: "flex" });
  });
});
