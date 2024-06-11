import * as openCloseComponent from "./openCloseComponent";
import { createTransitionEventDispatcher, TransitionEventDispatcher } from "./spec-helpers/transitionEvents";

const { onToggleOpenCloseComponent } = openCloseComponent;

describe("openCloseComponent", () => {
  describe("toggleOpenCloseComponent", () => {
    let dispatchTransitionEvent: TransitionEventDispatcher;

    beforeEach(() => {
      jest.spyOn(openCloseComponent, "internalReadTask").mockImplementation((task) => task(1337));
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

      // need to mock due to JSDOM issue with getComputedStyle - https://github.com/jsdom/jsdom/issues/3090
      window.getComputedStyle = jest.fn().mockReturnValue({
        transition: testTransition,
        transitionDuration: testDuration,
        transitionProperty: testProp,
      });
      window.document.body.append(transitionEl);

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
