import { h } from "@arcgis/lumina";
import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";

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
  openClose,
  accessible,
  scalePropagates,
  topLayer,
  themed,
} from "../../tests/commonTests/browser";
import { defaultEndMenuPlacement } from "../../utils/floating-ui";
import { mockConsole } from "../../tests/utils/logging";
import { CSS as DropdownCSS } from "../dropdown/resources";
import { CSS, SLOTS } from "./resources";

mockConsole();

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-block collapsible description="description" expanded heading="heading">
        <div>content</div>
      </calcite-block>,
    ),
  );
});

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

  describe("openClose", () => {
    openClose((mountOptions) => mount("calcite-block", mountOptions));
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

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-block>
          <calcite-block-section />
        </calcite-block>,
        mountOptions,
      ),
    { targetSelector: "calcite-block-section" },
  );
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

describe("top layer placement", () => {
  topLayer(() => mount(<calcite-block drag-handle heading="heading" />), {
    openProp: "sortHandleOpen",
    openEventName: "calciteBlockSortHandleOpen",
    closeEventName: "calciteBlockSortHandleClose",
    topLayerTarget: page.getBySelector(`.${DropdownCSS.wrapper}[popover]`),
  });
});

describe("disabled", () => {
  disabled(() => mount(<calcite-block collapsible description="description" heading="heading" />));
});

describe("theme", () => {
  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-block
            collapsible
            description="description"
            expanded
            heading="heading"
            icon-end="pen"
            icon-start="pen"
          >
            <calcite-icon icon="compass" slot="content-start" />
            <calcite-icon icon="compass" slot="content-end" />
            <div>content</div>
          </calcite-block>,
        ),
      {
        "--calcite-block-border-color": {
          targetProp: "borderColor",
        },
        "--calcite-block-content-space": [
          {
            shadowSelector: `section.${CSS.content}`,
            targetProp: "paddingBlock",
          },
          {
            shadowSelector: `section.${CSS.content}`,
            targetProp: "paddingInline",
          },
        ],
        "--calcite-block-header-background-color": {
          shadowSelector: `.${CSS.toggle}`,
          targetProp: "backgroundColor",
        },
        "--calcite-block-header-background-color-hover": {
          shadowSelector: `.${CSS.toggle}`,
          targetProp: "backgroundColor",
          state: "hover",
        },
        "--calcite-block-header-background-color-press": {
          shadowSelector: `.${CSS.toggle}`,
          targetProp: "backgroundColor",
          state: { press: `calcite-block >>> .${CSS.toggle}` },
        },
        "--calcite-block-heading-text-color": {
          shadowSelector: `.${CSS.heading}`,
          targetProp: "color",
          state: { press: { attribute: "class", value: CSS.heading } },
        },
        "--calcite-block-description-text-color": {
          shadowSelector: `.${CSS.description}`,
          targetProp: "color",
        },
        "--calcite-block-icon-start-color": {
          shadowSelector: `.${CSS.iconStart}`,
          targetProp: "color",
        },
        "--calcite-block-icon-end-color": {
          shadowSelector: `.${CSS.iconEnd}`,
          targetProp: "color",
        },
        "--calcite-block-collapsible-icon-color": {
          shadowSelector: `.${CSS.toggleIcon}`,
          targetProp: "color",
        },
        "--calcite-block-collapsible-icon-color-hover": {
          shadowSelector: `.${CSS.toggleIcon}`,
          targetProp: "color",
          state: "hover",
        },
      },
    );
  });

  describe("collapsed", () => {
    themed(() => mount(<calcite-block heading="heading" />), {
      "--calcite-block-heading-text-color": {
        shadowSelector: `.${CSS.heading}`,
        targetProp: "color",
      },
    });
  });

  describe("deprecated", () => {
    themed(
      () =>
        mount(
          <calcite-block
            collapsible
            description="description"
            expanded
            heading="heading"
            icon-end="pen"
            icon-start="pen"
          >
            <calcite-icon icon="compass" slot="content-start" />
            <calcite-icon icon="compass" slot="content-end" />
            <div>content</div>
          </calcite-block>,
        ),
      {
        "--calcite-block-padding": [
          {
            shadowSelector: `section.${CSS.content}`,
            targetProp: "paddingBlock",
          },
          {
            shadowSelector: `section.${CSS.content}`,
            targetProp: "paddingInline",
          },
        ],
        "--calcite-block-text-color": {
          shadowSelector: `.${CSS.contentStart}`,
          targetProp: "color",
        },
        "--calcite-block-heading-text-color-press": {
          shadowSelector: `.${CSS.heading}`,
          targetProp: "color",
          state: { press: { attribute: "class", value: CSS.heading } },
        },
        "--calcite-block-icon-color": [
          {
            shadowSelector: `.${CSS.iconStart}`,
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.iconEnd}`,
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.toggleIcon}`,
            targetProp: "color",
          },
        ],
        "--calcite-block-icon-color-hover": {
          shadowSelector: `.${CSS.toggleIcon}`,
          targetProp: "color",
          state: "hover",
        },
      },
    );
  });

  describe("toggleDisplay", () => {
    it("should toggle the expanded state when the toggleDisplay is switch", async () => {
      const { el } = await mount(
        <calcite-block collapsible heading="heading" toggle-display="switch">
          <div>content</div>
        </calcite-block>,
      );
      expect(el).toHaveProperty("expanded", false);

      await userEvent.click(el);
      expect(el).toHaveProperty("expanded", true);
      const slottedEl = page.getByText("content");
      await expect.element(slottedEl).toBeVisible();
    });
  });
});
