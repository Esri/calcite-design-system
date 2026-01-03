import { h, Fragment, JsxNode } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  accessible,
  defaults,
  reflects,
  hidden,
  renders,
  t9n,
  topLayer,
} from "../../tests/commonTests/browser";
import { waitForEvent } from "../../tests/commonTests/browser/utils";

describe("calcite-alert", () => {
  describe("defaults", () => {
    defaults(
      () => mount("calcite-alert"),
      [
        {
          propertyName: "autoCloseDuration",
          defaultValue: "medium",
        },
        {
          propertyName: "embedded",
          defaultValue: false,
        },
        {
          propertyName: "queue",
          defaultValue: "last",
        },
      ],
    );
  });

  describe("reflects", () => {
    reflects(
      () => mount("calcite-alert"),
      [
        {
          propertyName: "queue",
          value: "last",
        },
      ],
    );
  });

  describe("honors hidden attribute", () => {
    hidden(() => mount(<calcite-alert open />));
  });

  describe("renders", () => {
    renders(() => mount("calcite-alert"), { visible: false, display: "block" });
  });

  describe("top layer placement", () => {
    topLayer(() => mount("calcite-alert"));
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-alert"));
  });

  describe("accessible", () => {
    function renderAlertContent(): JsxNode {
      return (
        <>
          <div slot="title">Title Text</div>
          <div slot="message">Message Text</div>
          <a href="" slot="link">
            Action
          </a>
        </>
      );
    }

    describe("open", () => {
      accessible(async () => {
        const openEvent = waitForEvent(document.body, "calciteAlertOpen");
        const renderResult = await mount(
          <calcite-alert label="test" open>
            {renderAlertContent()}
          </calcite-alert>,
        );
        await openEvent;
        return renderResult;
      });
    });

    describe("accessible with auto-close", () => {
      accessible(async () => {
        const openEvent = waitForEvent(document.body, "calciteAlertOpen");
        const renderResult = await mount(
          <calcite-alert autoClose={true} autoCloseDuration="slow" label="test" open>
            {renderAlertContent()}
          </calcite-alert>,
        );
        await openEvent;
        return renderResult;
      });
    });
  });
});
