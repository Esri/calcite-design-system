import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { it, expect, describe } from "vitest";
import "../shell/shell";
import "./shell-panel";
import "../panel/panel";
import { mockConsole } from "../../tests/utils/logging";
import { defaults, reflects, hidden, renders, slots } from "../../tests/commonTests/browser";
import { CSS } from "./resources";
import type { ShellPanel } from "./shell-panel";
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

  describe("shell-panel updateSize public method", () => {
    mockConsole();

    it("should update default vertical size via token, manual resize, method, and reset to token", async () => {
      const initialToken = 320;
      const methodResize = 400;

      const { el } = await mount<"calcite-shell">(
        <calcite-shell>
          <calcite-shell-panel
            resizable
            slot="panel-start"
            style={`--calcite-shell-panel-width: ${initialToken}px;`}
          >
            <calcite-panel>Content</calcite-panel>
          </calcite-shell-panel>
        </calcite-shell>,
      );

      const panel = el.querySelector("calcite-shell-panel") as ShellPanel;
      expect(panel).toBeTruthy();

      const content = panel.shadowRoot.querySelector(`.${CSS.content}`) as HTMLElement;
      const handle = panel.shadowRoot.querySelector(`.${CSS.resizeHandle}`) as HTMLElement;
      expect(content).toBeTruthy();
      expect(handle).toBeTruthy();

      expect(getComputedStyle(content).width).toBe(`${initialToken}px`);

      handle.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      await panel.updateComplete;
      expect(parseFloat(getComputedStyle(content).width)).not.toBe(initialToken);

      panel.updateSize(methodResize, "inline");
      await panel.updateComplete;
      expect(getComputedStyle(content).width).toBe(`${methodResize}px`);

      panel.updateSize(null, "inline");
      await panel.updateComplete;
      expect(getComputedStyle(content).width).toBe(`${initialToken}px`);
    });

    it("should update horizontal size via token, manual resize, method, and reset to token", async () => {
      const initialToken = 200;
      const methodResize = 250;

      const { el } = await mount<"calcite-shell">(
        <calcite-shell>
          <calcite-shell-panel
            resizable
            slot="panel-bottom"
            style={`--calcite-shell-panel-height: ${initialToken}px;`}
          >
            <calcite-panel>Content</calcite-panel>
          </calcite-shell-panel>
        </calcite-shell>,
      );

      const panel = el.querySelector("calcite-shell-panel") as ShellPanel;
      expect(panel).toBeTruthy();

      await panel.updateComplete;

      const content = panel.shadowRoot.querySelector(`.${CSS.content}`) as HTMLElement;
      const handle = panel.shadowRoot.querySelector(`.${CSS.resizeHandle}`) as HTMLElement;
      expect(content).toBeTruthy();
      expect(handle).toBeTruthy();

      expect(getComputedStyle(content).height).toBe(`${initialToken}px`);

      handle.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
      await panel.updateComplete;
      const afterManual = parseFloat(getComputedStyle(content).height);
      expect(afterManual).not.toBe(initialToken);

      panel.updateSize(methodResize, "block");
      await panel.updateComplete;
      expect(getComputedStyle(content).height).toBe(`${methodResize}px`);

      panel.updateSize(null, "block");
      await panel.updateComplete;
      expect(getComputedStyle(content).height).toBe(`${initialToken}px`);
    });
  });
});
