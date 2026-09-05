import { withThemeByClassName } from "@storybook/addon-themes";
import { CSS_UTILITY } from "../../src/utils/resources";

export const theme = withThemeByClassName({
  themes: {
    auto: CSS_UTILITY.autoMode,
    light: CSS_UTILITY.lightMode,
    dark: CSS_UTILITY.darkMode,
  },
  defaultTheme: "light",
});
