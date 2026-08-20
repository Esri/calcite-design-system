import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { html } from "lit";
import { page } from "vitest/browser";
import { accessible, hidden, renders, focusable, themed } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import type { FlowItemLikeElement } from "./types";
import { CSS } from "./resources";

class CustomFlowItem extends HTMLElement implements FlowItemLikeElement {
  get selected(): boolean {
    return this.hasAttribute("selected");
  }

  set selected(value: boolean) {
    this.toggleAttribute("selected", value);
  }

  get showBackButton(): boolean {
    return this.hasAttribute("show-back-button");
  }

  set showBackButton(value: boolean) {
    this.toggleAttribute("show-back-button", value);
  }

  get menuOpen(): boolean {
    return this.hasAttribute("menu-open");
  }

  set menuOpen(value: boolean) {
    this.toggleAttribute("menu-open", value);
  }

  async beforeBack(): Promise<void> {
    // no op
  }

  async setFocus(): Promise<void> {
    // no op
  }
}

class CustomNonFlowItem extends HTMLElement implements FlowItemLikeElement {
  get selected(): boolean {
    return this.hasAttribute("selected");
  }

  set selected(value: boolean) {
    this.toggleAttribute("selected", value);
  }

  get showBackButton(): boolean {
    return this.hasAttribute("show-back-button");
  }

  set showBackButton(value: boolean) {
    this.toggleAttribute("show-back-button", value);
  }

  get menuOpen(): boolean {
    return this.hasAttribute("menu-open");
  }

  set menuOpen(value: boolean) {
    this.toggleAttribute("menu-open", value);
  }

  async beforeBack(): Promise<void> {
    // no op
  }

  async setFocus(): Promise<void> {
    // no op
  }
}

mockConsole();

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-flow>
        <calcite-flow-item />
        <calcite-flow-item />
        <calcite-flow-item />
      </calcite-flow>,
    ),
  );
});

describe("is focusable", () => {
  describe("default", () => {
    focusable(
      () =>
        mount(
          <calcite-flow>
            <calcite-flow-item heading="one" id="one">
              Hello World
            </calcite-flow-item>
            <calcite-flow-item heading="two" id="two">
              Hello World
            </calcite-flow-item>
          </calcite-flow>,
        ),
      {
        focusTargetSelector: "#two",
      },
    );
  });

  describe("selected", () => {
    focusable(
      () =>
        mount(
          <calcite-flow>
            <calcite-flow-item heading="one" id="one">
              Hello World
            </calcite-flow-item>
            <calcite-flow-item heading="two" id="two" selected>
              Hello World
            </calcite-flow-item>
            <calcite-flow-item heading="three" id="three">
              Hello World
            </calcite-flow-item>
          </calcite-flow>,
        ),
      {
        focusTargetSelector: "#two",
      },
    );
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-flow"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-flow>
          <calcite-flow-item heading="test">content</calcite-flow-item>
        </calcite-flow>,
      ),
    { display: "flex" },
  );
});

describe("theme", () => {
  themed(() => mount("calcite-flow"), {
    "--calcite-flow-background-color": {
      shadowSelector: `.${CSS.frame}`,
      targetProp: "backgroundColor",
    },
  });
});

describe("slotted item tracking", () => {
  it("tracks only top-level matching slotted items", async () => {
    if (!customElements.get("custom-flow-item")) {
      customElements.define("custom-flow-item", CustomFlowItem);
    }

    if (!customElements.get("custom-non-flow-item")) {
      customElements.define("custom-non-flow-item", CustomNonFlowItem);
    }

    await mount(html`
      <calcite-flow
        id="flow-host"
        custom-item-selectors=":is(custom-flow-item, custom-flow-item-alt)"
      >
        <calcite-flow-item id="first">Top-level item</calcite-flow-item>
        <custom-flow-item id="second">
          Top-level item
          <custom-flow-item id="nested">Nested descendant item</custom-flow-item>
        </custom-flow-item>
        <custom-non-flow-item id="ignored"></custom-non-flow-item>
      </calcite-flow>
    `);

    const first = page.getBySelector("#flow-host #first").element() as FlowItemLikeElement;
    const secondItem = page.getBySelector("#flow-host #second").element() as FlowItemLikeElement;
    const nestedItem = page.getBySelector("#flow-host #nested").element() as FlowItemLikeElement;
    const ignoredItem = page.getBySelector("#flow-host #ignored").element() as FlowItemLikeElement;

    await expect.poll(() => secondItem.selected).toBe(true);

    expect(first.selected).toBe(false);
    expect(first.showBackButton).toBe(false);

    expect(secondItem.selected).toBe(true);
    expect(secondItem.showBackButton).toBe(true);

    expect(nestedItem.selected).toBe(false);
    expect(nestedItem.showBackButton).toBe(false);

    expect(ignoredItem.selected).toBe(false);
    expect(ignoredItem.showBackButton).toBe(false);
  });
});
