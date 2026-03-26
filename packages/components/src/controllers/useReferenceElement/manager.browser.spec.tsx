import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { afterEach, describe, expect, it, vi } from "vitest";
import { afterNextFrame } from "../../tests/utils/timing";
import type { ReferenceElement } from "../../utils/floating-ui";
import { useReferenceElement } from "../useReferenceElement";
import { referenceElementManager } from "./manager";

afterEach(() => {
  vi.restoreAllMocks();
  document.body.querySelectorAll("button[data-testid='ref-el']").forEach((el) => el.remove());
});

describe("referenceElementManager", () => {
  it("registers a single click and keydown window listener when click and hover are enabled", async () => {
    const manager = referenceElementManager({ click: true, hover: true });
    const trigger = document.createElement("button");
    trigger.dataset.testid = "ref-el";
    document.body.append(trigger);

    const addListenerSpy = vi.spyOn(window, "addEventListener");
    const removeListenerSpy = vi.spyOn(window, "removeEventListener");

    class TestComponent extends LitElement {
      @property() open = false;

      @property() referenceElement: string | ReferenceElement | null = trigger;

      @property() triggerDisabled = false;

      @property() autoClose = false;

      @property() closeOnClick = false;

      @property() referenceEl: ReferenceElement | null = null;

      referenceElementType = "click" as const;

      referenceElementController = useReferenceElement({ manager })(this);

      override render(): JsxNode {
        return <div>test</div>;
      }
    }

    const { component } = await mount(TestComponent);

    await afterNextFrame();

    const clickAddCalls = addListenerSpy.mock.calls.filter(([type]) => type === "click");
    const keydownAddCalls = addListenerSpy.mock.calls.filter(([type]) => type === "keydown");

    expect(clickAddCalls).toHaveLength(1);
    expect(keydownAddCalls).toHaveLength(1);

    component.remove();

    await afterNextFrame();

    const clickRemoveCalls = removeListenerSpy.mock.calls.filter(([type]) => type === "click");
    const keydownRemoveCalls = removeListenerSpy.mock.calls.filter(([type]) => type === "keydown");

    expect(clickRemoveCalls).toHaveLength(1);
    expect(keydownRemoveCalls).toHaveLength(1);
  });

  it("invokes onReferenceElementKeydown and honors preventDefault", async () => {
    const manager = referenceElementManager({ click: true });
    const trigger = document.createElement("button");
    trigger.dataset.testid = "ref-el";
    document.body.append(trigger);

    const keydownHandlerSpy = vi.fn((event: KeyboardEvent) => {
      event.preventDefault();
    });

    class TestComponent extends LitElement {
      @property() open = false;

      @property() referenceElement: string | ReferenceElement | null = trigger;

      @property() triggerDisabled = false;

      @property() autoClose = false;

      @property() closeOnClick = false;

      @property() referenceEl: ReferenceElement | null = null;

      referenceElementType = "click" as const;

      onReferenceElementKeydown = keydownHandlerSpy;

      referenceElementController = useReferenceElement({ manager })(this);

      override render(): JsxNode {
        return <div>test</div>;
      }
    }

    const { component } = await mount(TestComponent);

    await afterNextFrame();

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );

    expect(keydownHandlerSpy).toHaveBeenCalledTimes(1);
    expect(component.open).toBe(false);
  });

  it("invokes onReferenceElementKeydown in hover-only mode", async () => {
    const manager = referenceElementManager({ hover: true });
    const trigger = document.createElement("button");
    trigger.dataset.testid = "ref-el";
    document.body.append(trigger);

    const keydownHandlerSpy = vi.fn();

    class TestComponent extends LitElement {
      @property() open = false;

      @property() referenceElement: string | ReferenceElement | null = trigger;

      @property() triggerDisabled = false;

      @property() autoClose = false;

      @property() closeOnClick = false;

      @property() referenceEl: ReferenceElement | null = null;

      referenceElementType = "hover" as const;

      onReferenceElementKeydown = keydownHandlerSpy;

      referenceElementController = useReferenceElement({ manager })(this);

      override render(): JsxNode {
        return <div>test</div>;
      }
    }

    await mount(TestComponent);

    await afterNextFrame();

    trigger.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true }),
    );

    expect(keydownHandlerSpy).toHaveBeenCalledTimes(1);
  });
});
