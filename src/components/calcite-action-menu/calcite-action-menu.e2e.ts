import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-action-menu", () => {
  it("renders", async () => renders("calcite-action-menu"));

  it("honors hidden attribute", async () => hidden("calcite-action-menu"));

  it("should be accessible", async () =>
    accessible(`
    <calcite-action-menu>
      <calcite-action text="Add" icon="plus"></calcite-action>
    </calcite-action-menu>
    `));
});
