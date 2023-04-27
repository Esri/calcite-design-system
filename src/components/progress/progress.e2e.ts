import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-progress", () => {
  describe("renders", () => {
    renders("calcite-progress", { display: "block" });
  });

  it("honors hidden attribute", async () => hidden("calcite-progress"));

  it("is accessible", async () => accessible(`<calcite-progress label="my progress"></calcite-progress>`));

  it("is accessible with value", async () =>
    accessible(`<calcite-progress value="50" type="indeterminate" text="percentage"></calcite-progress>`));
});
