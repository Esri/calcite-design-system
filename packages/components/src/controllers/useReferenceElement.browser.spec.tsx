import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h, JsxNode, LitElement, property, state } from "@arcgis/lumina";
import {
  ReferenceElementComponentManager,
  referenceElementManager,
} from "./useReferenceElement/manager";
import { ReferenceElementComponent, useReferenceElement } from "./useReferenceElement";

describe("useReferenceElement", () => {
  let refClickManager: ReferenceElementComponentManager;
  let refHoverManager: ReferenceElementComponentManager;

  beforeEach(() => {
    refClickManager = referenceElementManager({ click: true });
    refHoverManager = referenceElementManager({ hover: true });
  });

  class TestClickComponent extends LitElement {
    @property() open = false;
    @property() referenceElement: string | HTMLElement | null;
    @property() referenceElementType: ReferenceElementComponent["referenceElementType"] = "click";
    @state() referenceEl: HTMLElement | null;
    referenceElementController = useReferenceElement({ manager: refClickManager })(this);

    render(): JsxNode {
      return <div>Hello world!</div>;
    }
  }

  class TestHoverComponent extends LitElement {
    @property() open = false;
    @property() referenceElement: string | HTMLElement | null;
    @property() referenceElementType: ReferenceElementComponent["referenceElementType"] = "hover";
    @state() referenceEl: HTMLElement | null;
    referenceElementController = useReferenceElement({ manager: refHoverManager })(this);

    render(): JsxNode {
      return <div>Hello world!</div>;
    }
  }

  describe("click manager", () => {
    it("register and resolves reference element", async () => {
      const { component: referenceElement } = await mount(<div>My Reference Element</div>);
      await referenceElement.updateComplete;

      const { component } = await mount(TestClickComponent);
      component.referenceElement = referenceElement;
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaControlsElements).toContain(component);
      expect(component.referenceEl.ariaExpanded).toBe("false");
      component.referenceElement = null;
      await component.updateComplete;
      expect(referenceElement.ariaControlsElements).toBeNull();
      expect(referenceElement.ariaExpanded).toBeNull();
    });

    it("register and resolves string reference element", async () => {
      const { component: referenceElement } = await mount(<div>My Reference Element</div>);
      referenceElement.el.id = "my-ref";
      await referenceElement.updateComplete;

      const { component } = await mount(TestClickComponent);
      component.referenceElement = "my-ref";
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaControlsElements).toContain(component);
      expect(component.referenceEl.ariaExpanded).toBe("false");
      component.referenceElement = null;
      await component.updateComplete;
      expect(referenceElement.ariaControlsElements).toBeNull();
      expect(referenceElement.ariaExpanded).toBeNull();
    });
  });

  describe("hover manager", () => {
    it("register and resolves reference element", async () => {
      const { component: referenceElement } = await mount(<div>My Reference Element</div>);
      await referenceElement.updateComplete;

      const { component } = await mount(TestHoverComponent);
      component.referenceElement = referenceElement;
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaDescribedByElements).toContain(component);
      component.referenceElement = null;
      await component.updateComplete;
      expect(referenceElement.ariaDescribedByElements).toBeNull();
    });

    it("register and resolves string reference element", async () => {
      const { component: referenceElement } = await mount(<div>My Reference Element</div>);
      referenceElement.el.id = "my-ref";
      await referenceElement.updateComplete;

      const { component } = await mount(TestHoverComponent);
      component.referenceElement = "my-ref";
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaDescribedByElements).toContain(component);
      component.referenceElement = null;
      await component.updateComplete;
      expect(referenceElement.ariaDescribedByElements).toBeNull();
    });
  });
});
