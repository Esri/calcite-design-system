import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-tip-group", () => {
  it("renders", async () => renders("calcite-tip-group", { display: "block" }));

  it("honors hidden attribute", async () => hidden("calcite-tip-group"));

  describe("accessible", () => {
    accessible(`calcite-tip-group`);
  });
});
