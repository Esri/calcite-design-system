import { describe, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  disabled,
} from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-autocomplete-item"),
    [
      { propertyName: "active", defaultValue: false },
      { propertyName: "description", defaultValue: undefined },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "heading", defaultValue: undefined },
      { propertyName: "iconEnd", defaultValue: undefined },
      { propertyName: "iconFlipRtl", defaultValue: undefined },
      { propertyName: "iconStart", defaultValue: undefined },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "value", defaultValue: undefined },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-autocomplete-item"),
    [
      { propertyName: "disabled", value: true },
      { propertyName: "iconEnd", value: "banana" },
      { propertyName: "iconFlipRtl", value: "end" },
      { propertyName: "iconStart", value: "banana" },
      { propertyName: "selected", value: true },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-autocomplete-item"));
});

describe("renders", () => {
  renders(() => mount("calcite-autocomplete-item"), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-autocomplete-item"), SLOTS);
});

describe("disabled", () => {
  disabled(() => mount("calcite-autocomplete-item"), { focusTarget: "none" });

  it("does not emit or toggle selected when clicked", async () => {
    const { el, reRender } = await mount("calcite-autocomplete-item");
    const selectSpy = vi.fn();
    el.addEventListener("calciteAutocompleteItemSelect", selectSpy);

    el.disabled = true;
    await reRender();

    await userEvent.click(el, { force: true });
    await reRender();

    expect(el.selected).toBe(false);
    expect(selectSpy).toHaveBeenCalledTimes(0);
  });
});

describe("toggleSelection", () => {
  it("toggles selected and emits calciteAutocompleteItemSelect", async () => {
    const { el, reRender } = await mount("calcite-autocomplete-item");
    const selectSpy = vi.fn();
    el.addEventListener("calciteAutocompleteItemSelect", selectSpy);

    expect(el.selected).toBe(false);
    expect(typeof (el as any).emitSelectEvent).toBe("undefined");

    (el as any).toggleSelection();
    await reRender();

    expect(el.selected).toBe(true);
    expect(selectSpy).toHaveBeenCalledTimes(1);

    (el as any).toggleSelection();
    await reRender();

    expect(el.selected).toBe(false);
    expect(selectSpy).toHaveBeenCalledTimes(2);
  });
});
