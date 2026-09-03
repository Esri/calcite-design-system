/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as e } from "./formatting.js";
import { a as C } from "./modes.js";
import { s as x } from "./cssTokenValues.js";
import "./action-bar.js";
import "./action-group.js";
import "./action-menu.js";
import "./action-pad.js";
import "./action.js";
import "./alert.js";
import { S as r } from "./resources7.js";
import "./accordion-item.js";
import { s as I } from "./index3.js";
import "./accordion.js";
import "./tree-item.js";
import "./tree.js";
import "./autocomplete-item-group.js";
import "./autocomplete-item.js";
import { S as n } from "./autocomplete.js";
import "./block.js";
import "./icon.js";
import { p as B, q as w, r as P, u as f, v as A, w as S, x as H, y as D, z as $, A as y, B as F, C as R, D as L, E as M, F as N, G as E, H as G, k as z, h as W, s as O, I as U, i as _, J as V, K as j, L as Y, M as q, N as X, O as Z, e as Q, P as K, Q as J, R as ee, S as te, f as ce, g as ae, T as oe, j as ie, c as le, U as re, b as ne, l as se, t as de, n as pe, d as ue, V as me, o as be, m as Ce, a as ge } from "./color-picker2.js";
import "./block-section.js";
import "./label2.js";
import "./switch.js";
import "./checkbox.js";
import "./chip.js";
import "./combobox-item.js";
import "./button.js";
import "./dropdown-group.js";
import "./dropdown-item.js";
import "./dropdown.js";
import "./fab.js";
import "./filter2.js";
import "./flow-item.js";
import "./flow.js";
import "./graph.js";
import "./handle.js";
import "./inline-editable.js";
import "./input.js";
import "./input-date-picker.js";
import "./input-message.js";
import "./link.js";
import "./list-item-group.js";
import "./list-item.js";
import "./list.js";
import "./loader.js";
import "./notice.js";
import "./pagination.js";
import "./popover.js";
import "./progress.js";
import "./stepper-item.js";
import "./stepper.js";
import "./radio-button.js";
import "./radio-button-group.js";
import "./rating.js";
import "./tab-nav.js";
import "./tab-title.js";
import "./tab.js";
import "./tabs.js";
import "./text-area.js";
import "./tooltip.js";
import "./avatar.js";
import "./navigation-logo.js";
import { b as g } from "./utils3.js";
import "./navigation-user.js";
import "./time-picker.js";
import "./menu-item.js";
import "./menu.js";
import "./navigation.js";
import "./panel.js";
import "./shell-panel.js";
import "./meter.js";
import "./card.js";
import "./carousel-item.js";
import "./carousel.js";
import "./dialog.js";
import "./shell.js";
import "./swatch-group.js";
import "./swatch.js";
const ve = {
  calciteActionIndicatorColor: "",
  calciteActionBackgroundColor: "",
  calciteActionBackgroundColorHover: "",
  calciteActionBackgroundColorPressed: "",
  calciteActionTextColor: "",
  calciteActionTextColorPressed: "",
  calciteActionLoaderColor: ""
}, he = {
  calciteActionBarExpandedMaxWidth: "",
  calciteActionBarItemsSpace: ""
}, Te = e`<calcite-action-bar layout="horizontal" style="width:100%">
  <calcite-action-group>
    <calcite-action text="Add" icon="plus"> </calcite-action>
    <calcite-action text="Save" icon="save"> </calcite-action>
    <calcite-action text="Layers" icon="layers"> </calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Add" icon="plus"> </calcite-action>
    <calcite-action text="Save" active icon="save"> </calcite-action>
    <calcite-action text="Layers" icon="layers"> </calcite-action>
  </calcite-action-group>
  <calcite-action slot="actions-end" text="hello world" icon="layers"></calcite-action>
  <calcite-action slot="actions-end" text="hello world 2" icon="information"></calcite-action>
</calcite-action-bar>`, ke = {
  calciteActionGroupBorderColor: "",
  calciteActionGroupColumns: ""
}, xe = { calciteActionMenuItemsSpace: "" }, Ie = {
  calciteActionPadCornerRadius: "",
  calciteActionPadExpandedMaxWidth: "",
  calciteActionPadItemsSpace: ""
}, Be = e`<calcite-action-menu open>
  <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
  <calcite-action-group>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action
    ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
  </calcite-action-group>
  <calcite-action-group> <calcite-action text="Table" icon="table" text-enabled></calcite-action></calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Save" icon="save" text-enabled></calcite-action>
  </calcite-action-group>
</calcite-action-menu>`, we = e`<calcite-action-pad expanded>
  <calcite-action-group>
    <calcite-action text="Add to my custom action pad application" icon="plus"></calcite-action>
    <calcite-action text="Save to my custom action pad application" icon="save"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Layers in my custom action pad application" icon="layers"></calcite-action>
  </calcite-action-group>
</calcite-action-pad>`, Pe = {
  calciteAlertWidth: "",
  calciteAlertBackgroundColor: "",
  calciteAlertCornerRadius: "",
  calciteAlertShadow: ""
}, fe = e`<calcite-alert label="this is a default alert" scale="s" open>
  <div slot="${r.title}">Test title</div>
  <div slot="${r.message}">Test message</div>
</calcite-alert>`, Ae = {
  calciteAccordionItemContentSpace: "",
  calciteAccordionItemExpandIconColor: "",
  calciteAccordionItemHeaderBackgroundColor: "",
  calciteAccordionItemHeadingTextColor: "",
  calciteAccordionItemIconColorEnd: "",
  calciteAccordionItemIconColorStart: ""
}, Se = (t) => e`<calcite-accordion-item
    icon-end="car"
    icon-start="layers"
    heading="${t === 0 ? "Accordion Item" : `Accordion Item ${t + 1}`}"
    ><img src="${I({ width: 100, height: 50 })}" />
  </calcite-accordion-item>`, He = {
  calciteTreeTextColor: "",
  calciteTreeTextColorSelected: "",
  calciteTreeSelectedIconColor: ""
}, v = e`<calcite-tree lines>
  <calcite-tree-item> Child 1 </calcite-tree-item>
  <calcite-tree-item>
    Child 2
    <calcite-tree slot="children">
      <calcite-tree-item> Grandchild 1 </calcite-tree-item>
      <calcite-tree-item>
        Grandchild 2
        <calcite-tree slot="children">
          <calcite-tree-item> Great-Grandchild 1 </calcite-tree-item>
          <calcite-tree-item> Great-Grandchild 2 </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item> Child 3 </calcite-tree-item>
</calcite-tree>`, De = {
  calciteAccordionBackgroundColor: "",
  calciteAccordionBorderColor: "",
  calciteAccordionTextColor: "",
  calciteAccordionTextColorHover: "",
  calciteAccordionTextColorPress: ""
}, $e = e`<style>
    calcite-accordion-item:hover {
      --calcite-accordion-item-background-color: white;
    }
    calcite-accordion-item[expanded] {
      --calcite-accordion-item-header-background-color: #ccc;
    }</style
  ><calcite-accordion>
    ${[0, 1, 2, 3, 4].map((t) => Se(t)).join(`
