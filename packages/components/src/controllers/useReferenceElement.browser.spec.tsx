import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { referenceElementManager } from "./referenceElementManager";
import { ReferenceElementComponent, useReferenceElement } from "./useReferenceElement";

describe("useReferenceElement", () => {
  const refClickManager = referenceElementManager({ click: true });
  const refHoverManager = referenceElementManager({ hover: true });

  class ReferenceElement extends LitElement {
    render(): JsxNode {
      return <div>My Reference Element</div>;
    }
  }

  class TestClickComponent extends LitElement implements ReferenceElementComponent {
    @property() open = false;
    @property() referenceElement: string | HTMLElement;
    @property() referenceElementType: ReferenceElementComponent["referenceElementType"] = "click";
    @property() referenceEl: HTMLElement;
    referenceElementController = useReferenceElement(refClickManager)(this);

    render(): JsxNode {
      return <div>Hello world!</div>;
    }
  }

  class TestHoverComponent extends LitElement implements ReferenceElementComponent {
    @property() open = false;
    @property() referenceElement: string | HTMLElement;
    @property() referenceElementType: ReferenceElementComponent["referenceElementType"] = "hover";
    @property() referenceEl: HTMLElement;
    referenceElementController = useReferenceElement(refHoverManager)(this);

    render(): JsxNode {
      return <div>Hello world!</div>;
    }
  }

  describe("click manager", () => {
    it("register and resolves reference element", async () => {
      const { component: referenceElement } = await mount(ReferenceElement);
      await referenceElement.updateComplete;

      const { component } = await mount(TestClickComponent);
      component.referenceElement = referenceElement;
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaControlsElements).toContain(component);
      expect(component.referenceEl.ariaExpanded).toBe("false");
      refClickManager.unregisterElement(component, component.referenceEl);
    });

    it("register and resolves string reference element", async () => {
      const { component: referenceElement } = await mount(ReferenceElement);
      referenceElement.el.id = "my-ref";
      await referenceElement.updateComplete;

      const { component } = await mount(TestClickComponent);
      component.referenceElement = "my-ref";
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaControlsElements).toContain(component);
      expect(component.referenceEl.ariaExpanded).toBe("false");
      refClickManager.unregisterElement(component, component.referenceEl);
    });
  });

  describe("hover manager", () => {
    it("register and resolves reference element", async () => {
      const { component: referenceElement } = await mount(ReferenceElement);
      await referenceElement.updateComplete;

      const { component } = await mount(TestHoverComponent);
      component.referenceElement = referenceElement;
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaDescribedByElements).toContain(component);
      refHoverManager.unregisterElement(component, component.referenceEl);
    });

    it("register and resolves string reference element", async () => {
      const { component: referenceElement } = await mount(ReferenceElement);
      referenceElement.el.id = "my-ref";
      await referenceElement.updateComplete;

      const { component } = await mount(TestHoverComponent);
      component.referenceElement = "my-ref";
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaDescribedByElements).toContain(component);
      refHoverManager.unregisterElement(component, component.referenceEl);
    });
  });
});
