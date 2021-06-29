import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-list", () => {
  it("renders", async () => renders("calcite-list"));

  it("honors hidden attribute", async () => hidden("calcite-list"));

  it("should be accessible", async () => {
    await accessible(`<calcite-list>
    <calcite-list-item label="candy" description="kingdom">
      <calcite-action icon="banana" label="finn" slot="actions-start" />
      <calcite-icon icon="banana" slot="content-start" />
      <img src="http://www.fillmurray.com/g/140/100" slot="content-start" />
      <calcite-icon icon="banana" slot="content-end" />
      <calcite-action icon="banana" label="jake" slot="actions-end" />
    </calcite-list-item>
    <calcite-list-item label="test" non-interactive description="hello world"></calcite-list-item>
    <calcite-list-item label="test" description="hello world"></calcite-list-item>
  </calcite-list>`);
  });
});
