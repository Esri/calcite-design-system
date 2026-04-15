import { boolean } from "../../../.storybook/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../../support/formatting";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { CalciteNavigationUser } from "./navigation-user";
const { scale } = ATTRIBUTES;

type NavigationUserStoryArgs = Pick<
  CalciteNavigationUser,
  "active" | "fullName" | "scale" | "textDisabled" | "thumbnail" | "userId" | "username"
>;

export default {
  title: "Components/Navigation/Navigation User",
  args: {
    active: true,
    fullName: "Edward Abbey",
    scale: scale.defaultValue,
    textDisabled: false,
    thumbnail: "",
    userId: "",
    userName: "eabbey_123",
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: NavigationUserStoryArgs): string => html`
  <calcite-navigation-user
    ${boolean("active", args.active)}
    full-name="${args.fullName}"
    scale="${args.scale}"
    slot="user"
    ${boolean("text-disabled", args.textDisabled)}
    thumbnail="${args.thumbnail}"
    user-id="${args.userId}"
    username="${args.username}"
  />
`;

export const fullName = (): string => html`<calcite-navigation-user full-name="Edward Abbey" />`;

export const username = (): string => html`<calcite-navigation-user username="eabbey_123" />`;

export const thumbnail = (): string =>
  html`<calcite-navigation-user thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const fullNameAndThumbnail = (): string =>
  html`<calcite-navigation-user full-name="Edward Abbey" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const usernameAndThumbnail = (): string =>
  html`<calcite-navigation-user username="eabbey_123" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const All = (): string =>
  html`<calcite-navigation-user
    full-name="Edward Abbey"
    username="eabbey_123"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const slottedInNav = (): string => html`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-user
      full-name="Edward Abbey"
      username="eabbey_123"
      thumbnail="${placeholderImage({ width: 50, height: 50 })}"
      slot="user"
    />
  </calcite-navigation>
`;
