import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  accessible,
  defaults,
  focusable,
  hidden,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible(() => mount(<calcite-pagination page-size="10" start-item="50" total-items="100" />));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-pagination"),
    [
      {
        propertyName: "totalItems",
        defaultValue: 0,
      },
      {
        propertyName: "startItem",
        defaultValue: 1,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("is focusable", () => {
  describe("focuses previous button when not on the first page", () => {
    focusable(() => mount(<calcite-pagination page-size="1" start-item="2" total-items="10" />), {
      shadowFocusTargetSelector: `[data-test-chevron="previous"]`,
    });
  });

  describe("focuses page number 1 when on the first page", () => {
    focusable(() => mount(<calcite-pagination page-size="1" start-item="1" total-items="10" />), {
      shadowFocusTargetSelector: `.${CSS.page}`,
    });
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-pagination"));
});

describe("renders", () => {
  renders(() => mount("calcite-pagination"), { display: "flex" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-pagination"));
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount(<calcite-pagination page-size="100" start-item="1" total-items="1200" />), {
      "--calcite-pagination-color": [
        {
          shadowSelector: `.${CSS.chevron}`,
          targetProp: "color",
        },
        {
          shadowSelector: `.${CSS.page}:not(.${CSS.selected})`,
          targetProp: "color",
        },
        {
          shadowSelector: `.${CSS.ellipsis}`,
          targetProp: "color",
        },
      ],
    });
  });
  describe("hover", () => {
    themed(() => mount(<calcite-pagination page-size="100" start-item="1" total-items="1200" />), {
      "--calcite-pagination-color-hover": [
        {
          shadowSelector: `.${CSS.chevron}:not(.${CSS.disabled})`,
          targetProp: "color",
          state: "hover",
        },
        {
          shadowSelector: `.${CSS.page}`,
          targetProp: "color",
          state: "hover",
        },
      ],
      "--calcite-pagination-color-border-hover": {
        shadowSelector: `.${CSS.page}:not(.${CSS.selected})`,
        targetProp: "borderBlockEndColor",
        state: "hover",
      },
      "--calcite-pagination-icon-color-background-hover": {
        shadowSelector: `.${CSS.chevron}:not(.${CSS.disabled})`,
        targetProp: "backgroundColor",
        state: "hover",
      },
    });
  });
  describe("active", () => {
    themed(() => mount(<calcite-pagination page-size="100" start-item="1" total-items="1200" />), {
      "--calcite-pagination-color-hover": [
        {
          shadowSelector: `.${CSS.chevron}:not(.${CSS.disabled})`,
          targetProp: "color",
          state: { press: { attribute: "class", value: `${CSS.chevron}` } },
        },
        {
          shadowSelector: `.${CSS.page}`,
          targetProp: "color",
          state: { press: { attribute: "class", value: `${CSS.page}` } },
        },
      ],
      "--calcite-pagination-background-color": [
        {
          shadowSelector: `.${CSS.page}:not(.${CSS.selected})`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "class", value: `${CSS.page}` } },
        },
        {
          shadowSelector: `.${CSS.chevron}:not(.${CSS.disabled})`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "class", value: `${CSS.chevron}` } },
        },
      ],
    });
  });
  describe("selected", () => {
    themed(() => mount(<calcite-pagination page-size="100" start-item="1" total-items="1200" />), {
      "--calcite-pagination-color-hover": {
        shadowSelector: `.${CSS.page}`,
        targetProp: "color",
        state: "focus",
      },
      "--calcite-pagination-color-border-active": {
        shadowSelector: `.${CSS.page}`,
        targetProp: "borderBlockEndColor",
        state: "focus",
      },
    });
  });
});
