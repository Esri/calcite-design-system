import { Fragment, h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
import { JsxNode } from "@arcgis/lumina";
import {
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  floatingUIOwner,
  disabled,
  topLayer,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";
import { Dropdown } from "./dropdown";

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

function renderSimpleDropdownHTML(): JsxNode {
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

async function waitForSettledUpdate(
  component: Dropdown["manager"]["component"],
  updateCompletePromise: Promise<unknown>,
): Promise<void> {
  if ((await updateCompletePromise) === false) {
    await component.updateComplete;
  }
}

describe("renders", () => {
  renders(() => mount(renderSimpleDropdownHTML), { display: "inline-block" });
});

describe("focusable", () => {
  focusable(() => mount(renderSimpleDropdownHTML), {
    focusTargetSelector: '[slot="trigger"]',
  });
});

describe("owns a floating-ui", () => {
  floatingUIOwner(
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
          pointer: "calcite-button",
          method: "body",
        },
      },
    },
  );
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

    await userEvent.tab();
    await userEvent.tab();

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

describe("ariaActiveDescendantElement", () => {
  function getSlottedTriggerLocator(): ReturnType<typeof page.elementLocator> {
    const internalButton = page.getByRole("button", { name: "Open dropdown" }).element();
    const triggerHost = (internalButton?.getRootNode() as ShadowRoot | null)?.host;

    return page.elementLocator(triggerHost);
  }

  function getTriggerSlotLocator(): ReturnType<typeof page.elementLocator> {
    const slot = (getSlottedTriggerLocator().element() as HTMLElement | null)?.assignedSlot;

    return page.elementLocator(slot);
  }

  function getActiveDescendantId(): string | undefined {
    return (getTriggerSlotLocator().element() as HTMLSlotElement | null)
      ?.ariaActiveDescendantElement?.id;
  }

  it("sets ariaActiveDescendantElement on the trigger slot when opened", async () => {
    await mount<Dropdown>(renderSimpleDropdownHTML);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);

    expect(getActiveDescendantId()).toBe("item-1");
  });

  it("updates ariaActiveDescendantElement on keyboard navigation", async () => {
    await mount<Dropdown>(renderSimpleDropdownHTML);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);

    const triggerEl = getSlottedTriggerLocator();
    await userEvent.type(triggerEl, "{ArrowDown}");

    expect(getActiveDescendantId()).toBe("item-2");
  });

  it("wraps ariaActiveDescendantElement on ArrowUp navigation", async () => {
    await mount<Dropdown>(renderSimpleDropdownHTML);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);

    const triggerEl = getSlottedTriggerLocator();
    await userEvent.type(triggerEl, "{ArrowUp}");

    let activeDescendantId = getActiveDescendantId();

    expect(activeDescendantId).toBe("item-3");

    await userEvent.type(triggerEl, "{ArrowUp}");

    activeDescendantId = getActiveDescendantId();

    expect(activeDescendantId).toBe("item-2");
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
    const { el } = await mount<Dropdown>(renderReferenceElementDropdownHTML);
    const trigger = page.getByRole("button", { name: "Open dropdown" });
    const dropdownElement = trigger.element()?.nextElementSibling;

    const dropdown = page.elementLocator(dropdownElement).element() as Dropdown;
    const component = dropdown.manager.component;

    expect(el.open).toBe(false);

    const updateComplete = component.updateComplete;

    (trigger.element() as HTMLElement | null)?.focus();
    await userEvent.keyboard("{Enter}");
    await waitForSettledUpdate(component, updateComplete);

    expect(el.open).toBe(true);
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

  function getReferenceElementExpandedState(): string {
    return (
      (getReferenceElementTrigger().element() as HTMLElement)?.getAttribute("aria-expanded") ?? ""
    );
  }

  function getReferenceElementTrigger(): ReturnType<typeof page.getByRole> {
    return page.getByRole("button", { name: "Open dropdown" });
  }

  function getDropdownLocator(): ReturnType<typeof page.elementLocator> {
    const dropdown = getReferenceElementTrigger().element()?.nextElementSibling;

    return page.elementLocator(dropdown);
  }

  async function waitForDropdownUpdateComplete(): Promise<void> {
    const dropdown = getDropdownLocator().element() as Dropdown;
    const component = dropdown.manager.component;
    const updateComplete = component.updateComplete;

    await waitForSettledUpdate(component, updateComplete);
  }

  const defaultItemIds = ["item-1", "item-2", "item-3"];
  const disabledAndHiddenItemIds = ["item-1", "item-1.5", "item-2", "item-2.5", "item-3", "item-4"];

  const dropdownItemTextById: Record<string, string> = {
    "item-1": "1",
    "item-1.5": "1.5",
    "item-2": "2",
    "item-2.5": "2.5",
    "item-3": "3",
    "item-4": "4",
  };

  function getDropdownItemLocator(itemId: string): ReturnType<typeof page.elementLocator> | null {
    const itemText = dropdownItemTextById[itemId];
    const itemContent = getDropdownLocator().getByText(itemText, { exact: true }).element();
    const item = itemContent?.closest("calcite-dropdown-item");

    return page.elementLocator(item);
  }

  function getActiveItemId(itemIds: string[]): string {
    return itemIds.find((itemId) => {
      const item = getDropdownItemLocator(itemId);

      if (!item) {
        throw new Error("Expected dropdown item with id " + itemId);
      }

      return (item.element() as HTMLElement & { activeDescendant?: boolean }).activeDescendant;
    });
  }

  async function pressReferenceElementKey(key: string): Promise<void> {
    (getReferenceElementTrigger().element() as HTMLElement | null)?.focus();
    await userEvent.keyboard(`{${key}}`);
    await waitForDropdownUpdateComplete();
  }

  it("supports navigating through items with arrow keys", async () => {
    await mount<Dropdown>(() =>
      renderReferenceElementKeyboardDropdownHTML({ selectedItemId: "item-1" }),
    );

    await pressReferenceElementKey("Enter");
    expect(getActiveItemId(defaultItemIds)).toBe("item-1");

    await pressReferenceElementKey("ArrowDown");
    expect(getActiveItemId(defaultItemIds)).toBe("item-2");

    await pressReferenceElementKey("ArrowDown");
    expect(getActiveItemId(defaultItemIds)).toBe("item-3");

    await pressReferenceElementKey("ArrowDown");
    expect(getActiveItemId(defaultItemIds)).toBe("item-1");

    await pressReferenceElementKey("ArrowUp");
    expect(getActiveItemId(defaultItemIds)).toBe("item-3");

    await pressReferenceElementKey("ArrowUp");
    expect(getActiveItemId(defaultItemIds)).toBe("item-2");

    await pressReferenceElementKey("ArrowUp");
    expect(getActiveItemId(defaultItemIds)).toBe("item-1");

    await pressReferenceElementKey("ArrowUp");
    expect(getActiveItemId(defaultItemIds)).toBe("item-3");
  });

  it("skips disabled and hidden items when navigating with arrow keys", async () => {
    await mount<Dropdown>(() =>
      renderReferenceElementKeyboardDropdownHTML({
        includeDisabledAndHiddenItems: true,
      }),
    );

    await pressReferenceElementKey("Enter");
    expect(getActiveItemId(disabledAndHiddenItemIds)).toBe("item-2");

    await pressReferenceElementKey("ArrowDown");
    expect(getActiveItemId(disabledAndHiddenItemIds)).toBe("item-3");

    await pressReferenceElementKey("ArrowDown");
    expect(getActiveItemId(disabledAndHiddenItemIds)).toBe("item-2");

    await pressReferenceElementKey("ArrowUp");
    expect(getActiveItemId(disabledAndHiddenItemIds)).toBe("item-3");

    await pressReferenceElementKey("ArrowUp");
    expect(getActiveItemId(disabledAndHiddenItemIds)).toBe("item-2");

    await pressReferenceElementKey("ArrowUp");
    expect(getActiveItemId(disabledAndHiddenItemIds)).toBe("item-3");
  });

  it("should open the dropdown and focus the first item with ArrowDown", async () => {
    await mount<Dropdown>(() => renderReferenceElementKeyboardDropdownHTML());
    await pressReferenceElementKey("ArrowDown");

    expect(getReferenceElementExpandedState()).toBe("true");
    expect(getActiveItemId(defaultItemIds)).toBe("item-1");

    await pressReferenceElementKey("ArrowDown");
    expect(getActiveItemId(defaultItemIds)).toBe("item-2");

    await pressReferenceElementKey("ArrowUp");
    expect(getActiveItemId(defaultItemIds)).toBe("item-1");
  });

  it("should open the dropdown and focus the last item with ArrowUp when no item is selected", async () => {
    await mount<Dropdown>(() => renderReferenceElementKeyboardDropdownHTML());
    await pressReferenceElementKey("ArrowUp");

    expect(getReferenceElementExpandedState()).toBe("true");
    expect(getActiveItemId(defaultItemIds)).toBe("item-3");

    await pressReferenceElementKey("ArrowDown");
    expect(getActiveItemId(defaultItemIds)).toBe("item-1");

    await pressReferenceElementKey("ArrowUp");
    expect(getActiveItemId(defaultItemIds)).toBe("item-3");
  });

  it("should open the dropdown and focus the last item with ArrowUp", async () => {
    await mount<Dropdown>(() =>
      renderReferenceElementKeyboardDropdownHTML({ selectedItemId: "item-2" }),
    );
    await pressReferenceElementKey("ArrowUp");

    expect(getReferenceElementExpandedState()).toBe("true");
    expect(getActiveItemId(defaultItemIds)).toBe("item-3");

    await pressReferenceElementKey("ArrowUp");
    expect(getActiveItemId(defaultItemIds)).toBe("item-2");

    await pressReferenceElementKey("ArrowDown");
    expect(getActiveItemId(defaultItemIds)).toBe("item-3");
  });
});
