import { mount } from "@arcgis/lumina-compiler/testing";
import { describe } from "vitest";
import {
  cancelable,
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  t9n,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

describe("calcite-action-bar", () => {
  mockConsole();

  describe("cancelable", () => {
    cancelable("calcite-action-bar");
  });

  describe("defaults", () => {
    defaults(
      () => mount("calcite-action-bar"),
      [
        {
          propertyName: "expandDisabled",
          defaultValue: false,
        },
        {
          propertyName: "floating",
          defaultValue: false,
        },
        {
          propertyName: "expanded",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "layout",
          defaultValue: "vertical",
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "selectionAppearance",
          defaultValue: "neutral",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-action-bar"),
      [
        {
          propertyName: "expandDisabled",
          value: true,
        },
        {
          propertyName: "expanded",
          value: true,
        },
        {
          propertyName: "floating",
          value: true,
        },
        {
          propertyName: "overlayPositioning",
          value: "fixed",
        },
        {
          propertyName: "selectionAppearance",
          value: "neutral",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-action-bar"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-action-bar"), { display: "inline-flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-action-bar"), SLOTS);
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-action-bar"));
  });
});
