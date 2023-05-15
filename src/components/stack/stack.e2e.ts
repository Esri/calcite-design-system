import { html } from "../../../support/formatting";
import { hidden, renders, slots, defaults, accessible } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-stack", () => {
  it("has defaults", async () =>
    defaults("calcite-stack", [
      {
        propertyName: "disabled",
        defaultValue: false
      }
    ]));

  describe("renders", () => {
    renders("calcite-stack", { display: "flex" });
  });

  describe("accessible when disabled", () => {
    accessible(html`<calcite-stack disabled>
      <calcite-action appearance="transparent" text="banana" icon="banana" slot="actions-start"></calcite-action>
      Hello World
      <calcite-avatar slot="content-end" thumbnail="http://placekitten.com/105/105" scale="s"> </calcite-avatar>
      <calcite-chip slot="content-start" value="chip" scale="s" appearance="outline">My great chip</calcite-chip>
      <calcite-action appearance="transparent" text="Close" icon="x" slot="actions-end"></calcite-action>
    </calcite-stack>`);
  });

  it("honors hidden attribute", async () => hidden("calcite-stack"));

  it("has slots", () => slots("calcite-stack", SLOTS));
});
