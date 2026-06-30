import { h, Fragment } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  delegatesToFloatingUiOwningComponent,
  focusable,
  t9n,
  disabled,
  accessible,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { scrolling } from "../../tests/browser/utils/content";
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
      {
        propertyName: "focusTrapEnabled",
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
      {
        propertyName: "focusTrapEnabled",
        value: true,
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

describe("slots", () => {
  slots(() => mount("calcite-flow-item"), SLOTS);
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

describe("focus trap", () => {
  it("passes focusTrapEnabled to the internal panel", async () => {
    const { component } = await mount<FlowItem>(
      <calcite-flow-item closable heading="Flow heading" selected />,
    );

    await expect
      .element(page.getByRole("dialog", { name: "Flow heading" }))
      .not.toBeInTheDocument();

    component.el.focusTrapEnabled = true;

    await expect.element(page.getByRole("dialog", { name: "Flow heading" })).toBeInTheDocument();
  });

  it("reflects focusTrapEnabled through internal panel semantics", async () => {
    const { component } = await mount<FlowItem>(
      <calcite-flow-item closable heading="Flow heading" selected />,
    );

    await expect
      .element(page.getByRole("dialog", { name: "Flow heading" }))
      .not.toBeInTheDocument();

    component.el.focusTrapEnabled = true;

    await expect.element(page.getByRole("dialog", { name: "Flow heading" })).toBeInTheDocument();

    component.el.focusTrapEnabled = false;

    await expect
      .element(page.getByRole("dialog", { name: "Flow heading" }))
      .not.toBeInTheDocument();
  });

  it("supports focus trap behavior through keyboard interaction", async () => {
    const { component } = await mount<FlowItem>(
      <calcite-flow-item closable focusTrapEnabled heading="Flow heading" selected>
        <button type="button">inside one</button>
        <button type="button">inside two</button>
      </calcite-flow-item>,
    );

    const insideOne = page.getByText("inside one", { exact: true });
    const insideTwo = page.getByText("inside two", { exact: true });

    await expect(component.el.setFocus({ preventScroll: true })).resolves.toBeUndefined();
    await expect.element(component.el).toHaveFocus();

    await userEvent.tab();
    await expect.element(insideOne).toHaveFocus();

    await userEvent.tab();
    await expect.element(insideTwo).toHaveFocus();

    await userEvent.tab();
    await expect.element(component.el).toHaveFocus();

    await userEvent.tab();
    await expect.element(insideOne).toHaveFocus();
  });

  it("accepts focusTrapOptions.extraContainers when updateFocusTrapElements is called", async () => {
    const { el } = await mount<FlowItem>(
      <>
        <calcite-flow-item closable focusTrapEnabled heading="Flow heading" selected>
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
