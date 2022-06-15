import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-tooltip-manager", () => {
  it("renders", async () => renders(`<calcite-tooltip-manager></calcite-tooltip-manager>`, { display: "block" }));

  it("is accessible", async () =>
    accessible(
      html`<button id="test">test</button>
        <calcite-tooltip-manager>
          <calcite-tooltip reference-element="ref">Content</calcite-tooltip>
          <button id="ref">Button</button>
        </calcite-tooltip-manager>`
    ));

  it("honors hidden attribute", async () => hidden("calcite-tooltip-manager"));

  it("should be positioned relative", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-tooltip-manager></calcite-tooltip-manager>`);
    await page.waitForChanges();
    const manager = await page.find("calcite-tooltip-manager");
    expect((await manager.getComputedStyle()).position).toBe("relative");
  });
});
