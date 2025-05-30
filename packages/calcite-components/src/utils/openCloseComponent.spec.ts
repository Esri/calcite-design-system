import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { waitForAnimationFrame } from "../tests/utils/timing";
import { createControlledPromise } from "../tests/utils/promises";
import * as openCloseComponent from "./openCloseComponent";

const { onToggleOpenCloseComponent } = openCloseComponent;

describe("openCloseComponent", () => {
  describe("toggleOpenCloseComponent", () => {
    beforeEach(() => {
      vi.spyOn(global, "requestAnimationFrame").mockImplementation((cb) => {
        cb(0);
        return 0;
      });
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    it("emits beforeOpen/beforeClose events when the transition starts and open/close events when the transition is done", async () => {
      const transitionEl = window.document.createElement("div");
      const emittedEvents: string[] = [];
      const fakeOpenCloseComponent = {
        el: document.createElement("div"),
        open: true,
        transitionProp: "opacity" as const,
        openTransitionProp: "open",
        transitionEl,
        onBeforeOpen: vi.fn(() => emittedEvents.push("beforeOpen")),
        onOpen: vi.fn(() => emittedEvents.push("open")),
        onBeforeClose: vi.fn(() => emittedEvents.push("beforeClose")),
        onClose: vi.fn(() => emittedEvents.push("close")),
      };

      const openingControlledPromise = createControlledPromise<void>();

      fakeOpenCloseComponent.transitionEl.getAnimations = () => [
        {
          transitionProperty: "opacity",
          finished: openingControlledPromise.promise,
        } as unknown as CSSTransition,
      ];

      onToggleOpenCloseComponent(fakeOpenCloseComponent);
      expect(emittedEvents).toEqual(["beforeOpen"]);

      openingControlledPromise.resolve();
      await waitForAnimationFrame();
      expect(emittedEvents).toEqual(["beforeOpen", "open"]);

      const closingControlledPromise = createControlledPromise<void>();
      fakeOpenCloseComponent.transitionEl.getAnimations = () => [
        {
          transitionProperty: "opacity",
          finished: closingControlledPromise.promise,
        } as unknown as CSSTransition,
      ];

      fakeOpenCloseComponent.open = false;
      onToggleOpenCloseComponent(fakeOpenCloseComponent);

      expect(emittedEvents).toEqual(["beforeOpen", "open", "beforeClose"]);

      closingControlledPromise.resolve();
      await waitForAnimationFrame();

      expect(emittedEvents).toEqual(["beforeOpen", "open", "beforeClose", "close"]);
    });
  });
});
