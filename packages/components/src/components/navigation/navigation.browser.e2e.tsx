import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  accessible,
} from "../../tests/commonTests/browser";

describe("calcite-navigation", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-navigation"),
      [
        {
          propertyName: "navigationAction",
          defaultValue: false,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-navigation"),
      [
        {
          propertyName: "navigationAction",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-navigation"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-navigation>
            <calcite-navigation-logo heading="Walt's Chips" slot="logo" />
          </calcite-navigation>,
        ),
      { display: "block" },
    );
  });

  describe("is focusable", () => {
    focusable(() => mount(<calcite-navigation navigation-action />), {
      shadowFocusTargetSelector: "calcite-action",
    });
  });

  describe("accessible", () => {
    accessible(() =>
      mount(
        <calcite-navigation label="test" navigation-action>
          <calcite-navigation-logo heading="Test" />
        </calcite-navigation>,
      ),
    );
  });
});
