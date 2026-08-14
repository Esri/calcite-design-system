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

    const groupOneEl = page.getBySelector("#group-one").element() as HTMLElement;
    const groupTwoEl = page.getBySelector("#group-two").element() as HTMLElement;
    const itemEl = page.getBySelector("#move-me").element() as HTMLElement;
    const getGroupDescription = (): Element | undefined =>
      itemEl.ariaDescribedByElements!.find(
        (descriptionEl) => descriptionEl.tagName.toLowerCase() === "calcite-dropdown-group",
      );

    expect(getGroupDescription()!.id).toBe(groupOneEl.id);

    groupTwoEl.append(itemEl);

    await vi.waitUntil(() => getGroupDescription()?.id === groupTwoEl.id);

    expect(getGroupDescription()!.id).toBe(groupTwoEl.id);
  });

  it("removes group description when group-title is cleared", async () => {
    await mount(
      <calcite-dropdown open>
        <calcite-dropdown-group group-title="Group one" id="group-one">
          <calcite-dropdown-item id="item-one">A</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>,
    );

    const groupEl = page.getBySelector("#group-one").element() as HTMLElement & {
      groupTitle?: string;
    };
    const itemEl = page.getBySelector("#item-one").element() as HTMLElement;
    const getGroupDescription = (): Element | undefined =>
      itemEl.ariaDescribedByElements!.find(
        (descriptionEl) => descriptionEl.tagName.toLowerCase() === "calcite-dropdown-group",
      );

    expect(getGroupDescription()!.id).toBe(groupEl.id);

    groupEl.groupTitle = undefined;

    await vi.waitUntil(() => !getGroupDescription());

    expect(getGroupDescription()).toBeUndefined();
  });
});
