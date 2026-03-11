import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { focusable, hidden, renders } from "../../tests/commonTests/browser";
import { afterNextTask } from "../../tests/utils/timing";

describe("is focusable", () => {
  focusable(() => mount(`calcite-dropdown-item`));
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-dropdown-item"));
});

describe("renders", () => {
  renders(() => mount("calcite-dropdown-item"), { display: "flex" });
});

describe("disabled", () => {
  it("prevents selection event when disabled", async () => {
    const { el, reRender } = await mount("calcite-dropdown-item");
    const selectSpy = vi.fn();
    el.addEventListener("calciteDropdownItemSelect", selectSpy);

    el.disabled = true;
    await reRender();
    await afterNextTask();

    el.click();

    expect(selectSpy).toHaveBeenCalledTimes(0);
    expect(el.getAttribute("aria-disabled")).toBe("true");
  });

  it("allows selection event again after enabling", async () => {
    const { el, reRender } = await mount("calcite-dropdown-item");
    const selectSpy = vi.fn();
    el.addEventListener("calciteDropdownItemSelect", selectSpy);

    el.disabled = true;
    await reRender();
    await afterNextTask();

    el.disabled = false;
    await reRender();
    await afterNextTask();

    el.click();

    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(el.getAttribute("aria-disabled")).toBeNull();
  });
});
