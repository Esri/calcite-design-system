import { describe, expect, it, vi } from "vitest";
import { JsxNode, LitElement } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { waitForAnimationFrame } from "../tests/utils";
import { createControlledPromise } from "../tests/utils/promises";
import { onToggleOpenCloseComponent } from "./openCloseComponent";

describe("openCloseComponent", () => {
  describe("toggleOpenCloseComponent", () => {
    it("emits beforeOpen/beforeClose events when the transition starts and open/close events when the transition is done", async () => {
      const emittedEvents: string[] = [];

      class TestComponent extends LitElement {
        open = false;

        transitionEl!: HTMLDivElement;
        openProp = "open";
        transitionProp = "opacity" as const;

        onBeforeOpen(): void {
          emittedEvents.push("beforeOpen");
        }

        onOpen(): void {
          emittedEvents.push("open");
        }

        onBeforeClose(): void {
          emittedEvents.push("beforeClose");
        }

        onClose(): void {
          emittedEvents.push("close");
        }

        render(): JsxNode {
          return (
            <div
              ref={(el) => {
                if (!el) {
                  return;
                }
                this.transitionEl = el;
              }}
            />
          );
        }
      }

      const { component } = await mount(TestComponent);

      expect(emittedEvents).toEqual([]);

      const openingControlledPromise = createControlledPromise<void>();

      const getAnimationsSpy = vi.spyOn(component.transitionEl, "getAnimations");

      getAnimationsSpy.mockImplementation(() => [
        {
          transitionProperty: "opacity",
          finished: openingControlledPromise.promise,
        } as unknown as CSSTransition,
      ]);

      component.open = true;
      onToggleOpenCloseComponent(component);
      expect(emittedEvents).toEqual(["beforeOpen"]);

      openingControlledPromise.resolve();
      await waitForAnimationFrame();
      expect(emittedEvents).toEqual(["beforeOpen", "open"]);

      const closingControlledPromise = createControlledPromise<void>();
      getAnimationsSpy.mockImplementation(() => [
        {
          transitionProperty: "opacity",
          finished: closingControlledPromise.promise,
        } as unknown as CSSTransition,
      ]);

      component.open = false;
      onToggleOpenCloseComponent(component);

      expect(emittedEvents).toEqual(["beforeOpen", "open", "beforeClose"]);

      closingControlledPromise.resolve();
      await waitForAnimationFrame();

      expect(emittedEvents).toEqual(["beforeOpen", "open", "beforeClose", "close"]);
    });
  });
});
