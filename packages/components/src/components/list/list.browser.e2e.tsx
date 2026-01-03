import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  cancelable,
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  t9n,
  disabled,
  accessible,
} from "../../tests/commonTests/browser";
import { placeholderImage } from "../../../.storybook/placeholder-image";

describe("calcite-list", () => {
  const placeholder = placeholderImage({
    width: 350,
    height: 150,
  });

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
          defaultValue: "",
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

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-list"));
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-list>
            <calcite-list-item label="test" value="test" />
          </calcite-list>,
        ),
      { display: "block" },
    );
  });

  describe("is focusable", () => {
    focusable(
      () =>
        mount(
          <calcite-list>
            <calcite-list-item active description="hello world" label="test" />
          </calcite-list>,
        ),
      {
        focusTargetSelector: "calcite-list-item",
      },
    );
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-list"));
  });

  describe("disabled", () => {
    disabled(
      () =>
        mount(
          <calcite-list>
            <calcite-list-item description="hello world" label="test" />
          </calcite-list>,
        ),
      { focusTarget: "child" },
    );
  });

  describe("accessible", () => {
    describe("default", () => {
      accessible(() =>
        mount(
          <calcite-list>
            <calcite-list-item description="kingdom" label="candy">
              <calcite-action icon="banana" label="finn" slot="actions-start" />
              <calcite-icon icon="banana" slot="content-start" />
              <img alt="Test image" slot="content-start" src={placeholder} />
              <calcite-icon icon="banana" slot="content-end" />
              <calcite-action icon="banana" label="jake" slot="actions-end" />
            </calcite-list-item>
            <calcite-list-item description="hello world" label="test" non-interactive />
            <calcite-list-item description="hello world" label="test" />
          </calcite-list>,
        ),
      );
      accessible(() =>
        mount(
          <calcite-list
            filter-enabled
            filter-text="Bananas"
            selection-appearance="border"
            selection-mode="single"
          >
            <calcite-list-item label="Apples" value="apples" />
            <calcite-list-item label="Oranges" value="oranges" />
            <calcite-list-item label="Pears" value="pears" />
            <calcite-notice icon kind="warning" open scale="s" slot="filter-no-results">
              <div slot="title">No fruits found</div>
              <div slot="message">Try a different fruit?</div>
            </calcite-notice>
          </calcite-list>,
        ),
      );
    });
  });
});
