import { makeGenericController } from "@arcgis/lumina/controllers";
import { focusable, tabbable } from "tabbable";
import { getRootNode, tabbableOptions } from "../utils/dom";

type FocusableElement = HTMLElement | SVGElement;

const managedTabIndexes = new WeakMap<
  Element,
  { attribute: string | null; tabIndex: number; referenceCount: number }
>();

function isFocusableElement(element: Element): element is FocusableElement {
  return (
    "focus" in element &&
    typeof element.focus === "function" &&
    "tabIndex" in element &&
    typeof element.tabIndex === "number"
  );
}

function getFocusableEntryElements(entryElement: Element | undefined): FocusableElement[] {
  if (!entryElement) {
    return [];
  }

  const focusableElements = focusable(entryElement, { ...tabbableOptions, includeContainer: true }).filter(
    isFocusableElement,
  );

  if (isFocusableElement(entryElement) && entryElement.tabIndex >= 0) {
    focusableElements.push(entryElement);
  }

  return [...new Set(focusableElements)];
}

function getTabbableEntryElements(entryElement: Element | undefined): FocusableElement[] {
  if (!entryElement) {
    return [];
  }

  const tabbableElements = tabbable(entryElement, { ...tabbableOptions, includeContainer: true }).filter(
    isFocusableElement,
  );

  tabbableElements.push(
    ...getFocusableEntryElements(entryElement).filter(
      (element) => (managedTabIndexes.get(element)?.tabIndex ?? -1) >= 0,
    ),
  );

  if (isFocusableElement(entryElement) && entryElement.tabIndex >= 0) {
    tabbableElements.push(entryElement);
  }

  return [...new Set(tabbableElements)];
}

interface RovingTabIndexOptions<ElementType extends HTMLElement> {
  /**
   * Resolves the items whose `tabindex` values are managed.
   *
   * Used by `setActiveIndex`; defaults to the most recently supplied items.
   */
  getElements?: () => ElementType[];
  /**
   * Resolves the element containing the composite's entry control.
   *
   * Its tabbable elements are included in roving tab-stop management while an item is active.
   */
  getEntryElement?: () => Element | undefined;
  /**
   * Resolves eligible items in navigation order.
   *
   * Used to calculate the active index and resolve an item in `setActiveIndex`; defaults to the managed items.
   */
  getTraversableElements?: () => readonly ElementType[] | undefined;
  /**
   * Determines whether an active item can have a tab stop.
   *
   * When this returns `false`, `update` clears the active item.
   */
  isActive?: () => boolean;
}

interface RovingTabIndex<ElementType extends HTMLElement> {
  /**
   * The active item, or `null` when no item is active.
   *
   * An item is active only when it is managed, traversable, and the controller is active.
   */
  readonly activeElement: ElementType | null;
  /** The active item's index among traversable items, or `-1` when none is active. */
  readonly activeIndex: number;
  /** Whether the controller is synchronously restoring focus to the entry control. */
  readonly isRestoringFocus: boolean;
  /** Whether an unavailable item lost focus without focus intentionally moving to another control. */
  readonly shouldRecoverFocus: boolean;
  /**
   * Tracks focus entering a managed, traversable item and makes it active.
   *
   * @param event - The composite's `focusin` event.
   */
  handleFocusIn: (event: FocusEvent) => void;
  /**
   * Tracks focus leaving managed items, preserving focus history for removal or unavailability.
   *
   * @param event - The composite's `focusout` event.
   */
  handleFocusOut: (event: FocusEvent) => void;
  /**
   * Updates the managed items and active item, applying roving `tabindex` values.
   *
   * Previously managed elements no longer included are released.
   * Original `tabindex` attributes are restored after the last controller releases an element.
   *
   * @param elements - Items whose `tabindex` values are managed.
   * @param activeElement - Item to make the active tab stop, or `null` to clear the active item.
   */
  update: (elements: ElementType[], activeElement: ElementType | null) => void;
  /**
   * Activates a traversable item by index.
   *
   * An out-of-range or negative index clears the active tab stop.
   *
   * @param index - Index in the traversable items.
   */
  setActiveIndex: (index: number) => void;
  /**
   * Releases the specified elements, or all managed elements when omitted.
   * Original `tabindex` attributes are restored after the last controller releases an element.
   *
   * @param elements - Elements to restore. When omitted, restores every element currently tracked by the controller.
   */
  restore: (elements?: readonly Element[]) => void;
  /**
   * Returns focus to the entry control without changing its `tabindex`.
   *
   * By default, focus is restored only when it is currently within the managed items or entry control.
   *
   * @param force - When `true`, restores focus without checking its current location.
   */
  restoreFocus: (force?: boolean) => void;
  /** Returns focus to the entry control only while one of the managed items is focused. */
  restoreFocusIfWithin: () => void;
}

