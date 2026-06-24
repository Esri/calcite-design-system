import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import {
  accessible,
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  disabled,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

mockConsole();

describe("accessible", () => {
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

describe("renders", () => {
  renders(() => mount("calcite-split-button"), { display: "inline-block" });
});

const renderContentString = `
  <calcite-dropdown-group>
    <calcite-dropdown-item id="item-1">Item</calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" selected>Item2</calcite-dropdown-item>
  </calcite-dropdown-group>
`;

describe("focusable", () => {
  focusable(
    () =>
      mount("calcite-split-button", {
        afterConnect: (el) => {
          el.dropdownLabel = "Show options";
          el.primaryText = "Button Text";
          el.innerHTML = renderContentString;
        },
      }),
    {
      shadowFocusTargetSelector: "calcite-button",
    },
  );
});

describe("disabled", () => {
  disabled(() => mount("calcite-split-button"));
});
