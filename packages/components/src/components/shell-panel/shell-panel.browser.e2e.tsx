import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { it, expect, describe } from "vitest";
import { userEvent } from "vitest/browser";
import { commands } from "../../tests/browser/commands";
import { defaults, reflects, hidden, renders, slots, t9n } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { Dir, Layout } from "../interfaces";
import { CSS, SLOTS } from "./resources";
import type { ShellPanel } from "./shell-panel";

mockConsole();

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

  type TestCase = {
    dir: Dir;
    changeAfterMount?: "dir" | "slot" | "position";
    slot: "panel-start" | "panel-end" | "panel-top" | "panel-bottom";
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

  function layoutFromPanelSlot(
    slot: `panel-${"start" | "end" | "top" | "bottom"}`,
  ): Extract<Layout, "vertical" | "horizontal"> {
    return slot === "panel-start" || slot === "panel-end" ? "vertical" : "horizontal";
  }

  async function setUpShellPanel({ dir, changeAfterMount, slot, position }: Omit<TestCase, never>) {
    const layout = layoutFromPanelSlot(slot);
    const requestedShellPanelSlot = slot;
    const requestedPosition = position;
    const initialShellPanelSlot =
      changeAfterMount === "slot"
        ? layout === "horizontal"
          ? // we use cross-axis slot for additional coverage
            requestedShellPanelSlot === "panel-bottom"
            ? "panel-end"
            : "panel-start"
          : requestedShellPanelSlot === "panel-start"
            ? // we use cross-axis slot for additional coverage
              "panel-top"
            : "panel-bottom"
        : requestedShellPanelSlot;
    const initialPosition =
      changeAfterMount === "position"
        ? requestedPosition === "start"
          ? "end"
          : "start"
        : requestedPosition;

    const { el, component } = await mount<"calcite-shell">(
      <calcite-shell dir={changeAfterMount === "dir" ? undefined : dir}>
        <calcite-shell-panel position={initialPosition} resizable slot={initialShellPanelSlot}>
          <calcite-panel>Content</calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>,
    );
    const panel = el.querySelector("calcite-shell-panel")!;

    if (changeAfterMount === "dir") {
      el.dir = dir;
    } else if (changeAfterMount === "slot") {
      panel.slot = requestedShellPanelSlot;
    } else if (changeAfterMount === "position") {
      panel.position = requestedPosition;
    }

    await component.updateComplete;
    await panel.manager.component.updateComplete;

    const content = panel.shadowRoot!.querySelector<HTMLElement>(`.${CSS.content}`)!;
    const handle = panel.shadowRoot!.querySelector<HTMLElement>(`.${CSS.resizeHandle}`)!;

    const dimensionCssProp =
      layout === "horizontal" ? "--calcite-shell-panel-height" : "--calcite-shell-panel-width";
    const dimensionProp = layout === "horizontal" ? "blockSize" : "inlineSize";

    const initialSize = parseFloat(getComputedStyle(content)[dimensionProp]);
    const overrideSize = Math.round(initialSize + 10);

    return {
      panel,
      content,
      handle,
      component,
      dimensionProp,
      dimensionCssProp,
      initialSize,
      overrideSize,
      requestedPosition,
    };
  }

  function getUserInteraction({ dir, slot }: Pick<TestCase, "dir" | "slot" | "position">): {
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
    const axis = layout === "vertical" ? "inline" : "block";
    const { keyboardKey, mouseDelta } = getUserInteraction({ dir, slot, position });

    const testLabel = `${layout} panel [dir=${dir}, changeAfterMount=${changeAfterMount ?? "none"}, slot=${slot}, position=${position}]`;

    it(`default size → token resize → KEYBOARD resize → method resize → clear method override (${testLabel})`, async () => {
      const {
        panel,
        content,
        component,
        dimensionProp,
        dimensionCssProp,
        initialSize,
        overrideSize,
      } = await setUpShellPanel({
        dir,
        changeAfterMount,
        slot,
        position,
      });

      panel.style.setProperty(dimensionCssProp, `${initialSize}px`);
      await component.updateComplete;

      expect(getComputedStyle(content)).toHaveProperty(dimensionProp, `${initialSize}px`);

      await userEvent.keyboard(`{Tab}${keyboardKey}`);
      const afterUserResize = parseFloat(getComputedStyle(content)[dimensionProp]);
      expect(afterUserResize).toBeGreaterThan(initialSize);

      await panel.updateSize({ [axis]: overrideSize });
      await component.updateComplete;
      expect(getComputedStyle(content)[dimensionProp]).toBe(`${overrideSize}px`);

      await panel.updateSize({ [axis]: null });
      await component.updateComplete;
      expect(getComputedStyle(content)[dimensionProp]).toBe(`${initialSize}px`);
    });

    it(`default size → token resize → MOUSE resize → method resize → clear method override (${testLabel})`, async () => {
      const {
        panel,
        content,
        handle,
        component,
        dimensionProp,
        dimensionCssProp,
        initialSize,
        overrideSize,
      } = await setUpShellPanel({
        dir,
        changeAfterMount,
        slot,
        position,
      });

      panel.style.setProperty(dimensionCssProp, `${initialSize}px`);
      await component.updateComplete;
      expect(getComputedStyle(content)[dimensionProp]).toBe(`${initialSize}px`);

      const handleRect = handle.getBoundingClientRect();
      const startX = handleRect.left + handleRect.width / 2 + mouseDelta.dx;
      const startY = handleRect.top + handleRect.height / 2 + mouseDelta.dy;

      await userEvent.hover(handle);
      await commands.mouseDown();
      await commands.mouseMove(startX, startY);
      await commands.mouseUp();

      const afterUserResize = parseFloat(getComputedStyle(content)[dimensionProp]);
      expect(afterUserResize).toBeGreaterThan(initialSize);

      await panel.updateSize({ [axis]: overrideSize });
      await component.updateComplete;
      expect(getComputedStyle(content)[dimensionProp]).toBe(`${overrideSize}px`);

      await panel.updateSize({ [axis]: null });
      await component.updateComplete;
      expect(getComputedStyle(content)[dimensionProp]).toBe(`${initialSize}px`);
    });
  });
});
