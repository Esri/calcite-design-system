import { h as e, k as v } from "./index.js";
import { s as f } from "./cssTokenValues.js";
import { S as d } from "./resources5.js";
import { p as n } from "./placeholder-image.js";
import { S as u } from "./resources6.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const A = {
  calciteActionIndicatorColor: "",
  calciteActionBackgroundColor: "",
  calciteActionBackgroundColorHover: "",
  calciteActionBackgroundColorPressed: "",
  calciteActionTextColor: "",
  calciteActionTextColorPressed: ""
}, D = {
  calciteActionBarExpandedMaxWidth: "",
  calciteActionBarItemsSpace: ""
}, H = e`<calcite-action-bar layout="horizontal" style="width:100%">
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
  <calcite-action slot="actions-end" text="hello world" icon="layers"> </calcite-action>
  <!-- The "bottom-actions" slot is deprecated -->
  <calcite-action slot="bottom-actions" text="hello world 2" icon="information"> </calcite-action>
</calcite-action-bar>`, y = {
  calciteActionGroupBorderColor: "",
  calciteActionGroupColumns: ""
}, $ = { calciteActionMenuItemsSpace: "" }, R = {
  calciteActionPadCornerRadius: "",
  calciteActionPadExpandedMaxWidth: "",
  calciteActionPadItemsSpace: ""
}, F = e`<calcite-action-menu open>
  <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
  <calcite-action-group>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action
    ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
  </calcite-action-group>
  <calcite-action-group> <calcite-action text="Table" icon="table" text-enabled></calcite-action></calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Save" icon="save" text-enabled></calcite-action>
  </calcite-action-group>
</calcite-action-menu>`, L = e`<calcite-action-pad expanded>
  <calcite-action-group>
    <calcite-action text="Add to my custom action pad application" icon="plus"></calcite-action>
    <calcite-action text="Save to my custom action pad application" icon="save"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Layers in my custom action pad application" icon="layers"></calcite-action>
  </calcite-action-group>
</calcite-action-pad>`, M = {
  calciteAlertWidth: "",
  calciteAlertBackgroundColor: "",
  calciteAlertCornerRadius: "",
  calciteAlertShadow: ""
}, N = e`<calcite-alert label="this is a default alert" scale="s" open>
  <div slot="${d.title}">Test title</div>
  <div slot="${d.message}">Test message</div>
</calcite-alert>`, O = {
  calciteAccordionItemContentSpace: "",
  calciteAccordionItemExpandIconColor: "",
  calciteAccordionItemHeaderBackgroundColor: "",
  calciteAccordionItemHeadingTextColor: "",
  calciteAccordionItemIconColorEnd: "",
  calciteAccordionItemIconColorStart: ""
}, z = (t) => e`<calcite-accordion-item
    icon-end="car"
    icon-start="layers"
    heading="${t === 0 ? "Accordion Item" : `Accordion Item ${t + 1}`}"
    ><img src="${n({ width: 100, height: 50 })}" />
  </calcite-accordion-item>`, E = {
  calciteTreeTextColor: "",
  calciteTreeTextColorSelected: "",
  calciteTreeSelectedIconColor: ""
}, I = e`<calcite-tree lines>
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
</calcite-tree>`, G = {
  calciteAccordionBackgroundColor: "",
  calciteAccordionBorderColor: "",
  calciteAccordionTextColor: "",
  calciteAccordionTextColorHover: "",
  calciteAccordionTextColorPress: ""
}, W = e`<style>
    calcite-accordion-item:hover {
      --calcite-accordion-item-background-color: white;
    }
    calcite-accordion-item[expanded] {
      --calcite-accordion-item-header-background-color: #ccc;
    }</style
  ><calcite-accordion>
    ${[0, 1, 2, 3, 4].map((t) => z(t)).join(`
