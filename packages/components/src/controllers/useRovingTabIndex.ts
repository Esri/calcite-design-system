import { makeGenericController } from "@arcgis/lumina/controllers";
import { focusable, tabbable } from "tabbable";
import { getRootNode, tabbableOptions } from "../utils/dom";

interface RovingTabIndexOptions<ElementType extends HTMLElement> {
  /** Resolves the current managed items for index-based activation. */
  getElements?: () => ElementType[];
  /** Resolves the element containing the composite's entry control. */
  getEntryElement?: () => HTMLElement | undefined;
  /** Resolves eligible items in navigation order, defaulting to the managed items. */
  getTraversableElements?: () => readonly ElementType[] | undefined;
  /** Determines whether managed items can have an active tab stop. */
  isActive?: () => boolean;
}

interface RovingTabIndex<ElementType extends HTMLElement> {
  /** The active item, or null when no item is active. */
  readonly activeElement: ElementType | null;
  /** The active item's index among eligible items, or -1 when none is active. */
  readonly activeIndex: number;
  /** Indicates whether focus is being returned to the entry control. */
  readonly isRestoringFocus: boolean;
  update: (elements: ElementType[], activeElement: ElementType | null) => void;
  /** Activates an eligible item by index, clearing the active tab stop for invalid indices. */
  setActiveIndex: (index: number) => void;
  /** Restores specified elements, or all managed elements when omitted. */
  restore: (elements?: readonly HTMLElement[]) => void;
  /** Returns focus to the entry control without changing its tabindex. */
  restoreFocus: () => void;
  /** Returns focus only while one of the managed items is focused. */
  restoreFocusIfWithin: () => void;
}

/** Manages a single tab stop and restores attributes when elements are no longer managed. */
export const useRovingTabIndex = <ElementType extends HTMLElement = HTMLElement>(
  options: RovingTabIndexOptions<ElementType> = {},
): ReturnType<typeof makeGenericController<RovingTabIndex<ElementType>>> =>
  makeGenericController<RovingTabIndex<ElementType>>((_component, controller) => {
    const originalTabIndexes = new Map<HTMLElement, string | null>();
    let itemElements: ElementType[] = [];
    let activeElement: ElementType | null = null;
    let activeIndex = -1;
    let entryTabStops: HTMLElement[] = [];
    let entryFocusTarget: HTMLElement | undefined;
    let isRestoringFocus = false;

    function restoreElement(element: HTMLElement, tabIndex: string | null): void {
      if (tabIndex === null) {
        element.removeAttribute("tabindex");
      } else {
        element.setAttribute("tabindex", tabIndex);
      }
      originalTabIndexes.delete(element);
    }

    function restore(elements?: readonly HTMLElement[]): void {
      if (!elements) {
        originalTabIndexes.forEach((tabIndex, element) => restoreElement(element, tabIndex));
        return;
      }

      elements.forEach((element) => {
        const tabIndex = originalTabIndexes.get(element);
        if (tabIndex !== undefined) {
          restoreElement(element, tabIndex);
        }
      });
    }

    controller.onDisconnected(() => restore());

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
      update(elements, nextActiveElement): void {
        itemElements = elements;
        const traversableElements = options.getTraversableElements?.() ?? elements;
        activeIndex =
          nextActiveElement && options.isActive?.() !== false && elements.includes(nextActiveElement)
            ? traversableElements.indexOf(nextActiveElement)
            : -1;
        activeElement = activeIndex >= 0 ? nextActiveElement : null;
        restore(entryTabStops);
        const entryElement = options.getEntryElement?.();
        entryFocusTarget = entryElement
          ? focusable(entryElement, { ...tabbableOptions, includeContainer: true }).find(
              (element) => element instanceof HTMLElement,
            )
          : undefined;
        entryTabStops = entryElement
          ? tabbable(entryElement, { ...tabbableOptions, includeContainer: true }).filter(
              (element) => element instanceof HTMLElement,
            )
          : [];
        const managedElements = activeElement ? [...elements, ...entryTabStops] : elements;
        const currentElements = new Set(managedElements);
        originalTabIndexes.forEach((tabIndex, element) => {
          if (!currentElements.has(element)) {
            restoreElement(element, tabIndex);
          }
        });

        managedElements.forEach((element) => {
          if (!originalTabIndexes.has(element)) {
            originalTabIndexes.set(element, element.getAttribute("tabindex"));
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
      restoreFocus(): void {
        isRestoringFocus = true;
        try {
          entryFocusTarget?.focus();
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
