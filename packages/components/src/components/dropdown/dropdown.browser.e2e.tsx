import { Fragment, h, JsxNode } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { isDropdownGroup } from "../dropdown-group/resources";
import {
  accessible,
  defaults,
  disabled,
  floatingUIOwner,
  focusable,
  hidden,
  openClose,
  reflects,
  renders,
  scalePropagates,
  themed,
  topLayer,
} from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";
import type { Dropdown } from "./dropdown";
import type { DropdownItem } from "../dropdown-item/dropdown-item";
import { afterNextFrame } from "../../tests/utils/timing";

mockConsole(["warn", "error"]);

describe("defaults", () => {
  defaults(() => mount("calcite-dropdown"), {
    offsetDistance: 0,
    offsetSkidding: 0,
    scale: "m",
    placement: "bottom-start",
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-dropdown"),
    [
      {
        propertyName: "offsetDistance",
        value: 10,
      },
      {
        propertyName: "offsetSkidding",
        value: 10,
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "widthScale",
        value: "m",
      },
      {
        propertyName: "width",
        value: "m",
      },
      {
        propertyName: "placement",
        value: "bottom-start",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-dropdown"));
});

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-dropdown>
          <calcite-dropdown-group>
            <calcite-dropdown-item />
          </calcite-dropdown-group>
        </calcite-dropdown>,
        mountOptions,
      ),
    { targetSelector: "calcite-dropdown-group, calcite-dropdown-item" },
  );
});

function renderDropdown(): JsxNode {
  return (
    <calcite-dropdown>
      <calcite-button slot="trigger">Open dropdown</calcite-button>
      <calcite-dropdown-group id="group-1">
        <calcite-dropdown-item id="item-1">Dropdown Item Content</calcite-dropdown-item>
        <calcite-dropdown-item id="item-2" selected>
          Dropdown Item Content
        </calcite-dropdown-item>
        <calcite-dropdown-item id="item-3">Dropdown Item Content</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  );
}

function renderReferenceElementDropdown(): JsxNode {
  return (
    <>
      <calcite-dropdown reference-element="trigger">
        <calcite-dropdown-group id="group-1">
          <calcite-dropdown-item id="item-1">Dropdown Item Content</calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected>
            Dropdown Item Content
          </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3">Dropdown Item Content</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
      <calcite-button id="trigger">Open dropdown</calcite-button>
    </>
  );
}

function renderDropdownWithGroupTitle(): JsxNode {
  return (
    <calcite-dropdown>
      <calcite-button slot="trigger">Open dropdown</calcite-button>
      <calcite-dropdown-group group-title="Group one" id="group-1">
        <calcite-dropdown-item id="grouped-item-1">Dropdown Item Content</calcite-dropdown-item>
        <calcite-dropdown-item id="grouped-item-2">Dropdown Item Content</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  );
}

function renderReferenceElementDropdownWithGroupTitle(): JsxNode {
  return (
    <>
      <calcite-dropdown reference-element="trigger">
        <calcite-dropdown-group group-title="Group one" id="group-1">
          <calcite-dropdown-item id="grouped-item-1">Dropdown Item Content</calcite-dropdown-item>
          <calcite-dropdown-item id="grouped-item-2">Dropdown Item Content</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
      <calcite-button id="trigger">Open dropdown</calcite-button>
    </>
  );
}

function renderDropdownSelectionModeContent(): JsxNode {
  return (
    <calcite-dropdown>
      <calcite-button id="trigger" slot="trigger">
        Open dropdown
      </calcite-button>
      <calcite-dropdown-group id="group-1" selection-mode="multiple">
        <calcite-dropdown-item id="item-1">Dropdown Item Content</calcite-dropdown-item>
        <calcite-dropdown-item id="item-2" selected>
          Dropdown Item Content
        </calcite-dropdown-item>
        <calcite-dropdown-item id="item-3" selected>
          Dropdown Item Content
        </calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group id="group-2" selection-mode="single">
        <calcite-dropdown-item id="item-4">Dropdown Item Content</calcite-dropdown-item>
        <calcite-dropdown-item id="item-5" selected>
          Dropdown Item Content
        </calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group id="group-3" selection-mode="none">
        <calcite-dropdown-item id="item-6">Dropdown Item Content</calcite-dropdown-item>
        <calcite-dropdown-item href="google.com" id="item-7">
          Dropdown Item Content
        </calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  );
}

describe("renders", () => {
  renders(() => mount(renderDropdown), { display: "inline-block" });
});

describe("accessible", () => {
  accessible(async () => {
    const result = await mount<Dropdown>(renderDropdownSelectionModeContent);
    result.component.open = true;
    await vi.waitUntil(() =>
      page.getBySelector("calcite-dropdown [popover]").element().matches(":popover-open"),
    );
    return result;
  });
});

describe("accessible reference element", () => {
  accessible(() => mount(renderReferenceElementDropdown));
});

describe("focusable", () => {
  focusable(() => mount(renderDropdown), {
    focusTargetSelector: '[slot="trigger"]',
  });
});

describe("owns a floating-ui", () => {
  floatingUIOwner(
    () =>
      mount<Dropdown>(
        <calcite-dropdown>
          <calcite-button slot="trigger">Open</calcite-button>
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item id="item-1" selected>
              1
            </calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>,
      ),
    "open",
    {
      shadowSelector: `.${CSS.wrapper}`,
    },
  );
});

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-dropdown>
          <calcite-button slot="trigger">Open</calcite-button>
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item id="item-1" selected>
              1
            </calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>,
      ),
    {
      focusTarget: {
        tab: "calcite-button",
        click: {
          pointer: "calcite-dropdown-item",
          method: "body",
        },
      },
    },
  );
});

