import { html } from "../../support/formatting";
import { boolean } from "../../.storybook/utils";

export const navigationUserTokens = {
  calciteNavigationUserBackgroundColor: "",
  calciteNavigationUserAvatarCornerRadius: "",
  calciteNavigationUserAvatarColor: "",
  calciteNavigationAccentColor: "",
  calciteNavigationUserFullNameTextColor: "",
  calciteNavigationUserUserNameTextColor: "",
};

const navigationUser = (active = false): string => html`
  <calcite-navigation-user
    full-name="Wendell Berry"
    username="w_berry"
    ${boolean("active", active)}
  ></calcite-navigation-user>
`;

export const navigationUsers = html`${navigationUser(true)} ${navigationUser()}`;
