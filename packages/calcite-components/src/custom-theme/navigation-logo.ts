import { html } from "../../support/formatting";

export const navigationLogoTokens = {
  calciteNavigationLogoBackgroundColor: "",
  calciteNavigationLogoBorderColor: "",
  calciteNavigationLogoBackgroundColorPress: "",
  calciteNavigationLogoBackgroundColorHover: "",
  calciteNavigationLogoDescriptionTextColor: "",
  calciteNavigationLogoHeadingTextColor: "",
  calciteNavigationLogoIconColorPress: "",
};

const navigationLogo = (active = false): string => html`
  <calcite-navigation-logo
    heading="Walt's Chips"
    description="Eastern Potato Chip Company"
    icon="layers"
    label="Walt's Chips"
    ${active ? active : ""}
  >
  </calcite-navigation-logo>
`;

export const navigationLogos = html` ${navigationLogo(true)} ${navigationLogo()} `;
