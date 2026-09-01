import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { html } from "lit";
import { page, userEvent } from "vitest/browser";
import { accessible, hidden, renders, focusable, themed } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import type { FlowItemLikeElement } from "./types";
import { CSS } from "./resources";

class CustomFlowItem extends LitElement implements FlowItemLikeElement {
  static tagName = "custom-flow-item";

  @property({ reflect: true, type: Boolean }) menuOpen = false;

  @property({ reflect: true, type: Boolean }) selected = false;

  @property({ reflect: true, type: Boolean }) showBackButton = false;

  async beforeBack(): Promise<void> {
    // no op
  }

  async setFocus(): Promise<void> {
    // no op
  }

  override render(): JsxNode {
    return this.showBackButton ? (
      <button onClick={this.handleBackButtonClick} type="button">
        Back
      </button>
    ) : null;
  }

  private handleBackButtonClick(): void {
    this.el.dispatchEvent(
      new CustomEvent("calciteFlowItemBack", { bubbles: true, cancelable: true, composed: true }),
    );
  }
}

class CustomNonFlowItem extends LitElement implements FlowItemLikeElement {
  static tagName = "custom-non-flow-item";

  @property({ reflect: true, type: Boolean }) menuOpen = false;

  @property({ reflect: true, type: Boolean }) selected = false;

  @property({ reflect: true, type: Boolean }) showBackButton = false;

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
  it("uses custom-item-selectors in addition to calcite-flow-item", async () => {
    await mount(
      html`
        <calcite-flow id="flow-host" custom-item-selectors="custom-flow-item">
          <calcite-flow-item id="ignored">Default item</calcite-flow-item>
          <custom-flow-item id="selected">Custom item</custom-flow-item>
        </calcite-flow>
      `,
      { dynamicComponents: [CustomFlowItem] },
    );

    const ignoredItem = page.getBySelector("#flow-host #ignored");
    const selectedItem = page.getBySelector("#flow-host #selected");

    await expect.element(selectedItem).toHaveProperty("selected", true);

    await expect.element(ignoredItem).toHaveProperty("selected", false);
    await expect.element(ignoredItem).toHaveProperty("showBackButton", false);
    await expect.element(selectedItem).toHaveProperty("showBackButton", true);
  });

  it("supports navigating through custom flow items", async () => {
    await mount(
      html`
        <calcite-flow custom-item-selectors=":is(calcite-flow-item, custom-flow-item)">
          <calcite-flow-item id="first">Default item</calcite-flow-item>
          <custom-flow-item id="second">Custom item</custom-flow-item>
        </calcite-flow>
      `,
      { dynamicComponents: [CustomFlowItem] },
    );

    const first = page.getBySelector("#first");
    const secondItem = page.getBySelector("#second");
    const secondItemBackButton = page.elementLocator(secondItem.element()).getBySelector("button");

    await expect.element(secondItem).toHaveProperty("selected", true);
    await expect.element(secondItem).toHaveProperty("showBackButton", true);

    await userEvent.click(secondItemBackButton);

    await expect.element(first).toHaveProperty("selected", true);
    await expect.element(first).toHaveProperty("showBackButton", false);
    await expect.element(secondItem).toHaveProperty("selected", false);
    await expect.element(secondItem).toHaveProperty("showBackButton", false);
  });

  it("tracks only top-level matching slotted items", async () => {
    await mount(
      html`
        <calcite-flow
          id="flow-host"
          custom-item-selectors=":is(calcite-flow-item, custom-flow-item, custom-flow-item-alt)"
        >
          <calcite-flow-item id="first">Top-level item</calcite-flow-item>
          <custom-flow-item id="second">
            Top-level item
            <custom-flow-item id="nested">Nested descendant item</custom-flow-item>
          </custom-flow-item>
          <custom-non-flow-item id="ignored"></custom-non-flow-item>
        </calcite-flow>
      `,
      { dynamicComponents: [CustomFlowItem, CustomNonFlowItem] },
    );

    const first = page.getBySelector("#flow-host #first");
    const secondItem = page.getBySelector("#flow-host #second");
    const nestedItem = page.getBySelector("#flow-host #nested");
    const ignoredItem = page.getBySelector("#flow-host #ignored");

    await expect.element(secondItem).toHaveProperty("selected", true);

    await expect.element(first).toHaveProperty("selected", false);
    await expect.element(first).toHaveProperty("showBackButton", false);

    await expect.element(secondItem).toHaveProperty("selected", true);
    await expect.element(secondItem).toHaveProperty("showBackButton", true);

    await expect.element(nestedItem).toHaveProperty("selected", false);
    await expect.element(nestedItem).toHaveProperty("showBackButton", false);

    await expect.element(ignoredItem).toHaveProperty("selected", false);
    await expect.element(ignoredItem).toHaveProperty("showBackButton", false);
  });
});
