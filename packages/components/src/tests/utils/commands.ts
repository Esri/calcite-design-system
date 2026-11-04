import { mouse } from "vitest-browser-commands/playwright";
import { cdp, page } from "vitest/browser";

let touchActive = false;

async function pointerClick(pointerType: "touch" | "pen", selector: string): Promise<void> {
  const bounds = page.getBySelector(selector).element().getBoundingClientRect();
  const x = bounds.x + bounds.width / 2;
  const y = bounds.y + bounds.height / 2;
  await pointerInput(pointerType, "down", x, y);
  await pointerInput(pointerType, "up", x, y);
}

async function pointerInput(
  pointerType: "touch" | "pen",
  phase: "down" | "move" | "up",
  clientX: number,
  clientY: number,
): Promise<void> {
  const frame = window.frameElement as HTMLIFrameElement;
  const frameBounds = frame.getBoundingClientRect();
  const scale = frameBounds.width / frame.offsetWidth;
  const x = frameBounds.x + clientX * scale;
  const y = frameBounds.y + clientY * scale;
  const session = cdp();
  if (pointerType === "touch") {
    if (phase === "up" && !touchActive) {
      return;
    }
    await session.send("Input.dispatchTouchEvent", {
      type: phase === "down" ? "touchStart" : phase === "move" ? "touchMove" : "touchEnd",
      touchPoints: phase === "up" ? [] : [{ x, y }],
    });
    touchActive = phase !== "up";
  } else {
    await session.send("Input.dispatchMouseEvent", {
      type: phase === "down" ? "mousePressed" : phase === "move" ? "mouseMoved" : "mouseReleased",
      x,
      y,
      button: "left",
      buttons: phase === "up" ? 0 : 1,
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
  pointerInput,
};
