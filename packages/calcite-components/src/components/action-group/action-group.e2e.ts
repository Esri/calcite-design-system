import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import {
  accessible,
  defaults,
  focusable,
  handlesActionMenuPlacements,
  hidden,
  reflects,
  renders,
  slots,
  t9n,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";

const actionGroupHTML = `<calcite-action-group scale="l">
      <calcite-action id="plus" slot="menu-actions" text="Add" icon="plus"></calcite-action>
      <calcite-action id="banana" slot="menu-actions" text="Banana" icon="banana"></calcite-action>
      </calcite-action-group>`;

describe("calcite-action-group", () => {
  mockConsole();

  describe("defaults", () => {
    defaults("calcite-action-group", [
      {
        propertyName: "layout",
        defaultValue: "vertical",
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "menuPlacement",
        defaultValue: undefined,
      },
      {
        propertyName: "menuFlipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-action-group", [
      {
        propertyName: "menuPlacement",
        value: "bottom",
      },
    ]);
  });

  describe("renders", () => {
    renders("calcite-action-group", { display: "flex" });
  });

  describe("focusable", () => {
    focusable(actionGroupHTML, { shadowFocusTargetSelector: "calcite-action" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-action-group");
  });

  describe("accessible", () => {
    accessible(actionGroupHTML);
  });

  describe("slots", () => {
    slots("calcite-action-group", SLOTS);
  });

  describe("handles action-menu placement and flipPlacements", () => {
    handlesActionMenuPlacements(html`
      <calcite-action-group scale="l" overlay-positioning="fixed">
        <calcite-action id="plus" slot="${SLOTS.menuActions}" text="Add" icon="plus"></calcite-action>
        <calcite-action id="banana" slot="${SLOTS.menuActions}" text="Banana" icon="banana"></calcite-action>
      </calcite-action-group>
    `);
  });

  it("should honor scale of expand icon", async () => {
    const page = await newE2EPage({ html: actionGroupHTML });
    const menu = await page.find(`calcite-action-group >>> calcite-action-menu`);
    expect(await menu.getProperty("scale")).toBe("l");
  });

  it("should honor overlayPositioning", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action-group scale="l" overlay-positioning="fixed">
    <calcite-action id="plus" slot="menu-actions" text="Add" icon="plus"></calcite-action>
    <calcite-action id="banana" slot="menu-actions" text="Banana" icon="banana"></calcite-action>
    </calcite-action-group>`);
    await page.waitForChanges();
    const menu = await page.find(`calcite-action-group >>> calcite-action-menu`);
    expect(await menu.getProperty("overlayPositioning")).toBe("fixed");
  });

  it("should honor label", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-action-group label="test">
    <calcite-action id="plus" slot="menu-actions" text="Add" icon="plus"></calcite-action>
    <calcite-action id="banana" slot="menu-actions" text="Banana" icon="banana"></calcite-action>
    </calcite-action-group>`);
    await page.waitForChanges();
    const container = await page.find(`calcite-action-group >>> .${CSS.container}`);
    expect(await container.getProperty("ariaLabel")).toBe("test");
  });

  describe("translation support", () => {
    t9n("calcite-action-group");
  });

  describe("theme", () => {
    describe("border", () => {
      themed(
        html`<calcite-action-menu open
          ><calcite-action-group></calcite-action-group><calcite-action-group></calcite-action-group
        ></calcite-action-menu>`,
        {
          "--calcite-action-group-border-color": {
            selector: "calcite-action-group",
            targetProp: "borderBlockEndColor",
          },
        },
      );
    });
  });
});