`)}
    <calcite-accordion-item heading="Accordion Item 6" expanded>${v}</calcite-accordion-item>
  </calcite-accordion>`, ye = {
  calciteAutocompleteBackgroundColor: "",
  calciteAutocompleteBorderColor: "",
  calciteAutocompleteCornerRadius: "",
  calciteAutocompleteDescriptionTextColor: "",
  calciteAutocompleteHeadingTextColor: "",
  calciteAutocompleteTextColor: "",
  calciteAutocompleteInputBackgroundColor: "",
  calciteAutocompleteInputBorderColor: "",
  calciteAutocompleteInputCornerRadius: "",
  calciteAutocompleteInputShadow: "",
  calciteAutocompleteInputIconColor: "",
  calciteAutocompleteInputTextColor: "",
  calciteAutocompleteInputPlaceholderTextColor: "",
  calciteAutocompleteInputActionsBackgroundColor: "",
  calciteAutocompleteInputActionsBackgroundColorHover: "",
  calciteAutocompleteInputActionsBackgroundColorPress: "",
  calciteAutocompleteInputActionsIconColor: "",
  calciteAutocompleteInputActionsIconColorHover: "",
  calciteAutocompleteInputActionsIconColorPress: "",
  calciteAutocompleteInputLoadingBackgroundColor: "",
  calciteAutocompleteInputLoadingFillColor: "",
  calciteAutocompleteInputPrefixBackgroundColor: "",
  calciteAutocompleteInputPrefixTextColor: "",
  calciteAutocompleteInputSuffixBackgroundColor: "",
  calciteAutocompleteInputSuffixTextColor: ""
}, Fe = e`<calcite-autocomplete label="Pets">
  <div slot="${n.contentTop}">Top</div>
  <div slot="${n.contentBottom}">Bottom</div>
  <calcite-autocomplete-item-group heading="Dogs">
    <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
  </calcite-autocomplete-item-group>
  <calcite-autocomplete-item-group heading="Cats">
    <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
  </calcite-autocomplete-item-group>
</calcite-autocomplete>`, Re = {
  calciteBlockBorderColor: "",
  calciteBlockContentSpace: "",
  calciteBlockBackgroundColor: "",
  calciteBlockHeaderBackgroundColor: "",
  calciteBlockHeaderBackgroundColorHover: "",
  calciteBlockTextColor: "",
  calciteBlockHeadingTextColor: "",
  calciteBlockHeadingTextColorPress: "",
  calciteBlockDescriptionTextColor: "",
  calciteBlockIconColor: "",
  calciteBlockIconColorHover: "",
  calciteBlockIconStartColor: "",
  calciteBlockIconEndColor: "",
  calciteBlockCollapsibleIconColor: "",
  calciteBlockCollapsibleIconColorHover: ""
}, Le = e` <calcite-block
  heading="heading"
  description="description"
  open
  expandable
  icon-end="pen"
  icon-start="pen"
>
  <calcite-icon icon="compass" slot="content-start"></calcite-icon>
  <div>content</div>
</calcite-block>`, Me = {
  calciteBlockSectionBackgroundColor: "",
  calciteBlockSectionBorderColor: "",
  calciteBlockSectionContentSpace: "",
  calciteBlockSectionHeaderTextColor: "",
  calciteBlockSectionHeaderTextColorHover: "",
  calciteBlockSectionTextColor: ""
}, Ne = e`
  <calcite-block-section text="Planes" open icon-end="pen" icon-start="pen" text="a block-section">
    <p>Block section content</p>
  </calcite-block-section>
`, Ee = {
  calciteSwitchBackgroundColor: "",
  calciteSwitchBackgroundColorHover: "",
  calciteSwitchBorderColor: "",
  calciteSwitchHandleBorderColor: "",
  calciteSwitchHandleBackgroundColor: "",
  calciteSwitchHandleShadow: "",
  calciteSwitchCornerRadius: ""
}, Ge = e`
  <calcite-label layout="inline">
    <calcite-switch scale="m" checked></calcite-switch>
    Red switch scale medium
  </calcite-label>
`, ze = {
  calciteCheckboxSize: "",
  calciteCheckboxBorderColor: "",
  calciteCheckboxBorderColorHover: "",
  calciteCheckboxBorderColorPress: "",
  calciteCheckboxIconColor: ""
}, We = e`<label>
  <calcite-checkbox indeterminate></calcite-checkbox>
  Initially indeterminate and unchecked
</label>`, Oe = {
  calciteChipBackgroundColor: "",
  calciteChipBorderColor: "",
  calciteChipCloseIconColor: "",
  calciteChipCornerRadius: "",
  calciteChipIconColor: "",
  calciteChipSelectIconColorPress: "",
  calciteChipSelectIconColor: "",
  calciteChipTextColor: ""
}, Ue = e`<div>
    <calcite-chip>Neutral</calcite-chip>
    <calcite-chip kind="inverse">Inverse</calcite-chip>
    <calcite-chip kind="brand">Brand</calcite-chip>
  </div>
  <div>
    <calcite-chip appearance="outline-fill">Neutral</calcite-chip>
    <calcite-chip appearance="outline-fill" kind="inverse">Inverse</calcite-chip>
    <calcite-chip appearance="outline-fill" kind="brand">Brand</calcite-chip>
  </div>
  <div>
    <calcite-chip appearance="outline">Neutral</calcite-chip>
    <calcite-chip appearance="outline" kind="inverse">Inverse</calcite-chip>
    <calcite-chip appearance="outline" kind="brand">Brand</calcite-chip>
  </div>`, _e = {
  calciteComboboxTextColor: "",
  calciteComboboxTextColorHover: "",
  calciteComboboxItemBackgroundColorActive: "",
  calciteComboboxItemBackgroundColorHover: "",
  calciteComboboxSelectedIconColor: "",
  calciteComboboxDescriptionTextColor: "",
  calciteComboboxDescriptionTextColorPress: "",
  calciteComboboxHeadingTextColor: ""
}, Ve = e` <calcite-combobox-item
  value="Pikachu"
  heading="Pikachu"
  description="Pokemon's mascot"
  short-heading="0025"
  icon="tree"
></calcite-combobox-item>`, je = e`<calcite-combobox-item
  value="Pikachu"
  heading="Pikachu"
  description="Pokemon's mascot"
  short-heading="0025"
  icon="tree"
  selected
></calcite-combobox-item>`, Ye = {
  calciteDropdownWidth: "",
  calciteDropdownBackgroundColor: "",
  calciteDropdownMaxHeight: ""
}, qe = {
  calciteDropdownGroupBorderColor: "",
  calciteDropdownGroupTitleTextColor: ""
}, Xe = {
  calciteDropdownItemTextColor: "",
  calciteDropdownItemBackgroundColorHover: "",
  calciteDropdownItemBackgroundColorPress: "",
  calciteDropdownItemIconColorHover: "",
  calciteDropdownItemIconColorPress: "",
  calciteDropdownItemTextColorPress: ""
}, Ze = e`<calcite-dropdown open>
  <calcite-button slot="trigger">Primary</calcite-button>
  <calcite-dropdown-group group-title="View">
    <calcite-dropdown-item icon-start="list-bullet" icon-end="list-bullet" selected>List</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="grid">Grid</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-group>
    <calcite-dropdown-item href="esri.com" icon-start="home">Home</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>`, Qe = {
  calciteFabBackgroundColor: "",
  calciteFabBorderColor: "",
  calciteFabCornerRadius: "",
  calciteFabTextColor: "",
  calciteFabLoaderColor: "",
  calciteFabShadow: ""
}, Ke = e`<calcite-fab></calcite-fab>`, Je = e`<calcite-fab loading></calcite-fab>`, et = {
  calciteFilterContentSpace: "",
  calciteFilterInputBackgroundColor: "",
  calciteFilterInputBorderColor: "",
  calciteFilterInputCornerRadius: "",
  calciteFilterInputShadow: "",
  calciteFilterInputIconColor: "",
  calciteFilterInputTextColor: "",
  calciteFilterInputPlaceholderTextColor: "",
  calciteFilterInputActionsBackgroundColor: "",
  calciteFilterInputActionsBackgroundColorHover: "",
  calciteFilterInputActionsBackgroundColorPress: "",
  calciteFilterInputActionsIconColor: "",
  calciteFilterInputActionsIconColorHover: "",
  calciteFilterInputActionsIconColorPress: ""
}, tt = e`<calcite-filter></calcite-filter>`, ct = {
  calciteActionBackgroundColor: "",
  calciteActionBackgroundColorHover: "",
  calciteActionBackgroundColorPressed: "",
  calciteActionTextColorHover: "",
  calciteActionTextColorPressed: "",
  calciteFlowBackgroundColor: "",
  calciteFlowContentBottomSpace: "",
  calciteFlowContentTopSpace: "",
  calciteFlowFooterBackgroundColor: "",
  calciteFlowFooterSpace: "",
  calciteFlowHeaderActionBackgroundColor: "",
  calciteFlowHeaderActionBackgroundColorHover: "",
  calciteFlowHeaderActionBackgroundColorPress: "",
  calciteFlowHeaderActionIndicatorColor: "",
  calciteFlowHeaderActionTextColor: "",
  calciteFlowHeaderActionTextColorPress: "",
  calciteFlowHeaderBackgroundColor: "",
  calciteFlowHeaderContentSpace: "",
  calciteFlowHeaderTopSpace: "",
  calciteFlowSpace: "",
  calcitePopoverBorderColor: ""
}, at = e`
  <calcite-flow>
    <calcite-flow-item heading="flow-item-1" description="description"> </calcite-flow-item>
    <calcite-flow-item selected heading="flow-item-2" description="description">
      <calcite-button slot="footer-end" width="half" appearance="outline">Cancel</calcite-button>
      <calcite-button slot="footer-start" width="half">Save</calcite-button>
      <calcite-action slot="header-menu-actions" text-enabled text="Add" label="Add Item" icon="plus"></calcite-action>
      <calcite-action
        slot="header-menu-actions"
        text-enabled
        text="Save"
        label="Save Item"
        icon="save"
      ></calcite-action>
      <calcite-action
        slot="header-menu-actions"
        text-enabled
        text="Layers"
        label="View Layers"
        icon="layers"
      ></calcite-action>
      <div slot="header-top">Header top</div>
      <div slot="content-top">Slot for a content-top.</div>
      Hello world!
      <div slot="content-bottom">Content bottom!</div>
    </calcite-flow-item>
  </calcite-flow>
`;
var s = Object.freeze, ot = Object.defineProperty, it = (t, l) => s(ot(t, "raw", { value: s(t.slice()) })), d;
const lt = {
  calciteGraphHighlightFillColor: ""
}, rt = e(d || (d = it([`<div style="width:300px; height:100px">
    <calcite-graph id="my-graph" highlight-min="25" highlight-max="75"></calcite-graph>
  </div>
  <script>
    const data = [
      [0, 0],
      [10, 80],
      [20, 20],
      [30, 30],
      [40, 42],
      [50, 50],
      [60, 55],
      [70, 48],
      [80, 30],
      [90, 10],
      [100, 0],
    ];
    document.getElementById("my-graph").data = data;
  <\/script>`]))), nt = {
  calciteHandleBackgroundColor: "",
  calciteHandleBackgroundColorHover: "",
  calciteHandleBackgroundColorSelected: "",
  calciteHandleIconColor: "",
  calciteHandleIconColorHover: "",
  calciteHandleIconColorSelected: ""
}, st = e`<calcite-handle></calcite-handle>`, dt = e`<calcite-icon icon="3d-glasses"></calcite-icon>`, pt = {
  calciteInlineEditableBackgroundColor: "",
  calciteInlineEditableBackgroundColorHover: "",
  calciteInlineEditableButtonBackgroundColor: "",
  calciteInlineEditableButtonBackgroundColorHover: "",
  calciteInlineEditableButtonBackgroundColorPress: "",
  calciteInlineEditableButtonCornerRadius: "",
  calciteInlineEditableButtonLoaderColor: "",
  calciteInlineEditableButtonTextColor: "",
  calciteInlineEditableButtonTextColorPress: ""
}, ut = e`
  <calcite-inline-editable>
    <calcite-input />
  </calcite-inline-editable>
`, mt = {
  calciteInputDatePickerActionsIconColor: "",
  calciteInputDatePickerActionsIconColorHover: "",
  calciteInputDatePickerBackgroundColor: "",
  calciteInputDatePickerBorderColor: "",
  calciteInputDatePickerCalendarActionsBackgroundColor: "",
  calciteInputDatePickerCalendarActionsBackgroundColorHover: "",
  calciteInputDatePickerCalendarActionsBackgroundColorPress: "",
  calciteInputDatePickerCalendarActionsTextColor: "",
  calciteInputDatePickerCalendarActionsTextColorPress: "",
  calciteInputDatePickerCalendarBorderColor: "",
  calciteInputDatePickerCalendarCornerRadius: "",
  calciteInputDatePickerCalendarCurrentDayTextColor: "",
  calciteInputDatePickerCalendarDayBackgroundColor: "",
  calciteInputDatePickerCalendarDayBackgroundColorHover: "",
  calciteInputDatePickerCalendarDayCurrentTextColor: "",
  calciteInputDatePickerCalendarDayRangeTextColor: "",
  calciteInputDatePickerCalendarDayTextColorSelected: "",
  calciteInputDatePickerCalendarDayOutsideRangeBackgroundColorHover: "",
  calciteInputDatePickerCalendarDayOutsideRangeTextColorHover: "",
  calciteInputDatePickerCalendarDayTextColor: "",
  calciteInputDatePickerCalendarDayTextColorHover: "",
  calciteInputDatePickerCalendarSelectedBackgroundColor: "",
  calciteInputDatePickerCalendarShadow: "",
  calciteInputDatePickerCalendarIconColor: "",
  calciteInputDatePickerCalendarIconColorHover: "",
  calciteInputDatePickerCalendarMonthSelectTextColor: "",
  calciteInputDatePickerCalendarRangeDividerColor: "",
  calciteInputDatePickerCalendarTextColor: "",
  calciteInputDatePickerCornerRadius: "",
  calciteInputDatePickerDividerColor: "",
  calciteInputDatePickerIconColor: "",
  calciteInputDatePickerPlaceholderTextColor: "",
  calciteInputDatePickerShadow: "",
  calciteInputDatePickerTextColor: "",
  calciteInputDatePickerInputActionBackgroundColor: "",
  calciteInputDatePickerInputActionBackgroundColorHover: "",
  calciteInputDatePickerInputActionBackgroundColorPress: "",
  calciteInputDatePickerInputActionIconColor: "",
  calciteInputDatePickerInputActionIconColorHover: "",
  calciteInputDatePickerInputActionIconColorPress: ""
}, bt = e`<calcite-input-date-picker open></calcite-input-date-picker>`, Ct = e`<calcite-input-date-picker range open></calcite-input-date-picker>`, gt = e`<calcite-input-date-picker
  range
  layout="vertical"
  open
></calcite-input-date-picker>`, vt = {
  calciteInputMessageIconColor: "",
  calciteInputMessageSpacing: "",
  calciteInputMessageSpacingValue: ""
}, ht = e`<calcite-input-message status="invalid" icon="frown"
  >Message</calcite-input-message
>`, Tt = e`<calcite-input-message status="valid" icon="smile"
  >Message</calcite-input-message
>`, kt = e`<calcite-input-message status="idle" icon="information"
  >Message</calcite-input-message
>`, xt = {
  calciteLabelMarginBottom: "",
  calciteLabelTextColor: ""
}, It = e`
  <calcite-label>
    Label text
    <calcite-input></calcite-input>
  </calcite-label>
`, Bt = {
  calciteLinkTextColor: ""
}, wt = e` <calcite-link href="#" icon-start="banana" icon-end="information">link</calcite-link> `, Pt = {
  calciteListBackgroundColor: "",
  calciteListBackgroundColorHover: "",
  calciteListBackgroundColorPress: "",
  calciteListBorderColor: "",
  calciteListColor: "",
  calciteListContentTextColor: "",
  calciteListDescriptionTextColor: "",
  calciteListIconColor: "",
  calciteListLabelTextColor: "",
  calciteListSelectionBorderColor: ""
}, ft = e`<calcite-list>
  <calcite-list-item-group heading="Outdoor recreation">
    <calcite-list-item label="Hiking trails" description="Designated routes for hikers to use." value="hiking-trails">
      <calcite-action slot="actions-end" icon="layer" text="Trails layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Waterfalls" description="Vertical drops from a river." value="waterfalls">
      <calcite-action slot="actions-end" icon="layer" text="Waterfalls layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Rivers" description="Large naturally flowing watercourses." value="rivers">
      <calcite-action slot="actions-end" icon="layer" text="Rivers layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Estuaries" description="Where the river meets the sea." value="estuaries">
      <calcite-action slot="actions-end" icon="layer" text="Estuaries layer"></calcite-action>
    </calcite-list-item>
  </calcite-list-item-group>
  <calcite-list-item-group heading="Buildings">
    <calcite-list-item
      label="Park offices"
      description="Home base for park staff to converse with visitors."
      value="offices"
    >
      <calcite-action slot="actions-end" icon="layer" text="Offices layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item
      label="Guest lodges"
      description="Small houses available for visitors to book for stays."
      value="lodges"
    >
      <calcite-action slot="actions-end" icon="layer" text="Lodges layer"></calcite-action>
    </calcite-list-item>
    <calcite-list-item
      label="Yurts"
      description="Insulated portable rounded structures similar to tents."
      value="yurts"
    >
      <calcite-action slot="actions-end" icon="layer" text="Yurts layer"></calcite-action>
    </calcite-list-item>
  </calcite-list-item-group>
</calcite-list>`, At = {
  calciteLoaderFontSize: "",
  calciteLoaderSize: "",
  calciteLoaderSizeInline: "",
  calciteLoaderProgressColorInline: "",
  calciteLoaderSpacing: "",
  calciteLoaderColor: "",
  calciteLoaderTrackColor: "",
  calciteLoaderProgressColor: "",
  calciteLoaderTextSpacing: "",
  calciteLoaderTextWeight: ""
}, St = e`<calcite-loader class="chromatic-ignore"></calcite-loader>`, Ht = {
  calciteNoticeBackgroundColor: "",
  calciteNoticeBorderColor: "",
  calciteNoticeCloseBackgroundColor: "",
  calciteNoticeCloseBackgroundColorFocus: "",
  calciteNoticeCloseBackgroundColorHover: "",
  calciteNoticeCloseBackgroundColorPress: "",
  calciteNoticeCloseTextColorHover: "",
  calciteNoticeCloseTextColor: "",
  calciteNoticeCloseIconColorHover: "",
  calciteNoticeCloseIconColor: "",
  calciteNoticeCornerRadius: "",
  calciteNoticeTitleTextColor: "",
  calciteNoticeContentTextColor: "",
  calciteNoticeShadow: ""
}, p = (t) => e`<calcite-notice appearance="${t}" kind="success" scale="s" open closable><div slot="title" > Something worked </div>
    < div slot = "message" > That thing you wanted to do worked as expected</ div >
      </calcite-notice>`, Dt = e` ${p("outline-fill")} ${p("transparent")} `, $t = {
  calcitePaginationColor: "",
  calcitePaginationColorHover: "",
  calcitePaginationColorBorderHover: "",
  calcitePaginationColorBorderActive: "",
  calcitePaginationBackgroundColor: "",
  calcitePaginationIconColorBackgroundHover: ""
}, yt = e`<calcite-pagination
  total-items="1200"
  page-size="100"
  start-item="1"
></calcite-pagination>`, Ft = {
  calcitePopoverBackgroundColor: "",
  calcitePopoverBorderColor: "",
  calcitePopoverCornerRadius: "",
  calcitePopoverMaxSizeX: "",
  calcitePopoverTextColor: "",
  calcitePopoverZIndex: ""
}, Rt = e`
  <calcite-label layout="inline">
    <calcite-button title="Reference Element" id="reference-element">nostrud exercitation</calcite-button>
    <calcite-popover
      heading="these 🥨s are making me thirsty"
      reference-element="reference-element"
      placement="auto"
      open
      closable
      scale="l"
    >
      <div style="width: 300px; padding:12px 16px;">
        <b>I am a title!</b> <br />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
      </div>
    </calcite-popover>
  </calcite-label>
`, Lt = {
  calciteProgressBackgroundColor: "",
  calciteProgressFillColor: "",
  calciteProgressTextColor: ""
}, Mt = e`
  <calcite-label layout="inline">
    <calcite-progress text="optional text" type="determinate" value="50"></calcite-progress>
  </calcite-label>
`, Nt = {
  calciteStepperItemBackgroundColorPress: "",
  calciteStepperItemHeaderTextColor: "",
  calciteStepperItemHeaderTextColorHover: "",
  calciteStepperItemSelectedHeaderTextColor: "",
  calciteStepperItemIconColor: "",
  calciteStepperItemCompleteIconColor: "",
  calciteStepperItemErrorIconColor: "",
  calciteStepperItemSelectedIconColor: "",
  calciteStepperItemDescriptionTextColor: "",
  calciteStepperItemDescriptionTextColorHover: "",
  calciteStepperBarGap: "",
  calciteStepperBarFillColor: "",
  calciteStepperBarFillColorHover: "",
  calciteStepperBarCompleteFillColor: "",
  calciteStepperBarCompleteFillColorHover: "",
  calciteStepperBarErrorFillColor: "",
  calciteStepperBarErrorFillColorHover: "",
  calciteStepperBarSelectedFillColor: ""
}, Et = e`<calcite-stepper layout="horizontal" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 4" selected> </calcite-stepper-item>
</calcite-stepper>`, Gt = e`<calcite-stepper layout="vertical" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 4" selected> </calcite-stepper-item>
</calcite-stepper>`, zt = {
  calciteRadioButtonBackgroundColor: "",
  calciteRadioButtonBorderColor: "",
  calciteRadioButtonCornerRadius: "",
  calciteRadioButtonSize: ""
}, Wt = e`<calcite-radio-button></calcite-radio-button>`, Ot = {
  calciteRadioButtonGroupGap: "",
  calciteRadioButtonInputMessageSpacing: ""
}, Ut = e`<calcite-radio-button-group>
  <calcite-label layout="inline">
    <calcite-radio-button value="one" checked></calcite-radio-button>
    One
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button value="two"></calcite-radio-button>
    Two
  </calcite-label>
  <calcite-label layout="inline">
    <calcite-radio-button value="three"></calcite-radio-button>
    Three
  </calcite-label>
</calcite-radio-button-group>`, _t = {
  calciteRatingSpacing: "",
  calciteRatingColorHover: "",
  calciteRatingColorPress: "",
  calciteRatingColor: "",
  calciteRatingAverageColor: "",
  calciteRatingAverageTextColor: "",
  calciteRatingCountTextColor: ""
}, Vt = e`<calcite-rating></calcite-rating>`, jt = {
  calciteTabBackgroundColor: "",
  calciteTabBackgroundColorHover: "",
  calciteTabBorderColor: "",
  calciteTabTextColor: "",
  calciteTabAccentColor: "",
  calciteTabAccentColorHover: "",
  calciteTabAccentColorPress: "",
  calciteTabIconColorEnd: "",
  calciteTabIconColorStart: "",
  calciteTabCloseIconColor: "",
  calciteTabCloseIconColorPress: "",
  calciteTabCloseBackgroundColor: "",
  calciteTabCloseBackgroundPress: "",
  calciteTabContentSpaceY: ""
}, Yt = e`
  <style>
    calcite-tabs {
      width: 400px;
    }
  </style>
  <calcite-tabs position="bottom">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right" selected
        >Tab 1 Title
      </calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 4 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 5 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 6 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 7 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 8 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>Tab 1 Content</calcite-tab>
    <calcite-tab>Tab 2 Content</calcite-tab>
    <calcite-tab>Tab 3 Content</calcite-tab>
    <calcite-tab>Tab 4 Content</calcite-tab>
    <calcite-tab>Tab 5 Content</calcite-tab>
    <calcite-tab>Tab 6 Content</calcite-tab>
    <calcite-tab>Tab 7 Content</calcite-tab>
    <calcite-tab>Tab 8 Content</calcite-tab>
  </calcite-tabs>
  <br />
  <calcite-tabs position="top">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right" selected
        >Tab 1 Title
      </calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 4 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 5 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 6 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 7 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 8 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>Tab 1 Content</calcite-tab>
    <calcite-tab>Tab 2 Content</calcite-tab>
    <calcite-tab>Tab 3 Content</calcite-tab>
    <calcite-tab>Tab 4 Content</calcite-tab>
    <calcite-tab>Tab 5 Content</calcite-tab>
    <calcite-tab>Tab 6 Content</calcite-tab>
    <calcite-tab>Tab 7 Content</calcite-tab>
    <calcite-tab>Tab 8 Content</calcite-tab>
  </calcite-tabs>
`, qt = e`
  <style>
    calcite-tabs {
      width: 400px;
    }
  </style>
  <calcite-tabs bordered position="bottom">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right" selected
        >Tab 1 Title
      </calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 4 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 5 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 6 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 7 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 8 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>Tab 1 Content</calcite-tab>
    <calcite-tab>Tab 2 Content</calcite-tab>
    <calcite-tab>Tab 3 Content</calcite-tab>
    <calcite-tab>Tab 4 Content</calcite-tab>
    <calcite-tab>Tab 5 Content</calcite-tab>
    <calcite-tab>Tab 6 Content</calcite-tab>
    <calcite-tab>Tab 7 Content</calcite-tab>
    <calcite-tab>Tab 8 Content</calcite-tab>
  </calcite-tabs>
  <br />
  <calcite-tabs position="top">
    <calcite-tab-nav slot="title-group">
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right" selected
        >Tab 1 Title
      </calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 2 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 3 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 4 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 5 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 6 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 7 Title</calcite-tab-title>
      <calcite-tab-title closable icon-start="arrow-left" icon-end="arrow-right">Tab 8 Title</calcite-tab-title>
    </calcite-tab-nav>
    <calcite-tab selected>Tab 1 Content</calcite-tab>
    <calcite-tab>Tab 2 Content</calcite-tab>
    <calcite-tab>Tab 3 Content</calcite-tab>
    <calcite-tab>Tab 4 Content</calcite-tab>
    <calcite-tab>Tab 5 Content</calcite-tab>
    <calcite-tab>Tab 6 Content</calcite-tab>
    <calcite-tab>Tab 7 Content</calcite-tab>
    <calcite-tab>Tab 8 Content</calcite-tab>
  </calcite-tabs>
`, Xt = {
  calciteTextAreaBackgroundColor: "",
  calciteTextAreaBorderColor: "",
  calciteTextAreaCharacterLimitTextColor: "",
  calciteTextAreaDividerColor: "",
  calciteTextAreaFontSize: "",
  calciteTextAreaFooterBorderColor: "",
  calciteTextAreaMaxHeight: "",
  calciteTextAreaMinHeight: "",
  calciteTextAreaMaxWidth: "",
  calciteTextAreaMinWidth: "",
  calciteTextAreaTextColor: ""
}, Zt = e`<calcite-text-area placeholder="testing" max-length="10"></calcite-text-area>`, Qt = {
  calciteTooltipBackgroundColor: "",
  calciteTooltipBorderColor: "",
  calciteTooltipCornerRadius: "",
  calciteTooltipMaxSizeX: "",
  calciteTooltipTextColor: "",
  calciteTooltipZIndex: ""
}, Kt = e`
  <calcite-label layout="inline">
    <calcite-button title="Reference Element" id="tooltip-reference-element">nostrud exercitation</calcite-button>
    <calcite-tooltip reference-element="tooltip-reference-element" placement="auto" open>
      these 🥨s are making me thirsty
    </calcite-tooltip>
  </calcite-label>
`, Jt = {
  calciteAvatarCornerRadius: "",
  calciteAvatarColor: "",
  calciteAvatarBackgroundColor: ""
}, ec = e`<calcite-avatar full-name="Urbano Monti"></calcite-avatar>`, tc = e`<calcite-avatar user-id="umonti"></calcite-avatar>`, cc = e`<calcite-avatar
  thumbnail="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
></calcite-avatar>`, ac = {
  calciteNavigationAccentColor: "",
  calciteNavigationBackgroundColor: "",
  calciteNavigationLogoHeadingTextColor: "",
  calciteNavigationLogoTextColor: ""
}, u = (t = !1) => e`
  <calcite-navigation-logo
    heading="Walt's Chips"
    description="Eastern Potato Chip Company"
    icon="layers"
    label="Walt's Chips"
    ${g("active", t)}
  >
  </calcite-navigation-logo>
`, oc = e` ${u(!0)} ${u()} `, ic = {
  calciteNavigationAccentColor: "",
  calciteNavigationUserBackgroundColor: "",
  calciteNavigationUserAvatarCornerRadius: "",
  calciteNavigationUserAvatarColor: "",
  calciteNavigationUserFullNameTextColor: "",
  calciteNavigationUserUserNameTextColor: ""
}, m = (t = !1) => e`
  <calcite-navigation-user
    full-name="Wendell Berry"
    username="w_berry"
    ${g("active", t)}
  ></calcite-navigation-user>
`, lc = e`${m(!0)} ${m()}`, rc = {
  calciteTimePickerBackgroundColor: "",
  calciteTimePickerCornerRadius: "",
  calciteTimePickerButtonBackgroundColorHover: "",
  calciteTimePickerButtonBackgroundColorPress: "",
  calciteTimePickerColor: "",
  calciteTimePickerIconColor: "",
  calciteTimePickerInputBorderColorPress: "",
  calciteTimePickerInputBorderColorHover: "",
  calciteTimePickerBorderColor: ""
}, nc = e`<calcite-time-picker></calcite-time-picker>`, sc = {
  calciteNavigationBackgroundColor: "",
  calciteNavigationBorderColor: "",
  calciteNavigationWidth: "",
  calciteNavigationBackground: ""
}, dc = e`<calcite-navigation>
  <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" icon="layers" slot="logo">
  </calcite-navigation-logo>
  <calcite-navigation-user slot="user" full-name="Walt McChipson" username="waltChip"> </calcite-navigation-user>
  <calcite-navigation slot="navigation-secondary">
    <calcite-menu slot="content-start">
      <calcite-menu-item breadcrumb text="All Routes" icon-start="book" text-enabled></calcite-menu-item>
    </calcite-menu>
  </calcite-navigation>
  <calcite-navigation slot="navigation-tertiary">
    <calcite-menu slot="content-end">
      <calcite-menu-item breadcrumb text="All Routes" icon-start="book" text-enabled></calcite-menu-item>
    </calcite-menu>
  </calcite-navigation>
</calcite-navigation>`, pc = {
  calciteStepperBarGap: "",
  calciteStepperBarInactiveFillColor: "",
  calciteStepperBarActiveFillColor: "",
  calciteStepperBarCompleteFillColor: "",
  calciteStepperBarErrorFillColor: ""
}, uc = e`<calcite-stepper layout="horizontal-single" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item>
</calcite-stepper>`, mc = {
  calcitePanelBackgroundColor: "",
  calcitePanelBorderColor: "",
  calcitePanelContentBottomSpace: "",
  calcitePanelContentSpace: "",
  calcitePanelContentTopSpace: "",
  calcitePanelCornerRadius: "",
  calcitePanelDescriptionTextColor: "",
  calcitePanelFooterBackgroundColor: "",
  calcitePanelFooterSpace: "",
  calcitePanelHeaderActionBackgroundColor: "",
  calcitePanelHeaderActionBackgroundColorHover: "",
  calcitePanelHeaderActionBackgroundColorPress: "",
  calcitePanelHeaderActionTextColor: "",
  calcitePanelHeaderActionTextColorPress: "",
  calcitePanelHeaderBackgroundColor: "",
  calcitePanelHeaderContentSpace: "",
  calcitePanelHeaderTopSpace: "",
  calcitePanelHeadingTextColor: "",
  calcitePanelSpace: ""
}, bc = e`
  <calcite-panel heading="Panel Heading" description="Panel description" closable collapsible>
    <calcite-action text="Action 1" text-enabled icon="number-circle-1" slot="header-menu-actions"></calcite-action>
    <calcite-action text="Action 2" text-enabled icon="number-circle-2" slot="header-menu-actions"></calcite-action>
    <calcite-action text="Action 3" icon="number-circle-3" slot="header-actions-end"></calcite-action>
    <div slot="header-top">Header top</div>
    <div slot="content-top">Content at the top</div>
    <calcite-label slot="content-bottom" layout="inline-space-between" style="--calcite-label-margin-bottom: 0">
      <calcite-checkbox></calcite-checkbox>Agree to terms
    </calcite-label>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
      dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
    </p>
    <calcite-button slot="footer-end">Done</calcite-button>
  </calcite-panel>
`, Cc = {
  calciteShellPanelBackgroundColor: "",
  calciteShellPanelBorderColor: "",
  calciteShellPanelCornerRadius: "",
  calciteShellPanelHeight: "",
  calciteShellPanelMaxHeight: "",
  calciteShellPanelMaxWidth: "",
  calciteShellPanelMinHeight: "",
  calciteShellPanelMinWidth: "",
  calciteShellPanelResizeBackgroundColor: "",
  calciteShellPanelResizeTextColor: "",
  calciteShellPanelShadow: "",
  calciteShellPanelWidth: "",
  calciteShellPanelZIndex: "",
  calciteShellShadow: "",
  calciteShellTextColor: ""
}, gc = e`<calcite-shell-panel
  ><calcite-panel heading="Panel Heading" description="Panel description" closable collapsible>
    <calcite-action text="Action 1" text-enabled icon="number-circle-1" slot="header-menu-actions"></calcite-action>
    <calcite-action text="Action 2" text-enabled icon="number-circle-2" slot="header-menu-actions"></calcite-action>
    <calcite-action text="Action 3" icon="number-circle-3" slot="header-actions-end"></calcite-action>
    <div slot="content-top">Content at the top</div>
    <calcite-label slot="content-bottom" layout="inline-space-between" style="--calcite-label-margin-bottom: 0">
      <calcite-checkbox></calcite-checkbox>Agree to terms
    </calcite-label>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
      dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
    </p>
    <calcite-button slot="footer-end">Done</calcite-button>
  </calcite-panel>
</calcite-shell-panel>`, vc = {
  calciteMeterBackgroundColor: "",
  calciteMeterBorderColor: "",
  calciteMeterShadow: "",
  calciteMeterCornerRadius: "",
  calciteMeterFillColor: "",
  calciteMeterRangeTextColor: "",
  calciteMeterValueTextColor: ""
}, hc = e`
  <calcite-label>
    <calcite-meter
      class="token-theming"
      group-separator
      unit-label="GB"
      value-label
      range-labels
      min="0"
      max="12400"
      low="4600"
      high="7600"
      value="-2200"
      value-label-type="units"
    ></calcite-meter>
  </calcite-label>
`, Tc = {
  calciteCarouselPaginationBackgroundColor: "",
  calciteCarouselPaginationBackgroundColorHover: "",
  calciteCarouselPaginationBackgroundColorPress: "",
  calciteCarouselPaginationBackgroundColorSelected: "",
  calciteCarouselPaginationIconColor: "",
  calciteCarouselPaginationIconColorHover: "",
  calciteCarouselPaginationIconColorSelected: "",
  calciteCarouselControlIconColor: "",
  calciteCarouselControlIconColorHover: "",
  calciteCarouselAutoplayProgressBackgroundColor: "",
  calciteCarouselAutoplayProgressFillColor: ""
}, kc = e`
  <calcite-carousel autoplay="paused">
    <calcite-carousel-item label="Carousel Item 1">
      <calcite-card>
        <span slot="heading">Some kind of carousel item content</span>
        <span slot="description">In this case, in a card</span>
        <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
      </calcite-card>
    </calcite-carousel-item>
    <calcite-carousel-item label="Carousel Item 2">
      <calcite-card>
        <span slot="heading">Some kind of carousel item content</span>
        <span slot="description">In this case, in a card</span>
        <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
      </calcite-card>
    </calcite-carousel-item>
    <calcite-carousel-item label="Carousel Item 3">
      <calcite-card>
        <span slot="heading">Some kind of carousel item content</span>
        <span slot="description">In this case, in a card</span>
        <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
      </calcite-card>
    </calcite-carousel-item>
    <calcite-carousel-item label="Carousel Item 4">
      <calcite-card>
        <span slot="heading">Some kind of carousel item content</span>
        <span slot="description">In this case, in a card</span>
        <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
      </calcite-card>
    </calcite-carousel-item>
    <calcite-carousel-item label="Carousel Item 5">
      <calcite-card>
        <span slot="heading">Some kind of carousel item content</span>
        <span slot="description">In this case, in a card</span>
        <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
      </calcite-card>
    </calcite-carousel-item>
  </calcite-carousel>
`, xc = {
  calciteDialogAccentColor: "",
  calciteDialogActionMenuBorderColor: "",
  calciteDialogBackgroundColor: "",
  calciteDialogBorderColor: "",
  calciteDialogContentBottomSpace: "",
  calciteDialogContentSpace: "",
  calciteDialogContentTopSpace: "",
  calciteDialogCornerRadius: "",
  calciteDialogDescriptionTextColor: "",
  calciteDialogFooterBackgroundColor: "",
  calciteDialogFooterSpace: "",
  calciteDialogHeaderActionBackgroundColor: "",
  calciteDialogHeaderActionBackgroundColorHover: "",
  calciteDialogHeaderActionBackgroundColorPress: "",
  calciteDialogHeaderActionTextColor: "",
  calciteDialogHeaderActionTextColorPress: "",
  calciteDialogHeaderBackgroundColor: "",
  calciteDialogHeaderContentSpace: "",
  calciteDialogHeaderTopSpace: "",
  calciteDialogHeadingTextColor: "",
  calciteDialogIconColor: "",
  calciteDialogMaxSizeX: "",
  calciteDialogMaxSizeY: "",
  calciteDialogMinSizeX: "",
  calciteDialogMinSizeY: "",
  calciteDialogOffsetX: "",
  calciteDialogOffsetY: "",
  calciteDialogScrimBackgroundColor: "",
  calciteDialogSizeX: "",
  calciteDialogSizeY: "",
  calciteDialogSpace: ""
}, Ic = e`
  <calcite-shell style="position:relative; height: 500px; width: 500px">
    <calcite-dialog
      heading="Information"
      description="Themed"
      kind="info"
      scale="s"
      modal
      open
      width="s"
      slot="dialogs"
    >
      <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
      <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
      <calcite-action text="Layers" icon="question" slot="header-actions-end"></calcite-action>
      <div slot="header-top">Header top</div>
      <div slot="content-top">To continue, you must agree to the terms</div>
      <calcite-label slot="content-bottom" layout="inline-space-between" style="--calcite-label-margin-bottom: 0">
        <calcite-checkbox></calcite-checkbox>I agree to the terms
      </calcite-label>
      <p>
        Curabitur mauris quam, tempor sit amet massa sed, mattis blandit diam. Proin dignissim leo vitae quam fringilla
        viverra. Ut eget gravida magna, et tincidunt dui. Nullam a finibus ante, eu dignissim eros. Aenean sodales
        sollicitudin dui in fermentum.
      </p>

      <calcite-button slot="footer-end" width="auto" scale="s">Add members now</calcite-button>
    </calcite-dialog>
  </calcite-shell>
`, Bc = {
  calciteSwatchGroupSpace: ""
}, wc = e`
  <calcite-swatch-group label="demo-group-label" selection-mode="single-persist" id="single-persist-programmatic">
    <calcite-swatch color="#aabbcc" label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#ddeeff" selected label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#112233" label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#445566" label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#425262" disabled label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="" label="example" value="calcite swatch"></calcite-swatch>
  </calcite-swatch-group>
`, Pc = {
  calciteSwatchCornerRadius: ""
}, fc = e` <calcite-swatch color="#aabbcc" label="example" value="calcite swatch"></calcite-swatch> `, h = {
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
  calciteUiIconColor: "currentColor"
};
function b(t) {
  return t.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function Ac(t, l = !1) {
  if (l) {
    const o = Object.keys(t).map((i) => `--${b(i)}`);
    return x(o, " ");
  } else
    return Object.entries(t).map(([o, i]) => i && i !== "" ? `--${b(o)}: ${i};` : null).filter((o) => o).join("");
}
const T = (t, l = !1) => e`<div style="${Ac(t, l)}">
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
        ${$e} ${Te} ${Fe} ${Dt} ${z}
        <div style="display: flex">
          ${we}
          <div style="width: 40px; height: 40px;">${Be}</div>
          ${dt}
        </div>
        ${ut} ${W} ${O} ${U} ${_} ${V}
        ${j} ${Y} ${q}
        ${X} ${Z} ${Q} ${K}
        ${J} ${ee} ${te} ${ce} ${ae}
        ${oe} ${ie}
      </div>
      <div class="demo-column">
        <div>${le}</div>
        ${re}
        <div>${Ze} ${ne}</div>
        <div>${at}</div>
        <div>${We}</div>
        ${Ue} ${yt} ${se} ${hc}
      </div>
      <div class="demo-column">
        ${Yt} ${qt} ${It} ${wt} ${ft} ${St} ${Ge} ${tc} ${ec}
        ${cc} ${Mt} ${st} ${rt} ${Zt} ${Rt} ${de} ${nc} ${Kt}
        ${Ve} ${je}
      </div>
      <div class="demo-column">
        ${dc} ${oc} ${lc} ${Ne} ${Le} ${Vt} ${bc} ${gc}
      </div>
      <div class="demo-column"><div class="demo-column">${fe}</div></div>
      <div class="demo-column">${pe}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${ue}</div>
      <div class="demo-column">${me}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Ke}</div>
      <div class="demo-column">${Je}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${tt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${bt}</div>
      <div class="demo-column">${Ct}</div>
      <div class="demo-column">${gt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${ht}</div>
      <div class="demo-column">${Tt}</div>
      <div class="demo-column">${kt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Wt}</div>
      <div class="demo-column">${Ut}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${v}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${uc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Gt}</div>
      <div class="demo-column">${Et}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${be}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${kc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Ic}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${wc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${fc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Ce}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${ge}</div>
    </div>
  </div>`, k = {
  ...h,
  ...Ae,
  ...De,
  ...he,
  ...ke,
  ...xe,
  ...Ie,
  ...ve,
  ...Pe,
  ...ye,
  ...Jt,
  ...Me,
  ...Re,
  ...G,
  ...E,
  ...ze,
  ...Oe,
  ..._e,
  ...N,
  ...M,
  ...Ye,
  ...Xe,
  ...qe,
  ...Qe,
  ...et,
  ...ct,
  ...nt,
  ...pt,
  ...L,
  ...lt,
  ...mt,
  ...R,
  ...F,
  ...vt,
  ...xt,
  ...Bt,
  ...Pt,
  ...At,
  ...ac,
  ...sc,
  ...ic,
  ...Ht,
  ...$t,
  ...mc,
  ...Ft,
  ...Lt,
  ...y,
  ...zt,
  ...Ot,
  ..._t,
  ...$,
  ...Nt,
  ...D,
  ...Ee,
  ...jt,
  ...Xt,
  ...H,
  ...rc,
  ...Qt,
  ...He,
  ...S,
  ...Cc,
  ...vc,
  ...pc,
  ...A,
  ...Tc,
  ...xc,
  ...Bc,
  ...Pc,
  ...f,
  ...P,
  ...w,
  ...B
}, Sc = {
  title: "Theming/Custom Theme",
  args: {
    ...h,
    ...k
  }
}, c = (t) => T(t);
c.parameters = {
  chromatic: {
    modes: {
      large: C.squareLarge
    }
  }
};
const a = () => T({
  ...k
}, !0);
a.parameters = {
  chromatic: {
    modes: {
      large: C.squareLarge
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(args: Record<string, string>): string => {
  return kitchenSink(args);
}`,
      ...c.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => {
  return kitchenSink({
    ...componentTokens
  }, true);
}`,
      ...a.parameters?.docs?.source
    }
  }
};
const Hc = ["themingInteractive", "theming"], to = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __namedExportsOrder: Hc,
  default: Sc,
  theming: a,
  themingInteractive: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  to as s
};
