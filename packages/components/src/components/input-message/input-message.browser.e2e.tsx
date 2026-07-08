import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { accessible, hidden, renders, themed } from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible(() => mount(<calcite-input-message>Text</calcite-input-message>));
});

describe("accessible with icon", () => {
  accessible(() => mount(<calcite-input-message icon>Text</calcite-input-message>));
});

describe("honors hidden attribute", () => {
  hidden(() => mount(<calcite-input-message>Text</calcite-input-message>));
});

describe("renders", () => {
  renders(() => mount(<calcite-input-message>content</calcite-input-message>), {
    display: "flex",
  });
});

describe("theme", () => {
  describe("status", () => {
    describe("invalid", () => {
      themed(
        () =>
          mount(
            <calcite-input-message icon status="invalid">
              Message
            </calcite-input-message>,
          ),
        {
          "--calcite-input-message-icon-color": {
            shadowSelector: `.${CSS.inputMessageIcon}`,
            targetProp: "color",
          },
        },
      );
    });
    describe("valid", () => {
      themed(
        () =>
          mount(
            <calcite-input-message icon status="valid">
              Message
            </calcite-input-message>,
          ),
        {
          "--calcite-input-message-icon-color": {
            shadowSelector: `.${CSS.inputMessageIcon}`,
            targetProp: "color",
          },
        },
      );
    });
    describe("idle", () => {
      themed(
        () =>
          mount(
            <calcite-input-message icon status="idle">
              Message
            </calcite-input-message>,
          ),
        {
          "--calcite-input-message-icon-color": {
            shadowSelector: `.${CSS.inputMessageIcon}`,
            targetProp: "color",
          },
        },
      );
    });
  });

  describe("deprecated", () => {
    themed(
      () =>
        mount(
          <calcite-input-message icon status="invalid">
            Message
          </calcite-input-message>,
        ),
      {
        "--calcite-input-message-spacing-value": {
          targetProp: "marginBlockStart",
        },
        "--calcite-ui-icon-color": {
          shadowSelector: `.${CSS.inputMessageIcon}`,
          targetProp: "color",
        },
      },
    );
  });
});