describe("openClose", () => {
  openClose((mountOptions) => mount(renderDropdown, mountOptions));

  describe("with reference element", () => {
    openClose((mountOptions) => mount(renderReferenceElementDropdown, mountOptions));
  });
});

describe("top layer placement", () => {
  topLayer(() => mount("calcite-dropdown"));
});

describe("hover type", () => {
  function renderHoverDropdownHTML(): JsxNode {
    return (
      <calcite-dropdown type="hover">
        <calcite-action id="trigger" slot="trigger">
          Open dropdown
        </calcite-action>
        <calcite-dropdown-group selection-mode="single">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content</calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected>
            Dropdown Item Content
          </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    );
  }

  it("opens on focusin", async () => {
    const { el } = await mount<Dropdown>(renderHoverDropdownHTML);

    expect(el.open).toBe(false);

    page.getByRole("button").element().focus();
    await expect.element(page.getBySelector("#item-1")).toHaveFocus();

    expect(el.open).toBe(true);
  });

  it("does not toggle closed on click when type is hover", async () => {
    const { el } = await mount<Dropdown>(renderHoverDropdownHTML);
    const trigger = page.getByText("Open dropdown");

    expect(el.open).toBe(false);

    await userEvent.click(trigger);

    expect(el.open).toBe(true);

    await userEvent.click(trigger);

    expect(el.open).toBe(true);
  });

  it("closes when focus leaves trigger with Tab", async () => {
    const { el } = await mount<Dropdown>(
      <div>
        {renderHoverDropdownHTML()}
        <button id="next-focus-target" type="button">
          Next
        </button>
      </div>,
    );

    const trigger = page.getByText("Open dropdown");
    const nextFocusTarget = page.getByRole("button", { name: "Next" });

    await userEvent.click(trigger);
    expect(el.open).toBe(true);

    await userEvent.tab();

    await expect.element(nextFocusTarget).toHaveFocus();
    expect(el.open).toBe(false);
  });
});

