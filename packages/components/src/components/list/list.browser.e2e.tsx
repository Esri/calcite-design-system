import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  cancelable,
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { CSS as listItemGroupCSS } from "../list-item-group/resources";
import { afterNextFrame } from "../../tests/utils/timing";
import { waitForEvent } from "../../tests/commonTests/browser/utils";
import { DEBOUNCE } from "../../utils/resources";
import { List } from "./list";

const scrollTopValue = 120;

describe("cancelable", () => {
  cancelable("calcite-list");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-list"),
    [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "selectionMode",
        defaultValue: "none",
      },
      {
        propertyName: "interactionMode",
        defaultValue: "interactive",
      },
      {
        propertyName: "selectedItems",
        defaultValue: [],
      },
      {
        propertyName: "selectionAppearance",
        defaultValue: "icon",
      },
      {
        propertyName: "filterEnabled",
        defaultValue: false,
      },
      {
        propertyName: "filterPredicate",
        defaultValue: undefined,
      },
      {
        propertyName: "filteredData",
        defaultValue: [],
      },
      {
        propertyName: "filteredItems",
        defaultValue: [],
      },
      {
        propertyName: "filterText",
        defaultValue: "",
      },
      {
        propertyName: "filterPlaceholder",
        defaultValue: undefined,
      },
      {
        propertyName: "dragEnabled",
        defaultValue: false,
      },
      {
        propertyName: "filterProps",
        defaultValue: undefined,
      },
      {
        propertyName: "displayMode",
        defaultValue: "flat",
      },
      {
        propertyName: "sortDisabled",
        defaultValue: false,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-list"),
    [
      {
        propertyName: "displayMode",
        value: "nested",
      },
      {
        propertyName: "sortDisabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-list"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-list>
          <calcite-list-item label="test" value="test" />
        </calcite-list>,
      ),
    { display: "block" },
  );
});

describe("is focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-list>
          <calcite-list-item active description="hello world" label="test" />
        </calcite-list>,
      ),
    {
      focusTargetSelector: "calcite-list-item",
    },
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-list"));
});

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-list>
          <calcite-list-item description="hello world" label="test" />
        </calcite-list>,
      ),
    { focusTarget: "child" },
  );
});

describe("sticky group heading", () => {
  it("keeps the first list-item-group heading fixed while the list scrolls", async () => {
    const { el } = await mount(
      <calcite-list style="height: 160px; overflow-y: auto;">
        <calcite-list-item-group heading="Group A">
          <calcite-list-item label="A1" value="a1" />
          <calcite-list-item label="A2" value="a2" />
          <calcite-list-item label="A3" value="a3" />
          <calcite-list-item label="A4" value="a4" />
          <calcite-list-item label="A5" value="a5" />
          <calcite-list-item label="A6" value="a6" />
        </calcite-list-item-group>
        <calcite-list-item-group heading="Group B">
          <calcite-list-item label="B1" value="b1" />
          <calcite-list-item label="B2" value="b2" />
          <calcite-list-item label="B3" value="b3" />
          <calcite-list-item label="B4" value="b4" />
          <calcite-list-item label="B5" value="b5" />
          <calcite-list-item label="B6" value="b6" />
        </calcite-list-item-group>
      </calcite-list>,
    );

    const stickyContainer = page
      .getBySelector(`calcite-list-item-group .${listItemGroupCSS.container}`)
      .first()
      .element();

    const initialTop = stickyContainer.getBoundingClientRect().top;

    el.scrollTop = scrollTopValue;
    await afterNextFrame();

    expect(el.scrollTop).toBeGreaterThan(0);

    const scrolledTop = stickyContainer.getBoundingClientRect().top;
    expect(Math.abs(scrolledTop - initialTop)).toBeLessThanOrEqual(2);
  });
});

describe("sticky group heading with filter", () => {
  it("positions the sticky group heading below the filter row when filter is enabled", async () => {
    const { el } = await mount(
      <calcite-list filter-enabled style="height: 160px; overflow-y: auto;">
        <calcite-list-item-group heading="Group A">
          <calcite-list-item label="A1" value="a1" />
          <calcite-list-item label="A2" value="a2" />
          <calcite-list-item label="A3" value="a3" />
          <calcite-list-item label="A4" value="a4" />
          <calcite-list-item label="A5" value="a5" />
          <calcite-list-item label="A6" value="a6" />
          <calcite-list-item label="A7" value="a7" />
          <calcite-list-item label="A8" value="a8" />
        </calcite-list-item-group>
        <calcite-list-item-group heading="Group B">
          <calcite-list-item label="B1" value="b1" />
          <calcite-list-item label="B2" value="b2" />
          <calcite-list-item label="B3" value="b3" />
          <calcite-list-item label="B4" value="b4" />
          <calcite-list-item label="B5" value="b5" />
          <calcite-list-item label="B6" value="b6" />
        </calcite-list-item-group>
      </calcite-list>,
    );

    const list = el as HTMLElement;

    const filterInput = page.getBySelector("calcite-list calcite-filter").element();

    const stickyContainer = page
      .getBySelector(`calcite-list-item-group .${listItemGroupCSS.container}`)
      .first()
      .element();

    // scroll enough so that the group heading is in its sticky position
    list.scrollTop = scrollTopValue;
    await afterNextFrame();

    expect(list.scrollTop).toBeGreaterThan(0);

    const filterRect = filterInput.getBoundingClientRect();
    const stickyRect = stickyContainer.getBoundingClientRect();

    // ensure the sticky group heading does not overlap the filter row
    // allow a small tolerance for sub-pixel differences
    const tolerance = 2;
    expect(stickyRect.top).toBeGreaterThanOrEqual(filterRect.bottom - tolerance);
  });
});

