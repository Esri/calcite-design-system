import { html } from "../support/formatting";
import { setCSSVariables } from "./tests/utils/cssTokenValues";
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
import { autocomplete, autocompleteTokens } from "./custom-theme/autocomplete";
import { block, blockTokens } from "./custom-theme/block";
import { buttons } from "./custom-theme/button";
import { blockSection, blockSectionTokens } from "./custom-theme/block-section";
import { calciteSwitch } from "./custom-theme/switch";
import { card, cardThumbnail, cardTokens } from "./custom-theme/card";
import { checkbox, checkboxTokens } from "./custom-theme/checkbox";
import { chips, chipTokens } from "./custom-theme/chips";
import { comboboxItem, comboboxItemTokens, selectedComboboxItem } from "./custom-theme/combobox-item";
import { datePicker, datePickerRange, datePickerTokens } from "./custom-theme/date-picker";
import { dropdown, DropdownGroupTokens, DropdownItemTokens, DropdownTokens } from "./custom-theme/dropdown";
import { fab, fabLoading, fabTokens } from "./custom-theme/fab";
import { flow, flowTokens } from "./custom-theme/flow";
import { graph, graphTokens } from "./custom-theme/graph";
import { handle, handleTokens } from "./custom-theme/handle";
import { icon } from "./custom-theme/icon";
import { inlineEditable, inlineEditableTokens } from "./custom-theme/inline-editable";
import { input, inputTokens } from "./custom-theme/input";
import { inputMessage, inputMessageTokens } from "./custom-theme/input-message";
import { inputNumber } from "./custom-theme/input-number";
import { inputText } from "./custom-theme/input-text";
import { label, labelTokens } from "./custom-theme/label";
import { link, linkTokens } from "./custom-theme/link";
import { list, listTokens } from "./custom-theme/list";
import { loader, loaderTokens } from "./custom-theme/loader";
import { notice, noticeTokens } from "./custom-theme/notice";
import { pagination, paginationTokens } from "./custom-theme/pagination";
import { popover, popoverTokens } from "./custom-theme/popover";
import { progress, progressTokens } from "./custom-theme/progress";
import { segmentedControl, segmentedControlTokens } from "./custom-theme/segmented-control";
import { select, selectTokens } from "./custom-theme/select";
import { radioButton, radioButtonTokens } from "./custom-theme/radio-button";
import { rating, ratingTokens } from "./custom-theme/rating";
import { slider, sliderTokens } from "./custom-theme/slider";
import { switchTokens } from "./custom-theme/switch";
import { tabs, tabsBordered, tabsTokens } from "./custom-theme/tabs";
import { textArea, textAreaTokens } from "./custom-theme/text-area";
import { tooltip, tooltipTokens } from "./custom-theme/tooltip";
import { tree, treeTokens } from "./custom-theme/tree";
import { avatarIcon, avatarInitials, avatarThumbnail, avatarTokens } from "./custom-theme/avatar";
import { navigationLogoTokens, navigationLogos } from "./custom-theme/navigation-logo";
import { navigationUserTokens, navigationUsers } from "./custom-theme/navigation-user";
import { tileTokens, tile } from "./custom-theme/tile";
import { navigationTokens, navigation } from "./custom-theme/navigation";
import { menuItem, menuItemTokens } from "./custom-theme/menu-item";
import {
  comboboxTokens,
  comboboxWithPlaceHolderIcon,
  defaultCombobox,
  singleSelectCombobox,
} from "./custom-theme/combobox";
import { panel, panelTokens } from "./custom-theme/panel";
import { shellPanel, shellPanelTokens } from "./custom-theme/shell-panel";
import { meter, meterTokens } from "./custom-theme/meter";

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
      .demo-row {
        display: flex;
      }
      .demo-row > .demo-column {
        flex: 0 0 auto;
      }
    </style>
    <div class="demo">
      <div class="demo-column">
        ${accordion} ${actionBar} ${autocomplete} ${notice} ${segmentedControl}
        <div style="display: flex">
          ${actionPad}
          <div style="width: 40px; height: 40px;">${actionMenu}</div>
          ${icon}
        </div>
        ${inlineEditable} ${input} ${inputNumber} ${inputText} ${select} ${singleSelectCombobox}
        ${comboboxWithPlaceHolderIcon} ${defaultCombobox}
      </div>
      <div class="demo-column">
        <div>${card}</div>
        ${cardThumbnail}
        <div>${dropdown} ${buttons}</div>
        <div>${flow}</div>
        <div>${checkbox}</div>
        ${chips} ${pagination} ${slider} ${meter}
      </div>
      <div class="demo-column">
        ${tabs} ${tabsBordered} ${label} ${link} ${list} ${loader} ${calciteSwitch} ${avatarIcon} ${avatarInitials}
        ${avatarThumbnail} ${progress} ${handle} ${graph} ${textArea} ${popover} ${tile} ${tooltip} ${comboboxItem}
        ${selectedComboboxItem}
      </div>
      <div class="demo-column">
        ${navigation} ${navigationLogos} ${navigationUsers} ${blockSection} ${block} ${rating} ${panel} ${shellPanel}
      </div>
      <div class="demo-column"><div class="demo-column">${alert}</div></div>
      <div class="demo-column">${menuItem}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${datePicker}</div>
      <div class="demo-column">${datePickerRange}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${fab}</div>
      <div class="demo-column">${fabLoading}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${inputMessage}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${radioButton}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${tree}</div>
    </div>
  </div>`;

const componentTokens = {
  ...globalTokens,
  ...accordionItemTokens,
  ...accordionTokens,
  ...actionBarTokens,
  ...actionGroupTokens,
  ...actionMenuTokens,
  ...actionPadTokens,
  ...actionTokens,
  ...alertTokens,
  ...autocompleteTokens,
  ...avatarTokens,
  ...blockSectionTokens,
  ...blockTokens,
  ...cardTokens,
  ...checkboxTokens,
  ...chipTokens,
  ...comboboxItemTokens,
  ...comboboxTokens,
  ...datePickerTokens,
  ...DropdownTokens,
  ...DropdownItemTokens,
  ...DropdownGroupTokens,
  ...fabTokens,
  ...flowTokens,
  ...handleTokens,
  ...inlineEditableTokens,
  ...graphTokens,
  ...inputTokens,
  ...inputMessageTokens,
  ...labelTokens,
  ...linkTokens,
  ...listTokens,
  ...loaderTokens,
  ...navigationLogoTokens,
  ...navigationTokens,
  ...navigationUserTokens,
  ...noticeTokens,
  ...paginationTokens,
  ...panelTokens,
  ...popoverTokens,
  ...progressTokens,
  ...segmentedControlTokens,
  ...radioButtonTokens,
  ...ratingTokens,
  ...selectTokens,
  ...sliderTokens,
  ...switchTokens,
  ...tabsTokens,
  ...textAreaTokens,
  ...tileTokens,
  ...tooltipTokens,
  ...treeTokens,
  ...menuItemTokens,
  ...shellPanelTokens,
  ...meterTokens,
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
