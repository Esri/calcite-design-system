import { describe } from "vitest";
import { hidden, renders, defaults } from "../../tests/commonTests";

describe("calcite-virtualizer", () => {
  describe("defaults", () => {
    defaults("calcite-virtualizer", [
      {
        propertyName: "scroller",
        defaultValue: false,
      },
    ]);
  });

  describe("renders", () => {
    renders("calcite-virtualizer");
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-virtualizer");
  });
});
