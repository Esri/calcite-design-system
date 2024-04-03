import { CSS, SLOTS } from "./resources";
import { accessible, disabled, renders, slots, hidden, t9n } from "../../tests/commonTests";
import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";

describe("calcite-pick-list-item", () => {
  describe("renders", () => {
    renders("calcite-pick-list-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-list-item");
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip("accessible", () => {
    accessible(html`
      <calcite-pick-list>
        <calcite-pick-list-item label="test" description="a number" value="one"></calcite-pick-list-item>
      </calcite-pick-list>
    `);

    accessible(html`
      <calcite-pick-list>
        <calcite-pick-list-item label="test" description="a number" value="one" selected></calcite-pick-list-item>
      </calcite-pick-list>
    `);

    accessible(html`
      <calcite-pick-list>
        <calcite-pick-list-item label="test" description="a number" value="one" removable></calcite-pick-list-item>
      </calcite-pick-list>
    `);
  });

  describe("slots", () => {
    slots("calcite-pick-list-item", SLOTS);
  });

  describe("disabled", () => {
    disabled("calcite-pick-list-item");
  });

  describe("translation support", () => {
    t9n("calcite-pick-list-item");
  });

  it("should toggle selected attribute when clicked", async () => {
    const page = await newE2EPage({ html: `<calcite-pick-list-item label="test"></calcite-pick-list-item>` });

    const item = await page.find("calcite-pick-list-item");
    expect(await item.getProperty("selected")).toBe(false);

    await item.click();
    expect(await item.getProperty("selected")).toBe(true);

    await item.click();
    expect(await item.getProperty("selected")).toBe(false);
  });

  it("should toggle selected attribute when icon is clicked", async () => {
    const page = await newE2EPage({
      html: `<calcite-pick-list-item label="test" icon="circle"></calcite-pick-list-item>`,
    });

    const item = await page.find("calcite-pick-list-item");
    expect(await item.getProperty("selected")).toBe(false);

    const icon = await page.find(`calcite-pick-list-item >>> .${CSS.icon}`);
    await icon.click();
    expect(await item.getProperty("selected")).toBe(true);

    await icon.click();
    expect(await item.getProperty("selected")).toBe(false);
  });

  it("should fire event calciteListItemChange when item is clicked", async () => {
    const page = await newE2EPage({
      html: `<calcite-pick-list-item label="test" value="example"></calcite-pick-list-item>`,
    });
    const item = await page.find("calcite-pick-list-item");
    await page.evaluate(() => {
      document.addEventListener("calciteListItemChange", (event: CustomEvent): void => {
        (window as any).eventDetail = event.detail;
      });
    });

    await item.click();

    const eventDetail: any = await page.evaluateHandle(() => (window as any).eventDetail);
    const properties = await eventDetail.getProperties();

    expect(properties.get("item")).toBeDefined();
    expect(properties.get("value").remoteObject().value).toBe("example");
    expect(properties.get("selected").remoteObject().value).toBe(true);
    expect(properties.get("shiftPressed").remoteObject().value).toBe(false);
  });

  it("prevents deselection when deselectDisabled is true", async () => {
    const page = await newE2EPage({
      html: `<calcite-pick-list-item label="test" value="example" deselect-disabled selected></calcite-pick-list-item>`,
    });
    const item = await page.find("calcite-pick-list-item");

    await item.click();

    expect(await item.getProperty("selected")).toBe(true);
  });

  it("prevents selection when nonInteractive is true", async () => {
    const page = await newE2EPage({
      html: `<calcite-pick-list-item label="test" value="example" non-interactive></calcite-pick-list-item>`,
    });
    const item = await page.find("calcite-pick-list-item");

    await item.click();

    expect(await item.getProperty("selected")).toBe(false);
  });

  it("prevents deselection when nonInteractive is true", async () => {
    const page = await newE2EPage({
      html: `<calcite-pick-list-item label="test" value="example" non-interactive selected></calcite-pick-list-item>`,
    });
    const item = await page.find("calcite-pick-list-item");

    await item.click();

    expect(await item.getProperty("selected")).toBe(true);
  });

  it("allows for easy removal", async () => {
    const page = await newE2EPage({
      html: `<calcite-pick-list-item label="test" value="example" removable></calcite-pick-list-item>`,
    });

    const removeButton = await page.find(`calcite-pick-list-item >>> .${CSS.remove}`);

    expect(removeButton).toBeTruthy();

    const item = await page.find("calcite-pick-list-item");
    const removeEventSpy = await item.spyOnEvent("calciteListItemRemove");
    await removeButton.click();

    expect(removeEventSpy).toHaveReceivedEventTimes(1);
  });

  it("slot keyboard navigation", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-pick-list style="width: 400px">
        <calcite-pick-list-item label="apple" value="apple" icon="circle">
          <calcite-action slot="actions-end" icon="information"></calcite-action>
        </calcite-pick-list-item>
        <calcite-pick-list-item label="mango" value="mango" selected="" icon="circle">
          <calcite-action slot="actions-end" icon="information"></calcite-action>
        </calcite-pick-list-item>
      </calcite-pick-list>
    `);

    const item = await page.find("calcite-pick-list-item:nth-child(2)");
    await item.click();
    await item.press("Tab");
    expect(await page.evaluate(() => document.activeElement.getAttribute("slot"))).toEqual("actions-end");

    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    await page.keyboard.up("Shift");
    expect(await page.evaluate(() => document.activeElement.matches("calcite-pick-list-item:nth-child(2)"))).toBe(true);

    await item.press("Tab");
    expect(await page.evaluate(() => document.activeElement.getAttribute("slot"))).toEqual("actions-end");
  });
});
