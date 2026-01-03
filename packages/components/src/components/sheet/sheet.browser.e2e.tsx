import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  topLayer,
  accessible,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { waitForEvent } from "../../tests/commonTests/browser/utils";

describe("calcite-sheet", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-sheet"),
      [
        {
          propertyName: "open",
          defaultValue: false,
        },
        {
          propertyName: "embedded",
          defaultValue: false,
        },
        {
          propertyName: "displayMode",
          defaultValue: "overlay",
        },
        {
          propertyName: "focusTrapDisabled",
          defaultValue: false,
        },
        {
          propertyName: "outsideCloseDisabled",
          defaultValue: false,
        },
        {
          propertyName: "position",
          defaultValue: "inline-start",
        },
        {
          propertyName: "escapeDisabled",
          defaultValue: false,
        },
        {
          propertyName: "opened",
          defaultValue: false,
        },
        {
          propertyName: "resizable",
          defaultValue: false,
        },
        {
          propertyName: "widthScale",
          defaultValue: "m",
        },
        {
          propertyName: "heightScale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("is focusable", () => {
    const focusableContentTargetClass = "test";

    describe("focuses content by default", () => {
      focusable(
        () =>
          mount(
            <calcite-sheet open>
              <button class={focusableContentTargetClass}>test</button>
            </calcite-sheet>,
          ),
        {
          focusTargetSelector: `.${focusableContentTargetClass}`,
        },
      );
    });
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-sheet"),
      [
        {
          propertyName: "height",
          value: "m",
        },
        {
          propertyName: "heightScale",
          value: "m",
        },
        {
          propertyName: "resizable",
          value: true,
        },
        {
          propertyName: "width",
          value: "m",
        },
        {
          propertyName: "widthScale",
          value: "m",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-sheet"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-sheet"), { display: "flex", visible: false });
  });

  describe("top layer placement", () => {
    topLayer(() => mount("calcite-sheet"));
  });

  describe("accessible", () => {
    accessible(async () => {
      const openEvent = waitForEvent(document.body, "calciteSheetOpen");
      const renderResult = await mount(
        <calcite-sheet label="hello world" open>
          Hello everyone!
        </calcite-sheet>,
      );
      await openEvent;
      return renderResult;
    });

    accessible(async () => {
      const openEvent = waitForEvent(document.body, "calciteSheetOpen");
      const renderResult = await mount(
        <calcite-sheet label="hello world" open>
          <calcite-panel closable heading="Ultrices neque">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <calcite-button appearance="outline" slot="footer" width="half">
              tincidunt lobortis
            </calcite-button>
            <calcite-button appearance="outline" slot="footer" width="half">
              amet porttitor
            </calcite-button>
          </calcite-panel>
        </calcite-sheet>,
      );
      await openEvent;
      return renderResult;
    });
  });
});
