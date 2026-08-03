import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { defaults, hidden, reflects, renders, themed } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";

mockConsole();

describe("defaults", () => {
  defaults(
    () => mount("calcite-dropdown-group"),
    [
      {
        propertyName: "selectionMode",
        defaultValue: "single",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-dropdown-group"),
    [
      {
        propertyName: "selectionMode",
        value: "single",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-dropdown-group"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-dropdown-group>
          <calcite-dropdown-item>item</calcite-dropdown-item>
        </calcite-dropdown-group>,
      ),
    { display: "block" },
  );
});

describe("theme", () => {
  themed(
    () =>
      mount(
        <calcite-dropdown open>
          <calcite-dropdown-group group-title="one">
            <calcite-dropdown-item>A</calcite-dropdown-item>
          </calcite-dropdown-group>
          <calcite-dropdown-group class="two" group-title="two">
            <calcite-dropdown-item>A</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>,
      ),
    {
      "--calcite-dropdown-group-border-color": {
        targetProp: "backgroundColor",
        shadowSelector: `.${CSS.separator}`,
        selector: `calcite-dropdown-group.two`,
      },
      "--calcite-dropdown-group-title-text-color": {
        targetProp: "color",
        shadowSelector: `.${CSS.title}`,
        selector: `calcite-dropdown-group`,
      },
    },
  );
});

describe("accessibility wiring", () => {
  it("removes stale group descriptions when an item moves to another group", async () => {
    await mount(
      <calcite-dropdown open>
        <calcite-dropdown-group group-title="Group one" id="group-one">
          <calcite-dropdown-item id="move-me">A</calcite-dropdown-item>
        </calcite-dropdown-group>
        <calcite-dropdown-group group-title="Group two" id="group-two" />
      </calcite-dropdown>,
    );

    const groupOne = page.getBySelector("#group-one").element() as HTMLElement | null;
    const groupTwo = page.getBySelector("#group-two").element() as HTMLElement | null;
    const item = page.getBySelector("#move-me").element() as HTMLElement | null;

    expect(groupOne).toBeTruthy();
    expect(groupTwo).toBeTruthy();
    expect(item).toBeTruthy();

    const groupOneEl = groupOne!;
    const groupTwoEl = groupTwo!;
    const itemEl = item!;

    const initialGroupDescription = itemEl.ariaDescribedByElements?.find(
      (el) => el.tagName.toLowerCase() === "calcite-dropdown-group",
    );

    expect(initialGroupDescription?.id).toBe(groupOneEl.id);

    groupTwoEl.append(itemEl);

    await vi.waitUntil(async () => {
      const nextGroupDescription = itemEl.ariaDescribedByElements?.find(
        (descriptionEl) => descriptionEl.tagName.toLowerCase() === "calcite-dropdown-group",
      );

      return nextGroupDescription?.id === groupTwoEl.id;
    });

    const nextGroupDescription = itemEl.ariaDescribedByElements?.find(
      (el) => el.tagName.toLowerCase() === "calcite-dropdown-group",
    );

    expect(nextGroupDescription?.id).toBe(groupTwoEl.id);
  });

  it("removes group description when group-title is cleared", async () => {
    await mount(
      <calcite-dropdown open>
        <calcite-dropdown-group group-title="Group one" id="group-one">
          <calcite-dropdown-item id="item-one">A</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>,
    );

    const group = page.getBySelector("#group-one").element() as
      | (HTMLElement & { groupTitle?: string })
      | null;
    const item = page.getBySelector("#item-one").element() as HTMLElement | null;

    expect(group).toBeTruthy();
    expect(item).toBeTruthy();

    const groupEl = group!;
    const itemEl = item!;

    const initialGroupDescription = itemEl.ariaDescribedByElements?.find(
      (el) => el.tagName.toLowerCase() === "calcite-dropdown-group",
    );

    expect(initialGroupDescription?.id).toBe(groupEl.id);

    groupEl.groupTitle = undefined;

    await vi.waitUntil(async () => {
      const nextGroupDescription = itemEl.ariaDescribedByElements?.find(
        (descriptionEl) => descriptionEl.tagName.toLowerCase() === "calcite-dropdown-group",
      );

      return !nextGroupDescription;
    });

    const nextGroupDescription = itemEl.ariaDescribedByElements?.find(
      (el) => el.tagName.toLowerCase() === "calcite-dropdown-group",
    );

    expect(nextGroupDescription).toBeUndefined();
  });
});
