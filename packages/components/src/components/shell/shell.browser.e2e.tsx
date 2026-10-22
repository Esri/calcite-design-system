import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { hidden, renders, slots, accessible, themed } from "../../tests/common";
import { commands } from "../../tests/utils/commands";
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

  describe.each(["ltr", "rtl"] as const)("relative resize bounds (%s)", (dir) => {
    it.each([SLOTS.panelStart, SLOTS.panelEnd])(
      "allows %s to expand to its configured maximum",
      async (slot) => {
        await page.viewport(1000, 800);
        await mount(
          <div dir={dir}>
            <calcite-shell>
              <div>Main content</div>
              <calcite-shell-panel
                resizable
                slot={slot}
                style="--calcite-shell-panel-min-width: 30vw; --calcite-shell-panel-width: 50vw; --calcite-shell-panel-max-width: 70vw;"
              >
                <p>Panel content</p>
              </calcite-shell-panel>
            </calcite-shell>
          </div>,
        );
        const handle = page.getByRole("separator");
        await expect.element(handle).toHaveAttribute("aria-valuemax", "700");

        const rect = handle.element().getBoundingClientRect();
        const expandsRight = (slot === SLOTS.panelStart) === (dir === "ltr");
        await userEvent.hover(handle);
        await commands.mouseDown();
        await commands.mouseMove(
          rect.left + rect.width / 2 + (expandsRight ? 200 : -200),
          rect.top + rect.height / 2,
        );
        await commands.mouseUp();

        await expect.element(handle).toHaveAttribute("aria-valuenow", "700");
      },
    );

    it("updates sizing context when inherited direction changes", async () => {
      await page.viewport(1000, 800);
      const { container } = await mount(
        <div dir={dir}>
          <calcite-shell>
            <div>Main content</div>
            <calcite-shell-panel
              resizable
              slot={SLOTS.panelEnd}
              style="--calcite-shell-panel-min-width: 30vw; --calcite-shell-panel-width: 50vw; --calcite-shell-panel-max-width: 70vw;"
            >
              <p>Panel content</p>
            </calcite-shell-panel>
          </calcite-shell>
        </div>,
      );
      container.querySelector("div")!.dir = dir === "ltr" ? "rtl" : "ltr";
      const handle = page.getByRole("separator");
      await expect.element(handle).toHaveAttribute("aria-valuemax", "700");
      await handle.click();
      await userEvent.keyboard("{End}");
      await expect.element(handle).toHaveAttribute("aria-valuenow", "700");
    });

    it.each([SLOTS.panelEnd, SLOTS.panelBottom])(
      "updates %s relative bounds after shrinking and growing the viewport",
      async (slot) => {
        await page.viewport(1600, 1600);
        await mount(
          <div dir={dir}>
            <calcite-shell>
              <div>Main content</div>
              <calcite-shell-panel
                resizable
                slot={slot}
                style="--calcite-shell-panel-min-width: 30vw; --calcite-shell-panel-width: 50vw; --calcite-shell-panel-max-width: 70vw; --calcite-shell-panel-min-height: 30vh; --calcite-shell-panel-height: 50vh; --calcite-shell-panel-max-height: 70vh;"
              >
                <p>Panel content</p>
              </calcite-shell-panel>
            </calcite-shell>
          </div>,
        );
        const handle = page.getByRole("separator");
        await handle.click();
        await userEvent.keyboard("{End}");
        await expect.element(handle).toHaveAttribute("aria-valuenow", "1120");

        await page.viewport(600, 600);
        await expect.element(handle).toHaveAttribute("aria-valuemin", "180");
        await expect.element(handle).toHaveAttribute("aria-valuemax", "420");
        await expect.element(handle).toHaveAttribute("aria-valuenow", "420");

        const rect = handle.element().getBoundingClientRect();
        const isBlock = slot === SLOTS.panelBottom;
        await userEvent.hover(handle);
        await commands.mouseDown();
        await commands.mouseMove(
          rect.left + rect.width / 2 + (isBlock ? 0 : dir === "ltr" ? 400 : -400),
          rect.top + rect.height / 2 + (isBlock ? 400 : 0),
        );
        await commands.mouseUp();
        await expect.element(handle).toHaveAttribute("aria-valuenow", "180");

        await page.viewport(1000, 1000);
        await expect.element(handle).toHaveAttribute("aria-valuemin", "300");
        await expect.element(handle).toHaveAttribute("aria-valuemax", "700");
        await userEvent.keyboard("{End}");
        await expect.element(handle).toHaveAttribute("aria-valuenow", "700");
        await userEvent.keyboard("{Home}");
        await expect.element(handle).toHaveAttribute("aria-valuenow", "300");
      },
    );
  });

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
