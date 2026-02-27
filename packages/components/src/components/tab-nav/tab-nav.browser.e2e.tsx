import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, t9n } from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(() => mount("calcite-tab-nav"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-tab-nav"));
});

describe("renders", () => {
  renders(() => mount("calcite-tab-nav"), { display: "flex" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-tab-nav"));
});