`)}
    <calcite-accordion-item heading="Accordion Item 6" expanded>${I}</calcite-accordion-item>
  </calcite-accordion>`, _ = {
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
}, V = e`<calcite-autocomplete label="Pets">
  <div slot="${u.contentTop}">Top</div>
  <div slot="${u.contentBottom}">Bottom</div>
  <calcite-autocomplete-item-group heading="Dogs">
    <calcite-autocomplete-item label="Rover" value="rover" heading="Rover"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Fido" value="one" heading="Fido"></calcite-autocomplete-item>
  </calcite-autocomplete-item-group>
  <calcite-autocomplete-item-group heading="Cats">
    <calcite-autocomplete-item label="Felix" value="felix" heading="Felix"></calcite-autocomplete-item>
    <calcite-autocomplete-item label="Garfield" value="garfield" heading="Garfield"></calcite-autocomplete-item>
  </calcite-autocomplete-item-group>
</calcite-autocomplete>`, U = {
  calciteBlockBorderColor: "",
  calciteBlockContentSpace: "",
  calciteBlockHeaderBackgroundColor: "",
  calciteBlockHeaderBackgroundColorHover: "",
  calciteBlockTextColor: "",
  calciteBlockHeadingTextColor: "",
  calciteBlockHeadingTextColorPress: "",
  calciteBlockDescriptionTextColor: "",
  calciteBlockIconColor: "",
  calciteBlockIconColorHover: ""
}, j = e` <calcite-block
  heading="heading"
  description="description"
  open
  collapsible
  icon-end="pen"
  icon-start="pen"
>
  <calcite-icon icon="compass" slot="content-start"></calcite-icon>
  <div>content</div>
</calcite-block>`, q = ["", ""], p = (t) => {
  const [l, a] = Object.entries(t).filter(([c, o]) => c && o && o !== "").reduce(([c, o], [w, s]) => (c += `${w}="${s}" `, o += `${s} `, [c, o]), q);
  return e`<calcite-button ${l.trim()}>${a.trim()}</calcite-button>`;
}, Y = e`${p({ appearance: "outline" })} ${p({ kind: "danger" })}`, X = {
  calciteBlockSectionBackgroundColor: "",
  calciteBlockSectionBorderColor: "",
  calciteBlockSectionContentSpace: "",
  calciteBlockSectionHeaderTextColor: "",
  calciteBlockSectionHeaderTextColorHover: "",
  calciteBlockSectionTextColor: ""
}, Q = e`
  <calcite-block-section text="Planes" open icon-end="pen" icon-start="pen" text="a block-section">
    <p>Block section content</p>
  </calcite-block-section>
`, Z = {
  calciteSwitchBackgroundColor: "",
  calciteSwitchBackgroundColorHover: "",
  calciteSwitchBorderColor: "",
  calciteSwitchHandleBorderColor: "",
  calciteSwitchHandleBackgroundColor: "",
  calciteSwitchHandleShadow: "",
  calciteSwitchCornerRadius: ""
}, K = e`
  <calcite-label layout="inline">
    <calcite-switch scale="m" checked></calcite-switch>
    Red switch scale medium
  </calcite-label>
`, J = {
  calciteCardAccentColorSelected: "",
  calciteCardBackgroundColor: "",
  calciteCardBorderColor: "",
  calciteCardSelectIndicatorColorHover: "",
  calciteCardSelectIndicatorColor: "",
  calciteCardCornerRadius: "",
  calciteCardShadow: ""
}, ee = e`<img
  alt="thumbnail"
  slot="thumbnail"
  src="${n({
  width: 380,
  height: 180
})}"
  style="width: 380px;"
/> `, te = e`<calcite-card selected selectable>
  <img alt="thumbnail" slot="thumbnail" style="width:260px" src="${n({ width: 260, height: 160 })}" />
  <h3 slot="title">Selectable card</h3>
  <calcite-link slot="footer-start">Lead füt</calcite-link>
  <calcite-link slot="footer-end">Trail füt</calcite-link>
</calcite-card>`, ce = e`<div id="card-container" style="width:260px;">
  <calcite-card>
    ${ee}
    <h3 slot="heading">Portland Businesses</h3>
    <span slot="description"
      >by
      <calcite-link>example_user</calcite-link>
    </span>
    <div>
      Created: Apr 22, 2019
      <br />
      Updated: Dec 9, 2019
      <br />
      View Count: 0
    </div>
    <calcite-button
      slot="footer-start"
      kind="neutral"
      scale="s"
      id="card-icon-test-1"
      icon-start="circle"
    ></calcite-button>
  </calcite-card>
</div>`, le = {
  calciteCheckboxSize: "",
  calciteCheckboxBorderColor: "",
  calciteCheckboxBorderColorHover: "",
  calciteCheckboxBorderColorPress: "",
  calciteCheckboxIconColor: ""
}, ae = e`<label>
  <calcite-checkbox indeterminate></calcite-checkbox>
  Initially indeterminate and unchecked
</label>`, oe = {
  calciteChipBackgroundColor: "",
  calciteChipBorderColor: "",
  calciteChipCloseIconColor: "",
  calciteChipCornerRadius: "",
  calciteChipIconColor: "",
  calciteChipSelectIconColorPress: "",
  calciteChipSelectIconColor: "",
  calciteChipTextColor: ""
}, ie = e`<div>
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
  </div>`, re = {
  calciteComboboxTextColor: "",
  calciteComboboxTextColorHover: "",
  calciteComboboxItemBackgroundColorActive: "",
  calciteComboboxItemBackgroundColorHover: "",
  calciteComboboxSelectedIconColor: "",
  calciteComboboxDescriptionTextColor: "",
  calciteComboboxDescriptionTextColorPress: "",
  calciteComboboxHeadingTextColor: ""
}, ne = e` <calcite-combobox-item
  value="Pikachu"
  heading="Pikachu"
  description="Pokemon's mascot"
  short-heading="0025"
  icon="tree"
></calcite-combobox-item>`, se = e`<calcite-combobox-item
  value="Pikachu"
  heading="Pikachu"
  description="Pokemon's mascot"
  short-heading="0025"
  icon="tree"
  selected
></calcite-combobox-item>`;
var b = Object.freeze, de = Object.defineProperty, ue = (t, l) => b(de(t, "raw", { value: b(t.slice()) })), m;
const pe = {
  calciteDatePickerBorderColor: "",
  calciteDatePickerCornerRadius: "",
  calciteDatePickerRangeCalendarDividerColor: "",
  calciteDatePickerWeekHeaderTextColor: "",
  calciteDatePickerHeaderActionBackgroundColor: "",
  calciteDatePickerHeaderActionBackgroundColorHover: "",
  calciteDatePickerHeaderActionBackgroundColorPress: "",
  calciteDatePickerHeaderActionTextColor: "",
  calciteDatePickerHeaderActionTextColorPress: "",
  calciteDatePickerYearTextColor: "",
  calciteDatePickerMonthSelectFontSize: "",
  calciteDatePickerMonthSelectTextColor: "",
  calciteDatePickerMonthSelectIconColor: "",
  calciteDatePickerMonthSelectIconColorHover: "",
  calciteDatePickerDayBackgroundColor: "",
  calciteDatePickerDayBackgroundColorHover: "",
  calciteDatePickerDayTextColor: "",
  calciteDatePickerDayTextColorHover: "",
  calciteDatePickerCurrentDayTextColor: "",
  calciteDatePickerDayBackgroundColorSelected: "",
  calciteDatePickerDayTextColorSelected: "",
  calciteDatePickerDayRangeTextColor: "",
  calciteDatePickerDayRangeBackgroundColor: "",
  calciteDatePickerDayOutsideRangeBackgroundColorHover: "",
  calciteDatePickerDayOutsideRangeTextColorHover: ""
}, be = e` <calcite-date-picker value="2020-11-27"></calcite-date-picker> `, me = e(m || (m = ue([`
  <calcite-date-picker range></calcite-date-picker>
  <script>
    const datePicker = document.querySelector("calcite-date-picker[range]");
    datePicker.value = ["2025-01-01", "2025-02-20"];
  <\/script>
`]))), Ce = {
  calciteDropdownWidth: "",
  calciteDropdownBackgroundColor: ""
}, ge = {
  calciteDropdownGroupBorderColor: "",
  calciteDropdownGroupTitleTextColor: ""
}, he = {
  calciteDropdownItemTextColor: "",
  calciteDropdownItemBackgroundColorHover: "",
  calciteDropdownItemBackgroundColorPress: "",
  calciteDropdownItemIconColorHover: "",
  calciteDropdownItemIconColorPress: "",
  calciteDropdownItemTextColorPress: ""
}, ke = e`<calcite-dropdown open>
  <calcite-button slot="trigger">Primary</calcite-button>
  <calcite-dropdown-group group-title="View">
    <calcite-dropdown-item icon-start="list-bullet" selected>List</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="grid">Grid</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-group>
    <calcite-dropdown-item href="esri.com" icon-start="home">Home</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>`, Te = {
  calciteFabBackgroundColor: "",
  calciteFabBorderColor: "",
  calciteFabCornerRadius: "",
  calciteFabTextColor: "",
  calciteFabLoaderColor: "",
  calciteFabShadow: ""
}, xe = e`<calcite-fab></calcite-fab>`, ve = e`<calcite-fab loading></calcite-fab>`, Ie = {
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
}, Be = e`<calcite-filter></calcite-filter>`, Pe = {
  calciteFlowBackgroundColor: "",
  calciteFlowHeaderBackgroundColor: "",
  calciteFlowFooterBackgroundColor: "",
  calciteFlowSpace: "",
  calciteFlowHeaderContentSpace: "",
  calciteFlowFooterSpace: "",
  calciteActionBackgroundColor: "",
  calciteActionBackgroundColorHover: "",
  calciteActionBackgroundColorPressed: "",
  calciteActionTextColorHover: "",
  calciteActionTextColorPressed: "",
  calcitePopoverBorderColor: "",
  calciteFlowHeaderActionBackgroundColorHover: "",
  calciteFlowHeaderActionBackgroundColorPress: "",
  calciteFlowHeaderActionBackgroundColor: "",
  calciteFlowHeaderActionIndicatorColor: "",
  calciteFlowHeaderActionTextColorPress: "",
  calciteFlowHeaderActionTextColor: ""
}, Se = e`
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
      <div slot="content-top">Slot for a content-top.</div>
      Hello world!
      <div slot="content-bottom">Content bottom!</div>
    </calcite-flow-item>
  </calcite-flow>
`;
var C = Object.freeze, we = Object.defineProperty, fe = (t, l) => C(we(t, "raw", { value: C(t.slice()) })), g;
const Ae = {
  calciteGraphHighlightFillColor: ""
}, De = e(g || (g = fe([`<div style="width:300px; height:100px">
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
  <\/script>`]))), He = {
  calciteHandleBackgroundColor: "",
  calciteHandleBackgroundColorHover: "",
  calciteHandleBackgroundColorSelected: "",
  calciteHandleIconColor: "",
  calciteHandleIconColorHover: "",
  calciteHandleIconColorSelected: ""
}, ye = e`<calcite-handle></calcite-handle>`, $e = e`<calcite-icon icon="3d-glasses"></calcite-icon>`, Re = {
  calciteInlineEditableBackgroundColor: "",
  calciteInlineEditableBackgroundColorHover: "",
  calciteInlineEditableButtonBackgroundColor: "",
  calciteInlineEditableButtonCornerRadius: "",
  calciteInlineEditableButtonLoaderColor: "",
  calciteInlineEditableButtonShadowColor: "",
  calciteInlineEditableButtonTextColor: ""
}, Fe = e`
  <calcite-inline-editable>
    <calcite-input />
  </calcite-inline-editable>
`, Le = {
  calciteInputPrefixSize: "",
  calciteInputSuffixSize: "",
  calciteInputBackgroundColor: "",
  calciteInputBorderColor: "",
  calciteInputCornerRadius: "",
  calciteInputShadow: "",
  calciteInputIconColor: "",
  calciteInputTextColor: "",
  calciteInputPlaceholderTextColor: "",
  calciteInputActionsBackgroundColor: "",
  calciteInputActionsBackgroundColorHover: "",
  calciteInputActionsBackgroundColorPress: "",
  calciteInputActionsIconColor: "",
  calciteInputActionsIconColorHover: "",
  calciteInputActionsIconColorPress: "",
  calciteInputLoadingBackgroundColor: "",
  calciteInputLoadingFillColor: "",
  calciteInputPrefixBackgroundColor: "",
  calciteInputPrefixTextColor: "",
  calciteInputSuffixBackgroundColor: "",
  calciteInputSuffixTextColor: ""
}, Me = e`<calcite-input
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input>`, Ne = {
  calciteInputDatePickerBackgroundColor: "",
  calciteInputDatePickerBorderColor: "",
  calciteInputDatePickerDividerColor: "",
  calciteInputDatePickerIconColor: "",
  calciteInputDatePickerShadow: "",
  calciteInputDatePickerInputBackgroundColor: "",
  calciteInputDatePickerInputBorderColor: "",
  calciteInputDatePickerInputCornerRadius: "",
  calciteInputDatePickerInputShadow: "",
  calciteInputDatePickerInputIconColor: "",
  calciteInputDatePickerInputIconColorHover: "",
  calciteInputDatePickerInputTextColor: "",
  calciteInputDatePickerInputPlaceholderTextColor: "",
  calciteInputDatePickerDatePickerBorderColor: "",
  calciteInputDatePickerDatePickerCornerRadius: "",
  calciteInputDatePickerDatePickerRangeCalendarDividerColor: "",
  calciteInputDatePickerDatePickerWeekHeaderTextColor: "",
  calciteInputDatePickerDatePickerHeaderActionBackgroundColor: "",
  calciteInputDatePickerDatePickerHeaderActionBackgroundColorHover: "",
  calciteInputDatePickerDatePickerHeaderActionBackgroundColorPress: "",
  calciteInputDatePickerDatePickerHeaderActionTextColor: "",
  calciteInputDatePickerDatePickerHeaderActionTextColorPress: "",
  calciteInputDatePickerDatePickerYearTextColor: "",
  calciteInputDatePickerDatePickerMonthSelectFontSize: "",
  calciteInputDatePickerDatePickerMonthSelectTextColor: "",
  calciteInputDatePickerDatePickerMonthSelectIconColor: "",
  calciteInputDatePickerDatePickerMonthSelectIconColorHover: "",
  calciteInputDatePickerDatePickerDayBackgroundColor: "",
  calciteInputDatePickerDatePickerDayBackgroundColorHover: "",
  calciteInputDatePickerDatePickerDayTextColor: "",
  calciteInputDatePickerDatePickerDayTextColorHover: "",
  calciteInputDatePickerDatePickerCurrentDayTextColor: "",
  calciteInputDatePickerDatePickerDayBackgroundColorSelected: "",
  calciteInputDatePickerDatePickerDayTextColorSelected: "",
  calciteInputDatePickerDatePickerDayRangeTextColor: "",
  calciteInputDatePickerDatePickerDayRangeBackgroundColor: "",
  calciteInputDatePickerDatePickerDayOutsideRangeBackgroundColorHover: "",
  calciteInputDatePickerDatePickerDayOutsideRangeTextColorHover: ""
}, Oe = e`<calcite-input-date-picker open></calcite-input-date-picker>`, ze = e`<calcite-input-date-picker range open></calcite-input-date-picker>`, Ee = e`<calcite-input-date-picker
  range
  layout="vertical"
  open
></calcite-input-date-picker>`, Ge = {
  calciteInputMessageIconColor: "",
  calciteInputMessageSpacing: "",
  calciteInputMessageSpacingValue: ""
}, We = e`<calcite-input-message status="invalid" icon="frown"
  >Message</calcite-input-message
>`, _e = e`<calcite-input-message status="valid" icon="smile"
  >Message</calcite-input-message
>`, Ve = e`<calcite-input-message status="idle" icon="information"
  >Message</calcite-input-message
>`, Ue = {
  calciteInputActionsBackgroundColor: "",
  calciteInputActionsBackgroundColorHover: "",
  calciteInputActionsBackgroundColorPress: "",
  calciteInputActionsIconColor: "",
  calciteInputActionsIconColorHover: "",
  calciteInputActionsIconColorPress: "",
  calciteInputLoadingBackgroundColor: "",
  calciteInputLoadingFillColor: "",
  calciteInputNumberBackgroundColor: "",
  calciteInputNumberBorderColor: "",
  calciteInputNumberCornerRadius: "",
  calciteInputNumberIconColor: "",
  calciteInputNumberHeight: "",
  calciteInputNumberPlaceholderTextColor: "",
  calciteInputNumberTextColor: "",
  calciteInputNumberTextColorFocus: "",
  calciteInputPrefixBackgroundColor: "",
  calciteInputPrefixSize: "",
  calciteInputPrefixTextColor: "",
  calciteInputSuffixBackgroundColor: "",
  calciteInputSuffixSize: "",
  calciteInputSuffixTextColor: ""
}, je = e`<calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    loading
  ></calcite-input-number>
  <calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    loading
    number-button-type="horizontal"
  ></calcite-input-number>`, qe = e`<calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
  ></calcite-input-number>
  <calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
    number-button-type="horizontal"
  ></calcite-input-number>`, Ye = e`<calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
    read-only
  ></calcite-input-number>
  <calcite-input-number
    class="themed"
    step="any"
    clearable
    value="100"
    read-only
    number-button-type="horizontal"
  ></calcite-input-number>`, Xe = e`<calcite-input-number read-only step="any" value="100"></calcite-input-number>
  <calcite-input-number read-only step="any" value="100" number-button-type="horizontal"></calcite-input-number>`, Qe = e`<calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    read-only
  ></calcite-input-number>
  <calcite-input-number
    prefix-text="prefix"
    suffix-text="suffix"
    value="10"
    clearable
    read-only
    number-button-type="horizontal"
  ></calcite-input-number>`, Ze = {
  calciteInputActionBackgroundColor: "",
  calciteInputActionBackgroundColorHover: "",
  calciteInputActionBackgroundColorPress: "",
  calciteInputActionIconColor: "",
  calciteInputActionIconColorHover: "",
  calciteInputActionIconColorPress: "",
  calciteInputLoadingBackgroundColor: "",
  calciteInputLoadingFillColor: "",
  calciteInputPrefixBackgroundColor: "",
  calciteInputPrefixSizeX: "",
  calciteInputPrefixTextColor: "",
  calciteInputSuffixBackgroundColor: "",
  calciteInputSuffixSizeX: "",
  calciteInputSuffixTextColor: "",
  calciteInputTextBackgroundColor: "",
  calciteInputTextBorderColor: "",
  calciteInputTextCornerRadius: "",
  calciteInputTextIconColor: "",
  calciteInputTextHeight: "",
  calciteInputTextPlaceholderTextColor: "",
  calciteInputTextTextColor: "",
  calciteInputTextTextColorFocus: ""
}, Ke = e`<calcite-input-text placeholder="Placeholder text"></calcite-input-text>`, Je = e`<calcite-input-text
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input-text>`, et = e`<calcite-input-text clearable value="Clearable text"></calcite-input-text>`, tt = e`<calcite-input-text loading value="Loading text"></calcite-input-text>`, ct = e`<calcite-input-text read-only value="Read only text"></calcite-input-text>`, lt = {
  calciteLabelMarginBottom: "",
  calciteLabelTextColor: ""
}, at = e`
  <calcite-label>
    Label text
    <calcite-input></calcite-input>
  </calcite-label>
`, ot = {
  calciteLinkTextColor: ""
}, it = e` <calcite-link href="#" icon-start="banana" icon-end="information">link</calcite-link> `, rt = {
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
}, nt = e`<calcite-list>
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
</calcite-list>`, st = {
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
}, dt = e`<calcite-loader class="chromatic-ignore"></calcite-loader>`, ut = {
  calciteNoticeBackgroundColor: "",
  calciteNoticeCloseBackgroundColorFocus: "",
  calciteNoticeCloseBackgroundColorPress: "",
  calciteNoticeCloseTextColorHover: "",
  calciteNoticeCloseTextColor: "",
  calciteNoticeCloseIconColorHover: "",
  calciteNoticeCloseIconColor: "",
  calciteNoticeTitleTextColor: "",
  calciteNoticeContentTextColor: ""
}, pt = e`<calcite-notice kind="success" scale="s" open closable>
  <div slot="title">Something worked</div>
  <div slot="message">That thing you wanted to do worked as expected</div>
</calcite-notice>`, bt = {
  calcitePaginationColor: "",
  calcitePaginationColorHover: "",
  calcitePaginationColorBorderHover: "",
  calcitePaginationColorBorderActive: "",
  calcitePaginationBackgroundColor: "",
  calcitePaginationIconColorBackgroundHover: ""
}, mt = e`<calcite-pagination
  total-items="1200"
  page-size="100"
  start-item="1"
></calcite-pagination>`, Ct = {
  calcitePopoverBackgroundColor: "",
  calcitePopoverBorderColor: "",
  calcitePopoverCornerRadius: "",
  calcitePopoverMaxSizeX: "",
  calcitePopoverTextColor: "",
  calcitePopoverZIndex: ""
}, gt = e`
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
`, ht = {
  calciteProgressBackgroundColor: "",
  calciteProgressFillColor: "",
  calciteProgressTextColor: ""
}, kt = e`
  <calcite-label layout="inline">
    <calcite-progress text="optional text" type="determinate" value="50"></calcite-progress>
  </calcite-label>
`, Tt = {
  calciteSegmentedControlColor: "",
  calciteSegmentedControlBackgroundColor: "",
  calciteSegmentedControlBorderColor: "",
  calciteSegmentedControlShadow: "",
  calciteSegmentedControlIconColor: ""
}, xt = e`<calcite-label>
  Segmented Control
  <calcite-segmented-control>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item> </calcite-segmented-control
  ><calcite-label></calcite-label
></calcite-label>`, vt = {
  calciteSelectFontSize: "",
  calciteSelectTextColor: "",
  calciteSelectBorderColor: "",
  calciteSelectIconColor: "",
  calciteSelectIconColorHover: "",
  calciteSelectBackgroundColor: "",
  calciteSelectCornerRadius: "",
  calciteSelectShadow: ""
}, It = e`<calcite-select>
  <calcite-option>uno</calcite-option>
  <calcite-option>dos</calcite-option>
  <calcite-option>tres</calcite-option>
</calcite-select>`, Bt = {
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
}, Pt = e`<calcite-stepper layout="horizontal" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 4" selected> </calcite-stepper-item>
</calcite-stepper>`, St = e`<calcite-stepper layout="vertical" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 4" selected> </calcite-stepper-item>
</calcite-stepper>`, wt = {
  calciteRadioButtonBackgroundColor: "",
  calciteRadioButtonBorderColor: "",
  calciteRadioButtonCornerRadius: "",
  calciteRadioButtonSize: ""
}, ft = e`<calcite-radio-button></calcite-radio-button>`, At = {
  calciteRadioButtonGroupGap: "",
  calciteRadioButtonInputMessageSpacing: ""
}, Dt = e`<calcite-radio-button-group>
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
</calcite-radio-button-group>`, Ht = {
  calciteRatingSpacing: "",
  calciteRatingColorHover: "",
  calciteRatingColorPress: "",
  calciteRatingColor: "",
  calciteRatingAverageColor: "",
  calciteRatingAverageTextColor: "",
  calciteRatingCountTextColor: ""
}, yt = e`<calcite-rating></calcite-rating>`, $t = {
  calciteSliderTextColor: "",
  calciteSliderTrackColor: "",
  calciteSliderTrackFillColor: "",
  calciteSliderHandleFillColor: "",
  calciteSliderHandleExtensionColor: "",
  calciteSliderAccentColor: "",
  calciteSliderTickColor: "",
  calciteSliderTickBorderColor: "",
  calciteSliderTickSelectedColor: "",
  calciteSliderGraphColor: ""
}, Rt = e`<calcite-slider
  min="0"
  max="100"
  min-value="50"
  max-value="85"
  step="1"
  min-label="Temperature range (lower)"
  max-label="Temperature range (upper)"
  precise
></calcite-slider>`, Ft = {
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
}, Lt = e`
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
`, Mt = e`
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
`, Nt = {
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
}, Ot = e`<calcite-text-area placeholder="testing" max-length="10"></calcite-text-area>`, zt = {
  calciteTooltipBackgroundColor: "",
  calciteTooltipBorderColor: "",
  calciteTooltipCornerRadius: "",
  calciteTooltipMaxSizeX: "",
  calciteTooltipTextColor: "",
  calciteTooltipZIndex: ""
}, Et = e`
  <calcite-label layout="inline">
    <calcite-button title="Reference Element" id="tooltip-reference-element">nostrud exercitation</calcite-button>
    <calcite-tooltip reference-element="tooltip-reference-element" placement="auto" open>
      these 🥨s are making me thirsty
    </calcite-tooltip>
  </calcite-label>
`, Gt = {
  calciteAvatarCornerRadius: "",
  calciteAvatarColor: "",
  calciteAvatarBackgroundColor: ""
}, Wt = e`<calcite-avatar full-name="Urbano Monti"></calcite-avatar>`, _t = e`<calcite-avatar user-id="umonti"></calcite-avatar>`, Vt = e`<calcite-avatar
  thumbnail="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
></calcite-avatar>`, Ut = {
  calciteNavigationAccentColor: "",
  calciteNavigationBackgroundColor: "",
  calciteNavigationLogoHeadingTextColor: "",
  calciteNavigationLogoTextColor: ""
}, h = (t = !1) => e`
  <calcite-navigation-logo
    heading="Walt's Chips"
    description="Eastern Potato Chip Company"
    icon="layers"
    label="Walt's Chips"
    ${v("active", t)}
  >
  </calcite-navigation-logo>
`, jt = e` ${h(!0)} ${h()} `, qt = {
  calciteNavigationAccentColor: "",
  calciteNavigationUserBackgroundColor: "",
  calciteNavigationUserAvatarCornerRadius: "",
  calciteNavigationUserAvatarColor: "",
  calciteNavigationUserFullNameTextColor: "",
  calciteNavigationUserUserNameTextColor: ""
}, k = (t = !1) => e`
  <calcite-navigation-user
    full-name="Wendell Berry"
    username="w_berry"
    ${v("active", t)}
  ></calcite-navigation-user>
`, Yt = e`${k(!0)} ${k()}`, Xt = {
  calciteTileAccentColorPress: "",
  calciteTileBackgroundColor: "",
  calciteTileBorderColor: "",
  calciteTileCornerRadius: "",
  calciteTileHeadingTextColor: "",
  calciteTileLinkColor: "",
  calciteTileShadow: "",
  calciteTileTextColor: ""
}, Qt = e`
  <calcite-tile
    heading="Tile heading lorem ipsum"
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    icon="layers"
    selected
  ></calcite-tile>
`, Zt = {
  calciteTimePickerBackgroundColor: "",
  calciteTimePickerCornerRadius: "",
  calciteTimePickerButtonBackgroundColorHover: "",
  calciteTimePickerButtonBackgroundColorPress: "",
  calciteTimePickerColor: "",
  calciteTimePickerIconColor: "",
  calciteTimePickerInputBorderColorPress: "",
  calciteTimePickerInputBorderColorHover: "",
  calciteTimePickerBorderColor: ""
}, Kt = e`<calcite-time-picker></calcite-time-picker>`, Jt = {
  calciteNavigationBackgroundColor: "",
  calciteNavigationBorderColor: "",
  calciteNavigationWidth: "",
  calciteNavigationBackground: ""
}, ec = e`<calcite-navigation>
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
</calcite-navigation>`, tc = {
  calciteMenuItemAccentColor: "",
  calciteMenuBackgroundColor: "",
  calciteMenuItemSubMenuBorderColor: "",
  calciteMenuItemSubMenuCornerRadius: "",
  calciteMenuTextColor: ""
}, T = (t) => e`<calcite-menu layout="${t}">
    <calcite-menu-item text="Ideas" breadcrumb icon-start="layers" icon-end="layers" open>
      <calcite-menu-item
        href="#calcite-navigation-slots"
        icon-start="add-in"
        slot="submenu-item"
        text="Slots"
        active
      ></calcite-menu-item>
      <calcite-menu-item
        href="#calcite-navigation-css-vars"
        icon-start="multiple-variables"
        slot="submenu-item"
        text="Css vars"
      ></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Ideas"> </calcite-menu-item>
    <calcite-menu-item text="calcite-navigation" href="#calcite-menu" open>
      <calcite-menu-item
        href="#calcite-navigation-slots"
        icon-start="add-in"
        slot="submenu-item"
        text="Slots"
        active
      ></calcite-menu-item>
      <calcite-menu-item
        href="#calcite-navigation-css-vars"
        icon-start="multiple-variables"
        slot="submenu-item"
        text="Css vars"
      ></calcite-menu-item>
    </calcite-menu-item>
  </calcite-menu>`, cc = e` ${T("horizontal")} ${T("vertical")} `, lc = {
  calciteStepperBarGap: "",
  calciteStepperBarInactiveFillColor: "",
  calciteStepperBarActiveFillColor: "",
  calciteStepperBarCompleteFillColor: "",
  calciteStepperBarErrorFillColor: ""
}, ac = e`<calcite-stepper layout="horizontal-single" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item>
</calcite-stepper>`, oc = {
  calciteComboboxInputHeight: "",
  calciteComboboxInputBackgroundColor: "",
  calciteComboboxInputTextColor: "",
  calciteComboboxInputBorderColor: "",
  calciteComboboxIconColor: "",
  calciteComboboxIconColorHover: "",
  calciteComboboxBackgroundColor: "",
  calciteChipBackgroundColor: "",
  calciteChipTextColor: "",
  calciteChipIconColor: "",
  calciteChipCloseIconColor: "",
  calciteChipCornerRadius: "",
  calciteComboboxItemGroupTextColor: "",
  calciteComboboxItemGroupBorderColor: ""
}, ic = e`<calcite-combobox label="test" max-items="6" open>
  <calcite-combobox-item-group value="Trees" label="Trees">
    <calcite-combobox-item value="Pine" text-label="Pine">
      <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`, rc = e`<calcite-combobox label="test" selection-mode="single">
  <calcite-combobox-item value="Trees" text-label="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`, nc = e`<calcite-combobox label="test" placeholder-icon="layers">
  <calcite-combobox-item value="Trees" text-label="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
</calcite-combobox>`;
e`
  <calcite-combobox open filter-text="Three" selection-mode="single">
    <calcite-combobox-item value="one" text-label="One"></calcite-combobox-item>
    <calcite-combobox-item value="two" text-label="Two"></calcite-combobox-item>
  </calcite-combobox>
`;
const sc = {
  calcitePanelBackgroundColor: "",
  calcitePanelBorderColor: "",
  calcitePanelContentSpace: "",
  calcitePanelCornerRadius: "",
  calcitePanelDescriptionTextColor: "",
  calcitePanelFooterBackgroundColor: "",
  calcitePanelFooterSpace: "",
  calcitePanelHeaderActionBackgroundColorHover: "",
  calcitePanelHeaderActionBackgroundColorPress: "",
  calcitePanelHeaderActionBackgroundColor: "",
  calcitePanelHeaderActionTextColorPress: "",
  calcitePanelHeaderActionTextColor: "",
  calcitePanelHeaderBackgroundColor: "",
  calcitePanelHeaderContentSpace: "",
  calcitePanelHeadingTextColor: "",
  calcitePanelSpace: ""
}, dc = e`
  <calcite-panel heading="Panel Heading" description="Panel description" closable collapsible>
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
`, uc = {
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
}, pc = e`<calcite-shell-panel
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
</calcite-shell-panel>`, bc = {
  calciteMeterBackgroundColor: "",
  calciteMeterBorderColor: "",
  calciteMeterShadow: "",
  calciteMeterCornerRadius: "",
  calciteMeterFillColor: "",
  calciteMeterRangeTextColor: "",
  calciteMeterValueTextColor: ""
}, mc = e`
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
`, Cc = {
  calciteTableCornerRadius: "",
  calciteTableShadow: "",
  calciteTableBorderColor: "",
  calciteTableRowBackgroundColor: "",
  calciteTableRowBackgroundColorStriped: "",
  calciteTableRowBackgroundColorSelected: "",
  calciteTableRowBorderColorSelected: "",
  calciteTableRowAccentColorSelected: "",
  calciteTableNumberCellBackgroundColor: "",
  calciteTableNumberCellTextColor: "",
  calciteTableSelectionCellBackgroundColor: "",
  calciteTableSelectionCellBackgroundColorSelected: "",
  calciteTableSelectionCellIconColor: "",
  calciteTableSelectionCellIconColorSelected: "",
  calciteTableHeaderBackgroundColor: "",
  calciteTableHeaderHeadingColor: "",
  calciteTableHeaderDescriptionColor: "",
  calciteTableSelectionDismissButtonBackgroundColor: "",
  calciteTableSelectionDismissButtonBorderColor: "",
  calciteTableSelectionDismissButtonCornerRadius: "",
  calciteTableSelectionDismissButtonShadow: "",
  calciteTableSelectionDismissButtonTextColor: "",
  calciteTableSelectionDismissButtonBackgroundColorHover: "",
  calciteTableSelectionDismissButtonBorderColorHover: "",
  calciteTableSelectionDismissButtonTextColorHover: "",
  calciteTableSelectionDismissButtonBackgroundColorActive: "",
  calciteTableSelectionDismissButtonBorderColorActive: "",
  calciteTableSelectionDismissButtonTextColorActive: "",
  calciteTableSelectionChipBackgroundColor: "",
  calciteTableSelectionChipBorderColor: "",
  calciteTableSelectionChipCornerRadius: "",
  calciteTableSelectionChipShadow: "",
  calciteTableSelectionChipTextColor: "",
  calciteTableSelectionChipBackgroundColorSelected: "",
  calciteTableSelectionChipBorderColorSelected: "",
  calciteTableSelectionChipTextColorSelected: "",
  calciteTableSelectionOutOfViewChipBackgroundColor: "",
  calciteTableSelectionOutOfViewChipBorderColor: "",
  calciteTableSelectionOutOfViewChipCornerRadius: "",
  calciteTableSelectionOutOfViewChipShadow: "",
  calciteTableSelectionOutOfViewChipTextColor: "",
  calciteTableSelectionOutOfViewChipIconColor: "",
  calciteTablePaginationColor: "",
  calciteTablePaginationColorHover: "",
  calciteTablePaginationColorBorderHover: "",
  calciteTablePaginationColorBorderActive: "",
  calciteTablePaginationBackgroundColor: "",
  calciteTablePaginationIconColorBackgroundHover: ""
}, gc = e`
  <calcite-table
    class="themed"
    bordered
    striped
    selection-mode="multiple"
    numbered
    caption="Theming testing"
    page-size="3"
  >
    <calcite-action slot="selection-actions" icon="trash"></calcite-action>
    <calcite-action slot="selection-actions" icon="send"></calcite-action>
    <calcite-action slot="selection-actions" icon="copy"></calcite-action>
    <calcite-action slot="selection-actions" icon="plus"></calcite-action>
    <calcite-table-row slot="table-header">
      <calcite-table-header heading="Example column heading"></calcite-table-header>
      <calcite-table-header heading="Example heading"></calcite-table-header>
      <calcite-table-header heading="Heading example">
        <calcite-chip scale="s" appearance="outline-fill" slot="actions-end">slot</calcite-chip>
      </calcite-table-header>
      <calcite-table-header heading="Example"></calcite-table-header>
      <calcite-table-header heading="Testing" description="With a description"> </calcite-table-header>
      <calcite-table-header heading="Site visits" alignment="end"></calcite-table-header>
      <calcite-table-header heading="Status"></calcite-table-header>
      <calcite-table-header alignment="center" heading="More"></calcite-table-header>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 1</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 2</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 3</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 4</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell> </calcite-table-row
    ><calcite-table-row>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 5</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row selected>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell>cell</calcite-table-cell>
      <calcite-table-cell alignment="end">test 5</calcite-table-cell>
      <calcite-table-cell><calcite-chip scale="s" icon="smile">Happy</calcite-chip></calcite-table-cell>
      <calcite-table-cell alignment="center">
        <calcite-chip scale="s">Another thing</calcite-chip>
      </calcite-table-cell>
    </calcite-table-row>
    <calcite-table-row slot="table-footer">
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell>foot</calcite-table-cell>
      <calcite-table-cell col-span="5">foot</calcite-table-cell>
    </calcite-table-row>
  </calcite-table>
`, hc = {
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
        <span slot="title">Some kind of carousel item content</span>
        <span slot="subtitle">In this case, in a card</span>
        <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
      </calcite-card>
    </calcite-carousel-item>
    <calcite-carousel-item label="Carousel Item 2">
      <calcite-card>
        <span slot="title">Some kind of carousel item content</span>
        <span slot="subtitle">In this case, in a card</span>
        <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
      </calcite-card>
    </calcite-carousel-item>
    <calcite-carousel-item label="Carousel Item 3">
      <calcite-card>
        <span slot="title">Some kind of carousel item content</span>
        <span slot="subtitle">In this case, in a card</span>
        <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
      </calcite-card>
    </calcite-carousel-item>
    <calcite-carousel-item label="Carousel Item 4">
      <calcite-card>
        <span slot="title">Some kind of carousel item content</span>
        <span slot="subtitle">In this case, in a card</span>
        <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
      </calcite-card>
    </calcite-carousel-item>
    <calcite-carousel-item label="Carousel Item 5">
      <calcite-card>
        <span slot="title">Some kind of carousel item content</span>
        <span slot="subtitle">In this case, in a card</span>
        <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
      </calcite-card>
    </calcite-carousel-item>
  </calcite-carousel>
`, Tc = {
  calciteDialogScrimBackgroundColor: "",
  calciteDialogSizeX: "",
  calciteDialogMinSizeX: "",
  calciteDialogMaxSizeX: "",
  calciteDialogSizeY: "",
  calciteDialogMinSizeY: "",
  calciteDialogMaxSizeY: "",
  calciteDialogOffsetX: "",
  calciteDialogOffsetY: "",
  calciteDialogBackgroundColor: "",
  calciteDialogIconColor: "",
  calciteDialogAccentColor: "",
  calciteDialogCornerRadius: "",
  calciteDialogHeadingTextColor: "",
  calciteDialogDescriptionTextColor: "",
  calciteDialogBorderColor: "",
  calciteDialogHeaderBackgroundColor: "",
  calciteDialogHeaderActionBackgroundColor: "",
  calciteDialogHeaderActionBackgroundColorHover: "",
  calciteDialogHeaderActionBackgroundColorPress: "",
  calciteDialogHeaderActionTextColor: "",
  calciteDialogHeaderActionTextColorPress: "",
  calciteDialogFooterBackgroundColor: "",
  calciteDialogSpace: "",
  calciteDialogHeaderContentSpace: "",
  calciteDialogFooterSpace: "",
  calciteDialogActionMenuBorderColor: ""
}, xc = e`
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
`, vc = {
  calciteSwatchGroupSpace: ""
}, Ic = e`
  <calcite-swatch-group label="demo-group-label" selection-mode="single-persist" id="single-persist-programmatic">
    <calcite-swatch color="#aabbcc" label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#ddeeff" selected label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#112233" label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#445566" label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#425262" disabled label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="" label="example" value="calcite swatch"></calcite-swatch>
  </calcite-swatch-group>
`, Bc = {
  calciteSwatchCornerRadius: ""
}, Pc = e` <calcite-swatch color="#aabbcc" label="example" value="calcite swatch"></calcite-swatch> `, Sc = {
  calciteSplitButtonBackgroundColor: "",
  calciteSplitButtonBorderColor: "",
  calciteSplitButtonCornerRadius: "",
  calciteSplitButtonIconColor: "",
  calciteSplitButtonLoaderColor: "",
  calciteSplitButtonTextColor: "",
  calciteSplitButtonShadow: "",
  calciteSplitButtonDividerColor: "",
  calciteSplitButtonDividerBorderColor: "",
  calciteSplitButtonDropdownWidth: "",
  calciteSplitButtonDropdownBackgroundColor: ""
}, wc = e` <calcite-split-button primary-text="Button">
  <calcite-dropdown-group selection-mode="none">
    <calcite-dropdown-item>Option 2</calcite-dropdown-item>
    <calcite-dropdown-item>Option 3</calcite-dropdown-item>
    <calcite-dropdown-item>Option 4</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-split-button>`, fc = {
  calciteInputTimePickerBackgroundColor: "",
  calciteInputTimePickerBorderColor: "",
  calciteInputTimePickerTextColor: "",
  calciteInputTimePickerIconColor: "",
  calciteInputTimePickerIconColorHover: "",
  calciteInputTimePickerShadow: "",
  calciteInputTimePickerInputBackgroundColor: "",
  calciteInputTimePickerInputBorderColor: "",
  calciteInputTimePickerInputTextColor: "",
  calciteInputTimePickerInputShadow: "",
  calciteInputTimePickerInputCornerRadius: "",
  calciteInputTimePickerDigitTextColor: "",
  calciteInputTimePickerDigitIconColor: "",
  calciteInputTimePickerDigitBorderColorPress: "",
  calciteInputTimePickerDigitBorderColorHover: "",
  calciteInputTimePickerActionBackgroundColorHover: "",
  calciteInputTimePickerActionBackgroundColorPress: ""
}, Ac = e`<calcite-input-time-picker open></calcite-input-time-picker>`, Dc = {
  calciteColorPickerBackgroundColor: "",
  calciteColorPickerBorderColor: "",
  calciteColorPickerCornerRadius: "",
  calciteColorPickerTextColor: "",
  calciteColorPickerShadow: "",
  calciteColorPickerInputBackgroundColor: "",
  calciteColorPickerInputBorderColor: "",
  calciteColorPickerInputTextColor: "",
  calciteColorPickerInputPrefixBackgroundColor: "",
  calciteColorPickerInputPrefixTextColor: "",
  calciteColorPickerInputSuffixBackgroundColor: "",
  calciteColorPickerInputSuffixTextColor: "",
  calciteColorPickerTabBorderColor: "",
  calciteColorPickerTabTextColor: "",
  calciteColorPickerTabAccentColorPress: "",
  calciteColorPickerSwatchCornerRadius: "",
  calciteColorPickerActionTextColorPress: "",
  calciteColorPickerActionTextColorHover: "",
  calciteColorPickerActionTextColor: ""
}, Hc = e`<calcite-color-picker alpha-channel></calcite-color-picker>`, B = {
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
function x(t) {
  return t.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function yc(t, l = !1) {
  if (l) {
    const a = Object.keys(t).map((c) => `--${x(c)}`);
    return f(a, " ");
  } else
    return Object.entries(t).map(([a, c]) => c && c !== "" ? `--${x(a)}: ${c};` : null).filter((a) => a).join("");
}
const P = (t, l = !1) => e`<div style="${yc(t, l)}">
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
        ${W} ${H} ${V} ${pt} ${xt}
        <div style="display: flex">
          ${L}
          <div style="width: 40px; height: 40px;">${F}</div>
          ${$e}
        </div>
        ${Fe} ${Me} ${It} ${rc} ${je} ${qe}
        ${Xe} ${Qe} ${Ye} ${Ke}
        ${et} ${tt} ${Je} ${ct}
        ${nc} ${ic}
      </div>
      <div class="demo-column">
        <div>${te}</div>
        ${ce}
        <div>${ke} ${Y}</div>
        <div>${Se}</div>
        <div>${ae}</div>
        ${ie} ${mt} ${Rt} ${mc}
      </div>
      <div class="demo-column">
        ${Lt} ${Mt} ${at} ${it} ${nt} ${dt} ${K} ${_t} ${Wt}
        ${Vt} ${kt} ${ye} ${De} ${Ot} ${gt} ${Qt} ${Kt} ${Et}
        ${ne} ${se}
      </div>
      <div class="demo-column">
        ${ec} ${jt} ${Yt} ${Q} ${j} ${yt} ${dc} ${pc}
      </div>
      <div class="demo-column"><div class="demo-column">${N}</div></div>
      <div class="demo-column">${cc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${be}</div>
      <div class="demo-column">${me}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${xe}</div>
      <div class="demo-column">${ve}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Be}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Oe}</div>
      <div class="demo-column">${ze}</div>
      <div class="demo-column">${Ee}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${We}</div>
      <div class="demo-column">${_e}</div>
      <div class="demo-column">${Ve}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${ft}</div>
      <div class="demo-column">${Dt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${I}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${ac}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${St}</div>
      <div class="demo-column">${Pt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${gc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${kc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${xc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Ic}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Pc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${wc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Hc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Ac}</div>
    </div>
  </div>`, S = {
  ...B,
  ...O,
  ...G,
  ...D,
  ...y,
  ...$,
  ...R,
  ...A,
  ...M,
  ..._,
  ...Gt,
  ...X,
  ...U,
  ...J,
  ...le,
  ...oe,
  ...re,
  ...oc,
  ...pe,
  ...Ce,
  ...he,
  ...ge,
  ...Te,
  ...Ie,
  ...Pe,
  ...He,
  ...Re,
  ...Ue,
  ...Ae,
  ...Ne,
  ...Le,
  ...Ze,
  ...Ge,
  ...lt,
  ...ot,
  ...rt,
  ...st,
  ...Ut,
  ...Jt,
  ...qt,
  ...ut,
  ...bt,
  ...sc,
  ...Ct,
  ...ht,
  ...Tt,
  ...wt,
  ...At,
  ...Ht,
  ...vt,
  ...Bt,
  ...$t,
  ...Z,
  ...Ft,
  ...Nt,
  ...Xt,
  ...Zt,
  ...zt,
  ...E,
  ...tc,
  ...uc,
  ...bc,
  ...lc,
  ...Cc,
  ...hc,
  ...Tc,
  ...vc,
  ...Bc,
  ...Sc,
  ...fc,
  ...Dc
}, $c = {
  title: "Theming/Custom Theme",
  args: {
    ...B,
    ...S
  }
}, i = (t) => P(t), r = () => P({
  ...S
}, !0);
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: Record<string, string>): string => {
  return kitchenSink(args);
}`,
      ...i.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => {
  return kitchenSink({
    ...componentTokens
  }, true);
}`,
      ...r.parameters?.docs?.source
    }
  }
};
const Rc = ["themingInteractive", "theming"], zc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __namedExportsOrder: Rc,
  default: $c,
  theming: r,
  themingInteractive: i
}, Symbol.toStringTag, { value: "Module" }));
export {
  zc as s
};
