import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { referenceElementManager } from "./referenceElementManager";
import { ReferenceElementComponent, useReferenceElement } from "./useReferenceElement";

describe("useReferenceElement", () => {
  const refManager = referenceElementManager({ click: true });

  class ReferenceElement extends LitElement {
    render(): JsxNode {
      return <div>My Reference Element</div>;
    }
  }

  class TestComponent extends LitElement implements ReferenceElementComponent {
    @property() open = false;
    @property() referenceElement: string | HTMLElement;
    @property() referenceElementType: ReferenceElementComponent["referenceElementType"] = "click";
    @property() referenceEl: HTMLElement;
    referenceElementController = useReferenceElement(refManager)(this);

    render(): JsxNode {
      return <div>Hello world!</div>;
    }
  }

  it("register and resolves reference element", async () => {
    const { component } = await mount(TestComponent);
    component.referenceElement = document.createElement("div");
    await component.updateComplete;
    expect(component.referenceEl).toBeInstanceOf(HTMLElement);
    refManager.unregisterElement(component);
  });

  it("register and resolves string reference element", async () => {
    const { component: referenceElement } = await mount(ReferenceElement);
    referenceElement.el.id = "my-ref";
    await referenceElement.updateComplete;

    const { component } = await mount(TestComponent);
    component.referenceElement = "my-ref";
    await component.updateComplete;
    expect(component.referenceEl).toBeInstanceOf(HTMLElement);
    refManager.unregisterElement(component);
  });
});
