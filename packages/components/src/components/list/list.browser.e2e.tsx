import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { cancelable, defaults, reflects } from "../../tests/commonTests/browser";

describe("calcite-list", () => {
  describe("cancelable", () => {
    cancelable("calcite-list");
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-list"),
      [
        {
          propertyName: "disabled",
          defaultValue: false,
        },
        {
          propertyName: "label",
          defaultValue: undefined,
        },
        {
          propertyName: "loading",
          defaultValue: false,
        },
        {
          propertyName: "selectionMode",
          defaultValue: "none",
        },
        {
          propertyName: "interactionMode",
          defaultValue: "interactive",
        },
        {
          propertyName: "selectedItems",
          defaultValue: [],
        },
        {
          propertyName: "selectionAppearance",
          defaultValue: "icon",
        },
        {
          propertyName: "filterEnabled",
          defaultValue: false,
        },
        {
          propertyName: "filterPredicate",
          defaultValue: undefined,
        },
        {
          propertyName: "filteredData",
          defaultValue: [],
        },
        {
          propertyName: "filteredItems",
          defaultValue: [],
        },
        {
          propertyName: "filterText",
          defaultValue: undefined,
        },
        {
          propertyName: "filterPlaceholder",
          defaultValue: undefined,
        },
        {
          propertyName: "dragEnabled",
          defaultValue: false,
        },
        {
          propertyName: "filterProps",
          defaultValue: undefined,
        },
        {
          propertyName: "displayMode",
          defaultValue: "flat",
        },
        {
          propertyName: "sortDisabled",
          defaultValue: false,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-list"),
      [
        {
          propertyName: "displayMode",
          value: "nested",
        },
        {
          propertyName: "sortDisabled",
          value: true,
        },
      ],
    );
  });
});
