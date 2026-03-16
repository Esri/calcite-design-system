import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  cancelable,
  defaults,
  disabled,
  focusable,
  reflects,
  hidden,
  internalLabel,
  renders,
  floatingUIOwner,
  t9n,
  topLayer,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { defaultMenuPlacement } from "../../utils/floating-ui";
import { CSS } from "./resources";
import type { Combobox } from "./combobox";

describe("calcite-combobox", () => {
  mockConsole();

  describe("cancelable", () => {
    cancelable("calcite-combobox");
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-combobox"),
      [
        {
          propertyName: "clearDisabled",
          defaultValue: false,
        },
        {
          propertyName: "flipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "filterProps",
          defaultValue: undefined,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "placement",
          defaultValue: defaultMenuPlacement,
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
          propertyName: "validationIcon",
          defaultValue: undefined,
        },
        {
          propertyName: "validationMessage",
          defaultValue: undefined,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-combobox"),
      [
        {
          propertyName: "allowCustomValues",
          value: true,
        },
        {
          propertyName: "clearDisabled",
          value: true,
        },
        {
          propertyName: "form",
          value: "test-form",
        },
        {
          propertyName: "maxItems",
          value: 1,
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
          // needs to run after `open` since it resets `open` after it's asserted value
          propertyName: "disabled",
          value: true,
        },
        {
          propertyName: "placeholderIcon",
          value: "banana",
        },
        {
          propertyName: "placement",
          value: "auto",
        },
        {
          propertyName: "placeholderIconFlipRtl",
          value: true,
        },
        {
          propertyName: "required",
          value: true,
        },
        {
          propertyName: "scale",
          value: "s",
        },
        {
          propertyName: "selectionMode",
          value: "single",
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
    hidden(() => mount("calcite-combobox"));
  });

  describe("internal label", () => {
    internalLabel(() => mount(`calcite-combobox`));
  });

  describe("renders", () => {
    renders(() => mount("calcite-combobox"), { display: "block" });
  });

  describe("focusable", () => {
    focusable(() =>
      mount(
        <calcite-combobox label="Trees" value="Trees">
          <calcite-combobox-item heading="Pine" value="Pine" />
          <calcite-combobox-item heading="Spruce" value="Spruce" />
        </calcite-combobox>,
      ),
    );
  });

  describe("owns a floating-ui", () => {
    floatingUIOwner(
      () =>
        mount(
          <calcite-combobox>
            <calcite-combobox-item heading="One" icon="banana" id="one" value="one" />
            <calcite-combobox-item heading="Two" icon="beaker" id="two" selected value="two" />
            <calcite-combobox-item heading="Three" id="three" value="three" />
          </calcite-combobox>,
        ),
      "open",
      { shadowSelector: `.${CSS.floatingUIContainer}` },
    );
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-combobox"));
  });

  describe("disabled", () => {
    disabled(() => mount("calcite-combobox"), {
      focusTarget: {
        tab: "calcite-combobox",
        click: {
          pointer: "calcite-combobox",
          method: "calcite-combobox",
        },
      },
    });
  });

  it("should use heading as fallback for both accessibility (aria-label) and value if not provided", async () => {
    await mount(
      <calcite-combobox label="Fruits">
        <calcite-combobox-item heading="Apple" />
        <calcite-combobox-item heading="Fallback Heading" />
      </calcite-combobox>,
    );
    const [item1, item2] = document.body.querySelectorAll("calcite-combobox-item");
    expect(item1.getAttribute("aria-label")).toBe("Apple");
    expect(item2.getAttribute("value")).toBe("Fallback Heading");
  });

  describe("top layer placement", () => {
    topLayer(() => mount("calcite-combobox"));
  });

  describe("clearing values", () => {
    type SelectionMode = "single" | "single-persist" | "multiple" | "ancestors";

    const selectionModes: SelectionMode[] = ["single", "single-persist", "multiple", "ancestors"];

    function renderCombobox(selectionMode: SelectionMode, clearDisabled = false) {
      if (selectionMode === "ancestors") {
        return (
          <calcite-combobox clearDisabled={clearDisabled} selectionMode="ancestors">
            <calcite-combobox-item heading="parent" value="parent">
              <calcite-combobox-item heading="child1" value="child1" />
              <calcite-combobox-item heading="child2" selected value="child2" />
            </calcite-combobox-item>
          </calcite-combobox>
        );
      }

      if (selectionMode === "multiple") {
        return (
          <calcite-combobox clearDisabled={clearDisabled} selectionMode="multiple">
            <calcite-combobox-item heading="one" selected value="one" />
            <calcite-combobox-item heading="two" selected value="two" />
            <calcite-combobox-item heading="three" selected value="three" />
          </calcite-combobox>
        );
      }

      return (
        <calcite-combobox clearDisabled={clearDisabled} selectionMode={selectionMode}>
          <calcite-combobox-item heading="one" selected value="one" />
          <calcite-combobox-item heading="two" value="two" />
          <calcite-combobox-item heading="three" value="three" />
        </calcite-combobox>
      );
    }

    async function assertValueClearing(
      selectionMode: SelectionMode,
      clearDisabled: boolean,
      mode: "mouse" | "keyboard",
      expectedBehavior: "clear" | "no-clear",
    ): Promise<void> {
      const { el, component } = await mount<Combobox>(renderCombobox(selectionMode, clearDisabled));
      await component.updateComplete;

      const initialValue = el.value;
      if (Array.isArray(initialValue)) {
        expect(initialValue.length).toBeGreaterThan(0);
      } else {
        expect(initialValue).not.toBe("");
      }

      if (mode === "mouse") {
        const clearButton = el.shadowRoot?.querySelector<HTMLElement>(
          'calcite-action[aria-label="Clear value"]',
        );

        if (expectedBehavior === "clear") {
          expect(clearButton).toBeTruthy();
          if (!clearButton) {
            throw new Error("expected clear button to be rendered");
          }
          clearButton.click();
          await component.updateComplete;
        } else {
          expect(clearButton).toBeNull();
        }
      } else {
        const input = el.shadowRoot?.querySelector("input");
        expect(input).toBeTruthy();
        if (!input) {
          throw new Error("expected internal input to be rendered");
        }

        input.focus();
        input.dispatchEvent(
          new KeyboardEvent("keydown", { bubbles: true, composed: true, key: "Escape" }),
        );
        await component.updateComplete;
      }

      if (expectedBehavior === "clear") {
        expect(el.value).toBe("");
      } else {
        expect(el.value).toEqual(initialValue);
      }
    }

    describe("enabled", () => {
      describe("via mouse", () => {
        selectionModes.forEach((selectionMode) => {
          if (selectionMode === "single-persist") {
            it(`does not clear the value in ${selectionMode}-selection mode`, () =>
              assertValueClearing(selectionMode, false, "mouse", "no-clear"));
          } else {
            it(`clears the value in ${selectionMode}-selection mode`, () =>
              assertValueClearing(selectionMode, false, "mouse", "clear"));
          }
        });
      });

      describe("via keyboard", () => {
        selectionModes.forEach((selectionMode) => {
          if (selectionMode === "single-persist") {
            it(`clears the value in ${selectionMode}-selection mode`, () =>
              assertValueClearing(selectionMode, false, "keyboard", "clear"));
          } else {
            it(`clears the value in ${selectionMode}-selection mode`, () =>
              assertValueClearing(selectionMode, false, "keyboard", "clear"));
          }
        });
      });
    });

    describe("disabled", () => {
      describe("via mouse", () => {
        selectionModes.forEach((selectionMode) => {
          it(`does not clear the value in ${selectionMode}-selection mode`, () =>
            assertValueClearing(selectionMode, true, "mouse", "no-clear"));
        });
      });

      describe("via keyboard", () => {
        selectionModes.forEach((selectionMode) => {
          it(`does not clear the value in ${selectionMode}-selection mode`, () =>
            assertValueClearing(selectionMode, true, "keyboard", "no-clear"));
        });
      });
    });
  });
});
