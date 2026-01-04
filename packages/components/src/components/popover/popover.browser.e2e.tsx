import { h, Fragment, JsxNode } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { TemplateResult } from "lit/html.js";
import {
  defaults,
  focusable,
  hidden,
  renders,
  floatingUIOwner,
  t9n,
  topLayer,
  openClose,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS } from "./resources";

describe("calcite-popover", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-popover"),
      [
        {
          propertyName: "placement",
          defaultValue: "auto",
        },
        {
          propertyName: "referenceElement",
          defaultValue: undefined,
        },
        {
          propertyName: "offsetDistance",
          defaultValue: 6,
        },
        {
          propertyName: "offsetSkidding",
          defaultValue: 0,
        },
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "closable",
          defaultValue: false,
        },
        {
          propertyName: "flipDisabled",
          defaultValue: false,
        },
        {
          propertyName: "pointerDisabled",
          defaultValue: false,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
      ],
    );
  });

  describe("is focusable", () => {
    function renderPopover(content?: JsxNode, closable = false): TemplateResult {
      return (
        <>
          <calcite-popover closable={closable} open reference-element="ref">
            {content}
          </calcite-popover>
          <button id="ref">Button</button>
        </>
      );
    }

    const contentButtonClass = "my-button";

    function renderButton(): JsxNode {
      return <button class={contentButtonClass}>My Button</button>;
    }

    describe("should focus content by default", () => {
      focusable(() => mount(renderPopover(renderButton())), {
        focusTargetSelector: `.${contentButtonClass}`,
      });
    });

    describe("should focus close button", () => {
      focusable(() => mount(renderPopover("Hello World", true)), {
        shadowFocusTargetSelector: `.${CSS.closeButton}`,
      });
    });
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount(<calcite-popover open />));
  });

  describe("renders", () => {
    describe("when closed", () => {
      renders(
        () =>
          mount(
            <>
              <calcite-popover label="test" reference-element="ref">
                content
              </calcite-popover>
              <div id="ref">😄</div>
            </>,
          ),
        { display: "contents", visible: false },
      );
    });

    describe("when open", () => {
      renders(
        () =>
          mount(
            <>
              <calcite-popover label="test" open reference-element="ref">
                content
              </calcite-popover>
              <div id="ref">😄</div>
            </>,
          ),
        {
          display: "contents",
        },
      );
    });
  });

  describe("floating-ui", () => {
    describe("owns a floating-ui", () => {
      floatingUIOwner(
        () =>
          mount(
            <>
              <calcite-popover placement="auto" reference-element="ref">
                content
              </calcite-popover>
              <div id="ref">referenceElement</div>
            </>,
          ),
        "open",
        { shadowSelector: `.${CSS.positionContainer}` },
      );
    });
  });

  describe("top layer placement", () => {
    topLayer(() =>
      mount(
        <>
          <calcite-popover reference-element="ref">content</calcite-popover>
          <div id="ref">referenceElement</div>
        </>,
      ),
    );
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-popover"));
  });

  describe("openClose", () => {
    openClose(() =>
      mount(
        <>
          <calcite-popover placement="auto" reference-element="ref">
            content
          </calcite-popover>
          <div id="ref">referenceElement</div>
        </>,
      ),
    );
  });
});
