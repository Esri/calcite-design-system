import { h, Fragment } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  reflects,
  hidden,
  renders,
  scalePropagates,
  slots,
  delegatesToFloatingUiOwningComponent,
  focusable,
  t9n,
  disabled,
  accessible,
  topLayer,
  themed,
} from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { scrolling } from "../../tests/utils/content";
import type { Panel } from "../panel/panel";
import type { FlowItem } from "./flow-item";
import { SLOTS } from "./resources";

mockConsole();

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-flow-item>
          <div slot={SLOTS.headerActionsStart}>test start</div>
          <div slot={SLOTS.headerContent}>test content</div>
          <div slot={SLOTS.headerActionsEnd}>test end</div>
          <p>Content</p>
          <calcite-button slot={SLOTS.footerStart}>test button 1</calcite-button>
          <calcite-button slot={SLOTS.footerEnd}>test button 2</calcite-button>
        </calcite-flow-item>,
      ),
    );
  });

  describe("collapsible", () => {
    accessible(() =>
      mount(
        <calcite-flow-item collapsible>
          <div slot={SLOTS.headerActionsStart}>test start</div>
          <div slot={SLOTS.headerContent}>test content</div>
          <div slot={SLOTS.headerActionsEnd}>test end</div>
          <p>Content</p>
          <calcite-button slot={SLOTS.footerStart}>test button 1</calcite-button>
          <calcite-button slot={SLOTS.footerEnd}>test button 2</calcite-button>
        </calcite-flow-item>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-flow-item"),
    [
      {
        propertyName: "beforeClose",
        defaultValue: undefined,
      },
      {
        propertyName: "closable",
        defaultValue: false,
      },
      {
        propertyName: "closed",
        defaultValue: false,
      },
      {
        propertyName: "collapsible",
        defaultValue: false,
      },
      {
        propertyName: "collapseDirection",
        defaultValue: "down",
      },
      {
        propertyName: "collapsed",
        defaultValue: false,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
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
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "focusTrapDisabled",
        defaultValue: false,
      },
      {
        propertyName: "menuOpen",
        defaultValue: false,
      },
      {
        propertyName: "selected",
        defaultValue: false,
      },
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "showBackButton",
        defaultValue: false,
      },
    ],
  );
});

describe("is focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-flow-item selected show-back-button>
          test
        </calcite-flow-item>,
      ),
    {
      shadowFocusTargetSelector: "calcite-action",
    },
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-flow-item"),
    [
      {
        propertyName: "closable",
        value: true,
      },
      {
        propertyName: "closed",
        value: true,
      },
      {
        propertyName: "collapsible",
        value: true,
      },
      {
        propertyName: "collapsed",
        value: true,
      },
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "loading",
        value: true,
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
        propertyName: "menuOpen",
        value: true,
      },
      {
        propertyName: "overlayPositioning",
        value: "fixed",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-flow-item"));
});

describe("renders", () => {
  renders(() => mount(<calcite-flow-item selected>content</calcite-flow-item>), {
    display: "flex",
  });
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-flow-item show-back-button />, mountOptions), {
    targetSelector: "calcite-panel, calcite-action",
  });
});

