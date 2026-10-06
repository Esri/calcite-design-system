import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { defaults, hidden, renders, disabled, themed, scalePropagates } from "../../tests/common";
import { CSS } from "./resources";
import { mockConsole } from "../../tests/utils/logging";
import { TabTitle } from "./tab-title";

describe("defaults", () => {
  defaults(
    () => mount("calcite-tab-title"),
    [
      { propertyName: "beforeClose", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
    ],
  );
});

describe("beforeClose", () => {
  it("waits for approval before closing and emitting close events", async () => {
    const { el } = await mount<TabTitle>(<calcite-tab-title closable>Tab</calcite-tab-title>);
    const approval = Promise.withResolvers<void>();
    const beforeClose = vi.fn(() => approval.promise);
    const beforeCloseEvent = vi.fn();
    const close = vi.fn();
    const internalClose = vi.fn();
    el.beforeClose = beforeClose;
    el.addEventListener("calciteTabTitleBeforeClose", beforeCloseEvent);
    el.addEventListener("calciteTabsClose", close);
    el.addEventListener("calciteInternalTabsClose", internalClose);

    await page.getByRole("button", { name: "Close" }).click();

    expect(beforeClose).toHaveBeenCalledTimes(1);
    expect(beforeCloseEvent).toHaveBeenCalledTimes(1);
    expect(el.closed).toBe(false);
    expect(internalClose).not.toHaveBeenCalled();
    expect(close).not.toHaveBeenCalled();

    approval.resolve();

    await expect.element(page.elementLocator(el)).toHaveAttribute("closed");
    await expect.poll(() => close.mock.calls.length).toBe(1);
    expect(internalClose).toHaveBeenCalledTimes(1);
  });

  it("keeps the title open without emitting close events when approval is rejected", async () => {
    const { el } = await mount<TabTitle>(<calcite-tab-title closable>Tab</calcite-tab-title>);
    const beforeClose = vi.fn(async () => {
      throw new Error("Close canceled");
    });
    const beforeCloseEvent = vi.fn();
    const close = vi.fn();
    const internalClose = vi.fn();
    el.beforeClose = beforeClose;
    el.addEventListener("calciteTabTitleBeforeClose", beforeCloseEvent);
    el.addEventListener("calciteTabsClose", close);
    el.addEventListener("calciteInternalTabsClose", internalClose);

    await page.getByRole("button", { name: "Close" }).click();

    expect(beforeClose).toHaveBeenCalledTimes(1);
    expect(beforeCloseEvent).toHaveBeenCalledTimes(1);
    expect(el.closed).toBe(false);
    await expect.element(page.elementLocator(el)).not.toHaveAttribute("closed");
    expect(internalClose).not.toHaveBeenCalled();
    expect(close).not.toHaveBeenCalled();
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-tab-title"));
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-tab-title closable />, mountOptions), {
    targetSelector: "calcite-action",
  });
});

describe("renders", () => {
  renders(() => mount("calcite-tab-title"), { display: "block" });
});

describe("disabled", () => {
  mockConsole();

  disabled(() => mount(<calcite-tab-title selected />));
});

describe("theme", () => {
  mockConsole();

  describe("default", () => {
    themed(() => mount(<calcite-tab-title closable>Text</calcite-tab-title>), {
      "--calcite-tab-text-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
      },
      "--calcite-tab-text-color-press": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
        state: { press: `calcite-tab-title >>> .${CSS.container}` },
      },
      "--calcite-tab-accent-color-press": {
        shadowSelector: `.${CSS.selectedIndicator}`,
        targetProp: "backgroundColor",
        state: { press: `calcite-tab-title >>> .${CSS.selectedIndicator}` },
      },
      "--calcite-tab-close-icon-color": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-text-color",
      },
      "--calcite-tab-close-icon-color-press": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-text-color-press",
        state: { press: `calcite-tab-title >>> .${CSS.close}` },
      },
      "--calcite-tab-close-icon-background-color-press": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-background-color-press",
        state: { press: `calcite-tab-title >>> .${CSS.close}` },
      },
      "--calcite-tab-close-icon-background-color": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-background-color",
        state: { press: `calcite-tab-title >>> .${CSS.close}` },
      },
      "--calcite-tab-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
    });
  });

  describe("bordered", () => {
    themed(
      () =>
        mount(
          <calcite-tab-title bordered closable>
            yeah!
          </calcite-tab-title>,
        ),
      {
        "--calcite-tab-background-color-hover": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
          state: "hover",
        },
      },
    );
  });

  describe("selected", () => {
    themed(
      () =>
        mount(
          <calcite-tab-title closable selected>
            yeah!
          </calcite-tab-title>,
        ),
      {
        "--calcite-tab-text-color-press": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "color",
        },
        "--calcite-tab-close-icon-background-color": {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-background-color",
        },
      },
    );
  });

  describe("bordered & selected", () => {
    themed(
      () =>
        mount(
          <calcite-tab-title bordered selected>
            close me
          </calcite-tab-title>,
        ),
      {
        "--calcite-tab-border-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderInlineColor",
        },
        "--calcite-tab-background-color": {
          shadowSelector: `.${CSS.container}::after`,
          targetProp: "backgroundColor",
        },
      },
    );
  });

  describe("start/end icons", () => {
    themed(
      () =>
        mount(
          <calcite-tab-title icon-end="3d-glasses" icon-start="banana">
            close me
          </calcite-tab-title>,
        ),
      {
        "--calcite-tab-icon-color-start": {
          shadowSelector: `.${CSS.iconStart}`,
          targetProp: "color",
        },
        "--calcite-tab-icon-color-start-press": {
          shadowSelector: `.${CSS.iconStart}`,
          targetProp: "color",
          state: { press: `calcite-tab-title >>> .${CSS.container}` },
        },
        "--calcite-tab-icon-color-end": {
          shadowSelector: `.${CSS.iconEnd}`,
          targetProp: "color",
        },
        "--calcite-tab-icon-color-end-press": {
          shadowSelector: `.${CSS.iconEnd}`,
          targetProp: "color",
          state: { press: `calcite-tab-title >>> .${CSS.container}` },
        },
      },
    );
  });
});
