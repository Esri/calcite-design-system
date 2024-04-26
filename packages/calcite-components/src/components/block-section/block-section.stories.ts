import { html } from "../../../support/formatting";

export default {
  title: "Components/Block Section",
};

export const themed_TestOnly = (): string => html`
  <calcite-block heading="Heading" description="summary" collapsible open>
    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      open
      icon-end="pen"
      icon-start="pen"
      toggle-display="switch"
      status="valid"
      style="
        --calcite-block-section-icon-end-color: red;
        --calcite-block-section-icon-end-color-hover: blue;
        --calcite-block-section-icon-start-color: orange;
        --calcite-block-section-icon-start-color-hover: purple;
      "
    >
      <p>Block section content</p>
    </calcite-block-section>

    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      open
      icon-end="pen"
      icon-start="pen"
      toggle-display="button"
      status="valid"
    >
      <p>Block section content</p>
    </calcite-block-section>
  </calcite-block>
`;
