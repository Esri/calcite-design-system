import { accessible, hidden, renders, t9n } from "../../tests/commonTests";

describe("calcite-carousel-item", () => {
  describe("renders", () => {
    renders("<calcite-carousel-item active></calcite-carousel-item>", {
      display: "block",
    });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-carousel-item");
  });

  describe("accessible", () => {
    accessible("calcite-carousel-item");
  });

  describe("translation support", () => {
    t9n("calcite-carousel-item");
  });
});
