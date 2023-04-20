import { storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Nav/Nav",
  parameters: {
    notes: readme
  },
  ...storyFilters()
};

export const simple = (): string =>
  html`
    <calcite-shell>
      <calcite-nav slot="header">
        <calcite-menu slot="primary-content-center">
          <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
          <calcite-menu-item text="Example nav item 3" text-enabled></calcite-menu-item>
        </calcite-menu>
      </calcite-nav>
    </calcite-shell>
  `;

export const allSlots = (): string =>
  html`
    <calcite-shell>
      <calcite-nav slot="header">
        <calcite-menu slot="primary-content-start">
          <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="primary-content-center">
          <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="primary-content-end">
          <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="secondary-content-start">
          <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="secondary-content-end">
          <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="tertiary-content-start">
          <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="tertiary-content-end">
          <calcite-menu-item text="Example nav item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item text="Example nav item 2" text-enabled active></calcite-menu-item>
        </calcite-menu>
      </calcite-nav>
    </calcite-shell>
  `;