describe("roving tabindex", () => {
  describe.each(["slotted", "reference"])("non-tabbable %s trigger", (mode) => {
    it.each(["Escape", "selection", "programmatic"])(
      "restores focus after %s closure",
      async (closingAction) => {
        const { component } = await mount<Dropdown>(
          <>
            {mode === "reference" ? (
              <button id="non-tabbable-trigger" tabIndex={-1} type="button">
                Open dropdown
              </button>
            ) : null}
            <calcite-dropdown
              referenceElement={mode === "reference" ? "non-tabbable-trigger" : undefined}
            >
              {mode === "slotted" ? (
                <button slot="trigger" tabIndex={-1} type="button">
                  Open dropdown
                </button>
              ) : null}
              <calcite-dropdown-group>
                <calcite-dropdown-item>First</calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
          </>,
        );
        const trigger = page.getByRole("button", { name: "Open dropdown" });
        const item = page.getByRole("menuitemradio", { name: "First", includeHidden: true });

        trigger.element().focus();
        await userEvent.keyboard("{ArrowDown}");
        await expect.element(item).toHaveFocus();

        if (closingAction === "programmatic") {
          component.open = false;
        } else {
          await userEvent.keyboard(closingAction === "Escape" ? "{Escape}" : "{Enter}");
        }

        await expect.element(trigger).toHaveFocus();
        expect(component.open).toBe(false);
        await expect.element(trigger).toHaveAttribute("tabindex", "-1");
        await expect.element(item).toHaveAttribute("tabindex", "-1");
      },
    );
  });

  it("completes the close lifecycle when a fully opened dropdown is disabled", async () => {
    const { el } = await mount<Dropdown>(renderDropdown);
    const openSpy = vi.fn();
    const beforeCloseSpy = vi.fn();
    const closeSpy = vi.fn();
    el.addEventListener("calciteDropdownOpen", openSpy);
    el.addEventListener("calciteDropdownBeforeClose", beforeCloseSpy);
    el.addEventListener("calciteDropdownClose", closeSpy);
    const wrapper = page.getBySelector("calcite-dropdown [popover]");

    await userEvent.click(page.getByRole("button", { name: "Open dropdown" }));
    await vi.waitFor(() => expect(openSpy).toHaveBeenCalledTimes(1));
    expect(wrapper.element().matches(":popover-open")).toBe(true);

    el.disabled = true;

    await vi.waitFor(() => expect(closeSpy).toHaveBeenCalledTimes(1));
    expect(beforeCloseSpy).toHaveBeenCalledTimes(1);
    expect(el.open).toBe(false);
    await vi.waitFor(() => expect(wrapper.element().matches(":popover-open")).toBe(false));
  });

  it.each(["hidden", "inert"])(
    "skips %s groups and recovers when the active group becomes unavailable",
    async (attribute) => {
      await mount<Dropdown>(
        <calcite-dropdown>
          <button slot="trigger" type="button">
            Open dropdown
          </button>
          <calcite-dropdown-group data-testid="unavailable-group">
            <calcite-dropdown-item>Unavailable item</calcite-dropdown-item>
          </calcite-dropdown-group>
          <calcite-dropdown-group data-testid="available-group">
            <calcite-dropdown-item>Available item</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>,
      );
      const unavailableGroup = page.getByTestId("unavailable-group");
      const availableGroup = page.getByTestId("available-group");
      const unavailableItem = page.getByText("Unavailable item", { exact: true });
      const availableItem = page.getByRole("menuitemradio", {
        name: "Available item",
        exact: true,
      });
      const trigger = page.getByRole("button", { name: "Open dropdown" });
      unavailableGroup.element().setAttribute(attribute, "");

      await userEvent.click(trigger);
      await expect.element(availableItem).toHaveFocus();
      await expect.element(availableItem).toHaveAttribute("tabindex", "0");
      await expect.element(unavailableItem).toHaveAttribute("tabindex", "-1");

      unavailableGroup.element().removeAttribute(attribute);
      await userEvent.keyboard("{Home}");
      await expect.element(unavailableItem).toHaveFocus();
      unavailableGroup.element().setAttribute(attribute, "");
      await expect.element(availableItem).toHaveFocus();
      await expect.element(unavailableItem).toHaveAttribute("tabindex", "-1");

      availableGroup.element().setAttribute(attribute, "");
      await expect.element(trigger).toHaveFocus();
      expect(trigger.element().tabIndex).toBe(0);
    },
  );

  it("keeps a hover dropdown closed after Escape restores trigger focus", async () => {
    const { el } = await mount<Dropdown>(
      <calcite-dropdown type="hover">
        <button slot="trigger" type="button">
          Open dropdown
        </button>
        <calcite-dropdown-group>
          <calcite-dropdown-item>First</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>,
    );
    const trigger = page.getByRole("button", { name: "Open dropdown" });
    await userEvent.click(trigger);
    await expect.element(page.getByRole("menuitemradio")).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    await expect.element(trigger).toHaveFocus();
    expect(el.open).toBe(false);
  });

  it("restores trigger focus when a focused dropdown is closed programmatically", async () => {
    const { component } = await mount<Dropdown>(renderDropdown);
    await userEvent.click(page.getByRole("button", { name: "Open dropdown" }));
    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
    component.open = false;
    await expect.element(page.getBySelector('calcite-button[slot="trigger"]')).toHaveFocus();
    expect(page.getBySelector('calcite-dropdown-item[tabindex="0"]').all()).toHaveLength(0);
  });

  it("exposes and activates a focused link as a menu item", async () => {
    const { component } = await mount<Dropdown>(
      <calcite-dropdown>
        <button slot="trigger" type="button">
          Open dropdown
        </button>
        <calcite-dropdown-group selectionMode="none">
          <calcite-dropdown-item href="#destination" label="Destination">
            Go
          </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>,
    );
    const item = page.getByRole("menuitem", { name: "Destination" });
    const anchor = item.getBySelector("a");
    const clickSpy = vi.fn((event: MouseEvent) => event.preventDefault());

    await userEvent.click(page.getByRole("button", { name: "Open dropdown" }));
    await expect.element(item).toHaveFocus();
    (anchor.element() as HTMLAnchorElement).addEventListener("click", clickSpy);
    await expect.element(anchor).toHaveAttribute("tabindex", "-1");
    await userEvent.keyboard("{Enter}");
    expect(clickSpy).toHaveBeenCalledTimes(1);
    await expect.element(page.getByRole("button", { name: "Open dropdown" })).toHaveFocus();
    expect(component.open).toBe(false);
  });

  it.each(["slotted", "reference"])(
    "supports Tab and Shift+Tab with a %s trigger",
    async (mode) => {
      const { el } = await mount<Dropdown>(
        <>
          <button id="before" type="button">
            Before
          </button>
          {mode === "reference" ? (
            <button id="trigger" type="button">
              Open dropdown
            </button>
          ) : null}
          <calcite-dropdown referenceElement={mode === "reference" ? "trigger" : undefined}>
            {mode === "slotted" ? (
              <button id="trigger" slot="trigger" type="button">
                Open dropdown
              </button>
            ) : null}
            <calcite-dropdown-group>
              <calcite-dropdown-item id="item-1">First</calcite-dropdown-item>
              <calcite-dropdown-item id="item-2">Second</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
          <button id="after" type="button">
            After
          </button>
        </>,
      );
      const trigger = page.getByRole("button", { name: "Open dropdown" });

      await userEvent.click(trigger);
      await expect.element(page.getBySelector("#item-1")).toHaveFocus();
      await userEvent.tab();
      await expect.element(page.getByRole("button", { name: "After" })).toHaveFocus();
      expect(el.open).toBe(false);

      await userEvent.click(trigger);
      await expect.element(page.getBySelector("#item-1")).toHaveFocus();
      await userEvent.tab({ shift: true });
      await expect.element(page.getByRole("button", { name: "Before" })).toHaveFocus();
      expect(el.open).toBe(false);
    },
  );

  it("keeps focus and the tab stop on the selected item when remaining open", async () => {
    const { el } = await mount<Dropdown>(renderDropdownSelectionModeContent);
    el.closeOnSelectDisabled = true;
    const item = page.getBySelector("#item-3");

    await userEvent.click(page.getByRole("button", { name: "Open dropdown" }));
    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
    await userEvent.click(item);
    await expect.element(item).toHaveFocus();
    await expect.element(item).toHaveAttribute("tabindex", "0");

    await userEvent.keyboard("{Space}");
    await expect.element(item).toHaveFocus();
    expect(el.open).toBe(true);
    expect(page.getBySelector('calcite-dropdown-item[tabindex="0"]').all()).toHaveLength(1);
  });

  it("focuses the first and last items with Home and End", async () => {
    await mount<Dropdown>(renderDropdown);
    await userEvent.click(page.getByRole("button", { name: "Open dropdown" }));
    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
    await userEvent.keyboard("{End}");
    await expect.element(page.getBySelector("#item-3")).toHaveFocus();
    await userEvent.keyboard("{Home}");
    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
  });

  it("moves focus to a remaining item when the active item is removed or disabled", async () => {
    await mount<Dropdown>(renderDropdown);
    await userEvent.click(page.getByRole("button", { name: "Open dropdown" }));
    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
    page.getBySelector("#item-1").element().remove();
    await expect.element(page.getBySelector("#item-2")).toHaveFocus();
    (page.getBySelector("#item-2").element() as DropdownItem["el"]).disabled = true;
    await expect.element(page.getBySelector("#item-3")).toHaveFocus();
  });

  it("moves the single tab stop from the trigger to the active item and back", async () => {
    await mount<Dropdown>(renderDropdown);
    const trigger = page.getByRole("button", { name: "Open dropdown" });
    const firstItem = page.getBySelector("#item-1");
    const secondItem = page.getBySelector("#item-2");

    await userEvent.click(trigger);
    await expect.element(firstItem).toHaveFocus();
    expect(trigger.element().tabIndex).toBe(-1);
    expect(page.getBySelector('calcite-dropdown-item[tabindex="0"]').all()).toHaveLength(1);

    await userEvent.keyboard("{ArrowDown}");
    await expect.element(secondItem).toHaveFocus();
    await expect.element(firstItem).toHaveAttribute("tabindex", "-1");
    await expect.element(secondItem).toHaveAttribute("tabindex", "0");

    await userEvent.keyboard("{Escape}");
    await expect.element(page.getBySelector('calcite-button[slot="trigger"]')).toHaveFocus();
    expect(trigger.element().tabIndex).toBe(0);
    expect(page.getBySelector('calcite-dropdown-item[tabindex="0"]').all()).toHaveLength(0);
  });
});

