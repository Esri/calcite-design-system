import { renders, hidden } from "../../tests/commonTests";

describe("calcite-dropdown-group", () => {
  describe("renders", () => {
    renders("calcite-dropdown-group", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-dropdown-group");
  });
});
