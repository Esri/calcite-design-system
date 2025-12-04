import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  delegatesToFloatingUiOwningComponent,
  t9n,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

describe("calcite-flow-item", () => {
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
    t9n(() => mount("calcite-flow-item"));
  });
});
