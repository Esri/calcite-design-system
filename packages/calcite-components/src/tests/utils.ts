import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import type { JSX } from "../components";
import { BoundingBox } from "puppeteer";

/**
 * Util to help type global props for testing.
 */
export type GlobalTestProps<T> = T & Window & typeof globalThis;

type FilterPropsByPropertyName<T, PropName extends string> = {
  [K in keyof T]: PropName extends keyof T[K] ? T[K] : never;
};

/**
 * Helper to extract a type by filtering the type by the property name.
 */
export type IntrinsicElementsWithProp<T extends string> = FilterPropsByPropertyName<
  JSX.IntrinsicElements,
  T
>[keyof FilterPropsByPropertyName<JSX.IntrinsicElements, T>];

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
  options?: GetFocusedElementProp,
): Promise<ReturnType<E2EPage["evaluate"]>> {
  return await page.evaluate(
    (by: string, shadow: boolean) => {
      const { activeElement } = document;
      const target = shadow ? activeElement?.shadowRoot?.activeElement : activeElement;

      return target?.[by];
    },
    prop,
    options?.shadow,
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

/**
 * A list of colors to use in tests.
 */
export const colorList: string[] = [
  "rgb(76, 119, 173)",
  "rgb(193, 54, 91)",
  "rgb(249, 188, 199)",
  "rgb(207, 41, 244)",
  "rgb(56, 10, 119)",
  "rgb(214, 40, 237",
  "rgb(102, 160, 9)",
  "rgb(211, 74, 177)",
  "rgb(172, 54, 226)",
  "rgb(229, 218, 64)",
  "rgb(90, 11, 130)",
  "rgb(252, 42, 5)",
  "rgb(206, 35, 75)",
  "rgb(255, 144, 96)",
  "rgb(216, 0, 255)",
  "rgb(234, 227, 98)",
  "rgb(229, 212, 100)",
  "rgb(66, 255, 166)",
  "rgb(204, 63, 51)",
  "rgb(234, 105, 103)",
  "rgb(226, 164, 93)",
  "rgb(241, 244, 36)",
  "rgb(99, 99, 221)",
  "rgb(4, 54, 204)",
  "rgb(242, 230, 106)",
  "rgb(163, 29, 247)",
  "rgb(247, 232, 64)",
  "rgb(116, 65, 198)",
  "rgb(4, 158, 45)",
  "rgb(249, 192, 4)",
  "rgb(98, 18, 135)",
  "rgb(168, 43, 62)",
  "rgb(252, 164, 22)",
  "rgb(237, 189, 106)",
  "rgb(244, 150, 95)",
  "rgb(188, 221, 88)",
  "rgb(64, 209, 187)",
  "rgb(88, 181, 30)",
  "rgb(242, 107, 249)",
  "rgb(6, 232, 127)",
  "rgb(28, 131, 165)",
  "rgb(29, 193, 97)",
  "rgb(46, 136, 232)",
  "rgb(117, 0, 196)",
  "rgb(224, 195, 80)",
  "rgb(252, 88, 159)",
  "rgb(221, 88, 175)",
  "rgb(221, 148, 93)",
  "rgb(135, 38, 181)",
  "rgb(78, 197, 252)",
  "rgb(244, 78, 172)",
  "rgb(255, 108, 63)",
  "rgb(13, 232, 199)",
  "rgb(113, 61, 211)",
  "rgb(185, 219, 15)",
  "rgb(139, 90, 237)",
  "rgb(153, 37, 29)",
  "rgb(101, 221, 95)",
  "rgb(216, 131, 88)",
  "rgb(74, 124, 181)",
  "rgb(115, 175, 31)",
  "rgb(249, 49, 136)",
  "rgb(74, 27, 145)",
  "rgb(158, 15, 224)",
  "rgb(242, 77, 168)",
  "rgb(196, 69, 5)",
  "rgb(27, 112, 119)",
  "rgb(242, 94, 215)",
  "rgb(249, 29, 187)",
  "rgb(11, 170, 188)",
  "rgb(226, 216, 63)",
  "rgb(247, 214, 81)",
  "rgb(216, 189, 54)",
  "rgb(128, 98, 219)",
  "rgb(226, 6, 190)",
  "rgb(92, 214, 212)",
  "rgb(57, 10, 168)",
  "rgb(229, 194, 41)",
  "rgb(232, 192, 83)",
  "rgb(32, 75, 173)",
  "rgb(153, 7, 60)",
  "rgb(237, 137, 87)",
  "rgb(224, 74, 134)",
  "rgb(252, 20, 24)",
  "rgb(252, 235, 106)",
  "rgb(219, 80, 52)",
  "rgb(128, 79, 188)",
  "rgb(242, 124, 33)",
  "rgb(206, 24, 219)",
  "rgb(244, 244, 4)",
  "rgb(43, 229, 114)",
  "rgb(226, 220, 102)",
  "rgb(252, 50, 121)",
  "rgb(114, 255, 240)",
  "rgb(252, 244, 95)",
  "rgb(152, 75, 252)",
  "rgb(86, 70, 168)",
  "rgb(105, 177, 244)",
  "rgb(244, 147, 90)",
  "rgb(3, 135, 150)",
  "rgb(204, 121, 32)",
  "rgb(216, 108, 41)",
  "rgb(234, 42, 212)",
  "rgb(186, 1, 35)",
  "rgb(106, 252, 95)",
];