describe("slots", () => {
  slots(() => mount("calcite-flow-item"), SLOTS);

  it("omits the leading separator for an Action Bar without header content", async () => {
    await mount(
      <calcite-flow-item selected style="--calcite-flow-content-top-space: 0;">
        <calcite-action-bar layout="horizontal" slot={SLOTS.contentTop}>
          <calcite-action icon="plus" text="Add" />
        </calcite-action-bar>
      </calcite-flow-item>,
    );
    const panel = page.getBySelector("calcite-panel");
    const actionBar = page.getBySelector("calcite-action-bar");

    await expect.element(page.getByRole("button", { name: "Add" })).toBeVisible();
    expect(actionBar.element().getBoundingClientRect().top).toBe(
      panel.element().getBoundingClientRect().top,
    );
  });

  it.each([
    { slot: SLOTS.actionBar, space: 0 },
    { slot: SLOTS.actionBar, space: 12 },
    { slot: SLOTS.contentTop, space: 0 },
    { slot: SLOTS.contentTop, space: 12 },
  ])(
    "renders an interactive horizontal Action Bar in $slot with $space px content-top padding",
    async ({ slot, space }) => {
      const onAction = vi.fn();
      const { el } = await mount(
        <calcite-flow-item
          heading="Flow item"
          selected
          style={`inline-size: 320px; --calcite-flow-content-top-space: ${space}px;`}
        >
          <calcite-action-bar
            layout={slot === SLOTS.contentTop ? "horizontal" : undefined}
            slot={slot}
          >
            <calcite-action icon="plus" onClick={onAction} text="Add" />
          </calcite-action-bar>
          <div>Content</div>
        </calcite-flow-item>,
      );
      const actionBar = page.getBySelector("calcite-action-bar");

      await expect.element(page.getByRole("button", { name: "Add" })).toBeVisible();
      await expect.element(actionBar).toHaveAttribute("layout", "horizontal");
      expect(actionBar.element().getBoundingClientRect().width).toBe(
        el.getBoundingClientRect().width - (slot === SLOTS.contentTop ? space * 2 : 0),
      );
      await page.getByRole("button", { name: "Add" }).click();
      expect(onAction).toHaveBeenCalledOnce();
    },
  );

  it("forwards header-top content to the internal panel", async () => {
    await mount(
      <calcite-flow-item selected>
        <div slot={SLOTS.headerTop}>Header top</div>
      </calcite-flow-item>,
    );

    await expect.element(page.getByText("Header top")).toBeVisible();
  });
});

