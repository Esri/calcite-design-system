import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { waitForAnimationFrame } from "../tests/utils";
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

      function createFinishedPromise(): [Promise<void>, () => void] {
        let resolver: () => void;
        const finishedPromise = new Promise<void>((resolve) => (resolver = resolve));
        return [finishedPromise, resolver];
      }

      const [finishedPromise, resolveFinishedPromise] = createFinishedPromise();

      fakeOpenCloseComponent.transitionEl.getAnimations = () => [
        {
          transitionProperty: "opacity",
          finished: finishedPromise,
        } as unknown as CSSTransition,
      ];

      onToggleOpenCloseComponent(fakeOpenCloseComponent);
      expect(emittedEvents).toEqual(["beforeOpen"]);

      resolveFinishedPromise();
      await waitForAnimationFrame();
      expect(emittedEvents).toEqual(["beforeOpen", "open"]);

      fakeOpenCloseComponent.transitionEl.getAnimations = () => [
        {
          transitionProperty: "opacity",
          finished: finishedPromise,
        } as unknown as CSSTransition,
      ];

      fakeOpenCloseComponent.open = false;
      onToggleOpenCloseComponent(fakeOpenCloseComponent);

      expect(emittedEvents).toEqual(["beforeOpen", "open", "beforeClose"]);

      resolveFinishedPromise();
      await waitForAnimationFrame();

      expect(emittedEvents).toEqual(["beforeOpen", "open", "beforeClose", "close"]);
    });
  });
});
