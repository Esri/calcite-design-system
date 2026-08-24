import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, disabled, themed } from "../../tests/commonTests/browser";
import { afterNextTask } from "../../tests/utils/timing";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-list-item-group"),
    [
      {
        propertyName: "heading",
        defaultValue: undefined,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "filterHidden",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "listItems",
        defaultValue: [],
      },
      {
        propertyName: "childListItemGroups",
        defaultValue: [],
      },
    ],
  );
});

describe("listItems", () => {
  it("tracks slotted list items and emits an internal change event", async () => {
    const { el } = await mount<"calcite-list-item-group">("calcite-list-item-group");

    let eventCount = 0;

    el.addEventListener("calciteInternalListItemGroupItemsChange", () => {
      eventCount += 1;
    });

    el.innerHTML = `
      <calcite-list-item label="One" value="one"></calcite-list-item>
      <calcite-list-item label="Two" value="two"></calcite-list-item>
    `;

    await afterNextTask();

    expect(el.listItems).toHaveLength(2);
    expect(eventCount).toBeGreaterThan(0);
  });

  it("tracks direct child list-item-groups when nested groups change", async () => {
    const { el } = await mount<"calcite-list-item-group">("calcite-list-item-group");

    let eventCount = 0;

    el.addEventListener("calciteInternalListItemGroupItemsChange", () => {
      eventCount += 1;
    });

    el.innerHTML = `
      <calcite-list-item-group heading="Parent">
        <calcite-list-item-group heading="Nested"></calcite-list-item-group>
      </calcite-list-item-group>
    `;

    await afterNextTask();

    expect(el.childListItemGroups).toHaveLength(1);
    expect(el.childListItemGroups[0].heading).toBe("Parent");

    el.innerHTML = `
      <calcite-list-item-group heading="Parent"></calcite-list-item-group>
      <calcite-list-item-group heading="Sibling"></calcite-list-item-group>
    `;

    await afterNextTask();

    expect(el.childListItemGroups).toHaveLength(2);

    el.innerHTML = `<calcite-list-item label="Only item" value="only-item"></calcite-list-item>`;

    await afterNextTask();

    expect(el.childListItemGroups).toHaveLength(0);
    expect(eventCount).toBeGreaterThan(2);
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-list-item-group"));
});

describe("renders", () => {
  renders(() => mount("calcite-list-item-group"), { display: "flex" });
});

describe("disabled", () => {
  disabled(() => mount("calcite-list-item-group"), { focusTarget: "none" });
});

describe("themed", () => {
  describe("default", () => {
    themed(() => mount(<calcite-list-item-group heading="Buildings" />), {
      "--calcite-list-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-list-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
      },
    });
  });
});
