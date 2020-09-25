import { E2EPage } from "@stencil/core/testing";
import { BoundingBox, JSONObject } from "puppeteer";

type DragAndDropSelector = string | ShadowedSelectorOptions;

interface ShadowedSelectorOptions extends JSONObject {
  host: string;
  shadow: string;
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
        : await page.evaluateHandle(
            (selector) => document.querySelector(selector.host).shadowRoot.querySelector(selector.shadow),
            selector
          );

    return elementHandle.asElement().boundingBox();
  }

  async function createEventInitializer(selector: DragAndDropSelector): Promise<MouseInitEvent> {
    const { height, width, x, y } = await getBounds(selector);

    const eventX = x + width / 2;
    const eventY = y + height;

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
    const dragStart =
      typeof dragStartSelector === "string"
        ? document.querySelector(dragStartSelector)
        : document.querySelector(dragStartSelector.host).shadowRoot.querySelector(dragStartSelector.shadow);

    let dragEnd =
      typeof dragEndSelector === "string"
        ? document.querySelector(dragEndSelector)
        : document.querySelector(dragEndSelector.host).shadowRoot.querySelector(dragEndSelector.shadow);

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
