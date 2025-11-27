import { h, Fragment, JsxNode } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  focusable,
} from "../../tests/commonTests/browser";
import { defaultEndMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";

export const scrollingHeightStyle = "height: 200px;";

export function renderScrollingContent(): JsxNode {
  return (
    <>
      <p>
        Ipsum nostra tempus etiam augue ullamcorper scelerisque sapien potenti erat nisi gravida.
        Vehicula sem tristique sed. Nullam, sociis imperdiet ullamcorper? Dapibus fames primis
        ridiculus vulputate, habitant inceptos! Nunc torquent lorem urna vehicula volutpat donec
        nec. Orci massa eu nec donec enim fames, faucibus quam aenean. Laoreet tellus tempor quisque
        ornare lobortis praesent erat senectus natoque consectetur donec imperdiet. Quis sem cum
        gravida dictumst a pretium purus aptent amet id. Orci habitasse, praesent facilisis
        condimentum. Nec elit turpis leo.
      </p>
      <p>
        Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis
        aliquam dictum venenatis fringilla. Taciti venenatis, ultrices sollicitudin consequat.
        Sapien fusce est iaculis potenti ut auctor potenti. Nisi malesuada feugiat vulputate vitae
        porttitor. Nullam nullam nullam accumsan quis magna in. Elementum, nascetur gravida cras
        scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan posuere
        curabitur fermentum diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis.
        Vel lacus magnis nunc.
      </p>
      <p>
        Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh
        morbi massa curae; leo semper diam aenean congue taciti eu porta. Varius faucibus ridiculus
        donec. Montes sit ligula purus porta ante lacus habitasse libero cubilia purus! In quis
        congue arcu maecenas felis cursus pellentesque nascetur porta donec non. Quisque, rutrum
        ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst
        taciti consectetur. Non porttitor tempor orci dictumst magna porta vitae.
      </p>
      <p>
        Ipsum nostra tempus etiam augue ullamcorper scelerisque sapien potenti erat nisi gravida.
        Vehicula sem tristique sed. Nullam, sociis imperdiet ullamcorper? Dapibus fames primis
        ridiculus vulputate, habitant inceptos! Nunc torquent lorem urna vehicula volutpat donec
        nec. Orci massa eu nec donec enim fames, faucibus quam aenean. Laoreet tellus tempor quisque
        ornare lobortis praesent erat senectus natoque consectetur donec imperdiet. Quis sem cum
        gravida dictumst a pretium purus aptent amet id. Orci habitasse, praesent facilisis
        condimentum. Nec elit turpis leo.
      </p>
      <p>
        Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis
        aliquam dictum venenatis fringilla. Taciti venenatis, ultrices sollicitudin consequat.
        Sapien fusce est iaculis potenti ut auctor potenti. Nisi malesuada feugiat vulputate vitae
        porttitor. Nullam nullam nullam accumsan quis magna in. Elementum, nascetur gravida cras
        scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan posuere
        curabitur fermentum diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis.
        Vel lacus magnis nunc.
      </p>
    </>
  );
}

describe("calcite-panel", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-panel"),
      [
        {
          propertyName: "beforeClose",
          defaultValue: undefined,
        },
        {
          propertyName: "headingLevel",
          defaultValue: undefined,
        },
        {
          propertyName: "collapsible",
          defaultValue: false,
        },
        {
          propertyName: "collapseDirection",
          defaultValue: "down",
        },
        {
          propertyName: "collapsed",
          defaultValue: false,
        },
        {
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
        {
          propertyName: "menuPlacement",
          defaultValue: defaultEndMenuPlacement,
        },
        {
          propertyName: "menuFlipPlacements",
          defaultValue: undefined,
        },
        {
          propertyName: "icon",
          defaultValue: undefined,
        },
        {
          propertyName: "iconFlipRtl",
          defaultValue: false,
        },
      ],
    );
  });

  describe("is focusable", () => {
    describe("with scrolling content", () => {
      describe("closable", () => {
        focusable(
          () =>
            mount(
              <calcite-panel closable style={scrollingHeightStyle}>
                {renderScrollingContent()}
              </calcite-panel>,
            ),
          {
            shadowFocusTargetSelector: "calcite-action",
          },
        );
      });

      describe("should focus on container", () => {
        focusable(
          () =>
            mount(
              <calcite-panel style={scrollingHeightStyle}>
                {renderScrollingContent()}
              </calcite-panel>,
            ),
          {
            shadowFocusTargetSelector: `.${CSS.contentWrapper}`,
          },
        );
      });
    });

    describe("without scrolling content", () => {
      describe("closable", () => {
        focusable(() => mount(<calcite-panel closable>non-scrolling content</calcite-panel>), {
          shadowFocusTargetSelector: "calcite-action",
        });
      });

      describe("should not focus on container", () => {
        focusable(() => mount(<calcite-panel>non-scrolling-content</calcite-panel>), {
          focusTargetSelector: "body",
        });
      });
    });
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-panel"),
      [
        {
          propertyName: "headingLevel",
          value: 2,
        },
        {
          propertyName: "collapsible",
          value: true,
        },
        {
          propertyName: "collapsed",
          value: true,
        },
        {
          propertyName: "overlayPositioning",
          value: "fixed",
        },
        {
          propertyName: "menuPlacement",
          value: "bottom",
        },
        {
          propertyName: "icon",
          value: "x",
        },
        {
          propertyName: "iconFlipRtl",
          value: "true",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-panel"));
  });

  describe("renders", () => {
    renders(() => mount(<calcite-panel>content</calcite-panel>), { display: "flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-panel"), SLOTS);
  });
});
