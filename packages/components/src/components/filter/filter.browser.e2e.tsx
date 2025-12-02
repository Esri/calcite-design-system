import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  cancelable,
  defaults,
  reflects,
  hidden,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

describe("calcite-filter", () => {
  mockConsole();

  describe("cancelable", () => {
    mockConsole();
    cancelable("calcite-filter");
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-filter"),
      [
        {
          propertyName: "disabled",
          defaultValue: false,
        },
        {
          propertyName: "filteredItems",
          defaultValue: [],
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-filter"),
      [
        {
          propertyName: "disabled",
          value: true,
        },
        {
          propertyName: "scale",
          value: "s",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-filter"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-filter"), { display: "flex" });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-filter"));
  });
});
