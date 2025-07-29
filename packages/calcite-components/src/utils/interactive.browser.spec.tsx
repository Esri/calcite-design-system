import { describe, expect, it } from "vitest";
import { LitElement, property } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { updateHostInteraction } from "./interactive";

describe("interactive", () => {
  it("updateHostInteraction", async () => {
    class Test extends LitElement {
      @property()
      disabled = false;
    }

    const { component, el } = await mount(Test);

    updateHostInteraction(component);

    expect(el.getAttribute("aria-disabled")).toBeNull();

    component.disabled = true;

    updateHostInteraction(component);

    expect(el.getAttribute("aria-disabled")).toBe("true");
  });
});
