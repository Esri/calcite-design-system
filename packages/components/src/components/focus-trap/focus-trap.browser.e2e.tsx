import { h, Fragment } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { userEvent } from "vitest/browser";
import { defaults, hidden, reflects, renders } from "../../tests/commonTests/browser";
import type { FocusTrap } from "./focus-trap";

interface MountedComponent {
  manager: {
    component: {
      updateComplete: Promise<boolean>;
    };
  };
}

async function waitForComponentUpdate(el: unknown): Promise<void> {
  await (el as MountedComponent).manager.component.updateComplete;
}

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

  it("does not reflect active", async () => {
    const { el } = await mount<FocusTrap>(<calcite-focus-trap />);

    expect(el.hasAttribute("active")).toBe(false);

    await el.activate();
    await waitForComponentUpdate(el);
    expect(el.active).toBe(true);
    expect(el.hasAttribute("active")).toBe(false);

    await el.deactivate();
    await waitForComponentUpdate(el);
    expect(el.hasAttribute("active")).toBe(false);
  });
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
    const { el } = await mount<FocusTrap>(
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

    const insideOne = el.querySelector("#inside-one") as HTMLButtonElement | null;
    const insideTwo = el.querySelector("#inside-two") as HTMLButtonElement | null;

    if (!insideOne || !insideTwo) {
      throw new Error("Expected inside focusable elements to exist");
    }

    insideOne.focus();

    await userEvent.tab();
    expect(document.activeElement).toBe(insideTwo);

    await userEvent.tab();
    expect(document.activeElement).toBe(insideOne);
  });

  it("allows focus to leave when disabled", async () => {
    const { el } = await mount<FocusTrap>(
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
    await waitForComponentUpdate(el);
    expect(el.active).toBe(false);

    const insideOne = el.querySelector("#inside-one") as HTMLButtonElement | null;
    const outside = el.parentElement?.querySelector("#outside") as HTMLButtonElement | null;

    if (!insideOne || !outside) {
      throw new Error("Expected focusable elements to exist");
    }

    insideOne.focus();

    await userEvent.tab();
    await userEvent.tab();

    expect(document.activeElement).toBe(outside);
  });

  it("allows focus to leave when focusTrapDisabledOverride returns true", async () => {
    const { el } = await mount<FocusTrap>(
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
    await waitForComponentUpdate(el);
    expect(el.active).toBe(false);

    const insideOne = el.querySelector("#inside-one") as HTMLButtonElement | null;
    const outside = el.parentElement?.querySelector("#outside") as HTMLButtonElement | null;

    if (!insideOne || !outside) {
      throw new Error("Expected focusable elements to exist");
    }

    insideOne.focus();

    await userEvent.tab();
    await userEvent.tab();

    expect(document.activeElement).toBe(outside);
  });

  it("honors focusTrapOptions.initialFocus=false", async () => {
    const { el } = await mount<FocusTrap>(
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

    const outside = el.parentElement?.querySelector("#outside") as HTMLButtonElement | null;

    if (!outside) {
      throw new Error("Expected outside focusable element to exist");
    }

    outside.focus();
    el.focusTrapOptions = { initialFocus: false };
    await el.activate();
    expect(el.active).toBe(true);

    expect(document.activeElement).toBe(outside);
  });

  it("emits deactivated state when deactivated by outside click", async () => {
    const { el } = await mount<FocusTrap>(
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

    const outside = el.parentElement?.querySelector("#outside") as HTMLButtonElement | null;

    if (!outside) {
      throw new Error("Expected outside focusable element to exist");
    }

    const changeHandler = vi.fn();
    const activeStates: boolean[] = [];
    el.addEventListener("calciteFocusTrapActiveChange", changeHandler);
    el.addEventListener("calciteFocusTrapActiveChange", () => {
      activeStates.push(el.active);
    });

    await el.activate();
    expect(el.active).toBe(true);

    await userEvent.click(outside);
    await waitForComponentUpdate(el);
    expect(el.active).toBe(false);

    expect(changeHandler).toHaveBeenCalledTimes(2);
    expect(activeStates).toEqual([true, false]);
  });
});

describe("public methods", () => {
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
    const { el } = await mount<FocusTrap>(
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
    const outside = el.parentElement?.querySelector("#outside") as HTMLButtonElement | null;

    if (!outside) {
      throw new Error("Expected outside focusable element to exist");
    }

    el.addEventListener("calciteFocusTrapActiveChange", changeHandler);
    el.addEventListener("calciteFocusTrapActiveChange", () => {
      activeStates.push(el.active);
    });

    await el.activate();
    expect(el.active).toBe(true);

    await userEvent.click(outside);
    await waitForComponentUpdate(el);
    expect(el.active).toBe(false);

    expect(changeHandler).toHaveBeenCalledTimes(2);
    expect(activeStates).toEqual([true, false]);
  });
});
