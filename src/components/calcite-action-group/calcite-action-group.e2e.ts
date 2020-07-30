import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-action-group", () => {
  it("renders", async () => renders("calcite-action-group"));

  it("honors hidden attribute", async () => hidden("calcite-action-group"));

  it("should be accessible", async () =>
    accessible(`
    <calcite-action-group>
      <calcite-action text="Add" icon="plus"></calcite-action>
    </calcite-action-group>
    `));
});
