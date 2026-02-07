import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { TemplateResult } from "lit/html.js";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  slots,
  t9n,
  topLayer,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";

describe("calcite-dialog", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-dialog"),
      [
        {
          propertyName: "beforeClose",
          defaultValue: undefined,
        },
        {
          propertyName: "description",
          defaultValue: undefined,
        },
        {
          propertyName: "dragEnabled",
          defaultValue: false,
        },
        {
          propertyName: "escapeDisabled",
          defaultValue: false,
        },
        {
          propertyName: "closeDisabled",
          defaultValue: false,
        },
        {
          propertyName: "placement",
          defaultValue: "center",
        },
        {
          propertyName: "heading",
          defaultValue: undefined,
        },
        {
          propertyName: "headingLevel",
          defaultValue: undefined,
        },
        {
          propertyName: "icon",
          defaultValue: undefined,
        },
        {
          propertyName: "iconFlipRtl",
          defaultValue: false,
        },
        {
          propertyName: "kind",
          defaultValue: undefined,
        },
        {
          propertyName: "loading",
          defaultValue: false,
        },
        {
          propertyName: "menuOpen",
          defaultValue: false,
        },
        {
          propertyName: "messageOverrides",
          defaultValue: undefined,
        },
        {
          propertyName: "modal",
          defaultValue: false,
        },
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "outsideCloseDisabled",
          defaultValue: false,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "resizable",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "widthScale",
          defaultValue: "m",
        },
        {
          propertyName: "fullscreenDisabled",
          defaultValue: false,
        },
      ],
    );
  });

  describe("is focusable", () => {
    const focusableContentTargetClass = "test";
    const shadowFocusTargetSelector = `.${CSS.panel}`;
    const focusTargetSelector = `.${focusableContentTargetClass}`;

    function renderDialog(closeDisabled = false): TemplateResult {
      return (
        <calcite-dialog closeDisabled={closeDisabled} heading="Title" open>
          This is the content
          <button class={focusableContentTargetClass}>test</button>
        </calcite-dialog>
      );
    }

    describe("focuses internal panel by default", () => {
      focusable(() => mount(renderDialog), {
        shadowFocusTargetSelector,
      });
    });

    describe("focuses content if there is no close button", () => {
      focusable(() => mount(renderDialog(true)), {
        focusTargetSelector,
      });
    });
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-dialog"),
      [
        {
          propertyName: "closeDisabled",
          value: true,
        },
        {
          propertyName: "dragEnabled",
          value: true,
        },
        {
          propertyName: "escapeDisabled",
          value: true,
        },
        {
          propertyName: "placement",
          value: "center",
        },
        {
          propertyName: "headingLevel",
          value: 1,
        },
        {
          propertyName: "kind",
          value: "brand",
        },
        {
          propertyName: "icon",
          value: "x",
        },
        {
          propertyName: "iconFlipRtl",
          value: true,
        },
        {
          propertyName: "loading",
          value: true,
        },
        {
          propertyName: "menuOpen",
          value: true,
        },
        {
          propertyName: "modal",
          value: true,
        },
        {
          propertyName: "open",
          value: true,
        },
        {
          propertyName: "outsideCloseDisabled",
          value: true,
        },
        {
          propertyName: "overlayPositioning",
          value: "fixed",
        },
        {
          propertyName: "resizable",
          value: true,
        },
        {
          propertyName: "scale",
          value: "s",
        },
        {
          propertyName: "widthScale",
          value: "s",
        },
        {
          propertyName: "width",
          value: "s",
        },
        {
          propertyName: "fullscreenDisabled",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-dialog"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-dialog open>
            <div slot="custom-content">content</div>
          </calcite-dialog>,
        ),
      {
        display: "flex",
        visible: {
          value: true,
          locator: page.getByRole("dialog"),
        },
      },
    );
  });

  describe("slots", () => {
    slots(() => mount("calcite-dialog"), SLOTS);
  });

  describe("top layer placement", () => {
    topLayer(() => mount(<calcite-dialog heading="heading" />), {
      topLayerTarget: page.getByLabelText("heading"),
    });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-dialog"));
  });

  describe("fullscreen disabled", () => {
    it.for([
      { width: 400, height: 400 },
      { width: 300, height: 300 },
    ])(
      "does not go fullscreen at smaller viewports (at its default scale) when fullscreenDisabled is true",
      async ({ width, height }) => {
        await page.viewport(width, height);
        await mount(
          <calcite-dialog fullscreenDisabled={true} open={true}>
            <div>Dialog content</div>
          </calcite-dialog>,
        );
        const dialogLocator = page.getBySelector(`.${CSS.dialog}`);
        const dialog = dialogLocator.element();

        const computedStyle = window.getComputedStyle(dialog);

        expect(parseInt(computedStyle.width)).toBeLessThan(width);
        expect(parseInt(computedStyle.height)).toBeLessThan(height);
      },
    );

    it("allows resizing when fullscreenDisabled is true", async () => {
      await page.viewport(400, 400);

      const { el, component } = await mount<"calcite-dialog">(
        <calcite-dialog fullscreenDisabled={true} open={true} resizable={true}>
          <div>Dialog content</div>
        </calcite-dialog>,
      );

      const minimumDialogWidthForMediumScale = 288;
      const viewportWidth = 400;

      const dialogLocator = page.getBySelector(`.${CSS.dialog}`);
      const dialog = dialogLocator.element();

      await el.setFocus();
      await userEvent.keyboard("{Shift>}{ArrowRight}{/Shift}");
      await component.updateComplete;

      const resizedStyle = window.getComputedStyle(dialog);
      expect(parseInt(resizedStyle.width)).toBeGreaterThanOrEqual(minimumDialogWidthForMediumScale);
      expect(parseInt(resizedStyle.width)).toBeLessThan(viewportWidth);
    });
  });

  describe("dialog updateSize public method", () => {
    mockConsole();

    async function setupDialogWithInitialSize(initialInlineSize: number, initialBlockSize: number) {
      await page.viewport(1024, 768);

      const { el, component } = await mount(
        <calcite-shell>
          <calcite-dialog heading="test" open resizable>
            <div>Dialog Content</div>
          </calcite-dialog>
        </calcite-shell>,
      );

      const dialogElement = el.querySelector("calcite-dialog")!;
      const dialogContentElement = dialogElement.shadowRoot!.querySelector<HTMLElement>(
        `.${CSS.dialog}`,
      )!;

      dialogElement.style.setProperty("--calcite-dialog-size-x", `${initialInlineSize}px`);
      dialogElement.style.setProperty("--calcite-dialog-size-y", `${initialBlockSize}px`);

      await new Promise((resolve) => requestAnimationFrame(resolve));
      expect(getComputedStyle(dialogContentElement).inlineSize).toBe(`${initialInlineSize}px`);
      expect(getComputedStyle(dialogContentElement).blockSize).toBe(`${initialBlockSize}px`);

      return { dialogElement, dialogContentElement, component };
    }

    it("default size → KEYBOARD resize → method resize → clear method override", async () => {
      const initialInlineSize = 320;
      const initialBlockSize = 250;
      const overrideInlineSize = 400;
      const overrideBlockSize = 280;

      const { dialogElement, dialogContentElement, component } = await setupDialogWithInitialSize(
        initialInlineSize,
        initialBlockSize,
      );

      dialogElement.focus();

      await userEvent.keyboard("{Shift>}{ArrowLeft}{/Shift}");
      expect(getComputedStyle(dialogContentElement).inlineSize).not.toBe(`${initialInlineSize}px`);

      await userEvent.keyboard("{Shift>}{ArrowDown}{/Shift}");
      expect(getComputedStyle(dialogContentElement).blockSize).not.toBe(`${initialBlockSize}px`);

      await dialogElement.updateSize({ inline: overrideInlineSize, block: overrideBlockSize });
      await component.updateComplete;
      expect(getComputedStyle(dialogContentElement).inlineSize).toBe(`${overrideInlineSize}px`);
      expect(getComputedStyle(dialogContentElement).blockSize).toBe(`${overrideBlockSize}px`);

      await dialogElement.updateSize({ inline: null, block: null });
      await component.updateComplete;
      expect(getComputedStyle(dialogContentElement).inlineSize).toBe(`${initialInlineSize}px`);
      expect(getComputedStyle(dialogContentElement).blockSize).toBe(`${initialBlockSize}px`);
    });
  });
});
