import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { accessible, defaults, reflects, hidden, renders } from "../../tests/commonTests/browser";

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-accordion>
        <calcite-accordion-item heading="Accordion Title 1">
          Accordion Item Content
        </calcite-accordion-item>
        <calcite-accordion-item description="A description" expanded heading="Accordion Title 2">
          Accordion Item Content
        </calcite-accordion-item>
        <calcite-accordion-item heading="Accordion Title 3">
          Accordion Item Content
        </calcite-accordion-item>
      </calcite-accordion>,
    ),
  );
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-accordion"),
    [
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "iconPosition",
        defaultValue: "end",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "selectionMode",
        defaultValue: "multiple",
      },
      {
        propertyName: "iconType",
        defaultValue: "chevron",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-accordion"),
    [
      {
        propertyName: "iconPosition",
        value: "start",
      },
      {
        propertyName: "iconPosition",
        value: "end",
      },
      {
        propertyName: "selectionMode",
        value: "single-persist",
      },
      {
        propertyName: "selectionMode",
        value: "single",
      },
      {
        propertyName: "selectionMode",
        value: "multiple",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-accordion"));
});

describe("renders", () => {
  renders(() => mount("calcite-accordion"), { display: "block" });
});
