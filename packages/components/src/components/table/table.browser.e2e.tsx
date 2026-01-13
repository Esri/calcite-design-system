import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, hidden, reflects, renders, accessible } from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";

describe("calcite-table", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-table"),
      [
        {
          propertyName: "bordered",
          defaultValue: false,
        },
        {
          propertyName: "groupSeparator",
          defaultValue: false,
        },
        {
          propertyName: "layout",
          defaultValue: "auto",
        },
        {
          propertyName: "numbered",
          defaultValue: false,
        },
        {
          propertyName: "pageSize",
          defaultValue: 0,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "selectionMode",
          defaultValue: "none",
        },
        {
          propertyName: "striped",
          defaultValue: false,
        },
      ],
    );
  });

  describe("hidden", () => {
    hidden(() => mount("calcite-table"));
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-table"),
      [
        {
          propertyName: "layout",
          value: "auto",
        },
        {
          propertyName: "scale",
          value: "m",
        },
        {
          propertyName: "selectionMode",
          value: "none",
        },
      ],
    );
  });

  describe("renders", () => {
    renders(
      () =>
        mount(
          <calcite-table caption="Simple table">
            <calcite-table-row slot={SLOTS.tableHeader}>
              <calcite-table-header description="Description" heading="Heading" />
              <calcite-table-header description="Description" heading="Heading" />
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      { display: "flex" },
    );
  });

  describe("accessible", () => {
    describe("simple", () => {
      accessible(() =>
        mount(
          <calcite-table caption="Simple table">
            <calcite-table-row slot={SLOTS.tableHeader}>
              <calcite-table-header description="Description" heading="Heading" />
              <calcite-table-header description="Description" heading="Heading" />
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      );
    });

    describe("with selection mode multiple", () => {
      accessible(() =>
        mount(
          <calcite-table caption="Simple table" selection-mode="multiple">
            <calcite-table-row slot={SLOTS.tableHeader}>
              <calcite-table-header description="Description" heading="Heading" />
              <calcite-table-header description="Description" heading="Heading" />
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      );
    });

    describe("with selection mode multiple selected at load", () => {
      accessible(() =>
        mount(
          <calcite-table caption="Simple table" selection-mode="multiple">
            <calcite-table-row slot={SLOTS.tableHeader}>
              <calcite-table-header description="Description" heading="Heading" />
              <calcite-table-header description="Description" heading="Heading" />
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row selected>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row selected>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      );
    });

    describe("with selection mode single", () => {
      accessible(() =>
        mount(
          <calcite-table caption="Simple table" selection-mode="single">
            <calcite-table-row slot={SLOTS.tableHeader}>
              <calcite-table-header description="Description" heading="Heading" />
              <calcite-table-header description="Description" heading="Heading" />
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      );
    });

    describe("with numbered", () => {
      accessible(() =>
        mount(
          <calcite-table caption="Simple table" numbered>
            <calcite-table-row slot={SLOTS.tableHeader}>
              <calcite-table-header description="Description" heading="Heading" />
              <calcite-table-header description="Description" heading="Heading" />
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      );
    });

    describe("with numbered and selection", () => {
      accessible(() =>
        mount(
          <calcite-table caption="Simple table" numbered selection-mode="multiple">
            <calcite-table-row slot={SLOTS.tableHeader}>
              <calcite-table-header description="Description" heading="Heading" />
              <calcite-table-header description="Description" heading="Heading" />
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      );
    });

    describe("with pagination", () => {
      accessible(() =>
        mount(
          <calcite-table caption="Simple table" page-size="4">
            <calcite-table-row slot={SLOTS.tableHeader}>
              <calcite-table-header description="Description" heading="Heading" />
              <calcite-table-header description="Description" heading="Heading" />
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      );
    });

    describe("with pagination and interaction mode static", () => {
      accessible(() =>
        mount(
          <calcite-table caption="Simple table" interaction-mode="static" page-size="4">
            <calcite-table-row slot={SLOTS.tableHeader}>
              <calcite-table-header description="Description" heading="Heading" />
              <calcite-table-header description="Description" heading="Heading" />
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      );
    });

    describe("with pagination and selection mode", () => {
      accessible(() =>
        mount(
          <calcite-table caption="Simple table" page-size="4" selection-mode="multiple">
            <calcite-table-row slot={SLOTS.tableHeader}>
              <calcite-table-header description="Description" heading="Heading" />
              <calcite-table-header description="Description" heading="Heading" />
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
            <calcite-table-row>
              <calcite-table-cell>cell</calcite-table-cell>
              <calcite-table-cell>cell</calcite-table-cell>
            </calcite-table-row>
          </calcite-table>,
        ),
      );
    });
  });
});
