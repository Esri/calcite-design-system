import { storyFilters } from "../../../.storybook/helpers";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Navigation/Navigation",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-navigation>
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
`;

export const primarySlots_TestOnly = (): string => html`
  <calcite-navigation>
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-center">
      <calcite-menu-item text="Contact"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
`;

export const primaryAndSecondarySlots_TestOnly = (): string => html`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
    </calcite-navigation-logo>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Potatoes"></calcite-menu-item>
      <calcite-menu-item active text="Chips"></calcite-menu-item>
      <calcite-menu-item text="Employees"></calcite-menu-item>
      <calcite-menu-item text="Suppliers"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" text-enabled full-name="Walt McChipson"></calcite-navigation-user>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation slot="navigation-secondary">
      <calcite-menu slot="content-start">
        <calcite-menu-item icon-start="dashboard" text="Dashboard"></calcite-menu-item>
        <calcite-menu-item icon-start="utility-network-trace" text="Distributors"></calcite-menu-item>
        <calcite-menu-item icon-start="legend" text="Stockists"></calcite-menu-item>
        <calcite-menu-item active icon-start="credit-card" text="Sales"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="US Sales"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="International Sales"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
  </calcite-navigation>
`;

export const primaryWithAllLogoAndUserSlots_TestOnly = (): string =>
  html`
      <calcite-navigation style="--calcite-color-brand: #bf390f">
        <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
        </calcite-navigation-logo>
        <calcite-menu slot="content-start">
          <calcite-menu-item text="Potatoes"></calcite-menu-item>
          <calcite-menu-item active text="Chips"></calcite-menu-item>
          <calcite-menu-item text="Employees"></calcite-menu-item>
          <calcite-menu-item text="Suppliers"></calcite-menu-item>
        </calcite-menu>
        <calcite-navigation-user slot="user" full-name="Walt McChipson" username="m_chipson></calcite-navigation-user>
      </calcite-navigation>
    `;

export const allSlots_TestOnly = (): string => html`
  <calcite-navigation style="--calcite-color-brand: #bf390f">
    <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
    </calcite-navigation-logo>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Potatoes"></calcite-menu-item>
      <calcite-menu-item active text="Chips"></calcite-menu-item>
      <calcite-menu-item text="Employees"></calcite-menu-item>
      <calcite-menu-item text="Suppliers"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Walt McChipson"></calcite-navigation-user>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation slot="navigation-secondary">
      <calcite-menu slot="content-start">
        <calcite-menu-item icon-start="app-launcher" text="All" breadcrumb></calcite-menu-item>
        <calcite-menu-item icon-start="apps" text="Testing Flavors" breadcrumb></calcite-menu-item>
        <calcite-menu-item active text="Sorel Pesto"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item icon-start="book" text="Tasting Notes"></calcite-menu-item>
        <calcite-menu-item icon-start="legend" text="Ingredients"></calcite-menu-item>
        <calcite-menu-item active icon-start="activity-monitor" text="Health Benefits"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
    <calcite-navigation slot="navigation-tertiary">
      <calcite-menu slot="content-start">
        <calcite-menu-item text="Vitamins"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
      </calcite-menu>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="Vitamins"></calcite-menu-item>
        <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
      </calcite-menu>
    </calcite-navigation>
  </calcite-navigation>
`;

export const allSlots_darkModeRTL_TestOnly = (): string => html`
  <div class="calcite-mode-dark" dir="rtl">
    <calcite-navigation style="--calcite-color-brand: #bf390f">
      <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" slot="logo">
      </calcite-navigation-logo>
      <calcite-menu slot="content-start">
        <calcite-menu-item text="Potatoes"></calcite-menu-item>
        <calcite-menu-item active text="Chips"></calcite-menu-item>
        <calcite-menu-item text="Employees"></calcite-menu-item>
        <calcite-menu-item text="Suppliers"></calcite-menu-item>
      </calcite-menu>
      <calcite-navigation-user slot="user" full-name="Walt McChipson"></calcite-navigation-user>
      <calcite-menu slot="content-end">
        <calcite-menu-item text="Support"></calcite-menu-item>
      </calcite-menu>
      <calcite-navigation slot="navigation-secondary">
        <calcite-menu slot="content-start">
          <calcite-menu-item icon-start="app-launcher" text="All" breadcrumb></calcite-menu-item>
          <calcite-menu-item icon-start="apps" text="Testing Flavors" breadcrumb></calcite-menu-item>
          <calcite-menu-item active text="Sorel Pesto"> </calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="content-end">
          <calcite-menu-item icon-start="book" text="Tasting Notes"></calcite-menu-item>
          <calcite-menu-item icon-start="legend" text="Ingredients"></calcite-menu-item>
          <calcite-menu-item active icon-start="activity-monitor" text="Health Benefits"></calcite-menu-item>
        </calcite-menu>
      </calcite-navigation>
      <calcite-navigation slot="navigation-tertiary">
        <calcite-menu slot="content-start">
          <calcite-menu-item text="Vitamins"></calcite-menu-item>
          <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
        </calcite-menu>
        <calcite-menu slot="content-end">
          <calcite-menu-item text="Vitamins"></calcite-menu-item>
          <calcite-menu-item active text-enabled text="Minerals"></calcite-menu-item>
        </calcite-menu>
      </calcite-navigation>
    </calcite-navigation>
  </div>
`;

export const withBothNavActionPropAndSlot_TestOnly = (): string => html`
  <calcite-navigation navigation-action>
    <calcite-action icon="layers" appearance="solid" slot="navigation-action" text="anvesh" scale="m"></calcite-action>
    <calcite-navigation-logo slot="logo" heading="Walt's Chips"></calcite-navigation-logo>
    <calcite-menu slot="content-end">
      <calcite-menu-item text="Support"></calcite-menu-item>
      <calcite-menu-item icon-start="services" text="Sales"></calcite-menu-item>
    </calcite-menu>
    <calcite-menu slot="content-start">
      <calcite-menu-item text="Groups"></calcite-menu-item>
      <calcite-menu-item active icon-start="gallery" text="Gallery" text-enabled></calcite-menu-item>
      <calcite-menu-item icon-end="map" text="Map"></calcite-menu-item>
      <calcite-menu-item icon-start="superimpose" text="Sample Name"></calcite-menu-item>
    </calcite-menu>
    <calcite-navigation-user slot="user" full-name="Allen Iverson"></calcite-navigation-user>
  </calcite-navigation>
`;

export const WithNoSlottedContent_TestOnly = (): string => html`<calcite-navigation></calcite-navigation>`;
