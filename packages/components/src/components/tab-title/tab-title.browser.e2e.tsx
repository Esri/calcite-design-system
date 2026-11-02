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
  async function mountClosableTabs() {
    const { el: tabs, reRender } = await mount(
      <calcite-tabs last-tab-closable>
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title closable id="before-close-title-1" selected>
            First tab
          </calcite-tab-title>
          <calcite-tab-title closable id="before-close-title-2">
            Second tab
          </calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab id="before-close-tab-1" selected>
          First tab content
        </calcite-tab>
        <calcite-tab id="before-close-tab-2">Second tab content</calcite-tab>
      </calcite-tabs>,
    );

    return {
      firstTitle: tabs.querySelector<TabTitle["el"]>("#before-close-title-1")!,
      secondTitle: tabs.querySelector<TabTitle["el"]>("#before-close-title-2")!,
      reRender,
    };
  }

  it("waits for approval before closing and emitting close events", async () => {
    const { firstTitle, secondTitle } = await mountClosableTabs();
    const approval = Promise.withResolvers<void>();
    const beforeClose = vi.fn(() => approval.promise);
    const close = vi.fn();
    firstTitle.beforeClose = beforeClose;
    firstTitle.addEventListener("calciteTabsClose", close);

    await page
      .getBySelector("#before-close-title-1")
      .getByRole("button", { name: "Close" })
      .click({ clickCount: 2 });

    expect(beforeClose).toHaveBeenCalledTimes(1);
    expect(firstTitle.closed).toBe(false);
    expect(firstTitle.selected).toBe(true);
    expect(secondTitle.selected).toBe(false);
    expect(close).not.toHaveBeenCalled();

    approval.resolve();

    await expect.element(page.elementLocator(firstTitle)).toHaveAttribute("closed");
    await expect.poll(() => close.mock.calls.length).toBe(1);
    await expect.poll(() => secondTitle.selected).toBe(true);
    expect(firstTitle.selected).toBe(false);
  });

  it("does not close after a pending request is superseded by reopening", async () => {
    const { firstTitle, secondTitle, reRender } = await mountClosableTabs();
    const approval = Promise.withResolvers<void>();
    const beforeClose = vi.fn(() => approval.promise);
    const close = vi.fn();
    firstTitle.beforeClose = beforeClose;
    firstTitle.addEventListener("calciteTabsClose", close);

    await page
      .getBySelector("#before-close-title-1")
      .getByRole("button", { name: "Close" })
      .click();
    expect(beforeClose).toHaveBeenCalledTimes(1);

    firstTitle.closed = false;
    approval.resolve();
    await reRender();

    expect(firstTitle.closed).toBe(false);
    expect(firstTitle.selected).toBe(true);
    expect(secondTitle.selected).toBe(false);
    expect(close).not.toHaveBeenCalled();
    await expect.element(page.elementLocator(firstTitle)).not.toHaveAttribute("closed");
  });

  it("keeps the title open without emitting close events when approval is rejected", async () => {
    const { firstTitle, secondTitle } = await mountClosableTabs();
    const beforeClose = vi.fn(async () => {
      throw new Error("Close canceled");
    });
    const close = vi.fn();
    firstTitle.beforeClose = beforeClose;
    firstTitle.addEventListener("calciteTabsClose", close);

    await page
      .getBySelector("#before-close-title-1")
      .getByRole("button", { name: "Close" })
      .click();

    expect(beforeClose).toHaveBeenCalledTimes(1);
    expect(firstTitle.closed).toBe(false);
    expect(firstTitle.selected).toBe(true);
    expect(secondTitle.selected).toBe(false);
    await expect.element(page.elementLocator(firstTitle)).not.toHaveAttribute("closed");
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
