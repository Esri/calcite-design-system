import { describe } from "vitest";
import { themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { mockConsole } from "../../tests/utils/logging";

mockConsole();

describe("theme", () => {
  describe("border", () => {
    themed(
      html`<calcite-action-menu open
        ><calcite-action-group></calcite-action-group><calcite-action-group></calcite-action-group
      ></calcite-action-menu>`,
      {
        "--calcite-action-group-border-color": {
          selector: "calcite-action-group",
          targetProp: "borderBlockEndColor",
        },
      },
    );
  });
});
