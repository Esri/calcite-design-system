import { h, Fragment } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { JsxNode } from "@arcgis/lumina";
import { defaults, reflects, hidden, renders, accessible } from "../../tests/commonTests/browser";

describe("calcite-tabs", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-tabs"),
      [
        { propertyName: "layout", defaultValue: "inline" },
        { propertyName: "position", defaultValue: "top" },
        { propertyName: "scale", defaultValue: "m" },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-tabs"),
      [
        { propertyName: "layout", value: "inline" },
        { propertyName: "position", value: "top" },
        { propertyName: "scale", value: "m" },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-tabs"));
  });

  function renderTabsContent(): JsxNode {
    return (
      <>
        <calcite-tab-nav slot="title-group">
          <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
          <calcite-tab-title>Tab 2 Title</calcite-tab-title>
          <calcite-tab-title>Tab 3 Title</calcite-tab-title>
          <calcite-tab-title>Tab 4 Title</calcite-tab-title>
        </calcite-tab-nav>
        <calcite-tab selected>Tab 1 Content</calcite-tab>
        <calcite-tab>Tab 2 Content</calcite-tab>
        <calcite-tab>Tab 3 Content</calcite-tab>
        <calcite-tab>Tab 4 Content</calcite-tab>
      </>
    );
  }

  describe("renders", () => {
    renders(() => mount(<calcite-tabs>{renderTabsContent()}</calcite-tabs>), { display: "flex" });
  });

  describe("accessible", () => {
    describe("checked", () => {
      accessible(() => mount(<calcite-tabs>{renderTabsContent()}</calcite-tabs>));
    });
  });
});
