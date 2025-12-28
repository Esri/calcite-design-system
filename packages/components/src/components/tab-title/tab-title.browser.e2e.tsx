import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, disabled } from "../../tests/commonTests/browser";

describe("calcite-tab-title", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-tab-title"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-tab-title"), { display: "block" });
  });

  describe("disabled", () => {
    disabled(() => mount(<calcite-tab-title selected />));
  });
});
