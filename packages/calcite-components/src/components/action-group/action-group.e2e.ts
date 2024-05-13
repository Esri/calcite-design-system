import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, renders, slots, t9n, themed } from "../../tests/commonTests";
import { ComponentTestTokens } from "../../tests/commonTests/themed";
import { CSS, SLOTS } from "./resources";

const actionGroupHTML = `<calcite-action-group scale="l">
      <calcite-action id="plus" slot="menu-actions" text="Add" icon="plus"></calcite-action>
      <calcite-action id="banana" slot="menu-actions" text="Banana" icon="banana"></calcite-action>
      </calcite-action-group>`;

describe("calcite-action-group", () => {
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
    const tokens: ComponentTestTokens = {
      "--calcite-action-group-border-color": [
        {
          targetProp: "borderLeftColor",
        },
        {
          shadowSelector: "calcite-action-menu",
          targetProp: "--calcite-action-menu-popover-border-color",
        },
      ],
      "--calcite-action-group-popover-background-color": {
        shadowSelector: "calcite-action-menu",
        targetProp: "--calcite-action-menu-popover-background-color",
      },
      "--calcite-action-group-popover-border-color": {
        shadowSelector: "calcite-action-menu",
        targetProp: "--calcite-action-menu-popover-border-color",
      },
      "--calcite-action-group-popover-corner-radius": {
        shadowSelector: "calcite-action-menu",
        targetProp: "--calcite-action-menu-popover-corner-radius",
      },
      "--calcite-action-group-popover-shadow": {
        shadowSelector: "calcite-action-menu",
        targetProp: "--calcite-action-menu-popover-shadow",
      },
      "--calcite-action-group-trigger-background-color-active": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-background-color",
        state: { press: { attribute: "class", value: CSS.expandToggle } },
      },
      "--calcite-action-group-trigger-background-color-focus": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-background-color",
        state: "focus",
      },
      "--calcite-action-group-trigger-background-color-hover": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-background-color",
        state: "hover",
      },
      "--calcite-action-group-trigger-background-color": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-background-color",
      },
      "--calcite-action-group-trigger-icon-color-active": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-icon-color",
        state: { press: { attribute: "class", value: CSS.expandToggle } },
      },
      "--calcite-action-group-trigger-icon-color-focus": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-icon-color",
        state: "focus",
      },
      "--calcite-action-group-trigger-icon-color-hover": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-icon-color",
        state: "hover",
      },
      "--calcite-action-group-trigger-icon-color": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-icon-color",
      },
      "--calcite-action-group-trigger-indicator-color": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-indicator-color",
      },
      "--calcite-action-group-trigger-loader-color": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-loader-color",
      },
      "--calcite-action-group-trigger-shadow-active": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-shadow",
        state: { press: { attribute: "class", value: CSS.expandToggle } },
      },
      "--calcite-action-group-trigger-shadow-hover": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-shadow",
        state: "hover",
      },
      "--calcite-action-group-trigger-shadow-focus": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-shadow",
        state: "focus",
      },
      "--calcite-action-group-trigger-shadow": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-shadow",
      },
      "--calcite-action-group-trigger-text-color-active": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-text-color",
        state: { press: { attribute: "class", value: CSS.expandToggle } },
      },
      "--calcite-action-group-trigger-text-color-hover": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-text-color",
        state: "hover",
      },
      "--calcite-action-group-trigger-text-color-focus": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-text-color",
        state: "focus",
      },
      "--calcite-action-group-trigger-text-color": {
        shadowSelector: "calcite-action",
        targetProp: "--calcite-action-text-color",
      },
    };
    themed(`calcite-action-group`, tokens);
  });
});
