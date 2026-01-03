import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  focusable,
  reflects,
  hidden,
  renders,
  t9n,
  accessible,
} from "../../tests/commonTests/browser";

describe("calcite-menu-item", () => {
  describe("reflects", () => {
    reflects(
      () => mount("calcite-menu-item"),
      [
        {
          propertyName: "active",
          value: "true",
        },
        {
          propertyName: "target",
          value: "_blank",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-menu-item"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-menu-item"), { display: "flex" });
  });

  describe("is focusable", () => {
    focusable(() => mount("calcite-menu-item"));
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-menu-item"));
  });

  describe("accessible", () => {
    accessible(() =>
      mount(
        <calcite-menu>
          <calcite-menu-item text="calcite" />
        </calcite-menu>,
      ),
    );
  });
});
