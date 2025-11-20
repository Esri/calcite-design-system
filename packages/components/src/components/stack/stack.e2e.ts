import { describe } from "vitest";
import { renders, slots } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-stack", () => {
  describe("renders", () => {
    renders("calcite-stack", { display: "flex" });
  });

  describe("slots", () => {
    slots("calcite-stack", SLOTS);
  });
});
