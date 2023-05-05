import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, focusable, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-menu-item", () => {
  describe("renders", () => {
    renders("calcite-menu-item", { display: "flex" });
  });

  it("reflects", async () =>
    reflects("calcite-menu-item", [
      {
        propertyName: "active",
        value: "true"
      },
      {
        propertyName: "iconStart",
        value: "layers"
      },
      {
        propertyName: "iconEnd",
        value: "layers"
      },
      {
        propertyName: "href",
        value: "www.esri.com"
      },
      {
        propertyName: "target",
        value: "_blank"
      },
      {
        propertyName: "text",
        value: "Calcite"
      }
    ]));

  it("honors hidden attribute", async () => hidden("calcite-menu-item"));

  describe("accessible", () => {
    accessible(html`<calcite-menu> <calcite-menu-item text="calcite"> </calcite-menu-item> </calcite-menu>`);
  });

  it("is focusable", () => focusable("calcite-menu-item"));

  //todo : debug why calcite-menu-item requires calite-menu as parent for the click to emit event in test.
  it("should emit calciteMenuItemSelect event on user click", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-menu>
        <calcite-menu-item id="Nature" text="Nature" href="#nature"> </calcite-menu-item>
      </calcite-menu>`
    );

    const menuItem = await page.find("calcite-menu-item");
    const eventSpy = await menuItem.spyOnEvent("calciteMenuItemSelect");

    await menuItem.click();
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");
    expect(eventSpy).toHaveReceivedEventTimes(1);
  });

  it("should emit calciteMenuItemSelect event when user select the text area of the component using Enter or Space key", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-menu>
        <calcite-menu-item id="Nature" text="Nature" href="#nature">
          <calcite-menu-item id="Mountains" text="Mountains" slot="sub-menu-item"> </calcite-menu-item>
          <calcite-menu-item id="Rivers" text="Rivers" slot="sub-menu-item"> </calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>
    `);

    const element = await page.find("calcite-menu-item");
    const eventSpy = await element.spyOnEvent("calciteMenuItemSelect");

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");
    expect(eventSpy).not.toHaveReceivedEvent();

    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(2);

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");
    expect(eventSpy).toHaveReceivedEventTimes(2);
  });
});