describe("menu item focus", () => {
  it("focuses the first item when opened", async () => {
    await mount<Dropdown>(renderDropdown);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);

    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
  });

  it("moves focus on keyboard navigation", async () => {
    await mount<Dropdown>(renderDropdown);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);

    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");

    await expect.element(page.getBySelector("#item-2")).toHaveFocus();
  });

  it("wraps focus on ArrowUp navigation", async () => {
    await mount<Dropdown>(renderDropdown);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);

    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    await expect.element(page.getBySelector("#item-3")).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    await expect.element(page.getBySelector("#item-2")).toHaveFocus();
  });

  it("focuses items with a referenceElement trigger", async () => {
    await mount<Dropdown>(renderReferenceElementDropdown);
    const trigger = page.getBySelector("#trigger");

    await userEvent.click(trigger);

    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect.element(page.getBySelector("#item-2")).toHaveFocus();
  });

  it("focuses an item when multiple trigger slot nodes exist", async () => {
    await mount<Dropdown>(
      <calcite-dropdown>
        <span id="trigger-label" slot="trigger">
          Label
        </span>
        <calcite-button id="trigger-button" slot="trigger">
          Open dropdown
        </calcite-button>
        <calcite-dropdown-group>
          <calcite-dropdown-item id="item-1">Dropdown Item Content</calcite-dropdown-item>
          <calcite-dropdown-item id="item-2">Dropdown Item Content</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>,
    );

    const triggerButton = page.getBySelector("#trigger-button");
    const triggerLabel = page.getBySelector("#trigger-label");

    await userEvent.click(triggerButton);

    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
    expect((triggerButton.element() as HTMLElement | null)?.ariaActiveDescendantElement).toBeNull();
    expect((triggerLabel.element() as HTMLElement | null)?.ariaActiveDescendantElement).toBeNull();
  });

  it("associates grouped items with their title in slotted-trigger mode", async () => {
    await mount<Dropdown>(renderDropdownWithGroupTitle);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);

    const activeItem = page.getBySelector("#grouped-item-1").element() as HTMLElement | null;
    const groupDescription = activeItem?.ariaDescribedByElements?.find(isDropdownGroup);

    expect(groupDescription?.getAttribute("aria-label")).toBe("Group one");
  });

  it("associates grouped items with their title in reference-element mode", async () => {
    await mount<Dropdown>(renderReferenceElementDropdownWithGroupTitle);
    const trigger = page.getBySelector("#trigger");

    await userEvent.click(trigger);

    const activeItem = page.getBySelector("#grouped-item-1").element() as HTMLElement | null;
    const groupDescription = activeItem?.ariaDescribedByElements?.find(isDropdownGroup);

    expect(groupDescription?.getAttribute("aria-label")).toBe("Group one");
  });

  it("moves focus from the referenceElement trigger when opened", async () => {
    await mount<Dropdown>(renderReferenceElementDropdown);
    const trigger = page.getBySelector("#trigger");

    await userEvent.click(trigger);

    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
  });

  it("restores the referenceElement tab stop when dropdown disconnects", async () => {
    const { el } = await mount<Dropdown>(renderReferenceElementDropdown);
    const trigger = page.getBySelector("#trigger");
    const triggerButton = trigger.getByRole("button", { name: "Open dropdown" });

    await userEvent.click(trigger);

    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
    await expect.element(triggerButton).toHaveProperty("tabIndex", -1);

    el.remove();

    await expect.element(triggerButton).toHaveProperty("tabIndex", 0);
  });

  it("updates trigger tab stops when the referenceElement changes while open", async () => {
    const { component } = await mount<Dropdown>(
      <>
        <calcite-dropdown reference-element="trigger-one">
          <calcite-dropdown-group>
            <calcite-dropdown-item id="item-1">Dropdown Item Content</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">Dropdown Item Content</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
        <calcite-button id="trigger-one">Open dropdown one</calcite-button>
        <calcite-button id="trigger-two">Open dropdown two</calcite-button>
      </>,
    );

    const triggerOne = page.getBySelector("#trigger-one");
    const triggerTwo = page.getBySelector("#trigger-two");
    const triggerOneButton = triggerOne.getByRole("button", { name: "Open dropdown one" });
    const triggerTwoButton = triggerTwo.getByRole("button", { name: "Open dropdown two" });

    await userEvent.click(triggerOne);

    await expect.element(page.getBySelector("#item-1")).toHaveFocus();
    await expect.element(triggerOneButton).toHaveProperty("tabIndex", -1);

    component.referenceElement = "trigger-two";

    await expect.element(triggerOneButton).toHaveProperty("tabIndex", 0);
    await expect.element(triggerTwoButton).toHaveProperty("tabIndex", -1);
  });
});

