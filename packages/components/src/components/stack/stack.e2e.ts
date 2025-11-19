import { describe } from "vitest";
import { hidden, renders, slots } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-stack", () => {
  describe("renders", () => {
    renders("calcite-stack", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-stack");
  });

  describe("slots", () => {
    slots("calcite-stack", SLOTS);
  });
});
