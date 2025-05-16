import { iconNames } from "../../../.storybook/helpers";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { menuPlacements } from "../../utils/floating-ui";
import { Alert } from "./alert";

const { scale, duration, kind, numberingSystem, queue } = ATTRIBUTES;

type AlertStoryArgs = Pick<
  Alert,
  | "autoClose"
  | "autoCloseDuration"
  | "icon"
  | "iconFlipRtl"
  | "kind"
  | "label"
  | "numberingSystem"
  | "open"
  | "placement"
  | "scale"
  | "queue"
>;

export default {
  title: "Components/Alert",
  args: {
    autoClose: false,
    autoCloseDuration: duration.defaultValue,
    icon: "",
    iconFlipRtl: false,
    kind: kind.defaultValue,
    label: "Alert",
    numberingSystem: numberingSystem[2],
    open: true,
    placement: menuPlacements[4],
    scale: "m",
    queue: "last",
  },
  argTypes: {
    autoCloseDuration: {
      options: duration.values,
      control: { type: "select" },
    },
    icon: {
      options: iconNames,
      control: { type: "select" },
    },
    kind: {
      options: kind.values.filter((option) => option !== "inverse" && option !== "neutral"),
      control: { type: "select" },
    },
    numberingSystem: {
      options: numberingSystem,
      control: { type: "select" },
    },
    placement: {
      options: menuPlacements,
      control: { type: "select" },
    },
    queue: {
      options: queue.values,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

/** Adds explicit height/width for components using position:fixed per Chromatic doc <https://www.chromatic.com/docs/snapshots/#why-isn%E2%80%99t-my-modal-or-dialog-captured>. */
const wrapperStyles = html`
  <style>
    .wrapper {
      width: 640px;
      height: 800px;
      padding: 64px;
      max-width: 100%;
    }
  </style>
`;

export const simple = (args: AlertStoryArgs): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      ${boolean("auto-close", args.autoClose)}
      ${boolean("open", args.open)}
      ${boolean("icon-flip-rtl", args.iconFlipRtl)}
      queue="${args.queue}"
      auto-close-duration="${args.autoCloseDuration}"
      scale="${args.scale}"
      kind="${args.kind}"
      icon="${args.icon}"
      label="${args.label}"
      numbering-system="${args.numberingSystem}"
      placement="${args.placement}"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action">Take action</calcite-link>
    </calcite-alert>
  </div>
`;

export const titleMessageLink = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="brand"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Here's a general bit of information</div>
      <div slot="message">Some kind of contextually relevant content</div>
      <calcite-link slot="link" title="my action">Take action</calcite-link>
    </calcite-alert>
  </div>
`;

titleMessageLink.storyName = "Title, message, link";

export const titleMessage = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="danger"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Something failed</div>
      <div slot="message">That thing you wanted to do didn't work as expected</div>
    </calcite-alert>
  </div>
`;

titleMessage.storyName = "Title, message";

export const messageLink = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="success"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
  </div>
`;

messageLink.storyName = "Message, link";

export const message = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="warning"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Network connection interruption detected</div>
    </calcite-alert>
  </div>
`;

export const customIcon = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon="${iconNames[0]}"
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="success"
      style="--calcite-alert-width:450px;"
    >
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      class="calcite-mode-dark"
      icon
      auto-close-duration="medium"
      placement="bottom"
      open
      scale="m"
      kind="danger"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Something failed</div>
      <div slot="message">That thing you wanted to do didn't work as expected</div>
      <calcite-link slot="link" title="my action">My action</calcite-link>
    </calcite-alert>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const actionsEndNoQueue_TestOnly = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      label="this is a default danger with icon and link"
      scale="l"
      kind="danger"
      icon
      open
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Hello there!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
  </div>
`;

export const actionsEndQueued_TestOnly = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert id="one" label="One" scale="l" kind="danger" icon open style="--calcite-alert-width:450px;">
      <div slot="title">Hello there, alert one!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
    <calcite-alert id="two" label="Two" scale="l" kind="danger" icon style="--calcite-alert-width:450px;">
      <div slot="title">Hello there, alert two!</div>
      <div slot="message">Do you really want to proceed?</div>
      <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
      <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
    </calcite-alert>
    <script>
      setTimeout(() => {
        document.querySelector("#two").open = true;
      }, 250);
    </script>
  </div>
`;

export const textAlignDoesNotAffectComponentAlignment_TestOnly = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      icon="rangefinder"
      kind="brand"
      open
      scale="s"
      label="A report alert"
      style="--calcite-alert-width:450px;"
    >
      <div slot="title">Trail Camera Report</div>
      <div slot="message">We thought you might want to take a look</div>
      <calcite-link slot="link">Take action</calcite-link>
    </calcite-alert>
  </div>
`;

export const withQueue = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert id="one" kind="brand" open>
      <div slot="title">Open by default</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <calcite-alert id="two" queue="immediate" kind="danger">
      <div slot="title">Immediate Alert</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <calcite-alert id="three" kind="success">
      <div slot="title">Third Alert</div>
      <div slot="message">We thought you might want to take a look</div>
    </calcite-alert>
    <script>
      setTimeout(() => {
        document.querySelector("#two").open = true;
      }, 100);
      setTimeout(() => {
        document.querySelector("#three").open = true;
      }, 250);
    </script>
  </div>
`;
