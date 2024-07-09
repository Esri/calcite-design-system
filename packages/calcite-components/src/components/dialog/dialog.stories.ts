import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Dialog } from "./dialog";
const { kind, scale, overlayPositioning } = ATTRIBUTES;

type DialogStoryArgs = Pick<
  Dialog,
  | "open"
  | "kind"
  | "scale"
  | "widthScale"
  | "fullscreen"
  | "escapeDisabled"
  | "heading"
  | "description"
  | "closeButtonDisabled"
  | "disabled"
  | "focusTrapDisabled"
  | "loading"
  | "menuOpen"
  | "modal"
  | "outsideCloseDisabled"
  | "overlayPositioning"
>;

export default {
  title: "Components/Dialog",
  args: {
    open: true,
    kind: "",
    scale: scale.defaultValue,
    widthScale: scale.values[0],
    fullscreen: false,
    docked: false,
    escapeDisabled: false,
    heading: "My Dialog",
    description: "",
    closeButtonDisabled: false,
    disabled: false,
    focusTrapDisabled: false,
    loading: false,
    menuOpen: false,
    modal: false,
    outsideCloseDisabled: false,
  },
  argTypes: {
    kind: {
      options: kind.values.filter((option) => option !== "inverse" && option !== "neutral"),
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    widthScale: {
      options: scale.values,
      control: { type: "select" },
    },
    overlayPositioning: {
      options: overlayPositioning.values,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 1000,
    },
  },
};

export const simple = (args: DialogStoryArgs): string => html`
  <calcite-dialog
    ${boolean("modal", args.modal)}
    ${boolean("open", args.open)}
    ${boolean("menuOpen", args.menuOpen)}
    ${boolean("loading", args.loading)}
    ${boolean("close-button-disabled", args.closeButtonDisabled)}
    ${boolean("focus-trap-disabled", args.focusTrapDisabled)}
    ${boolean("outside-close-disabled", args.outsideCloseDisabled)}
    ${boolean("disabled", args.disabled)}
    kind="${args.kind}"
    scale="${args.scale}"
    width-scale="${args.widthScale}"
    ${boolean("fullscreen", args.fullscreen)}
    ${boolean("escape-disabled", args.escapeDisabled)}
    heading="${args.heading}"
    description="${args.description}"
  >
    The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements.
    <calcite-button slot="footer-start" kind="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="footer-end" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer-end" width="full">Save</calcite-button>
  </calcite-dialog>
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
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s">
    <div slot="content-top">Slot for a content-top.</div>
    <div style="height: 100px">${mightyLongTextToScroll}</div>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button slot="footer-end" width="full">Button</calcite-button>
  </calcite-dialog>
`;

export const darkModeRTLCustomSizeCSSVars_TestOnly = (): string => html`
  <calcite-dialog
    heading="My Dialog"
    class="calcite-mode-dark"
    dir="rtl"
    open
    scale="m"
    style="--calcite-dialog-height: 500px; --calcite-dialog-width: 600px;"
  >
    <p>
      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can
      customize the size using the width attribute.
    </p>
    <calcite-button slot="footer-start" kind="neutral" appearance="outline" icon="chevron-left" width="full"
      >Back</calcite-button
    >
    <calcite-button slot="footer-end" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer-end" width="full">Save</calcite-button>
  </calcite-dialog>
`;

darkModeRTLCustomSizeCSSVars_TestOnly.parameters = { themes: modesDarkDefault };

export const withTooltips_TestOnly = (): string => html`
  <button id="button">Open</button>
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-dialog open heading="Dialog title">
    <div>
      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="footer-start" kind="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="footer-end" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer-end" width="full">Save</calcite-button>
  </calcite-dialog>
  <calcite-tooltip open label="Back" reference-element="back-button-modal">Back</calcite-tooltip>
`;

withTooltips_TestOnly.parameters = {
  chromatic: { delay: 500 },
};

export const withCSSVars_TestOnly = (): string => html`
  <button id="button">Open</button>
  <calcite-dialog open heading="Dialog title" id="modal" style="--calcite-dialog-content-background: #ddd;">
    <div>
      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    <calcite-button id="back-button-modal" slot="footer-start" kind="neutral" icon="chevron-left" width="full"
      >Back
    </calcite-button>
    <calcite-button slot="footer-end" width="full" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer-end" width="full">Save</calcite-button>
  </calcite-dialog>
`;
