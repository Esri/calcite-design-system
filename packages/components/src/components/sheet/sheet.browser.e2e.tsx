import { describe, expect, it } from "vitest";
import { h } from "@arcgis/lumina";
import { userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { commands } from "../../tests/browser/commands";
import {
  defaults,
  focusable,
  hidden,
  openClose,
  reflects,
  renders,
  topLayer,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { Dir } from "../interfaces";
import { CSS } from "./resources";
import { Sheet } from "./sheet";

mockConsole();

describe("defaults", () => {
  defaults(
    () => mount("calcite-sheet"),
    [
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "embedded",
        defaultValue: false,
      },
      {
        propertyName: "displayMode",
        defaultValue: "overlay",
      },
      {
        propertyName: "focusTrapDisabled",
        defaultValue: false,
      },
      {
        propertyName: "outsideCloseDisabled",
        defaultValue: false,
      },
      {
        propertyName: "position",
        defaultValue: "inline-start",
      },
      {
        propertyName: "escapeDisabled",
        defaultValue: false,
      },
      {
        propertyName: "opened",
        defaultValue: false,
      },
      {
        propertyName: "resizable",
        defaultValue: false,
      },
      {
        propertyName: "widthScale",
        defaultValue: "m",
      },
      {
        propertyName: "heightScale",
        defaultValue: "m",
      },
    ],
  );
});

describe("is focusable", () => {
  const focusableContentTargetClass = "test";

  describe("focuses content by default", () => {
    focusable(
      () =>
        mount(
          <calcite-sheet open>
            <button class={focusableContentTargetClass}>test</button>
          </calcite-sheet>,
        ),
      {
        focusTargetSelector: `.${focusableContentTargetClass}`,
      },
    );
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-sheet"),
    [
      {
        propertyName: "height",
        value: "m",
      },
      {
        propertyName: "heightScale",
        value: "m",
      },
      {
        propertyName: "resizable",
        value: true,
      },
      {
        propertyName: "width",
        value: "m",
      },
      {
        propertyName: "widthScale",
        value: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-sheet"));
});

describe("openClose", () => {
  openClose((mountOptions) => mount("calcite-sheet", mountOptions));
});

describe("renders", () => {
  renders(() => mount("calcite-sheet"), { display: "flex", visible: false });
});

describe("sheet updateSize public method", () => {
  mockConsole();

  type Axis = "inline" | "block";
  type TestCase = {
    axis: Axis;
    dir: Dir;
    changeDirAfterMount: boolean;
  };

  const testCases: TestCase[] = [
    { axis: "inline", dir: "ltr", changeDirAfterMount: true },
    { axis: "inline", dir: "ltr", changeDirAfterMount: false },
    { axis: "inline", dir: "rtl", changeDirAfterMount: true },
    { axis: "inline", dir: "rtl", changeDirAfterMount: false },
    { axis: "block", dir: "ltr", changeDirAfterMount: true },
    { axis: "block", dir: "ltr", changeDirAfterMount: false },
    { axis: "block", dir: "rtl", changeDirAfterMount: true },
    { axis: "block", dir: "rtl", changeDirAfterMount: false },
  ] as const;

  async function setUpSheet({ axis, dir, changeDirAfterMount }: TestCase) {
    const position = axis === "inline" ? "inline-start" : "block-start";
    const sizeProp = axis === "inline" ? "inlineSize" : "blockSize";
    const keyboardKey = axis === "inline" ? "{ArrowRight}" : "{ArrowDown}";
    const mouseDelta = axis === "inline" ? { dx: 10, dy: 0 } : { dx: 0, dy: 10 };

    const { el, component } = await mount<Sheet>(
      <calcite-sheet
        dir={changeDirAfterMount ? undefined : dir}
        embedded
        open
        position={position}
        resizable
      >
        <calcite-panel>Content</calcite-panel>
      </calcite-sheet>,
    );

    if (changeDirAfterMount) {
      el.dir = dir;
      await component.updateComplete;
    }

    const content = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.content}`)!;
    const resizeHandle = el.shadowRoot.querySelector<HTMLElement>(`.${CSS.resizeHandle}`)!;

    return { sheet: el, content, resizeHandle, component, sizeProp, keyboardKey, mouseDelta };
  }

  testCases.forEach(({ axis, dir, changeDirAfterMount }) => {
    it(`default size → token resize → KEYBOARD resize → method resize → clear method override [axis=${axis}, dir=${dir}, changeDirAfterMount=${changeDirAfterMount}]`, async () => {
      const initialSize = axis === "inline" ? 320 : 200;
      const overrideSize = axis === "inline" ? 400 : 250;
      const cssProp = axis === "inline" ? "--calcite-sheet-width" : "--calcite-sheet-height";
      const { sheet, content, component, sizeProp, keyboardKey } = await setUpSheet({
        axis,
        dir,
        changeDirAfterMount,
      });

      sheet.style.setProperty(cssProp, `${initialSize}px`);
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${initialSize}px`);

      await userEvent.keyboard(`{Tab}${keyboardKey}`);
      const afterUserResize = parseFloat(getComputedStyle(content)[sizeProp]);
      expect(afterUserResize).not.toBe(initialSize);

      if (dir === "rtl" && axis === "inline") {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeLessThan(initialSize);
      } else {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeGreaterThan(initialSize);
      }

      await sheet.updateSize(
        axis === "inline" ? { inline: overrideSize } : { block: overrideSize },
      );
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${overrideSize}px`);

      await sheet.updateSize(axis === "inline" ? { inline: null } : { block: null });
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${initialSize}px`);
    });

    it(`default size → token resize → MOUSE resize → method resize → clear method override [axis=${axis}, dir=${dir}, changeDirAfterMount=${changeDirAfterMount}]`, async () => {
      const initialSize = axis === "inline" ? 320 : 200;
      const overrideSize = axis === "inline" ? 400 : 250;
      const cssProp = axis === "inline" ? "--calcite-sheet-width" : "--calcite-sheet-height";
      const { sheet, content, resizeHandle, component, sizeProp, mouseDelta } = await setUpSheet({
        axis,
        dir,
        changeDirAfterMount,
      });

      sheet.style.setProperty(cssProp, `${initialSize}px`);
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${initialSize}px`);

      const handleRect = resizeHandle.getBoundingClientRect();
      const startX = handleRect.left + handleRect.width / 2;
      const startY = handleRect.top + handleRect.height / 2;

      await userEvent.hover(resizeHandle);
      await commands.mouseDown();
      await commands.mouseMove(startX + mouseDelta.dx, startY + mouseDelta.dy);
      await commands.mouseUp();

      const afterUserResize = parseFloat(getComputedStyle(content)[sizeProp]);
      expect(afterUserResize).not.toBe(initialSize);

      if (dir === "rtl" && axis === "inline") {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeLessThan(initialSize);
      } else {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test options
        expect(afterUserResize).toBeGreaterThan(initialSize);
      }

      await sheet.updateSize(
        axis === "inline" ? { inline: overrideSize } : { block: overrideSize },
      );
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${overrideSize}px`);

      await sheet.updateSize(axis === "inline" ? { inline: null } : { block: null });
      await component.updateComplete;
      expect(getComputedStyle(content)[sizeProp]).toBe(`${initialSize}px`);
    });
  });
});

describe("top layer placement", () => {
  topLayer(() => mount("calcite-sheet"));
});
