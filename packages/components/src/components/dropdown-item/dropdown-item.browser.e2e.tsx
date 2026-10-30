import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { defaults, focusable, hidden, renders, themed } from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";
import type { Dropdown } from "../dropdown/dropdown";
import type { DropdownItem } from "./dropdown-item";

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

describe("link activation", () => {
  it("delivers one host activation to item and ancestor capture listeners and navigates", async () => {
    const { el } = await mount<DropdownItem>(
      <div data-testid="ancestor">
        <calcite-dropdown-item href="about:blank#destination" target="destination">
          Destination
        </calcite-dropdown-item>
        <iframe name="destination" sandbox="allow-same-origin" title="Destination" />
      </div>,
    );
    const destination = page.getBySelector("iframe").element() as HTMLIFrameElement;
    const itemClickSpy = vi.fn();
    const ancestorClickSpy = vi.fn();
    el.addEventListener("click", itemClickSpy, { capture: true });
    page.getByTestId("ancestor").element().addEventListener("click", ancestorClickSpy, {
      capture: true,
    });

    el.click();

    expect(itemClickSpy).toHaveBeenCalledTimes(1);
    expect(ancestorClickSpy).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => expect(destination.contentWindow!.location.hash).toBe("#destination"));
  });

  it("preserves cancellation when a capture listener reenters host activation", async () => {
    const { component } = await mount<Dropdown>(
      <div>
        <calcite-dropdown>
          <calcite-button slot="trigger">Open dropdown</calcite-button>
          <calcite-dropdown-group>
            <calcite-dropdown-item selected>Original selection</calcite-dropdown-item>
            <calcite-dropdown-item href="about:blank#destination" target="destination">
              Destination
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
        <iframe name="destination" sandbox="allow-same-origin" title="Destination" />
      </div>,
    );
    const item = page.getByRole("menuitem", { name: "Destination", exact: true });
    const originalSelection = page.getByRole("menuitemradio", { name: "Original selection" });
    const destination = page.getBySelector("iframe").element() as HTMLIFrameElement;
    const anchorClickSpy = vi.fn();
    const itemSelectSpy = vi.fn();
    const dropdownSelectSpy = vi.fn();

    await userEvent.click(page.getByRole("button", { name: "Open dropdown" }));
    await expect.element(originalSelection).toHaveFocus();
    const itemElement = item.element() as DropdownItem["el"];
    item.getBySelector("a").element().addEventListener("click", anchorClickSpy);
    itemElement.addEventListener("calciteDropdownItemSelect", itemSelectSpy);
    component.el.addEventListener("calciteDropdownSelect", dropdownSelectSpy);
    itemElement.addEventListener(
      "click",
      (event) => {
        itemElement.click();
        event.preventDefault();
      },
      { capture: true, once: true },
    );

    itemElement.click();

    expect(anchorClickSpy).toHaveBeenCalledTimes(1);
    expect(anchorClickSpy.mock.calls[0][0].defaultPrevented).toBe(true);
    expect(destination.contentWindow!.location.hash).toBe("");
    expect(itemSelectSpy).not.toHaveBeenCalled();
    expect(dropdownSelectSpy).not.toHaveBeenCalled();
    expect(component.selectedItems).toEqual([originalSelection.element()]);
    expect(component.open).toBe(true);

    itemElement.click();

    expect(anchorClickSpy).toHaveBeenCalledTimes(2);
    expect(anchorClickSpy.mock.calls[1][0].defaultPrevented).toBe(false);
    expect(itemSelectSpy).toHaveBeenCalledTimes(1);
    expect(dropdownSelectSpy).toHaveBeenCalledTimes(1);
    expect(component.selectedItems).toEqual([itemElement]);
    expect(component.open).toBe(false);
    await vi.waitFor(() => expect(destination.contentWindow!.location.hash).toBe("#destination"));
  });

  it("prevents host link activation while disabled and restores it when enabled", async () => {
    const { el, reRender } = await mount<DropdownItem>(
      <calcite-dropdown-item href="#destination">Destination</calcite-dropdown-item>,
    );
    const clickSpy = vi.fn((event: Event) => event.preventDefault());
    el.addEventListener("click", clickSpy);

    el.click();
    expect(clickSpy).toHaveBeenCalledTimes(1);

    el.disabled = true;
    await reRender();
    el.click();
    expect(clickSpy).toHaveBeenCalledTimes(1);

    el.disabled = false;
    await reRender();
    el.click();
    expect(clickSpy).toHaveBeenCalledTimes(2);
  });

  it("restores native host clicks when href is removed", async () => {
    const { el, reRender } = await mount<DropdownItem>(
      <calcite-dropdown-item href="#destination">Destination</calcite-dropdown-item>,
    );
    const clickSpy = vi.fn((event: Event) => event.preventDefault());
    const selectSpy = vi.fn();
    el.addEventListener("click", clickSpy);
    el.addEventListener("calciteDropdownItemSelect", selectSpy);

    el.href = undefined;
    await reRender();
    el.click();

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy).toHaveBeenCalledTimes(1);
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
    const nonSelectableItem = page.getByTestId("non-selectable");
    const unselectedItem = page.getByTestId("unselected");
    const selectedItem = page.getByTestId("selected");

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
