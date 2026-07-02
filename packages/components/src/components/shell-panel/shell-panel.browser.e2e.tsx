import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { commands } from "../../tests/browser/commands";
import {
  defaults,
  hidden,
  reflects,
  renders,
  slots,
  t9n,
  accessible,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { Dir } from "../interfaces";
import { CSS, SLOTS } from "./resources";
import type { ShellPanel } from "./shell-panel";
import type { Shell } from "../shell/shell";

mockConsole();

describe("accessible", () => {
  accessible(() =>
    mount(
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
    ),
  );
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
  renders(() => mount(<calcite-shell-panel>content</calcite-shell-panel>), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-shell-panel"), SLOTS);
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
    const panel = el.querySelector("calcite-shell-panel")!;
    const content = panel.shadowRoot!.querySelector<HTMLElement>(`.${CSS.content}`)!;
    const handle = panel.shadowRoot!.querySelector<HTMLElement>(`.${CSS.resizeHandle}`)!;
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

      await userEvent.keyboard(`{Tab}${keyboardKey}`);
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
