// @ts-strict-ignore
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DetachedWindowAPI, Window as HappyDOMWindow } from "happy-dom";
import { GlobalThis } from "type-fest";
import { GlobalTestProps } from "../tests/utils/puppeteer";
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

  describe("focusTrapOptions", () => {
    let happyDOM: DetachedWindowAPI;
    let fakeComponent: FocusTrapComponent;
    let insideButton: HTMLButtonElement;
    let previousFocusedEl: HTMLInputElement;
    let nextFocusedEl: HTMLInputElement;

    function setUpTest(options: Parameters<typeof connectFocusTrap>[1]): void {
      fakeComponent = {} as FocusTrapComponent;
      fakeComponent.el = document.createElement("div");
      insideButton = document.createElement("button");
      insideButton.id = "inside-button";
      fakeComponent.el.append(insideButton);
      previousFocusedEl = document.createElement("input");
      nextFocusedEl = document.createElement("input");
      document.body.append(nextFocusedEl, previousFocusedEl, fakeComponent.el);
      previousFocusedEl.focus();

      connectFocusTrap(fakeComponent, options);
    }

    beforeEach(() => {
      happyDOM = (globalThis as GlobalThis & HappyDOMWindow).happyDOM;
    });

    describe("setReturnFocus option", () => {
      it("should use custom setReturnFocus function if provided", async () => {
        setUpTest({
          focusTrapOptions: {
            setReturnFocus: () => nextFocusedEl,
          },
        });

        activateFocusTrap(fakeComponent);
        await happyDOM.waitUntilComplete();

        expect(document.activeElement).toBe(insideButton);

        deactivateFocusTrap(fakeComponent);
        await happyDOM.waitUntilComplete();

        expect(document.activeElement).toBe(nextFocusedEl);
      });

      it("allows disabling return focus behavior", async () => {
        setUpTest({
          focusTrapOptions: {
            setReturnFocus: false,
          },
        });

        activateFocusTrap(fakeComponent);
        await happyDOM.waitUntilComplete();

        expect(document.activeElement).toBe(insideButton);

        deactivateFocusTrap(fakeComponent);
        await happyDOM.waitUntilComplete();

        expect(document.activeElement).toBe(insideButton);
      });

      it("should use default setReturnFocus if custom function is not provided", async () => {
        setUpTest({
          focusTrapOptions: {
            setReturnFocus: undefined,
          },
        });

        activateFocusTrap(fakeComponent);
        await happyDOM.waitUntilComplete();

        expect(document.activeElement).toBe(insideButton);

        deactivateFocusTrap(fakeComponent);
        await happyDOM.waitUntilComplete();

        expect(document.activeElement).toBe(previousFocusedEl);
      });
    });
  });
});
