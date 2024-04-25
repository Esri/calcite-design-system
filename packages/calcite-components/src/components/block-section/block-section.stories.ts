import { html } from "../../../support/formatting";

export default {
  title: "Components/Block",
};

export const themed_TestOnly = (): string => html`
  <calcite-block
    collapsible
    open
    heading="Planes, trains, and automobiles are some examples of modes of transportation"
    description="Planes, trains, and automobiles are some examples of modes of transportation"
  >
    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      toggle-display="button"
      icon-start="pen"
      icon-end="pen"
      style="
        --calcite-block-section-icon-end-color: red;
        --calcite-block-section-icon-end-color-hover: blue;
        --calcite-block-section-icon-start-color: orange;
        --calcite-block-section-icon-start-color-hover: purple;
      "
    >
      <p>Block section content</p>
    </calcite-block-section>
  </calcite-block>
`;
