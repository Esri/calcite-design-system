import { hidden, renders } from "../../tests/commonTests";

describe("calcite-nav-user", () => {
  it("renders", async () => renders("calcite-nav-user", { display: "inline-flex" }));

  it("honors hidden attribute", async () => hidden("calcite-nav-user"));
});
