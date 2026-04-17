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
    layout: Layout;
    dir: Dir;
    changeDirAfterMount: boolean;
    initialSize: number;
    overrideSize: number;
  };

  const testCases: TestCase[] = [
    {
      layout: "vertical",
      dir: "ltr",
      changeDirAfterMount: true,
      initialSize: 320,
      overrideSize: 400,
    },
    {
      layout: "vertical",
      dir: "ltr",
      changeDirAfterMount: false,
      initialSize: 320,
      overrideSize: 400,
    },
    {
      layout: "vertical",
      dir: "rtl",
      changeDirAfterMount: true,
      initialSize: 320,
      overrideSize: 400,
    },
    {
      layout: "vertical",
      dir: "rtl",
      changeDirAfterMount: false,
      initialSize: 320,
      overrideSize: 400,
    },
    {
      layout: "horizontal",
      dir: "ltr",
      changeDirAfterMount: true,
      initialSize: 200,
      overrideSize: 250,
    },
    {
      layout: "horizontal",
      dir: "ltr",
      changeDirAfterMount: false,
      initialSize: 200,
      overrideSize: 250,
    },
    {
      layout: "horizontal",
      dir: "rtl",
      changeDirAfterMount: true,
      initialSize: 200,
      overrideSize: 250,
    },
    {
      layout: "horizontal",
      dir: "rtl",
      changeDirAfterMount: false,
      initialSize: 200,
      overrideSize: 250,
    },
  ];

  async function setUpShellPanel({
    layout,
    dir,
    changeDirAfterMount,
  }: Omit<TestCase, "initialSize" | "overrideSize">) {
    const dimensionCssProp =
      layout === "horizontal" ? "--calcite-shell-panel-height" : "--calcite-shell-panel-width";
    const dimensionProp = layout === "horizontal" ? "blockSize" : "inlineSize";
    const shellPanelSlot = layout === "horizontal" ? "panel-bottom" : "panel-start";

    const { el, component } = await mount<"calcite-shell">(
      <calcite-shell dir={changeDirAfterMount ? undefined : dir}>
        <calcite-shell-panel resizable slot={shellPanelSlot}>
          <calcite-panel>Content</calcite-panel>
        </calcite-shell-panel>
      </calcite-shell>,
    );

    if (changeDirAfterMount) {
      el.dir = dir;
      await component.updateComplete;
    }

    const panel = el.querySelector("calcite-shell-panel")!;
    expect(panel).toBeTruthy();

    const content = panel.shadowRoot!.querySelector<HTMLElement>(`.${CSS.content}`)!;
    const handle = panel.shadowRoot!.querySelector<HTMLElement>(`.${CSS.resizeHandle}`)!;
    expect(content).toBeTruthy();
    expect(handle).toBeTruthy();

    return { panel, content, handle, component, dimensionProp, dimensionCssProp };
  }

  testCases.forEach(({ layout, dir, changeDirAfterMount, initialSize, overrideSize }) => {
    const axis = layout === "vertical" ? "inline" : "block";
    const keyboardKey = layout === "vertical" ? "{ArrowRight}" : "{ArrowDown}";
    const mouseDelta = layout === "vertical" ? { dx: 10, dy: 0 } : { dx: 0, dy: 10 };
    const testLabel = `${layout} panel [dir=${dir}, changeDirAfterMount=${changeDirAfterMount}]`;

    it(`default size → token resize → KEYBOARD resize → method resize → clear method override (${testLabel})`, async () => {
      const { panel, content, component, dimensionProp, dimensionCssProp } = await setUpShellPanel({
        layout,
        dir,
        changeDirAfterMount,
      });

      panel.style.setProperty(dimensionCssProp, `${initialSize}px`);
      await component.updateComplete;
      expect(getComputedStyle(content)[dimensionProp]).toBe(`${initialSize}px`);

      await userEvent.keyboard(`{Tab}${keyboardKey}`);
      const afterUserResize = parseFloat(getComputedStyle(content)[dimensionProp]);
      expect(afterUserResize).not.toBe(initialSize);
      expect(afterUserResize).toBeGreaterThan(0);

      if (dir === "rtl" || layout === "horizontal") {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeLessThan(initialSize);
      } else {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeGreaterThan(initialSize);
      }

      await panel.updateSize(
        axis === "inline" ? { inline: overrideSize } : { block: overrideSize },
      );
      await component.updateComplete;
      expect(getComputedStyle(content)[dimensionProp]).toBe(`${overrideSize}px`);

      await panel.updateSize(axis === "inline" ? { inline: null } : { block: null });
      await component.updateComplete;
      expect(getComputedStyle(content)[dimensionProp]).toBe(`${initialSize}px`);
    });

    it(`default size → token resize → MOUSE resize → method resize → clear method override (${testLabel})`, async () => {
      const { panel, content, handle, component, dimensionProp, dimensionCssProp } =
        await setUpShellPanel({
          layout,
          dir,
          changeDirAfterMount,
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
      expect(afterUserResize).not.toBe(initialSize);
      expect(afterUserResize).toBeGreaterThan(0);

      if (dir === "rtl" || layout === "horizontal") {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeLessThan(initialSize);
      } else {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeGreaterThan(initialSize);
      }

      await panel.updateSize(
        axis === "inline" ? { inline: overrideSize } : { block: overrideSize },
      );
      await component.updateComplete;
      expect(getComputedStyle(content)[dimensionProp]).toBe(`${overrideSize}px`);

      await panel.updateSize(axis === "inline" ? { inline: null } : { block: null });
      await component.updateComplete;
      expect(getComputedStyle(content)[dimensionProp]).toBe(`${initialSize}px`);
    });
  });
});
