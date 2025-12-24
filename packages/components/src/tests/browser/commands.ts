import type { Plugin } from "vitest/config";
import type { BrowserCommand } from "vitest/node";
import type { Mouse } from "playwright";

declare module "vitest/browser" {
  interface BrowserCommands {
    /**
     * Moves the mouse to the specified coordinates.
     */
    mouseMove: (x: number, y: number, options?: Parameters<Mouse["move"]>[2]) => Promise<void>;

    /**
     * Presses the mouse button down.
     */
    mouseDown: (options?: Parameters<Mouse["down"]>[0]) => Promise<void>;

    /**
     * Releases the mouse button up.
     */
    mouseUp: (options?: Parameters<Mouse["up"]>[0]) => Promise<void>;
  }
}

const mouseMove: BrowserCommand<[x: number, y: number, options?: Parameters<Mouse["move"]>[2]]> = async (
  { page, provider },
  x,
  y,
  options,
) => {
  if (provider.name === "playwright") {
    await page.mouse.move(x, y, options);
    return;
  }

  throw new Error(`provider ${provider.name} is not supported`);
};

const mouseDown: BrowserCommand<[options?: Parameters<Mouse["down"]>[0]]> = async ({ page, provider }, options) => {
  if (provider.name === "playwright") {
    await page.mouse.down(options);
    return;
  }

  throw new Error(`provider ${provider.name} is not supported`);
};

const mouseUp: BrowserCommand<[options?: Parameters<Mouse["up"]>[0]]> = async ({ page, provider }, options) => {
  if (provider.name === "playwright") {
    await page.mouse.up(options);
    return;
  }

  throw new Error(`provider ${provider.name} is not supported`);
};

export default function BrowserCommands(): Plugin {
  return {
    name: "vitest:custom-commands",
    config() {
      return {
        test: {
          browser: {
            commands: {
              mouseMove,
              mouseDown,
              mouseUp,
            },
          },
        },
      };
    },
  };
}
