import { newE2EPage } from "@stencil/core/testing";
import { hidden, renders } from "../../tests/commonTests";

describe("calcite-nav", () => {
  it("renders", async () => renders("calcite-nav", { display: "inline" }));

  it("honors hidden attribute", async () => hidden("calcite-nav"));

  it("should emit an event when the toggle is requested and interacted with", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-nav toggle-enabled><calcite-nav-logo text="Test" /></calcite-nav>`);
    const eventSpy = await page.spyOnEvent("calciteNavToggleSelect", "window");
    const toggle = await page.find(`calcite-nav >>> calcite-action`);
    await toggle.click();

    expect(eventSpy).toHaveReceivedEvent();
  });
});
