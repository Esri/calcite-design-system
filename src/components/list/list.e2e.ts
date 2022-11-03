import { accessible, hidden, renders, focusable, disabled } from "../../tests/commonTests";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { html } from "../../../support/formatting";
import { newE2EPage } from "@stencil/core/testing";

const placeholder = placeholderImage({
  width: 140,
  height: 100
});

describe("calcite-list", () => {
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
    const filterSpy = await page.spyOnEvent("calciteListFilter");
    const filter = await page.find(`calcite-list >>> calcite-filter`);
    await filter.callMethod("setFocus");

    const calciteFilterChangeEvent = filter.waitForEvent("calciteFilterChange");
    const calciteListFilterEvent = page.waitForEvent("calciteListFilter");
    await page.keyboard.type("one");
    await calciteFilterChangeEvent;
    await calciteListFilterEvent;
    expect(filterSpy.lastEvent.detail.filterText).toBe("one");
    expect(filterSpy.lastEvent.detail.calciteListFilter).toHaveLength(1);

    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.waitForChanges();

    const calciteFilterChangeEvent2 = filter.waitForEvent("calciteFilterChange");
    const calciteListFilterEvent2 = page.waitForEvent("calciteListFilter");
    await page.keyboard.type("two");
    await calciteFilterChangeEvent2;
    await calciteListFilterEvent2;
    expect(filterSpy.lastEvent.detail.filterText).toBe("two");
    expect(filterSpy.lastEvent.detail.calciteListFilter).toHaveLength(1);

    const calciteFilterChangeEvent3 = filter.waitForEvent("calciteFilterChange");
    const calciteListFilterEvent3 = page.waitForEvent("calciteListFilter");
    await page.keyboard.type("blah");
    await calciteFilterChangeEvent3;
    await calciteListFilterEvent3;
    expect(filterSpy.lastEvent.detail.filterText).toBe("twoblah");
    expect(filterSpy.lastEvent.detail.calciteListFilter).toHaveLength(0);
  });
});
