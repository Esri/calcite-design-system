import { html } from "../../support/formatting";

export const tipManagerTokens = {
  calciteTipManagerBackgroundColor: "",
  calciteTipManagerBorderColor: "",
  calciteTipManagerContentHeight: "",
  calciteTipManagerHeadingTextColor: "",
  calciteTipManagerHeight: "",
  calciteTipManagerTextColor: "",
  calciteTipMaxWidth: "",
};

export const tipManager = html`
  <calcite-tip-manager
    <calcite-tip-group group-title="Astronomy">
      <calcite-tip heading="The Red Rocks and Blue Water">
          This tip is how a tip should really look. This paragraph is in an "info" slot.
        </p>
        <a href="http://www.esri.com">This is the "link" slot.</a>
      </calcite-tip>
      <calcite-tip heading="The Long Trees">
        <p>This tip has an image that is a pretty tall. And the text will run out before the end of the image.</p>
        <p>In astronomy, the terms object and body are often used interchangeably.</p>
        <a href="http://www.esri.com">View Esri</a>
      </calcite-tip>
    </calcite-tip-group>
  </calcite-tip-manager>
`;
