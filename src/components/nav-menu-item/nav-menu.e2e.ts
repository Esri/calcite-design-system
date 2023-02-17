import { hidden, renders } from "../../tests/commonTests";

describe("calcite-nav-menu", () => {
  it("renders", async () => renders("calcite-nav-menu", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-nav-menu"));
});
