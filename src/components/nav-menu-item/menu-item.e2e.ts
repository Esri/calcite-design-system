import { hidden, renders } from "../../tests/commonTests";

describe("calcite-menu-item", () => {
  it("renders", async () => renders("calcite-menu-item", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-menu-item"));
});