describe("referenceElement keydown", () => {
  function renderReferenceElementDropdownHTML(): JsxNode {
    return (
      <>
        <button id="external-trigger" type="button">
          Open dropdown
        </button>
        <calcite-dropdown reference-element="external-trigger">
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item id="item-1">Dropdown Item Content</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </>
    );
  }

  it("opens when Enter is pressed on referenceElement", async () => {
    const { component } = await mount<Dropdown>(renderReferenceElementDropdownHTML);
    const trigger = page.getByRole("button", { name: "Open dropdown" });

    expect(component.open).toBe(false);

    trigger.element().focus();
    await userEvent.keyboard("{Enter}");
    await expect.element(page.getByRole("menuitemradio")).toHaveFocus();

    expect(component.open).toBe(true);
  });
});

describe("autoClose", () => {
  it("closes an open dropdown when another reference element dropdown opens", async () => {
    await mount<Dropdown>(
      <>
        <calcite-dropdown id="dropdown-1" reference-element="trigger-1">
          <calcite-dropdown-group>
            <calcite-dropdown-item>Item 1</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
        <calcite-button id="trigger-1">Open dropdown 1</calcite-button>
        <calcite-dropdown id="dropdown-2" reference-element="trigger-2">
          <calcite-dropdown-group>
            <calcite-dropdown-item>Item 2</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
        <calcite-button id="trigger-2">Open dropdown 2</calcite-button>
        <calcite-button id="outside">Outside</calcite-button>
      </>,
    );

    const dropdownOne = page.getBySelector("#dropdown-1").element() as Dropdown;
    const dropdownTwo = page.getBySelector("#dropdown-2").element() as Dropdown;
    const triggerOne = page.getByRole("button", { name: "Open dropdown 1" });
    const triggerTwo = page.getByRole("button", { name: "Open dropdown 2" });
    const outside = page.getByRole("button", { name: "Outside" });

    expect(dropdownOne.open).toBe(false);
    expect(dropdownTwo.open).toBe(false);

    await userEvent.click(triggerOne);

    expect(dropdownOne.open).toBe(true);
    expect(dropdownTwo.open).toBe(false);

    await userEvent.click(triggerTwo);

    expect(dropdownOne.open).toBe(false);
    expect(dropdownTwo.open).toBe(true);

    await userEvent.click(outside);

    expect(dropdownTwo.open).toBe(false);
  });
});

describe("virtual referenceElement", () => {
  function renderVirtualReferenceElementDropdownHTML(): JsxNode {
    return (
      <>
        <button id="context-menu-target" type="button">
          Open context menu
        </button>
        <calcite-dropdown>
          <calcite-dropdown-group group-title="Natural places">
            <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
            <calcite-dropdown-item>Tundra</calcite-dropdown-item>
            <calcite-dropdown-item>Desert</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </>
    );
  }

  it("opens and positions on first contextmenu interaction", async () => {
    const contextMenuX = 120;
    const contextMenuY = 160;
    const { el } = await mount<Dropdown>(renderVirtualReferenceElementDropdownHTML);
    let expectedReferenceX: number | undefined;
    let expectedReferenceY: number | undefined;

    const createVirtualElement = ({
      clientX,
      clientY,
    }: MouseEvent): Dropdown["referenceElement"] => ({
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        x: clientX,
        y: clientY,
        top: clientY,
        left: clientX,
        right: clientX,
        bottom: clientY,
      }),
    });

    const onContextMenu = (event: MouseEvent): void => {
      event.preventDefault();
      expectedReferenceX = event.clientX;
      expectedReferenceY = event.clientY;
      el.referenceElement = createVirtualElement(event);
      el.open = true;
    };

    document.addEventListener("contextmenu", onContextMenu);

    try {
      const contextMenuTarget = page.getByRole("button", { name: "Open context menu" });

      await contextMenuTarget.click({
        button: "right",
        force: true,
        position: {
          x: contextMenuX,
          y: contextMenuY,
        },
      });

      const menu = page.getByRole("menu");

      await expect.poll(() => el.open).toBe(true);
      await expect.element(menu).toBeVisible();

      await expect
        .poll(() => {
          const wrapper = menu.element().parentElement as HTMLElement;
          const hasPlacementData = wrapper.hasAttribute("data-placement");
          const hasTranslateTransform = wrapper.style.transform.includes("translate(");

          return hasPlacementData || hasTranslateTransform;
        })
        .toBe(true);

      expect(el.referenceElement).toBeDefined();
      expect(typeof el.referenceElement).not.toBe("string");

      const referenceElement = el.referenceElement as Exclude<Dropdown["referenceElement"], string>;
      expect(referenceElement).toBeTruthy();

      const referenceRect = referenceElement!.getBoundingClientRect();

      expect(expectedReferenceX).toBeDefined();
      expect(expectedReferenceY).toBeDefined();
      expect(referenceRect.x).toBe(expectedReferenceX);
      expect(referenceRect.y).toBe(expectedReferenceY);
    } finally {
      document.removeEventListener("contextmenu", onContextMenu);
    }
  });
});

