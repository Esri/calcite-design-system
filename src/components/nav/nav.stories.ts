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

export const primarySlots_TestOnly = (): string =>
  html`
    <calcite-shell>
      <calcite-nav slot="header" nav-action>
        <calcite-chip slot="logo"> logo </calcite-chip>
        <calcite-chip slot="primary-content-start"> content </calcite-chip>
        <calcite-chip slot="primary-content-center"> content </calcite-chip>
        <calcite-chip slot="primary-content-end"> content </calcite-chip>
        <calcite-chip slot="user"> user </calcite-chip>
      </calcite-nav>
    </calcite-shell>
  `;

export const primaryAndSecondarySlots_TestOnly = (): string =>
  html`
    <calcite-shell>
      <calcite-nav slot="header" nav-action>
        <calcite-chip slot="logo"> logo </calcite-chip>
        <calcite-action slot="nav-action" text="menu" icon="hamburger"> </calcite-action>
        <calcite-chip slot="primary-content-start"> content </calcite-chip>
        <calcite-chip slot="primary-content-center"> content </calcite-chip>
        <calcite-chip slot="primary-content-end"> content </calcite-chip>
        <calcite-chip slot="user"> user </calcite-chip>
        <calcite-chip slot="secondary-content-start"> content </calcite-chip>
        <calcite-chip slot="secondary-content-end"> content </calcite-chip>
      </calcite-nav>
    </calcite-shell>
  `;

export const allSlots_TestOnly = (): string =>
  html`
    <calcite-shell>
      <calcite-nav slot="header">
        <calcite-chip slot="nav-action"> Action </calcite-chip>
        <calcite-chip slot="logo"> logo </calcite-chip>
        <calcite-action slot="nav-action" text="menu" icon="hamburger"> </calcite-action>
        <calcite-chip slot="primary-content-start"> content </calcite-chip>
        <calcite-chip slot="primary-content-center"> content </calcite-chip>
        <calcite-chip slot="primary-content-end"> content </calcite-chip>
        <calcite-chip slot="user"> user </calcite-chip>
        <calcite-chip slot="secondary-content-start"> content </calcite-chip>
        <calcite-chip slot="secondary-content-end"> content </calcite-chip>
        <calcite-chip slot="tertiary-content-start"> content </calcite-chip>
        <calcite-chip slot="tertiary-content-end"> content </calcite-chip>
      </calcite-nav>
    </calcite-shell>
  `;

export const allSlots_darkModeRTL_TestOnly = (): string =>
  html`
      <div style="class="calcite-mode-dark" dir="rtl">
        <calcite-shell>
          <calcite-nav slot="header">
            <calcite-chip slot="nav-action"> Action </calcite-chip>
            <calcite-chip slot="logo"> logo </calcite-chip>
            <calcite-action slot="nav-action" text="menu" icon="hamburger"> </calcite-action>
            <calcite-chip slot="primary-content-start"> content </calcite-chip>
            <calcite-chip slot="primary-content-center"> content </calcite-chip>
            <calcite-chip slot="primary-content-end"> content </calcite-chip>
            <calcite-chip slot="user"> user </calcite-chip>
            <calcite-chip slot="secondary-content-start"> content </calcite-chip>
            <calcite-chip slot="secondary-content-end"> content </calcite-chip>
            <calcite-chip slot="tertiary-content-start"> content </calcite-chip>
            <calcite-chip slot="tertiary-content-end"> content </calcite-chip>
          </calcite-nav>
        </calcite-shell>
      </div>
    `;

export const withBothNavActionPropAndSlot_TestOnly = (): string =>
  html`
      <div style="class="calcite-mode-dark" dir="rtl">
        <calcite-shell>
          <calcite-nav slot="header" nav-action>
            <calcite-chip slot="logo"> logo </calcite-chip>
            <calcite-action slot="nav-action" text="menu" icon="layers"> </calcite-action>
            <calcite-chip slot="primary-content-start"> content </calcite-chip>
          </calcite-nav>
        </calcite-shell>
      </div>
    `;
