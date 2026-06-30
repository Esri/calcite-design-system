import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  accessible,
  focusable,
  hidden,
  renders,
  t9n,
  disabled,
} from "../../tests/commonTests/browser";

describe("accessible", () => {
  accessible(() => mount("calcite-handle"));
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-handle"));
});

describe("renders", () => {
  renders(() => mount("calcite-handle"), { display: "flex" });
});

describe("focusable", () => {
  focusable(() => mount("calcite-handle"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-handle"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-handle"));
});
