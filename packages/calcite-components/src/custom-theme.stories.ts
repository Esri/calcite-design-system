import { accordion } from "./custom-theme/accordion";
import { buttons } from "./custom-theme/button";
import { card, tokens as cardTokens } from "./custom-theme/card";
import { checkbox } from "./custom-theme/checkbox";
import { chips } from "./custom-theme/chips";
import { datePicker } from "./custom-theme/datePicker";
import { dropdown } from "./custom-theme/dropdown";
import { icon } from "./custom-theme/icon";
import { loader } from "./custom-theme/loader";
import { notices } from "./custom-theme/notice";
import { pagination } from "./custom-theme/pagination";
import { segmentedControl } from "./custom-theme/segmentedControl";
import { slider } from "./custom-theme/slider";
import { calciteSwitch } from "./custom-theme/switch";
import { tabs } from "./custom-theme/tabs";

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

function addTokens(args) {
  return Object.entries(args)
    .map(([tokenName, tokenValue]) =>
      !!tokenValue && tokenValue !== "" ? `--${convertToParamCase(tokenName)}: ${tokenValue};` : null,
    )
    .filter((token) => token)
    .join("");
}

export default {
  title: "Theming/Custom Theme",
  args: { ...globalTokens, ...cardTokens },
};

export const themingInteractive = (args: Record<string, string>): string => {
  return `<div style="${addTokens(args)}">
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
        ${accordion}
        ${notices}
        ${segmentedControl}
        ${icon}
      </div>
      <div class="demo-column">
        <div>
          ${card}
        </div>
        <div>
          ${dropdown}
          ${buttons}
        </div>
        <div>
          ${checkbox}
        </div>
        ${chips}
        ${pagination}
        ${slider}
      </div>
      <div class="demo-column">
        ${datePicker}
        ${tabs}
        ${loader}
        ${calciteSwitch}
      </div>
    </div>
  </div>`;
};
