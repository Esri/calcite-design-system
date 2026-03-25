import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import T9nStrings from "./assets/t9n/messages.en.json";
import { SortHandle } from "./sort-handle";

function getDropdownFromItemText(text: string) {
  const dropdown = page.getByText(text).element()?.closest("calcite-dropdown");

  if (!dropdown) {
    throw new Error(`Expected calcite-dropdown for item text: ${text}`);
  }

  return page.elementLocator(dropdown);
}

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
      {
        propertyName: "placement",
        defaultValue: "bottom-start",
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
      {
        propertyName: "placement",
        value: "leading-start",
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
  const { reRender } = await mount(
    <calcite-sort-handle label="test" set-position="1" set-size="4" />,
  );
  await reRender();

  const firstReorderItem = page.getByText(T9nStrings.moveToTop);
  const secondReorderItem = page.getByText(T9nStrings.moveUp);
  const thirdReorderItem = page.getByText(T9nStrings.moveDown);
  const fourthReorderItem = page.getByText(T9nStrings.moveToBottom);

  await expect.element(firstReorderItem).toHaveProperty("disabled", true);
  await expect.element(secondReorderItem).toHaveProperty("disabled", true);
  await expect.element(thirdReorderItem).toHaveProperty("disabled", false);
  await expect.element(fourthReorderItem).toHaveProperty("disabled", false);
});

it("omits the reorder group title when it is the only visible group", async () => {
  const { reRender } = await mount(
    <calcite-sort-handle label="test" set-position="2" set-size="4" />,
  );
  await reRender();

  await expect.element(page.getByText(T9nStrings.reorder)).not.toBeInTheDocument();
});

it("shows the reorder group title when move-to items are present", async () => {
  const { el, reRender } = await mount(
    <calcite-sort-handle label="test" set-position="2" set-size="4" />,
  );

  const sortHandle = el as SortHandle;

  sortHandle.moveToItems = [
    { element: document.createElement("div"), label: "List 2", id: "list2" },
  ];
  await reRender();

  await expect.element(page.getByText(T9nStrings.reorder)).toBeInTheDocument();
});

it("disables single-item sets and renders disabled reorder actions", async () => {
  const { reRender } = await mount(
    <calcite-sort-handle label="test" set-position="1" set-size="1" />,
  );
  await reRender();

  const dropdown = getDropdownFromItemText(T9nStrings.moveToTop);
  const firstReorderItem = page.getByText(T9nStrings.moveToTop);
  const secondReorderItem = page.getByText(T9nStrings.moveUp);
  const thirdReorderItem = page.getByText(T9nStrings.moveDown);
  const fourthReorderItem = page.getByText(T9nStrings.moveToBottom);

  await expect.element(dropdown).toHaveProperty("disabled", true);
  await expect.element(firstReorderItem).toHaveProperty("disabled", true);
  await expect.element(secondReorderItem).toHaveProperty("disabled", true);
  await expect.element(thirdReorderItem).toHaveProperty("disabled", true);
  await expect.element(fourthReorderItem).toHaveProperty("disabled", true);
});

it("keeps single-item sets enabled when move-to items are available", async () => {
  const { el, reRender } = await mount(
    <calcite-sort-handle label="test" set-position="1" set-size="1" />,
  );

  const sortHandle = el as SortHandle;

  sortHandle.moveToItems = [
    { element: document.createElement("div"), label: "List 2", id: "list2" },
    { element: document.createElement("div"), label: "List 3", id: "list3" },
  ];
  await reRender();

  const dropdown = getDropdownFromItemText(T9nStrings.moveToTop);

  await expect.element(dropdown).toHaveProperty("disabled", false);
});
