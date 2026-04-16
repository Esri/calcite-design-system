import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { h } from "@arcgis/lumina";
import { userEvent } from "vitest/browser";
import { commands } from "../../tests/browser/commands";
import { defaults, hidden, reflects, renders, slots, t9n } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { Dir, Layout } from "../interfaces";
import { afterNextTask } from "../../tests/utils/timing";
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

  async function setUpShellPanel({
    layout,
    initialSize,
    dir,
    changeDirAfterMount,
  }: {
    layout: Extract<Layout, "horizontal" | "vertical">;
    initialSize: number;
    dir: Dir;
    changeDirAfterMount: boolean;
  }) {
    const dimensionCssProp =
      layout === "horizontal" ? "--calcite-shell-panel-height" : "--calcite-shell-panel-width";
    const dimensionProp = layout === "horizontal" ? "block-size" : "inline-size";
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
      await afterNextTask();
    }

    const panel = el.querySelector("calcite-shell-panel")!;
    expect(panel).toBeTruthy();

    const content = panel.shadowRoot!.querySelector<HTMLElement>(`.${CSS.content}`)!;
    const handle = panel.shadowRoot!.querySelector<HTMLElement>(`.${CSS.resizeHandle}`)!;
    expect(content).toBeTruthy();
    expect(handle).toBeTruthy();

    panel.style.setProperty(dimensionCssProp, `${initialSize}px`);
    await component.updateComplete;
    expect(getComputedStyle(content)[dimensionProp]).toBe(`${initialSize}px`);

    return { panel, content, handle, component };
  }

  const changeDirAfterMountsToTest = [true, false] as const;

  describe.for(["ltr", "rtl"] as const)("vertical panel", (dir) => {
    changeDirAfterMountsToTest.forEach((changeDirAfterMount) => {
      it(`should update vertical panel: default size → token resize → KEYBOARD resize → method resize → clear method override [dir=${dir}, changeDirAfterMount=${changeDirAfterMount}]`, async () => {
        const initialSize = 320;
        const overrideSize = 400;

        const { panel, content, component } = await setUpShellPanel({
          layout: "vertical",
          initialSize,
          dir,
          changeDirAfterMount,
        });

        await userEvent.keyboard("{Tab}{ArrowRight}");
        const afterKeyboard = parseFloat(getComputedStyle(content).inlineSize);
        expect(afterKeyboard).not.toBe(initialSize);
        expect(afterKeyboard).toBeGreaterThan(0);

        if (dir === "ltr") {
          // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
          expect(afterKeyboard).toBeGreaterThan(initialSize);
        } else {
          // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
          expect(afterKeyboard).toBeLessThan(initialSize);
        }

        await panel.updateSize({ inline: overrideSize });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${overrideSize}px`);

        await panel.updateSize({ inline: null });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialSize}px`);
      });

      it(`should update vertical panel: default size → token resize → MOUSE resize → method resize → clear method override [dir=${dir}, changeDirAfterMount=${changeDirAfterMount}]`, async () => {
        const initialSize = 320;
        const overrideSize = 400;

        const { panel, content, handle, component } = await setUpShellPanel({
          layout: "vertical",
          initialSize,
          dir,
          changeDirAfterMount,
        });

        const handleRect = handle.getBoundingClientRect();
        await userEvent.hover(handle);
        await commands.mouseDown();
        await commands.mouseMove(
          handleRect.left + handleRect.width / 2 + 10,
          handleRect.top + handleRect.height / 2,
        );
        await commands.mouseUp();

        const afterMouse = parseFloat(getComputedStyle(content).inlineSize);
        expect(afterMouse).not.toBe(initialSize);
        expect(afterMouse).toBeGreaterThan(0);

        if (dir === "ltr") {
          // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
          expect(afterMouse).toBeGreaterThan(initialSize);
        } else {
          // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
          expect(afterMouse).toBeLessThan(initialSize);
        }

        await panel.updateSize({ inline: overrideSize });
        await component.updateComplete;

        expect(getComputedStyle(content).inlineSize).toBe(`${overrideSize}px`);
        await panel.updateSize({ inline: null });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialSize}px`);
      });
    });
  });

  describe.for(["ltr", "rtl"] as const)("horizontal panel", (dir) => {
    changeDirAfterMountsToTest.forEach((changeDirAfterMount) => {
      it(`should update horizontal panel: default size → token resize → KEYBOARD resize → method resize → clear method override [dir=${dir}, changeDirAfterMount=${changeDirAfterMount}]`, async () => {
        const initialSize = 200;
        const overrideSize = 250;

        const { panel, content, component } = await setUpShellPanel({
          layout: "horizontal",
          initialSize,
          dir,
          changeDirAfterMount,
        });

        await userEvent.keyboard("{Tab}{ArrowDown}");
        const afterKeyboard = parseFloat(getComputedStyle(content).blockSize);
        expect(afterKeyboard).not.toBe(initialSize);
        expect(afterKeyboard).toBeGreaterThan(0);
        expect(afterKeyboard).toBeLessThan(initialSize);

        await panel.updateSize({ block: overrideSize });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${overrideSize}px`);

        await panel.updateSize({ block: null });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${initialSize}px`);
      });

      it(`should update horizontal panel: default size → token resize → MOUSE resize → method resize → clear method override [dir=${dir}, changeDirAfterMount=${changeDirAfterMount}]`, async () => {
        const initialSize = 200;
        const overrideSize = 250;

        const { panel, content, handle, component } = await setUpShellPanel({
          layout: "horizontal",
          initialSize,
          dir,
          changeDirAfterMount,
        });

        const handleRect = handle.getBoundingClientRect();
        await userEvent.hover(handle);
        await commands.mouseDown();
        await commands.mouseMove(
          handleRect.left + handleRect.width / 2,
          handleRect.top + handleRect.height / 2 - 10,
        );
        await commands.mouseUp();

        const afterMouse = parseFloat(getComputedStyle(content).blockSize);
        expect(afterMouse).not.toBe(initialSize);
        expect(afterMouse).toBeGreaterThan(0);
        expect(afterMouse).toBeGreaterThan(initialSize);

        await panel.updateSize({ block: overrideSize });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${overrideSize}px`);
        await panel.updateSize({ block: null });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${initialSize}px`);
      });
    });
  });
});
