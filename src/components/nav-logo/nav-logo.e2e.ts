import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-nav-logo", () => {
  describe("renders", () => {
    renders("calcite-nav-logo", { display: "inline-flex" });
  });

  it("honors hidden attribute", () => hidden("calcite-nav-logo"));

  describe("accessible", () => {
    accessible("calcite-nav-logo");
  });

  it("reflects", () =>
    reflects("calcite-nav-logo", [
      {
        propertyName: "active",
        value: "true"
      },
      {
        propertyName: "href",
        value: "#logo"
      },
      {
        propertyName: "textEnabled",
        value: "true"
      }
    ]));

  it("should emit calciteNavLogoSelect event on user click", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-nav-logo text="esri" id="esri" text-enabled></calcite-nav-logo>`);

    const element = await page.find("calcite-nav-logo");
    const eventSpy = await element.spyOnEvent("calciteNavLogoSelect");

    await element.click();
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("esri");
    expect(eventSpy).toHaveReceivedEventTimes(1);
  });

  it("should emit calciteNavLogoSelect event when user select using Enter & Space key", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-nav-logo text="esri" id="esri" text-enabled></calcite-nav-logo> `);

    const element = await page.find("calcite-nav-logo");
    const eventSpy = await element.spyOnEvent("calciteNavLogoSelect");

    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement.id)).toBe("esri");
    expect(eventSpy).not.toHaveReceivedEvent();

    await page.keyboard.press("Enter");
    expect(await page.evaluate(() => document.activeElement.id)).toBe("esri");
    expect(eventSpy).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Space");
    expect(await page.evaluate(() => document.activeElement.id)).toBe("esri");
    expect(eventSpy).toHaveReceivedEventTimes(2);
  });
});
