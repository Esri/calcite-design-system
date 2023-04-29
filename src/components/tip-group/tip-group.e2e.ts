import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-tip-group", () => {
  describe("renders", () => {
    renders("calcite-tip-group", { display: "block" });
  });

  it("honors hidden attribute", async () => hidden("calcite-tip-group"));

  it("is accessible", async () => accessible(`calcite-tip-group`));
});
