import { hidden, renders } from "../../tests/commonTests";

describe("calcite-nav-logo", () => {
  it("renders", async () => renders("calcite-nav-logo", { display: "inline-flex" }));

  it("honors hidden attribute", async () => hidden("calcite-nav-logo"));
});
