import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-menu", () => {
  describe("renders", () => {
    renders("calcite-menu", { display: "flex" });
  });

  it("honors hidden attribute", async () => hidden("calcite-menu"));

  describe("accessible", () => {
    accessible(html`<calcite-menu> <calcite-menu-item text="calcite"> </calcite-menu-item> </calcite-menu>`);
  });

  describe("mouse support", () => {
    it("should open the submenu on click", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-menu>
        <calcite-menu-item id="ArcGISOnline" text="ArcGISOnline">
          <calcite-menu-item id="ArcGISJS" text="ArcGISJS" slot="sub-menu-item">
            <calcite-menu-item text="API" id="API" slot="sub-menu-item"></calcite-menu-item>
            <calcite-menu-item text="Widgets" id="Widgets" slot="sub-menu-item"> </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item text="Calcite" id="Calcite" slot="sub-menu-item"> </calcite-menu-item>
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
          <calcite-menu-item text="ArcGISJS" slot="sub-menu-item"> </calcite-menu-item>
          <calcite-menu-item text="Calcite" slot="sub-menu-item"> </calcite-menu-item>
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

  describe("keyboard support", () => {
    it("should open and close horizontal calcite-menu", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-menu>
        <calcite-menu-item id="Nature" text="Nature" href="#arcgisonline">
          <calcite-menu-item id="Mountains" text="Mountains" slot="sub-menu-item">
            <calcite-menu-item text="Rocky Mountains" id="Rocky Mountains" slot="sub-menu-item"></calcite-menu-item>
            <calcite-menu-item text="Smoky Mountains" id="Smoky Mountains" slot="sub-menu-item"> </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item text="Rivers" id="Rivers" slot="sub-menu-item"> </calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item id="Planets" text="Planets"> </calcite-menu-item>
      </calcite-menu>`);

      const menuItemMenu = await page.find("calcite-menu-item[id='Nature'] >>> calcite-menu");
      const subMenuItemMenu = await page.find("calcite-menu-item[id='Mountains'] >>> calcite-menu");
      expect(await menuItemMenu.isVisible()).toBe(false);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await menuItemMenu.isVisible()).toBe(false);

      await page.keyboard.press("Tab");
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");
      expect(await menuItemMenu.isVisible()).toBe(true);

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Mountains");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Rivers");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Rivers");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Mountains");
      expect(await subMenuItemMenu.isVisible()).toBe(false);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await subMenuItemMenu.isVisible()).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Rocky Mountains");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Smoky Mountains");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Rocky Mountains");

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Mountains");
      expect(await subMenuItemMenu.isVisible()).toBe(false);
      expect(await menuItemMenu.isVisible()).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");
      expect(await menuItemMenu.isVisible()).toBe(false);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Planets");

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");
    });

    it("should open and close vertical calcite-menu", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-menu layout="vertical">
        <calcite-menu-item id="Nature" text="Nature" href="#arcgisonline">
          <calcite-menu-item id="Mountains" text="Mountains" slot="sub-menu-item">
            <calcite-menu-item text="Rocky Mountains" id="Rocky Mountains" slot="sub-menu-item"></calcite-menu-item>
            <calcite-menu-item text="Smoky Mountains" id="Smoky Mountains" slot="sub-menu-item"> </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item text="Rivers" id="Rivers" slot="sub-menu-item"> </calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item id="Planets" text="Planets"> </calcite-menu-item>
      </calcite-menu>`);

      const menuItemMenu = await page.find("calcite-menu-item[id='Nature'] >>> calcite-menu");
      const subMenuItemMenu = await page.find("calcite-menu-item[id='Mountains'] >>> calcite-menu");
      expect(await menuItemMenu.isVisible()).toBe(false);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await menuItemMenu.isVisible()).toBe(false);

      await page.keyboard.press("Tab");
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");
      expect(await menuItemMenu.isVisible()).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Mountains");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Rivers");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Rivers");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Mountains");
      expect(await subMenuItemMenu.isVisible()).toBe(false);

      await page.keyboard.press("Enter");
      await page.waitForChanges();
      expect(await subMenuItemMenu.isVisible()).toBe(true);

      await page.keyboard.press("ArrowRight");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Rocky Mountains");

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Smoky Mountains");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Rocky Mountains");

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Mountains");
      expect(await subMenuItemMenu.isVisible()).toBe(false);
      expect(await menuItemMenu.isVisible()).toBe(true);

      await page.keyboard.press("ArrowLeft");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");
      expect(await menuItemMenu.isVisible()).toBe(false);

      await page.keyboard.press("ArrowDown");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Planets");

      await page.keyboard.press("ArrowUp");
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement.id)).toBe("Nature");
    });
  });
});
