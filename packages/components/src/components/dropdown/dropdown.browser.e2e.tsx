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
  openClose,
} from "../../tests/commonTests/browser";
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

function renderDropdown(): JsxNode {
  return (
    <calcite-dropdown>
      <calcite-button slot="trigger">Open dropdown</calcite-button>
      <calcite-dropdown-group id="group-1">
        <calcite-dropdown-item id="item-1">Dropdown Item Content</calcite-dropdown-item>
        <calcite-dropdown-item id="item-2" selected>
          Dropdown Item Content
        </calcite-dropdown-item>
        <calcite-dropdown-item id="item-3">Dropdown Item Content</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  );
}

describe("renders", () => {
  renders(() => mount(renderDropdown), { display: "inline-block" });
});

describe("focusable", () => {
  focusable(() => mount(renderDropdown), {
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

describe("openClose", () => {
  openClose(() => mount(renderDropdown));
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

    expect(el.open).toBe(false);

    await userEvent.tab();
    await userEvent.tab();

    expect(el.open).toBe(true);
  });

  it("does not toggle closed on click when type is hover", async () => {
    const { el } = await mount<Dropdown>(createHoverDropdownHTML);
    const trigger = page.getByText("Open dropdown");

    expect(el.open).toBe(false);

    await userEvent.click(trigger);

    expect(el.open).toBe(true);

    await userEvent.click(trigger);

    expect(el.open).toBe(true);
  });

  it("closes when focus leaves trigger with Tab", async () => {
    const { el } = await mount<Dropdown>(
      <div>
        {createHoverDropdownHTML()}
        <button id="next-focus-target" type="button">
          Next
        </button>
      </div>,
    );

    const trigger = page.getByText("Open dropdown");
    const nextFocusTarget = page.getByRole("button", { name: "Next" });

    await userEvent.click(trigger);
    expect(el.open).toBe(true);

    await userEvent.tab();

    await expect.element(nextFocusTarget).toHaveFocus();
    expect(el.open).toBe(false);
  });
});

describe("ariaActiveDescendantElement", () => {
  function getTriggerSlotLocator() {
    return page.getBySelector("calcite-dropdown slot").first();
  }

  function getSlottedTriggerLocator() {
    return page.getBySelector("calcite-dropdown [slot=trigger]");
  }

  function getActiveDescendantId(): string | undefined {
    return (getTriggerSlotLocator().element() as HTMLSlotElement | null)
      ?.ariaActiveDescendantElement?.id;
  }

  it("sets ariaActiveDescendantElement on the trigger slot when opened", async () => {
    await mount<Dropdown>(renderDropdown);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);

    expect(getActiveDescendantId()).toBe("item-2");
  });

  it("updates ariaActiveDescendantElement on keyboard navigation", async () => {
    await mount<Dropdown>(renderDropdown);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);

    const triggerEl = getSlottedTriggerLocator();
    await userEvent.type(triggerEl, "{ArrowDown}");

    expect(getActiveDescendantId()).toBe("item-3");
  });

  it("wraps ariaActiveDescendantElement on ArrowUp navigation", async () => {
    await mount<Dropdown>(renderDropdown);
    const trigger = page.getByText("Open dropdown");

    await userEvent.click(trigger);

    const triggerEl = getSlottedTriggerLocator();
    await userEvent.type(triggerEl, "{ArrowUp}");

    let activeDescendantId = getActiveDescendantId();

    expect(activeDescendantId).toBe("item-1");

    await userEvent.type(triggerEl, "{ArrowUp}");

    activeDescendantId = getActiveDescendantId();

    expect(activeDescendantId).toBe("item-3");
  });
});
