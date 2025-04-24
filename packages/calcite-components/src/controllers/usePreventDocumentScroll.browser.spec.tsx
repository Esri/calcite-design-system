import { it, expect, describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { LitElement, property } from "@arcgis/lumina";
import { usePreventDocumentScroll } from "./usePreventDocumentScroll";

describe("usePreventDocumentScroll", () => {
  class Test extends LitElement {
    @property() opened = false;

    @property() preventDocumentScroll = false;

    usePreventDocumentScroll = usePreventDocumentScroll()(this);
  }

  it("should not modify document overflow when component is not opened", async () => {
    const { component } = await mount(Test);
    component.opened = false;
    component.preventDocumentScroll = true;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("");
  });

  it("should not modify document overflow when preventDocumentScroll is false", async () => {
    const { component } = await mount(Test);
    component.opened = true;
    component.preventDocumentScroll = false;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("");
  });

  it("should set document overflow to 'hidden' when component is opened with preventDocumentScroll", async () => {
    const { component } = await mount(Test);
    component.opened = true;
    component.preventDocumentScroll = true;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("hidden");
  });

  it("should restore document overflow when component is closed", async () => {
    const { component } = await mount(Test);
    component.opened = true;
    component.preventDocumentScroll = true;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("hidden");

    component.opened = false;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("");
  });

  it("should restore document overflow when preventDocumentScroll is false", async () => {
    const { component } = await mount(Test);
    component.opened = true;
    component.preventDocumentScroll = true;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("hidden");

    component.preventDocumentScroll = false;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("");
  });

  it("should handle multiple components preventing scroll", async () => {
    const { component } = await mount(Test);
    component.opened = true;
    component.preventDocumentScroll = true;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("hidden");

    const { component: secondComponent } = await mount(Test);
    secondComponent.opened = true;
    secondComponent.preventDocumentScroll = true;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("hidden");

    secondComponent.opened = false;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("hidden");

    component.opened = false;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("");
  });

  it("should restore document overflow when component is disconnected", async () => {
    const { component } = await mount(Test);
    component.opened = true;
    component.preventDocumentScroll = true;
    await component.updateComplete;

    expect(document.documentElement.style.overflow).toBe("hidden");

    component.remove();

    expect(document.documentElement.style.overflow).toBe("");
  });
});
