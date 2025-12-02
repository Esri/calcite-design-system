import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("calcite-block-section", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-block-section"),
      [
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "expanded",
          defaultValue: false,
        },
        {
          propertyName: "toggleDisplay",
          defaultValue: "button",
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("is focusable", () => {
    describe("focuses toggle switch", () => {
      focusable(
        () =>
          mount(
            <calcite-block-section expanded text="text" toggle-display="switch">
              <div>some content</div>
            </calcite-block-section>,
          ),
        {
          shadowFocusTargetSelector: `.${CSS.toggle}`,
        },
      );
    });

    describe("focuses toggle button", () => {
      focusable(
        () =>
          mount(
            <calcite-block-section expanded text="text" toggle-display="button">
              <div>some content</div>
            </calcite-block-section>,
          ),
        {
          shadowFocusTargetSelector: `.${CSS.toggle}`,
        },
      );
    });
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-block-section"),
      [
        {
          propertyName: "open",
          value: true,
        },
        {
          propertyName: "expanded",
          value: true,
        },
        {
          propertyName: "scale",
          value: "m",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-block-section"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-block-section"), { display: "block" });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-block-section"));
  });
});
