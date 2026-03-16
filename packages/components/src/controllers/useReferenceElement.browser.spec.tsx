import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h, JsxNode, LitElement, property, state } from "@arcgis/lumina";
import { html } from "lit";
import { page } from "vitest/browser";
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

  function getReferenceAndComponent<T extends HTMLElement>(): {
    referenceElement: HTMLElement;
    component: T;
  } {
    const referenceElement = page.getByText("My Reference Element").element() as HTMLElement | null;

    if (!referenceElement) {
      throw new Error("Expected reference element to be present");
    }

    const componentTextEl = page.getByText("Hello world!").element() as HTMLElement | null;

    if (!componentTextEl) {
      throw new Error("Expected test component text to be present");
    }

    const component = (componentTextEl.getRootNode() as ShadowRoot).host as T | null;

    if (!component) {
      throw new Error("Expected test component to be present");
    }

    return { referenceElement, component };
  }

  describe("click manager", () => {
    it("register and resolves reference element", async () => {
      await mount(
        html`<div>
          <div id="my-ref">My Reference Element</div>
          <test-click-component></test-click-component>
        </div>`,
        { dynamicComponents: [TestClickComponent] },
      );
      const { referenceElement, component } = getReferenceAndComponent<TestClickComponent>();

      component.referenceElement = referenceElement;
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaControlsElements).toContain(component.el);
      expect(component.referenceEl.ariaExpanded).toBe("false");
      component.referenceElement = null;
      await component.updateComplete;
      expect(referenceElement.ariaControlsElements).toBeNull();
      expect(referenceElement.ariaExpanded).toBeNull();
    });

    it("register and resolves string reference element", async () => {
      await mount(
        html`<div>
          <div id="my-ref">My Reference Element</div>
          <test-click-component></test-click-component>
        </div>`,
        { dynamicComponents: [TestClickComponent] },
      );
      const { referenceElement, component } = getReferenceAndComponent<TestClickComponent>();

      component.referenceElement = "my-ref";
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaControlsElements).toContain(component.el);
      expect(component.referenceEl.ariaExpanded).toBe("false");
      component.referenceElement = null;
      await component.updateComplete;
      expect(referenceElement.ariaControlsElements).toBeNull();
      expect(referenceElement.ariaExpanded).toBeNull();
    });

    it("removes previously registered reference element when disconnected before referenceEl update flushes", async () => {
      await mount(
        html`<div>
          <div id="my-ref-1">My Reference Element 1</div>
          <div id="my-ref-2">My Reference Element 2</div>
          <test-click-component></test-click-component>
        </div>`,
        { dynamicComponents: [TestClickComponent] },
      );

      const referenceElement1 = page.getByText("My Reference Element 1").element() as HTMLElement;
      const referenceElement2 = page.getByText("My Reference Element 2").element() as HTMLElement;
      const componentTextEl = page.getByText("Hello world!").element() as HTMLElement;
      const component = (componentTextEl.getRootNode() as ShadowRoot).host as TestClickComponent;

      component.referenceElement = "my-ref-1";
      await component.updateComplete;

      expect(referenceElement1.ariaControlsElements).toContain(component.el);
      expect(referenceElement1.ariaExpanded).toBe("false");

      component.referenceElement = referenceElement2;
      component.el.remove();
      await Promise.resolve();

      expect(referenceElement1.ariaControlsElements).toBeNull();
      expect(referenceElement1.ariaExpanded).toBeNull();
    });

    it("registers multiple components with same reference element and unregisters independently", async () => {
      await mount(
        html`<div>
          <div id="my-ref">My Reference Element</div>
          <test-click-component></test-click-component>
          <test-click-component></test-click-component>
        </div>`,
        { dynamicComponents: [TestClickComponent] },
      );

      const referenceElement = page.getByText("My Reference Element").element() as HTMLElement | null;

      if (!referenceElement) {
        throw new Error("Expected reference element to be present");
      }

      const components = Array.from(
        document.querySelectorAll("test-click-component"),
      ) as TestClickComponent[];

      if (components.length !== 2) {
        throw new Error("Expected two test-click-component instances to be present");
      }

      const [component1, component2] = components;

      component1.referenceElement = referenceElement;
      component2.referenceElement = referenceElement;
      await Promise.all([component1.updateComplete, component2.updateComplete]);

      expect(referenceElement.ariaControlsElements).not.toBeNull();
      expect(referenceElement.ariaControlsElements).toContain(component1.el);
      expect(referenceElement.ariaControlsElements).toContain(component2.el);

      expect(referenceElement.ariaDescribedByElements).not.toBeNull();
      expect(referenceElement.ariaDescribedByElements).toContain(component1.el);
      expect(referenceElement.ariaDescribedByElements).toContain(component2.el);

      component1.referenceElement = null;
      await component1.updateComplete;

      expect(referenceElement.ariaControlsElements).not.toBeNull();
      expect(referenceElement.ariaControlsElements).not.toContain(component1.el);
      expect(referenceElement.ariaControlsElements).toContain(component2.el);

      expect(referenceElement.ariaDescribedByElements).not.toBeNull();
      expect(referenceElement.ariaDescribedByElements).not.toContain(component1.el);
      expect(referenceElement.ariaDescribedByElements).toContain(component2.el);
    });
  });

  describe("hover manager", () => {
    it("register and resolves reference element", async () => {
      await mount(
        html`<div>
          <div id="my-ref">My Reference Element</div>
          <test-hover-component></test-hover-component>
        </div>`,
        { dynamicComponents: [TestHoverComponent] },
      );
      const { referenceElement, component } = getReferenceAndComponent<TestHoverComponent>();

      component.referenceElement = referenceElement;
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaDescribedByElements).toContain(component.el);
      component.referenceElement = null;
      await component.updateComplete;
      expect(referenceElement.ariaDescribedByElements).toBeNull();
    });

    it("register and resolves string reference element", async () => {
      await mount(
        html`<div>
          <div id="my-ref">My Reference Element</div>
          <test-hover-component></test-hover-component>
        </div>`,
        { dynamicComponents: [TestHoverComponent] },
      );
      const { referenceElement, component } = getReferenceAndComponent<TestHoverComponent>();

      component.referenceElement = "my-ref";
      await component.updateComplete;
      expect(component.referenceEl).toBeInstanceOf(HTMLElement);
      expect(component.referenceEl.ariaDescribedByElements).toContain(component.el);
      component.referenceElement = null;
      await component.updateComplete;
      expect(referenceElement.ariaDescribedByElements).toBeNull();
    });
  });
});
