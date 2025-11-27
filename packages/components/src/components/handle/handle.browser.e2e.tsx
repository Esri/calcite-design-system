import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, focusable } from "../../tests/commonTests/browser";

describe("calcite-handle", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-handle"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-handle"), { display: "flex" });
  });

  describe("focusable", () => {
    focusable(() => mount("calcite-handle"));
  });
});
