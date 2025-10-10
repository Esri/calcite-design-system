// @ts-strict-ignore
import { BoundingBox, ElementHandle } from "puppeteer";
import { LitElement, ToElement } from "@arcgis/lumina";
import { E2EElement, E2EPage, EventSpy, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect } from "vitest";
import { ComponentTag } from "../commonTests/interfaces";
import { waitForAnimationFrame as waitForRaf } from "./timing";

/** Util to help type global props for testing. */
export type GlobalTestProps<T> = T & Window & typeof globalThis;

type FilterPropsByPropertyName<T, PropName extends string> = {
  [K in keyof T]: PropName extends keyof T[K] ? T[K] : never;
};

/** Helper to extract a type by filtering the type by the property name. */
export type IntrinsicElementsWithProp<T extends string> = FilterPropsByPropertyName<
  DeclareElements,
  T
>[keyof FilterPropsByPropertyName<DeclareElements, T>];

type DragAndDropSelector = string | SelectorOptions;

type PointerPosition = {
  vertical?: "bottom" | "center" | "top";
  horizontal?: "left" | "center" | "right";
  offset?: [number, number];
};

interface SelectorOptions {
  element: string;
  shadow?: string;
  pointerPosition?: PointerPosition;
}

type MouseInitEvent = Pick<
  MouseEvent,
  "bubbles" | "cancelable" | "composed" | "screenX" | "screenY" | "clientX" | "clientY"
>;

/**
 * Drag and drop utility based on https://github.com/puppeteer/puppeteer/issues/1366#issuecomment-615887204
 *
 * @param {E2EPage} page - the e2e page
 * @param {DragAndDropSelector} dragStartSelector - Selector for the drag's start
 * @param {DragAndDropSelector} dragEndSelector - Selector for the drag's end
 */
export async function dragAndDrop(
  page: E2EPage,
  dragStartSelector: DragAndDropSelector,
  dragEndSelector: DragAndDropSelector,
): Promise<void> {
  async function getBounds(selector: DragAndDropSelector): Promise<BoundingBox> {
    const elementHandle =
      typeof selector === "string"
        ? await page.waitForSelector(selector)
        : await page.evaluateHandle(({ element, shadow }) => {
            const target = document.querySelector(element);

            return shadow ? target.shadowRoot.querySelector(shadow) : target;
          }, selector);

    return elementHandle.asElement().boundingBox();
  }

  async function createEventInitializer(selector: DragAndDropSelector): Promise<MouseInitEvent> {
    const {
      vertical: verticalPos,
      horizontal: horizontalPos,
      offset = [0, 0],
    }: PointerPosition = typeof selector === "string" || !selector.pointerPosition
      ? { vertical: "center" }
      : selector.pointerPosition;
    const { height, width, x, y } = await getBounds(selector);
    const verticalOffset = verticalPos === "top" ? 0 : verticalPos === "bottom" ? height : height / 2;
    const horizontalOffset = horizontalPos === "left" ? 0 : horizontalPos === "right" ? width : width / 2;

    const eventX = x + horizontalOffset + offset[0];
    const eventY = y + verticalOffset + offset[1];

    return {
      bubbles: true,
      cancelable: true,
      composed: true,
      screenX: eventX,
      screenY: eventY,
      clientX: eventX,
      clientY: eventY,
    };
  }

  async function browserContextFunction(
    dragStartSelector: DragAndDropSelector,
    dragEndSelector: DragAndDropSelector,
    dragStartInitializer: MouseInitEvent,
    dragEndInitializer: MouseInitEvent,
  ): Promise<void> {
    function getElement(selector: DragAndDropSelector): Element {
      if (typeof selector === "string") {
        return document.querySelector(selector);
      }

      const element = document.querySelector(selector.element);

      return selector.shadow ? element.shadowRoot.querySelector(selector.shadow) : element;
    }

    const dragStart = getElement(dragStartSelector);
    let dragEnd = getElement(dragEndSelector);

    // if has child, put at the end.
    dragEnd = dragEnd.lastElementChild || dragEnd;

    dragStart.dispatchEvent(new PointerEvent("pointerdown", dragStartInitializer));
    dragStart.dispatchEvent(new DragEvent("dragstart", dragStartInitializer));

    await new Promise((resolve) => window.setTimeout(resolve, 2000));

    dragEnd.dispatchEvent(new MouseEvent("dragenter", dragEndInitializer));
    dragStart.dispatchEvent(new DragEvent("dragend", dragEndInitializer));
  }

  return page.evaluate(
    browserContextFunction,
    dragStartSelector,
    dragEndSelector,
    await createEventInitializer(dragStartSelector),
    await createEventInitializer(dragEndSelector),
  );
}

