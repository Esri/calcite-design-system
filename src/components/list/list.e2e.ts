import { accessible, hidden, renders, focusable, disabled, defaults } from "../../tests/commonTests";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { html } from "../../../support/formatting";
import { newE2EPage } from "@stencil/core/testing";
import { debounceTimeout } from "./resources";

const placeholder = placeholderImage({
  width: 140,
  height: 100
});

describe("calcite-list", () => {
  it("defaults", async () =>
    defaults("calcite-list", [
      {
        propertyName: "disabled",
        defaultValue: false
      },
      {
        propertyName: "label",
        defaultValue: undefined
      },
      {
        propertyName: "loading",
        defaultValue: false
      },
      {
        propertyName: "selectionMode",
        defaultValue: "none"
      },
      {
        propertyName: "selectedItems",
        defaultValue: []
      },
      {
        propertyName: "selectionAppearance",
        defaultValue: "icon"
      },
      {
        propertyName: "filterEnabled",
        defaultValue: false
      },
      {
        propertyName: "filteredData",
        defaultValue: []
      },
      {
        propertyName: "filteredItems",
        defaultValue: []
      },
      {
        propertyName: "filterText",
        defaultValue: undefined
      },
      {
        propertyName: "filterPlaceholder",
        defaultValue: undefined
      }
    ]));

  it("renders", async () => renders("calcite-list", { display: "block" }));

  it("is focusable", () =>
    focusable(
      html`<calcite-list>
        <calcite-list-item active label="test" description="hello world"></calcite-list-item>
      </calcite-list>`,
      {
        focusTargetSelector: "calcite-list-item"
      }
    ));

  it("honors hidden attribute", async () => hidden("calcite-list"));

  it("should be accessible", async () => {
    await accessible(`<calcite-list>
    <calcite-list-item label="candy" description="kingdom">
      <calcite-action icon="banana" label="finn" slot="actions-start" />
      <calcite-icon icon="banana" slot="content-start" />
      <img slot="content-start" src="${placeholder}" alt="Test image" />
      <calcite-icon icon="banana" slot="content-end" />
      <calcite-action icon="banana" label="jake" slot="actions-end" />
    </calcite-list-item>
    <calcite-list-item label="test" non-interactive description="hello world"></calcite-list-item>
    <calcite-list-item label="test" description="hello world"></calcite-list-item>
  </calcite-list>`);
  });

  it("can be disabled", () =>
    disabled(
      html`<calcite-list>
        <calcite-list-item label="test" description="hello world"></calcite-list-item>
      </calcite-list>`,
      { focusTarget: "child" }
    ));

  it("navigating items after filtering", async () => {
    const page = await newE2EPage({
      html: html`
        <calcite-list filter-enabled>
          <calcite-list-item value="one" label="One" description="hello world"></calcite-list-item>
          <calcite-list-item value="two" label="Two" description="hello world"></calcite-list-item>
        </calcite-list>
      `
    });
    await page.waitForChanges();
    const list = await page.find("calcite-list");
    const filter = await page.find(`calcite-list >>> calcite-filter`);
    expect(await list.getProperty("filteredItems")).toHaveLength(2);
    expect(await list.getProperty("filteredData")).toHaveLength(0);
    expect(await list.getProperty("filterText")).toBeUndefined();

    await filter.callMethod("setFocus");

    const calciteFilterChangeEvent = filter.waitForEvent("calciteFilterChange");
    const calciteListFilterEvent = page.waitForEvent("calciteListFilter");
    await page.keyboard.type("one");
    await page.waitForTimeout(debounceTimeout);
    await calciteFilterChangeEvent;
    await calciteListFilterEvent;
    expect(await list.getProperty("filteredItems")).toHaveLength(1);
    expect(await list.getProperty("filteredData")).toHaveLength(1);
    expect(await list.getProperty("filterText")).toBe("one");

    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.waitForChanges();

    const calciteFilterChangeEvent2 = filter.waitForEvent("calciteFilterChange");
    const calciteListFilterEvent2 = page.waitForEvent("calciteListFilter");
    await page.keyboard.type("two");
    await page.waitForTimeout(debounceTimeout);
    await calciteFilterChangeEvent2;
    await calciteListFilterEvent2;
    expect(await list.getProperty("filteredItems")).toHaveLength(1);
    expect(await list.getProperty("filteredData")).toHaveLength(1);
    expect(await list.getProperty("filterText")).toBe("two");

    const calciteFilterChangeEvent3 = filter.waitForEvent("calciteFilterChange");
    const calciteListFilterEvent3 = page.waitForEvent("calciteListFilter");
    await page.keyboard.type("blah");
    await page.waitForTimeout(debounceTimeout);
    await calciteFilterChangeEvent3;
    await calciteListFilterEvent3;
    expect(await list.getProperty("filteredItems")).toHaveLength(0);
    expect(await list.getProperty("filteredData")).toHaveLength(0);
    expect(await list.getProperty("filterText")).toBe("twoblah");
  });
});
