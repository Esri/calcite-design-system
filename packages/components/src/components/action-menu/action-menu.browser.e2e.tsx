import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, slots } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { SLOTS } from "./resources";

describe("calcite-action-menu", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-action-menu"),
      [
        {
          propertyName: "appearance",
          defaultValue: "solid",
        },
        {
          propertyName: "expanded",
          defaultValue: false,
        },
        {
          propertyName: "flipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "placement",
          defaultValue: "auto",
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
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
      () => mount("calcite-action-menu"),
      [
        {
          propertyName: "expanded",
          value: true,
        },
        {
          propertyName: "open",
          value: true,
        },
        {
          propertyName: "placement",
          value: "auto",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-action-menu"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-action-menu"), { display: "flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-action-menu"), SLOTS);
  });
});
