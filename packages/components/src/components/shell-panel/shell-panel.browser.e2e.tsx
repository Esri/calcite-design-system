import { h } from "@arcgis/lumina";
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
      <calcite-shell-panel position="start" slot="panel-start">
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
        propertyName: "beforeClose",
        defaultValue: undefined,
      },
      {
        propertyName: "collapsed",
        defaultValue: false,
      },
      {
        propertyName: "closed",
        defaultValue: false,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
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
        propertyName: "closed",
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

  it("shows content and the action bar by default and hides both when closed", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel heading="Tools">
        <calcite-action-bar slot="action-bar">
          <calcite-action text="Layers" />
        </calcite-action-bar>
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const content = page.getByRole("button", { name: "Panel content", includeHidden: true });
    const action = page.getByRole("button", { name: "Layers", includeHidden: true });

    await expect.element(content).toBeVisible();
    await expect.element(action).toBeVisible();

    el.closed = true;

    await expect.element(content).not.toBeVisible();
    await expect.element(action).not.toBeVisible();

    el.closed = false;

    await expect.element(content).toBeVisible();
    await expect.element(action).toBeVisible();
  });

  it("calls beforeClose when closed and can be reopened", async () => {
    const beforeClose = vi
      .fn<NonNullable<ShellPanel["beforeClose"]>>()
      .mockResolvedValue(undefined);
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel beforeClose={beforeClose} heading="Tools">
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const content = page.getByText("Panel content", { exact: true });
    const closeButton = page.getByRole("button", { name: "Close", exact: true });

    await expect.element(content).toBeVisible();
    await userEvent.click(closeButton);

    await expect.element(el).toHaveProperty("closed", true);
    await expect.element(content).not.toBeVisible();
    expect(beforeClose).toHaveBeenCalledTimes(1);
    expect(beforeClose).toHaveBeenCalledWith();

    el.closed = false;

    await expect.element(content).toBeVisible();
    await userEvent.click(closeButton);

    await expect.element(el).toHaveProperty("closed", true);
    await expect.element(content).not.toBeVisible();
    expect(beforeClose).toHaveBeenCalledTimes(2);
  });

  it("keeps content visible when beforeClose rejects a close button request", async () => {
    const beforeClose = vi
      .fn<NonNullable<ShellPanel["beforeClose"]>>()
      .mockRejectedValue(new Error("Prevent close"));
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel beforeClose={beforeClose} heading="Tools">
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );

    await page.getByRole("button", { name: "Close", exact: true }).click();

    expect(beforeClose).toHaveBeenCalledExactlyOnceWith();
    expect(el.closed).toBe(false);
    await expect.element(page.getByRole("button", { name: "Panel content" })).toBeVisible();
    await expect.element(page.getByRole("button", { name: "Close", exact: true })).toBeVisible();
  });

  it("keeps content visible when beforeClose rejects an Escape request", async () => {
    const beforeClose = vi
      .fn<NonNullable<ShellPanel["beforeClose"]>>()
      .mockRejectedValue(new Error("Prevent close"));
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel beforeClose={beforeClose} heading="Tools">
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const content = page.getByRole("button", { name: "Panel content" });

    await content.click();
    await userEvent.keyboard("{Escape}");

    expect(beforeClose).toHaveBeenCalledExactlyOnceWith();
    expect(el.closed).toBe(false);
    await expect.element(content).toBeVisible();
  });

  it("waits for beforeClose before programmatically closing", async () => {
    const closeRequest = Promise.withResolvers<void>();
    const beforeClose = vi
      .fn<NonNullable<ShellPanel["beforeClose"]>>()
      .mockReturnValue(closeRequest.promise);
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel beforeClose={beforeClose} heading="Tools">
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const content = page.getByRole("button", { name: "Panel content", includeHidden: true });

    el.closed = true;

    expect(beforeClose).toHaveBeenCalledExactlyOnceWith();
    expect(el.closed).toBe(false);
    await expect.element(content).toBeVisible();

    closeRequest.resolve();

    await expect.element(el).toHaveProperty("closed", true);
    await expect.element(el).toHaveAttribute("closed");
    expect(el.collapsed).toBe(false);
    await expect.element(content).not.toBeVisible();
  });

  it("cancels a pending close when reopened", async () => {
    const closeRequest = Promise.withResolvers<void>();
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel beforeClose={() => closeRequest.promise} heading="Tools">
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );

    el.closed = true;
    el.closed = false;
    closeRequest.resolve();
    await closeRequest.promise;

    expect(el.closed).toBe(false);
    await expect.element(el).not.toHaveAttribute("closed");
    await expect.element(page.getByRole("button", { name: "Panel content" })).toBeVisible();
  });

  it("ignores an older approval while a newer close request is pending", async () => {
    const firstRequest = Promise.withResolvers<void>();
    const secondRequest = Promise.withResolvers<void>();
    const beforeClose = vi
      .fn<NonNullable<ShellPanel["beforeClose"]>>()
      .mockReturnValueOnce(firstRequest.promise)
      .mockReturnValueOnce(secondRequest.promise);
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel beforeClose={beforeClose} heading="Tools">
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );

    el.closed = true;
    el.closed = false;
    el.closed = true;
    firstRequest.resolve();
    await firstRequest.promise;

    expect(el.closed).toBe(false);
    await expect.element(page.getByRole("button", { name: "Panel content" })).toBeVisible();

    secondRequest.resolve();
    await secondRequest.promise;

    await expect.element(el).toHaveProperty("closed", true);
    await expect.element(el).toHaveAttribute("closed");
    expect(beforeClose).toHaveBeenCalledTimes(2);
  });

  it("keeps collapsed independent of a pending close", async () => {
    const closeRequest = Promise.withResolvers<void>();
    const beforeClose = vi
      .fn<NonNullable<ShellPanel["beforeClose"]>>()
      .mockReturnValue(closeRequest.promise);
    const collapse = vi.fn();
    const expand = vi.fn();
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel
        beforeClose={beforeClose}
        heading="Tools"
        oncalciteShellPanelCollapse={collapse}
        oncalciteShellPanelExpand={expand}
      >
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );

    el.closed = true;
    el.collapsed = true;

    await expect.element(el).toHaveProperty("collapsed", true);
    await expect.element(el).toHaveAttribute("collapsed");
    await expect
      .element(page.getByRole("button", { name: "Panel content", includeHidden: true }))
      .not.toBeVisible();
    expect(beforeClose).toHaveBeenCalledExactlyOnceWith();
    expect(collapse).toHaveBeenCalledOnce();

    el.collapsed = false;

    await expect.element(page.getByRole("button", { name: "Panel content" })).toBeVisible();
    expect(el.closed).toBe(false);
    expect(expand).toHaveBeenCalledOnce();
    expect(beforeClose).toHaveBeenCalledExactlyOnceWith();

    closeRequest.resolve();

    await expect.element(el).toHaveProperty("closed", true);
    expect(el.collapsed).toBe(false);
    expect(collapse).toHaveBeenCalledOnce();
    expect(expand).toHaveBeenCalledOnce();
  });

  it("keeps the component visible when beforeClose rejects an attribute close", async () => {
    const beforeClose = vi
      .fn<NonNullable<ShellPanel["beforeClose"]>>()
      .mockRejectedValue(new Error("Prevent close"));
    const collapse = vi.fn();
    const expand = vi.fn();
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel
        beforeClose={beforeClose}
        heading="Tools"
        oncalciteShellPanelCollapse={collapse}
        oncalciteShellPanelExpand={expand}
      >
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );

    el.setAttribute("closed", "");

    await expect.element(page.getByRole("button", { name: "Panel content" })).toBeVisible();
    expect(beforeClose).toHaveBeenCalledExactlyOnceWith();
    expect(el.closed).toBe(false);
    expect(el.collapsed).toBe(false);
    expect(collapse).not.toHaveBeenCalled();
    expect(expand).not.toHaveBeenCalled();
  });

  it("closes without beforeClose and can be reopened", async () => {
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel heading="Tools">
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const content = page.getByText("Panel content", { exact: true });
    const closeButton = page.getByRole("button", { name: "Close", exact: true });

    await closeButton.click();

    await expect.element(el).toHaveProperty("closed", true);
    await expect.element(el).toHaveAttribute("closed");
    expect(el.collapsed).toBe(false);
    await expect.element(content).not.toBeVisible();

    el.closed = false;

    await expect.element(content).toBeVisible();
    await closeButton.click();

    await expect.element(el).toHaveProperty("closed", true);
    await expect.element(content).not.toBeVisible();
  });

  it("omits the close action when closing is disabled", async () => {
    await mount(
      <calcite-shell-panel close-disabled heading="Tools">
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );

    await expect
      .element(page.getByRole("button", { name: "Close", exact: true }))
      .not.toBeInTheDocument();
    await expect.element(page.getByRole("button", { name: "Panel content" })).toBeVisible();
  });

  it("does not trap focus", async () => {
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

    await expect.element(page.getByRole("button", { name: "Outside" })).toHaveFocus();
  });

  it("collapses content without invoking beforeClose or hiding the action bar", async () => {
    const beforeClose = vi.fn<NonNullable<ShellPanel["beforeClose"]>>();
    const { el } = await mount<ShellPanel>(
      <calcite-shell-panel beforeClose={beforeClose} heading="Tools">
        <calcite-action-bar slot="action-bar">
          <calcite-action text="Layers" />
        </calcite-action-bar>
        <button type="button">Panel content</button>
      </calcite-shell-panel>,
    );
    const content = page.getByRole("button", { name: "Panel content", includeHidden: true });
    const action = page.getByRole("button", { name: "Layers", includeHidden: true });

    el.collapsed = true;

    await expect.element(content).not.toBeVisible();
    await expect.element(action).toBeVisible();
    expect(el.closed).toBe(false);
    expect(beforeClose).not.toHaveBeenCalled();

    el.removeAttribute("collapsed");

    await expect.element(content).toBeVisible();
    expect(el.closed).toBe(false);
    expect(beforeClose).not.toHaveBeenCalled();

    el.closed = true;

    expect(beforeClose).toHaveBeenCalledExactlyOnceWith();
    await expect.element(content).not.toBeVisible();
    await expect.element(action).not.toBeVisible();
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

    const handle = page.elementLocator(panel).getByRole("separator");
    await expect.element(handle).toHaveAttribute("aria-valuenow", `${overrideSize}`);

    await panel.updateSize(axis === "inline" ? { block: 250 } : { inline: 400 });
    await expect.element(handle).toHaveAttribute("aria-valuenow", `${overrideSize}`);

    await panel.updateSize({ [axis]: null });
    await shell.manager.component.updateComplete;
    expect(getComputedStyle(content)[computedSizeProp]).toBe(`${baselineContentSize}px`);
    await expect.element(handle).toHaveAttribute("aria-valuenow", `${baselineContentSize}`);
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

  it("resumes mouse resizing after closing and reopening", async () => {
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

    el.closed = true;

    await expect.element(handle).not.toBeVisible();

    el.closed = false;

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
