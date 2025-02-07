// @ts-strict-ignore
import { describe, expect, it, afterEach, beforeEach, vi } from "vitest";
import { GlobalTestProps } from "../tests/utils";
import {
  activateFocusTrap,
  connectFocusTrap,
  deactivateFocusTrap,
  FocusTrapComponent,
  updateFocusTrapElements,
} from "./focusTrapComponent";
import { CalciteConfig } from "./config";

describe("focusTrapComponent", () => {
  it("focusTrapComponent lifecycle", () => {
    const fakeComponent = {} as FocusTrapComponent;
    fakeComponent.el = document.createElement("div");

    connectFocusTrap(fakeComponent);

    expect(fakeComponent.el).toBeDefined();
    expect(fakeComponent.focusTrap.active).toBe(false);

    const activateSpy = vi.fn();
    fakeComponent.focusTrap.activate = activateSpy;

    const deactivateSpy = vi.fn();
    fakeComponent.focusTrap.deactivate = deactivateSpy;

    const updateSpy = vi.fn();
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

    const activateSpy = vi.fn();
    fakeComponent.focusTrap.activate = activateSpy;

    const deactivateSpy = vi.fn();
    fakeComponent.focusTrap.deactivate = deactivateSpy;

    const fakeActivateOptions = {};
    activateFocusTrap(fakeComponent, fakeActivateOptions);
    expect(activateSpy).toHaveBeenCalledWith(fakeActivateOptions);

    const fakeDeactivateOptions = {};
    deactivateFocusTrap(fakeComponent, fakeDeactivateOptions);
    expect(deactivateSpy).toHaveBeenCalledWith(fakeDeactivateOptions);
  });

  describe("configuration", () => {
    beforeEach(() => {
      vi.resetModules();
    });

    afterEach(() => {
      vi.unmock("focus-trap");
    });

    it("supports custom global trap stack", async () => {
      const customFocusTrapStack = [];

      type TestGlobal = GlobalTestProps<{ calciteConfig: Pick<CalciteConfig, "focusTrapStack"> }>;

      (globalThis as TestGlobal).calciteConfig = {
        focusTrapStack: customFocusTrapStack,
      };

      vi.mock("focus-trap", async () => {
        const actual = await vi.importActual<typeof import("focus-trap")>("focus-trap");
        return {
          ...actual,
          createFocusTrap: vi.fn(actual.createFocusTrap),
        };
      });

      const focusTrap = await import("focus-trap");
      const createFocusTrapSpy = vi.spyOn(focusTrap, "createFocusTrap");

      const focusTrapComponent = await import("./focusTrapComponent");
      const fakeComponent = {} as FocusTrapComponent;
      fakeComponent.el = document.createElement("div");

      focusTrapComponent.connectFocusTrap(fakeComponent);
      expect(createFocusTrapSpy).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({
          trapStack: customFocusTrapStack,
        }),
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
  describe("focusTrapDisabledOverride", () => {
    const fakeComponent = {} as FocusTrapComponent;
    let activateSpy: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      fakeComponent.el = document.createElement("div");

      connectFocusTrap(fakeComponent);

      activateSpy = vi.fn();
      fakeComponent.focusTrap.activate = activateSpy;
    });

    it("should activate focus trap when focusTrapDisabledOverride returns false", () => {
      fakeComponent.focusTrapDisabledOverride = () => false;

      activateFocusTrap(fakeComponent);

      expect(activateSpy).toHaveBeenCalledTimes(1);
    });

    it("should not activate focus trap when focusTrapDisabledOverride returns true", () => {
      fakeComponent.focusTrapDisabledOverride = () => true;

      activateFocusTrap(fakeComponent);

      expect(activateSpy).toHaveBeenCalledTimes(0);
    });
  });
});
