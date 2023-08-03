import { accessible, renders, hidden, t9n } from "../../tests/commonTests";

describe("calcite-meter", () => {
  describe("renders", () => {
    renders("calcite-meter", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-meter");
  });

  describe("accessible", () => {
    accessible(`<calcite-meter label="A great meter"></calcite-meter>`);
  });

  describe("translation support", () => {
    t9n("calcite-meter");
  });
});
