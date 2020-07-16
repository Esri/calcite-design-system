
import { JSXInternal } from "preact/src/jsx";
import { JSX } from "./components";

declare module "preact/src/jsx" {
  namespace JSXInternal {
    interface IntrinsicElements {
      
      "calcite-accordion": Omit<JSX.CalciteAccordion, "onCalciteAccordionChange"> & JSXInternal.HTMLAttributes<HTMLCalciteAccordionElement> & {
        "oncalciteAccordionChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-accordion-item": Omit<JSX.CalciteAccordionItem, "onCalciteAccordionItemKeyEvent" | "onCalciteAccordionItemSelect" | "onCalciteAccordionItemClose" | "onCalciteAccordionItemRegister"> & JSXInternal.HTMLAttributes<HTMLCalciteAccordionItemElement> & {
        "oncalciteAccordionItemKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteAccordionItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteAccordionItemClose"?: (event: CustomEvent<any>) => void;
        "oncalciteAccordionItemRegister"?: (event: CustomEvent<any>) => void;
      }

      "calcite-alert": Omit<JSX.CalciteAlert, "onCalciteAlertClose" | "onCalciteAlertOpen" | "onCalciteAlertSync" | "onCalciteAlertRegister"> & JSXInternal.HTMLAttributes<HTMLCalciteAlertElement> & {
        "oncalciteAlertClose"?: (event: CustomEvent<any>) => void;
        "oncalciteAlertOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteAlertSync"?: (event: CustomEvent<any>) => void;
        "oncalciteAlertRegister"?: (event: CustomEvent<any>) => void;
      }

      "calcite-button": JSX.CalciteButton & JSXInternal.HTMLAttributes<HTMLCalciteButtonElement>

      "calcite-card": Omit<JSX.CalciteCard, "onCalciteCardSelect"> & JSXInternal.HTMLAttributes<HTMLCalciteCardElement> & {
        "oncalciteCardSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-checkbox": Omit<JSX.CalciteCheckbox, "onCalciteCheckboxChange"> & JSXInternal.HTMLAttributes<HTMLCalciteCheckboxElement> & {
        "oncalciteCheckboxChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-chip": Omit<JSX.CalciteChip, "onCalciteChipDismiss"> & JSXInternal.HTMLAttributes<HTMLCalciteChipElement> & {
        "oncalciteChipDismiss"?: (event: CustomEvent<any>) => void;
      }

      "calcite-combobox": Omit<JSX.CalciteCombobox, "onCalciteLookupChange" | "onCalciteComboboxChipDismiss"> & JSXInternal.HTMLAttributes<HTMLCalciteComboboxElement> & {
        "oncalciteLookupChange"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxChipDismiss"?: (event: CustomEvent<any>) => void;
      }

      "calcite-combobox-item": Omit<JSX.CalciteComboboxItem, "onCalciteComboboxItemChange" | "onCalciteComboboxItemKeyEvent"> & JSXInternal.HTMLAttributes<HTMLCalciteComboboxItemElement> & {
        "oncalciteComboboxItemChange"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxItemKeyEvent"?: (event: CustomEvent<any>) => void;
      }

      "calcite-date": Omit<JSX.CalciteDate, "onCalciteDateChange"> & JSXInternal.HTMLAttributes<HTMLCalciteDateElement> & {
        "oncalciteDateChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-date-day": Omit<JSX.CalciteDateDay, "onCalciteDaySelect"> & JSXInternal.HTMLAttributes<HTMLCalciteDateDayElement> & {
        "oncalciteDaySelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-date-month": Omit<JSX.CalciteDateMonth, "onCalciteDateSelect" | "onCalciteActiveDateChange"> & JSXInternal.HTMLAttributes<HTMLCalciteDateMonthElement> & {
        "oncalciteDateSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteActiveDateChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-date-month-header": Omit<JSX.CalciteDateMonthHeader, "onCalciteActiveDateChange"> & JSXInternal.HTMLAttributes<HTMLCalciteDateMonthHeaderElement> & {
        "oncalciteActiveDateChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-dropdown": Omit<JSX.CalciteDropdown, "onCalciteDropdownSelect" | "onCalciteDropdownOpen" | "onCalciteDropdownClose"> & JSXInternal.HTMLAttributes<HTMLCalciteDropdownElement> & {
        "oncalciteDropdownSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteDropdownOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteDropdownClose"?: (event: CustomEvent<any>) => void;
      }

      "calcite-dropdown-group": Omit<JSX.CalciteDropdownGroup, "onCalciteDropdownGroupRegister" | "onCalciteDropdownItemChange"> & JSXInternal.HTMLAttributes<HTMLCalciteDropdownGroupElement> & {
        "oncalciteDropdownGroupRegister"?: (event: CustomEvent<any>) => void;
        "oncalciteDropdownItemChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-dropdown-item": Omit<JSX.CalciteDropdownItem, "onCalciteDropdownItemSelect" | "onCalciteDropdownItemKeyEvent" | "onCalciteDropdownItemRegister" | "onCalciteDropdownCloseRequest"> & JSXInternal.HTMLAttributes<HTMLCalciteDropdownItemElement> & {
        "oncalciteDropdownItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteDropdownItemKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteDropdownItemRegister"?: (event: CustomEvent<any>) => void;
        "oncalciteDropdownCloseRequest"?: (event: CustomEvent<any>) => void;
      }

      "calcite-graph": JSX.CalciteGraph & JSXInternal.HTMLAttributes<HTMLCalciteGraphElement>

      "calcite-icon": JSX.CalciteIcon & JSXInternal.HTMLAttributes<HTMLCalciteIconElement>

      "calcite-input": Omit<JSX.CalciteInput, "onCalciteInputFocus" | "onCalciteInputBlur" | "onCalciteInputInput"> & JSXInternal.HTMLAttributes<HTMLCalciteInputElement> & {
        "oncalciteInputFocus"?: (event: CustomEvent<any>) => void;
        "oncalciteInputBlur"?: (event: CustomEvent<any>) => void;
        "oncalciteInputInput"?: (event: CustomEvent<any>) => void;
      }

      "calcite-input-message": JSX.CalciteInputMessage & JSXInternal.HTMLAttributes<HTMLCalciteInputMessageElement>

      "calcite-label": Omit<JSX.CalciteLabel, "onCalciteLabelFocus"> & JSXInternal.HTMLAttributes<HTMLCalciteLabelElement> & {
        "oncalciteLabelFocus"?: (event: CustomEvent<any>) => void;
      }

      "calcite-link": JSX.CalciteLink & JSXInternal.HTMLAttributes<HTMLCalciteLinkElement>

      "calcite-loader": JSX.CalciteLoader & JSXInternal.HTMLAttributes<HTMLCalciteLoaderElement>

      "calcite-modal": Omit<JSX.CalciteModal, "onCalciteModalOpen" | "onCalciteModalClose"> & JSXInternal.HTMLAttributes<HTMLCalciteModalElement> & {
        "oncalciteModalOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteModalClose"?: (event: CustomEvent<any>) => void;
      }

      "calcite-notice": Omit<JSX.CalciteNotice, "onCalciteNoticeClose" | "onCalciteNoticeOpen"> & JSXInternal.HTMLAttributes<HTMLCalciteNoticeElement> & {
        "oncalciteNoticeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteNoticeOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-pagination": Omit<JSX.CalcitePagination, "onCalcitePaginationUpdate"> & JSXInternal.HTMLAttributes<HTMLCalcitePaginationElement> & {
        "oncalcitePaginationUpdate"?: (event: CustomEvent<any>) => void;
      }

      "calcite-popover": Omit<JSX.CalcitePopover, "onCalcitePopoverClose" | "onCalcitePopoverOpen"> & JSXInternal.HTMLAttributes<HTMLCalcitePopoverElement> & {
        "oncalcitePopoverClose"?: (event: CustomEvent<any>) => void;
        "oncalcitePopoverOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-popover-manager": JSX.CalcitePopoverManager & JSXInternal.HTMLAttributes<HTMLCalcitePopoverManagerElement>

      "calcite-progress": JSX.CalciteProgress & JSXInternal.HTMLAttributes<HTMLCalciteProgressElement>

      "calcite-radio-button": Omit<JSX.CalciteRadioButton, "onCalciteRadioButtonChange"> & JSXInternal.HTMLAttributes<HTMLCalciteRadioButtonElement> & {
        "oncalciteRadioButtonChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-radio-button-group": JSX.CalciteRadioButtonGroup & JSXInternal.HTMLAttributes<HTMLCalciteRadioButtonGroupElement>

      "calcite-radio-group": Omit<JSX.CalciteRadioGroup, "onCalciteRadioGroupChange"> & JSXInternal.HTMLAttributes<HTMLCalciteRadioGroupElement> & {
        "oncalciteRadioGroupChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-radio-group-item": Omit<JSX.CalciteRadioGroupItem, "onCalciteRadioGroupItemChange"> & JSXInternal.HTMLAttributes<HTMLCalciteRadioGroupItemElement> & {
        "oncalciteRadioGroupItemChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-scrim": JSX.CalciteScrim & JSXInternal.HTMLAttributes<HTMLCalciteScrimElement>

      "calcite-slider": Omit<JSX.CalciteSlider, "onCalciteSliderUpdate"> & JSXInternal.HTMLAttributes<HTMLCalciteSliderElement> & {
        "oncalciteSliderUpdate"?: (event: CustomEvent<any>) => void;
      }

      "calcite-split-button": Omit<JSX.CalciteSplitButton, "onCalciteSplitButtonPrimaryClick"> & JSXInternal.HTMLAttributes<HTMLCalciteSplitButtonElement> & {
        "oncalciteSplitButtonPrimaryClick"?: (event: CustomEvent<any>) => void;
      }

      "calcite-stepper": Omit<JSX.CalciteStepper, "onCalciteStepperItemChange"> & JSXInternal.HTMLAttributes<HTMLCalciteStepperElement> & {
        "oncalciteStepperItemChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-stepper-item": Omit<JSX.CalciteStepperItem, "onCalciteStepperItemKeyEvent" | "onCalciteStepperItemSelect" | "onCalciteStepperItemRegister"> & JSXInternal.HTMLAttributes<HTMLCalciteStepperItemElement> & {
        "oncalciteStepperItemKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteStepperItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteStepperItemRegister"?: (event: CustomEvent<any>) => void;
      }

      "calcite-switch": Omit<JSX.CalciteSwitch, "onCalciteSwitchChange"> & JSXInternal.HTMLAttributes<HTMLCalciteSwitchElement> & {
        "oncalciteSwitchChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tab": Omit<JSX.CalciteTab, "onCalciteTabRegister" | "onCalciteTabUnregister"> & JSXInternal.HTMLAttributes<HTMLCalciteTabElement> & {
        "oncalciteTabRegister"?: (event: CustomEvent<any>) => void;
        "oncalciteTabUnregister"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tab-nav": Omit<JSX.CalciteTabNav, "onCalciteTabChange"> & JSXInternal.HTMLAttributes<HTMLCalciteTabNavElement> & {
        "oncalciteTabChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tab-title": Omit<JSX.CalciteTabTitle, "onCalciteTabsActivate" | "onCalciteTabsFocusNext" | "onCalciteTabsFocusPrevious" | "onCalciteTabTitleRegister" | "onCalciteTabTitleUnregister"> & JSXInternal.HTMLAttributes<HTMLCalciteTabTitleElement> & {
        "oncalciteTabsActivate"?: (event: CustomEvent<any>) => void;
        "oncalciteTabsFocusNext"?: (event: CustomEvent<any>) => void;
        "oncalciteTabsFocusPrevious"?: (event: CustomEvent<any>) => void;
        "oncalciteTabTitleRegister"?: (event: CustomEvent<any>) => void;
        "oncalciteTabTitleUnregister"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tabs": JSX.CalciteTabs & JSXInternal.HTMLAttributes<HTMLCalciteTabsElement>

      "calcite-tooltip": JSX.CalciteTooltip & JSXInternal.HTMLAttributes<HTMLCalciteTooltipElement>

      "calcite-tooltip-manager": JSX.CalciteTooltipManager & JSXInternal.HTMLAttributes<HTMLCalciteTooltipManagerElement>

      "calcite-tree": Omit<JSX.CalciteTree, "onCalciteTreeSelect"> & JSXInternal.HTMLAttributes<HTMLCalciteTreeElement> & {
        "oncalciteTreeSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tree-item": Omit<JSX.CalciteTreeItem, "onCalciteTreeItemSelect"> & JSXInternal.HTMLAttributes<HTMLCalciteTreeItemElement> & {
        "oncalciteTreeItemSelect"?: (event: CustomEvent<any>) => void;
      };
    }
  }
}
  