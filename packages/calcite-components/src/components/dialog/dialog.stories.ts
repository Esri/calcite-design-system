import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Dialog } from "./dialog";
const { kind, scale, overlayPositioning } = ATTRIBUTES;
import { dialogPlacements, SLOTS } from "./resources";

type DialogStoryArgs = Pick<
  Dialog,
  | "open"
  | "kind"
  | "scale"
  | "widthScale"
  | "heading"
  | "description"
  | "closeDisabled"
  | "placement"
  | "loading"
  | "menuOpen"
  | "modal"
  | "overlayPositioning"
>;

export default {
  title: "Components/Dialog",
  args: {
    open: true,
    kind: "",
    scale: scale.defaultValue,
    widthScale: scale.values[0],
    placement: "center",
    heading: "My Dialog",
    description: "My description!",
    closeDisabled: false,
    loading: false,
    menuOpen: false,
    modal: false,
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
    placement: {
      options: dialogPlacements,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 1000,
    },
  },
};

const actionsContent = html` <calcite-action
    text="Action"
    label="Action"
    slot="${SLOTS.headerActionsStart}"
    icon="bluetooth"
  ></calcite-action>
  <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>`;

const menuActionsContent = html` <calcite-action
    text="banana"
    text-enabled
    icon="banana"
    slot="${SLOTS.headerMenuActions}"
  ></calcite-action>
  <calcite-action text="measure" text-enabled icon="measure" slot="${SLOTS.headerMenuActions}"></calcite-action>`;

export const simple = (args: DialogStoryArgs): string => html`
  <calcite-dialog
    ${boolean("modal", args.modal)}
    ${boolean("open", args.open)}
    ${boolean("menuOpen", args.menuOpen)}
    ${boolean("loading", args.loading)}
    ${boolean("close-disabled", args.closeDisabled)}
    kind="${args.kind}"
    scale="${args.scale}"
    width-scale="${args.widthScale}"
    placement="${args.placement}"
    heading="${args.heading}"
    description="${args.description}"
  >
    ${actionsContent} ${menuActionsContent} The small modal is perfect for short confirmation dialogs or very compact
    interfaces with few elements. ${footerContent}
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

const footerContent = html`<calcite-button
    id="tooltip-button"
    slot="${SLOTS.footerStart}"
    kind="neutral"
    appearance="outline"
    icon="chevron-left"
    width="full"
    >Back</calcite-button
  >
  <calcite-button slot="${SLOTS.footerEnd}" width="full" appearance="outline">Cancel</calcite-button>
  <calcite-button slot="${SLOTS.footerEnd}" width="full">Save</calcite-button>`;

export const slots = (): string => html`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s">
    <div slot="${SLOTS.contentTop}">Slot for a content-top.</div>
    <div style="height: 100px">${mightyLongTextToScroll}</div>
    <div slot="${SLOTS.contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="${SLOTS.fab}"></calcite-fab>
    <calcite-action-bar slot="${SLOTS.actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    ${footerContent}
  </calcite-dialog>
`;

export const slotsModal = (): string => html`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s" modal>
    <div slot="${SLOTS.contentTop}">Slot for a content-top.</div>
    <div style="height: 100px">${mightyLongTextToScroll}</div>
    <div slot="${SLOTS.contentBottom}">Slot for a content-bottom.</div>
    <calcite-fab slot="${SLOTS.fab}"></calcite-fab>
    <calcite-action-bar slot="${SLOTS.actionBar}">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    ${footerContent}
  </calcite-dialog>
`;

export const darkModeRTLCustomSizeCSSVars = (): string => html`
  <calcite-dialog
    heading="My Dialog"
    class="calcite-mode-dark"
    dir="rtl"
    open
    scale="m"
    style="--calcite-dialog-size-y: 500px; --calcite-dialog-size-x: 600px;"
  >
    <p>
      The small modal is perfect for short confirmation dialogs or very compact interfaces with few elements. You can
      customize the size using the width attribute.
    </p>
    ${footerContent}
  </calcite-dialog>
`;

darkModeRTLCustomSizeCSSVars.parameters = { themes: modesDarkDefault };

export const withTooltips = (): string => html`
  <calcite-tooltip style="--calcite-tooltip-z-index: 600;" open label="Open modal" reference-element="button"
    >Open modal</calcite-tooltip
  >
  <calcite-dialog scale="m" width-scale="s" open heading="Dialog title">
    <div>
      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    ${footerContent}
  </calcite-dialog>
  <calcite-tooltip open label="Back" reference-element="tooltip-button">Back</calcite-tooltip>
`;

withTooltips.parameters = {
  chromatic: { delay: 500 },
};

export const withCSSVars = (): string => html`
  <button id="button">Open</button>
  <calcite-dialog
    scale="m"
    width-scale="s"
    open
    heading="Dialog title"
    style="--calcite-dialog-content-background: #ddd;"
  >
    <div>
      Dialog content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </div>
    ${footerContent}
  </calcite-dialog>
`;

export const withCustomHeader = (): string => html`
  <calcite-dialog open scale="m" width-scale="s">
    <div slot="${SLOTS.headerContent}">Header!</div>
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const withCustomContent = (): string => html`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="${SLOTS.content}">Custom Content!</div>
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const loading = (): string => html`
  <calcite-dialog loading open modal heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const menuOpen = (): string => html`
  <calcite-dialog
    overlay-positioning="fixed"
    menu-open
    open
    modal
    heading="heading"
    description="description"
    scale="m"
    width-scale="s"
  >
    <p>Slotted content!</p>
    ${menuActionsContent}
  </calcite-dialog>
`;

export const withFooter = (): string => html`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-action text="Action" label="Action" slot="${SLOTS.footer}" icon="attachment"></calcite-action>
    Hello world!
  </calcite-dialog>
`;

export const scaleS = (): string => html`
  <calcite-dialog open heading="heading" description="description" scale="s" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const scaleL = (): string => html`
  <calcite-dialog open heading="heading" description="description" scale="l" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const widthScaleM = (): string => html`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="m">
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const widthScaleL = (): string => html`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="l">
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const withAlertsSlot = (): string => html`
  <calcite-dialog open heading="heading" description="description" scale="m" width-scale="s">
    <p>Slotted content!</p>
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
  </calcite-dialog>
`;

export const placementTop = (): string => html`
  <calcite-dialog modal placement="top" kind="brand" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const placementTopStart = (): string => html`
  <calcite-dialog
    modal
    placement="top-start"
    kind="danger"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const placementTopEnd = (): string => html`
  <calcite-dialog
    modal
    placement="top-end"
    kind="info"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const placementBottom = (): string => html`
  <calcite-dialog
    modal
    placement="bottom"
    kind="success"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const placementBottomStart = (): string => html`
  <calcite-dialog
    modal
    placement="bottom-start"
    kind="warning"
    open
    heading="heading"
    description="description"
    width-scale="s"
  >
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const placementBottomEnd = (): string => html`
  <calcite-dialog modal placement="bottom-end" open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
  </calcite-dialog>
`;

const themedStyle = html` --calcite-dialog-scrim-background-color: purple; --calcite-dialog-size-x: 400px;
--calcite-dialog-size-y: 400px; --calcite-dialog-panel-footer-space: 50px; --calcite-dialog-border-color: pink;`;

export const themed = (): string =>
  html`<calcite-dialog
    style="${themedStyle}"
    open
    modal
    heading="heading"
    description="description"
    scale="m"
    width-scale="s"
  >
    <p>Slotted content!</p>
    <div slot="footer">Footer!</div>
  </calcite-dialog>`;
