import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-popover-manager", () => {
  it("renders", async () => renders(`<calcite-popover-manager></calcite-popover-manager>`, { display: "block" }));

  it("is accessible", async () =>
    accessible(`<calcite-popover-manager>
  <calcite-popover reference-element="ref">Content</calcite-popover>
  <button id="ref">Button</button>
</calcite-popover-manager>`));

  it("honors hidden attribute", async () => hidden("calcite-popover-manager"));

  it("should be positioned relative", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-popover-manager></calcite-popover-manager>`);
    await page.waitForChanges();
    const manager = await page.find("calcite-popover-manager");
    expect((await manager.getComputedStyle()).position).toBe("relative");
  });
});
