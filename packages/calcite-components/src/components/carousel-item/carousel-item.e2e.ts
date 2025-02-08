import { describe } from "vitest";
import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-carousel-item", () => {
  describe("renders", () => {
    renders("<calcite-carousel-item selected></calcite-carousel-item>", {
      display: "flex",
    });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-carousel-item");
  });

  describe("accessible", () => {
    accessible("calcite-carousel-item");
  });
});
