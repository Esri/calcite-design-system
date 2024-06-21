import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { placeholderImage } from "../../../.storybook/placeholderImage";
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

export const username_TestOnly = (): string => html`<calcite-navigation-user username="eabbey_123" />`;

export const thumbnail_TestOnly = (): string =>
  html`<calcite-navigation-user thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const fullNameAndThumbnail_TestOnly = (): string =>
  html`<calcite-navigation-user full-name="Edward Abbey" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const usernameAndThumbnail_TestOnly = (): string =>
  html`<calcite-navigation-user username="eabbey_123" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />`;

export const All_TestOnly = (): string =>
  html`<calcite-navigation-user
    full-name="Edward Abbey"
    username="eabbey_123"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
  />`;

export const slottedInNav_TestOnly = (): string => html`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-user
      full-name="Edward Abbey"
      username="eabbey_123"
      thumbnail="${placeholderImage({ width: 50, height: 50 })}"
      slot="user"
    />
  </calcite-navigation>
`;
