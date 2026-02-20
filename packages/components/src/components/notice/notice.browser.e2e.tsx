import { Fragment, h, JsxNode } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { focusable, hidden, renders, slots, t9n } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";

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
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-notice"));
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
