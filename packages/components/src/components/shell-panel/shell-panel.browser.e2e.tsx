import { Fragment, h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { page, userEvent } from "vitest/browser";
import { commands } from "../../tests/utils/commands";
import { resizeStep } from "../../utils/resources";
import {
  defaults,
  hidden,
  reflects,
  renders,
  slots,
  t9n,
  accessible,
  themed,
} from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { Dir } from "../types";
import { CSS, SLOTS } from "./resources";
import type { ShellPanel } from "./shell-panel";
import type { Shell } from "../shell/shell";
import type { Panel } from "../panel/panel";

mockConsole();

describe("accessible", () => {
  accessible(async () => {
    const renderResult = await mount(
      <calcite-shell-panel heading="Tools" position="start" slot="panel-start">
        <calcite-action-bar slot="action-bar">
          <calcite-action-group>
            <calcite-action icon="plus" text="Add" />
            <calcite-action icon="save" text="Save" />
            <calcite-action icon="layers" text="Layers" />
          </calcite-action-group>
        </calcite-action-bar>
        <p>Primary Content</p>
      </calcite-shell-panel>,
    );

    await vi.waitFor(() => page.getByRole("button", { name: "Close", exact: true }).element());

    return renderResult;
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-shell-panel"),
    [
      {
        propertyName: "collapsed",
        defaultValue: false,
      },
      {
        propertyName: "collapseDisabled",
        defaultValue: false,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "focusTrapOptions",
        defaultValue: undefined,
      },
      {
        propertyName: "panelCollapseDirection",
        defaultValue: "down",
      },
      {
        propertyName: "panelCollapsed",
        defaultValue: false,
      },
      {
        propertyName: "panelCollapsible",
        defaultValue: false,
      },
      {
        propertyName: "menuFlipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "menuPlacement",
        defaultValue: "bottom-end",
      },
      {
        propertyName: "topLayerDisabled",
        defaultValue: false,
      },
      {
        propertyName: "resizable",
        defaultValue: false,
      },
      {
        propertyName: "displayMode",
        defaultValue: "dock",
      },
      {
        propertyName: "widthScale",
        defaultValue: "m",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-shell-panel"),
    [
      {
        propertyName: "panelCollapsed",
        value: true,
      },
      {
        propertyName: "panelCollapsible",
        value: true,
      },
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "menuPlacement",
        value: "top-start",
      },
      {
        propertyName: "topLayerDisabled",
        value: true,
      },
      {
        propertyName: "collapsed",
        value: true,
      },
      {
        propertyName: "collapseDisabled",
        value: true,
      },
      {
        propertyName: "widthScale",
        value: "m",
      },
      {
        propertyName: "width",
        value: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-shell-panel"));
});

describe("renders", () => {
  renders(() => mount(<calcite-shell-panel>content</calcite-shell-panel>), {
    display: "flex",
  });
});

describe("internal panel", () => {
  it("scrolls internal panel content via scrollContentTo", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel style="block-size: 200px; inline-size: 300px">
        <div style="block-size: 1000px; flex-shrink: 0">Scrollable content</div>
      </calcite-shell-panel>,
    );
    const content = page.getByText("Scrollable content", { exact: true }).element();
    const initialTop = content.getBoundingClientRect().top;

    await el.scrollContentTo({ behavior: "instant", top: 100 });

    await expect.poll(() => content.getBoundingClientRect().top).toBe(initialTop - 100);
  });

  it("accepts omitted scrollContentTo options", async () => {
    const { el } = await mount<ShellPanel>(<calcite-shell-panel />);

    await expect(el.scrollContentTo()).resolves.toBeUndefined();
  });

  it("forwards focus trap options and updates to the internal panel", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel focusTrapOptions={{ initialFocus: false }} />,
    );
    const panel = page.getBySelector("calcite-panel");

    await expect.element(panel).toHaveProperty("focusTrapOptions", { initialFocus: false });

    el.focusTrapOptions = { returnFocusOnDeactivate: false };

    await expect
      .element(panel)
      .toHaveProperty("focusTrapOptions", { returnFocusOnDeactivate: false });

    el.focusTrapOptions = undefined;

    await expect.element(panel).toHaveProperty("focusTrapOptions", undefined);
  });

  it("delegates focus via setFocus to the internal panel", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel collapse-disabled>
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const panel = el.shadowRoot.querySelector<Panel["el"]>("calcite-panel")!;
    const setFocus = vi.spyOn(panel, "setFocus");
    const options = { preventScroll: true };

    await expect(el.setFocus(options)).resolves.toBeUndefined();

    expect(setFocus).toHaveBeenCalledExactlyOnceWith(options);
    await expect.element(page.getByRole("button", { name: "Panel content" })).toHaveFocus();

    await expect(el.setFocus()).resolves.toBeUndefined();

    expect(setFocus).toHaveBeenLastCalledWith(undefined);
  });

  it("updates internal panel focus trap elements with optional extra containers", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel heading="Tools">
        <div slot="action-bar">
          <button type="button">Action bar</button>
        </div>
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const panel = el.shadowRoot.querySelector<Panel["el"]>("calcite-panel")!;
    const updateFocusTrapElements = vi.spyOn(panel, "updateFocusTrapElements");
    const extraContainers = [el.querySelector<HTMLDivElement>("div[slot='action-bar']")!];

    await expect(el.updateFocusTrapElements(extraContainers)).resolves.toBeUndefined();

    expect(updateFocusTrapElements).toHaveBeenCalledExactlyOnceWith(extraContainers);

    await userEvent.click(page.getByRole("button", { name: "Panel content" }));
    await userEvent.tab();
    await expect.element(page.getByRole("button", { name: "Action bar" })).toHaveFocus();
    await userEvent.tab();
    await expect
      .poll(() =>
        page.getByRole("button", { name: "Close", exact: true }).element().matches(":focus"),
      )
      .toBe(true);

    await expect(el.updateFocusTrapElements()).resolves.toBeUndefined();

    expect(updateFocusTrapElements).toHaveBeenLastCalledWith(undefined);

    await userEvent.click(page.getByRole("button", { name: "Panel content" }));
    await userEvent.tab();
    await expect
      .poll(() =>
        page.getByRole("button", { name: "Close", exact: true }).element().matches(":focus"),
      )
      .toBe(true);
  });

  it("ignores collapse toggles from nested panels", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel heading="Tools" panelCollapsible>
        <calcite-panel collapsible heading="Nested panel" id="nested-panel">
          <button type="button">Nested content</button>
        </calcite-panel>
      </calcite-shell-panel>,
    );

    await userEvent.click(
      page.getBySelector("#nested-panel").getByRole("button", { name: "Collapse", exact: true }),
    );

    await expect
      .element(page.getByRole("button", { name: "Nested content", includeHidden: true }))
      .not.toBeVisible();
    expect(el.panelCollapsed).toBe(false);
    expect(el.collapsed).toBe(false);
  });

  it("syncs collapsed state when the internal panel is toggled", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel heading="Tools" panelCollapsible>
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const toggle = page.getByRole("button", { name: "Collapse", exact: true });
    const content = page.getByRole("button", { name: "Panel content", includeHidden: true });

    await expect.element(content).toBeVisible();
    await userEvent.click(toggle);

    await expect.element(el).toHaveProperty("panelCollapsed", true);
    await expect.element(content).not.toBeVisible();
    await expect.element(page.getByText("Tools", { exact: true })).toBeVisible();
    expect(el.collapsed).toBe(false);

    await userEvent.click(toggle);

    await expect.element(el).toHaveProperty("panelCollapsed", false);
    await expect.element(content).toBeVisible();
    expect(el.collapsed).toBe(false);
  });

  it("forwards panelCollapseDirection updates to the internal panel", async () => {
    const { el } = await mount<ShellPanel>(<calcite-shell-panel />);
    const panel = page.getBySelector("calcite-panel");

    el.panelCollapseDirection = "up";

    await expect.element(panel).toHaveProperty("collapseDirection", "up");

    el.panelCollapseDirection = "down";

    await expect.element(panel).toHaveProperty("collapseDirection", "down");
  });

  it("forwards panelCollapsible updates to the internal panel", async () => {
    const { el } = await mount<ShellPanel>(<calcite-shell-panel />);
    const toggle = page.getByRole("button", { name: "Collapse", exact: true });

    el.panelCollapsible = true;

    await expect.element(toggle).toBeVisible();

    el.panelCollapsible = false;

    await expect.element(toggle).not.toBeInTheDocument();
  });

  it("forwards panelCollapsed updates to the internal panel", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel heading="Tools" panelCollapsible>
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const panel = page.getBySelector("calcite-panel");
    const content = page.getByRole("button", { name: "Panel content", includeHidden: true });

    el.panelCollapsed = true;

    await expect.element(panel).toHaveProperty("collapsed", true);
    await expect.element(content).not.toBeVisible();
    await expect.element(page.getByText("Tools", { exact: true })).toBeVisible();
    expect(el.collapsed).toBe(false);

    el.panelCollapsed = false;

    await expect.element(panel).toHaveProperty("collapsed", false);
    await expect.element(content).toBeVisible();
  });

  it("forwards disabled updates to the internal panel", async () => {
    const { el } = await mount<ShellPanel>(<calcite-shell-panel disabled />);
    const panel = page.getBySelector("calcite-panel");

    await expect.element(panel).toHaveProperty("disabled", true);

    el.disabled = false;

    await expect.element(panel).toHaveProperty("disabled", false);
  });

  it("prevents interaction with all panel content when disabled", async () => {
    const { el } = await mount<ShellPanel>(
      <>
        <calcite-shell-panel disabled resizable>
          <div slot="action-bar">
            <button type="button">Action bar</button>
          </div>
          <button type="button">Panel content</button>
        </calcite-shell-panel>
        <button type="button">Outside</button>
      </>,
    );
    const container = el.shadowRoot.querySelector<HTMLDivElement>(`.${CSS.container}`)!;
    const resizeHandle = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.resizeHandle}`)!;

    expect(container.inert).toBe(true);
    expect(resizeHandle.tabIndex).toBe(-1);
    await userEvent.tab();
    await expect.element(page.getByRole("button", { name: "Outside" })).toHaveFocus();
  });

  it("forwards menuFlipPlacements updates to the internal panel", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel menuFlipPlacements={["top", "right"]} />,
    );
    const panel = page.getBySelector("calcite-panel");

    await expect.element(panel).toHaveProperty("menuFlipPlacements", ["top", "right"]);

    el.menuFlipPlacements = ["bottom"];

    await expect.element(panel).toHaveProperty("menuFlipPlacements", ["bottom"]);

    el.menuFlipPlacements = undefined;

    await expect.element(panel).toHaveProperty("menuFlipPlacements", undefined);
  });

  it("forwards topLayerDisabled updates to the internal panel", async () => {
    const { el } = await mount<ShellPanel>(<calcite-shell-panel topLayerDisabled />);
    const panel = page.getBySelector("calcite-panel");

    await expect.element(panel).toHaveProperty("topLayerDisabled", true);

    el.topLayerDisabled = false;

    await expect.element(panel).toHaveProperty("topLayerDisabled", false);
  });

  it("forwards menuPlacement updates to the internal panel", async () => {
    const { el } = await mount<ShellPanel>(<calcite-shell-panel />);
    const panel = page.getBySelector("calcite-panel");

    el.menuPlacement = "top-start";

    await expect.element(panel).toHaveProperty("menuPlacement", "top-start");

    el.menuPlacement = "right";

    await expect.element(panel).toHaveProperty("menuPlacement", "right");
  });

  it.each(["Close action", "Escape"])(
    "returns focus to the configured target after collapsing via %s without changing the host tabindex",
    async (closeMethod) => {
      const { el } = await mount<ShellPanel>(
        <>
          <calcite-shell-panel
            focusTrapOptions={{
              setReturnFocus: () => document.querySelector<HTMLButtonElement>("#opener")!,
            }}
            heading="Tools"
          >
            <button type="button">Panel content</button>
          </calcite-shell-panel>
          <button id="opener" type="button">
            Open tools
          </button>
        </>,
      );

      await userEvent.click(page.getByRole("button", { name: "Panel content" }));

      await (closeMethod === "Escape"
        ? userEvent.keyboard("{Escape}")
        : userEvent.click(page.getByRole("button", { name: "Close", exact: true })));

      await expect.element(el).toHaveProperty("collapsed", true);
      await expect.element(page.getByRole("button", { name: "Open tools" })).toHaveFocus();
      expect(el.hasAttribute("tabindex")).toBe(false);
    },
  );

  it.each(["Close action", "Escape"])(
    "collapses and expands the internal panel without hiding the action bar via %s",
    async (closeMethod) => {
      const collapse = vi.fn();
      const expand = vi.fn();
      const { el } = await mount<ShellPanel>(
        <calcite-shell-panel
          heading="Tools"
          oncalciteShellPanelCollapse={collapse}
          oncalciteShellPanelExpand={expand}
        >
          <calcite-action-bar slot="action-bar">
            <calcite-action text="Layers" />
          </calcite-action-bar>
          <button type="button">Panel content</button>
        </calcite-shell-panel>,
      );
      const panel = page.getBySelector("calcite-panel");
      const content = page.getByRole("button", { name: "Panel content", includeHidden: true });
      const action = page.getByRole("button", { name: "Layers" });

      await userEvent.click(content);
      await (closeMethod === "Escape"
        ? userEvent.keyboard("{Escape}")
        : userEvent.click(page.getByRole("button", { name: "Close", exact: true })));

      await expect.element(el).toHaveAttribute("collapsed");
      await expect.element(panel).toHaveProperty("closed", true);
      await expect.element(content).not.toBeVisible();
      await expect.element(action).toBeVisible();
      expect(collapse).toHaveBeenCalledOnce();
      expect(el.panelCollapsed).toBe(false);

      el.collapsed = false;

      await expect.element(panel).toHaveProperty("closed", false);
      await expect.element(content).toBeVisible();
      await expect.element(action).toBeVisible();
      expect(expand).toHaveBeenCalledOnce();

      el.collapsed = true;

      await expect.element(panel).toHaveProperty("closed", true);
      await expect.element(content).not.toBeVisible();
      await expect.element(action).toBeVisible();
      expect(collapse).toHaveBeenCalledTimes(2);
    },
  );

  it("omits the close action when collapsing is disabled", async () => {
    await mount(
      <calcite-shell-panel collapse-disabled heading="Tools">
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );

    await userEvent.click(page.getByRole("button", { name: "Panel content" }));
    await userEvent.keyboard("{Escape}");

    await expect
      .element(page.getByRole("button", { name: "Close", exact: true }))
      .not.toBeInTheDocument();
    await expect.element(page.getByRole("button", { name: "Panel content" })).toBeVisible();
  });

  it("traps focus within the closable internal panel", async () => {
    await mount(
      <div>
        <calcite-shell-panel heading="Tools">
          <button type="button">Panel content</button>
        </calcite-shell-panel>
        <button type="button">Outside</button>
      </div>,
    );

    await userEvent.click(page.getByRole("button", { name: "Panel content" }));
    await userEvent.tab();

    await expect
      .poll(() =>
        page.getByRole("button", { name: "Close", exact: true }).element().matches(":focus"),
      )
      .toBe(true);
    await userEvent.tab({ shift: true });
    await expect.element(page.getByRole("button", { name: "Panel content" })).toHaveFocus();
  });

  it("honors the configured initial focus target", async () => {
    await mount(
      <calcite-shell-panel
        focusTrapOptions={{
          initialFocus: () => document.querySelector<HTMLButtonElement>("#preferred-focus")!,
        }}
        heading="Tools"
      >
        <button type="button">First control</button>
        <button id="preferred-focus" type="button">
          Preferred control
        </button>
      </calcite-shell-panel>,
    );

    await expect.element(page.getByRole("button", { name: "Preferred control" })).toHaveFocus();
  });

  it("does not trap focus when collapsing is disabled", async () => {
    await mount(
      <div>
        <calcite-shell-panel collapse-disabled>
          <button type="button">Panel content</button>
        </calcite-shell-panel>
        <button type="button">Outside</button>
      </div>,
    );

    await userEvent.click(page.getByRole("button", { name: "Panel content" }));
    await userEvent.tab();

    await expect.element(page.getByRole("button", { name: "Outside" })).toHaveFocus();
  });

  it.each(["collapseDisabled", "collapsed", "disabled"] as const)(
    "releases the internal focus trap when %s becomes true",
    async (property) => {
      const { el } = await mount<ShellPanel>(
        <>
          <calcite-shell-panel>
            <button type="button">Panel content</button>
          </calcite-shell-panel>
          <button type="button">Outside</button>
        </>,
      );
      const outside = page.getByRole("button", { name: "Outside" });

      await userEvent.click(page.getByRole("button", { name: "Panel content" }));
      el[property] = true;

      await expect.element(page.getByRole("article", { includeHidden: true })).toBeInTheDocument();
      outside.element().focus();
      await expect.element(outside).toHaveFocus();
    },
  );

  it("releases the fallback panel trap while custom content is assigned", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel>
        <button type="button">Panel content</button>
        <button type="button">Custom content</button>
      </calcite-shell-panel>,
    );
    const customContent = el.querySelector<HTMLButtonElement>("button:last-child")!;

    await userEvent.click(page.getByRole("button", { name: "Panel content" }));
    customContent.slot = "custom-content";

    await expect
      .element(page.getBySelector("calcite-panel"))
      .toHaveProperty("focusTrapDisabled", true);
    customContent.focus();
    await expect.element(page.getByRole("button", { name: "Custom content" })).toHaveFocus();

    customContent.removeAttribute("slot");
    await userEvent.click(page.getByRole("button", { name: "Custom content" }));
    await userEvent.tab();
    await expect
      .poll(() =>
        page.getByRole("button", { name: "Close", exact: true }).element().matches(":focus"),
      )
      .toBe(true);
  });
});

describe("slots", () => {
  slots(() => mount("calcite-shell-panel"), SLOTS);

  it("forwards heading content to the internal panel", async () => {
    await mount(
      <calcite-shell-panel heading="Property heading" headingLevel={2}>
        <span slot="heading">Slotted heading</span>
      </calcite-shell-panel>,
    );

    await expect.element(page.getByRole("heading", { name: "Slotted heading" })).toBeVisible();
    await expect.element(page.getByText("Property heading")).not.toBeInTheDocument();
  });

  it("forwards description content to the internal panel", async () => {
    await mount(
      <calcite-shell-panel description="Property description" heading="Tools">
        <span slot="description">Slotted description</span>
      </calcite-shell-panel>,
    );

    await expect.element(page.getByText("Slotted description")).toBeVisible();
    await expect.element(page.getByText("Property description")).not.toBeInTheDocument();
  });

  it("forwards header-top content to the internal panel", async () => {
    await mount(
      <calcite-shell-panel heading="Tools">
        <div slot="header-top">Header top</div>
      </calcite-shell-panel>,
    );

    await expect.element(page.getByText("Header top")).toBeVisible();
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-shell-panel"));
});

describe("shell-panel updateSize public method", () => {
  mockConsole();

  type PanelSlot = "panel-start" | "panel-end" | "panel-top" | "panel-bottom";
  type PanelLayout = ShellPanel["layout"];
  type ResizeAxis = "inline" | "block";
  type ComputedSizeProp = "inlineSize" | "blockSize";
  type SizeCssProp = "--calcite-shell-panel-width" | "--calcite-shell-panel-height";
  type RectDimensionProp = "width" | "height";

  type TestCase = {
    dir: Dir;
    changeAfterMount?: "dir" | "slot" | "position";
    slot: PanelSlot;
    position: ShellPanel["position"];
  };

  /**
   * Options representing supported use cases to test.
   *
   * Note: mismatched slot and position are not supported (e.g., slot=panel-start + position=end)
   */
  const testCases: TestCase[] = [
    { dir: "ltr", slot: "panel-start", position: "start" },
    { dir: "ltr", slot: "panel-end", position: "end" },
    { dir: "rtl", slot: "panel-start", position: "start" },
    { dir: "rtl", slot: "panel-end", position: "end" },

    { dir: "ltr", slot: "panel-start", position: "start", changeAfterMount: "dir" },
    { dir: "ltr", slot: "panel-end", position: "end", changeAfterMount: "dir" },
    { dir: "rtl", slot: "panel-start", position: "start", changeAfterMount: "dir" },
    { dir: "rtl", slot: "panel-end", position: "end", changeAfterMount: "dir" },

    { dir: "ltr", slot: "panel-start", position: "start", changeAfterMount: "slot" },
    { dir: "ltr", slot: "panel-end", position: "end", changeAfterMount: "slot" },
    { dir: "rtl", slot: "panel-start", position: "start", changeAfterMount: "slot" },
    { dir: "rtl", slot: "panel-end", position: "end", changeAfterMount: "slot" },

    { dir: "ltr", slot: "panel-top", position: "start" },
    { dir: "ltr", slot: "panel-bottom", position: "end" },
    { dir: "rtl", slot: "panel-top", position: "start" },
    { dir: "rtl", slot: "panel-bottom", position: "end" },

    { dir: "ltr", slot: "panel-top", position: "start", changeAfterMount: "dir" },
    { dir: "ltr", slot: "panel-bottom", position: "end", changeAfterMount: "dir" },
    { dir: "rtl", slot: "panel-top", position: "start", changeAfterMount: "dir" },
    { dir: "rtl", slot: "panel-bottom", position: "end", changeAfterMount: "dir" },

    { dir: "ltr", slot: "panel-top", position: "start", changeAfterMount: "slot" },
    { dir: "ltr", slot: "panel-bottom", position: "end", changeAfterMount: "slot" },
    { dir: "rtl", slot: "panel-top", position: "start", changeAfterMount: "slot" },
    { dir: "rtl", slot: "panel-bottom", position: "end", changeAfterMount: "slot" },
  ];

  function layoutFromPanelSlot(slot: PanelSlot): PanelLayout {
    return slot === "panel-start" || slot === "panel-end" ? "vertical" : "horizontal";
  }

  function getCrossAxisResizeTestSlot(slot: PanelSlot): PanelSlot {
    const layout = layoutFromPanelSlot(slot);

    return layout === "horizontal"
      ? slot === "panel-bottom"
        ? "panel-end"
        : "panel-start"
      : slot === "panel-start"
        ? "panel-top"
        : "panel-bottom";
  }

  function getRectDimensionProp(layout: PanelLayout): RectDimensionProp {
    return layout === "vertical" ? "width" : "height";
  }

  type SetupResult = Awaited<ReturnType<typeof setUpShellPanel>>;
  type LayoutResetContext = Pick<
    SetupResult,
    "shell" | "content" | "afterConnectContentRect" | "panel"
  > & {
    slot: PanelSlot;
  };
  type MethodOverrideContext = Pick<
    SetupResult,
    | "axis"
    | "baselineContentSize"
    | "shell"
    | "content"
    | "overrideSize"
    | "panel"
    | "computedSizeProp"
  >;

  async function assertLayoutChangeResetsSize({
    shell,
    content,
    afterConnectContentRect,
    panel,
    slot,
  }: LayoutResetContext): Promise<void> {
    const layout = layoutFromPanelSlot(slot);
    panel.slot = getCrossAxisResizeTestSlot(slot);
    await panel.manager.component.updateComplete;
    await shell.manager.component.updateComplete;
    const currentRect = content.getBoundingClientRect();
    const rectDimensionProp = getRectDimensionProp(layout);

    expect(currentRect[rectDimensionProp]).toBe(afterConnectContentRect[rectDimensionProp]);

    panel.slot = slot;
    await panel.manager.component.updateComplete;
    await shell.manager.component.updateComplete;
  }

  async function assertMethodOverride({
    axis,
    baselineContentSize,
    shell,
    content,
    overrideSize,
    panel,
    computedSizeProp,
  }: MethodOverrideContext): Promise<void> {
    await panel.updateSize({ [axis]: overrideSize });
    await shell.manager.component.updateComplete;
    expect(getComputedStyle(content)[computedSizeProp]).toBe(`${overrideSize}px`);

    await panel.updateSize({ [axis]: null });
    await shell.manager.component.updateComplete;
    expect(getComputedStyle(content)[computedSizeProp]).toBe(`${baselineContentSize}px`);
  }

  async function setUpShellPanel({ dir, changeAfterMount, slot, position }: TestCase): Promise<{
    axis: ResizeAxis;
    panel: ShellPanel["el"];
    content: HTMLElement;
    handle: HTMLElement;
    shell: Shell["el"];
    computedSizeProp: ComputedSizeProp;
    sizeCssProp: SizeCssProp;
    afterConnectContentRect: DOMRect;
    baselineContentSize: number;
    overrideSize: number;
  }> {
    const layout = layoutFromPanelSlot(slot);
    const axis: ResizeAxis = layout === "vertical" ? "inline" : "block";
    const initialShellPanelSlot: PanelSlot =
      changeAfterMount === "slot"
        ? // we use cross-axis slot for additional coverage
          getCrossAxisResizeTestSlot(slot)
        : slot;
    const initialPosition: ShellPanel["position"] =
      changeAfterMount === "position" ? (position === "start" ? "end" : "start") : position;

    const { el, component } = await mount<"calcite-shell">(
      <calcite-shell dir={changeAfterMount === "dir" ? undefined : dir}>
        <calcite-shell-panel position={initialPosition} resizable slot={initialShellPanelSlot}>
          <calcite-panel>Content</calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>,
    );
    const panel = page
      .getBySelector("calcite-shell > calcite-shell-panel")
      .element() as ShellPanel["el"];
    const { content, handle } = getShellPanelElements(panel);
    const sizeCssProp =
      layout === "horizontal" ? "--calcite-shell-panel-height" : "--calcite-shell-panel-width";
    const computedSizeProp: ComputedSizeProp = layout === "horizontal" ? "blockSize" : "inlineSize";
    const afterConnectContentRect = content.getBoundingClientRect();

    if (changeAfterMount === "dir") {
      el.dir = dir;
    } else if (changeAfterMount === "slot") {
      panel.slot = slot;
    } else if (changeAfterMount === "position") {
      panel.position = position;
    }

    await component.updateComplete;
    await panel.manager.component.updateComplete;

    const baselineContentSize = parseFloat(getComputedStyle(content)[computedSizeProp]);
    const overrideSize = Math.round(baselineContentSize + 10);

    return {
      axis,
      panel,
      content,
      handle,
      shell: component,
      computedSizeProp,
      sizeCssProp,
      afterConnectContentRect,
      baselineContentSize,
      overrideSize,
    };
  }

  function getUserInteraction({ dir, slot }: Pick<TestCase, "dir" | "slot">): {
    keyboardKey: string;
    mouseDelta: {
      dx: number;
      dy: number;
    };
  } {
    const layout = layoutFromPanelSlot(slot);
    const isVertical = layout === "vertical";
    const isRtl = dir === "rtl";
    const direction = isVertical
      ? slot === "panel-start"
        ? isRtl
          ? "left"
          : "right"
        : isRtl
          ? "right"
          : "left"
      : slot === "panel-bottom"
        ? "up"
        : "down";

    const keyboardKey =
      direction === "left"
        ? "{ArrowLeft}"
        : direction === "right"
          ? "{ArrowRight}"
          : direction === "up"
            ? "{ArrowUp}"
            : "{ArrowDown}";

    const sign = direction === "left" || direction === "up" ? -1 : 1;
    const deltaAmount = sign * 10;
    const mouseDelta =
      layout === "vertical" ? { dx: deltaAmount, dy: 0 } : { dx: 0, dy: deltaAmount };

    return {
      keyboardKey,
      mouseDelta,
    };
  }

  function getShellPanelBySlot(slot: PanelSlot): ShellPanel["el"] {
    return page
      .getBySelector(`calcite-shell > calcite-shell-panel[slot="${slot}"]`)
      .element() as ShellPanel["el"];
  }

  function getShellPanelElements(panel: ShellPanel["el"]): {
    actionBarContainer: HTMLElement;
    content: HTMLElement;
    handle: HTMLElement;
  } {
    const panelLocator = page.elementLocator(panel);

    return {
      actionBarContainer: panelLocator
        .getBySelector(`:scope > .${CSS.container} > .${CSS.actionBarContainer}`)
        .element() as HTMLElement,
      content: panelLocator
        .getBySelector(`:scope > .${CSS.container} > .${CSS.contentContainer} > .${CSS.content}`)
        .element() as HTMLElement,
      handle: panelLocator
        .getBySelector(
          `:scope > .${CSS.container} > .${CSS.contentContainer} > .${CSS.content} > .${CSS.resizeHandle}`,
        )
        .element() as HTMLElement,
    };
  }

  async function dragPanelToMax({
    component,
    handle,
    layout,
    panel,
    shellSize,
  }: {
    component: Shell;
    handle: HTMLElement;
    layout: PanelLayout;
    panel: ShellPanel["el"];
    shellSize: number;
  }): Promise<void> {
    const handleRect = handle.getBoundingClientRect();

    await userEvent.hover(handle);
    await commands.mouseDown();
    await commands.mouseMove(
      layout === "vertical" ? handleRect.left - shellSize : handleRect.left + handleRect.width / 2,
      layout === "vertical" ? handleRect.top + handleRect.height / 2 : handleRect.top - shellSize,
    );
    await commands.mouseUp();

    await component.updateComplete;
    await panel.manager.component.updateComplete;
  }

  it("prevents resizing while disabled and resumes resizing when enabled", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel
        resizable
        style="display: inline-flex; --calcite-shell-panel-width: 320px; --calcite-shell-panel-max-width: 600px"
      >
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const handle = page.getByRole("separator", { includeHidden: true });
    const content = page
      .elementLocator(el)
      .getBySelector(`:scope > .${CSS.container} > .${CSS.contentContainer} > .${CSS.content}`);

    async function expectWidth(width: number): Promise<void> {
      await expect.element(content).toHaveStyle({ inlineSize: `${width}px` });
      await expect.element(handle).toHaveAttribute("aria-valuenow", `${width}`);
    }

    async function dragResizeHandle(): Promise<void> {
      const { left, top, width, height } = handle.element().getBoundingClientRect();
      await commands.mouseMove(left + width / 2, top + height / 2);
      await commands.mouseDown();
      await commands.mouseMove(left + width / 2 + 20, top + height / 2);
      await commands.mouseUp();
    }

    await expectWidth(320);
    await dragResizeHandle();
    await expectWidth(340);
    await handle.click();
    await userEvent.keyboard("{ArrowRight}");
    await expectWidth(340 + resizeStep);

    el.disabled = true;

    await expect.element(handle).toHaveAttribute("aria-disabled", "true");
    await expect.element(handle).toHaveAttribute("tabindex", "-1");
    await userEvent.keyboard("{ArrowRight}");
    await expectWidth(340 + resizeStep);
    await dragResizeHandle();
    await expectWidth(340 + resizeStep);

    el.disabled = false;

    await expect.element(handle).toHaveAttribute("aria-disabled", "false");
    await expect.element(handle).toHaveAttribute("tabindex", "0");
    await handle.click();
    await userEvent.keyboard("{ArrowRight}");
    await expectWidth(340 + 2 * resizeStep);
    await dragResizeHandle();
    await expectWidth(360 + 2 * resizeStep);
  });

  it("resumes mouse resizing after collapsing and expanding", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel
        resizable
        style="display: inline-flex; --calcite-shell-panel-width: 320px"
      >
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const handle = page.getByRole("separator", { includeHidden: true });
    const content = page
      .elementLocator(el)
      .getBySelector(`:scope > .${CSS.container} > .${CSS.contentContainer} > .${CSS.content}`);

    await expect.element(handle).toHaveAttribute("aria-valuenow", "320");

    el.collapsed = true;

    await expect.element(handle).not.toBeInTheDocument();

    el.collapsed = false;

    await expect.element(handle).toBeVisible();
    const { left, top, width, height } = handle.element().getBoundingClientRect();

    await userEvent.hover(handle);
    await commands.mouseDown();
    await commands.mouseMove(left + width / 2 + resizeStep, top + height / 2);
    await commands.mouseUp();

    await expect.element(handle).toHaveAttribute("aria-valuenow", `${320 + resizeStep}`);
    await expect.element(content).toHaveStyle({ inlineSize: `${320 + resizeStep}px` });
  });

  it("resizes horizontal panels with the keyboard within their bounds", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel
        layout="horizontal"
        resizable
        style="--calcite-shell-panel-height: 100px; --calcite-shell-panel-min-height: 60px; --calcite-shell-panel-max-height: 300px"
      >
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const handle = page.getByRole("separator");
    const content = page
      .elementLocator(el)
      .getBySelector(`:scope > .${CSS.container} > .${CSS.contentContainer} > .${CSS.content}`);

    async function expectHeight(height: number): Promise<void> {
      await expect.element(handle).toHaveAttribute("aria-valuenow", `${height}`);
      await expect.element(content).toHaveStyle({ blockSize: `${height}px` });
    }

    await expectHeight(100);
    await userEvent.click(handle);
    await userEvent.keyboard("{ArrowDown}");
    await expectHeight(100 + resizeStep);
    await userEvent.keyboard("{ArrowUp}");
    await expectHeight(100);
    await userEvent.keyboard("{ArrowUp}");
    await expectHeight(100 - resizeStep);
    await userEvent.keyboard("{ArrowDown}");
    await expectHeight(100);
    await userEvent.keyboard("{ArrowDown}");
    await expectHeight(100 + resizeStep);
    await userEvent.keyboard("{Home}");
    await expectHeight(60);
    await userEvent.keyboard("{ArrowUp}");
    await expectHeight(60);
    await userEvent.keyboard("{End}");
    await expectHeight(300);
  });

  it("accounts for action bar width when applying max width to vertical panels", async () => {
    const shellWidth = 700;
    const { component } = await mount<"calcite-shell">(
      <calcite-shell style={`inline-size: ${shellWidth}px; block-size: 400px; position: relative;`}>
        <calcite-shell-panel slot="panel-start">
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="save" text="Save" />
          </calcite-action-bar>
          <calcite-panel>Start content</calcite-panel>
        </calcite-shell-panel>
        <calcite-panel>Main content</calcite-panel>
        <calcite-shell-panel
          resizable
          slot="panel-end"
          style="--calcite-shell-panel-max-width: 100%;"
        >
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="layers" text="Layers" />
          </calcite-action-bar>
          <calcite-panel>Content</calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>,
    );
    const panel = getShellPanelBySlot("panel-end");
    const { actionBarContainer, content, handle } = getShellPanelElements(panel);

    await dragPanelToMax({ component, handle, layout: "vertical", panel, shellSize: shellWidth });

    const occupiedWidth =
      actionBarContainer.getBoundingClientRect().width + content.getBoundingClientRect().width;

    expect(Math.ceil(occupiedWidth)).toBeLessThanOrEqual(shellWidth);
  });

  it("accounts for action bar width and float-all spacing when applying max width to vertical panels", async () => {
    const shellWidth = 1000;
    const { el, component } = await mount<"calcite-shell">(
      <calcite-shell style={`inline-size: ${shellWidth}px; block-size: 400px; position: relative;`}>
        <calcite-shell-panel slot="panel-start">
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="save" text="Save" />
          </calcite-action-bar>
          <calcite-panel>Start content</calcite-panel>
        </calcite-shell-panel>
        <calcite-panel>Main content</calcite-panel>
        <calcite-shell-panel
          display-mode="float-all"
          resizable
          slot="panel-end"
          style="--calcite-shell-panel-max-width: 100%;"
        >
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="layers" text="Layers" />
          </calcite-action-bar>
          <calcite-panel>Content</calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>,
    );
    const panel = getShellPanelBySlot("panel-end");
    const { actionBarContainer, handle } = getShellPanelElements(panel);

    await dragPanelToMax({ component, handle, layout: "vertical", panel, shellSize: shellWidth });

    expect(Math.ceil(actionBarContainer.getBoundingClientRect().right)).toBeLessThanOrEqual(
      Math.ceil(el.getBoundingClientRect().right),
    );
  });

  it("accounts for action bar width and float spacing when applying max width to vertical panels", async () => {
    const shellWidth = 1000;
    const { el, component } = await mount<"calcite-shell">(
      <calcite-shell style={`inline-size: ${shellWidth}px; block-size: 400px; position: relative;`}>
        <calcite-shell-panel slot="panel-start">
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="save" text="Save" />
          </calcite-action-bar>
          <calcite-panel>Start content</calcite-panel>
        </calcite-shell-panel>
        <calcite-panel>Main content</calcite-panel>
        <calcite-shell-panel
          display-mode="float"
          resizable
          slot="panel-end"
          style="--calcite-shell-panel-max-width: 100%;"
        >
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="layers" text="Layers" />
          </calcite-action-bar>
          <calcite-panel>Content</calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>,
    );
    const panel = getShellPanelBySlot("panel-end");
    const { actionBarContainer, handle } = getShellPanelElements(panel);

    await dragPanelToMax({ component, handle, layout: "vertical", panel, shellSize: shellWidth });

    expect(Math.ceil(actionBarContainer.getBoundingClientRect().right)).toBeLessThanOrEqual(
      Math.ceil(el.getBoundingClientRect().right),
    );
  });

  it("accounts for action bar height when applying max height to horizontal panels", async () => {
    const shellHeight = 700;
    const { component } = await mount<"calcite-shell">(
      <calcite-shell
        style={`inline-size: 700px; block-size: ${shellHeight}px; position: relative;`}
      >
        <calcite-shell-panel slot="panel-top">
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="save" text="Save" />
          </calcite-action-bar>
          <calcite-panel>Top content</calcite-panel>
        </calcite-shell-panel>
        <calcite-panel>Main content</calcite-panel>
        <calcite-shell-panel
          resizable
          slot="panel-bottom"
          style="--calcite-shell-panel-max-height: 100%;"
        >
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="layers" text="Layers" />
          </calcite-action-bar>
          <calcite-panel>Content</calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>,
    );
    const panel = getShellPanelBySlot("panel-bottom");
    const siblingPanel = getShellPanelBySlot("panel-top");
    const centerPanel = page
      .getBySelector("calcite-shell > calcite-panel:not([slot])")
      .element() as Panel["el"];
    const { actionBarContainer, content, handle } = getShellPanelElements(panel);

    await dragPanelToMax({
      component,
      handle,
      layout: "horizontal",
      panel,
      shellSize: shellHeight,
    });

    const occupiedHeight =
      actionBarContainer.getBoundingClientRect().height + content.getBoundingClientRect().height;
    const centerPanelComputedStyle = getComputedStyle(centerPanel);
    const centerPanelBorderHeight =
      parseFloat(centerPanelComputedStyle.borderBlockStartWidth) +
      parseFloat(centerPanelComputedStyle.borderBlockEndWidth);
    const totalOccupiedHeight =
      siblingPanel.getBoundingClientRect().height + occupiedHeight + centerPanelBorderHeight;

    expect(Math.ceil(occupiedHeight)).toBeLessThanOrEqual(shellHeight);
    expect(Math.ceil(totalOccupiedHeight)).toBeLessThanOrEqual(shellHeight);
  });

  it("accounts for action bar height and float-all spacing when applying max height to horizontal panels", async () => {
    const shellHeight = 700;
    const { el, component } = await mount<"calcite-shell">(
      <calcite-shell
        style={`inline-size: 700px; block-size: ${shellHeight}px; position: relative;`}
      >
        <calcite-shell-panel slot="panel-top">
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="save" text="Save" />
          </calcite-action-bar>
          <calcite-panel>Top content</calcite-panel>
        </calcite-shell-panel>
        <calcite-panel>Main content</calcite-panel>
        <calcite-shell-panel
          display-mode="float-all"
          resizable
          slot="panel-bottom"
          style="--calcite-shell-panel-max-height: 100%;"
        >
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="layers" text="Layers" />
          </calcite-action-bar>
          <calcite-panel>Content</calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>,
    );
    const panel = getShellPanelBySlot("panel-bottom");
    const { actionBarContainer, handle } = getShellPanelElements(panel);

    await dragPanelToMax({
      component,
      handle,
      layout: "horizontal",
      panel,
      shellSize: shellHeight,
    });

    expect(Math.ceil(actionBarContainer.getBoundingClientRect().bottom)).toBeLessThanOrEqual(
      Math.ceil(el.getBoundingClientRect().bottom),
    );
  });

  it("accounts for action bar height and float spacing when applying max height to horizontal panels", async () => {
    const shellHeight = 700;
    const { el, component } = await mount<"calcite-shell">(
      <calcite-shell
        style={`inline-size: 700px; block-size: ${shellHeight}px; position: relative;`}
      >
        <calcite-shell-panel slot="panel-top">
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="save" text="Save" />
          </calcite-action-bar>
          <calcite-panel>Top content</calcite-panel>
        </calcite-shell-panel>
        <calcite-panel>Main content</calcite-panel>
        <calcite-shell-panel
          display-mode="float"
          resizable
          slot="panel-bottom"
          style="--calcite-shell-panel-max-height: 100%;"
        >
          <calcite-action-bar slot="action-bar">
            <calcite-action icon="layers" text="Layers" />
          </calcite-action-bar>
          <calcite-panel>Content</calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>,
    );
    const panel = getShellPanelBySlot("panel-bottom");
    const { actionBarContainer, handle } = getShellPanelElements(panel);

    await dragPanelToMax({
      component,
      handle,
      layout: "horizontal",
      panel,
      shellSize: shellHeight,
    });

    expect(Math.ceil(actionBarContainer.getBoundingClientRect().bottom)).toBeLessThanOrEqual(
      Math.ceil(el.getBoundingClientRect().bottom),
    );
  });

  it("applies touch-action:none to the resize handle to enable resizing on mobile/touch devices", async () => {
    const { el } = await mount<"calcite-shell-panel">(
      <calcite-shell-panel resizable>
        <calcite-panel>Content</calcite-panel>
      </calcite-shell-panel>,
    );
    const handle = page
      .elementLocator(el)
      .getBySelector(
        `:scope > .${CSS.container} > .${CSS.contentContainer} > .${CSS.content} > .${CSS.resizeHandle}`,
      )
      .element() as HTMLElement;

    expect(getComputedStyle(handle).touchAction).toBe("none");
  });

  testCases.forEach(({ dir, changeAfterMount, slot, position }) => {
    const layout = layoutFromPanelSlot(slot);
    const { keyboardKey, mouseDelta } = getUserInteraction({ dir, slot });

    const testLabel = `${layout} panel [dir=${dir}, changeAfterMount=${changeAfterMount ?? "none"}, slot=${slot}, position=${position}]`;

    it(`default size → token resize → KEYBOARD resize → method resize → clear method override (${testLabel})`, async () => {
      const {
        axis,
        panel,
        content,
        shell,
        computedSizeProp,
        sizeCssProp,
        afterConnectContentRect,
        baselineContentSize,
        overrideSize,
      } = await setUpShellPanel({
        dir,
        changeAfterMount,
        slot,
        position,
      });

      panel.style.setProperty(sizeCssProp, `${baselineContentSize}px`);
      await shell.manager.component.updateComplete;

      expect(getComputedStyle(content)).toHaveProperty(
        computedSizeProp,
        `${baselineContentSize}px`,
      );

      await page.getByRole("separator", { name: "Resize", exact: true }).click();
      await userEvent.keyboard(keyboardKey);
      const afterUserResize = parseFloat(getComputedStyle(content)[computedSizeProp]);
      expect(afterUserResize).toBeGreaterThan(baselineContentSize);

      if (changeAfterMount === "slot") {
        await assertLayoutChangeResetsSize({
          shell,
          content,
          afterConnectContentRect,
          panel,
          slot,
        });
      }

      await assertMethodOverride({
        axis,
        baselineContentSize,
        shell,
        content,
        overrideSize,
        panel,
        computedSizeProp,
      });
    });

    it(`default size → token resize → MOUSE resize → method resize → clear method override (${testLabel})`, async () => {
      const {
        axis,
        panel,
        content,
        handle,
        shell,
        computedSizeProp,
        sizeCssProp,
        afterConnectContentRect,
        baselineContentSize,
        overrideSize,
      } = await setUpShellPanel({
        dir,
        changeAfterMount,
        slot,
        position,
      });

      panel.style.setProperty(sizeCssProp, `${baselineContentSize}px`);
      await shell.manager.component.updateComplete;
      expect(getComputedStyle(content)[computedSizeProp]).toBe(`${baselineContentSize}px`);

      const handleRect = handle.getBoundingClientRect();
      const startX = handleRect.left + handleRect.width / 2 + mouseDelta.dx;
      const startY = handleRect.top + handleRect.height / 2 + mouseDelta.dy;

      await userEvent.hover(handle);
      await commands.mouseDown();
      await commands.mouseMove(startX, startY);
      await commands.mouseUp();

      const afterUserResize = parseFloat(getComputedStyle(content)[computedSizeProp]);
      expect(afterUserResize).toBeGreaterThan(baselineContentSize);

      if (changeAfterMount === "slot") {
        await assertLayoutChangeResetsSize({
          shell,
          content,
          afterConnectContentRect,
          panel,
          slot,
        });
      }

      await assertMethodOverride({
        axis,
        baselineContentSize,
        shell,
        content,
        overrideSize,
        panel,
        computedSizeProp,
      });
    });
  });
});

describe("themed", () => {
  describe("internal panel", () => {
    themed(
      () => mount(<calcite-shell-panel heading="Panel heading">Panel content</calcite-shell-panel>),
      {
        "--calcite-shell-panel-corner-radius": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-corner-radius",
        },
        "--calcite-shell-panel-heading-text-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-heading-text-color",
        },
        "--calcite-shell-panel-icon-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-icon-color",
        },
        "--calcite-shell-panel-description-text-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-description-text-color",
        },
        "--calcite-shell-panel-border-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-border-color",
        },
        "--calcite-shell-panel-background-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-background-color",
        },
        "--calcite-shell-panel-content-top-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-content-top-space",
        },
        "--calcite-shell-panel-content-bottom-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-content-bottom-space",
        },
        "--calcite-shell-panel-header-top-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-top-space",
        },
        "--calcite-shell-panel-header-background-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-background-color",
        },
        "--calcite-shell-panel-header-action-background-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-action-background-color",
        },
        "--calcite-shell-panel-header-action-background-color-hover": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-action-background-color-hover",
        },
        "--calcite-shell-panel-header-action-background-color-press": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-action-background-color-press",
        },
        "--calcite-shell-panel-header-action-text-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-action-text-color",
        },
        "--calcite-shell-panel-header-action-text-color-press": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-action-text-color-press",
        },
        "--calcite-shell-panel-footer-background-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-footer-background-color",
        },
        "--calcite-shell-panel-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-space",
        },
        "--calcite-shell-panel-header-content-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-header-content-space",
        },
        "--calcite-shell-panel-footer-space": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-panel-footer-space",
        },
        "--calcite-shell-panel-action-menu-border-color": {
          shadowSelector: "calcite-panel",
          targetProp: "--calcite-popover-border-color",
        },
      },
    );
  });

  describe("default", () => {
    themed(
      () => mount(<calcite-shell-panel display-mode="float-all" resizable slot="panel-start" />),
      {
        "--calcite-shell-panel-corner-radius": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderRadius",
        },
        "--calcite-shell-panel-shadow": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "boxShadow",
        },
        "--calcite-shell-panel-border-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderInlineStartColor",
        },
        "--calcite-shell-panel-background-color": {
          shadowSelector: `.${CSS.content}`,
          targetProp: "backgroundColor",
        },
        "--calcite-shell-panel-text-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "color",
        },
        "--calcite-shell-panel-resize-background-color": {
          shadowSelector: `.${CSS.resizeHandleBar}`,
          targetProp: "backgroundColor",
        },
        "--calcite-shell-panel-resize-icon-color": {
          shadowSelector: `.${CSS.resizeHandleBar}`,
          targetProp: "color",
        },
      },
    );
  });

  describe("border configurations", () => {
    themed(
      () =>
        mount(<calcite-shell-panel display-mode="float-all" position="end" slot="panel-start" />),
      {
        "--calcite-shell-panel-border-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderInlineEndColor",
        },
      },
    );
    themed(
      () =>
        mount(
          <calcite-shell-panel display-mode="float-all" layout="horizontal" slot="panel-top" />,
        ),
      {
        "--calcite-shell-panel-border-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderInlineColor",
        },
      },
    );
    themed(() => mount(<calcite-shell-panel display-mode="float-all" slot="panel-top" />), {
      "--calcite-shell-panel-border-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "borderInlineStartColor",
      },
    });
    themed(
      () =>
        mount(
          <calcite-shell-panel
            display-mode="float-all"
            layout="horizontal"
            position="end"
            slot="panel-bottom"
          />,
        ),
      {
        "--calcite-shell-panel-border-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderInlineColor",
        },
      },
    );
    themed(
      () =>
        mount(
          <calcite-shell-panel display-mode="float-all" layout="vertical" slot="panel-bottom" />,
        ),
      {
        "--calcite-shell-panel-border-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderInlineStartColor",
        },
      },
    );
  });

  describe("height", () => {
    themed(() => mount(<calcite-shell-panel layout="horizontal" />), {
      "--calcite-shell-panel-height": {
        shadowSelector: `.${CSS.content}`,
        targetProp: "blockSize",
      },
      "--calcite-shell-panel-max-height": {
        shadowSelector: `.${CSS.content}`,
        targetProp: "maxBlockSize",
      },
      "--calcite-shell-panel-min-height": {
        shadowSelector: `.${CSS.content}`,
        targetProp: "minBlockSize",
      },
    });
  });

  describe("width", () => {
    themed(() => mount(<calcite-shell-panel layout="vertical" />), {
      "--calcite-shell-panel-width": {
        shadowSelector: `.${CSS.content}`,
        targetProp: "inlineSize",
      },
      "--calcite-shell-panel-max-width": {
        shadowSelector: `.${CSS.content}`,
        targetProp: "maxInlineSize",
      },
      "--calcite-shell-panel-min-width": {
        shadowSelector: `.${CSS.content}`,
        targetProp: "minInlineSize",
      },
    });
  });
});
