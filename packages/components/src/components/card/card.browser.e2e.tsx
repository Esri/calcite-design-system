import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, slots } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("calcite-card", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-card"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-card"), { display: "block" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-card"), SLOTS, true);
  });
});
