import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, focusable, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-menu-item", () => {
  it("renders", async () => renders("calcite-menu-item", { display: "flex" }));

  it("reflects", async () =>
    reflects("calcite-menu-item", [
      {
        propertyName: "active",
        value: "true"
      },
      {
        propertyName: "editable",
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

  it("is accessible", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-menu> <calcite-menu-item text="calcite"> </calcite-menu-item> </calcite-menu>`);
    await accessible("calcite-menu-item", page);
  });

  it("is focusable", () => focusable("calcite-menu-item"));

  describe("mouse support", () => {
    it("should open the submenu on click", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-menu>
        <calcite-menu-item id="ArcGISOnline" text="ArcGISOnline">
          <calcite-menu-item id="ArcGISJS" text="ArcGISJS" slot="menu-item-dropdown">
            <calcite-menu-item text="API" id="API" slot="menu-item-dropdown"></calcite-menu-item>
            <calcite-menu-item text="Widgets" id="Widgets" slot="menu-item-dropdown"> </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item text="Calcite" id="Calcite" slot="menu-item-dropdown"> </calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>`);

      const menuItem = await page.find("calcite-menu-item[id='ArcGISOnline']");
      const menuItemMenu = await page.find("calcite-menu-item[id='ArcGISOnline'] >>> calcite-menu");

      expect(await menuItemMenu.isVisible()).toBe(false);

      await menuItem.click();
      await page.waitForChanges();
      expect(await menuItemMenu.isVisible()).toBe(true);
      expect(await page.evaluate(() => document.activeElement.id)).toBe("ArcGISOnline");

      const subMenuItem = await page.find("calcite-menu-item[text='ArcGISJS']");
      const subMenuItemMenu = await page.find("calcite-menu-item[text='ArcGISJS'] >>> calcite-menu");
      expect(await subMenuItemMenu.isVisible()).toBe(false);
      await subMenuItem.click();
      await page.waitForChanges();
      expect(await subMenuItemMenu.isVisible()).toBe(true);
      expect(await page.evaluate(() => document.activeElement.id)).toBe("ArcGISJS");
    });

    it("should close any opened submenu when clicked outside", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-menu>
        <calcite-menu-item id="ArcGISOnline" text="ArcGISOnline">
          <calcite-menu-item text="ArcGISJS" slot="menu-item-dropdown"> </calcite-menu-item>
          <calcite-menu-item text="Calcite" slot="menu-item-dropdown"> </calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>`);

      const menuItem = await page.find("calcite-menu-item[id='ArcGISOnline']");
      const menuItemMenu = await page.find("calcite-menu-item[id='ArcGISOnline'] >>> calcite-menu");

      expect(await menuItemMenu.isVisible()).toBe(false);

      await menuItem.click();
      await page.waitForChanges();
      expect(await menuItemMenu.isVisible()).toBe(true);
      expect(await page.evaluate(() => document.activeElement.id)).toBe("ArcGISOnline");

      const menuElement = await page.$("calcite-menu");
      const { x, y, width, height } = await menuElement.boundingBox();

      await page.mouse.click(x + width + 50, y + height + 50);
      await page.waitForChanges();
      expect(await menuItemMenu.isVisible()).toBe(false);
      expect(await page.evaluate(() => document.activeElement.id)).not.toBe("ArcGISOnline");
    });
  });
});
