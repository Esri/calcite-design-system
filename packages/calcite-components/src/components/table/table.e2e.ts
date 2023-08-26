// import { newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, renders, hidden, defaults, reflects } from "../../tests/commonTests";

describe("calcite-table", () => {
  describe("renders", () => {
    renders(
      html`<calcite-table caption="Simple table">
        <calcite-table-row slot="table-head">
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
        <calcite-table-row>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
          <calcite-table-cell>cell</calcite-table-cell>
        </calcite-table-row>
      </calcite-table>`,
      { display: "table" }
    );
  });

  describe("defaults", () => {
    defaults("calcite-table", [
      {
        propertyName: "appearance",
        defaultValue: "simple",
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
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-table", [
      {
        propertyName: "appearance",
        value: "simple",
      },
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
    ]);
  });

  describe("hidden", () => {
    hidden("calcite-table");
  });

  describe("accessible", () => {
    describe("is accessible simple", () => {
      accessible(
        html`<calcite-table caption="Simple table">
          <calcite-table-row slot="table-head">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>`
      );
    });

    describe("is accessible with selection mode multiple", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="multiple">
          <calcite-table-row slot="table-head">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>`
      );
    });

    describe("is accessible with selection mode multiple selected at load", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="multiple">
          <calcite-table-row slot="table-head">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row selected>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row selected>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>`
      );
    });

    describe("is accessible with selection mode single", () => {
      accessible(
        html`<calcite-table caption="Simple table" selection-mode="single">
          <calcite-table-row slot="table-head">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>`
      );
    });

    describe("is accessible with numbered", () => {
      accessible(
        html`<calcite-table caption="Simple table" numbered>
          <calcite-table-row slot="table-head">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>`
      );
    });

    describe("is accessible with numbered and selection", () => {
      accessible(
        html`<calcite-table caption="Simple table" numbered selection-mode="multiple">
          <calcite-table-row slot="table-head">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>`
      );
    });
    describe("is accessible with pagination", () => {
      accessible(
        html`<calcite-table page-size="4" caption="Simple table">
          <calcite-table-row slot="table-head">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>`
      );
    });
    describe("is accessible with pagination and selection mode", () => {
      accessible(
        html`<calcite-table page-size="4" selection-mode="multiple" caption="Simple table">
          <calcite-table-row slot="table-head">
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
            <calcite-table-header heading="Heading" description="Description"></calcite-table-header>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
          <calcite-table-row>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
            <calcite-table-cell>cell</calcite-table-cell>
          </calcite-table-row>
        </calcite-table>`
      );
    });
  });
});

describe("keyboard navigation", () => {
  it("navigates correctly when no pagination present", async () => {
    //
  });
  it("navigates correctly when pagination present and first page displayed", async () => {
    //
  });
  it("navigates correctly when pagination present, and navigation to another page occurs", async () => {
    //
  });
  it("navigates correctly skipping disabled rows", async () => {
    //
  });
  it("navigates correctly skipping disabled rows when disabled rows in last position", async () => {
    //
  });
});

describe("selection modes", () => {
  it("allows one item to be selected in single selection mode with correct events", async () => {
    // make sure rendered chip shows right number
    // make sure event emit correct elements
  });
  it("allows none, one, or multiple items to be selected in multiple selection mode with correct events", async () => {
    // make sure rendered chip shows right number
    // make sure event emit correct elements
  });

  it("correctly emits 0 items after user clears selection via clear button", async () => {
    // make sure rendered chip shows right number
    // make sure event emit correct elements
  });

  it("correctly emits after user clears selection via select all button", async () => {
    // make sure rendered chip shows right number
    // make sure event emit correct elements
  });

  it("correctly maintains selected items in count and event that have been navigated away from via pagination", async () => {
    // make sure rendered chip shows right number
    // make sure event emit correct elements
    // change page
    // make sure rendered chip shows right number
    // make sure "out of view" chip visible and shows right number
    // make sure event emit correct elements
    // change page to third page
    // make sure rendered chip shows right number
    // make sure "out of view" chip visible and shows right number
    // make sure event emit correct elements
    // change page to third page
    // make sure rendered chip shows right number
    // make sure "out of view" chip visible and shows right number
    // make sure event emit correct elements
  });
});

// page size updates re-create keyboard navigation arrays
// ensure keyboard navigation works after page size updates and more rows visible
// correct assistive hidden text rendered for : table header number cell, table header single select, table header multiple select
