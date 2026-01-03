import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  accessible,
} from "../../tests/commonTests/browser";

describe("calcite-navigation-user", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-navigation-user"),
      [
        {
          propertyName: "textDisabled",
          defaultValue: false,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-navigation-user"),
      [
        {
          propertyName: "active",
          value: "true",
        },
        {
          propertyName: "textDisabled",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-navigation-user"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-navigation-user"), { display: "inline-flex" });
  });

  describe("is focusable", () => {
    focusable(() => mount("calcite-navigation-user"));
  });

  describe("accessible", () => {
    accessible(() => mount(<calcite-navigation-user label="user" />));
  });
});
