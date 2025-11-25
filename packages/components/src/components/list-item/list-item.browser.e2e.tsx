import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-list-item", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-list-item"),
      [
        {
          propertyName: "description",
          defaultValue: undefined,
        },
        {
          propertyName: "disabled",
          defaultValue: false,
        },
        {
          propertyName: "label",
          defaultValue: undefined,
        },
        {
          propertyName: "selected",
          defaultValue: false,
        },
        {
          propertyName: "value",
          defaultValue: undefined,
        },
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "expanded",
          defaultValue: false,
        },
        {
          propertyName: "closed",
          defaultValue: false,
        },
        {
          propertyName: "closable",
          defaultValue: false,
        },
        {
          propertyName: "dragHandle",
          defaultValue: false,
        },
        {
          propertyName: "filterHidden",
          defaultValue: false,
        },
        {
          propertyName: "unavailable",
          defaultValue: false,
        },
        {
          propertyName: "displayMode",
          defaultValue: "flat",
        },
        {
          propertyName: "iconStart",
          defaultValue: undefined,
        },
        {
          propertyName: "iconEnd",
          defaultValue: undefined,
        },
        {
          propertyName: "iconFlipRtl",
          defaultValue: undefined,
        },
        {
          propertyName: "sortHandleOpen",
          defaultValue: false,
        },
        {
          propertyName: "sortDisabled",
          defaultValue: false,
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-list-item"),
      [
        {
          propertyName: "unavailable",
          value: true,
        },
        {
          propertyName: "sortHandleOpen",
          value: true,
        },
        {
          propertyName: "open",
          value: true,
        },
        {
          propertyName: "expanded",
          value: true,
        },
        {
          propertyName: "closed",
          value: true,
        },
        {
          propertyName: "closable",
          value: true,
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-list-item"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-list-item"), { display: "flex" });
  });
});
