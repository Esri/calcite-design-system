import { renders, hidden } from "../../tests/commonTests";

describe("calcite-dropdown-group", () => {
  describe("renders", () => {
    renders("calcite-dropdown-group", { display: "block" });
  });

  it("honors hidden attribute", async () => hidden("calcite-dropdown-group"));
});
