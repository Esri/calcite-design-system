import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, renders, slots } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("defaults", () => {
  defaults(
    () => mount("calcite-stack"),
    [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-stack"));
});

describe("renders", () => {
  renders(() => mount("calcite-stack"), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-stack"), SLOTS);
});
