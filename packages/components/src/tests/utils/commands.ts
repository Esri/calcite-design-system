import { mouse } from "vitest-browser-commands/playwright";
import { cdp, page } from "vitest/browser";

async function pointerClick(pointerType: "touch" | "pen", selector: string): Promise<void> {
  const bounds = page.getBySelector(selector).element().getBoundingClientRect();
  const frame = window.frameElement as HTMLIFrameElement;
  const frameBounds = frame.getBoundingClientRect();
  const scale = frameBounds.width / frame.offsetWidth;
  const x = frameBounds.x + (bounds.x + bounds.width / 2) * scale;
  const y = frameBounds.y + (bounds.y + bounds.height / 2) * scale;
  const session = cdp();
  if (pointerType === "touch") {
    await session.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  } else {
    await session.send("Input.dispatchMouseEvent", {
      type: "mousePressed",
      x,
      y,
      button: "left",
      buttons: 1,
      clickCount: 1,
      pointerType,
    });
    await session.send("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      x,
      y,
      button: "left",
      buttons: 0,
      clickCount: 1,
      pointerType,
    });
  }
}

export const commands = {
  mouseMove: mouse.move,
  mouseDown: mouse.down,
  mouseUp: mouse.up,
  pointerClick,
};
