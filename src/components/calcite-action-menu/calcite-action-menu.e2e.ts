import { accessible, hidden, renders, defaults, reflects } from "../../tests/commonTests";
import { newE2EPage } from "@stencil/core/testing";
import { SLOTS } from "./resources";

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
    <calcite-action-menu>
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
        propertyName: "offsetDistance",
        defaultValue: 0
      },
      {
        propertyName: "open",
        defaultValue: false
      },
      {
        propertyName: "placement",
        defaultValue: "auto"
      }
    ]));

  it("reflects", async () =>
    reflects("calcite-action-menu", [
      {
        propertyName: "expanded",
        value: true
      },
      {
        propertyName: "offsetDistance",
        value: 0
      },
      {
        propertyName: "open",
        value: true
      },
      {
        propertyName: "placement",
        value: "auto"
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
});
