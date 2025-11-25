import { describe } from "vitest";
import { slots } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-stack", () => {
  describe("slots", () => {
    slots("calcite-stack", SLOTS);
  });
});
