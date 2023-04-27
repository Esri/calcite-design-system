import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, renders, slots, t9n } from "../../tests/commonTests";
import { SLOTS } from "./resources";

const actionGroupHTML = `<calcite-action-group scale="l">
      <calcite-action id="plus" slot="menu-actions" text="Add" icon="plus"></calcite-action>
      <calcite-action id="banana" slot="menu-actions" text="Banana" icon="banana"></calcite-action>
      </calcite-action-group>`;

describe("calcite-action-group", () => {
  it("defaults", async () =>
    defaults("calcite-action-group", [
      {
        propertyName: "layout",
        defaultValue: "vertical"
      }
    ]));

  describe("renders", () => {
    renders("calcite-action-group", { display: "flex" });
  });

  it("focusable", async () => focusable(actionGroupHTML, { shadowFocusTargetSelector: "calcite-action" }));

  it("honors hidden attribute", async () => hidden("calcite-action-group"));

  it("should be accessible", async () => accessible(actionGroupHTML));

  it("has slots", () => slots("calcite-action-group", SLOTS));

  it("should honor scale of expand icon", async () => {
    const page = await newE2EPage({ html: actionGroupHTML });
    const menu = await page.find(`calcite-action-group >>> calcite-action-menu`);
    expect(await menu.getProperty("scale")).toBe("l");
  });

  it("support translation", () => t9n("calcite-action-group"));
});
