import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  reflects,
  hidden,
  renders,
  slots,
  delegatesToFloatingUiOwningComponent,
  focusable,
  handlesActionMenuPlacements,
  t9n,
  disabled,
} from "../../tests/commonTests/browser";
import { defaultEndMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";

describe("calcite-block", () => {
  mockConsole();

  describe("defaults", () => {
    defaults(
      () => mount("calcite-block"),
      [
        {
          propertyName: "collapsible",
          defaultValue: false,
        },
        {
          propertyName: "dragDisabled",
          defaultValue: false,
        },
        {
          propertyName: "headingLevel",
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
          propertyName: "overlayPositioning",
          defaultValue: "absolute",
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
          propertyName: "sortHandleOpen",
          defaultValue: false,
        },
        {
          propertyName: "sortDisabled",
          defaultValue: false,
        },
        {
          propertyName: "scale",
          defaultValue: "m",
        },
      ],
    );
  });

  describe("setFocus", () => {
    describe("focuses block heading toggle", () => {
      focusable(
        () =>
          mount(
            <calcite-block collapsible description="summary" expanded heading="Heading">
              <calcite-block-section expanded text="input block-section">
                <calcite-input
                  icon="form-field"
                  placeholder="This is an input field... enter something here"
                />
              </calcite-block-section>
            </calcite-block>,
          ),
        {
          shadowFocusTargetSelector: `.${CSS.toggle}`,
        },
      );
    });

    const blockSectionClass = "my-block-section";
    describe("focuses block section", () => {
      focusable(
        () =>
          mount(
            <calcite-block description="summary" expanded heading="Heading">
              <calcite-block-section class={blockSectionClass} expanded text="input block-section">
                <calcite-input
                  icon="form-field"
                  placeholder="This is an input field... enter something here"
                />
              </calcite-block-section>
            </calcite-block>,
          ),
        {
          focusTargetSelector: `.${blockSectionClass}`,
        },
      );
    });
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-block"),
      [
        {
          propertyName: "collapsible",
          value: true,
        },
        {
          propertyName: "headingLevel",
          value: 2,
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
          propertyName: "overlayPositioning",
          value: "fixed",
        },
        {
          propertyName: "menuPlacement",
          value: "bottom",
        },
        {
          propertyName: "dragDisabled",
          value: true,
        },
        {
          propertyName: "sortHandleOpen",
          value: true,
        },
        {
          propertyName: "scale",
          value: "m",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-block"));
  });

  describe("renders", () => {
    renders(() => mount("calcite-block"), { display: "flex" });
  });

  describe("slots", () => {
    slots(() => mount("calcite-block"), SLOTS);
  });

  describe("floating-ui", () => {
    describe("delegates to floating-ui-owner component", () => {
      delegatesToFloatingUiOwningComponent(
        () =>
          mount(
            <calcite-block>
              <calcite-action icon="plus" label="Add" slot="header-menu-actions" />
            </calcite-block>,
          ),
        "calcite-action-menu",
      );
    });

    describe("handles action-menu placement and flipPlacements", () => {
      handlesActionMenuPlacements(() =>
        mount(
          <calcite-block description="description" heading="heading">
            <calcite-action icon="banana" slot={SLOTS.headerMenuActions} text="test" />
            <div class="content">content</div>
          </calcite-block>,
        ),
      );
    });
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-block"));
  });

  describe("disabled", () => {
    disabled(() =>
      mount(<calcite-block collapsible description="description" heading="heading" />),
    );
  });
});
