import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Modal",
  parameters: {
    notes: readme,
    chromatic: {
      delay: 500,
    },
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-modal
    ${boolean("open", true)}
    kind="${select("kind", ["brand", "danger", "info", "success", "warning"], "")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["s", "m", "l"], "s")}"
    ${boolean("fullscreen", false)}
    ${boolean("docked", false)}
    ${boolean("escape-disabled", false)}
  >
    <h3 slot="header">Small Modal</h3>
    <div slot="content">
      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.
    </div>
    <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`;

const mightyLongTextToScroll = html`
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nisi et elit auctor aliquet ac suscipit eros. Sed nec
  nibh viverra, feugiat magna ut, posuere arcu. Curabitur varius erat ut suscipit convallis. Nullam semper pellentesque
  est laoreet accumsan. Aenean eget urna fermentum, porttitor dui et, tincidunt erat. Curabitur lacinia lacus in urna
  lacinia, ac interdum lorem fermentum. Ut accumsan malesuada varius. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Phasellus tempus tempor magna, eu dignissim urna ornare non. Integer tempor justo blandit nunc ornare, a
  interdum nisl pharetra. Sed ultricies at augue vel fermentum. Maecenas laoreet odio lorem. Aliquam in pretium turpis.
  Donec quis felis a diam accumsan vehicula efficitur at orci. Donec sollicitudin gravida ultrices.
`;

export const slots = (): string => html`
  <calcite-modal
    ${boolean("open", true)}
    kind="${select("kind", ["brand", "danger", "info", "success", "warning"], "")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width="${select("width", ["s", "m", "l"], "s")}"
    ${boolean("fullscreen", false)}
    ${boolean("docked", false)}
    ${boolean("escape-disabled", false)}
  >
    <h3 slot="header">Slot for a header.</h3>
    <div slot="content-top">Slot for a content-top.</div>
    <div slot="content" style="height: 100px">${mightyLongTextToScroll}</div>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button slot="primary" width="full">Button</calcite-button>
  </calcite-modal>
`;

export const darkModeRTLCustomSizeCSSVars_TestOnly = (): string => html`
  <calcite-modal
    class="calcite-mode-dark"
    dir="rtl"
    ${boolean("open", true)}
    kind="${select("kind", ["brand", "danger", "info", "success", "warning"], "")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    ${boolean("fullscreen", false)}
    ${boolean("docked", false)}
    ${boolean("escape-disabled", false)}
    style="--calcite-modal-height: 500px; --calcite-modal-width: 600px;"
  >
    <h3 slot="header">Small Modal</h3>
    <div slot="content">
      <p>
        The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can
        customize the size using the width attribute.
      </p>
    </div>
    <calcite-button slot="back" kind="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`;

darkModeRTLCustomSizeCSSVars_TestOnly.parameters = { modes: modesDarkDefault };

export const withTooltips_TestOnly = (): string => html`
  <button id="button">Open</button>
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-modal open aria-labelledby="modal-title" id="modal">
    <div slot="header" id="modal-title">Modal title</div>
    <div slot="content">
      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="back" kind="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
  <calcite-tooltip open label="Back" reference-element="back-button-modal">Back</calcite-tooltip>
`;

withTooltips_TestOnly.parameters = {
  chromatic: { delay: 500 },
};

export const withCSSVars_TestOnly = (): string => html`
  <button id="button">Open</button>
  <calcite-modal open aria-labelledby="modal-title" id="modal" style="--calcite-modal-content-background: #ddd;">
    <div slot="header" id="modal-title">Modal title</div>
    <div slot="content">
      Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="back" kind="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="secondary" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="primary" width="full">Save</calcite-button>
  </calcite-modal>
`;
