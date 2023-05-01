import { newE2EPage } from "@stencil/core/testing";
import { hidden, renders } from "../../tests/commonTests";

describe("calcite-nav", () => {
  it("renders", () => renders("calcite-nav", { display: "inline" }));

  it("honors hidden attribute", () => hidden("calcite-nav"));

  it("should emit an event when the menuIcon is displayed and user interacts", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-nav nav-action><calcite-nav-logo text="Test" /></calcite-nav>`);
    const eventSpy = await page.spyOnEvent("calciteNavActionSelect");
    const hamburgerMenu = await page.find(`calcite-nav >>> calcite-action`);

    await page.keyboard.press("Tab");
    expect(eventSpy).toHaveReceivedEventTimes(0);

    await page.keyboard.press("Enter");
    expect(eventSpy).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(2);

    await page.keyboard.press("Tab");
    expect(eventSpy).toHaveReceivedEventTimes(2);

    await hamburgerMenu.click();
    expect(eventSpy).toHaveReceivedEventTimes(3);
  });
});
