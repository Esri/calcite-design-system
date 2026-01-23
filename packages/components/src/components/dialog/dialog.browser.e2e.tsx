import { h } from "@arcgis/lumina";
import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { TemplateResult } from "lit/html.js";
import { page } from "vitest/browser";
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
    it("does not take full screen when fullscreenDisabled is true", async () => {
      const { container } = await mount(
        <div style={{ width: 800, height: 800 }}>
          <calcite-dialog fullscreen-disabled open>
            <div>Dialog content</div>
          </calcite-dialog>
        </div>,
      );

      const dialog = container.querySelector("calcite-dialog");
      const style = dialog
        ? (() => {
            const computed = window.getComputedStyle(dialog);
            return {
              width: computed.width,
              height: computed.height,
            };
          })()
        : {
            width: "",
            height: "",
          };
      expect(parseInt(style.width)).toBeLessThan(800);
      expect(parseInt(style.height)).toBeLessThan(800);
    });
  });
});
