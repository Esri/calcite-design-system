import { html } from "../../support/formatting";
import { boolean } from "../../.storybook/utils";

export const navigationLogoTokens = {
  calciteNavigationAccentColor: "",
  calciteNavigationBackgroundColor: "",
  calciteNavigationLogoHeadingTextColor: "",
  calciteNavigationLogoTextColor: "",
};

const navigationLogo = (active = false): string => html`
  <calcite-navigation-logo
    heading="Walt's Chips"
    description="Eastern Potato Chip Company"
    icon="layers"
    label="Walt's Chips"
    ${boolean("active", active)}
  >
  </calcite-navigation-logo>
`;

export const navigationLogos = html` ${navigationLogo(true)} ${navigationLogo()} `;
