import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, slots } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("calcite-shell", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-shell"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-shell"), { display: "flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-shell"), SLOTS);
  });
});
