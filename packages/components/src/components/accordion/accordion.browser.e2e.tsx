import { describe } from "vitest";
import { h, Fragment, JsxNode } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, accessible } from "../../tests/commonTests/browser";

describe("calcite-accordion", () => {
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

  function renderAccordionContent(): JsxNode {
    return (
      <>
        <calcite-accordion-item heading="Accordion Title 1" id="1">
          <calcite-action icon="brush-tip" label="Paint" scale="s" slot="actions-start" />
          Accordion Item Content
          <calcite-action icon="sound" label="Volume" scale="s" slot="actions-end" />
        </calcite-accordion-item>
        <calcite-accordion-item
          description="A description"
          expanded
          heading="Accordion Title 1"
          id="2"
        >
          Accordion Item Content
        </calcite-accordion-item>
        <calcite-accordion-item heading="Accordion Title 3" id="3">
          Accordion Item Content
        </calcite-accordion-item>
      </>
    );
  }

  describe("accessible", () => {
    accessible(() => mount(<calcite-accordion>{renderAccordionContent()}</calcite-accordion>));
  });
});