describe("delegates to floating-ui-owner component", () => {
  delegatesToFloatingUiOwningComponent(
    () =>
      mount(
        <calcite-flow-item>
          <calcite-action icon="measure" slot="header-menu-actions" text="measure" text-enabled />
        </calcite-flow-item>,
      ),
    "calcite-panel",
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-flow-item"), ["calcite-panel"]);
});

describe("top layer placement", () => {
  topLayer(
    () =>
      mount(
        <calcite-flow-item>
          <calcite-action icon="plus" slot={SLOTS.headerMenuActions} text="Add" />
        </calcite-flow-item>,
      ),
    {
      delegatedTopLayer: true,
      openProp: "menuOpen",
      topLayerTarget: page.getBySelector("calcite-flow-item [popover]"),
    },
  );
});

describe("disabled", () => {
  describe("default", () => {
    disabled(
      () =>
        mount(
          <calcite-flow-item selected style={scrolling.style}>
            {scrolling.render()}
          </calcite-flow-item>,
        ),
      {
        focusTarget: {
          tab: "calcite-flow-item",
          click: "calcite-flow-item",
        },
      },
    );
  });

  describe("closable", () => {
    disabled(
      () =>
        mount(
          <calcite-flow-item closable selected style={scrolling.style}>
            {scrolling.render()}
          </calcite-flow-item>,
        ),
      {
        focusTarget: {
          tab: "calcite-flow-item",
          click: "calcite-flow-item",
        },
      },
    );
  });
});

describe("theme", () => {
  it("preserves inherited public Panel tokens when Flow Item tokens change", async () => {
    const { el } = await mount(
      <calcite-flow-item
        heading="Flow Item"
        selected
        style="--calcite-panel-space: 8px; --calcite-panel-header-background-color: rgb(0, 0, 255);"
      >
        <div>
          <calcite-panel heading="Nested Panel" id="nested-panel">
            Content
          </calcite-panel>
        </div>
      </calcite-flow-item>,
    );

    el.style.setProperty("--calcite-flow-space", "24px");
    el.style.setProperty("--calcite-flow-header-background-color", "rgb(255, 0, 0)");
    const internalPanel = page.elementLocator(el.shadowRoot.querySelector("calcite-panel")!);
    await expect.element(internalPanel.getBySelector(".content-wrapper").first()).toHaveStyle({
      paddingTop: "24px",
    });
    await expect.element(internalPanel.getBySelector(".header").first()).toHaveStyle({
      backgroundColor: "rgb(255, 0, 0)",
    });
    await expect
      .poll(
        () =>
          getComputedStyle(page.getBySelector("#nested-panel .content-wrapper").element()).padding,
      )
      .toBe("8px");
    await expect.element(page.getBySelector("#nested-panel .header")).toHaveStyle({
      backgroundColor: "rgb(0, 0, 255)",
    });
  });

  themed(
    () =>
      mount(
        <calcite-flow-item
          closable
          description="Description"
          heading="Heading"
          icon="banana"
          selected
          show-back-button
        >
          <div slot="header-top">Header top</div>
          <div slot="content-top">Content top</div>
          <div slot="content-bottom">Content bottom</div>
          <div slot="footer">Footer</div>
        </calcite-flow-item>,
      ),
    {
      "--calcite-flow-corner-radius": {
        shadowSelector: "calcite-panel",
        targetProp: "borderRadius",
      },
      "--calcite-flow-heading-text-color": {
        shadowSelector: "calcite-panel .heading",
        targetProp: "color",
      },
      "--calcite-flow-icon-color": {
        shadowSelector: "calcite-panel .icon",
        targetProp: "--calcite-icon-color",
      },
      "--calcite-flow-description-text-color": {
        shadowSelector: "calcite-panel .description",
        targetProp: "color",
      },
      "--calcite-flow-border-color": [
        {
          shadowSelector: "calcite-panel .header",
          targetProp: "borderBottomColor",
        },
      ],
      "--calcite-flow-background-color": {
        shadowSelector: "calcite-panel .content-wrapper",
        targetProp: "backgroundColor",
      },
      "--calcite-flow-header-background-color": {
        shadowSelector: "calcite-panel .header",
        targetProp: "backgroundColor",
      },
      "--calcite-flow-footer-background-color": {
        shadowSelector: "calcite-panel .footer",
        targetProp: "backgroundColor",
      },
      "--calcite-flow-space": {
        shadowSelector: "calcite-panel .content-wrapper",
        targetProp: "paddingTop",
      },
      "--calcite-flow-header-top-space": {
        shadowSelector: "calcite-panel .header-top",
        targetProp: "paddingTop",
      },
      "--calcite-flow-content-top-space": {
        shadowSelector: "calcite-panel .content-top",
        targetProp: "paddingTop",
      },
      "--calcite-flow-content-bottom-space": {
        shadowSelector: "calcite-panel .content-bottom",
        targetProp: "paddingTop",
      },
      "--calcite-flow-footer-space": {
        shadowSelector: "calcite-panel .footer",
        targetProp: "paddingTop",
      },
      "--calcite-flow-header-action-background-color-hover": {
        shadowSelector: "calcite-panel #close",
        targetProp: "--calcite-action-background-color-hover",
      },
      "--calcite-flow-header-action-background-color-press": {
        shadowSelector: "calcite-panel #close",
        targetProp: "--calcite-action-background-color-press",
      },
      "--calcite-flow-header-action-background-color": {
        shadowSelector: "calcite-panel #close",
        targetProp: "--calcite-action-background-color",
      },
      "--calcite-flow-header-action-text-color-press": {
        shadowSelector: "calcite-panel #close",
        targetProp: "--calcite-action-text-color-press",
      },
      "--calcite-flow-header-action-text-color": {
        shadowSelector: "calcite-panel #close",
        targetProp: "--calcite-action-text-color",
      },
    },
  );

  describe("slotted header spacing", () => {
    themed(
      () =>
        mount(
          <calcite-flow-item selected>
            <div slot="header-content">Custom header</div>
          </calcite-flow-item>,
        ),
      {
        "--calcite-flow-header-content-space": {
          shadowSelector: "calcite-panel .header--slotted-content",
          targetProp: "paddingTop",
        },
      },
    );
  });
});

describe("focus trap", () => {
  it("allows selected Flow Items to opt out", async () => {
    const { el } = await mount<FlowItem>(
      <calcite-flow-item closable focusTrapDisabled heading="Flow heading" selected />,
    );

    const panel = el.shadowRoot.querySelector<Panel["el"]>("calcite-panel")!;

    expect(panel.focusTrapDisabled).toBe(true);
    await expect
      .element(page.getByRole("dialog", { name: "Flow heading" }))
      .not.toBeInTheDocument();
  });

  it("labels a closable dialog with a forwarded slotted heading", async () => {
    await mount(
      <calcite-flow-item closable selected>
        <span slot={SLOTS.heading}>Slotted heading</span>
      </calcite-flow-item>,
    );

    await expect.element(page.getByRole("dialog", { name: "Slotted heading" })).toBeVisible();
  });

  it("applies dialog semantics to a selected root Flow Item", async () => {
    await mount(
      <calcite-flow>
        <calcite-flow-item heading="Root heading" selected />
      </calcite-flow>,
    );

    await expect.element(page.getByRole("dialog", { name: "Root heading" })).toBeVisible();
  });

  it("traps focus in a selected root Flow Item", async () => {
    await mount(
      <>
        <calcite-flow>
          <calcite-flow-item heading="Root heading" selected>
            <button type="button">inside one</button>
            <button type="button">inside two</button>
          </calcite-flow-item>
        </calcite-flow>
        <button type="button">outside control</button>
      </>,
    );

    const insideOne = page.getByText("inside one", { exact: true });
    const insideTwo = page.getByText("inside two", { exact: true });

    await userEvent.click(insideTwo);
    await expect.element(insideTwo).toHaveFocus();

    await userEvent.tab();
    await expect.element(insideOne).toHaveFocus();

    await userEvent.tab();
    await expect.element(insideTwo).toHaveFocus();
  });

  it("enables focus trap behavior on its Panel when Back is shown", async () => {
    await mount(
      <>
        <calcite-flow>
          <calcite-flow-item heading="Root heading" id="root-item">
            <button type="button">root control</button>
          </calcite-flow-item>
          <calcite-flow-item heading="Flow heading" id="nested-item" selected>
            <button type="button">inside one</button>
            <button type="button">inside two</button>
          </calcite-flow-item>
        </calcite-flow>
        <button type="button">outside control</button>
      </>,
    );

    const insideOne = page.getByText("inside one", { exact: true });
    const insideTwo = page.getByText("inside two", { exact: true });
    const rootControl = page.getByText("root control", { exact: true });
    const flowItem = page.getBySelector("#nested-item").element() as FlowItem["el"];
    const panel = flowItem?.shadowRoot?.querySelector("calcite-panel");

    expect(panel?.focusTrapEnabledByParent).toBe(true);

    await userEvent.click(insideTwo);
    await expect.element(insideTwo).toHaveFocus();

    await userEvent.tab();
    await expect.element(flowItem).toHaveFocus();

    await userEvent.tab();
    await expect.element(insideOne).toHaveFocus();

    await userEvent.click(page.getByTitle("Back"));
    await expect.element(flowItem).toHaveProperty("selected", false);
    await expect.element(rootControl).toHaveFocus();

    await userEvent.tab();
    await expect.element(rootControl).toHaveFocus();
  });

  it("accepts focusTrapOptions.extraContainers when updateFocusTrapElements is called", async () => {
    const { el } = await mount<FlowItem>(
      <>
        <calcite-flow-item closable heading="Flow heading" selected>
          <button type="button">inside one</button>
          <button type="button">inside two</button>
        </calcite-flow-item>
        <button id="flow-item-outside-control" type="button">
          outside control
        </button>
      </>,
    );

    const outsideControl = page.getByText("outside control", { exact: true });
    const outsideControlEl = el.ownerDocument.getElementById(
      "flow-item-outside-control",
    ) as HTMLButtonElement;

    el.focusTrapOptions = { extraContainers: [outsideControlEl] };
    await expect(el.updateFocusTrapElements()).resolves.toBeUndefined();
    await expect(outsideControl).toBeInTheDocument();
  });
});
