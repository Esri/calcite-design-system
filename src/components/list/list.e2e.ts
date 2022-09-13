import { accessible, hidden, renders, focusable, disabled } from "../../tests/commonTests";
import { placeholderImage } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

const placeholder = placeholderImage({
  width: 140,
  height: 100
});

describe("calcite-list", () => {
  it("renders", async () => renders("calcite-list", { display: "block" }));

  it("is focusable", () =>
    focusable(
      html`<calcite-list>
        <calcite-list-item label="test" description="hello world"></calcite-list-item>
      </calcite-list>`,
      {
        focusTargetSelector: "calcite-list-item"
      }
    ));

  it("honors hidden attribute", async () => hidden("calcite-list"));

  it("should be accessible", async () => {
    await accessible(`<calcite-list>
    <calcite-list-item label="candy" description="kingdom">
      <calcite-action icon="banana" label="finn" slot="actions-start" />
      <calcite-icon icon="banana" slot="content-start" />
      <img slot="content-start" src="${placeholder}" alt="Test image" />
      <calcite-icon icon="banana" slot="content-end" />
      <calcite-action icon="banana" label="jake" slot="actions-end" />
    </calcite-list-item>
    <calcite-list-item label="test" non-interactive description="hello world"></calcite-list-item>
    <calcite-list-item label="test" description="hello world"></calcite-list-item>
  </calcite-list>`);
  });

  it("can be disabled", () =>
    disabled(
      html`<calcite-list>
        <calcite-list-item label="test" description="hello world"></calcite-list-item>
      </calcite-list>`,
      { focusTarget: "child" }
    ));
});
