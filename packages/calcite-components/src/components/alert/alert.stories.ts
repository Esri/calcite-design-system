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

export const titleMessageLink = (): string => html`
<calcite-alert
${boolean("icon", true)}
${boolean("auto-close", false)}
auto-close-duration="${select("auto-close-duration", ["fast", "medium", "slow"], "medium")}"
placement="${select("placement", ["bottom-start", "bottom", "bottom-end", "top-start", "top", "top-end"], "bottom")}"
${boolean("open", true)}
scale="${select("scale", ["s", "m", "l"], "m")}"
kind="${select("kind", ["brand", "info", "danger", "success", "warning"], "brand")}">
<div slot="title">Here's a general bit of information</div></div>
<div slot="message">
  Some kind of contextually relevant content
</div>
<calcite-link slot="link" title="my action">Take action</calcite-link>
</calcite-alert>
`;

titleMessageLink.storyName = "Title, message, link";

export const titleMessage = (): string => html`
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
  >
    <div slot="title">Something failed</div>
    <div slot="message">That thing you wanted to do didn't work as expected</div>
  </calcite-alert>
`;

titleMessage.storyName = "Title, message";

export const messageLink = (): string => html`
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
  >
    <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
    <calcite-link slot="link" title="my action">View layer</calcite-link>
  </calcite-alert>
`;

messageLink.storyName = "Message, link";

export const message = (): string => html`
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
  >
    <div slot="message">Network connection interruption detected</div>
  </calcite-alert>
`;

export const customIcon = (): string => html`
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
  >
    <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
    <calcite-link slot="link" title="my action">View layer</calcite-link>
  </calcite-alert>
`;

export const darkModeRTL_TestOnly = (): string => html`
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
  >
    <div slot="title">Something failed</div>
    <div slot="message">That thing you wanted to do didn't work as expected</div>
    <calcite-link slot="link" title="my action">My action</calcite-link>
  </calcite-alert>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const actionsEndNoQueue_TestOnly = (): string => html`
  <calcite-alert label="this is a default danger with icon and link" scale="l" kind="danger" icon open>
    <div slot="title">Hello there!</div>
    <div slot="message">Do you really want to proceed?</div>
    <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
    <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
  </calcite-alert>
`;

export const actionsEndQueued_TestOnly = (): string => html`
  <calcite-alert id="one" label="One" scale="l" kind="danger" icon open>
    <div slot="title">Hello there, alert one!</div>
    <div slot="message">Do you really want to proceed?</div>
    <calcite-action scale="l" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
    <calcite-action scale="l" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
  </calcite-alert>
  <calcite-alert id="two" label="Two" scale="l" kind="danger" icon>
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
`;

export const autoClosableRetainsCloseButton_TestOnly = (): string => html`
  <calcite-alert auto-close auto-close-duration="medium" open scale="m" kind="info">
    <div slot="title">Here's a general bit of information</div>
    <div slot="message">Some kind of contextually relevant content</div>
    <calcite-link slot="link" title="my action" role="presentation"> Take action </calcite-link>
  </calcite-alert>
`;

export const textAlignDoesNotAffectComponentAlignment_TestOnly = (): string => html`
  <div style="text-align:center">
    <calcite-alert icon="rangefinder" kind="brand" open label="A report alert">
      <div slot="title">Trail Camera Report</div>
      <div slot="message">We thought you might want to take a look</div>
      <calcite-link slot="link">Take action</calcite-link>
    </calcite-alert>
  </div>
`;