describe("keyboard navigation", () => {
  function renderReferenceElementKeyboardDropdownHTML(options?: {
    selectedItemId?: "item-1" | "item-2";
    includeDisabledAndHiddenItems?: boolean;
  }): JsxNode {
    const { selectedItemId, includeDisabledAndHiddenItems } = options || {};

    return (
      <div>
        <button id="external-trigger" type="button">
          Open dropdown
        </button>
        <calcite-dropdown reference-element="external-trigger">
          {includeDisabledAndHiddenItems ? (
            <calcite-dropdown-group selection-mode="single">
              <calcite-dropdown-item disabled id="item-1">
                1
              </calcite-dropdown-item>
              <calcite-dropdown-item disabled id="item-1.5">
                1.5
              </calcite-dropdown-item>
              <calcite-dropdown-item id="item-2" selected>
                2
              </calcite-dropdown-item>
              <calcite-dropdown-item hidden id="item-2.5">
                2.5
              </calcite-dropdown-item>
              <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
              <calcite-dropdown-item hidden id="item-4">
                4
              </calcite-dropdown-item>
            </calcite-dropdown-group>
          ) : (
            <calcite-dropdown-group selection-mode="single">
              <calcite-dropdown-item id="item-1" selected={selectedItemId === "item-1"}>
                1
              </calcite-dropdown-item>
              <calcite-dropdown-item id="item-2" selected={selectedItemId === "item-2"}>
                2
              </calcite-dropdown-item>
              <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
            </calcite-dropdown-group>
          )}
        </calcite-dropdown>
      </div>
    );
  }

  function getReferenceElementTrigger(): ReturnType<typeof page.getByRole> {
    return page.getByRole("button", { name: "Open dropdown" });
  }

  async function pressReferenceElementKey(
    component: Dropdown,
    key: string,
    expectedItemName: string,
  ): Promise<void> {
    if (!component.open) {
      getReferenceElementTrigger().element().focus();
    }
    await userEvent.keyboard(`{${key}}`);
    await expect
      .element(page.getByRole("menuitemradio", { name: expectedItemName, exact: true }))
      .toHaveFocus();
  }

  it("supports navigating through items with arrow keys", async () => {
    const { component } = await mount<Dropdown>(() =>
      renderReferenceElementKeyboardDropdownHTML({ selectedItemId: "item-1" }),
    );

    await pressReferenceElementKey(component, "Enter", "1");
    await pressReferenceElementKey(component, "ArrowDown", "2");
    await pressReferenceElementKey(component, "ArrowDown", "3");
    await pressReferenceElementKey(component, "ArrowDown", "1");
    await pressReferenceElementKey(component, "ArrowUp", "3");
    await pressReferenceElementKey(component, "ArrowUp", "2");
    await pressReferenceElementKey(component, "ArrowUp", "1");
    await pressReferenceElementKey(component, "ArrowUp", "3");
  });

  it("skips disabled and hidden items when navigating with arrow keys", async () => {
    const { component } = await mount<Dropdown>(() =>
      renderReferenceElementKeyboardDropdownHTML({
        includeDisabledAndHiddenItems: true,
      }),
    );

    await pressReferenceElementKey(component, "Enter", "2");
    await pressReferenceElementKey(component, "ArrowDown", "3");
    await pressReferenceElementKey(component, "ArrowDown", "2");
    await pressReferenceElementKey(component, "ArrowUp", "3");
    await pressReferenceElementKey(component, "ArrowUp", "2");
    await pressReferenceElementKey(component, "ArrowUp", "3");
  });

  it("should open the dropdown and focus the first item with ArrowDown", async () => {
    const { component } = await mount<Dropdown>(() => renderReferenceElementKeyboardDropdownHTML());
    await pressReferenceElementKey(component, "ArrowDown", "1");

    await expect.element(getReferenceElementTrigger()).toHaveAttribute("aria-expanded", "true");

    await pressReferenceElementKey(component, "ArrowDown", "2");
    await pressReferenceElementKey(component, "ArrowUp", "1");
  });

  it("should open the dropdown and focus the last item with ArrowUp when no item is selected", async () => {
    const { component } = await mount<Dropdown>(() => renderReferenceElementKeyboardDropdownHTML());
    await pressReferenceElementKey(component, "ArrowUp", "3");

    await expect.element(getReferenceElementTrigger()).toHaveAttribute("aria-expanded", "true");

    await pressReferenceElementKey(component, "ArrowDown", "1");
    await pressReferenceElementKey(component, "ArrowUp", "3");
  });

  it("should open the dropdown and focus the last item with ArrowUp", async () => {
    const { component } = await mount<Dropdown>(() =>
      renderReferenceElementKeyboardDropdownHTML({ selectedItemId: "item-2" }),
    );
    await pressReferenceElementKey(component, "ArrowUp", "3");

    await expect.element(getReferenceElementTrigger()).toHaveAttribute("aria-expanded", "true");

    await pressReferenceElementKey(component, "ArrowUp", "2");
    await pressReferenceElementKey(component, "ArrowDown", "3");
  });
});

