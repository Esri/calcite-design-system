import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-tip-group", () => {
  describe("renders", () => {
    renders("calcite-tip-group", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tip-group");
  });

  describe("accessible", () => {
    accessible(`calcite-tip-group`);
  });
});
