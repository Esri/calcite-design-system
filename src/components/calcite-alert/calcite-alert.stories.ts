import { select } from "@storybook/addon-knobs";
import { boolean, iconNames } from "../../../.storybook/helpers";
import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/Alert",

  parameters: {
    notes: readme
  }
};

export const TitleMessageLink = (): string => html`
<calcite-alert
theme="light"
${boolean("icon", true)}
${boolean("auto-dismiss", false)}
auto-dismiss-duration="${select("auto-dismiss-duration", ["fast", "medium", "slow"], "medium")}"
${boolean("active", true)}
scale="${select("scale", ["s", "m", "l"], "m")}"
color="${select("color", ["green", "red", "yellow", "blue"], "blue")}">
<div slot="title">Here's a general bit of information</div></div>
<div slot="message">
  Some kind of contextually relevant content
</div>
<calcite-link slot="link" title="my action">Take action</calcite-link>
</calcite-alert>
`;

TitleMessageLink.story = {
  name: "Title, message, link"
};

export const TitleMessage = (): string => html`
  <calcite-alert
    theme="light"
    ${boolean("icon", true)}
    ${boolean("auto-dismiss", false)}
    auto-dismiss-duration="${select("auto-dismiss-duration", ["fast", "medium", "slow"], "medium")}"
    ${boolean("active", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "red")}"
  >
    <div slot="title">Something failed</div>
    <div slot="message">That thing you wanted to do didn't work as expected</div>
  </calcite-alert>
`;

TitleMessage.story = {
  name: "Title, message"
};

export const MessageLink = (): string => html`
  <calcite-alert
    theme="light"
    ${boolean("icon", true)}
    ${boolean("auto-dismiss", false)}
    auto-dismiss-duration="${select("auto-dismiss-duration", ["fast", "medium", "slow"], "medium")}"
    ${boolean("active", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "green")}"
  >
    <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
    <calcite-link slot="link" title="my action">View layer</calcite-link>
  </calcite-alert>
`;

MessageLink.story = {
  name: "Message, link"
};

export const Message = (): string => html`
  <calcite-alert
    theme="light"
    ${boolean("icon", true)}
    ${boolean("auto-dismiss", false)}
    auto-dismiss-duration="${select("auto-dismiss-duration", ["fast", "medium", "slow"], "medium")}"
    ${boolean("active", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "yellow")}"
  >
    <div slot="message">Network connection interruption detected</div>
  </calcite-alert>
`;

export const CustomIcon = (): string => html`
  <calcite-alert
    theme="light"
    icon="${select("icon", iconNames, iconNames[0])}"
    ${boolean("auto-dismiss", false)}
    auto-dismiss-duration="${select("auto-dismiss-duration", ["fast", "medium", "slow"], "medium")}"
    ${boolean("active", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "green")}"
  >
    <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
    <calcite-link slot="link" title="my action">View layer</calcite-link>
  </calcite-alert>
`;

CustomIcon.story = {
  name: "Custom icon"
};

export const Queue = (): string => html`
  <div>
    <h5>Open or add to queue</h5>
    <calcite-button onclick='document.querySelector("#one").setAttribute("active", "")'>Open Alert 1</calcite-button>
    <calcite-button onclick='document.querySelector("#two").setAttribute("active", "")'>Open Alert 2</calcite-button>
    <calcite-button onclick='document.querySelector("[data-custom-id=my-id]").setAttribute("active", "")'
      >Open Alert 3</calcite-button
    >
    <br />
    <br />
    <h5>Close or remove from queue</h5>
    <calcite-button color="red" onclick='document.querySelector("#one").removeAttribute("active")'
      >Close Alert 1</calcite-button
    >
    <calcite-button color="red" onclick='document.querySelector("#two").removeAttribute("active")'
      >Close Alert 2</calcite-button
    >
    <calcite-button color="red" onclick='document.querySelector("[data-custom-id=my-id]").removeAttribute("active")'
      >Close Alert 3</calcite-button
    >
    <calcite-alert id="one" theme="light" icon color="${select("color", ["green", "red", "yellow", "blue"], "green")}">
      <div slot="title">Your great thing happened</div>
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
    <calcite-alert id="two" theme="light" icon color="${select("color-2", ["green", "red", "yellow", "blue"], "blue")}">
      <div slot="title">Your great thing happened</div>
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
    <calcite-alert
      data-custom-id="my-id"
      theme="light"
      icon
      color="${select("color-3", ["green", "red", "yellow", "blue"], "red")}"
    >
      <div slot="title">That didn't work out</div>
      <div slot="message">That thing you wanted to do didn't work</div>
      <calcite-link slot="link" title="my action">View layer</calcite-link>
    </calcite-alert>
  </div>
`;