describe("theme", () => {
  themed(() => mount(<calcite-dropdown open />), {
    "--calcite-dropdown-width": {
      targetProp: "inlineSize",
      shadowSelector: `.${CSS.content}`,
    },
    "--calcite-dropdown-background-color": {
      targetProp: "backgroundColor",
      shadowSelector: `.${CSS.content}`,
    },
    "--calcite-dropdown-max-height": {
      targetProp: "maxHeight",
      shadowSelector: `.${CSS.content}`,
    },
  });
});

it("closes existing open dropdown when opened", async () => {
  await mount<Dropdown>(
    <>
      <calcite-dropdown id="dropdown-1">
        <calcite-button id="trigger" slot="trigger">
          Open dropdown
        </calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="single">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected>
            {" "}
            Dropdown Item Content{" "}
          </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
      <calcite-dropdown id="dropdown-2">
        <calcite-button id="trigger" slot="trigger">
          Open dropdown
        </calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="single">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected>
            {" "}
            Dropdown Item Content{" "}
          </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    </>,
  );
  const element1 = page.getBySelector("calcite-dropdown[id='dropdown-1']");
  const element2 = page.getBySelector("calcite-dropdown[id='dropdown-2']");
  const trigger1 = element1.getBySelector("#trigger");
  const trigger2 = element2.getBySelector("#trigger");
  const dropdownWrapper1 = page.getBySelector(`calcite-dropdown[id='dropdown-1'] .${CSS.wrapper}`);
  const dropdownWrapper2 = page.getBySelector(`calcite-dropdown[id='dropdown-2'] .${CSS.wrapper}`);

  await expect.element(dropdownWrapper1).not.toBeVisible();
  await expect.element(dropdownWrapper2).not.toBeVisible();

  await trigger1.click();

  await expect.element(dropdownWrapper1).toBeVisible();
  await expect.element(dropdownWrapper2).not.toBeVisible();

  await trigger2.click();

  await expect.element(dropdownWrapper1).not.toBeVisible();
  await expect.element(dropdownWrapper2).toBeVisible();
});

