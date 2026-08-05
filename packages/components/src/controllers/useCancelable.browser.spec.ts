import { it, expect, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { LitElement } from "@arcgis/lumina";
import { useCancelable } from "./useCancelable";

class TestComponent extends LitElement {
  cancelable = useCancelable<this>()(this);

  connectedCallback() {
    super.connectedCallback();
    this.cancelable.add({ cancel: vi.fn() });
    this.cancelable.add([{ cancel: vi.fn() }, { cancel: vi.fn() }]);
  }
}

it("should cancel all resources added by the component during connectedCallback on disconnect", async () => {
  const { component, el } = await mount(TestComponent);
  const { resources } = component.cancelable;

  expect(resources.size).toBe(3);

  const cancelSpies = Array.from(resources).map((resource) => vi.spyOn(resource, "cancel"));

  el.remove();

  cancelSpies.forEach((cancelSpy) => {
    expect(cancelSpy).toHaveBeenCalledTimes(1);
  });
});

it("should cancel a managed resource through the controller", async () => {
  const { component } = await mount(TestComponent);
  const resource = Array.from(component.cancelable.resources)[0];
  const cancelSpy = vi.spyOn(resource, "cancel");

  component.cancelable.cancelResource(resource);

  expect(cancelSpy).toHaveBeenCalledTimes(1);
});