export const DarkTheme = (): string => html`
  <calcite-alert
    theme="dark"
    ${boolean("icon", true)}
    ${boolean("auto-dismiss", false)}
    auto-dismiss-duration="${select("auto-dismiss-duration", ["fast", "medium", "slow"], "medium")}"
    ${boolean("active", true)}
    scale="${select("scale", ["s", "m", "l"], "m")}"
    color="${select("color", ["green", "red", "yellow", "blue"], "red")}"
  >
    <div slot="title">Something failed</div>
    <div slot="message">That thing you wanted to do didn't work as expected</div>
    <calcite-link theme="dark" slot="link" title="my action">My action</calcite-link>
  </calcite-alert>
`;

DarkTheme.story = {
  parameters: { backgrounds: darkBackground }
};

export const DarkThemeQueue = (): string => html`
  <div>
    <h5 style="color:white">Open or add to queue</h5>
    <calcite-button theme="dark" onclick='document.querySelector("#one").setAttribute("active", "")'
      >Open Alert 1</calcite-button
    >
    <calcite-button theme="dark" onclick='document.querySelector("#two").setAttribute("active", "")'
      >Open Alert 2</calcite-button
    >
    <calcite-button theme="dark" onclick='document.querySelector("[data-custom-id=my-id]").setAttribute("active", "")'
      >Open Alert 3</calcite-button
    >
    <br />
    <br />
    <h5 style="color:white">Close or remove from queue</h5>
    <calcite-button theme="dark" color="red" onclick='document.querySelector("#one").removeAttribute("active")'
      >Close Alert 1</calcite-button
    >
    <calcite-button theme="dark" color="red" onclick='document.querySelector("#two").removeAttribute("active")'
      >Close Alert 2</calcite-button
    >
    <calcite-button
      theme="dark"
      color="red"
      onclick='document.querySelector("[data-custom-id=my-id]").removeAttribute("active")'
      >Close Alert 3</calcite-button
    >
    <calcite-alert id="one" theme="dark" icon color="${select("color", ["green", "red", "yellow", "blue"], "green")}">
      <div slot="title">Your great thing happened</div>
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link theme="dark" slot="link" title="my action">My action</calcite-link>
    </calcite-alert>
    <calcite-alert id="two" theme="dark" icon color="${select("color-2", ["green", "red", "yellow", "blue"], "blue")}">
      <div slot="title">Your great thing happened</div>
      <div slot="message">Successfully duplicated <strong>2019 Sales Demographics by County</strong> layer</div>
      <calcite-link theme="dark" slot="link" title="my action">My action</calcite-link>
    </calcite-alert>
    <calcite-alert
      data-custom-id="my-id"
      theme="dark"
      icon
      color="${select("color-3", ["green", "red", "yellow", "blue"], "red")}"
    >
      <div slot="message">That thing you wanted to do didn't work out so well.</div>
    </calcite-alert>
  </div>
`;

DarkThemeQueue.story = {
  parameters: { backgrounds: darkBackground }
};

export const Rtl = (): string => html`
<div dir="rtl">
<calcite-alert
theme="light"
${boolean("icon", true)}
${boolean("auto-dismiss", false)}
auto-dismiss-duration="${select("auto-dismiss-duration", ["fast", "medium", "slow"], "medium")}"
${boolean("active", true)}
scale="${select("scale", ["s", "m", "l"], "m")}"
color="${select("color", ["green", "red", "yellow", "blue"], "blue")}">
<div slot="title">Something failed</div>
<div slot="message">
  That thing you wanted to do didn't work as expected
</div>
<calcite-link slot="link" title="my action">Retry</calcite-button>
</calcite-alert>
</div>
`;

Rtl.story = {
  name: "RTL"
};