describe("scrolling", () => {
  it("focused item should be in view when long", async () => {
    await mount<Dropdown>(
      <calcite-dropdown>
        <calcite-button slot="trigger">Open Dropdown</calcite-button>
        <calcite-dropdown-group>
          <calcite-dropdown-item id="item-1">1</calcite-dropdown-item>
          <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
          <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
          <calcite-dropdown-item id="item-4">4</calcite-dropdown-item>
          <calcite-dropdown-item id="item-5">5</calcite-dropdown-item>
          <calcite-dropdown-item id="item-6">6</calcite-dropdown-item>
          <calcite-dropdown-item id="item-7">7</calcite-dropdown-item>
          <calcite-dropdown-item id="item-8">8</calcite-dropdown-item>
          <calcite-dropdown-item id="item-9">9</calcite-dropdown-item>
          <calcite-dropdown-item id="item-10">10</calcite-dropdown-item>
          <calcite-dropdown-item id="item-11">11</calcite-dropdown-item>
          <calcite-dropdown-item id="item-12">12</calcite-dropdown-item>
          <calcite-dropdown-item id="item-13">13</calcite-dropdown-item>
          <calcite-dropdown-item id="item-14">14</calcite-dropdown-item>
          <calcite-dropdown-item id="item-15">15</calcite-dropdown-item>
          <calcite-dropdown-item id="item-16">16</calcite-dropdown-item>
          <calcite-dropdown-item id="item-17">17</calcite-dropdown-item>
          <calcite-dropdown-item id="item-18">18</calcite-dropdown-item>
          <calcite-dropdown-item id="item-19">19</calcite-dropdown-item>
          <calcite-dropdown-item id="item-20">20</calcite-dropdown-item>
          <calcite-dropdown-item id="item-21">21</calcite-dropdown-item>
          <calcite-dropdown-item id="item-22">22</calcite-dropdown-item>
          <calcite-dropdown-item id="item-23">23</calcite-dropdown-item>
          <calcite-dropdown-item id="item-24">24</calcite-dropdown-item>
          <calcite-dropdown-item id="item-25">25</calcite-dropdown-item>
          <calcite-dropdown-item id="item-26">26</calcite-dropdown-item>
          <calcite-dropdown-item id="item-27">27</calcite-dropdown-item>
          <calcite-dropdown-item id="item-28">28</calcite-dropdown-item>
          <calcite-dropdown-item id="item-29">29</calcite-dropdown-item>
          <calcite-dropdown-item id="item-30">30</calcite-dropdown-item>
          <calcite-dropdown-item id="item-41">41</calcite-dropdown-item>
          <calcite-dropdown-item id="item-42">42</calcite-dropdown-item>
          <calcite-dropdown-item id="item-43">43</calcite-dropdown-item>
          <calcite-dropdown-item id="item-44">44</calcite-dropdown-item>
          <calcite-dropdown-item id="item-45">45</calcite-dropdown-item>
          <calcite-dropdown-item id="item-46">46</calcite-dropdown-item>
          <calcite-dropdown-item id="item-47">47</calcite-dropdown-item>
          <calcite-dropdown-item id="item-48">48</calcite-dropdown-item>
          <calcite-dropdown-item id="item-49">49</calcite-dropdown-item>
          <calcite-dropdown-item id="item-50">50</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>,
    );
    const focusedItem = page.getBySelector("#item-50");

    await userEvent.tab();
    await userEvent.keyboard("{ArrowUp}");

    await expect.element(focusedItem).toHaveFocus();
    await expect.element(focusedItem).toBeInViewport();
  });

  describe("max-items", () => {
    const maxItems = 7;

    it("control max items displayed", async () => {
      const { el } = await mount<Dropdown>(
        <calcite-dropdown max-items={maxItems}>
          <calcite-button slot="trigger">Open Dropdown</calcite-button>
          <calcite-dropdown-group group-title="First group">
            <calcite-dropdown-item id="item-1">1</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
            <calcite-dropdown-item id="item-4">4</calcite-dropdown-item>
            <calcite-dropdown-item id="item-5">5</calcite-dropdown-item>
          </calcite-dropdown-group>
          <calcite-dropdown-group group-title="Second group">
            <calcite-dropdown-item id="item-6">6</calcite-dropdown-item>
            <calcite-dropdown-item id="item-7">7</calcite-dropdown-item>
            <calcite-dropdown-item id="item-8">8</calcite-dropdown-item>
            <calcite-dropdown-item id="item-9">9</calcite-dropdown-item>
            <calcite-dropdown-item id="item-10">10</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>,
      );

      await userEvent.click(el);
      const items = page.getBySelector("calcite-dropdown-item").all();

      for (let i = 0; i < items.length; i++) {
        await (i < maxItems
          ? /* eslint-disable vitest/no-conditional-expect -- assertion depends on current item */
            expect.element(items[i]).toBeInViewport()
          : expect.element(items[i]).not.toBeInViewport());
        /* eslint-enable vitest/no-conditional-expect */
      }

      const newMaxItems = 4;
      el.maxItems = newMaxItems;

      for (let i = 0; i < items.length; i++) {
        /* eslint-disable vitest/no-conditional-expect -- assertion depends on current item */
        await (i < newMaxItems
          ? expect.element(items[i]).toBeInViewport()
          : expect.element(items[i]).not.toBeInViewport());
        /* eslint-enable vitest/no-conditional-expect */
      }

      const totalItems = 10;
      el.maxItems = totalItems;

      for (let i = 0; i < items.length; i++) {
        await expect.element(items[i]).toBeInViewport();
      }

      // no scroller should be present when max-items === items
      const scroller = page.getByRole("menu").element();
      expect(scroller.scrollHeight).toBe(scroller.clientHeight);
    });

    it("does not display a scrollbar on subsequent opens when max-items matches the number of items", async () => {
      const { el } = await mount<Dropdown>(
        <calcite-dropdown max-items={maxItems}>
          <calcite-button slot="trigger">Open Dropdown</calcite-button>
          <calcite-dropdown-group group-title="First group">
            {Array.from({ length: maxItems }, (_, index) => index + 1).map((position) => (
              <calcite-dropdown-item id={`item-${position}`}>{position}</calcite-dropdown-item>
            ))}
          </calcite-dropdown-group>
        </calcite-dropdown>,
      );
      const menu = page.getByRole("menu", { includeHidden: true });

      async function assertNoScrollbar(): Promise<void> {
        await afterNextFrame();
        const menuEl = menu.element();
        expect(menuEl.scrollHeight).toBe(menuEl.clientHeight);
      }

      await userEvent.click(el);
      await expect.element(menu).toBeVisible();
      await assertNoScrollbar();

      await userEvent.click(el);
      await expect.element(menu).not.toBeVisible();
      await assertNoScrollbar();

      await userEvent.click(el);
      await expect.element(menu).toBeVisible();
      await assertNoScrollbar();
    });

    it("does not scroll to selected item on open when max-items causes selected item to be beyond scroller", async () => {
      const { el } = await mount<Dropdown>(
        <calcite-dropdown max-items={maxItems}>
          <calcite-button slot="trigger">Open Dropdown</calcite-button>
          <calcite-dropdown-group group-title="First group">
            <calcite-dropdown-item id="item-1">1</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
            <calcite-dropdown-item id="item-4">4</calcite-dropdown-item>
            <calcite-dropdown-item id="item-5">5</calcite-dropdown-item>
          </calcite-dropdown-group>
          <calcite-dropdown-group group-title="Second group">
            <calcite-dropdown-item id="item-6">6</calcite-dropdown-item>
            <calcite-dropdown-item id="item-7">7</calcite-dropdown-item>
            <calcite-dropdown-item id="item-8">8</calcite-dropdown-item>
            <calcite-dropdown-item id="item-9">9</calcite-dropdown-item>
            <calcite-dropdown-item id="item-10" selected>
              10
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>,
      );
      const selectedItem = page.getBySelector("#item-10");

      await userEvent.click(el);

      await expect.element(selectedItem).not.toBeInViewport();
    });
  });
});
