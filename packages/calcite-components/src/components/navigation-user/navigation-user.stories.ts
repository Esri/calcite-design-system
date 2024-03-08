import { boolean, storyFilters } from "../../../.storybook/helpers";
import { text } from "@storybook/addon-knobs";
import { html } from "../../../support/formatting";
import readme from "./readme.md";
import { placeholderImage } from "../../../.storybook/placeholderImage";

export default {
  title: "Components/Navigation/Navigation User",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-navigation-user
    slot="user"
    full-name="${text("full-name", "Edward Abbey")}"
    username="${text("username", "eabbey_123")}"
    thumbnail="${text("thumbnail", "")}"
    user-id="${text("user-id", "")}"
    ${boolean("text-disabled", false)}
    ${boolean("active", true)}
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
