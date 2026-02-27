import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { disabled, focusable, hidden, renders, slots } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("disabled", () => {
  disabled(() => mount(<calcite-swatch interactive />));
});

describe("is focusable", () => {
  focusable(() => mount(<calcite-swatch interactive />));
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-swatch"));
});

describe("renders", () => {
  renders(() => mount("calcite-swatch"), { display: "block" });
});

describe("slots", () => {
  slots(() => mount("calcite-swatch"), SLOTS);
});
