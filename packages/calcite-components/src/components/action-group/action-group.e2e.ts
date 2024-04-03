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
    const container = await page.find(`calcite-action-group >>> ..${CSS.container}`);
    expect(await container.getProperty("ariaLabel")).toBe("test");
  });

  describe("translation support", () => {
    t9n("calcite-action-group");
  });

  describe("Theme-ing", () => {
    let page: E2EPage;
    const customTheme = {
      "--calcite-action-group-border-color": "rgb(255, 0, 0)",
      "--calcite-action-group-popover-background-color": "rgb(0, 255, 255)",
      "--calcite-action-group-popover-border-color": "rgb(255, 0, 255)",
      "--calcite-action-group-popover-corner-radius": "rgb(128, 0, 0)",
      "--calcite-action-group-popover-shadow": "0 0 0 rgb(0, 128, 0)",
      "--calcite-action-group-trigger-background-color-active": "rgb(0, 0, 128)",
      "--calcite-action-group-trigger-background-color-focus": "rgb(128, 128, 0)",
      "--calcite-action-group-trigger-background-color-hover": "rgb(0, 128, 128)",
      "--calcite-action-group-trigger-background-color": "rgb(128, 0, 128)",
      "--calcite-action-group-trigger-icon-color-active": "rgb(192, 192, 192)",
      "--calcite-action-group-trigger-icon-color-focus": "rgb(192, 0, 0)",
      "--calcite-action-group-trigger-icon-color-hover": "rgb(0, 192, 0)",
      "--calcite-action-group-trigger-icon-color": "rgb(0, 0, 192)",
      "--calcite-action-group-trigger-indicator-color": "rgb(192, 192, 0)",
      "--calcite-action-group-trigger-loader-color": "rgb(0, 192, 192)",
      "--calcite-action-group-trigger-shadow-active": "rgb(192, 0, 192)",
      "--calcite-action-group-trigger-shadow-focus": "rgb(128, 128, 128)",
      "--calcite-action-group-trigger-shadow-hover": "rgb(128, 64, 64)",
      "--calcite-action-group-trigger-shadow": "rgb(64, 128, 64)",
      "--calcite-action-group-trigger-text-color-active": "rgb(64, 64, 128)",
      "--calcite-action-group-trigger-text-color-focus": "rgb(128, 64, 128)",
      "--calcite-action-group-trigger-text-color-hover": "rgb(64, 128, 128)",
      "--calcite-action-group-trigger-text-color": "rgb(128, 64, 64)",
    };

    beforeEach(async () => {
      page = await newE2EPage({ html: actionGroupHTML });
      await page.waitForChanges();
    });

    it("should allow theme-ing of the trigger", async () => {
      const actionGroup = await page.find("calcite-action-group");
      const defaultStyle = await actionGroup.getComputedStyle();

      await actionGroup.setAttribute(
        "style",
        `${Object.entries(customTheme)
          .map(([key, val]) => `${key}: ${val}`)
          .join("; ")}`,
      );
      await page.waitForChanges();
      const styles = await actionGroup.getComputedStyle();
      debugger;
      expect(defaultStyle.backgroundColor).not.toBe(customTheme["--calcite-action-group-background-color"]);
      expect(styles.backgroundColor).toBe(customTheme["--calcite-action-group-background-color"]);
    });
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
      };
      themed(actionGroupHTML, tokens);
    });
  });
});
