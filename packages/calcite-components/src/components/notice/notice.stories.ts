import { iconNames } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { scale, width, kind } = ATTRIBUTES;

interface NoticeArgs {
  showIcon: boolean;
  open: boolean;
  closable: boolean;
  noticeScale: string;
  width: string;
  kind: string;
  icon: string;
  actionScale: string;
}

export default {
  title: "Components/Notice",
  args: {
    showIcon: true,
    open: true,
    closable: true,
    noticeScale: scale.defaultValue,
    width: width.defaultValue,
    kind: kind.defaultValue,
    icon: iconNames[0],
    actionScale: scale.defaultValue,
  },
  argTypes: {
    noticeScale: {
      options: scale.values,
      control: { type: "select" },
    },
    width: {
      options: width.values,
      control: { type: "select" },
    },
    kind: {
      options: kind.values.filter((option) => option !== "inverse" && option !== "neutral"),
      control: { type: "select" },
    },
    icon: {
      options: iconNames,
      control: { type: "select" },
    },
    actionScale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: NoticeArgs): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice
      ${args.icon ? "icon" : ""}
      ${args.open ? "open" : ""}
      ${args.closable ? "closable" : ""}
      scale="${args.noticeScale}"
      width="${args.width}"
      kind="${args.kind}"
      icon="${args.icon}"
    >
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
      <calcite-action label="Retry" icon="reset" scale="${args.actionScale}" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
`;

export const customIcon = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice icon="${iconNames[0]}" open closable scale="m" width="auto" kind="brand">
      <div slot="title">Your settings area has changed</div>
      <div slot="message">Look around and let us know what you think</div>
      <calcite-link slot="link" title="my action">Learn more</calcite-link>
    </calcite-notice>
  </div>
`;

export const withAction = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice icon open scale="m" width="auto" kind="danger">
      <div slot="title">Notice with action</div>
      <div slot="message">This shows a notice with a custom action</div>
      <calcite-action label="Retry" icon="reset" scale="m" slot="actions-end"></calcite-action>
    </calcite-notice>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width:600px;max-width:100%;text-align:center;">
    <calcite-notice dir="rtl" class="calcite-mode-dark" icon open scale="m" width="auto" kind="danger">
      <div slot="title">This is a destructive action</div>
      <div slot="message">Be sure you know what you are doing, folks.</div>
    </calcite-notice>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
