import { describe } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  focusable,
  defaults,
  type ComponentTestTokens,
  reflects,
  hidden,
  renders,
  scalePropagates,
  t9n,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { CSS, SLOTS } from "./resources";
import type { Layout } from "./types";

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-menu>
        <calcite-menu-item text="calcite" />
      </calcite-menu>,
    ),
  );
});

describe("defaults", () => {
  defaults(() => mount("calcite-menu-item"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-menu-item"),
    [
      {
        propertyName: "active",
        value: "true",
      },
      {
        propertyName: "target",
        value: "_blank",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-menu-item"));
});

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-menu-item href="#" text="Parent">
          <calcite-menu-item slot={SLOTS.submenuItem} text="Child" />
        </calcite-menu-item>,
        mountOptions,
      ),
    { targetSelector: "calcite-menu, calcite-action" },
  );
});

describe("renders", () => {
  renders(() => mount("calcite-menu-item"), { display: "flex" });
});

describe("is focusable", () => {
  focusable(() => mount("calcite-menu-item"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-menu-item"));
});

describe("theme", () => {
  const menuWithSlottedSubmenu = (layout: Layout) => (
    <calcite-menu layout={layout}>
      <calcite-menu-item href="#calcite-menu" text="calcite-navigation">
        <calcite-menu-item slot={SLOTS.submenuItem} text="Slots" />
        <calcite-menu-item slot={SLOTS.submenuItem} text="Css vars" />
      </calcite-menu-item>
    </calcite-menu>
  );

  describe("slotted submenu", () => {
    const commonTokens: ComponentTestTokens = {
      "--calcite-menu-background-color": [
        {
          selector: "calcite-menu-item",
          shadowSelector: `calcite-action`,
          targetProp: "--calcite-action-background-color-press",
          state: { press: { attribute: "class", value: CSS.dropdownAction } },
        },
        {
          selector: "calcite-menu-item",
          shadowSelector: `calcite-action`,
          targetProp: "--calcite-action-background-color",
        },
      ],
      "--calcite-menu-text-color": {
        selector: "calcite-menu-item",
        shadowSelector: `calcite-action`,
        targetProp: "--calcite-action-text-color",
      },
      "--calcite-menu-item-sub-menu-corner-radius": {
        selector: "calcite-menu-item",
        shadowSelector: `.${CSS.dropdownMenuItems}`,
        targetProp: "borderRadius",
      },
    };

    describe("horizontal layout", () => {
      themed(() => mount(menuWithSlottedSubmenu("horizontal")), {
        ...commonTokens,
        "--calcite-menu-item-sub-menu-border-color": {
          selector: "calcite-menu-item",
          shadowSelector: `.${CSS.dropdownMenuItems}`,
          targetProp: "borderColor",
        },
      });
    });

    describe("vertical layout", () => {
      themed(() => mount(menuWithSlottedSubmenu("vertical")), {
        ...commonTokens,
        "--calcite-menu-item-sub-menu-border-color": {
          selector: "calcite-menu-item",
          shadowSelector: `.${CSS.dropdownMenuItems}::after`,
          targetProp: "borderBlockStartColor",
        },
      });
    });
  });

  describe("default", () => {
    const menu = (layout: Layout) => (
      <calcite-menu layout={layout}>
        <calcite-menu-item text="Ideas"> </calcite-menu-item>
      </calcite-menu>
    );
    const tokens: ComponentTestTokens = {
      "--calcite-menu-text-color": [
        {
          selector: "calcite-menu-item",
          shadowSelector: `.${CSS.content}`,
          targetProp: "color",
        },
        {
          selector: "calcite-menu-item",
          shadowSelector: ` .${CSS.content} `,
          targetProp: "color",
          state: { press: { attribute: "role", value: `menuitem` } },
        },
      ],
      "--calcite-menu-background-color": [
        {
          selector: "calcite-menu-item",
          shadowSelector: `.${CSS.itemContent}`,
          targetProp: "backgroundColor",
        },
        {
          selector: "calcite-menu-item",
          shadowSelector: `.${CSS.content}`,
          targetProp: "backgroundColor",
        },
        {
          selector: "calcite-menu-item",
          shadowSelector: `.${CSS.content}`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "role", value: `menuitem` } },
        },
      ],
    };

    describe("vertical layout", () => {
      themed(() => mount(menu("vertical")), tokens);
    });
  });

  describe("active", () => {
    const activeMenuItem = (layout: Layout) => (
      <calcite-menu layout={layout}>
        <calcite-menu-item active text="Ideas" />
      </calcite-menu>
    );
    const tokens = (layout: Layout): ComponentTestTokens => {
      const targetBorderProp =
        layout === "horizontal" ? "borderBlockEndColor" : "borderInlineEndColor";
      return {
        "--calcite-menu-item-accent-color": [
          {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.content}`,
            targetProp: targetBorderProp,
          },
          {
            selector: "calcite-menu-item",
            shadowSelector: `.${CSS.content}`,
            targetProp: targetBorderProp,
            state: "hover",
          },
        ],
      };
    };
    describe("horizontal layout", () => {
      themed(() => mount(activeMenuItem("horizontal")), tokens("horizontal"));
    });

    describe("vertical layout", () => {
      themed(() => mount(activeMenuItem("vertical")), tokens("vertical"));
    });
  });

  describe("icons", () => {
    const iconMenuItem = (
      <calcite-menu>
        <calcite-menu-item breadcrumb icon-end="layers" icon-start="layers" text="Ideas">
          <calcite-menu-item
            href="#calcite-navigation-css-vars"
            icon-start="multiple-variables"
            slot={SLOTS.submenuItem}
            text="Css vars"
          />
        </calcite-menu-item>
      </calcite-menu>
    );

    const tokens: ComponentTestTokens = {
      "--calcite-menu-text-color": [
        {
          selector: "calcite-menu-item",
          shadowSelector: `.${CSS.iconStart}`,
          targetProp: "color",
        },
        {
          selector: "calcite-menu-item",
          shadowSelector: `.${CSS.iconEnd}`,
          targetProp: "color",
        },
        {
          selector: "calcite-menu-item",
          shadowSelector: `.${CSS.iconBreadcrumb}`,
          targetProp: "color",
        },
        {
          selector: "calcite-menu-item",
          shadowSelector: `.${CSS.iconDropdown}`,
          targetProp: "color",
        },
      ],
    };
    themed(() => mount(iconMenuItem), tokens);
  });
});

describe("deprecated", () => {
  const iconMenuItem = (
    <calcite-menu>
      <calcite-menu-item breadcrumb icon-end="layers" icon-start="layers" text="Ideas">
        <calcite-menu-item
          href="#calcite-navigation-css-vars"
          icon-start="multiple-variables"
          slot={SLOTS.submenuItem}
          text="Css vars"
        />
      </calcite-menu-item>
    </calcite-menu>
  );

  const tokens: ComponentTestTokens = {
    "--calcite-ui-icon-color": [
      {
        selector: "calcite-menu-item",
        shadowSelector: `.${CSS.iconStart}`,
        targetProp: "color",
      },
      {
        selector: "calcite-menu-item",
        shadowSelector: `.${CSS.iconEnd}`,
        targetProp: "color",
      },
      {
        selector: "calcite-menu-item",
        shadowSelector: `.${CSS.iconBreadcrumb}`,
        targetProp: "color",
      },
      {
        selector: "calcite-menu-item",
        shadowSelector: `.${CSS.iconDropdown}`,
        targetProp: "color",
      },
    ],
  };
  themed(() => mount(iconMenuItem), tokens);
});
