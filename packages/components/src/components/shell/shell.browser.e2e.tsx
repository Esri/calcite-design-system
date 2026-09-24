import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, slots, accessible, themed } from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import type { ShellPanel } from "../shell-panel/shell-panel";
import { CSS as SHELL_PANEL_CSS } from "../shell-panel/resources";
import { SLOTS } from "./resources";

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-shell>
        <calcite-shell-panel position="start" slot={SLOTS.panelStart}>
          <p>Primary Content</p>
        </calcite-shell-panel>
        <calcite-shell-panel position="end" slot={SLOTS.panelEnd}>
          <p>Primary Content</p>
        </calcite-shell-panel>
      </calcite-shell>,
    ),
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-shell"));
});

describe("renders", () => {
  renders(() => mount("calcite-shell"), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-shell"), SLOTS);
});

describe("shell provides sizing context", () => {
  mockConsole();

  it("updates a resizable panel's max width when a sibling panel is added after mount", async () => {
    const shellWidth = 600;
    const { el, component } = await mount<"calcite-shell">(
      <calcite-shell style={`inline-size: ${shellWidth}px; block-size: 400px; position: relative;`}>
        <calcite-panel>Main content</calcite-panel>
        <calcite-shell-panel
          resizable
          slot={SLOTS.panelEnd}
          style="--calcite-shell-panel-max-width: 100%;"
          width="l"
        >
          <p>End content</p>
        </calcite-shell-panel>
      </calcite-shell>,
    );

    const panel = el.querySelector<ShellPanel["el"]>(
      `calcite-shell-panel[slot="${SLOTS.panelEnd}"]`,
    )!;
    const content = panel.shadowRoot!.querySelector<HTMLElement>(`.${SHELL_PANEL_CSS.content}`)!;

    await panel.updateSize({ inline: shellWidth });
    await component.updateComplete;
    await panel.manager.component.updateComplete;

    const widthWithoutSibling = parseFloat(getComputedStyle(content).inlineSize);

    const siblingPanel = document.createElement("calcite-shell-panel");
    siblingPanel.slot = SLOTS.panelStart;
    siblingPanel.width = "l";
    siblingPanel.append(document.createElement("p"));
    siblingPanel.firstElementChild!.textContent = "Start content";
    el.append(siblingPanel);

    await component.updateComplete;
    await siblingPanel.componentOnReady();
    await siblingPanel.manager.component.updateComplete;

    await panel.updateSize({ inline: shellWidth });
    await component.updateComplete;
    await panel.manager.component.updateComplete;

    const widthWithSibling = parseFloat(getComputedStyle(content).inlineSize);

    expect(widthWithSibling).toBeLessThan(widthWithoutSibling);
  });

  it("updates a resizable panel's max height when a sibling panel is added after mount", async () => {
    const shellHeight = 600;
    const { el, component } = await mount<"calcite-shell">(
      <calcite-shell
        style={`inline-size: 700px; block-size: ${shellHeight}px; position: relative;`}
      >
        <calcite-panel>Main content</calcite-panel>
        <calcite-shell-panel
          height="l"
          resizable
          slot={SLOTS.panelBottom}
          style="--calcite-shell-panel-max-height: 100%;"
        >
          <p>Bottom content</p>
        </calcite-shell-panel>
      </calcite-shell>,
    );

    const panel = el.querySelector<ShellPanel["el"]>(
      `calcite-shell-panel[slot="${SLOTS.panelBottom}"]`,
    )!;
    const content = panel.shadowRoot!.querySelector<HTMLElement>(`.${SHELL_PANEL_CSS.content}`)!;

    await panel.updateSize({ block: shellHeight });
    await component.updateComplete;
    await panel.manager.component.updateComplete;

    const heightWithoutSibling = parseFloat(getComputedStyle(content).blockSize);

    const siblingPanel = document.createElement("calcite-shell-panel");
    siblingPanel.height = "l";
    siblingPanel.slot = SLOTS.panelTop;
    siblingPanel.append(document.createElement("p"));
    siblingPanel.firstElementChild!.textContent = "Top content";
    el.append(siblingPanel);

    await component.updateComplete;
    await siblingPanel.componentOnReady();
    await siblingPanel.manager.component.updateComplete;

    await panel.updateSize({ block: shellHeight });
    await component.updateComplete;
    await panel.manager.component.updateComplete;

    const heightWithSibling = parseFloat(getComputedStyle(content).blockSize);

    expect(heightWithSibling).toBeLessThan(heightWithoutSibling);
  });
});

describe("theme", () => {
  describe("default", () => {
    mockConsole();

    themed(
      () =>
        mount(
          <calcite-shell>
            <calcite-panel heading="Example" slot="panel-start">
              Hello world
            </calcite-panel>
            <calcite-flow slot="panel-end">
              <calcite-flow-item heading="Example">Hello world</calcite-flow-item>
            </calcite-flow>
          </calcite-shell>,
        ),
      {
        "--calcite-shell-corner-radius": {
          targetProp: "borderRadius",
        },
        "--calcite-shell-shadow": {
          targetProp: "boxShadow",
        },
        "--calcite-shell-border-color": [
          {
            targetProp: "borderColor",
            selector: "calcite-panel",
          },
          {
            targetProp: "borderColor",
            selector: "calcite-flow",
          },
        ],
      },
    );
  });
});
