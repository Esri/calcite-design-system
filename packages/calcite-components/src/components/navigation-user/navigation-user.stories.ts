import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { placeholderImage } from "../../../.storybook/placeholderImage";

interface NavigationUserArgs {
  fullName: string;
  userName: string;
  thumbnail: string;
  userId: string;
  textDisabled: boolean;
  active: boolean;
}

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

export const simple = (args: NavigationUserArgs): string => html`
  <calcite-navigation-user
    slot="user"
    full-name="${args.fullName}"
    username="${args.userName}"
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

export const theming_TestOnly = (): string => html`
  <style>
    calcite-navigation-user {
      --calcite-navigation-user-avatar-corner-radius: 1px;
      --calcite-navigation-user-avatar-text-color: red;
      --calcite-navigation-user-background-color: green;
      --calcite-navigation-user-border-color: yellow;
      --calcite-navigation-user-full-name-text-color: pink;
      --calcite-navigation-user-name-text-color: white;
    }

    calcite-navigation-user[active] {
      --calcite-navigation-user-background-color: skyblue;
      --calcite-navigation-user-border-color: red;
    }
  </style>

  <calcite-navigation-user
    full-name="Edward Abbey"
    username="eabbey_123"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
    slot="user"
  ></calcite-navigation-user>
  <calcite-navigation-user
    active
    full-name="Edward Abbey"
    username="eabbey_123"
    thumbnail="${placeholderImage({ width: 50, height: 50 })}"
    slot="user"
  ></calcite-navigation-user>
`;
