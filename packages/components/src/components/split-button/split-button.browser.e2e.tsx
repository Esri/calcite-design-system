import { h, JsxNode } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";

import {
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  scalePropagates,
  disabled,
  accessible,
  topLayer,
  themed,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";

mockConsole();

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-split-button dropdown-label="Show options" primary-text="Button Text">
          <calcite-dropdown-group>
            <calcite-dropdown-item id="item-1">Item</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected>
              Item2
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-split-button>,
      ),
    );
  });

  describe("accessible when disabled", () => {
    accessible(() =>
      mount(
        <calcite-split-button disabled dropdown-label="Show options" primary-text="Button Text">
          <calcite-dropdown-group>
            <calcite-dropdown-item id="item-1">Item</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected>
              Item2
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-split-button>,
      ),
    );
  });

  describe("accessible when loading", () => {
    accessible(() =>
      mount(
        <calcite-split-button dropdown-label="Show options" loading primary-text="Button Text">
          <calcite-dropdown-group>
            <calcite-dropdown-item id="item-1">Item</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected>
              Item2
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-split-button>,
      ),
    );
  });

  describe("accessible with icons and no text", () => {
    accessible(() =>
      mount(
        <calcite-split-button
          dropdown-label="Show options"
          icon-end="plus"
          icon-start="plus"
          primary-label="Button label"
        >
          <calcite-dropdown-group>
            <calcite-dropdown-item id="item-1">Item</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected>
              Item2
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-split-button>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-split-button"),
    [
      {
        propertyName: "overlayPositioning",
        defaultValue: "absolute",
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined,
      },
      {
        propertyName: "placement",
        defaultValue: "bottom-end",
      },
      {
        propertyName: "download",
        defaultValue: false,
      },
      {
        propertyName: "href",
        defaultValue: undefined,
      },
      {
        propertyName: "rel",
        defaultValue: undefined,
      },
      {
        propertyName: "target",
        defaultValue: undefined,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-split-button"),
    [
      {
        propertyName: "placement",
        value: "bottom-end",
      },
      {
        propertyName: "download",
        value: true,
      },
      {
        propertyName: "href",
        value: "/",
      },
      {
        propertyName: "rel",
        value: "external",
      },
      {
        propertyName: "target",
        value: "_blank",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-split-button"));
});

describe("scale propagation", () => {
  scalePropagates((scale) => mount(<calcite-split-button scale={scale} />), {
    targetSelector: "calcite-button, calcite-dropdown",
  });
});

describe("renders", () => {
  renders(() => mount("calcite-split-button"), { display: "inline-block" });
});

function renderContent(): JsxNode {
  return (
    <calcite-dropdown-group>
      <calcite-dropdown-item id="item-1">Item</calcite-dropdown-item>
      <calcite-dropdown-item id="item-2" selected>
        Item2
      </calcite-dropdown-item>
    </calcite-dropdown-group>
  );
}

describe("focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-split-button dropdown-label="Show options" primary-text="Button Text">
          {renderContent()}
        </calcite-split-button>,
      ),
    {
      shadowFocusTargetSelector: "calcite-button",
    },
  );
});

describe("disabled", () => {
  disabled(() => mount("calcite-split-button"));
});

describe("top layer placement", () => {
  topLayer(
    () =>
      mount(
        <calcite-split-button dropdown-label="Show options" primary-text="Button Text">
          {renderContent()}
        </calcite-split-button>,
      ),
    {
      eventEmitter: page.getBySelector("calcite-split-button calcite-dropdown"),
      openProp: "active",
    },
  );
});

describe("theme", () => {
  themed(
    () =>
      mount(
        <calcite-split-button loading primary-icon-start="layer" primary-text="Button">
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>Option 2</calcite-dropdown-item>
            <calcite-dropdown-item>Option 3</calcite-dropdown-item>
            <calcite-dropdown-item>Option 4</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-split-button>,
      ),
    {
      "--calcite-split-button-background-color": {
        shadowSelector: "calcite-button",
        targetProp: "--calcite-button-background-color",
      },
      "--calcite-split-button-background-color-hover": {
        shadowSelector: "calcite-button",
        targetProp: "--calcite-button-background-color",
        state: "hover",
      },
      "--calcite-split-button-background-color-focus": {
        shadowSelector: "calcite-button",
        targetProp: "--calcite-button-background-color",
        state: { focus: { attribute: "type", value: "button" } },
      },
      "--calcite-split-button-background-color-press": {
        shadowSelector: "calcite-button",
        targetProp: "--calcite-button-background-color",
        state: { press: { attribute: "type", value: "button" } },
      },
      "--calcite-split-button-text-color": [
        {
          shadowSelector: "calcite-button[split-child='primary']",
          targetProp: "--calcite-button-text-color",
        },
        {
          shadowSelector: "calcite-button[split-child='secondary']",
          targetProp: "--calcite-button-text-color",
        },
      ],
      "--calcite-split-button-icon-color": [
        {
          shadowSelector: "calcite-button[split-child='primary']",
          targetProp: "--calcite-button-icon-color",
        },
      ],
      "--calcite-split-button-border-color": [
        {
          shadowSelector: "calcite-button[split-child='secondary']",
          targetProp: "--calcite-button-border-color",
        },
        {
          shadowSelector: "calcite-button[split-child='primary']",
          targetProp: "--calcite-button-border-color",
        },
      ],
      "--calcite-split-button-shadow": [
        {
          shadowSelector: "calcite-button[split-child='primary']",
          targetProp: "--calcite-button-shadow",
        },
        {
          shadowSelector: "calcite-button[split-child='secondary']",
          targetProp: "--calcite-button-shadow",
        },
      ],
      "--calcite-split-button-divider-color": {
        shadowSelector: `.${CSS.dividerContainer}`,
        targetProp: "backgroundColor",
      },
      "--calcite-split-button-divider-border-color": {
        shadowSelector: `.${CSS.divider}`,
        targetProp: "backgroundColor",
      },
      "--calcite-split-button-dropdown-background-color": {
        shadowSelector: `calcite-dropdown`,
        targetProp: "--calcite-dropdown-background-color",
      },
      "--calcite-split-button-dropdown-width": {
        shadowSelector: `calcite-dropdown`,
        targetProp: "--calcite-dropdown-width",
      },
    },
  );
});
