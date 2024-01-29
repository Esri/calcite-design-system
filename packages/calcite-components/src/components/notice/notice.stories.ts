import { select } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Notice",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      ${boolean("icon", true)}
      ${boolean("open", true)}
      ${boolean("closable", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      kind="${select("kind", ["brand", "danger", "info", "success", "warning"], "brand")}"
      icon="${select("icon", iconNames, iconNames[0])}"
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
      <calcite-action
        label="Retry"
        icon="reset"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        slot="actions-end"
      ></calcite-action>
    </calcite-notice>
  </div>
`;

export const customIcon = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      icon="${select("icon", iconNames, iconNames[0])}"
      ${boolean("open", true)}
      ${boolean("closable", true)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      kind="${select("kind", ["brand", "danger", "info", "success", "warning"], "brand")}"
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
    </calcite-notice>
  </div>
`;

export const withAction = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      ${boolean("icon", true)}
      ${boolean("open", true)}
      ${boolean("closable", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      kind="${select("kind", ["brand", "danger", "info", "success", "warning"], "danger")}"
    >
      <div slot="title">Notice with action</div>
      <div slot="message">This shows a notice with a custom action</div>
      <calcite-action
        label="Retry"
        icon="reset"
        scale="${select("scale", ["s", "m", "l"], "m")}"
        slot="actions-end"
      ></calcite-action>
    </calcite-notice>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      dir="rtl"
      class="calcite-mode-dark"
      ${boolean("icon", true)}
      ${boolean("open", true)}
      ${boolean("closable", false)}
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width="${select("width", ["auto", "half", "full"], "auto")}"
      kind="${select("kind", ["brand", "danger", "info", "success", "warning"], "danger")}"
    >
      <div slot="title">This is a destructive action</div>
      <div slot="message">Be sure you know what you are doing, folks.</div>
    </calcite-notice>
  </div>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const theming_TestOnly = (): string => html`
  <calcite-notice
    closable
    open
    icon="layer"
    style="--calcite-notice-background-color: rgb(182, 101, 101);
      --calcite-notice-border-color: rgb(183, 61, 61);
      --calcite-notice-box-shadow: var(--calcite-shadow-sm);
      --calcite-notice-corner-radius: 4px;
      --calcite-notice-icon-color: rgb(244, 229, 229);
      --calcite-notice-close-icon-color: orange;
      --calcite-notice-text-color: rgb(244, 229, 229);
      --calcite-notice-close-icon-color: purple;
      --calcite-notice-close-background-color: rgb(236, 166, 178);"
  >
    <div slot="title">This is a message</div>
    <div slot="message">Be sure you know what you are doing, folks.</div>
  </calcite-notice>
`;