/**
 *
 * @param {E2EElement} input - the element to select text from
 * @returns {Promise<void>}
 */
export function selectText(input: E2EElement): Promise<void> {
  // workaround for selecting text based on https://github.com/puppeteer/puppeteer/issues/1313#issuecomment-436932478
  return input.click({ clickCount: 3 });
}

/**
 * Helper to get an E2EElement's x,y coordinates.
 *
 * @param {E2EPage} page - the e2e page
 * @param {string} elementSelector - the element selector
 * @param {string} shadowSelector - the shadowRoot selector
 * @deprecated Use `getElementRect` instead.
 */
export async function getElementXY(
  page: E2EPage,
  elementSelector: string,
  shadowSelector?: string,
): Promise<[number, number]> {
  return page.evaluate(
    ([elementSelector, shadowSelector]): [number, number] => {
      const element = document.querySelector(elementSelector);
      const measureTarget = shadowSelector ? element.shadowRoot.querySelector(shadowSelector) : element;
      const { x, y } = measureTarget.getBoundingClientRect();

      return [x, y];
    },
    [elementSelector, shadowSelector],
  );
}

/**
 * Helper to get an E2EElement's DOMRect object.
 *
 * @param {E2EPage} page - the e2e page
 * @param {string} elementSelector - the element selector
 * @param {string} shadowSelector - the shadowRoot selector
 * @returns {Promise<DOMRect>} Promise with DOMRect object.
 */
export async function getElementRect(
  page: E2EPage,
  elementSelector: string,
  shadowSelector?: string,
): Promise<DOMRect> {
  return page.evaluate(
    ([elementSelector, shadowSelector]): DOMRect => {
      const element = document.querySelector(elementSelector);
      const measureTarget = shadowSelector ? element.shadowRoot.querySelector(shadowSelector) : element;
      return measureTarget.getBoundingClientRect().toJSON();
    },
    [elementSelector, shadowSelector],
  );
}

/**
 * This util helps visualize mouse movement when running tests in headful mode.
 * Note that this util should only be used for test debugging purposes and not be included in a test.
 * Based on https://github.com/puppeteer/puppeteer/issues/4378#issuecomment-499726973
 *
 * @example
 * import { visualizeMouseCursor } from "../../tests/utils";
 *
 * const page = await newE2EPage();
 * await page.setContent(`<calcite-tooltip>Content</calcite-tooltip>`);
 *
 * await visualizeMouseCursor(page);
 * await page.waitForChanges();
 * @param {E2EPage} page - the e2e page
 */
