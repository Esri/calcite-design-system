import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
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
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { scrolling } from "../../tests/browser/utils/content";
import { SLOTS } from "./resources";

mockConsole();

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
        propertyName: "focusTrap",
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
        propertyName: "focusTrap",
        value: true,
      },
      {
        propertyName: "focusTrapDisabled",
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

describe("internal panel", () => {
  it("passes focusTrap to the internal panel", async () => {
    const { el, component } = await mount(
      <calcite-flow-item closable focusTrap selected>
        content
      </calcite-flow-item>,
    );

    await component.updateComplete;

    const panel = el.shadowRoot.querySelector("calcite-panel");

    expect(panel.focusTrap).toBe(true);
  });

  it("does not pass focusTrap to the internal panel by default", async () => {
    const { el, component } = await mount(
      <calcite-flow-item closable selected>
        content
      </calcite-flow-item>,
    );

    await component.updateComplete;

    const panel = el.shadowRoot.querySelector("calcite-panel");

    expect(panel.focusTrap).toBe(false);
  });

  it("passes focusTrapDisabled to the internal panel when not selected", async () => {
    const { el, component } = await mount(
      <calcite-flow-item closable focusTrap focusTrapDisabled>
        content
      </calcite-flow-item>,
    );

    await component.updateComplete;

    const panel = el.shadowRoot.querySelector("calcite-panel");

    expect(panel.focusTrapDisabled).toBe(true);
  });

  it("passes focusTrapDisabled to the internal panel when selected and explicitly disabled", async () => {
    const { el, component } = await mount(
      <calcite-flow-item closable focusTrap focusTrapDisabled selected>
        content
      </calcite-flow-item>,
    );

    await component.updateComplete;

    const panel = el.shadowRoot.querySelector("calcite-panel");

    expect(panel.focusTrapDisabled).toBe(true);
  });

  it("does not pass focusTrapDisabled to the internal panel when selected and not disabled", async () => {
    const { el, component } = await mount(
      <calcite-flow-item closable focusTrap selected>
        content
      </calcite-flow-item>,
    );

    await component.updateComplete;

    const panel = el.shadowRoot.querySelector("calcite-panel");

    expect(panel.focusTrapDisabled).toBe(false);
  });

  it("updates internal panel focusTrapDisabled when selected changes", async () => {
    const { el, component } = await mount(
      <calcite-flow-item closable focusTrap>
        content
      </calcite-flow-item>,
    );
    const flowItem = component as unknown as HTMLElement & { selected: boolean };

    await component.updateComplete;

    let panel = el.shadowRoot.querySelector("calcite-panel");
    expect(panel.focusTrapDisabled).toBe(true);

    flowItem.selected = true;
    await component.updateComplete;

    panel = el.shadowRoot.querySelector("calcite-panel");
    expect(panel.focusTrapDisabled).toBe(false);

    flowItem.selected = false;
    await component.updateComplete;

    panel = el.shadowRoot.querySelector("calcite-panel");
    expect(panel.focusTrapDisabled).toBe(true);
  });
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
