import { boolean, storyFilters } from "../../../.storybook/helpers";
import { text } from "@storybook/addon-knobs";
import { html } from "../../../support/formatting";
import readme from "./readme.md";
import { placeholderImage } from "../../../.storybook/placeholderImage";

export default {
  title: "Components/Nav/Nav User",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string =>
  html`<calcite-nav>
    <calcite-nav-user
      slot="user"
      full-name="${text("full-name", "Edward Abbey")}"
      username="${text("username", "eabbey_123")}"
      thumbnail="${text("thumbnail", "")}"
      user-id="${text("user-id", "")}"
      ${boolean("hide-text", false)}
      ${boolean("active", true)}
    />
  </calcite-nav>`;

export const fullName = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-user slot="user" full-name="Edward Abbey" />
  </calcite-nav>
</calcite-shell>`;

export const username_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-user slot="user" username="eabbey_123" />
  </calcite-nav>
</calcite-shell>`;

export const thumbnail_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-user slot="user" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />
  </calcite-nav>
</calcite-shell>`;

export const fullNameAndThumbnail_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-user slot="user" full-name="Edward Abbey" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />
  </calcite-nav>
</calcite-shell>`;

export const usernameAndThumbnail_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-user slot="user" username="eabbey_123" thumbnail="${placeholderImage({ width: 50, height: 50 })}" />
  </calcite-nav>
</calcite-shell>`;

export const All_TestOnly = (): string => html` <calcite-shell>
  <calcite-nav slot="header">
    <calcite-nav-user
      slot="user"
      full-name="Edward Abbey"
      username="eabbey_123"
      thumbnail="${placeholderImage({ width: 50, height: 50 })}"
    />
  </calcite-nav>
</calcite-shell>`;
