import { Fragment, h, JsxNode } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  focusable,
  hidden,
  renders,
  slots,
  t9n,
  openClose,
  accessible,
  scalePropagates,
  themed,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";
import type { Notice } from "./notice";

function renderContent(): JsxNode {
  return (
    <>
      <div slot="title">Title Text</div>
      <div slot="message">Message Text</div>
      <calcite-link href="" slot="link">
        Action
      </calcite-link>
    </>
  );
}

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount(<calcite-notice open>{renderContent()}</calcite-notice>));
  });

  describe("with icon", () => {
    accessible(() =>
      mount(
        <calcite-notice icon open>
          {renderContent()}
        </calcite-notice>,
      ),
    );
  });

  describe("with icon with close button", () => {
    accessible(() =>
      mount(
        <calcite-notice closable open>
          {renderContent()}
        </calcite-notice>,
      ),
    );
  });

  describe("with icon and close button", () => {
    accessible(() =>
      mount(
        <calcite-notice closable icon open>
          {renderContent()}
        </calcite-notice>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(() => mount("calcite-notice"), [{ propertyName: "scale", defaultValue: "m" }]);
});

describe("is focusable", () => {
  describe("with link and closable => focuses on link", () => {
    focusable(
      () =>
        mount(
          <calcite-notice closable id="notice-1" open>
            {renderContent()}
          </calcite-notice>,
        ),
      {
        focusTargetSelector: `calcite-link`,
      },
    );
  });

  describe("when closable => focuses on close button", () => {
    focusable(
      () =>
        mount(
          <calcite-notice closable id="notice-1" open>
            <div slot="title">Title Text</div>
            <div slot="message">Message Text</div>
          </calcite-notice>,
        ),
      {
        shadowFocusTargetSelector: `.${CSS.close}`,
      },
    );
  });

  describe("openClose", () => {
    openClose((mountOptions) => mount("calcite-notice", mountOptions), {
      collapsedOnClose: "vertical",
    });
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-notice"));
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-notice closable />, mountOptions), {
    targetSelector: "calcite-action",
  });
});

describe("renders", () => {
  renders(() => mount(<calcite-notice open>{renderContent()}</calcite-notice>), {
    display: "flex",
  });
});

describe("slots", () => {
  mockConsole();

  slots(() => mount("calcite-notice"), SLOTS);
});

describe("translation support", () => {
  t9n(() => mount("calcite-notice"));
});

describe("theme", () => {
  const noticeHTML = (kind: Notice["kind"], appearance: Notice["appearance"] = "outline-fill") => (
    <calcite-notice appearance={appearance} closable kind={kind} open>
      <div slot="title">Title</div>
      <div slot="message">Message</div>
      <calcite-link slot="link" title="my action">
        Retry
      </calcite-link>
    </calcite-notice>
  );

  const kinds: Notice["kind"][] = ["brand", "danger", "info", "neutral", "success", "warning"];

  describe("default", () => {
    themed(() => mount(noticeHTML("brand")), {
      "--calcite-notice-close-icon-color": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-text-color",
      },
      "--calcite-notice-close-icon-color-hover": [
        {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-text-color-press",
          state: { focus: { attribute: "class", value: CSS.close } },
        },
        {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-text-color-press",
          state: { hover: { attribute: "class", value: CSS.close } },
        },
      ],
      "--calcite-notice-close-background-color": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-background-color",
      },
      "--calcite-notice-close-background-color-hover": [
        {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-background-color-hover",
          state: "focus",
        },
        {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-background-color-hover",
          state: "hover",
        },
      ],
      "--calcite-notice-close-background-color-press": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-background-color-press",
        state: { press: { attribute: "class", value: CSS.close } },
      },
      "--calcite-notice-border-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "borderColor",
      },
      "--calcite-notice-corner-radius": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "borderRadius",
      },
      "--calcite-notice-shadow": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "boxShadow",
      },
    });
  });

  kinds.forEach((kind) => {
    describe(`kind = "${kind}" `, () => {
      themed(() => mount(noticeHTML(kind)), {
        "--calcite-notice-background-color": [
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
          },
        ],
      });
    });
  });
  describe("deprecated", () => {
    themed(() => mount(noticeHTML("brand")), {
      "--calcite-notice-width": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "width",
      },
      "--calcite-notice-close-background-color-focus": [
        {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-background-color-hover",
          state: "focus",
        },
        {
          shadowSelector: `.${CSS.close}`,
          targetProp: "--calcite-action-background-color-hover",
          state: "hover",
        },
      ],
    });
  });
});
