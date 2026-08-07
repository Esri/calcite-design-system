import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import { afterNextFrame } from "../../tests/utils/timing";
import type { ReferenceElement } from "../useFloatingUi";
import { useReferenceElement } from "../useReferenceElement";
import { referenceElementManager } from "./manager";

afterEach(async () => {
  vi.restoreAllMocks();
});

describe("referenceElementManager", () => {
  it("registers a single click and keydown window listener when click and hover are enabled", async () => {
    const manager = referenceElementManager({ click: true, hover: true });
    const trigger = document.createElement("button");
    trigger.dataset.testid = "ref-el";

    const addListenerSpy = vi.spyOn(window, "addEventListener");
    const removeListenerSpy = vi.spyOn(window, "removeEventListener");

    class TestComponent extends LitElement {
      @property() open = false;

      @property() referenceElement: string | ReferenceElement | undefined = trigger;

      @property() triggerDisabled = false;

      @property() autoClose = false;

      @property() closeOnClick = false;

      @property() referenceEl: ReferenceElement | undefined;

      referenceElementType = "click" as const;

      referenceElementController = useReferenceElement({ manager })(this);

      override render(): JsxNode {
        return <div>test</div>;
      }
    }

    const { component, container } = await mount(TestComponent);
    container.append(trigger);

    await afterNextFrame();

    const clickAddCalls = addListenerSpy.mock.calls.filter(([type]) => type === "click");
    const keydownAddCalls = addListenerSpy.mock.calls.filter(([type]) => type === "keydown");

    expect(clickAddCalls).toHaveLength(1);
    expect(keydownAddCalls).toHaveLength(1);

    component.el.remove();

    await afterNextFrame();

    const clickRemoveCalls = removeListenerSpy.mock.calls.filter(([type]) => type === "click");
    const keydownRemoveCalls = removeListenerSpy.mock.calls.filter(([type]) => type === "keydown");

    expect(clickRemoveCalls).toHaveLength(1);
    expect(keydownRemoveCalls).toHaveLength(1);
  });

  it("invokes onReferenceElementKeyDown and honors preventDefault", async () => {
    const manager = referenceElementManager({ click: true });
    const trigger = document.createElement("button");
    trigger.dataset.testid = "ref-el";

    const keydownHandlerSpy = vi.fn((event: KeyboardEvent) => {
      event.preventDefault();
    });

    class TestComponent extends LitElement {
      @property() open = false;

      @property() referenceElement: string | ReferenceElement | undefined = trigger;

      @property() triggerDisabled = false;

      @property() autoClose = false;

      @property() closeOnClick = false;

      @property() referenceEl: ReferenceElement | undefined;

      referenceElementType = "click" as const;

      onReferenceElementKeyDown = keydownHandlerSpy;

      referenceElementController = useReferenceElement({ manager })(this);
    }

    const { component, container } = await mount(TestComponent);
    container.append(trigger);

    await afterNextFrame();

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );

    expect(keydownHandlerSpy).toHaveBeenCalledTimes(1);
    expect(component.open).toBe(false);
  });

  it("invokes onReferenceElementKeyDown in hover-only mode", async () => {
    const manager = referenceElementManager({ hover: true });
    const trigger = document.createElement("button");
    trigger.dataset.testid = "ref-el";

    const keydownHandlerSpy = vi.fn();

    class TestComponent extends LitElement {
      @property() open = false;

      @property() referenceElement: string | ReferenceElement | undefined = trigger;

      @property() triggerDisabled = false;

      @property() autoClose = false;

      @property() closeOnClick = false;

      @property() referenceEl: ReferenceElement | undefined;

      referenceElementType = "hover" as const;

      onReferenceElementKeyDown = keydownHandlerSpy;

      referenceElementController = useReferenceElement({ manager })(this);

      override render(): JsxNode {
        return <div>test</div>;
      }
    }

    const { container } = await mount(TestComponent);
    container.append(trigger);

    await afterNextFrame();

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );

    expect(keydownHandlerSpy).toHaveBeenCalledTimes(1);
  });
});
