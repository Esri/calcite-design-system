import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import {
  accessible,
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  slots,
  t9n,
} from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("accessible", () => {
  accessible(() => mount(<calcite-accordion-item heading="My Heading" />));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-accordion-item"),
    [
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
      {
        propertyName: "scale",
        defaultValue: undefined,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-accordion-item"),
    [
      {
        propertyName: "headingLevel",
        value: 2,
      },
      {
        propertyName: "scale",
        value: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-accordion-item"));
});

describe("renders", () => {
  renders(() => mount("calcite-accordion-item"), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-accordion-item"), SLOTS);
});

describe("is focusable", () => {
  focusable(() => mount("calcite-accordion-item"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-accordion-item"));
});
