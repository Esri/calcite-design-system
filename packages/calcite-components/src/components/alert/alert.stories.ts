import { select } from "../../../.storybook/fake-knobs";
import { boolean, iconNames } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Alert",
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

/**  Adds explicit height/width for components using position:fixed per Chromatic doc <https://www.chromatic.com/docs/snapshots/#why-isn%E2%80%99t-my-modal-or-dialog-captured>. */
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

export const titleMessageLink = (): string => html`
  ${wrapperStyles}
  <div class="wrapper">
    <calcite-alert
      ${boolean("icon", true)}
      ${boolean("auto-close", false)}
      auto-close-duration="${select("auto-close-duration", ["fast", "medium", "slow"], "medium")}"
      placement="${select(
        "placement",
        ["bottom-start", "bottom", "bottom-end", "top-start", "top", "top-end"],
        "bottom",
      )}"
      ${boolean("open", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      kind="${select("kind", ["brand", "info", "danger", "success", "warning"], "brand")}"
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
      ${boolean("icon", true)}
      ${boolean("auto-close", false)}
      auto-close-duration="${select("auto-close-duration", ["fast", "medium", "slow"], "medium")}"
      placement="${select(
        "placement",
        ["bottom-start", "bottom", "bottom-end", "top-start", "top", "top-end"],
        "bottom",
      )}"
      ${boolean("open", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      kind="${select("kind", ["brand", "info", "danger", "success", "warning"], "danger")}"
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
      ${boolean("icon", true)}
      ${boolean("auto-close", false)}
      auto-close-duration="${select("auto-close-duration", ["fast", "medium", "slow"], "medium")}"
      placement="${select(
        "placement",
        ["bottom-start", "bottom", "bottom-end", "top-start", "top", "top-end"],
        "bottom",
      )}"
      ${boolean("open", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      kind="${select("kind", ["brand", "info", "danger", "success", "warning"], "success")}"
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
      ${boolean("icon", true)}
      ${boolean("auto-close", false)}
      auto-close-duration="${select("auto-close-duration", ["fast", "medium", "slow"], "medium")}"
      placement="${select(
        "placement",
        ["bottom-start", "bottom", "bottom-end", "top-start", "top", "top-end"],
        "bottom",
      )}"
      ${boolean("open", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      kind="${select("kind", ["brand", "info", "danger", "success", "warning"], "warning")}"
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
      icon="${select("icon", iconNames, iconNames[0])}"
      ${boolean("auto-close", false)}
      auto-close-duration="${select("auto-close-duration", ["fast", "medium", "slow"], "medium")}"
      placement="${select(
        "placement",
        ["bottom-start", "bottom", "bottom-end", "top-start", "top", "top-end"],
        "bottom",
      )}"
      ${boolean("open", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      kind="${select("kind", ["brand", "info", "danger", "success", "warning"], "success")}"
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
      ${boolean("icon", true)}
      ${boolean("auto-close", false)}
      auto-close-duration="${select("auto-close-duration", ["fast", "medium", "slow"], "medium")}"
      placement="${select(
        "placement",
        ["bottom-start", "bottom", "bottom-end", "top-start", "top", "top-end"],
        "bottom",
      )}"
      ${boolean("open", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      kind="${select("kind", ["brand", "info", "danger", "success", "warning"], "danger")}"
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
      }, "1000");
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
