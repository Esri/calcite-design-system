import { h, JsxNode, LitElement } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { createRef } from "lit/directives/ref.js";
import {
  focusable,
  defaults,
  reflects,
  hidden,
  internalLabel,
  renders,
  slots,
  floatingUIOwner,
  t9n,
  disabled,
  formAssociated,
  openClose,
  topLayer,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import type { Autocomplete } from "./autocomplete";
import { CSS, SLOTS } from "./resources";

mockConsole();

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-autocomplete id="myAutocomplete" label="Item list">
          <calcite-autocomplete-item heading="Item one" label="Item one" value="one" />
          <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
          <calcite-autocomplete-item heading="Item three" label="Item three" value="three" />
          <calcite-autocomplete-item heading="Item four" label="Item four" value="four" />
          <calcite-autocomplete-item disabled heading="Item five" label="Item five" value="five" />
        </calcite-autocomplete>,
      ),
    );
  });

  describe("grouped items", () => {
    accessible(() =>
      mount(
        <calcite-autocomplete label="Pets">
          <calcite-autocomplete-item-group heading="Dogs">
            <calcite-autocomplete-item heading="Rover" label="Rover" value="rover" />
            <calcite-autocomplete-item heading="Fido" label="Fido" value="one" />
          </calcite-autocomplete-item-group>
          <calcite-autocomplete-item-group heading="Cats">
            <calcite-autocomplete-item heading="Felix" label="Felix" value="felix" />
            <calcite-autocomplete-item heading="Garfield" label="Garfield" value="garfield" />
          </calcite-autocomplete-item-group>
        </calcite-autocomplete>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-autocomplete"),
    [
      {
        propertyName: "alignment",
        defaultValue: "start",
      },
      {
        propertyName: "autocomplete",
        defaultValue: undefined,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "form",
        defaultValue: undefined,
      },
      {
        propertyName: "icon",
        defaultValue: undefined,
      },
      {
        propertyName: "iconFlipRtl",
        defaultValue: false,
      },
      {
        propertyName: "inputValue",
        defaultValue: undefined,
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "maxLength",
        defaultValue: undefined,
      },
      {
        propertyName: "minLength",
        defaultValue: undefined,
      },
      {
        propertyName: "name",
        defaultValue: undefined,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "pattern",
        defaultValue: undefined,
      },
      {
        propertyName: "placeholder",
        defaultValue: undefined,
      },
      {
        propertyName: "placement",
        defaultValue: defaultMenuPlacement,
      },
      {
        propertyName: "prefixText",
        defaultValue: undefined,
      },
      {
        propertyName: "readOnly",
        defaultValue: false,
      },
      {
        propertyName: "required",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "suffixText",
        defaultValue: undefined,
      },
      {
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
      {
        propertyName: "value",
        defaultValue: "",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-autocomplete"),
    [
      {
        propertyName: "alignment",
        value: "start",
      },
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "form",
        value: "test-form",
      },
      {
        propertyName: "icon",
        value: "banana",
      },
      {
        propertyName: "iconFlipRtl",
        value: true,
      },
      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "maxLength",
        value: 2,
      },
      {
        propertyName: "minLength",
        value: 2,
      },
      {
        propertyName: "name",
        value: "test-name",
      },
      {
        propertyName: "open",
        value: true,
      },

      {
        propertyName: "overlayPositioning",
        value: "absolute",
      },
      {
        propertyName: "placement",
        value: "bottom",
      },
      {
        propertyName: "readOnly",
        value: true,
      },
      {
        propertyName: "required",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-autocomplete"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-autocomplete`));
});

describe("renders", () => {
  renders(() => mount("calcite-autocomplete"), { display: "block" });
});

describe("slots", () => {
  slots(() => mount("calcite-autocomplete"), SLOTS);
});

describe("is focusable", () => {
  focusable(() => mount("calcite-autocomplete"));
});

function renderAutocomplete(): JsxNode {
  return (
    <calcite-autocomplete id="myAutocomplete" label="Item list">
      <calcite-autocomplete-item heading="Item one" label="Item one" value="one" />
      <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
      <calcite-autocomplete-item heading="Item three" label="Item three" value="three" />
      <calcite-autocomplete-item heading="Item four" label="Item four" value="four" />
      <calcite-autocomplete-item disabled heading="Item five" label="Item five" value="five" />
    </calcite-autocomplete>
  );
}

describe("floating-ui", () => {
  describe("owns a floating-ui", () => {
    floatingUIOwner(() => mount<Autocomplete>(renderAutocomplete), "open", {
      shadowSelector: `.${CSS.floatingUIContainer}`,
    });
  });
});

describe("is form-associated", () => {
  formAssociated(() => mount(renderAutocomplete), {
    testValue: "two",
    submitsOnEnter: true,
  });
});

describe("openClose", () => {
  openClose((mountOptions) =>
    mount(
      <calcite-autocomplete id="myAutocomplete" label="Item list">
        <calcite-autocomplete-item heading="Item one" label="Item one" value="one" />
        <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
        <calcite-autocomplete-item heading="Item three" label="Item three" value="three" />
        <calcite-autocomplete-item heading="Item four" label="Item four" value="four" />
        <calcite-autocomplete-item disabled heading="Item five" label="Item five" value="five" />
      </calcite-autocomplete>,
      mountOptions,
    ),
  );
});

describe("top layer placement", () => {
  topLayer(() => mount("calcite-autocomplete"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-autocomplete"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-autocomplete"));
});

describe("keyboard selection", () => {
  class AutocompleteTestWrapper extends LitElement {
    static tagName = "autocomplete-test-wrapper";

    autocompleteRef = createRef<Autocomplete["el"]>();

    get autocompleteEl(): Autocomplete["el"] | undefined {
      return this.autocompleteRef.value;
    }

    override render(): JsxNode {
      return (
        <calcite-autocomplete label="Item list" open ref={this.autocompleteRef}>
          <slot />
        </calcite-autocomplete>
      );
    }
  }

  it("selects active item on Enter and emits calciteAutocompleteItemSelect", async () => {
    const { el, reRender } = await mount<Autocomplete>(renderAutocomplete);
    const firstItem = el.querySelector("calcite-autocomplete-item")!;
    const itemSelectSpy = vi.fn();

    el.addEventListener("calciteAutocompleteItemSelect", itemSelectSpy);

    expect(firstItem.selected).toBe(false);

    await el.setFocus();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await reRender();

    expect(firstItem.selected).toBe(true);
    expect(itemSelectSpy).toHaveBeenCalledTimes(1);

    await el.setFocus();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await reRender();

    expect(firstItem.selected).toBe(true);
    expect(itemSelectSpy).toHaveBeenCalledTimes(2);
  });

  it("updates item selection when value changes", async () => {
    const { component, reRender } = await mount<Autocomplete>(renderAutocomplete);
    const firstItem = component.items[0];
    const secondItem = component.items[1];

    component.value = secondItem.value;
    await reRender();

    expect(firstItem.selected).toBe(false);
    expect(secondItem.selected).toBe(true);
  });

  it("updates item selection before emitting change", async () => {
    const { component, el, reRender } = await mount<Autocomplete>(renderAutocomplete);
    let selectedItemsAtChange: boolean[] | undefined;

    el.addEventListener("calciteAutocompleteChange", () => {
      selectedItemsAtChange = component.items.map((item) => item.selected);
    });

    await component.setFocus();
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await reRender();

    expect(selectedItemsAtChange).toEqual([true, false, false, false, false]);
  });

  it("applies initial value to item selection", async () => {
    const { component } = await mount<Autocomplete>(
      <calcite-autocomplete label="Item list" open value="two">
        <calcite-autocomplete-item heading="Item one" label="Item one" value="one" />
        <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
      </calcite-autocomplete>,
    );

    expect(component.items[0].selected).toBe(false);
    expect(component.items[1].selected).toBe(true);
    await expect
      .element(page.getByRole("listbox").getByRole("option").nth(1))
      .toHaveAttribute("aria-selected", "true");
  });

  it("preserves declarative selection without an initial value", async () => {
    const { component } = await mount<Autocomplete>(
      <calcite-autocomplete label="Item list" open>
        <calcite-autocomplete-item heading="Item one" label="Item one" selected value="one" />
        <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
      </calcite-autocomplete>,
    );

    expect(component.items[0].selected).toBe(true);
    await expect
      .element(page.getByRole("listbox").getByRole("option").nth(0))
      .toHaveAttribute("aria-selected", "true");
  });

  it("clears selection when a controlled value is reset", async () => {
    const { component, reRender } = await mount<Autocomplete>(
      <calcite-autocomplete label="Item list" open value="one">
        <calcite-autocomplete-item heading="Item one" label="Item one" value="one" />
        <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
      </calcite-autocomplete>,
    );

    component.value = "";
    await reRender();

    expect(component.items[0].selected).toBe(false);
    await expect
      .element(page.getByRole("listbox").getByRole("option").nth(0))
      .toHaveAttribute("aria-selected", "false");
  });

  it("applies value to items added after initialization", async () => {
    const { component, el, reRender } = await mount<Autocomplete>(
      <calcite-autocomplete label="Item list" value="two">
        <calcite-autocomplete-item heading="Item one" label="Item one" value="one" />
      </calcite-autocomplete>,
    );

    const item = document.createElement("calcite-autocomplete-item");
    item.heading = "Item two";
    item.label = "Item two";
    item.value = "two";
    el.append(item);
    await reRender();

    expect(component.items[1].selected).toBe(true);
  });

  it("updates selection when an item value changes", async () => {
    const { component, reRender } = await mount<Autocomplete>(
      <calcite-autocomplete label="Item list" value="two">
        <calcite-autocomplete-item heading="Item one" label="Item one" value="one" />
        <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
      </calcite-autocomplete>,
    );

    const selectedItem = component.items[1];
    selectedItem.value = "three";
    await reRender();

    expect(selectedItem.selected).toBe(false);
  });

  it("updates listbox option aria-selected from programmatic item selection without emitting change", async () => {
    const changeSpy = vi.fn();
    const { component, reRender } = await mount<Autocomplete>(
      <calcite-autocomplete label="Item list" oncalciteAutocompleteChange={changeSpy} open>
        <calcite-autocomplete-item heading="Item one" label="Item one" selected value="one" />
        <calcite-autocomplete-item heading="Item two" label="Item two" value="two" />
      </calcite-autocomplete>,
    );

    const secondOption = page.getByRole("listbox").getByRole("option").nth(1);

    await expect.element(secondOption).toBeInTheDocument();
    await expect.element(secondOption).toHaveAttribute("aria-selected", "false");

    const secondItem = component.items.find((item) => item.value === "two")!;
    secondItem.selected = true;
    await reRender();

    await expect.element(secondOption).toHaveAttribute("aria-selected", "true");
    expect(changeSpy).toHaveBeenCalledTimes(0);
  });

  it("updates listbox option aria metadata and text from programmatic item state changes", async () => {
    const { component, reRender } = await mount<Autocomplete>(renderAutocomplete);
    component.open = true;
    await reRender();

    const secondOption = page.getByRole("listbox").getByRole("option").nth(1);

    await expect.element(secondOption).toBeInTheDocument();
    await expect.element(secondOption).toHaveAttribute("aria-disabled", "false");
    await expect.element(secondOption).toHaveAttribute("aria-label", "Item two");
    await expect.element(secondOption).toHaveTextContent("Item two");

    const secondItem = component.items.find((item) => item.value === "two")!;
    secondItem.disabled = true;
    secondItem.description = "Updated description";
    secondItem.heading = "Updated heading";
    secondItem.label = "Updated label";
    await reRender();

    await expect.element(secondOption).toHaveAttribute("aria-disabled", "true");
    await expect.element(secondOption).toHaveAttribute("aria-label", "Updated label");
    await expect.element(secondOption).toHaveTextContent("Updated heading");
    await expect.element(secondOption).toHaveTextContent("Updated description");
  });

  it("supports keyboard navigation for shadow-projected items", async () => {
    const { component, el, reRender } = await mount(AutocompleteTestWrapper);

    el.innerHTML = `
      <calcite-autocomplete-item heading="Item one" label="Item one" value="one"></calcite-autocomplete-item>
      <calcite-autocomplete-item heading="Item two" label="Item two" value="two"></calcite-autocomplete-item>
      <calcite-autocomplete-item heading="Item three" label="Item three" value="three"></calcite-autocomplete-item>
    `;

    await reRender();

    const autocomplete = component.autocompleteEl!;
    const listbox = page.elementLocator(autocomplete).getByRole("listbox");
    const options = listbox.getByRole("option");

    await expect.element(options.first()).toBeInTheDocument();
    await expect.element(options.nth(1)).toBeInTheDocument();
    await expect.element(options.nth(2)).toBeInTheDocument();

    const firstOption = options.first().element() as HTMLElement;

    await autocomplete.setFocus();
    await userEvent.keyboard("{ArrowDown}");

    const input = page.elementLocator(autocomplete).getByRole("combobox");
    await expect.element(input).toHaveAttribute("aria-activedescendant", firstOption.id);
  });
});

describe("theme", () => {
  themed(() => mount(<calcite-autocomplete open />), {
    "--calcite-autocomplete-background-color": {
      shadowSelector: `.${CSS.contentAnimation}`,
      targetProp: "backgroundColor",
    },
    "--calcite-autocomplete-corner-radius": {
      shadowSelector: `.${CSS.contentAnimation}`,
      targetProp: "borderRadius",
    },
    "--calcite-autocomplete-text-color": {
      shadowSelector: `.${CSS.contentAnimation}`,
      targetProp: "color",
    },
    "--calcite-autocomplete-menu-max-size-y": {
      shadowSelector: `.${CSS.contentAnimation}`,
      targetProp: "maxBlockSize",
    },
    "--calcite-autocomplete-input-prefix-size": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-prefix-size",
    },
    "--calcite-autocomplete-input-suffix-size": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-suffix-size",
    },
    "--calcite-autocomplete-input-background-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-background-color",
    },
    "--calcite-autocomplete-input-border-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-border-color",
    },
    "--calcite-autocomplete-input-corner-radius": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-corner-radius",
    },
    "--calcite-autocomplete-input-shadow": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-shadow",
    },
    "--calcite-autocomplete-input-icon-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-icon-color",
    },
    "--calcite-autocomplete-input-text-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-text-color",
    },
    "--calcite-autocomplete-input-placeholder-text-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-placeholder-text-color",
    },
    "--calcite-autocomplete-input-actions-background-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-actions-background-color",
    },
    "--calcite-autocomplete-input-actions-background-color-hover": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-actions-background-color-hover",
    },
    "--calcite-autocomplete-input-actions-background-color-press": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-actions-background-color-press",
    },
    "--calcite-autocomplete-input-actions-icon-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-actions-icon-color",
    },
    "--calcite-autocomplete-input-actions-icon-color-hover": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-actions-icon-color-hover",
    },
    "--calcite-autocomplete-input-actions-icon-color-press": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-actions-icon-color-press",
    },
    "--calcite-autocomplete-input-loading-background-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-loading-background-color",
    },
    "--calcite-autocomplete-input-loading-fill-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-loading-fill-color",
    },
    "--calcite-autocomplete-input-prefix-text-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-prefix-text-color",
    },
    "--calcite-autocomplete-input-suffix-text-color": {
      shadowSelector: `.${CSS.input}`,
      targetProp: "--calcite-input-suffix-text-color",
    },
  });
});
