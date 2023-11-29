import {
  activateFocusTrap,
  connectFocusTrap,
  deactivateFocusTrap,
  FocusTrapComponent,
  updateFocusTrapElements,
} from "./focusTrapComponent";

import { JSDOM } from "jsdom";
import { CalciteConfig } from "./config";
import { GlobalTestProps } from "../tests/utils";

describe("focusTrapComponent", () => {
  it("focusTrapComponent lifecycle", () => {
    const fakeComponent = {} as FocusTrapComponent;
    fakeComponent.el = document.createElement("div");

    connectFocusTrap(fakeComponent);

    expect(fakeComponent.el).toBeDefined();
    expect(fakeComponent.focusTrap.active).toBe(false);

    const activateSpy = jest.fn();
    fakeComponent.focusTrap.activate = activateSpy;

    const deactivateSpy = jest.fn();
    fakeComponent.focusTrap.deactivate = deactivateSpy;

    const updateSpy = jest.fn();
    fakeComponent.focusTrap.updateContainerElements = updateSpy;

    activateFocusTrap(fakeComponent);
    expect(activateSpy).toHaveBeenCalledTimes(1);

    updateFocusTrapElements(fakeComponent);
    expect(updateSpy).toHaveBeenCalledTimes(1);

    deactivateFocusTrap(fakeComponent);
    expect(deactivateSpy).toHaveBeenCalledTimes(1);
  });

  it("supports passing options", () => {
    const fakeComponent = {} as FocusTrapComponent;
    fakeComponent.el = document.createElement("div");

    connectFocusTrap(fakeComponent);

    const activateSpy = jest.fn();
    fakeComponent.focusTrap.activate = activateSpy;

    const deactivateSpy = jest.fn();
    fakeComponent.focusTrap.deactivate = deactivateSpy;

    const fakeActivateOptions = {};
    activateFocusTrap(fakeComponent, fakeActivateOptions);
    expect(activateSpy).toHaveBeenCalledWith(fakeActivateOptions);

    const fakeDeactivateOptions = {};
    deactivateFocusTrap(fakeComponent, fakeDeactivateOptions);
    expect(deactivateSpy).toHaveBeenCalledWith(fakeDeactivateOptions);
  });

  describe("configuration", () => {
    beforeEach(() => jest.resetModules());

    it("supports custom global trap stack", async () => {
      const customFocusTrapStack = [];

      // we clobber Stencil's custom Mock document implementation
      const { window: win } = new JSDOM();
      window = win as any; // make window references use JSDOM
      globalThis.MutationObserver = window.MutationObserver; // needed for focus-trap

      type TestGlobal = GlobalTestProps<{ calciteConfig: CalciteConfig }>;

      (globalThis as TestGlobal).calciteConfig = {
        focusTrapStack: customFocusTrapStack,
      };

      const focusTrap = await import("focus-trap");
      const createFocusTrapSpy = jest.spyOn(focusTrap, "createFocusTrap");

      const focusTrapComponent = await import("./focusTrapComponent");
      const fakeComponent = {} as FocusTrapComponent;
      fakeComponent.el = win.document.createElement("div");

      focusTrapComponent.connectFocusTrap(fakeComponent);
      expect(createFocusTrapSpy).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({
          trapStack: customFocusTrapStack,
        })
      );
      expect(customFocusTrapStack).toHaveLength(0);

      focusTrapComponent.activateFocusTrap(fakeComponent);
      expect(customFocusTrapStack).toHaveLength(1);

      focusTrapComponent.deactivateFocusTrap(fakeComponent);
      expect(customFocusTrapStack).toHaveLength(0);

      focusTrapComponent.activateFocusTrap(fakeComponent);
      expect(customFocusTrapStack).toHaveLength(1);
    });
  });
});
