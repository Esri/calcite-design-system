import { describe, it, expect } from "vitest";
import { commands, userEvent } from "vitest/browser";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  topLayer,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";

describe("calcite-sheet", () => {
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

  describe("renders", () => {
    renders(() => mount("calcite-sheet"), { display: "flex", visible: false });
  });

  describe("sheet updateSize public method", () => {
    mockConsole();

    describe("inline (position inline-start)", () => {
      async function setupInlineSheet(initialSize: number) {
        const { el, component } = await mount<"calcite-shell">(
          <calcite-shell>
            <calcite-sheet embedded open position="inline-start" resizable>
              <calcite-panel>Content</calcite-panel>
            </calcite-sheet>
          </calcite-shell>,
        );

        const sheet = el.querySelector("calcite-sheet")!;
        const content = sheet.shadowRoot!.querySelector<HTMLElement>(`.${CSS.content}`)!;
        const resizeHandle = sheet.shadowRoot!.querySelector<HTMLElement>(`.${CSS.resizeHandle}`)!;

        sheet.style.setProperty("--calcite-sheet-width", `${initialSize}px`);
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialSize}px`);

        return { sheet, content, resizeHandle, component };
      }

      it("default size → token resize → KEYBOARD resize → method resize → clear method override", async () => {
        const initialSize = 320;
        const overrideSize = 400;

        const { sheet, content, resizeHandle, component } = await setupInlineSheet(initialSize);
        resizeHandle.focus();
        await userEvent.keyboard("{ArrowRight}");
        expect(getComputedStyle(content).inlineSize).not.toBe(`${initialSize}px`);

        await sheet.updateSize({ inline: overrideSize });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${overrideSize}px`);

        await sheet.updateSize({ inline: null });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialSize}px`);
      });

      it("default size → token resize → MOUSE resize → method resize → clear method override", async () => {
        const initialSize = 320;
        const overrideSize = 400;

        const { sheet, content, resizeHandle, component } = await setupInlineSheet(initialSize);
        await userEvent.click(resizeHandle);
        const handleRect = resizeHandle.getBoundingClientRect();

        expect(getComputedStyle(content).inlineSize).toBe(`${initialSize}px`);

        const startX = handleRect.left + handleRect.width / 2;
        const startY = handleRect.top + handleRect.height / 2;

        await commands.mouseDown();
        await commands.mouseMove(startX + 10, startY);
        await commands.mouseUp();

        expect(getComputedStyle(content).inlineSize).not.toBe(`${initialSize}px`);

        await sheet.updateSize({ inline: overrideSize });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${overrideSize}px`);

        await sheet.updateSize({ inline: null });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialSize}px`);
      });
    });

    describe("block (position block-start)", () => {
      async function setupBlockSheet(initialSize: number) {
        const { el, component } = await mount<"calcite-shell">(
          <calcite-shell>
            <calcite-sheet embedded open position="block-start" resizable>
              <calcite-panel>Content</calcite-panel>
            </calcite-sheet>
          </calcite-shell>,
        );

        const sheet = el.querySelector("calcite-sheet")!;
        expect(sheet).toBeTruthy();

        const content = sheet.shadowRoot!.querySelector<HTMLElement>(`.${CSS.content}`)!;
        const resizeHandle = sheet.shadowRoot!.querySelector<HTMLElement>(`.${CSS.resizeHandle}`)!;
        expect(content).toBeTruthy();
        expect(resizeHandle).toBeTruthy();

        sheet.style.setProperty("--calcite-sheet-height", `${initialSize}px`);
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${initialSize}px`);

        return { sheet, content, resizeHandle, component };
      }

      it("default size → token resize → KEYBOARD resize → method resize → clear method override", async () => {
        const initialSize = 200;
        const overrideSize = 250;

        const { sheet, content, resizeHandle, component } = await setupBlockSheet(initialSize);

        resizeHandle.focus();
        await userEvent.keyboard("{ArrowDown}");
        const blockSizeAfterKeyboard = parseFloat(getComputedStyle(content).blockSize);
        expect(blockSizeAfterKeyboard).not.toBe(initialSize);

        await sheet.updateSize({ block: overrideSize });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${overrideSize}px`);

        await sheet.updateSize({ block: null });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${initialSize}px`);
      });

      it("default size → token resize → MOUSE resize → method resize → clear method override", async () => {
        const initialSize = 200;
        const overrideSize = 250;

        const { sheet, content, resizeHandle, component } = await setupBlockSheet(initialSize);
        await userEvent.click(resizeHandle);
        const handleRect = resizeHandle.getBoundingClientRect();

        expect(getComputedStyle(content).blockSize).toBe(`${initialSize}px`);

        const startX = handleRect.left + handleRect.width / 2;
        const startY = handleRect.top + handleRect.height / 2;

        await commands.mouseDown();
        await commands.mouseMove(startX + 10, startY);
        await commands.mouseUp();

        expect(getComputedStyle(content).blockSize).not.toBe(`${initialSize}px`);

        await sheet.updateSize({ block: overrideSize });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${overrideSize}px`);

        await sheet.updateSize({ block: null });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${initialSize}px`);
      });
    });
  });

  describe("top layer placement", () => {
    topLayer(() => mount("calcite-sheet"));
  });
});
