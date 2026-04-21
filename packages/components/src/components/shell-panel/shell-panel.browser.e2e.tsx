import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { it, expect, describe } from "vitest";
import { userEvent } from "vitest/browser";
import { commands } from "../../tests/browser/commands";
import { defaults, reflects, hidden, renders, slots, t9n } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { Dir, Layout } from "../interfaces";
import { CSS, SLOTS } from "./resources";

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
    changeAfterMount?: "dir" | "slot";
    slot: "panel-start" | "panel-end" | "panel-top" | "panel-bottom";
  };

  const testCases: TestCase[] = [
    { dir: "ltr", slot: "panel-start" },
    { dir: "ltr", slot: "panel-start", changeAfterMount: "dir" },
    { dir: "ltr", slot: "panel-start", changeAfterMount: "slot" },
    { dir: "ltr", slot: "panel-end" },
    { dir: "ltr", slot: "panel-end", changeAfterMount: "dir" },
    { dir: "ltr", slot: "panel-end", changeAfterMount: "slot" },
    { dir: "ltr", slot: "panel-top" },
    { dir: "ltr", slot: "panel-top", changeAfterMount: "dir" },
    { dir: "ltr", slot: "panel-top", changeAfterMount: "slot" },
    { dir: "ltr", slot: "panel-bottom" },
    { dir: "ltr", slot: "panel-bottom", changeAfterMount: "dir" },
    { dir: "ltr", slot: "panel-bottom", changeAfterMount: "slot" },
    { dir: "rtl", slot: "panel-start" },
    { dir: "rtl", slot: "panel-start", changeAfterMount: "dir" },
    { dir: "rtl", slot: "panel-start", changeAfterMount: "slot" },
    { dir: "rtl", slot: "panel-end" },
    { dir: "rtl", slot: "panel-end", changeAfterMount: "dir" },
    { dir: "rtl", slot: "panel-end", changeAfterMount: "slot" },
    { dir: "rtl", slot: "panel-top" },
    { dir: "rtl", slot: "panel-top", changeAfterMount: "dir" },
    { dir: "rtl", slot: "panel-top", changeAfterMount: "slot" },
    { dir: "rtl", slot: "panel-bottom" },
    { dir: "rtl", slot: "panel-bottom", changeAfterMount: "dir" },
    { dir: "rtl", slot: "panel-bottom", changeAfterMount: "slot" },
  ];

  function layoutFromPanelSlot(
    slot: `panel-${"start" | "end" | "top" | "bottom"}`,
  ): Extract<Layout, "vertical" | "horizontal"> {
    return slot === "panel-start" || slot === "panel-end" ? "vertical" : "horizontal";
  }

  async function setUpShellPanel({ dir, changeAfterMount, slot }: Omit<TestCase, never>) {
    const layout = layoutFromPanelSlot(slot);
    const requestedShellPanelSlot = slot;
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

    const { el, component } = await mount<"calcite-shell">(
      <calcite-shell dir={changeAfterMount === "dir" ? undefined : dir}>
        <calcite-shell-panel resizable slot={initialShellPanelSlot}>
          <calcite-panel>Content</calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>,
    );
    const panel = el.querySelector("calcite-shell-panel")!;

    await component.updateComplete;
    await panel.manager.component.updateComplete;

    if (changeAfterMount === "dir") {
      el.dir = dir;
    } else if (changeAfterMount === "slot") {
      panel.slot = requestedShellPanelSlot;
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
      ? slot === "panel-top"
        ? "down"
        : slot === "panel-bottom"
          ? "up"
          : slot === "panel-start"
            ? isRtl
              ? "left"
              : "right"
            : isRtl
              ? "right"
              : "left"
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

  testCases.forEach(({ dir, changeAfterMount, slot }) => {
    const layout = layoutFromPanelSlot(slot);
    const axis = layout === "vertical" ? "inline" : "block";
    const { keyboardKey, mouseDelta } = getUserInteraction({ dir, slot });

    const testLabel = `${layout} panel [dir=${dir}, changeAfterMount=${changeAfterMount ?? "none"}, slot=${slot}]`;

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
