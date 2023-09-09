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
    <calcite-notice dir="rtl" class="calcite-mode-dark" icon open kind="danger">
      <div slot="title">This is a destructive action</div>
      <div slot="message">Be sure you know what you are doing, folks.</div>
    </calcite-notice>
  </div>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const breakpoints_TestOnly = (): string => html`
  <div style="text-align:center;">
    <calcite-notice icon scale="s" width="full" open closable style="width:476px">
      <div slot="title">Title lorem ispum</div>
      <div slot="message">Body lorem ispum</div>
      <calcite-action id="retry-action-s" scale="s" slot="actions-end" title="Retry" icon="reset"></calcite-action>
      <calcite-action id="info-action-s" scale="s" slot="actions-end" title="Get info" icon="attachment">
      </calcite-action>
    </calcite-notice>
    <calcite-notice icon scale="s" width="full" open closable style="width:768px">
      <div slot="title">Title lorem ispum</div>
      <div slot="message">Body lorem ispum</div>
      <calcite-action id="retry-action-s" scale="s" slot="actions-end" title="Retry" icon="reset"></calcite-action>
      <calcite-action id="info-action-s" scale="s" slot="actions-end" title="Get info" icon="attachment">
      </calcite-action>
    </calcite-notice>
    <calcite-notice icon scale="s" width="full" open closable style="width:1152px">
      <div slot="title">Title lorem ispum</div>
      <div slot="message">Body lorem ispum</div>
      <calcite-action id="retry-action-s" scale="s" slot="actions-end" title="Retry" icon="reset"></calcite-action>
      <calcite-action id="info-action-s" scale="s" slot="actions-end" title="Get info" icon="attachment">
      </calcite-action>
    </calcite-notice>
    <calcite-notice icon scale="s" width="full" open closable style="width:1440px">
      <div slot="title">Title lorem ispum</div>
      <div slot="message">Body lorem ispum</div>
      <calcite-action id="retry-action-s" scale="s" slot="actions-end" title="Retry" icon="reset"></calcite-action>
      <calcite-action id="info-action-s" scale="s" slot="actions-end" title="Get info" icon="attachment">
      </calcite-action>
    </calcite-notice>
  </div>
`;