/**
 * Creates a controller that manages roving tab stops for a composite widget.
 *
 * The active item receives `tabindex="0"` and other managed items receive `tabindex="-1"`.
 * Original `tabindex` attributes are restored when the last controller managing an element releases it.
 * Elements are released when they stop being managed or the component disconnects.
 * The controller can also manage an entry control's tab stops and restore focus to that control.
 * Forward item `focusin` and `focusout` events to track whether an unavailable item needs focus recovery.
 * Consumers remain responsible for choosing and focusing a replacement item.
 *
 * @param options - Callbacks for resolving managed items, traversable items, and the entry control.
 */
export const useRovingTabIndex = <ElementType extends HTMLElement = HTMLElement>(
  options: RovingTabIndexOptions<ElementType> = {},
): ReturnType<typeof makeGenericController<RovingTabIndex<ElementType>>> =>
  makeGenericController<RovingTabIndex<ElementType>>((component, controller) => {
    const trackedElements = new Set<Element>();
    let itemElements: ElementType[] = [];
    let activeElement: ElementType | null = null;
    let activeIndex = -1;
    let entryTabStops: FocusableElement[] = [];
    let entryFocusTarget: FocusableElement | undefined;
    let isRestoringFocus = false;
    let focusedItem: ElementType | undefined;

    function getTraversableElements(): readonly ElementType[] {
      return options.getTraversableElements?.() ?? options.getElements?.() ?? itemElements;
    }

    function restoreElement(element: Element): void {
      const managedTabIndex = managedTabIndexes.get(element);
      if (!managedTabIndex || !trackedElements.delete(element)) {
        return;
      }

      managedTabIndex.referenceCount--;
      if (managedTabIndex.referenceCount > 0) {
        return;
      }

      if (managedTabIndex.attribute === null) {
        element.removeAttribute("tabindex");
      } else {
        element.setAttribute("tabindex", managedTabIndex.attribute);
      }
      managedTabIndexes.delete(element);
    }

    function restore(elements?: readonly Element[]): void {
      if (!elements) {
        trackedElements.forEach(restoreElement);
        return;
      }

      elements.forEach(restoreElement);
    }

    component.listenOn(
      component.el.ownerDocument,
      "focusin",
      (event) => {
        if (focusedItem && !event.composedPath().includes(focusedItem)) {
          focusedItem = undefined;
        }
      },
      { capture: true },
    );

    controller.onDisconnected(() => {
      focusedItem = undefined;
      restore();
    });

    const rovingTabIndex: RovingTabIndex<ElementType> = {
      get activeElement(): ElementType | null {
        return activeElement;
      },
      get activeIndex(): number {
        return activeIndex;
      },
      get isRestoringFocus(): boolean {
        return isRestoringFocus;
      },
      get shouldRecoverFocus(): boolean {
        if (!focusedItem) {
          return false;
        }

        const rootNode = getRootNode(component.el);
        const focusWasLost =
          component.el.ownerDocument.activeElement === component.el.ownerDocument.body ||
          (rootNode instanceof ShadowRoot && !rootNode.activeElement && rootNode.host.matches(":focus-within"));

        if (!focusWasLost && !focusedItem.matches(":focus-within")) {
          focusedItem = undefined;
          return false;
        }

        return !focusedItem.isConnected || !getTraversableElements().includes(focusedItem);
      },
      handleFocusIn(event): void {
        const elements = getTraversableElements();
        const item = elements.find((element) => event.composedPath().includes(element));
        if (item) {
          focusedItem = item;
          rovingTabIndex.setActiveIndex(elements.indexOf(item));
        }
      },
      handleFocusOut(event): void {
        const relatedTarget = event.relatedTarget;
        if (
          relatedTarget instanceof Node &&
          getTraversableElements().some((element) => element.contains(relatedTarget))
        ) {
          return;
        }

        if (relatedTarget instanceof Element) {
          focusedItem = undefined;
        } else if (focusedItem) {
          const previousFocusedItem = focusedItem;
          // Defer clearing so item updates can detect focus lost through removal or unavailability.
          queueMicrotask(() => {
            if (
              focusedItem === previousFocusedItem &&
              previousFocusedItem.isConnected &&
              getTraversableElements().includes(previousFocusedItem)
            ) {
              focusedItem = undefined;
            }
          });
        }
      },
      update(elements, nextActiveElement): void {
        const entryElement = options.getEntryElement?.();
        restore(entryTabStops);
        const nextEntryTabStops = getTabbableEntryElements(entryElement);
        const managedEntryTabStops =
          nextEntryTabStops.length > 0
            ? nextEntryTabStops
            : entryTabStops.filter(
                (element) =>
                  element.isConnected && (element === entryElement || (entryElement && entryElement.contains(element))),
              );
        itemElements = elements;
        const traversableElements = options.getTraversableElements?.() ?? elements;
        activeIndex =
          nextActiveElement && options.isActive?.() !== false && elements.includes(nextActiveElement)
            ? traversableElements.indexOf(nextActiveElement)
            : -1;
        activeElement = activeIndex >= 0 ? nextActiveElement : null;
        const entryFocusCandidates = getFocusableEntryElements(entryElement);
        entryFocusTarget =
          entryFocusCandidates.find((element) => getRootNode(element).activeElement === element) ??
          (entryFocusTarget && entryFocusCandidates.includes(entryFocusTarget)
            ? entryFocusTarget
            : entryFocusCandidates[0]);
        entryTabStops = managedEntryTabStops;
        const managedElements = activeElement ? [...elements, ...entryTabStops] : elements;
        const currentElements = new Set<Element>(managedElements);
        trackedElements.forEach((element) => {
          if (!currentElements.has(element)) {
            restoreElement(element);
          }
        });

        managedElements.forEach((element) => {
          if (!trackedElements.has(element)) {
            const managedTabIndex = managedTabIndexes.get(element);
            if (managedTabIndex) {
              managedTabIndex.referenceCount++;
            } else {
              managedTabIndexes.set(element, {
                attribute: element.getAttribute("tabindex"),
                tabIndex: element.tabIndex,
                referenceCount: 1,
              });
            }
            trackedElements.add(element);
          }
          const tabIndex = element === activeElement ? 0 : -1;
          if (element.getAttribute("tabindex") !== String(tabIndex)) {
            element.tabIndex = tabIndex;
          }
        });
      },
      setActiveIndex(index): void {
        const elements = options.getElements?.() ?? itemElements;
        const traversableElements = options.getTraversableElements?.() ?? elements;
        const nextActiveElement = index >= 0 ? (traversableElements[index] ?? null) : null;
        rovingTabIndex.update(elements, nextActiveElement);
      },
      restore,
      restoreFocus(force = false): void {
        const currentlyFocusedElement = entryFocusTarget ? getRootNode(entryFocusTarget).activeElement : null;
        const focusIsWithinManagedControls =
          itemElements.some((element) => getRootNode(element).activeElement === element) ||
          entryTabStops.some((element) => getRootNode(element).activeElement === element) ||
          (entryFocusTarget !== undefined && currentlyFocusedElement === entryFocusTarget);

        if ((!force && !focusIsWithinManagedControls) || !entryFocusTarget || !entryFocusTarget.isConnected) {
          return;
        }

        isRestoringFocus = true;
        try {
          entryFocusTarget.focus();
          focusedItem = undefined;
        } finally {
          isRestoringFocus = false;
        }
      },
      restoreFocusIfWithin(): void {
        if (itemElements.some((element) => getRootNode(element).activeElement === element)) {
          rovingTabIndex.restoreFocus();
        }
      },
    };
    return rovingTabIndex;
  });
