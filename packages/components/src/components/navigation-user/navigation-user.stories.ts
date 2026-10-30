import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import type { NavigationUser } from "./navigation-user";
import "../navigation/navigation"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature
import "./navigation-user"; // Force Vite to statically trace the file for Chromatic's TurboSnap feature

type NavigationUserStoryArgs = Pick<
  NavigationUser,
  "active" | "fullName" | "textDisabled" | "thumbnail" | "userId" | "username"
>;

export default {
  title: "Components/Navigation/Navigation User",
  args: {
    active: true,
    fullName: "Edward Abbey",
    textDisabled: false,
    thumbnail: "",
    userId: "",
    username: "eabbey_123",
  },
};

export const simple = (args: NavigationUserStoryArgs): string => html`
  <calcite-navigation-user
    ${boolean("active", args.active)}
    full-name="${args.fullName}"
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

export const slottedUsernameAndFullName = (): string => html`
  <style>
    div.container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 400px;
    }
  </style>
  <div class="container">
    <calcite-navigation>
      <calcite-navigation-logo icon="education" slot="logo" heading="ArcGIS Online "> </calcite-navigation-logo>
      <calcite-navigation-user slot="user">
        <calcite-text slot="full-name">Catherine Zeta-Jones</calcite-text>
        <calcite-text slot="username">catherine_zetajones</calcite-text>
      </calcite-navigation-user>
    </calcite-navigation>
    <calcite-navigation>
      <calcite-navigation-logo icon="education" slot="logo" heading="ArcGIS Online "> </calcite-navigation-logo>
      <calcite-navigation-user slot="user">
        <calcite-text slot="full-name" truncate-position="end">Catherine Zeta-Jones</calcite-text>
        <calcite-text slot="username" truncate-position="end">catherine_zetajones</calcite-text>
      </calcite-navigation-user>
    </calcite-navigation>
    <calcite-navigation>
      <calcite-navigation-logo icon="education" slot="logo" heading="ArcGIS Online "> </calcite-navigation-logo>
      <calcite-navigation-user slot="user">
        <calcite-text slot="full-name" truncate-position="middle">Catherine Zeta-Jones</calcite-text>
        <calcite-text slot="username" truncate-position="middle">catherine_zetajones</calcite-text>
      </calcite-navigation-user>
    </calcite-navigation>
    <calcite-navigation>
      <calcite-navigation-logo icon="education" slot="logo" heading="ArcGIS Online "> </calcite-navigation-logo>
      <calcite-navigation-user slot="user">
        <calcite-text slot="full-name" max-lines="1">Catherine Zeta-Jones</calcite-text>
        <calcite-text slot="username" max-lines="1">catherine_zetajones</calcite-text>
      </calcite-navigation-user>
    </calcite-navigation>
  </div>
`;
