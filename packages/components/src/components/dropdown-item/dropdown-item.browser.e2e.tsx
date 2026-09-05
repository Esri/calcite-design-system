import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { defaults, focusable, hidden, renders, themed } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";

mockConsole();

describe("defaults", () => {
  defaults(() => mount("calcite-dropdown-item"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("is focusable", () => {
  focusable(() => mount(`calcite-dropdown-item`));
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-dropdown-item"));
});

describe("renders", () => {
  renders(() => mount("calcite-dropdown-item"), { display: "flex" });
});

describe("disabled", () => {
  it("prevents selection event when disabled", async () => {
    const { el, reRender } = await mount("calcite-dropdown-item");
    const selectSpy = vi.fn();
    el.addEventListener("calciteDropdownItemSelect", selectSpy);

    el.disabled = true;
    await reRender();
    await userEvent.click(el, { force: true });
    expect(selectSpy).toHaveBeenCalledTimes(0);
    expect(el).toHaveAttribute("aria-disabled", "true");
  });

  it("allows selection event again after enabling", async () => {
    const { el, reRender } = await mount("calcite-dropdown-item");
    const selectSpy = vi.fn();
    el.addEventListener("calciteDropdownItemSelect", selectSpy);

    el.disabled = true;
    await reRender();

    el.disabled = false;
    await reRender();

    await userEvent.click(el);

    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(el).not.toHaveAttribute("aria-disabled");
  });
});

describe("a11y attributes", () => {
  it("reflects selection state only for selectable items", async () => {
    await mount(
      <calcite-dropdown open>
        <calcite-dropdown-group selectionMode="none">
          <calcite-dropdown-item data-testid="non-selectable" selected>
            Non-selectable
          </calcite-dropdown-item>
        </calcite-dropdown-group>
        <calcite-dropdown-group selectionMode="multiple">
          <calcite-dropdown-item data-testid="unselected">Unselected</calcite-dropdown-item>
          <calcite-dropdown-item data-testid="selected" selected>
            Selected
          </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>,
    );
    const nonSelectableItem = page.getByTestId("#non-selectable");
    const unselectedItem = page.getByTestId("#unselected");
    const selectedItem = page.getByTestId("#selected");

    await expect.element(nonSelectableItem).not.toHaveAttribute("aria-checked");
    await expect.element(unselectedItem).toHaveAttribute("aria-checked", "false");
    await expect.element(selectedItem).toHaveAttribute("aria-checked", "true");
  });
});

describe("theme", () => {
  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-dropdown open>
            <calcite-dropdown-group>
              <calcite-dropdown-item href="esri.com" icon-end="trash" icon-start="trash">
                1
              </calcite-dropdown-item>
              <calcite-dropdown-item>2</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>,
        ),
      {
        "--calcite-dropdown-item-text-color": [
          {
            targetProp: "color",
            shadowSelector: `.${CSS.container}`,
            selector: `calcite-dropdown-item`,
          },
          {
            targetProp: "color",
            shadowSelector: `.${CSS.iconStart}`,
            selector: `calcite-dropdown-item`,
          },
          {
            targetProp: "color",
            shadowSelector: `.${CSS.iconEnd}`,
            selector: `calcite-dropdown-item`,
          },
        ],
      },
    );
  });
  describe("selected", () => {
    themed(
      () =>
        mount(
          <calcite-dropdown open>
            <calcite-dropdown-group selectionMode="multiple">
              <calcite-dropdown-item href="esri.com" icon-start="home" selected>
                1
              </calcite-dropdown-item>
              <calcite-dropdown-item href="esri.com" selected>
                2
              </calcite-dropdown-item>
              <calcite-dropdown-item class="selected" selected>
                3
              </calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>,
        ),
      {
        "--calcite-dropdown-item-icon-color-press": {
          targetProp: "color",
          shadowSelector: `calcite-icon`,
          selector: `calcite-dropdown-item`,
        },
        "--calcite-dropdown-item-text-color-press": {
          targetProp: "color",
          shadowSelector: `.${CSS.container}`,
          selector: `calcite-dropdown-item`,
        },
      },
    );
  });
});
