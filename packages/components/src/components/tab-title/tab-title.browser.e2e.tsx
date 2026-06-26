import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders, disabled, themed } from "../../tests/commonTests/browser";

import { CSS } from "./resources";

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-tab-title"));
});

describe("renders", () => {
  renders(() => mount("calcite-tab-title"), { display: "block" });
});

describe("disabled", () => {
  disabled(() => mount(<calcite-tab-title selected />));
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount(<calcite-tab-title closable>Text</calcite-tab-title>), {
      "--calcite-tab-text-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
      },
      "--calcite-tab-text-color-press": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
        state: { press: `calcite-tab-title >>> .${CSS.container}` },
      },
      "--calcite-tab-accent-color-press": {
        shadowSelector: `.${CSS.selectedIndicator}`,
        targetProp: "backgroundColor",
        state: { press: `calcite-tab-title >>> .${CSS.selectedIndicator}` },
      },
      "--calcite-tab-close-icon-color": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-text-color",
      },
      "--calcite-tab-close-icon-color-press": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-text-color-press",
        state: { press: `calcite-tab-title >>> .${CSS.close}` },
      },
      "--calcite-tab-close-icon-background-color-press": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-background-color-press",
        state: { press: `calcite-tab-title >>> .${CSS.close}` },
      },
      "--calcite-tab-close-icon-background-color": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-background-color",
        state: { press: `calcite-tab-title >>> .${CSS.close}` },
      },
      "--calcite-tab-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
    });
  });

  describe("bordered", () => {
    themed(
      () =>
        mount(
          <calcite-tab-title bordered closable>
            yeah!
          </calcite-tab-title>,
        ),
      {
        "--calcite-tab-background-color-hover": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
          state: "hover",
        },
      },
    );
  });

  describe("selected", () => {
    themed(
      () =>
        mount(
          <calcite-tab-title closable selected>
            yeah!
          </calcite-tab-title>,
        ),
      {
        "--calcite-tab-text-color-press": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "color",
        },
        "--calcite-tab-close-icon-background-color": {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-background-color",
        },
      },
    );
  });

  describe("bordered & selected", () => {
    themed(
      () =>
        mount(
          <calcite-tab-title bordered selected>
            close me
          </calcite-tab-title>,
        ),
      {
        "--calcite-tab-border-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderInlineColor",
        },
        "--calcite-tab-background-color": {
          shadowSelector: `.${CSS.container}::after`,
          targetProp: "backgroundColor",
        },
      },
    );
  });

  describe("start/end icons", () => {
    themed(
      () =>
        mount(
          <calcite-tab-title icon-end="3d-glasses" icon-start="banana">
            close me
          </calcite-tab-title>,
        ),
      {
        "--calcite-tab-icon-color-start": {
          shadowSelector: `.${CSS.iconStart}`,
          targetProp: "color",
        },
        "--calcite-tab-icon-color-start-press": {
          shadowSelector: `.${CSS.iconStart}`,
          targetProp: "color",
          state: { press: `calcite-tab-title >>> .${CSS.container}` },
        },
        "--calcite-tab-icon-color-end": {
          shadowSelector: `.${CSS.iconEnd}`,
          targetProp: "color",
        },
        "--calcite-tab-icon-color-end-press": {
          shadowSelector: `.${CSS.iconEnd}`,
          targetProp: "color",
          state: { press: `calcite-tab-title >>> .${CSS.container}` },
        },
      },
    );
  });
});
