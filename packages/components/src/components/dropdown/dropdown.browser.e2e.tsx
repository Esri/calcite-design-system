import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { page, userEvent } from "vitest/browser";
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
import { Dropdown } from "./dropdown";

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
    const { el } = await mount<Dropdown>(createHoverDropdownHTML);
    const trigger = page.getByText("Open dropdown");

    expect(el.open).toBe(false);

    await expect.element(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    await afterNextTask();

    expect(el.open).toBe(true);
  });

  it("does not toggle closed on click when type is hover", async () => {
    const { el } = await mount<Dropdown>(createHoverDropdownHTML);
    const trigger = page.getByText("Open dropdown");

    expect(el.open).toBe(false);

    await userEvent.click(trigger);
    await afterNextTask();

    expect(el.open).toBe(true);

    await userEvent.click(trigger);
    await afterNextTask();

    expect(el.open).toBe(true);
  });

  it("closes when focus leaves trigger with Tab", async () => {
    const { el } = await mount(
      <div>
        {createHoverDropdownHTML()}
        <button id="next-focus-target" type="button">
          Next
        </button>
      </div>,
    );
    const dropdownEl = el as Dropdown["el"];
    const trigger = page.getByText("Open dropdown");
    const nextFocusTarget = page.getByRole("button", { name: "Next" });

    await userEvent.click(trigger);
    await afterNextTask();
    expect(dropdownEl.open).toBe(true);

    await userEvent.tab();
    await afterNextTask();

    await expect.element(nextFocusTarget).toHaveFocus();
    expect(dropdownEl.open).toBe(false);
  });
});

describe("ariaActiveDescendantElement", () => {
  it("sets ariaActiveDescendantElement on the trigger container when opened", async () => {
    const { el } = await mount<Dropdown>(createSimpleDropdownHTML);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);
    await afterNextTask();

    const referenceEl = el.shadowRoot.querySelector(`.${CSS.triggerContainer}`) as HTMLDivElement;

    expect(referenceEl.ariaActiveDescendantElement?.id).toBe("item-2");
  });

  it("updates ariaActiveDescendantElement on keyboard navigation", async () => {
    const { el } = await mount<Dropdown>(createSimpleDropdownHTML);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);
    await afterNextTask();

    const referenceEl = el.shadowRoot.querySelector(`.${CSS.triggerContainer}`) as HTMLDivElement;

    referenceEl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    await afterNextTask();

    expect(referenceEl.ariaActiveDescendantElement?.id).toBe("item-3");
  });

  it("wraps ariaActiveDescendantElement on ArrowUp navigation", async () => {
    const { el } = await mount<Dropdown>(createSimpleDropdownHTML);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);
    await afterNextTask();

    const referenceEl = el.shadowRoot.querySelector(`.${CSS.triggerContainer}`) as HTMLDivElement;

    referenceEl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
    await afterNextTask();

    expect(referenceEl.ariaActiveDescendantElement?.id).toBe("item-1");

    referenceEl.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true }));
    await afterNextTask();

    expect(referenceEl.ariaActiveDescendantElement?.id).toBe("item-3");
  });
});
