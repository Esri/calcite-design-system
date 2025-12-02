import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { it, expect, describe } from "vitest";
import "../shell/shell";
import "./shell-panel";
import "../panel/panel";
import { userEvent } from "@vitest/browser/context";
import { defaults, reflects, hidden, renders, slots, t9n } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { defaults, reflects, hidden, renders, slots } from "../../tests/commonTests/browser";
import { CSS } from "./resources";
import { SLOTS } from "./resources";

describe("calcite-shell-panel", () => {
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

    describe("vertical panel", () => {
      async function setupVerticalPanel(initialToken: number) {
        const { el, component } = await mount<"calcite-shell">(
          <calcite-shell>
            <calcite-shell-panel resizable slot="panel-start">
              <calcite-panel>Content</calcite-panel>
            </calcite-shell-panel>
          </calcite-shell>,
        );

        const panel = el.querySelector("calcite-shell-panel")!;
        expect(panel).toBeTruthy();

        await component.updateComplete;

        const content = panel.shadowRoot!.querySelector(`.${CSS.content}`) as HTMLElement;
        const handle = panel.shadowRoot!.querySelector(`.${CSS.resizeHandle}`) as HTMLElement;
        expect(content).toBeTruthy();
        expect(handle).toBeTruthy();

        panel.style.setProperty("--calcite-shell-panel-width", `${initialToken}px`);
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialToken}px`);

        return { panel, content, handle, component };
      }

      it("should update vertical panel: default size → token resize → KEYBOARD resize → method resize → clear method override", async () => {
        const initialToken = 320;
        const methodResize = 400;

        const { panel, content, handle, component } = await setupVerticalPanel(initialToken);

        handle.focus();
        await userEvent.keyboard("{ArrowRight}");
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).not.toBe(initialToken);

        panel.updateSize(methodResize, "inline");
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${methodResize}px`);

        panel.updateSize(null, "inline");
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialToken}px`);
      });

      it("should update vertical panel: default size → token resize → MOUSE resize → method resize → clear method override", async () => {
        const initialToken = 320;
        const methodResize = 400;

        const { panel, content, handle, component } = await setupVerticalPanel(initialToken);

        handle.dispatchEvent(new PointerEvent("pointermove"));
        expect(getComputedStyle(content).inlineSize).not.toBe(initialToken);

        panel.updateSize(methodResize, "inline");
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${methodResize}px`);

        panel.updateSize(null, "inline");
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialToken}px`);
      });
    });

    describe("horizontal panel", () => {
      async function setupHorizontalPanel(initialToken: number) {
        const { el, component } = await mount<"calcite-shell">(
          <calcite-shell>
            <calcite-shell-panel resizable slot="panel-bottom">
              <calcite-panel>Content</calcite-panel>
            </calcite-shell-panel>
          </calcite-shell>,
        );

        const panel = el.querySelector("calcite-shell-panel")!;
        expect(panel).toBeTruthy();
        await component.updateComplete;

        const content = panel.shadowRoot!.querySelector(`.${CSS.content}`) as HTMLElement;
        const handle = panel.shadowRoot!.querySelector(`.${CSS.resizeHandle}`) as HTMLElement;
        expect(content).toBeTruthy();
        expect(handle).toBeTruthy();

        panel.style.setProperty("--calcite-shell-panel-height", `${initialToken}px`);
        await component.updateComplete;
        expect(getComputedStyle(content).height).toBe(`${initialToken}px`);

        return { panel, content, handle, component };
      }
      it("should update horizontal panel: default size → token resize → KEYBOARD resize → method resize → clear method override", async () => {
        const initialToken = 200;
        const methodResize = 250;

        const { panel, content, handle, component } = await setupHorizontalPanel(initialToken);

        handle.focus();
        await userEvent.keyboard("{ArrowDown}");
        await component.updateComplete;
        const afterKeyboard = parseFloat(getComputedStyle(content).blockSize);
        expect(afterKeyboard).not.toBe(initialToken);

        panel.updateSize(methodResize, "block");
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${methodResize}px`);

        panel.updateSize(null, "block");
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${initialToken}px`);
      });

      it("should update horizontal panel: default size → token resize → MOUSE resize → method resize → clear method override", async () => {
        const initialToken = 200;
        const methodResize = 250;

        const { panel, content, handle, component } = await setupHorizontalPanel(initialToken);

        handle.dispatchEvent(new PointerEvent("pointermove"));
        expect(getComputedStyle(content).blockSize).not.toBe(initialToken);

        panel.updateSize(methodResize, "block");
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${methodResize}px`);
        panel.updateSize(null, "block");
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${initialToken}px`);
      });
    });
  });
});
