import { newE2EPage } from "@stencil/core/testing";
import { accessible, HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-tree", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-tree></calcite-tree>");
    const element = await page.find("calcite-tree");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });

  it("is accessible", async () => accessible(`<calcite-tree></calcite-tree>`));

  it("is accessible: with nested children", async () =>
    accessible(`
  <calcite-tree lines>
    <calcite-tree-item>
      <a href="#">Child 2</a>
      <calcite-tree slot="children">
        <calcite-tree-item>
          <a href="http://www.google.com">Grandchild 1</a>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
</calcite-tree>
  `));
});
