import { hidden, renders } from "../../tests/commonTests";

describe("calcite-nav-menu-item", () => {
  it("renders", async () => renders("calcite-nav-menu-item", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-nav-menu-item"));
});
