import { afterEach, describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { terminateFilterWorker } from "../../utils/filter-worker";
import { DEBOUNCE } from "../../utils/resources";
import {
  cancelable,
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  t9n,
  disabled,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";

mockConsole();

describe("accessible", () => {
  accessible(() => mount(`calcite-filter`));
});

describe("cancelable", () => {
  mockConsole();
  cancelable("calcite-filter");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-filter"),
    [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "filteredItems",
        defaultValue: [],
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("is focusable", () => {
  focusable(() => mount("calcite-filter"), {
    shadowFocusTargetSelector: "calcite-input",
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-filter"),
    [
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "scale",
        value: "s",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-filter"));
});

describe("renders", () => {
  renders(() => mount("calcite-filter"), { display: "flex" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-filter"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-filter"));
});

describe("clear", () => {
  it("should clear the value and prevent default on Escape only when value is not empty", async () => {
    const { el } = await mount("calcite-filter");
    el.items = [{ foo: "bar" }];

    const input = el.shadowRoot
      .querySelector("calcite-input")!
      .shadowRoot!.querySelector<HTMLInputElement>("input")!;
    const escapeDefaultPrevented: boolean[] = [];

    el.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        escapeDefaultPrevented.push(event.defaultPrevented);
      }
    });

    await userEvent.click(input);

    expect(el.value).toBe("");
    await userEvent.keyboard("{Escape}");
    expect(escapeDefaultPrevented[0]).toBe(false);
    expect(el.value).toBe("");

    await userEvent.click(input);
    await userEvent.type(input, "something");

    expect(el.value).toBe("something");

    await userEvent.keyboard("{Escape}");
    expect(escapeDefaultPrevented[1]).toBe(true);
    expect(el.value).toBe("");

    await userEvent.keyboard("{Escape}");
    expect(escapeDefaultPrevented[2]).toBe(false);
    expect(el.value).toBe("");
  });
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-filter"), {
      "--calcite-filter-content-space": {
        targetProp: "padding",
        shadowSelector: `.${CSS.container}`,
      },
      "--calcite-filter-input-background-color": {
        targetProp: "--calcite-input-background-color",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-border-color": {
        targetProp: "--calcite-input-border-color",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-corner-radius": {
        targetProp: "--calcite-input-corner-radius",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-shadow": {
        targetProp: "--calcite-input-shadow",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-icon-color": {
        targetProp: "--calcite-input-icon-color",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-text-color": {
        targetProp: "--calcite-input-text-color",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-placeholder-text-color": {
        targetProp: "--calcite-input-placeholder-text-color",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-actions-background-color": {
        targetProp: "--calcite-input-actions-background-color",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-actions-background-color-hover": {
        targetProp: "--calcite-input-actions-background-color-hover",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-actions-background-color-press": {
        targetProp: "--calcite-input-actions-background-color-press",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-actions-icon-color": {
        targetProp: "--calcite-input-actions-icon-color",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-actions-icon-color-hover": {
        targetProp: "--calcite-input-actions-icon-color-hover",
        shadowSelector: "calcite-input",
      },
      "--calcite-filter-input-actions-icon-color-press": {
        targetProp: "--calcite-input-actions-icon-color-press",
        shadowSelector: "calcite-input",
      },
    });
  });
});

describe("worker filtering", () => {
  afterEach(() => {
    terminateFilterWorker();
  });

  it("does not emit calciteFilterStatusChange when worker filtering falls back synchronously", async () => {
    const nativeWorker = globalThis.Worker;

    class MockWorker {
      constructor() {
        throw new Error("worker unavailable");
      }
    }

    globalThis.Worker = MockWorker as unknown as typeof Worker;

    try {
      const { el } = await mount("calcite-filter");
      const statusChangeSpy = vi.fn();

      el.items = Array.from({ length: 120 }, (_, index) => ({
        label: index % 2 === 0 ? `One ${index}` : `Two ${index}`,
        value: `${index}`,
      }));

      el.addEventListener("calciteFilterStatusChange", statusChangeSpy);

      const filterInput = page.getByLabelText("Filter");

      await userEvent.click(filterInput);
      await userEvent.type(filterInput, "one");

      await vi.waitUntil(() => el.filteredItems.length === 60);

      expect(el.filtering).toBe(false);
      expect(statusChangeSpy).toHaveBeenCalledTimes(0);
    } finally {
      globalThis.Worker = nativeWorker;
    }
  });

  it("emits calciteFilterStatusChange while filtering with a web worker", async () => {
    const nativeWorker = globalThis.Worker;

    class MockWorker {
      private readonly messageListeners: Array<(event: MessageEvent) => void> = [];

      addEventListener(type: string, listener: (event: MessageEvent) => void): void {
        if (type === "message") {
          this.messageListeners.push(listener);
        }
      }

      postMessage(message: {
        requestId: number;
        data: Array<{ label?: string }>;
        value: string;
      }): void {
        const filterValue = message.value.toLowerCase();
        const filteredIndexes = message.data
          .map((item, index) => ({
            index,
            label: (item.label ?? "").toLowerCase(),
          }))
          .filter((item) => item.label.includes(filterValue))
          .map((item) => item.index);

        setTimeout(() => {
          this.messageListeners.forEach((listener) =>
            listener(
              new MessageEvent("message", {
                data: {
                  requestId: message.requestId,
                  filteredIndexes,
                },
              }),
            ),
          );
        }, 50);
      }

      terminate(): void {
        this.messageListeners.length = 0;
      }
    }

    globalThis.Worker = MockWorker as unknown as typeof Worker;

    try {
      const { el } = await mount("calcite-filter");
      const filteringStates: boolean[] = [];
      const statusChangeSpy = vi.fn();

      el.items = Array.from({ length: 120 }, (_, index) => ({
        label: index % 2 === 0 ? `One ${index}` : `Two ${index}`,
        value: `${index}`,
      }));

      el.addEventListener("calciteFilterStatusChange", () => {
        statusChangeSpy();
        filteringStates.push(el.filtering);
      });

      const filterInput = page.getByLabelText("Filter");

      await userEvent.click(filterInput);
      await userEvent.type(filterInput, "o");

      await vi.waitUntil(() => statusChangeSpy.mock.calls.length === 2);

      expect(filteringStates).toEqual([true, false]);
      expect(el.filtering).toBe(false);
      expect(statusChangeSpy).toHaveBeenCalledTimes(2);
    } finally {
      globalThis.Worker = nativeWorker;
    }
  });
});

describe("filter method", () => {
  it("cancels pending debounced input filtering before immediate filtering", async () => {
    const { el } = await mount("calcite-filter");
    const filterChangeSpy = vi.fn();

    el.items = [
      { label: "Harry", value: "harry" },
      { label: "Matt", value: "matt" },
    ];

    el.addEventListener("calciteFilterChange", filterChangeSpy);

    const filterInput = page.getByLabelText("Filter");

    await userEvent.click(filterInput);
    await userEvent.type(filterInput, "Har");

    await el.filter("Matt");

    expect(el.filteredItems).toEqual([{ label: "Matt", value: "matt" }]);

    await new Promise((resolve) => setTimeout(resolve, DEBOUNCE.filter + 1));

    expect(el.filteredItems).toEqual([{ label: "Matt", value: "matt" }]);
    expect(filterChangeSpy).toHaveBeenCalledTimes(0);
  });
});
