import { describe } from "vitest";
import { accessible, renders } from "../../tests/commonTests";

describe("calcite-carousel-item", () => {
  describe("renders", () => {
    renders("<calcite-carousel-item selected></calcite-carousel-item>", {
      display: "flex",
    });
  });

  describe("accessible", () => {
    accessible("calcite-carousel-item");
  });
});
