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
  | "escapeDisabled"
  | "closeDisabled"
  | "placement"
  | "loading"
  | "menuOpen"
  | "modal"
  | "overlayPositioning"
  | "dragEnabled"
  | "resizable"
  | "outsideCloseDisabled"
>;

export default {
  title: "Components/Dialog",
  args: {
    open: true,
    kind: "",
    escapeDisabled: false,
    scale: scale.defaultValue,
    widthScale: scale.values[0],
    placement: "center",
    heading: "My Dialog",
    description: "My description!",
    closeDisabled: false,
    loading: false,
    menuOpen: false,
    modal: false,
    dragEnabled: false,
    resizable: false,
    overlayPositioning: overlayPositioning.defaultValue,
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
  <calcite-action text="measure" text-enabled icon="measure" slot="${SLOTS.headerMenuActions}"></calcite-action
  ><calcite-action text="search" text-enabled icon="search" slot="${SLOTS.headerMenuActions}"></calcite-action>`;

export const simple = (args: DialogStoryArgs): string => html`
  <calcite-dialog
    ${boolean("drag-enabled", args.dragEnabled)}
    ${boolean("resizable", args.resizable)}
    ${boolean("modal", args.modal)}
    ${boolean("open", args.open)}
    ${boolean("menu-open", args.menuOpen)}
    ${boolean("loading", args.loading)}
    ${boolean("close-disabled", args.closeDisabled)}
    ${boolean("escape-disabled", args.escapeDisabled)}
    ${boolean("outside-close-disabled", args.outsideCloseDisabled)}
    kind="${args.kind}"
    scale="${args.scale}"
    width-scale="${args.widthScale}"
    placement="${args.placement}"
    heading="${args.heading}"
    description="${args.description}"
    overlay-positioning="${args.overlayPositioning}"
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
    width="auto"
    >Back</calcite-button
  >
  <calcite-button slot="${SLOTS.footerEnd}" width="auto" appearance="outline">Cancel</calcite-button>
  <calcite-button slot="${SLOTS.footerEnd}" width="auto">Save</calcite-button>`;

const customContent = html` <div
  style="margin: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--calcite-color-background);
        border: 1px solid var(--calcite-color-brand);
        border-radius: 5px;"
  slot="custom-content"
>
  <p>This dialog has default content replaced with custom content.</p>
  <calcite-button id="custom-content-button" appearance="transparent" scale="s">Close</calcite-button>
</div>`;

export const slots = (): string => html`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s">
    <div slot="${SLOTS.contentTop}">Slot for a content-top.</div>
    ${mightyLongTextToScroll}
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

export const slotsWithModal = (): string => html`
  <calcite-dialog heading="My Dialog" open scale="m" width-scale="s" modal>
    <div slot="${SLOTS.contentTop}">Slot for a content-top.</div>
    ${mightyLongTextToScroll}
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

export const customContentSlot = (): string => html`
  <calcite-dialog heading="Custom content slot dialog" open placement="cover"> ${customContent} </calcite-dialog>
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

export const withCustomHeader = (): string => html`
  <style>
    #three-quarters-width-header-content {
      width: 75%;
    }
  </style>
  <calcite-dialog open scale="m" width-scale="s">
    <div id="three-quarters-width-header-content" slot="${SLOTS.headerContent}">
      <calcite-inline-editable scale="l" editingEnabled="true">
        <calcite-input alignment="start" placeholder="Enter text..." scale="l" type="text" value="Editable header" />
      </calcite-inline-editable>
    </div>
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const withCustomContent = (): string => html`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="${SLOTS.content}">Custom Content!</div>
    <p>Slotted content!</p>
  </calcite-dialog>
`;

export const withCustomContentPanel = (): string => html`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <calcite-panel heading="Custom Panel" slot="${SLOTS.content}">Custom Panel Content!</calcite-panel>
  </calcite-dialog>
`;

export const withCustomContentDivPanel = (): string => html`
  <calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="s">
    <div slot="${SLOTS.content}"><calcite-panel heading="Custom Panel">Custom Panel Content!</calcite-panel></div>
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

export const footerSlot = (): string => html`
  <calcite-dialog modal open heading="heading" description="description" width-scale="s">
    <p>Slotted content!</p>
    <calcite-button slot="footer" width="auto" appearance="outline">Cancel</calcite-button>
    <calcite-button slot="footer" width="auto">Save</calcite-button>
  </calcite-dialog>
`;

const themedStyle = html`--calcite-dialog-scrim-background-color: purple; --calcite-dialog-size-x: 400px;
--calcite-dialog-size-y: 400px; --calcite-dialog-footer-space: 50px; --calcite-dialog-border-color: pink;
--calcite-dialog-content-space: 50px; --calcite-dialog-offset-x: 50px; --calcite-dialog-offset-y: -30px;`;

export const withShellInside = (): string =>
  html`<calcite-dialog open modal heading="heading" description="description" scale="m" width-scale="l">
    <calcite-shell>
      <calcite-shell-panel slot="panel-start">
        <calcite-action-bar slot="action-bar" expanded>
          <calcite-action-group>
            <calcite-action text-enabled text="Action 1"></calcite-action>
            <calcite-action text-enabled text="Action 2"></calcite-action>
            <calcite-action text-enabled text="Action 3"></calcite-action>
            <calcite-action text-enabled text="Action 4"></calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
      </calcite-shell-panel>
      <calcite-shell-center-row>
        <calcite-button>button</calcite-button>
      </calcite-shell-center-row>
    </calcite-shell>
    <calcite-button slot="footer-end" appearance="outline"> Cancel </calcite-button>
    <calcite-button slot="footer-end"> Save </calcite-button>
  </calcite-dialog>`;

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
    Slotted content!
    <div slot="footer">Footer!</div>
    <calcite-fab slot="${SLOTS.fab}"></calcite-fab>
  </calcite-dialog>`;
