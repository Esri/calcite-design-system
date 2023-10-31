import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { BoundingBox, JSONObject } from "puppeteer";

/**
 * Util to help type global props for testing.
 */
export type GlobalTestProps<T> = T & Window & typeof globalThis;

type DragAndDropSelector = string | SelectorOptions;

type PointerPosition = {
  vertical?: "bottom" | "center" | "top";
  horizontal?: "left" | "center" | "right";
  offset?: [number, number];
};

// type ElementDOMRect = {
//   left : number,
//   top :number,
//   right : number,
//   bottom : number,
//   height:number,
//   width:number,
//   x:number,
//   y:number
// }

interface SelectorOptions extends JSONObject {
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
  dragEndSelector: DragAndDropSelector
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
    dragEndInitializer: MouseInitEvent
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
    await createEventInitializer(dragEndSelector)
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
 */
export async function getElementXY(
  page: E2EPage,
  elementSelector: string,
  shadowSelector?: string
): Promise<[number, number]> {
  return page.evaluate(
    ([elementSelector, shadowSelector]): [number, number] => {
      const element = document.querySelector(elementSelector);
      const measureTarget = shadowSelector ? element.shadowRoot.querySelector(shadowSelector) : element;
      const { x, y } = measureTarget.getBoundingClientRect();

      return [x, y];
    },
    [elementSelector, shadowSelector]
  );
}

/**
 * Helper to get an E2EElement's DOMRect object.
 *
 * @param {E2EPage} page - the e2e page
 * @param {string} elementSelector - the element selector
 * @param {string} shadowSelector - the shadowRoot selector
 */
export async function getElementRect(
  page: E2EPage,
  elementSelector: string,
  shadowSelector?: string
): Promise<DOMRect> {
  return page.evaluate(
    ([elementSelector, shadowSelector]): DOMRect => {
      const element = document.querySelector(elementSelector);
      const measureTarget = shadowSelector ? element.shadowRoot.querySelector(shadowSelector) : element;
      const targetDOMRect = measureTarget.getBoundingClientRect().toJSON();
      return targetDOMRect;
    },
    [elementSelector, shadowSelector]
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
 *
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
        event.preventDefault();
        console.log("mouse movedddddd", event.pageX, event.pageY, event.buttons);
        box.style.left = event.pageX + "px";
        box.style.top = event.pageY + "px";
        updateButtons(event.buttons);
      },
      true
    );

    document.addEventListener(
      "mousedown",
      (event) => {
        console.log("mousedown", event.buttons, event.which);
        updateButtons(event.buttons);
        box.classList.add("button-" + event.which);
      },
      true
    );

    document.addEventListener(
      "mouseup",
      (event) => {
        console.log("mouseup", event.buttons, event.which);
        updateButtons(event.buttons);
        box.classList.remove("button-" + event.which);
      },
      true
    );

    function updateButtons(buttons: number): void {
      for (let i = 0; i < 5; i++) {
        box.classList.toggle("button-" + i, (buttons & (1 << i)) as unknown as boolean);
      }
    }
  });
}

/**
 * Tells the browser that you wish to perform an animation.
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 *
 * @returns {Promise<void>}
 */
export async function waitForAnimationFrame(): Promise<void> {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

/**
 * Creates an E2E page for tests that need to create and set up elements programmatically.
 *
 * @returns {Promise<E2EPage>} an e2e page
 */
export async function newProgrammaticE2EPage(): Promise<E2EPage> {
  const page = await newE2EPage();
  // we need to initialize the page with any component to ensure they are available in the browser context
  await page.setContent("<calcite-icon></calcite-icon>");
  await page.evaluate(() => document.querySelector("calcite-icon").remove());

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
 *
 * @param page
 */
export async function skipAnimations(page: E2EPage): Promise<void> {
  await page.addStyleTag({
    // using 0.01 to ensure `openCloseComponent` utils work consistently
    // this should be removed once https://github.com/Esri/calcite-design-system/issues/6604 is addressed
    content: `:root { --calcite-duration-factor: 0.01; }`,
  });
}

interface MatchesFocusedElementOptions {
  /**
   * Set this to true when the focused element is expected to reside in the shadow DOM
   */
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
  options?: MatchesFocusedElementOptions
): Promise<boolean> {
  const shadowed = options?.shadowed;

  return page.evaluate(
    (selector: string, shadowed: boolean): boolean => {
      const targetDoc = shadowed ? document.activeElement?.shadowRoot : document;

      return !!targetDoc?.activeElement?.matches(selector);
    },
    selector,
    shadowed
  );
}

type GetFocusedElementProp = {
  /**
   * Set to true to use the shadow root's active element instead of the light DOM's.
   */
  shadow: boolean;
};

/**
 * This helps get serializable properties from the focused element.
 *
 * @param {E2EPage} page - the E2E test page
 * @param {string} prop - the property to get from the focused element (note: must be serializable)
 * @param {GetFocusedElementProp} options – additional configuration options
 */
export async function getFocusedElementProp(
  page: E2EPage,
  prop: keyof HTMLElement,
  options?: GetFocusedElementProp
): Promise<ReturnType<E2EPage["evaluate"]>> {
  return await page.evaluate(
    (by: string, shadow: boolean) => {
      const { activeElement } = document;
      const target = shadow ? activeElement?.shadowRoot?.activeElement : activeElement;

      return target?.[by];
    },
    prop,
    options?.shadow
  );
}

/**
 * Custom integer matcher to use with object matchers.
 *
 * @see https://jasmine.github.io/tutorials/custom_argument_matchers
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
 * @see https://jasmine.github.io/tutorials/custom_argument_matchers
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
