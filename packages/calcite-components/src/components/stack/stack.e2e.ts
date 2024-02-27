import { hidden, renders, slots, defaults } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-stack", () => {
  describe("defaults", () => {
    defaults("calcite-stack", [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
    ]);
  });

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
