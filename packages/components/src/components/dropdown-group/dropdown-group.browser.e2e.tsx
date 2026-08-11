import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
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

    const groupTwoEl = page.getBySelector("#group-two").element() as HTMLElement;
    const itemEl = page.getBySelector("#move-me").element() as HTMLElement;
    const itemLocator = page.getBySelector("#move-me");

    await expect.element(itemLocator).toHaveAccessibleDescription("Group one");

    groupTwoEl.append(itemEl);

    await expect.element(itemLocator).toHaveAccessibleDescription("Group two");
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
    const itemLocator = page.getBySelector("#item-one");

    await expect.element(itemLocator).toHaveAccessibleDescription("Group one");

    groupEl.groupTitle = undefined;

    await expect.element(itemLocator).not.toHaveAccessibleDescription();
  });
});
