import { Fragment, h, JsxNode } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { hidden, renders } from "../../tests/commonTests/browser";

describe("calcite-notice", () => {
  describe("honors hidden attribute", () => {
    hidden(() => mount("calcite-notice"));
  });

  function createNoticeContent(): JsxNode {
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

  describe("renders", () => {
    renders(() => mount(<calcite-notice open>{createNoticeContent()}</calcite-notice>), {
      display: "flex",
    });
  });
});
