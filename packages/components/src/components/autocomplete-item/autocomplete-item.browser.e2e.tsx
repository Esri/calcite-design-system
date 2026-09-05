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
  themed,
} from "../../tests/commonTests/browser";
import { CSS, SLOTS } from "./resources";

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

  it("does not emit or toggle selected when a disabled item is clicked", async () => {
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

describe("requestSelection", () => {
  it("emits calciteAutocompleteItemSelect without changing selected", async () => {
    const { el, reRender } = await mount("calcite-autocomplete-item");
    const selectSpy = vi.fn();
    el.addEventListener("calciteAutocompleteItemSelect", selectSpy);

    expect(el.selected).toBe(false);
    expect(typeof (el as any).emitSelectEvent).toBe("undefined");

    (el as any).requestSelection();
    await reRender();

    expect(el.selected).toBe(false);
    expect(selectSpy).toHaveBeenCalledTimes(1);

    (el as any).requestSelection();
    await reRender();

    expect(el.selected).toBe(false);
    expect(selectSpy).toHaveBeenCalledTimes(2);
  });
});

describe("theme", () => {
  themed(() => mount("calcite-autocomplete-item"), {
    "--calcite-autocomplete-background-color": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "backgroundColor",
    },
    "--calcite-autocomplete-description-text-color": {
      shadowSelector: `.${CSS.description}`,
      targetProp: "color",
    },
    "--calcite-autocomplete-heading-text-color": {
      shadowSelector: `.${CSS.heading}`,
      targetProp: "color",
    },
    "--calcite-autocomplete-text-color": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "color",
    },
  });
});
