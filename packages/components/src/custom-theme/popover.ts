import { html } from "../../support/formatting";

export const popoverTokens = {
  calcitePopoverBackgroundColor: "",
  calcitePopoverBorderColor: "",
  calcitePopoverCornerRadius: "",
  calcitePopoverMaxSizeX: "",
  calcitePopoverTextColor: "",
  calcitePopoverZIndex: "",
};

export const popover = html`
  <calcite-label layout="inline">
    <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button>
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      <div style="width: 300px; padding:12px 16px;">
        <b>I am a title!</b> <br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>
    </calcite-popover>
  </calcite-label>
`;
