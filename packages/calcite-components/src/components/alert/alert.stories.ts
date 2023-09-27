import { select } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { createBreakpointStories, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

const openAlertScreenshotDelay = 1000;

export default {
  title: "Components/Alert",
  parameters: {
    notes: readme,
    chromatic: {
      delay: 500,
    },
  },
  ...storyFilters(),
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
      "bottom"
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
      "bottom"
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
      "bottom"
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
      "bottom"
    )}"
    ${boolean("open", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
    kind="${select("kind", ["brand", "info", "danger", "success", "warning"], "success")}"
  >
    <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
    <calcite-link slot="link" title="my action">View layer</calcite-link>
  </calcite-alert>
`;

export const queue_NoTest = (): string => html`
  <div>
    <h5>Open or add to queue</h5>
    <calcite-button onclick='document.querySelector("#one").setAttribute("open", "")'>Open Alert 1</calcite-button>
    <calcite-button onclick='document.querySelector("#two").setAttribute("open", "")'>Open Alert 2</calcite-button>
    <calcite-button onclick='document.querySelector("[data-custom-id=my-id]").setAttribute("open", "")'
      >Open Alert 3</calcite-button
    >
    <br />
    <br />
    <h5>Close or remove from queue</h5>
    <calcite-button kind="danger" onclick='document.querySelector("#one").removeAttribute("open")'
      >Close Alert 1</calcite-button
    >
    <calcite-button kind="danger" onclick='document.querySelector("#two").removeAttribute("open")'
      >Close Alert 2</calcite-button
    >
    <calcite-button kind="danger" onclick='document.querySelector("[data-custom-id=my-id]").removeAttribute("open")'
      >Close Alert 3</calcite-button
    >
    <calcite-alert id="one" icon kind="${select("kind", ["brand", "info", "danger", "success", "warning"], "success")}">
      <div slot="title">Your great thing happened</div>
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
    <calcite-alert id="two" icon kind="${select("kind-2", ["brand", "info", "danger", "success", "warning"], "info")}">
      <div slot="title">Your great thing happened</div>
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
    <calcite-alert
      data-custom-id="my-id"
      icon
      kind="${select("kind-3", ["brand", "info", "danger", "success", "warning"], "danger")}"
    >
      <div slot="title">That didn't work out</div>
      <div slot="message">That thing you wanted to do didn't work</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
  </div>
`;

queue_NoTest.parameters = {
  chromatic: { disableSnapshot: true },
};

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-alert
    class="calcite-mode-dark"
    ${boolean("icon", true)}
    ${boolean("auto-close", false)}
    auto-close-duration="${select("auto-close-duration", ["fast", "medium", "slow"], "medium")}"
    placement="${select(
      "placement",
      ["bottom-start", "bottom", "bottom-end", "top-start", "top", "top-end"],
      "bottom"
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

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

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

// we use individual stories since we can't display multiple open alerts at the same time

const breakpointsStoryTemplate = html`
  <style>
    .breakpoint-stories-container {
      height: 600px;

      /* force fixed container placement on the breakpoint-sized stories container */
      contain: layout;
    }
  </style>
  <calcite-alert icon open scale="{scale}">
    <div slot="title">title</div>
    <div slot="message">message</div>
    <calcite-action scale="{scale}" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
    <calcite-action scale="{scale}" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
  </calcite-alert>
  <calcite-alert icon scale="{scale}">
    <div slot="title">title</div>
    <div slot="message">message</div>
    <calcite-action scale="{scale}" slot="actions-end" title="Tips" icon="lightbulb"></calcite-action>
    <calcite-action scale="{scale}" slot="actions-end" title="Get info" icon="attachment"></calcite-action>
  </calcite-alert>
  <script>
    (async function () {
      await customElements.whenDefined("calcite-alert");
      const alert2 = document.querySelectorAll("calcite-alert")[1];
      await alert2.componentOnReady();

      requestAnimationFrame(() => (alert2.open = true));
    })();
  </script>
`;

export const breakpointsXsmallScaleS_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "xsmall", scale: "s" });

breakpointsXsmallScaleS_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsSmallScaleS_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "small", scale: "s" });

breakpointsSmallScaleS_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsMediumScaleS_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "medium", scale: "s" });

breakpointsMediumScaleS_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsLargeScaleS_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "large", scale: "s" });

breakpointsLargeScaleS_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsXsmallScaleM_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "xsmall", scale: "m" });

breakpointsXsmallScaleM_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsSmallScaleM_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "small", scale: "m" });

breakpointsSmallScaleM_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsMediumScaleM_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "medium", scale: "m" });

breakpointsMediumScaleM_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsLargeScaleM_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "large", scale: "m" });

breakpointsLargeScaleM_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsXsmallScaleL_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "xsmall", scale: "l" });

breakpointsXsmallScaleL_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsSmallScaleL_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "small", scale: "l" });

breakpointsSmallScaleL_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsMediumScaleL_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "medium", scale: "l" });

breakpointsMediumScaleL_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};

export const breakpointsLargeScaleL_TestOnly = (): string =>
  createBreakpointStories(breakpointsStoryTemplate, { breakpoint: "large", scale: "l" });

breakpointsLargeScaleL_TestOnly.parameters = {
  chromatic: { delay: openAlertScreenshotDelay },
};
