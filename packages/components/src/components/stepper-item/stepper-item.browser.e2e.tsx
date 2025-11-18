import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden } from "../../tests/commonTests/browser";

describe("calcite-stepper-item", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-stepper-item"));
  });
});
