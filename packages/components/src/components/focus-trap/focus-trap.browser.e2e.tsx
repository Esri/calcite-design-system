import { Fragment, h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { defaults, hidden, reflects, renders } from "../../tests/commonTests/browser";
import { afterNextTask } from "../../tests/utils/timing";
import type { FocusTrap } from "./focus-trap";

describe("defaults", () => {
  defaults(
    () => mount("calcite-focus-trap"),
    [
      {
        propertyName: "active",
        defaultValue: false,
      },
      {
        propertyName: "focusTrapDisabled",
        defaultValue: false,
      },
      {
        propertyName: "focusTrapDisabledOverride",
        defaultValue: undefined,
      },
      {
        propertyName: "focusTrapOptions",
        defaultValue: undefined,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-focus-trap"),
    [
      {
        propertyName: "focusTrapDisabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-focus-trap"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-focus-trap>
          <button type="button">inside one</button>
        </calcite-focus-trap>,
      ),
    { display: "contents" },
  );
});

describe("focus trap behavior", () => {
  it("cycles focus within slotted content when enabled", async () => {
    const { el, container } = await mount<FocusTrap>(
      <>
        <calcite-focus-trap>
          <button id="inside-one" type="button">
            inside one
          </button>
          <button id="inside-two" type="button">
            inside two
          </button>
        </calcite-focus-trap>
        <button id="outside" type="button">
          outside
        </button>
      </>,
    );

    await el.activate();
    expect(el.active).toBe(true);
    await afterNextTask();

    const insideOne = container.querySelector<HTMLButtonElement>("#inside-one")!;
    const insideTwo = container.querySelector<HTMLButtonElement>("#inside-two")!;

    await expect.element(insideOne).toHaveFocus();

    await userEvent.tab();
    await expect.element(insideTwo).toHaveFocus();

    await userEvent.tab();
    await expect.element(insideOne).toHaveFocus();
  });

  it("allows focus to leave when disabled", async () => {
    const { el, component, container } = await mount<FocusTrap>(
      <>
        <calcite-focus-trap>
          <button id="inside-one" type="button">
            inside one
          </button>
          <button id="inside-two" type="button">
            inside two
          </button>
        </calcite-focus-trap>
        <button id="outside" type="button">
          outside
        </button>
      </>,
    );

    el.focusTrapDisabled = true;
    await el.activate();
    await component.updateComplete;
    expect(el.active).toBe(false);

    const insideOne = container.querySelector<HTMLButtonElement>("#inside-one")!;
    const outside = container.querySelector<HTMLButtonElement>("#outside")!;

    insideOne.focus();

    await userEvent.tab();
    await userEvent.tab();

    await expect.element(outside).toHaveFocus();
  });

  it("allows focus to leave when focusTrapDisabledOverride returns true", async () => {
    const { el, component, container } = await mount<FocusTrap>(
      <>
        <calcite-focus-trap>
          <button id="inside-one" type="button">
            inside one
          </button>
          <button id="inside-two" type="button">
            inside two
          </button>
        </calcite-focus-trap>
        <button id="outside" type="button">
          outside
        </button>
      </>,
    );

    el.focusTrapDisabledOverride = () => true;
    await el.activate();
    await component.updateComplete;
    expect(el.active).toBe(false);

    const insideOne = container.querySelector<HTMLButtonElement>("#inside-one")!;
    const outside = container.querySelector<HTMLButtonElement>("#outside")!;

    insideOne.focus();

    await userEvent.tab();
    await userEvent.tab();

    await expect.element(outside).toHaveFocus();
  });

  it("honors focusTrapOptions.initialFocus=false", async () => {
    const { el, container } = await mount<FocusTrap>(
      <>
        <calcite-focus-trap>
          <button id="inside-one" type="button">
            inside one
          </button>
          <button id="inside-two" type="button">
            inside two
          </button>
        </calcite-focus-trap>
        <button id="outside" type="button">
          outside
        </button>
      </>,
    );

    const outside = container.querySelector<HTMLButtonElement>("#outside")!;

    outside.focus();
    el.focusTrapOptions = { initialFocus: false };
    await el.activate();
    expect(el.active).toBe(true);

    await expect.element(outside).toHaveFocus();
  });
});

describe("public methods", () => {
  it("supports setFocus", async () => {
    const { component } = await mount<FocusTrap>(
      <calcite-focus-trap>
        <button id="inside-one" type="button">
          inside one
        </button>
        <button id="inside-two" type="button">
          inside two
        </button>
      </calcite-focus-trap>,
    );

    const insideOne = page.getByText("inside one", { exact: true });

    await expect(component.setFocus()).resolves.toBeUndefined();
    await expect.element(insideOne).toHaveFocus();
  });

  it("supports focus-trap container updates", async () => {
    const { el } = await mount<FocusTrap>(
      <calcite-focus-trap>
        <button type="button">inside one</button>
      </calcite-focus-trap>,
    );

    await expect(el.updateFocusTrapElements()).resolves.toBeUndefined();
  });

  it("supports activate and deactivate", async () => {
    const { el } = await mount<FocusTrap>(<calcite-focus-trap />);

    await expect(el.activate()).resolves.toBeUndefined();
    expect(el.active).toBe(true);
    await expect(el.deactivate()).resolves.toBeUndefined();
    expect(el.active).toBe(false);
  });
});

describe("events", () => {
  it("emits deactivated state when deactivated by outside click", async () => {
    const { el, component, container } = await mount<FocusTrap>(
      <>
        <calcite-focus-trap>
          <button id="inside-one" type="button">
            inside one
          </button>
          <button id="inside-two" type="button">
            inside two
          </button>
        </calcite-focus-trap>
        <button id="outside" type="button">
          outside
        </button>
      </>,
    );

    const outside = container.querySelector<HTMLButtonElement>("#outside")!;

    const changeHandler = vi.fn();
    const activeStates: boolean[] = [];
    el.addEventListener("calciteFocusTrapActiveChange", changeHandler);
    el.addEventListener("calciteFocusTrapActiveChange", () => {
      activeStates.push(el.active);
    });

    await el.activate();
    expect(el.active).toBe(true);

    await userEvent.click(outside);
    await component.updateComplete;
    expect(el.active).toBe(false);

    expect(changeHandler).toHaveBeenCalledTimes(2);
    expect(activeStates).toEqual([true, false]);
  });

  it("emits calciteFocusTrapActiveChange when activate/deactivate is called", async () => {
    const { el } = await mount<FocusTrap>(<calcite-focus-trap />);
    const changeHandler = vi.fn();
    const activeStates: boolean[] = [];

    el.addEventListener("calciteFocusTrapActiveChange", changeHandler);
    el.addEventListener("calciteFocusTrapActiveChange", () => {
      activeStates.push(el.active);
    });

    await el.activate();
    expect(el.active).toBe(true);

    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(activeStates).toEqual([true]);

    await el.deactivate();
    expect(el.active).toBe(false);

    expect(changeHandler).toHaveBeenCalledTimes(2);
    expect(activeStates).toEqual([true, false]);
  });

  it("emits calciteFocusTrapActiveChange when internally deactivated", async () => {
    const { el, component, container } = await mount<FocusTrap>(
      <>
        <calcite-focus-trap>
          <button id="inside-one" type="button">
            inside one
          </button>
          <button id="inside-two" type="button">
            inside two
          </button>
        </calcite-focus-trap>
        <button id="outside" type="button">
          outside
        </button>
      </>,
    );
    const changeHandler = vi.fn();
    const activeStates: boolean[] = [];
    const outside = container.querySelector<HTMLButtonElement>("#outside")!;

    el.addEventListener("calciteFocusTrapActiveChange", changeHandler);
    el.addEventListener("calciteFocusTrapActiveChange", () => {
      activeStates.push(el.active);
    });

    await el.activate();
    expect(el.active).toBe(true);

    await userEvent.click(outside);
    await component.updateComplete;
    expect(el.active).toBe(false);

    expect(changeHandler).toHaveBeenCalledTimes(2);
    expect(activeStates).toEqual([true, false]);
  });
});
