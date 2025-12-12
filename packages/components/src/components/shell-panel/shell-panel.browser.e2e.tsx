import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { it, expect, describe } from "vitest";
import { commands, userEvent } from "vitest/browser";
import { defaults, reflects, hidden, renders, slots, t9n } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
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

        const content = panel.shadowRoot!.querySelector<HTMLElement>(`.${CSS.content}`);
        const handle = panel.shadowRoot!.querySelector<HTMLElement>(`.${CSS.resizeHandle}`);

        panel.style.setProperty("--calcite-shell-panel-width", `${initialToken}px`);
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialToken}px`);

        return { panel, content, handle, component };
      }

      it("should update vertical panel: default size → token resize → KEYBOARD resize → method resize → clear method override", async () => {
        const initialDimensionThroughToken = 320;
        const dimensionThroughMethodOverride = 400;

        const { panel, content, handle, component } = await setupVerticalPanel(
          initialDimensionThroughToken,
        );

        handle.focus();
        await userEvent.keyboard("{ArrowRight}");
        expect(getComputedStyle(content).inlineSize).not.toBe(initialDimensionThroughToken);

        await panel.updateSize({ inline: dimensionThroughMethodOverride });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${dimensionThroughMethodOverride}px`);
        await panel.updateSize({ inline: null });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialDimensionThroughToken}px`);
      });

      it("should update vertical panel: default size → token resize → MOUSE resize → method resize → clear method override", async () => {
        const initialDimensionThroughToken = 320;
        const dimensionThroughMethodOverride = 400;

        const { panel, content, handle, component } = await setupVerticalPanel(
          initialDimensionThroughToken,
        );

        await userEvent.click(handle);
        const handleRect = handle.getBoundingClientRect();
        await commands.mouseMove(
          handleRect.left + handleRect.width / 2,
          handleRect.top + handleRect.height / 2,
        );
        await commands.mouseDown();
        await commands.mouseUp();

        expect(getComputedStyle(content).inlineSize).not.toBe(initialDimensionThroughToken);

        await panel.updateSize({ inline: dimensionThroughMethodOverride });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${dimensionThroughMethodOverride}px`);
        await panel.updateSize({ inline: null });
        await component.updateComplete;
        expect(getComputedStyle(content).inlineSize).toBe(`${initialDimensionThroughToken}px`);
      });
    });

    describe("horizontal panel", () => {
      async function setupHorizontalPanel(initialDimensionThroughToken: number) {
        const { el, component } = await mount<"calcite-shell">(
          <calcite-shell>
            <calcite-shell-panel resizable slot="panel-bottom">
              <calcite-panel>Content</calcite-panel>
            </calcite-shell-panel>
          </calcite-shell>,
        );

        const panel = el.querySelector("calcite-shell-panel")!;
        expect(panel).toBeTruthy();

        const content = panel.shadowRoot!.querySelector(`.${CSS.content}`) as HTMLElement;
        const handle = panel.shadowRoot!.querySelector(`.${CSS.resizeHandle}`) as HTMLElement;
        expect(content).toBeTruthy();
        expect(handle).toBeTruthy();

        panel.style.setProperty(
          "--calcite-shell-panel-height",
          `${initialDimensionThroughToken}px`,
        );
        await component.updateComplete;
        expect(getComputedStyle(content).height).toBe(`${initialDimensionThroughToken}px`);

        return { panel, content, handle, component };
      }
      it("should update horizontal panel: default size → token resize → KEYBOARD resize → method resize → clear method override", async () => {
        const initialDimensionThroughToken = 200;
        const dimensionThroughMethodOverride = 250;

        const { panel, content, handle, component } = await setupHorizontalPanel(
          initialDimensionThroughToken,
        );

        handle.focus();
        await userEvent.keyboard("{ArrowDown}");
        const afterKeyboard = parseFloat(getComputedStyle(content).blockSize);
        expect(afterKeyboard).not.toBe(initialDimensionThroughToken);

        await panel.updateSize({ block: dimensionThroughMethodOverride });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${dimensionThroughMethodOverride}px`);
        await panel.updateSize({ block: null });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${initialDimensionThroughToken}px`);
      });

      it("should update horizontal panel: default size → token resize → MOUSE resize → method resize → clear method override", async () => {
        const initialDimensionThroughToken = 200;
        const dimensionThroughMethodOverride = 250;

        const { panel, content, handle, component } = await setupHorizontalPanel(
          initialDimensionThroughToken,
        );

        await userEvent.click(handle);
        const handleRect = handle.getBoundingClientRect();
        await commands.mouseMove(
          handleRect.left + handleRect.width / 2,
          handleRect.top + handleRect.height / 2,
        );
        await commands.mouseDown();
        await commands.mouseUp();

        expect(getComputedStyle(content).blockSize).not.toBe(initialDimensionThroughToken);

        await panel.updateSize({ block: dimensionThroughMethodOverride });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${dimensionThroughMethodOverride}px`);
        await panel.updateSize({ block: null });
        await component.updateComplete;
        expect(getComputedStyle(content).blockSize).toBe(`${initialDimensionThroughToken}px`);
      });
    });
  });
});
