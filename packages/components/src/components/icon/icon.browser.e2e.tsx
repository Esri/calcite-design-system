import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders } from "../../tests/commonTests/browser";

describe("defaults", () => {
  defaults(
    () => mount("calcite-icon"),
    [
      { propertyName: "flipRtl", defaultValue: false },
      { propertyName: "preload", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-icon"),
    [
      { propertyName: "flipRtl", value: true },
      { propertyName: "preload", value: true },
      { propertyName: "scale", value: "m" },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-icon"));
});

describe("renders", () => {
  renders(() => mount("calcite-icon"), { display: "inline-flex" });
});
