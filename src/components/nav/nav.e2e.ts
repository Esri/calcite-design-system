import { hidden, renders } from "../../tests/commonTests";

describe("calcite-nav", () => {
  it("renders", async () => renders("calcite-nav", { display: "inline" }));

  it("honors hidden attribute", async () => hidden("calcite-nav"));
});
