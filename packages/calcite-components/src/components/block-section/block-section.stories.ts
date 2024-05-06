import { html } from "../../../support/formatting";

export default {
  title: "Components/Block Section",
};

export const icons_TestOnly = (): string => html`
  <calcite-block heading="Heading" description="summary" collapsible open>
    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      open
      icon-end="pen"
      icon-start="pen"
      toggle-display="switch"
      status="valid"
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
