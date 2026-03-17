import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { IDS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-sort-handle"),
    [
      {
        propertyName: "sortDisabled",
        defaultValue: false,
      },
      {
        propertyName: "setPosition",
        defaultValue: undefined,
      },
      {
        propertyName: "setSize",
        defaultValue: undefined,
      },
      {
        propertyName: "moveToItems",
        defaultValue: [],
      },
      {
        propertyName: "addToItems",
        defaultValue: [],
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-sort-handle"),
    [
      {
        propertyName: "sortDisabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-sort-handle"));
});

describe("renders", () => {
  renders(() => mount("calcite-sort-handle"), { display: "flex" });
});

describe("focusable", () => {
  focusable(() => mount(<calcite-sort-handle label="test" set-position="4" set-size="10" />));
});

describe("translation support", () => {
  t9n(() => mount("calcite-sort-handle"));
});

describe("disabled", () => {
  disabled(() => mount(<calcite-sort-handle label="test" set-position="4" set-size="10" />));
});

it("renders disabled boundary reorder items instead of hiding them", async () => {
  const { el } = await mount(<calcite-sort-handle label="test" set-position="1" set-size="4" />);
  await el.updateComplete;

  const reorderGroup = el.shadowRoot.querySelector<HTMLElement>(`#${IDS.reorder}`);
  const reorderItems = Array.from(
    reorderGroup.querySelectorAll<HTMLCalciteDropdownItemElement>("calcite-dropdown-item"),
  );

  expect(reorderItems).toHaveLength(4);
  expect(reorderItems.map((item) => item.disabled)).toEqual([true, true, false, false]);
});

it("omits the reorder group title when it is the only visible group", async () => {
  const { el } = await mount(<calcite-sort-handle label="test" set-position="2" set-size="4" />);
  await el.updateComplete;

  const reorderGroup = el.shadowRoot.querySelector<HTMLCalciteDropdownGroupElement>(
    `#${IDS.reorder}`,
  );

  expect(reorderGroup.groupTitle).toBeUndefined();
});

it("shows the reorder group title when move-to items are present", async () => {
  const { el, reRender } = await mount(
    <calcite-sort-handle label="test" set-position="2" set-size="4" />,
  );

  el.moveToItems = [{ label: "List 2", id: "list2" }];
  await reRender();

  const reorderGroup = el.shadowRoot.querySelector<HTMLCalciteDropdownGroupElement>(
    `#${IDS.reorder}`,
  );

  expect(reorderGroup.groupTitle).toBe("Reorder");
});

it("keeps single-item sets enabled and renders disabled reorder actions", async () => {
  const { el } = await mount(<calcite-sort-handle label="test" set-position="1" set-size="1" />);
  await el.updateComplete;

  const dropdown = el.shadowRoot.querySelector<HTMLCalciteDropdownElement>("calcite-dropdown");
  const reorderItems = Array.from(
    el.shadowRoot
      .querySelector(`#${IDS.reorder}`)
      .querySelectorAll<HTMLCalciteDropdownItemElement>("calcite-dropdown-item"),
  );

  expect(dropdown.disabled).toBe(false);
  expect(reorderItems.map((item) => item.disabled)).toEqual([true, true, true, true]);
});