describe.only("group filtering", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  async function assertDescendantItems(groupSelector: string, visibility: boolean): Promise<void> {
    const items = page.getBySelector(`calcite-list-item-group${groupSelector} > calcite-list-item`);

    for (const item of items.elements()) {
      await (visibility
        ? expect.element(item).toBeVisible()
        : expect.element(item).not.toBeVisible());
    }
  }

  it("should include groups while filtering", async () => {
    const { el } = await mount<List>(
      <calcite-list
        filter-enabled
        filter-placeholder="typing 'recreation' should show 1st group with all items"
      >
        <calcite-list-item-group heading="Outdoor recreation" id="recreation">
          <calcite-list-item
            description="Designated routes for hikers to use."
            label="Hiking trails"
            value="hiking-trails"
          />
          <calcite-list-item
            description="Vertical drops from a river."
            label="Waterfalls"
            value="waterfalls"
          />
          <calcite-list-item-group heading="Beaches" id="beaches">
            <calcite-list-item description="Surfing" label="Surfing" value="Surfing" />
            <calcite-list-item description="Paragliding" label="Paragliding" value="Paragliding" />
            <calcite-list-item-group heading="Underwater" id="underwater">
              <calcite-list-item description="Snorkeling" label="Snorkeling" value="Snorkeling" />
              <calcite-list-item
                description="Scuba diving"
                label="Scuba diving"
                value="Scuba diving"
              />
            </calcite-list-item-group>
          </calcite-list-item-group>
        </calcite-list-item-group>
        <calcite-list-item-group heading="Buildings" id="buildings">
          <calcite-list-item
            description="Home base for park staff to converse with visitors."
            label="Park offices"
            value="offices"
          />
          <calcite-list-item
            description="Small houses available for visitors to book for stays."
            label="Guest lodges"
            value="lodges"
          />
        </calcite-list-item-group>
      </calcite-list>,
    );

    await el.setFocus();
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);

    const group1 = page.getBySelector("#recreation");
    const group2 = page.getBySelector("#buildings");
    const group3 = page.getBySelector("#beaches");
    const group4 = page.getBySelector("#underwater");

    expect(el.filteredItems).toHaveLength(8);

    const filterEvent = waitForEvent(el, "calciteListFilter");
    await userEvent.keyboard("Bui");
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);
    await filterEvent;

    expect(el).toHaveProperty("filterText", "Bui");
    expect(el.filteredItems).toHaveLength(2);

    await expect.element(group1).not.toBeVisible();
    await assertDescendantItems("#recreation", false);
    await expect.element(group2).toBeVisible();
    await assertDescendantItems(`#buildings`, true);
    await expect.element(group3).not.toBeVisible();
    await assertDescendantItems(`#beaches`, false);
    await expect.element(group4).not.toBeVisible();
    await assertDescendantItems("#underwater", false);

    await userEvent.keyboard("{Escape}");
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);
    expect(el).toHaveProperty("filterText", "");

    expect(el.filteredItems).toHaveLength(8);

    await expect.element(group1).toBeVisible();
    await assertDescendantItems("#recreation", true);
    await expect.element(group2).toBeVisible();
    await assertDescendantItems("#buildings", true);
    await expect.element(group3).toBeVisible();
    await assertDescendantItems("#beaches", true);
    await expect.element(group4).toBeVisible();
    await assertDescendantItems("#underwater", true);

    await userEvent.keyboard("Bea");
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);
    expect(el).toHaveProperty("filterText", "Bea");
    expect(el.filteredItems).toHaveLength(4);

    await expect.element(group1).toBeVisible();
    await assertDescendantItems("#recreation", false);
    await expect.element(group2).not.toBeVisible();
    await assertDescendantItems("#buildings", false);
    await expect.element(group3).toBeVisible();
    await assertDescendantItems("#beaches", true);
    await expect.element(group4).toBeVisible();
    await assertDescendantItems("#underwater", true);

    await userEvent.keyboard("{Backspace}");
    vi.advanceTimersByTime(DEBOUNCE.filter + 1);

    expect(el).toHaveProperty("filterText", "Be");
    expect(el.filteredItems).toHaveLength(4);
  });
});
