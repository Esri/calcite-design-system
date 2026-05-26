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
        propertyName: "focusTrap",
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
        propertyName: "focusTrap",
        value: true,
      },
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

    el.focusTrap = true;
    await waitForComponentUpdate(el);

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
    el.focusTrap = true;
    await waitForComponentUpdate(el);

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
    el.focusTrap = true;
    await waitForComponentUpdate(el);

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
    el.focusTrap = true;
    await waitForComponentUpdate(el);

    expect(document.activeElement).toBe(outside);
  });

  it("sets focusTrap=false when deactivated by outside click", async () => {
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

    el.focusTrap = true;
    await waitForComponentUpdate(el);

    await userEvent.click(outside);
    await waitForComponentUpdate(el);

    expect(el.focusTrap).toBe(false);
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
});

describe("events", () => {
  it("emits calciteFocusTrapChange when focusTrap changes", async () => {
    const { el } = await mount<FocusTrap>(<calcite-focus-trap />);
    const changeHandler = vi.fn();

    el.addEventListener("calciteFocusTrapChange", changeHandler);

    el.focusTrap = true;
    await waitForComponentUpdate(el);

    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect((changeHandler.mock.calls[0][0] as CustomEvent<boolean>).detail).toBe(true);

    el.focusTrap = false;
    await waitForComponentUpdate(el);

    expect(changeHandler).toHaveBeenCalledTimes(2);
    expect((changeHandler.mock.calls[1][0] as CustomEvent<boolean>).detail).toBe(false);
  });

  it("emits calciteFocusTrapChange when internally deactivated", async () => {
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
    const outside = el.parentElement?.querySelector("#outside") as HTMLButtonElement | null;

    if (!outside) {
      throw new Error("Expected outside focusable element to exist");
    }

    el.addEventListener("calciteFocusTrapChange", changeHandler);

    el.focusTrap = true;
    await waitForComponentUpdate(el);

    await userEvent.click(outside);
    await waitForComponentUpdate(el);

    expect(el.focusTrap).toBe(false);
    expect(changeHandler).toHaveBeenCalledTimes(2);
    expect((changeHandler.mock.calls[0][0] as CustomEvent<boolean>).detail).toBe(true);
    expect((changeHandler.mock.calls[1][0] as CustomEvent<boolean>).detail).toBe(false);
  });
});
