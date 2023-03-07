import { accessible, hidden, renders, slots, t9n } from "../../tests/commonTests";
import { newE2EPage } from "@stencil/core/testing";
import { SLOTS } from "./resources";

describe("calcite-action-group", () => {
  it("renders", async () => renders("calcite-action-group", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-action-group"));

  it("should be accessible", async () =>
    accessible(`
    <calcite-action-group>
      <calcite-action text="Add" icon="plus"></calcite-action>
    </calcite-action-group>
    `));

  it("has slots", () => slots("calcite-action-group", SLOTS));

  it("should honor scale of expand icon", async () => {
    const page = await newE2EPage({
      html: `<calcite-action-group scale="l">
      <calcite-action slot="menu-actions" text="Add" icon="plus"></calcite-action>
      <calcite-action slot="menu-actions" text="Add" icon="plus"></calcite-action>
      </calcite-action-group>`
    });

    const menu = await page.find(`calcite-action-group >>> calcite-action-menu`);

    expect(await menu.getProperty("scale")).toBe("l");
  });

  it("support translation", () => t9n("calcite-action-group"));
});
