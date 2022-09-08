import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
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

  it("should set autoClose on child popovers", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-popover-manager>
      <calcite-popover>Popover1</calcite-popover>
      <calcite-popover>Popover2</calcite-popover>
    </calcite-popover-manager>`);
    await page.waitForChanges();
    const popovers = await page.findAll("calcite-popover");
    expect(popovers.length).toBe(2);
    for (const popover of popovers) {
      expect(await popover.getProperty("autoClose")).toBe(false);
    }
    const manager = await page.find("calcite-popover-manager");
    expect(await manager.getProperty("autoClose")).toBe(false);
    manager.setProperty("autoClose", true);
    await page.waitForChanges();
    for (const popover of popovers) {
      expect(await popover.getProperty("autoClose")).toBe(true);
    }
  });
});
