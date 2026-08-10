import { h, JsxNode } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  focusable,
  cancelable,
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

describe("cancelable", () => {
  cancelable("calcite-autocomplete");
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
  it("toggles active item selection on Enter and emits calciteAutocompleteItemSelect", async () => {
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

    expect(firstItem.selected).toBe(false);
    expect(itemSelectSpy).toHaveBeenCalledTimes(2);
  });
});

describe("aria-live", () => {
  it("sets screen reader list aria-live only when host value is valid", async () => {
    const { el, reRender } = await mount<Autocomplete>(renderAutocomplete);
    const screenReaderList = page
      .getBySelector(`#myAutocomplete .${CSS.screenReadersOnly}`)
      .element() as HTMLElement;

    expect(screenReaderList).toBeDefined();
    expect(screenReaderList.getAttribute("aria-live")).toBe(null);

    el.ariaLive = "polite";
    await reRender();

    expect(screenReaderList.getAttribute("aria-live")).toBe("polite");

    el.ariaLive = "invalid";
    await reRender();

    expect(screenReaderList.getAttribute("aria-live")).toBe(null);
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
