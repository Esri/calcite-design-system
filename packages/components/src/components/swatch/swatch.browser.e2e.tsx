import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, slots } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("calcite-swatch", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-swatch"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-swatch"), { display: "block" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-swatch"), SLOTS);
  });
});
