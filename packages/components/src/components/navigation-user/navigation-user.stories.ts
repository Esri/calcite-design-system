import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { CalciteNavigationUser } from "./navigation-user";

type NavigationUserStoryArgs = Pick<
  CalciteNavigationUser,
  "fullName" | "username" | "thumbnail" | "userId" | "textDisabled" | "active"
>;

export default {
  title: "Components/Navigation/Navigation User",
  args: {
    fullName: "Edward Abbey",
    userName: "eabbey_123",
    thumbnail: "",
    userId: "",
    textDisabled: false,
    active: true,
  },
};

export const simple = (args: NavigationUserStoryArgs): string => html`
  <calcite-navigation-user
    slot="user"
    full-name="${args.fullName}"
    username="${args.username}"
    thumbnail="${args.thumbnail}"
    user-id="${args.userId}"
    ${boolean("text-disabled", args.textDisabled)}
    ${boolean("active", args.active)}
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
