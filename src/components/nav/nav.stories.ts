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
    <style>
      calcite-chip {
        align-self: center;
        margin: 0 8px;
      }
    </style>
    <calcite-shell>
      <calcite-nav slot="header">
        <calcite-chip-group slot="primary-content-center">
          <calcite-chip> nav item 1</calcite-chip>
          <calcite-chip> nav item 2</calcite-chip>
          <calcite-chip> nav item 3</calcite-chip>
        </calcite-chip-group>
      </calcite-nav>
    </calcite-shell>
  `;

export const primarySlots_TestOnly = (): string =>
  html`
    <style>
      calcite-chip {
        align-self: center;
        margin: 0 8px;
      }
    </style>
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
    <style>
      calcite-chip {
        align-self: center;
        margin: 0 8px;
      }
    </style>
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
    <style>
      calcite-chip {
        align-self: center;
        margin: 0 8px;
      }
    </style>
    <calcite-shell>
      <calcite-nav slot="header">
        <calcite-chip slot="nav-action"> Action </calcite-chip>
        <calcite-chip slot="logo"> logo </calcite-chip>
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
  <style>
      calcite-chip {
        align-self: center;
        margin: 0 8px;
      }
    </style>
      <div style="class="calcite-mode-dark" dir="rtl">
        <calcite-shell>
          <calcite-nav slot="header">
            <calcite-chip slot="nav-action"> Action </calcite-chip>
            <calcite-chip slot="logo"> logo </calcite-chip>
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
  <style>
      calcite-chip {
        align-self: center;
        margin: 0 8px;
      }
    </style>
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
