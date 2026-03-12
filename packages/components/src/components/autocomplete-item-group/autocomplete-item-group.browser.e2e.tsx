import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders } from "../../tests/commonTests/browser";

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
