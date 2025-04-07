// @ts-strict-ignore
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { DEBOUNCE } from "../../utils/resources";

describe("action-bar", () => {
  it("pending resize is canceled on disconnect", async () => {
    const { component, el } = await mount<"calcite-action-bar">(<calcite-action-bar />);
    const cancelSpy = vi.spyOn(component.resize, "cancel");

    el.remove();
    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.resize));

    expect(cancelSpy.mock.calls.length).toBe(1);
  });
});
