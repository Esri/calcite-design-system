import { iconNames } from "../../../.storybook/helpers";
import { boolean, optionalAttribute } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { InputMessage } from "./input-message";
import "./input-message"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

const { scale, status: statusAttribute } = ATTRIBUTES;

type InputMessageStoryArgs = Pick<InputMessage, "icon" | "iconFlipRtl" | "scale" | "status"> & {
  message: string;
};

export default {
  title: "Components/InputMessage",
  args: {
    icon: "information",
    iconFlipRtl: false,
    message: "Message",
    scale: scale.defaultValue,
    status: statusAttribute.defaultValue,
  },
  argTypes: {
    icon: {
      options: ["", ...iconNames],
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
    status: {
      options: statusAttribute.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: InputMessageStoryArgs): string => html`
  <calcite-input-message
    ${optionalAttribute("icon", args.icon)}
    ${boolean("icon-flip-rtl", args.iconFlipRtl)}
    scale="${args.scale}"
    status="${args.status}"
    >${args.message}</calcite-input-message
  >
`;

export const status = (): string => html`
  <calcite-input-message status="invalid" icon="frown">Message</calcite-input-message>
  <calcite-input-message status="valid" icon="smile">Message</calcite-input-message>
  <calcite-input-message status="idle" icon="information">Message</calcite-input-message>
`;
