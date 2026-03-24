import { describe } from "vitest";
import { accessible, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { mockConsole } from "../../tests/utils/logging";

const actionGroupHTML = `<calcite-action-group scale="l">
      <calcite-action id="plus" slot="menu-actions" text="Add" icon="plus"></calcite-action>
      <calcite-action id="banana" slot="menu-actions" text="Banana" icon="banana"></calcite-action>
      </calcite-action-group>`;

mockConsole();

describe("accessible", () => {
  accessible(actionGroupHTML);
});

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