export async function visualizeMouseCursor(page: E2EPage): Promise<void> {
  await page.evaluate(() => {
    const box = document.createElement("puppeteer-mouse-pointer");
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
        puppeteer-mouse-pointer {
          pointer-events: none;
          position: absolute;
          top: 0;
          z-index: 10000;
          left: 0;
          width: 20px;
          height: 20px;
          background: rgba(0,0,0,.4);
          border: 1px solid white;
          border-radius: 10px;
          margin: -10px 0 0 -10px;
          padding: 0;
          transition: background .2s, border-radius .2s, border-color .2s;
        }
        puppeteer-mouse-pointer.button-1 {
          transition: none;
          background: rgba(0,0,0,0.9);
        }
        puppeteer-mouse-pointer.button-2 {
          transition: none;
          border-color: rgba(0,0,255,0.9);
        }
        puppeteer-mouse-pointer.button-3 {
          transition: none;
          border-radius: 4px;
        }
        puppeteer-mouse-pointer.button-4 {
          transition: none;
          border-color: rgba(255,0,0,0.9);
        }
        puppeteer-mouse-pointer.button-5 {
          transition: none;
          border-color: rgba(0,255,0,0.9);
        }
      `;
    document.head.appendChild(styleElement);
    document.body.appendChild(box);

    document.addEventListener(
      "mousemove",
      (event) => {
        box.style.left = event.pageX + "px";
        box.style.top = event.pageY + "px";
        updateButtons(event.buttons);
      },
      true,
    );

    document.addEventListener(
      "mousedown",
      (event) => {
        updateButtons(event.buttons);
        box.classList.add("button-" + event.which);
      },
      true,
    );

    document.addEventListener(
      "mouseup",
      (event) => {
        updateButtons(event.buttons);
        box.classList.remove("button-" + event.which);
      },
      true,
    );

    function updateButtons(buttons: number): void {
      for (let i = 0; i < 5; i++) {
        box.classList.toggle("button-" + i, (buttons & (1 << i)) as unknown as boolean);
      }
    }
  });
}

/**
 * Helper function to wait for the next animation frame within the Puppeteer browser context.
 *
 * If you need to run this without Puppeteer dependencies, you can use the `waitForAnimationFrame` function from the `timing` module.
 *
 * @param page
 */
export async function waitForAnimationFrame(page: E2EPage): Promise<void> {
  await page.evaluate(waitForRaf);
}

/**
 * Creates an E2E page for tests that need to create and set up elements programmatically.
 *
 * @returns {Promise<E2EPage>} an e2e page
 */
export async function newProgrammaticE2EPage(): Promise<E2EPage> {
  const page = await newE2EPage();
  await page.setContent("");
  return page;
}

/**
 * Sets CSS vars to skip animations/transitions.
 *
 * @example
 * import { skipAnimations } from "../../tests/utils";
 *
 * const page = await newE2EPage();
 * await page.setContent(`<calcite-tooltip>Content</calcite-tooltip>`);
 *
 * await skipAnimations(page);
 * await page.waitForChanges();
 * @param page
 */
export async function skipAnimations(page: E2EPage): Promise<void> {
  await page.addStyleTag({
    content: `:root { --calcite-duration-factor: 0; }`,
  });
}

interface MatchesFocusedElementOptions {
  /** Set this to true when the focused element is expected to reside in the shadow DOM */
  shadowed: boolean;
}

/**
 * This util helps determine if a selector matches the currently focused element.
 *
 * @param page – the E2E page
 * @param selector – selector of element to match
 * @param options - options to customize the utility behavior
 */
export async function isElementFocused(
  page: E2EPage,
  selector: string,
  options?: MatchesFocusedElementOptions,
): Promise<boolean> {
  const shadowed = options?.shadowed;

  return page.evaluate(
    (selector: string, shadowed: boolean): boolean => {
      const targetDoc = shadowed ? document.activeElement?.shadowRoot : document;

      return !!targetDoc?.activeElement?.matches(selector);
    },
    selector,
    shadowed,
  );
}

type GetFocusedElementProp = {
  /** Set to true to use the shadow root's active element instead of the light DOM's. */
  shadow: boolean;
};

/**
 * This helps get serializable properties from the focused element.
 *
 * @param {E2EPage} page - the E2E test page
 * @param {string} prop - the property to get from the focused element (note: must be serializable)
 * @param {GetFocusedElementProp} options – additional configuration options
 */
export async function getFocusedElementProp<T extends HTMLElement = HTMLElement, K extends keyof T = keyof T>(
  page: E2EPage,
  prop: K,
  options?: GetFocusedElementProp,
): Promise<ReturnType<E2EPage["evaluate"]>> {
  return await page.evaluate(
    (by, shadow) => {
      const { activeElement } = document;
      const target = (shadow ? activeElement?.shadowRoot?.activeElement : activeElement) as T;

      return target?.[by as K];
    },
    prop,
    options?.shadow,
  );
}

/**
 * Custom integer matcher to use with object matchers.
 *
 * @see [Custom Asymmetric Equality Testers](https://jasmine.github.io/tutorials/custom_asymmetric_equality_testers).
 */
export function toBeInteger(): any {
  return {
    asymmetricMatch(abc: string): boolean {
      return Number.isInteger(abc);
    },

    jasmineToString(): string {
      return `Expected value to be an integer.`;
    },
  };
}

/**
 * Custom number matcher to use with object matchers.
 *
 * @see [Custom Asymmetric Equality Testers](https://jasmine.github.io/tutorials/custom_asymmetric_equality_testers).
 */
export function toBeNumber(): any {
  return {
    asymmetricMatch(expected: string): boolean {
      return !isNaN(parseFloat(expected)) && isFinite(Number(expected));
    },

    jasmineToString(): string {
      return `Expected value to be an number.`;
    },
  };
}

type HTMLSelectableElement = HTMLElement & { selectedItems: HTMLElement[] };

interface SelectedItemsAssertionOptions {
  /** IDs from items to assert selection */
  expectedItemIds: string[];
}

type SelectionEventTestWindow = GlobalTestProps<{ eventDetail: Selection }>;

interface SelectedItemsAsserter {
  (expectedItemIds: SelectedItemsAssertionOptions["expectedItemIds"]): Promise<void>;
}

/**
 * Creates a selected items asserter for a selectable component.
 *
 * @example
 *
 * const page = await newE2EPage();
 * await page.setContent(
 *   html`<calcite-dropdown open>
 *     <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
 *     <calcite-dropdown-group id="group-1" selection-mode="single">
 *       <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
 *       <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
 *       <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
 *     </calcite-dropdown-group>
 *   </calcite-dropdown>`,
 * );
 *
 * const assertSelectedItems = await createSelectedItemsAsserter(page, "calcite-dropdown", "calciteDropdownSelect");
 * await page.click("#item-2");
 * await assertSelectedItems({ expectedItemIds: ["item-2"] });
 * @param page - the e2e page
 * @param selectableComponentTagName - the tag name of the selectable group element
 * @param selectionEventName - the name of the selection event
 */
export async function createSelectedItemsAsserter(
  page: E2EPage,
  selectableComponentTagName: ComponentTag,
  selectionEventName: string,
): Promise<SelectedItemsAsserter> {
  await page.evaluate((eventName) => {
    document.addEventListener(
      eventName as any,
      ({ detail }: CustomEvent<Selection>) => ((window as SelectionEventTestWindow).eventDetail = detail),
    );
  }, selectionEventName);

  return async (expectedItemIds: SelectedItemsAssertionOptions["expectedItemIds"]) => {
    await page.waitForChanges();

    const selectedItemIds = await page.evaluate(
      (groupElementTagName) =>
        document.querySelector<HTMLSelectableElement>(groupElementTagName).selectedItems.map((item) => item.id),
      selectableComponentTagName,
    );

    expect(selectedItemIds).toHaveLength(expectedItemIds.length);
    expectedItemIds.forEach((itemId, index) => expect(selectedItemIds[index]).toEqual(itemId));
  };
}

/**
 * Asserts the caret position of an input or textarea element.
 *
 * @param options - test options
 * @param options.page - the e2e page
 * @param options.componentTag  - the component tag
 * @param options.shadowInputTypeSelector - the shadow input type selector
 * @param options.position - the expected caret position
 * @returns {Promise<void>}
 */
export async function assertCaretPosition({
  page,
  componentTag,
  shadowInputTypeSelector = "input",
  position,
}: {
  page: E2EPage;
  componentTag: string;
  shadowInputTypeSelector?: "textarea" | "input";
  position?: number;
}): Promise<void> {
  expect(
    await page.evaluate(
      (position, componentTag, shadowInputTypeSelector) => {
        const element = document.querySelector(componentTag);
        const el = element.shadowRoot.querySelector(shadowInputTypeSelector);
        return el.selectionStart === (position !== undefined ? position : el.value.length);
      },
      position,
      componentTag,
      shadowInputTypeSelector,
    ),
  ).toBeTruthy();
}

/**
 * This utils helps to get the element handle from an E2EElement.
 *
 * @param element - the E2E element
 * @returns {Promise<ElementHandle>} - the element handle
 */
export async function toElementHandle(element: E2EElement): Promise<ElementHandle> {
  return element.handle;
}

interface FindAllOptions {
  /**
   * Set to true to allow an empty result set.
   */
  allowEmpty: boolean;
}

/**
 * Finds all elements matching a selector.
 *
 * Unlike `page.findAll` or `element.findAll`, this util throws an error if no elements are found unless `allowEmpty` is set to true.
 *
 * @param pageOrElement
 * @param selector
 * @param options
 */
export async function findAll(
  pageOrElement: E2EPage | E2EElement,
  selector: string,
  options?: FindAllOptions,
): Promise<E2EElement[]> {
  // eslint-disable-next-line no-restricted-properties -- need to call the wrapped `findAll` method
  const matches = await pageOrElement.findAll(selector);
  const effectiveOptions = { allowEmpty: false, ...options };

  if (!effectiveOptions.allowEmpty && matches.length === 0) {
    throw new Error(`No elements found for selector: ${selector}`);
  }

  return matches;
}

/**
 * This util helps assert on a component's state at the time of an event firing.
 *
 * This is needed due to how Puppeteer works asynchronously, so the state at event emit-time might not be the same as the state at the time of the assertion.
 * When specified, the `eventListenerTarget` will be used to listen for the event instead of the component itself.
 *
 * Note: values returned can only be serializable values.
 *
 * @example
 *
 * it("props are updated on change emit", async () => {
 *   const page = await newE2EPage();
 *   await page.setContent(html`
 *     <calcite-combobox>
 *      <calcite-combobox-item value="A">A</calcite-combobox-item>
 *      <!-- ... -->
 *     </calcite-combobox>
 *   `);
 *   const propValueAsserter = await createEventTimePropValuesAsserter<Combobox>(
 *     page,
 *     {
 *       selector: "calcite-combobox-item",
 *       eventName: "calciteComboboxItemChange",
 *       props: ["selected"],
 *       eventListenerSelector: "calcite-combobox",
 *     },
 *     async (propValues) => {
 *       expect(propValues.selected).toBe(true)
 *     },
 *   );
 *   const combobox = await page.find("calcite-combobox");
 *   await element.click();
 *   await page.waitForChanges();
 *   const comboboxItem = await page.find("calcite-combobox-item#A");
 *   await comboboxItem.click();
 *   await page.waitForChanges();
 *
 *   await expect(propValueAsserter()).resolves.toBe(undefined);
 * });
 *
 * @param page
 * @param propValuesTarget
 * @param propValuesTarget.selector
 * @param propValuesTarget.eventName
 * @param propValuesTarget.props
 * @param propValuesTarget.eventListenerSelector
 * @param onEvent
 */
export async function createEventTimePropValuesAsserter<
  Component extends LitElement,
  El extends ToElement<Component> = ToElement<Component>,
  Keys extends Extract<keyof El, string> = Extract<keyof El, string>,
  Events extends string = Keys extends `calcite${string}` ? Keys : never,
  PropValues extends Record<Keys, El[Keys]> = Record<Keys, El[Keys]>,
>(
  page: E2EPage,
  propValuesTarget: {
    selector: ComponentTag | string;
    eventName: Events;
    props: Keys[];
    eventListenerSelector?: string;
  },
  onEvent: (propValues: PropValues) => Promise<void>,
): Promise<() => Promise<void>> {
  // we set this up early to we capture state as soon as the event fires
  const { selector, eventName, props, eventListenerSelector } = propValuesTarget;
  const callbackAfterEvent = page.$eval(
    selector,
    (element: El, eventName, props, eventListenerSelector) => {
      const targetEl = eventListenerSelector ? document.querySelector(eventListenerSelector) : element;
      return new Promise<PropValues>((resolve) => {
        targetEl.addEventListener(
          eventName,
          () => {
            const propValues = Object.fromEntries(props.map((prop) => [prop, element[prop]]));
            resolve(propValues as PropValues);
          },
          { once: true },
        );
      });
    },
    eventName,
    props,
    eventListenerSelector,
  );

  return () => callbackAfterEvent.then(onEvent);
}

/**
 * Awaits all unhandled events received by the spy
 *
 * @param spy
 */
export async function flushNextEvents(spy: EventSpy): Promise<void> {
  let event;
  do {
    ({ value: event } = await spy.next());
  } while (event !== undefined && event !== spy.lastEvent);
}
