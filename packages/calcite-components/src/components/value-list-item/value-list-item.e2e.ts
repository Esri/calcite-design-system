import { CSS as PICK_LIST_ITEM_CSS, SLOTS } from "../pick-list-item/resources";
import { accessible, disabled, focusable, renders, slots, hidden } from "../../tests/commonTests";
import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";

describe("calcite-value-list-item", () => {
  describe("renders", () => {
    renders("calcite-value-list-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-value-list-item");
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip("accessible", () => {
    accessible(html`
      <calcite-value-list>
        <calcite-value-list-item label="test" description="a number" value="one"></calcite-value-list-item>
      </calcite-value-list>
    `);

    accessible(html`
      <calcite-value-list>
        <calcite-value-list-item label="test" description="a number" value="one" removable></calcite-value-list-item>
      </calcite-value-list>
    `);
  });

  describe("slots", () => {
    slots("calcite-value-list-item", SLOTS);
  });

  describe("is focusable", () => {
    focusable("calcite-value-list-item");
  });

  describe("disabled", () => {
    disabled("calcite-value-list-item");
  });

  it("should toggle selected attribute when clicked", async () => {
    const page = await newE2EPage({ html: `<calcite-value-list-item label="test"></calcite-value-list-item>` });

    const item = await page.find("calcite-value-list-item");
    expect(await item.getProperty("selected")).toBe(false);

    await item.click();
    expect(await item.getProperty("selected")).toBe(true);

    await item.click();
    expect(await item.getProperty("selected")).toBe(false);
  });

  it("should fire event calciteListItemChange when item is clicked", async () => {
    const page = await newE2EPage({
      html: `<calcite-value-list-item label="test" value="example"></calcite-value-list-item>`,
    });
    const item = await page.find("calcite-value-list-item");
    await page.evaluate(() =>
      document.addEventListener("calciteListItemChange", (event: CustomEvent): void => {
        (window as any).eventDetail = event.detail;
      })
    );

    await item.click();

    const eventDetail: any = await page.evaluateHandle(() => (window as any).eventDetail);
    const properties = await eventDetail.getProperties();

    expect(properties.get("item")).toBeDefined();
    expect(properties.get("value")._remoteObject.value).toBe("example");
    expect(properties.get("selected")._remoteObject.value).toBe(true);
    expect(properties.get("shiftPressed")._remoteObject.value).toBe(false);
  });

  it("prevents deselection when deselectDisabled is true", async () => {
    const page = await newE2EPage({
      html: `<calcite-value-list-item label="test" value="example" deselect-disabled selected></calcite-value-list-item>`,
    });
    const item = await page.find("calcite-value-list-item");

    await item.click();

    expect(await item.getProperty("selected")).toBe(true);
  });

  it("prevents selection when nonInteractive is true", async () => {
    const page = await newE2EPage({
      html: `<calcite-value-list-item label="test" value="example" non-interactive></calcite-value-list-item>`,
    });
    const item = await page.find("calcite-value-list-item");

    await item.click();

    expect(await item.getProperty("selected")).toBe(false);
  });

  it("prevents deselection when nonInteractive is true", async () => {
    const page = await newE2EPage({
      html: `<calcite-value-list-item label="test" value="example" non-interactive selected></calcite-value-list-item>`,
    });
    const item = await page.find("calcite-value-list-item");

    await item.click();

    expect(await item.getProperty("selected")).toBe(true);
  });

  function queryWrappedPickListPart(page: E2EPage, partSelector: string, partMethodToInvoke?: string): Promise<void> {
    return page.$eval(
      "calcite-value-list-item",
      (item: HTMLCalciteValueListItemElement, selector: string, partMethod?: string) => {
        const part = item.shadowRoot
          .querySelector("calcite-pick-list-item")
          .shadowRoot.querySelector<HTMLElement>(selector);

        if (partMethod) {
          part[partMethod]();
        }
      },
      partSelector,
      partMethodToInvoke
    );
  }

  it("allows for easy removal", async () => {
    const page = await newE2EPage({
      html: `<calcite-value-list-item label="test" value="example" removable></calcite-value-list-item>`,
    });

    const item = await page.find("calcite-value-list-item");
    const removeEventSpy = await item.spyOnEvent("calciteListItemRemove");

    await queryWrappedPickListPart(page, `.${PICK_LIST_ITEM_CSS.remove}`, "click");

    expect(removeEventSpy).toHaveReceivedEventTimes(1);
  });
});
