import { newE2EPage, E2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, renders, slots, t9n, themed } from "../../tests/commonTests";
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
    describe("default", () => {
      const tokens = {
        "--calcite-action-group-border-color": [
          {
            selector: "calcite-action-group",
            targetProp: "border-left-color",
          },
          {
            selector: "calcite-action-group",
            shadowSelector:
              ".container calcite-action-menu >>> .container calcite-popover >>> .calcite-floating-ui-anim",
            targetProp: "border-left-color",
          },
        ],
        "--calcite-action-group-trigger-background-color": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "backgroundColor",
        },
        "--calcite-action-group-trigger-icon-color": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> calcite-icon`,
          targetProp: "color",
        },
        "--calcite-action-group-trigger-shadow": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "boxShadow",
        },
        "--calcite-action-group-trigger-text-color": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "color",
        },
        "--calcite-action-group-trigger-background-color-active": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "class", value: CSS.expandToggle } },
        },
        "--calcite-action-group-trigger-background-color-focus": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "backgroundColor",
          state: "focus",
        },
        "--calcite-action-group-trigger-background-color-hover": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "backgroundColor",
          state: "hover",
        },
        "--calcite-action-group-trigger-icon-color-active": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "color",
          state: { press: { attribute: "class", value: CSS.expandToggle } },
        },
        "--calcite-action-group-trigger-icon-color-focus": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "color",
          state: "focus",
        },
        "--calcite-action-group-trigger-icon-color-hover": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "color",
          state: "hover",
        },
        "--calcite-action-group-trigger-shadow-active": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "boxShadow",
          state: { press: { attribute: "class", value: CSS.expandToggle } },
        },
        "--calcite-action-group-trigger-shadow-focus": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "boxShadow",
          state: "focus",
        },
        "--calcite-action-group-trigger-shadow-hover": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "boxShadow",
          state: "hover",
        },
        "--calcite-action-group-trigger-text-color-active": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "color",
          state: { press: { attribute: "class", value: CSS.expandToggle } },
        },
        "--calcite-action-group-trigger-text-color-focus": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "color",
          state: "focus",
        },
        "--calcite-action-group-trigger-text-color-hover": {
          selector: "calcite-action-group",
          shadowSelector: `calcite-action-menu calcite-action >>> .button`,
          targetProp: "color",
          state: "hover",
        },
      } as const;
      themed(actionGroupHTML, tokens);
    });
  });
});
