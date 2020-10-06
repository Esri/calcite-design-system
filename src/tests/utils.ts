import { E2EPage } from "@stencil/core/testing";
import { BoundingBox, JSONObject } from "puppeteer";

type DragAndDropSelector = string | SelectorOptions;

type PointerPosition = {
  vertical: "bottom" | "center" | "top";
};

interface SelectorOptions extends JSONObject {
  element: string;
  shadow?: string;
  pointerPosition?: PointerPosition;
}

type MouseInitEvent = Pick<
  MouseEvent,
  "bubbles" | "cancelable" | "composed" | "screenX" | "screenY" | "clientX" | "clientY"
>;

/* based on https://github.com/puppeteer/puppeteer/issues/1366#issuecomment-615887204 */
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
    const { vertical: verticalPos }: PointerPosition =
      typeof selector === "string" || !selector.pointerPosition ? { vertical: "center" } : selector.pointerPosition;
    const { height, width, x, y } = await getBounds(selector);
    const verticalOffset = verticalPos === "top" ? 0 : verticalPos === "bottom" ? height : height / 2;

    const eventX = x + width / 2;
    const eventY = y + verticalOffset;

    return {
      bubbles: true,
      cancelable: true,
      composed: true,
      screenX: eventX,
      screenY: eventY,
      clientX: eventX,
      clientY: eventY
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

    await new Promise((resolve) => setTimeout(resolve, 2000));

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
