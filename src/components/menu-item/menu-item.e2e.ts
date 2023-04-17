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
        <calcite-menu-item id="1" text="ArcGIS Online">
          <calcite-menu-item text="ArcGISJS" slot="menu-item-dropdown">
            <calcite-menu-item text="API" slot="menu-item-dropdown"> </calcite-menu-item>
            <calcite-menu-item text="Widgets" slot="menu-item-dropdown"> </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item text="Calcite" slot="menu-item-dropdown"> </calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>`);

      const menuItem = await page.find("calcite-menu-item[id='1']");
      const [subMenuItem1, subMenuItem2] = await menuItem.findAll('calcite-menu-item[slot="menu-item-dropdown"]');
      const [nestedSubMenuItem1, nestedSubMenuItem2] = await subMenuItem1.findAll(
        'calcite-menu-item[slot="menu-item-dropdown"]'
      );

      await page.waitForChanges();

      expect(await subMenuItem1.isVisible()).toBe(false);
      expect(await subMenuItem2.isVisible()).toBe(false);

      await menuItem.click();
      await page.waitForChanges();
      expect(await subMenuItem1.isVisible()).toBe(true);
      expect(await subMenuItem2.isVisible()).toBe(true);

      await subMenuItem1.click();
      await page.waitForChanges();
      expect(await nestedSubMenuItem1.isVisible()).toBe(true);
      expect(await nestedSubMenuItem2.isVisible()).toBe(true);
    });

    it("should close any opened submenu when clicked outside", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-menu>
        <calcite-menu-item id="1" text="ArcGIS Online">
          <calcite-menu-item text="ArcGISJS" slot="menu-item-dropdown"> </calcite-menu-item>
          <calcite-menu-item text="Calcite" slot="menu-item-dropdown"> </calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>`);

      const menuItem = await page.find("calcite-menu-item[id='1']");
      const [subMenuItem1, subMenuItem2] = await menuItem.findAll('calcite-menu-item[slot="menu-item-dropdown"]');
      await menuItem.click();
      await page.waitForChanges();
      expect(await subMenuItem1.isVisible()).toBe(true);
      expect(await subMenuItem2.isVisible()).toBe(true);

      const ele = await page.$("calcite-menu");
      const { x, y, width, height } = await ele.boundingBox();

      await page.mouse.click(x + width + 50, y + height + 50);
      await page.waitForTimeout(3000);
      await page.waitForChanges();

      expect(await subMenuItem1.isVisible()).toBe(false);
      expect(await subMenuItem2.isVisible()).toBe(false);
    });
  });
});
