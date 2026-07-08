import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, themed } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-autocomplete-item-group"),
    [
      { propertyName: "disableSpacing", defaultValue: false },
      { propertyName: "heading", defaultValue: undefined },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-autocomplete-item-group"));
});

describe("renders", () => {
  renders(() => mount("calcite-autocomplete-item-group"), { display: "flex" });
});

describe("theme", () => {
  themed(() => mount("calcite-autocomplete-item-group"), {
    "--calcite-autocomplete-background-color": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "backgroundColor",
    },
    "--calcite-autocomplete-text-color": {
      shadowSelector: `.${CSS.heading}`,
      targetProp: "color",
    },
  });

  describe("groups", () => {
    themed(
      () =>
        mount(
          <calcite-autocomplete>
            <calcite-autocomplete-item-group heading="Group 1">
              <calcite-autocomplete-item heading="Item 1" value="1" />
            </calcite-autocomplete-item-group>
            <calcite-autocomplete-item-group heading="Group 2" id="bottom-group" position={1}>
              <calcite-autocomplete-item heading="Item 2" value="2" />
            </calcite-autocomplete-item-group>
          </calcite-autocomplete>,
        ),
      {
        "--calcite-autocomplete-border-color": {
          selector: "#bottom-group",
          shadowSelector: `.${CSS.separator}`,
          targetProp: "backgroundColor",
        },
      },
    );
  });
});
