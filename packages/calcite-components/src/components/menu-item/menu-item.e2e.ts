import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, focusable, hidden, reflects, renders, t9n, themed } from "../../tests/commonTests";
import { getFocusedElementProp } from "../../tests/utils";
import { ComponentTestTokens } from "../../tests/commonTests/themed";
import { CSS } from "../../../src/components/menu-item/resources";
import { Layout } from "./interfaces";

describe("calcite-menu-item", () => {
  describe("renders", () => {
    renders("calcite-menu-item", { display: "flex" });
  });

  describe("reflects", () => {
    reflects("calcite-menu-item", [
      {
        propertyName: "active",
        value: "true",
      },
      {
        propertyName: "target",
        value: "_blank",
      },
    ]);
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-menu-item");
  });

  describe("accessible", () => {
    accessible(html`<calcite-menu><calcite-menu-item text="calcite"></calcite-menu-item></calcite-menu>`);
  });

  describe("is focusable", () => {
    focusable("calcite-menu-item");
  });

  describe("translation support", () => {
    t9n("calcite-menu-item");
  });

  it("should emit calciteMenuItemSelect event on user click", async () => {
    const page = await newE2EPage();
    await page.setContent(html` <calcite-menu-item id="Nature" text="Nature" href="#nature"> </calcite-menu-item> `);

    const menuItem = await page.find("calcite-menu-item");
    const eventSpy = await menuItem.spyOnEvent("calciteMenuItemSelect");

    await menuItem.click();
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("Nature");
    expect(eventSpy).toHaveReceivedEventTimes(1);
  });

  describe("href support", () => {
    const testHref = "#nature";
    const testEl = `<calcite-menu><calcite-menu-item id="Nature" text="Nature" href="${testHref}"></calcite-menu-item></calcite-menu>`;

    it("should navigate to a new url when href provided and user interacts with click", async () => {
      const page = await newE2EPage();
      await page.setContent(html`${testEl}`);
      const originalUrl = page.url();
      await page.waitForChanges();

      const menuItem = await page.find("calcite-menu-item");
      await page.waitForChanges();
      await menuItem.click();
      await page.waitForChanges();
      const newUrl = page.url();
      expect(newUrl).toEqual(originalUrl + testHref);
    });

    it("should navigate to a new url when href provided and user interacts with `enter` key", async () => {
      const page = await newE2EPage();
      await page.setContent(html`${testEl}`);
      const originalUrl = page.url();
      await page.waitForChanges();

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      await page.keyboard.press("Enter");
      await page.waitForChanges();
      const newUrl = page.url();
      expect(newUrl).toEqual(originalUrl + testHref);
    });
  });

  it("should emit calciteMenuItemSelect event when user select the text area of the component using Enter or Space key", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-menu>
        <calcite-menu-item id="Nature" text="Nature" href="#nature">
          <calcite-menu-item id="Mountains" text="Mountains" slot="submenu-item"> </calcite-menu-item>
          <calcite-menu-item id="Rivers" text="Rivers" slot="submenu-item"> </calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>
    `);

    const element = await page.find("calcite-menu-item");
    const eventSpy = await element.spyOnEvent("calciteMenuItemSelect");

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("Nature");
    expect(eventSpy).not.toHaveReceivedEvent();

    await page.keyboard.press("Enter");
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);

    await page.keyboard.press("Space");
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(2);

    await page.keyboard.press("Tab");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("Nature");
    expect(eventSpy).toHaveReceivedEventTimes(2);
  });

  describe("theme", () => {
    const menuWithSlottedSubmenuHTML = (layout: Layout): string => html`
      <calcite-menu layout="${layout}">
        <calcite-menu-item text="calcite-navigation" href="#calcite-menu">
          <calcite-menu-item slot="submenu-item" text="Slots"></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Css vars"></calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>
    `;
    describe("slotted submenu", () => {
      const tokens = (layout: Layout): ComponentTestTokens => {
        return {
          "--calcite-menu-background-color": [
            {
              selector: "calcite-menu-item",
              shadowSelector: `calcite-action`,
              targetProp: "--calcite-action-background-color-press",
              state: { press: { attribute: "class", value: CSS.dropdownAction } },
            },
            {
              selector: "calcite-menu-item",
              shadowSelector: `calcite-action`,
              targetProp: "--calcite-action-background-color",
            },
          ],
          "--calcite-menu-text-color": {
            selector: "calcite-menu-item",
            shadowSelector: `calcite-action`,
            targetProp: "--calcite-action-text-color",
          },
          "--calcite-menu-item-sub-menu-corner-radius": {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.dropdownMenuItems}`,
            targetProp: "borderRadius",
          },
          "--calcite-menu-item-sub-menu-border-color": {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.dropdownMenuItems}`,
            targetProp: layout === "horizontal" ? "borderColor" : "borderBlockColor",
          },
        };
      };

      describe("horizontal layout", () => {
        themed(menuWithSlottedSubmenuHTML("horizontal"), tokens("horizontal"));
      });

      describe("vertical layout", () => {
        themed(menuWithSlottedSubmenuHTML("vertical"), tokens("vertical"));
      });
    });

    describe("default", () => {
      const menuHTML = (layout: Layout): string => html`
        <calcite-menu layout="${layout}">
          <calcite-menu-item text="Ideas"> </calcite-menu-item>
        </calcite-menu>
      `;
      const tokens: ComponentTestTokens = {
        "--calcite-menu-text-color": [
          {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.content}`,
            targetProp: "color",
          },
          {
            selector: "calcite-menu-item",
            shadowSelector: ` .${CSS.content} `,
            targetProp: "color",
            state: { press: { attribute: "role", value: `menuitem` } },
          },
        ],
        "--calcite-menu-background-color": [
          {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.content}`,
            targetProp: "backgroundColor",
          },
          {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.content}`,
            targetProp: "backgroundColor",
            state: { press: { attribute: "role", value: `menuitem` } },
          },
        ],
      };

      describe("vertical layout", () => {
        themed(menuHTML("vertical"), tokens);
      });
    });

    describe("active", () => {
      const activeMenuItemHTML = (layout: Layout): string => html`
        <calcite-menu layout="${layout}">
          <calcite-menu-item text="Ideas" active> </calcite-menu-item>
        </calcite-menu>
      `;
      const tokens = (layout: Layout): ComponentTestTokens => {
        const targetBorderProp = layout === "horizontal" ? "borderBlockEndColor" : "borderInlineEndColor";
        return {
          "--calcite-menu-item-accent-color": [
            {
              selector: "calcite-menu-item",
              shadowSelector: `.${CSS.content}`,
              targetProp: targetBorderProp,
            },
            {
              selector: "calcite-menu-item",
              shadowSelector: `.${CSS.content}`,
              targetProp: targetBorderProp,
              state: "hover",
            },
          ],
        };
      };
      describe("horizontal layout", () => {
        themed(activeMenuItemHTML("horizontal"), tokens("horizontal"));
      });

      describe("vertical layout", () => {
        themed(activeMenuItemHTML("vertical"), tokens("vertical"));
      });
    });

    describe("icons", () => {
      const iconMenuItemHTML: string = html` <calcite-menu>
        <calcite-menu-item text="Ideas" breadcrumb icon-start="layers" icon-end="layers">
          <calcite-menu-item
            href="#calcite-navigation-css-vars"
            icon-start="multiple-variables"
            slot="submenu-item"
            text="Css vars"
          ></calcite-menu-item>
        </calcite-menu-item>
      </calcite-menu>`;

      const tokens: ComponentTestTokens = {
        "--calcite-menu-text-color": [
          {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.iconStart}`,
            targetProp: "color",
          },
          {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.iconEnd}`,
            targetProp: "color",
          },
          {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.iconBreadcrumb}`,
            targetProp: "color",
          },
          {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.iconDropdown}`,
            targetProp: "color",
          },
        ],
      };
      themed(iconMenuItemHTML, tokens);
    });
  });
});
