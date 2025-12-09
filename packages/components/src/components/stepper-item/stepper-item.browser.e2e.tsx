import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, t9n, disabled } from "../../tests/commonTests/browser";

describe("calcite-stepper-item", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-stepper-item"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-stepper-item"), { display: "flex" });
  });

  describe("translation support", () => {
    t9n(() => mount(<calcite-stepper-item heading="Step 1" id="step-1" />));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-stepper-item"));
  });
});
