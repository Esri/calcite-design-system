import { it, expect, describe, afterEach } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { LitElement, property } from "@arcgis/lumina";
import { usePreventDocumentScroll } from "./usePreventDocumentScroll";

describe.skip("usePreventDocumentScroll", () => {
  class Test extends LitElement {
    @property() opened = false;

    @property() preventDocumentScroll = false;

    usePreventDocumentScroll = usePreventDocumentScroll()(this);
  }

  afterEach(() => {
    document.documentElement.style.overflow = ""; // Reset overflow style
  });

  it("should not modify document overflow when component is not opened", async () => {
    const { component } = await mount(Test);
    component.opened = false;
    component.preventDocumentScroll = true;
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("should set document overflow to 'hidden' when component is opened with preventDocumentScroll", async () => {
    const { component } = await mount(Test);
    component.opened = true;
    component.preventDocumentScroll = true;

    expect(document.documentElement.style.overflow).toBe("hidden");
  });

  it("should restore document overflow when component is closed", async () => {
    const { component } = await mount(Test);
    component.opened = true;
    component.preventDocumentScroll = true;

    expect(document.documentElement.style.overflow).toBe("hidden");

    component.opened = false;
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("should handle multiple components preventing scroll", async () => {
    expect(document.documentElement.style.overflow).toBe("");

    const { component } = await mount(Test);
    component.opened = true;

    expect(document.documentElement.style.overflow).toBe("hidden");

    const { component: secondComponent } = await mount(Test);
    secondComponent.opened = true;
    expect(document.documentElement.style.overflow).toBe("hidden");

    secondComponent.opened = false;
    expect(document.documentElement.style.overflow).toBe("hidden");

    component.opened = false;
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("should restore document overflow when component is disconnected", async () => {
    const { component } = await mount(Test);
    component.opened = true;
    component.preventDocumentScroll = true;

    expect(document.documentElement.style.overflow).toBe("hidden");

    component.remove();
    expect(document.documentElement.style.overflow).toBe("");
  });
});
