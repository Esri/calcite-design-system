import { setCSSVariables } from "../src/tests/utils/cssTokenValues";
import { html } from "../support/formatting";
import {
  actionBar,
  actionMenu,
  actionPad,
  actionTokens,
  actionBarTokens,
  actionMenuTokens,
  actionPadTokens,
  actionGroupTokens,
} from "./custom-theme/action";
import { alertTokens, alert } from "./custom-theme/alert";
import { accordionItemTokens } from "./custom-theme/accordion-item";
import { accordion, accordionTokens } from "./custom-theme/accordion";
import { buttons } from "./custom-theme/button";
import { calciteSwitch } from "./custom-theme/switch";
import { card, cardThumbnail, cardTokens } from "./custom-theme/card";
import { checkbox, checkboxTokens } from "./custom-theme/checkbox";
import { chips, chipTokens } from "./custom-theme/chips";
import { datePicker } from "./custom-theme/date-picker";
import { dropdown } from "./custom-theme/dropdown";
import { handle, handleTokens } from "./custom-theme/handle";
import { icon } from "./custom-theme/icon";
import { input, inputTokens } from "./custom-theme/input";
import { inputNumber } from "./custom-theme/input-number";
import { inputText } from "./custom-theme/input-text";
import { loader } from "./custom-theme/loader";
import { notices } from "./custom-theme/notice";
import { pagination } from "./custom-theme/pagination";
import { popover, popoverTokens } from "./custom-theme/popover";
import { progress, progressTokens } from "./custom-theme/progress";
import { segmentedControl } from "./custom-theme/segmented-control";
import { slider } from "./custom-theme/slider";
import { tabs } from "./custom-theme/tabs";
import { textArea, textAreaTokens } from "./custom-theme/text-area";
import { avatarIcon, avatarInitials, avatarThumbnail, avatarTokens } from "./custom-theme/avatar";
import { tileTokens, tile } from "./custom-theme/tile";

const globalTokens = {
  calciteColorBrand: "#007ac2",
  calciteColorBrandHover: "#00619b",
  calciteColorBrandPress: "#004874",
  calciteColorStatusInfo: "#00619b",
  calciteColorStatusSuccess: "#35ac46",
  calciteColorStatusWarning: "#edd317",
  calciteColorStatusDanger: "#d83020",
  calciteColorStatusDangerHover: "#a82b1e",
  calciteColorStatusDangerPress: "#7c1d13",
  calciteColorBackground: "#f8f8f8",
  calciteColorForeground1: "#ffffff",
  calciteColorForeground2: "#f3f3f3",
  calciteColorForeground3: "#eaeaea",
  calciteColorText1: "#151515",
  calciteColorText2: "#4a4a4a",
  calciteColorText3: "#6a6a6a",
  calciteColorTextInverse: "#ffffff",
  calciteColorTextLink: "#00619b",
  calciteColorBorder1: "#cacaca",
  calciteColorBorder2: "#d4d4d4",
  calciteColorBorder3: "#dfdfdf",
  calciteColorBorderInput: "#949494",
  calciteUiIconColor: "currentColor",
};

function convertToParamCase(str) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function customTheme(args: Record<string, string>, useTestValues = false) {
  if (useTestValues) {
    const tokensAsCSSVars = Object.keys(args).map((tokenName) => `--${convertToParamCase(tokenName)}`);
    return setCSSVariables(tokensAsCSSVars, " ");
  } else {
    return Object.entries(args)
      .map(([tokenName, tokenValue]) =>
        !!tokenValue && tokenValue !== "" ? `--${convertToParamCase(tokenName)}: ${tokenValue};` : null,
      )
      .filter((token) => token)
      .join("");
  }
}

const kitchenSink = (args: Record<string, string>, useTestValues = false) =>
  html`<div style="${customTheme(args, useTestValues)}">
    <style>
      .demo {
        display: flex;
        align-items: flex-start;
      }
      .demo-column {
        flex: 0;
        width: 320px;
      }
      .demo-column + .demo-column {
        margin-left: 4rem;
      }
      .demo-column > * {
        margin-bottom: 2rem;
      }
    </style>
    <div class="demo">
        <div class="demo-column">
          ${accordion} ${actionBar} ${notices} ${segmentedControl}
          <div style="display: flex">
            ${actionPad}
            <div style="width: 40px; height: 40px;">${actionMenu}</div>
            ${icon}
          </div>
          ${input} ${inputNumber} ${inputText}
        </div>
        <div class="demo-column">
          <div>${card}</div>
          ${cardThumbnail}
          <div>${dropdown} ${buttons}</div>
          <div>${checkbox}</div>
          ${chips} ${pagination} ${slider}
        </div>
        <div class="demo-column">${datePicker} ${tabs} ${loader} ${calciteSwitch} ${avatarIcon} ${avatarInitials} ${avatarThumbnail} ${progress} ${handle} ${textArea} ${popover} ${tile}</div>
        ${alert}
      </div>
    </div>
  </div>`;

const componentTokens = {
  ...globalTokens,
  ...accordionTokens,
  ...accordionItemTokens,
  ...actionTokens,
  ...actionBarTokens,
  ...actionGroupTokens,
  ...actionMenuTokens,
  ...actionPadTokens,
  ...avatarTokens,
  ...cardTokens,
  ...alertTokens,
  ...chipTokens,
  ...checkboxTokens,
  ...handleTokens,
  ...popoverTokens,
  ...progressTokens,
  ...inputTokens,
  ...textAreaTokens,
  ...tileTokens,
};

export default {
  title: "Theming/Custom Theme",
  args: {
    ...globalTokens,
    ...componentTokens,
  },
};

export const themingInteractive = (args: Record<string, string>): string => {
  return kitchenSink(args);
};

export const theming = (): string => {
  return kitchenSink(
    {
      ...componentTokens,
    },
    true,
  );
};
