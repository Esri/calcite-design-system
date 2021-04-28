import { accessible, hidden, renders, defaults, reflects, focusable } from "../../tests/commonTests";
import { newE2EPage } from "@stencil/core/testing";
import { SLOTS, CSS } from "./resources";
import { html } from "../../tests/utils";

describe("calcite-action-menu", () => {
  it("renders", async () => renders("calcite-action-menu"));

  it("honors hidden attribute", async () => hidden("calcite-action-menu"));

  it("should be accessible", async () =>
    accessible(`
    <calcite-action-menu label="test">
      <calcite-action text="Add" icon="plus"></calcite-action>
    </calcite-action-menu>
    `));

  it("should be accessible: with tooltip", async () =>
    accessible(`
    <calcite-action-menu label="test">
      <calcite-tooltip slot="${SLOTS.tooltip}">Bits and bobs.</calcite-tooltip>
      <calcite-action text="Add" icon="plus"></calcite-action>
    </calcite-action-menu>
    `));

  it("defaults", async () =>
    defaults("calcite-action-menu", [
      {
        propertyName: "expanded",
        defaultValue: false
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined
      },
      {
        propertyName: "intlOptions",
        defaultValue: undefined
      },
      {
        propertyName: "open",
        defaultValue: false
      },
      {
        propertyName: "placement",
        defaultValue: "auto"
      },
      {
        propertyName: "scale",
        defaultValue: "m"
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute"
      }
    ]));

  it("reflects", async () =>
    reflects("calcite-action-menu", [
      {
        propertyName: "expanded",
        value: true
      },
      {
        propertyName: "open",
        value: true
      },
      {
        propertyName: "placement",
        value: "auto"
      },
      {
        propertyName: "scale",
        value: "m"
      }
    ]));

  it("honors tooltip slot", async () => {
    const page = await newE2EPage({
      html: `<calcite-action-menu>
      <calcite-tooltip slot="${SLOTS.tooltip}">Bits and bobs.</calcite-tooltip>
      <calcite-action text="Add" icon="plus"></calcite-action>
    </calcite-action-menu>`
    });

    await page.waitForChanges();

    const tooltipManager = await page.find(`calcite-action-menu >>> calcite-tooltip-manager`);

    expect(tooltipManager).toBeTruthy();

    const tooltipSlot = await page.find(`calcite-action-menu >>> slot[name=${SLOTS.tooltip}]`);
    expect(tooltipSlot).toBeTruthy();
  });

  it("should emit 'calciteActionMenuOpenChange' event", async () => {
    const page = await newE2EPage({
      html: `<calcite-action-menu>
      <calcite-action text="Add" icon="plus"></calcite-action>
    </calcite-action-menu>`
    });

    await page.waitForChanges();

    const clickSpy = await page.spyOnEvent("calciteActionMenuOpenChange");

    const actionMenu = await page.find("calcite-action-menu");

    actionMenu.setProperty("open", true);

    await page.waitForChanges();

    expect(clickSpy).toHaveReceivedEventTimes(1);
  });

  it("should focus on menu", async () =>
    focusable(
      html`
        <calcite-action-menu open>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action text="Add" icon="plus"></calcite-action>
        </calcite-action-menu>
      `,
      {
        shadowFocusTargetSelector: `.${CSS.menu}`
      }
    ));

  it("should focus on menu button", async () =>
    focusable(
      html`
        <calcite-action-menu>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action text="Add" icon="plus"></calcite-action
        ></calcite-action-menu>
      `,
      {
        shadowFocusTargetSelector: `.${CSS.menuButton}`
      }
    ));

  it("should close menu if clicked outside", async () => {
    const page = await newE2EPage({
      html: `<calcite-action-menu open>
          <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
          <calcite-action text="Add" icon="plus" text-enabled></calcite-action>
        </calcite-action-menu>
        <div>
        <button id="outside">outside</button>
        </div>`
    });

    await page.waitForChanges();

    const actionMenu = await page.find("calcite-action-menu");

    expect(await actionMenu.getProperty("open")).toBe(true);

    const action = await page.find("calcite-action");

    await action.click();

    await page.waitForChanges();

    expect(await actionMenu.getProperty("open")).toBe(true);

    const outside = await page.find("#outside");

    await outside.click();

    await page.waitForChanges();

    expect(await actionMenu.getProperty("open")).toBe(false);
  });
});
