import { accessible, renders } from "../../tests/commonTests";

describe("calcite-progress", () => {
  it("renders", () => renders("calcite-progress", { display: "block" }));

  it("is accessible", async () => accessible(`<calcite-progress label="my progress"></calcite-progress>`));

  it("is accessible with value", async () =>
    accessible(`<calcite-progress value="50" type="indeterminate" text="percentage"></calcite-progress>`));
});
