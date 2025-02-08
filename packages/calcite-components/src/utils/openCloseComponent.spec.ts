import { createTransitionEventDispatcher, TransitionEventDispatcher } from "../tests/spec-helpers/transitionEvents";
import { mockGetComputedStyleFor } from "../tests/spec-helpers/computedStyle";
import * as openCloseComponent from "./openCloseComponent";

const { onToggleOpenCloseComponent } = openCloseComponent;

describe("openCloseComponent", () => {
  describe("toggleOpenCloseComponent", () => {
    let dispatchTransitionEvent: TransitionEventDispatcher;

    beforeEach(() => {
      jest.spyOn(global, "requestAnimationFrame").mockImplementation((cb) => {
        cb(0);
        return 0;
      });
      dispatchTransitionEvent = createTransitionEventDispatcher();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("emits beforeOpen/beforeClose events when the transition starts and open/close events when the transition is done", async () => {
      const transitionEl = window.document.createElement("div");
      const testProp = "opacity";
      const testDuration = "0.5s";
      const testTransition = `${testProp} ${testDuration} ease 0s`;

      transitionEl.style.transition = testTransition;
      window.document.body.append(transitionEl);
      mockGetComputedStyleFor(transitionEl, {
        transition: testTransition,
        transitionDuration: testDuration,
        transitionProperty: testProp,
      });

      const emittedEvents: string[] = [];
      const fakeOpenCloseComponent = {
        el: document.createElement("div"),
        open: true,
        openTransitionProp: "opacity",
        transitionEl,
        onBeforeOpen: jest.fn(() => emittedEvents.push("beforeOpen")),
        onOpen: jest.fn(() => emittedEvents.push("open")),
        onBeforeClose: jest.fn(() => emittedEvents.push("beforeClose")),
        onClose: jest.fn(() => emittedEvents.push("close")),
      };

      onToggleOpenCloseComponent(fakeOpenCloseComponent);
      expect(emittedEvents).toEqual([]);

      dispatchTransitionEvent(transitionEl, "transitionstart", fakeOpenCloseComponent.openTransitionProp);
      expect(emittedEvents).toEqual(["beforeOpen"]);

      dispatchTransitionEvent(transitionEl, "transitionend", fakeOpenCloseComponent.openTransitionProp);
      expect(emittedEvents).toEqual(["beforeOpen", "open"]);

      fakeOpenCloseComponent.open = false;

      onToggleOpenCloseComponent(fakeOpenCloseComponent);
      expect(emittedEvents).toEqual(["beforeOpen", "open"]);

      dispatchTransitionEvent(transitionEl, "transitionstart", fakeOpenCloseComponent.openTransitionProp);
      expect(emittedEvents).toEqual(["beforeOpen", "open", "beforeClose"]);

      dispatchTransitionEvent(transitionEl, "transitionend", fakeOpenCloseComponent.openTransitionProp);
      expect(emittedEvents).toEqual(["beforeOpen", "open", "beforeClose", "close"]);
    });
  });
});
