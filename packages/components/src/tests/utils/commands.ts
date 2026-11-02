import { mouse } from "vitest-browser-commands/playwright";

export const commands = {
  mouseMove: mouse.move,
  mouseDown: mouse.down,
  mouseUp: mouse.up,
};
