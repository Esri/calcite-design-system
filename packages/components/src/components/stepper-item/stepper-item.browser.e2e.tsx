import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-stepper-item", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-stepper-item"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-stepper-item"), { display: "flex" });
  });
});
