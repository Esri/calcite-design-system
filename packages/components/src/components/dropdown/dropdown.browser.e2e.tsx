import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { JsxNode } from "@arcgis/lumina";
import {
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  floatingUIOwner,
  disabled,
  topLayer,
} from "../../tests/commonTests/browser";
import { afterNextTask } from "../../tests/utils/timing";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(() => mount("calcite-dropdown"), {
    offsetDistance: 0,
    offsetSkidding: 0,
    scale: "m",
    placement: "bottom-start",
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-dropdown"),
    [
      {
        propertyName: "offsetDistance",
        value: 10,
      },
      {
        propertyName: "offsetSkidding",
        value: 10,
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "widthScale",
        value: "m",
      },
      {
        propertyName: "width",
        value: "m",
      },
      {
        propertyName: "placement",
        value: "bottom-start",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-dropdown"));
});

function createSimpleDropdownHTML(): JsxNode {
  return (
    <calcite-dropdown>
      <calcite-button slot="trigger">Open dropdown</calcite-button>
      <calcite-dropdown-group id="group-1">
        <calcite-dropdown-item id="item-1"> Dropdown Item Content</calcite-dropdown-item>
        <calcite-dropdown-item id="item-2" selected>
          Dropdown Item Content
        </calcite-dropdown-item>
        <calcite-dropdown-item id="item-3"> Dropdown Item Content</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  );
}

describe("renders", () => {
  renders(() => mount(createSimpleDropdownHTML), { display: "inline-block" });
});

describe("focusable", () => {
  focusable(() => mount(createSimpleDropdownHTML), {
    focusTargetSelector: '[slot="trigger"]',
  });
});

describe("owns a floating-ui", () => {
  floatingUIOwner(
    () =>
      mount(
        <calcite-dropdown>
          <calcite-button slot="trigger">Open</calcite-button>
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item id="item-1" selected>
              1
            </calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>,
      ),
    "open",
    {
      shadowSelector: `.${CSS.wrapper}`,
    },
  );
});

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-dropdown>
          <calcite-button slot="trigger">Open</calcite-button>
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item id="item-1" selected>
              1
            </calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>,
      ),
    {
      focusTarget: {
        tab: "calcite-button",
        click: {
          pointer: "calcite-button",
          method: "body",
        },
      },
    },
  );
});

describe("top layer placement", () => {
  topLayer(() => mount("calcite-dropdown"));
});

describe("hover type", () => {
  function createHoverDropdownHTML(): JsxNode {
    return (
      <calcite-dropdown type="hover">
        <calcite-action id="trigger" slot="trigger">
          Open dropdown
        </calcite-action>
        <calcite-dropdown-group selection-mode="single">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content</calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected>
            Dropdown Item Content
          </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    );
  }

  it("opens on focusin", async () => {
    const { el } = await mount(createHoverDropdownHTML);
    const triggerButton = el
      .querySelector<HTMLElement>("calcite-action[slot='trigger']")
      ?.shadowRoot?.querySelector<HTMLButtonElement>("button");

    if (!triggerButton) {
      throw new Error("Trigger button not found");
    }

    expect(el.open).toBe(false);

    triggerButton.focus();
    await afterNextTask();

    expect(el.open).toBe(true);
  });

  it("does not toggle closed on click when type is hover", async () => {
    const { el } = await mount(createHoverDropdownHTML);
    const trigger = el.querySelector<HTMLElement>("calcite-action[slot='trigger']");

    if (!trigger) {
      throw new Error("Trigger not found");
    }

    expect(el.open).toBe(false);

    await userEvent.click(trigger);
    await afterNextTask();

    expect(el.open).toBe(true);

    await userEvent.click(trigger);
    await afterNextTask();

    expect(el.open).toBe(true);
  });
});
