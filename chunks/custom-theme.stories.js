import { h as e } from "./formatting.js";
import { s as A } from "./cssTokenValues.js";
import { S as d } from "./resources4.js";
import { p as n } from "./placeholder-image.js";
import { S as u } from "./resources5.js";
import { b as k } from "./utils.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const P = {
  calciteActionIndicatorColor: "",
  calciteActionBackgroundColor: "",
  calciteActionBackgroundColorHover: "",
  calciteActionBackgroundColorPressed: "",
  calciteActionTextColor: "",
  calciteActionTextColorPressed: ""
}, y = {
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
</calcite-action-bar>`, $ = {
  calciteActionGroupBorderColor: "",
  calciteActionGroupColumns: ""
}, D = { calciteActionMenuItemsSpace: "" }, F = {
  calciteActionPadCornerRadius: "",
  calciteActionPadExpandedMaxWidth: "",
  calciteActionPadItemsSpace: ""
}, R = e`<calcite-action-menu open>
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
</calcite-action-pad>`, N = {
  calciteAlertWidth: "",
  calciteAlertBackgroundColor: "",
  calciteAlertCornerRadius: "",
  calciteAlertShadow: ""
}, M = e`<calcite-alert label="this is a default alert" scale="s" open>
  <div slot="${d.title}">Test title</div>
  <div slot="${d.message}">Test message</div>
</calcite-alert>`, E = {
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
  </calcite-accordion-item>`, G = {
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
</calcite-tree>`, W = {
  calciteAccordionBackgroundColor: "",
  calciteAccordionBorderColor: "",
  calciteAccordionTextColor: "",
  calciteAccordionTextColorHover: "",
  calciteAccordionTextColorPress: ""
}, _ = e`<style>
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
  </calcite-accordion>`, O = {
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
}, U = e`<calcite-autocomplete label="Pets">
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
</calcite-autocomplete>`, j = {
  calciteBlockBorderColor: "",
  calciteBlockHeaderBackgroundColor: "",
  calciteBlockHeaderBackgroundColorHover: "",
  calciteBlockTextColor: "",
  calciteBlockHeadingTextColor: "",
  calciteBlockHeadingTextColorPress: "",
  calciteBlockDescriptionTextColor: "",
  calciteBlockIconColor: "",
  calciteBlockIconColorHover: ""
}, V = e` <calcite-block
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
  const [o, a] = Object.entries(t).filter(([c, i]) => c && i && i !== "").reduce(([c, i], [w, s]) => (c += `${w}="${s}" `, i += `${s} `, [c, i]), q);
  return e`<calcite-button ${o.trim()}>${a.trim()}</calcite-button>`;
}, Y = e`${p({ appearance: "outline" })} ${p({ kind: "danger" })}`, Q = {
  calciteBlockSectionBorderColor: "",
  calciteBlockSectionHeaderTextColor: "",
  calciteBlockSectionHeaderTextColorHover: "",
  calciteBlockSectionTextColor: ""
}, Z = e`
  <calcite-block-section text="Planes" open icon-end="pen" icon-start="pen" text="a block-section">
    <p>Block section content</p>
  </calcite-block-section>
`, K = {
  calciteSwitchBackgroundColor: "",
  calciteSwitchBackgroundColorHover: "",
  calciteSwitchBorderColor: "",
  calciteSwitchHandleBorderColor: "",
  calciteSwitchHandleBackgroundColor: "",
  calciteSwitchHandleShadow: "",
  calciteSwitchCornerRadius: ""
}, X = e`
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
</div>`, oe = {
  calciteCheckboxSize: "",
  calciteCheckboxBorderColor: "",
  calciteCheckboxBorderColorHover: "",
  calciteCheckboxBorderColorPress: "",
  calciteCheckboxIconColor: ""
}, ae = e`<label>
  <calcite-checkbox indeterminate></calcite-checkbox>
  Initially indeterminate and unchecked
</label>`, ie = {
  calciteChipBackgroundColor: "",
  calciteChipBorderColor: "",
  calciteChipCloseIconColor: "",
  calciteChipCornerRadius: "",
  calciteChipIconColor: "",
  calciteChipSelectIconColorPress: "",
  calciteChipSelectIconColor: "",
  calciteChipTextColor: ""
}, le = e`<div>
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
var b = Object.freeze, de = Object.defineProperty, ue = (t, o) => b(de(t, "raw", { value: b(t.slice()) })), m;
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
}, xe = {
  calciteDropdownItemTextColor: "",
  calciteDropdownItemBackgroundColorHover: "",
  calciteDropdownItemBackgroundColorPress: "",
  calciteDropdownItemIconColorHover: "",
  calciteDropdownItemIconColorPress: "",
  calciteDropdownItemTextColorPress: ""
}, ve = e`<calcite-dropdown open>
  <calcite-button slot="trigger">Primary</calcite-button>
  <calcite-dropdown-group group-title="View">
    <calcite-dropdown-item icon-start="list-bullet" selected>List</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="grid">Grid</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-group>
    <calcite-dropdown-item href="esri.com" icon-start="home">Home</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>`, he = {
  calciteFabBackgroundColor: "",
  calciteFabBorderColor: "",
  calciteFabCornerRadius: "",
  calciteFabTextColor: "",
  calciteFabLoaderColor: "",
  calciteFabShadow: ""
}, Te = e`<calcite-fab></calcite-fab>`, ke = e`<calcite-fab loading></calcite-fab>`, Ie = {
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
}, fe = e`<calcite-filter></calcite-filter>`, Be = {
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
var C = Object.freeze, we = Object.defineProperty, Ae = (t, o) => C(we(t, "raw", { value: C(t.slice()) })), g;
const Pe = {
  calciteGraphHighlightFillColor: ""
}, ye = e(g || (g = Ae([`<div style="width:300px; height:100px">
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
}, $e = e`<calcite-handle></calcite-handle>`, De = e`<calcite-icon icon="3d-glasses"></calcite-icon>`, Fe = {
  calciteInlineEditableBackgroundColor: "",
  calciteInlineEditableBackgroundColorHover: "",
  calciteInlineEditableButtonBackgroundColor: "",
  calciteInlineEditableButtonCornerRadius: "",
  calciteInlineEditableButtonLoaderColor: "",
  calciteInlineEditableButtonShadowColor: "",
  calciteInlineEditableButtonTextColor: ""
}, Re = e`
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
}, Ne = e`<calcite-input
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input>`, Me = {
  calciteInputMessageIconColor: "",
  calciteInputMessageSpacing: "",
  calciteInputMessageSpacingValue: ""
}, Ee = e`<calcite-input-message status="invalid" icon="frown">Message</calcite-input-message>`, ze = {
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
}, Ge = e`<calcite-input-number
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
  ></calcite-input-number>`, We = e`<calcite-input-number
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
  ></calcite-input-number>`, _e = e`<calcite-input-number
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
  ></calcite-input-number>`, Oe = e`<calcite-input-number read-only step="any" value="100"></calcite-input-number>
  <calcite-input-number read-only step="any" value="100" number-button-type="horizontal"></calcite-input-number>`, Ue = e`<calcite-input-number
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
  ></calcite-input-number>`, je = e`<calcite-input-text
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input-text>`, Ve = {
  calciteLabelMarginBottom: "",
  calciteLabelTextColor: ""
}, qe = e`
  <calcite-label>
    Label text
    <calcite-input></calcite-input>
  </calcite-label>
`, Ye = {
  calciteLinkTextColor: ""
}, Qe = e` <calcite-link href="#" icon-start="banana" icon-end="information">link</calcite-link> `, Ze = {
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
}, Ke = e`<calcite-list>
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
</calcite-list>`, Xe = {
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
}, Je = e`<calcite-loader class="chromatic-ignore"></calcite-loader>`, et = {
  calciteNoticeBackgroundColor: "",
  calciteNoticeCloseBackgroundColorFocus: "",
  calciteNoticeCloseBackgroundColorPress: "",
  calciteNoticeCloseTextColorHover: "",
  calciteNoticeCloseTextColor: "",
  calciteNoticeCloseIconColorHover: "",
  calciteNoticeCloseIconColor: "",
  calciteNoticeTitleTextColor: "",
  calciteNoticeContentTextColor: ""
}, tt = e`<calcite-notice kind="success" scale="s" open closable>
  <div slot="title">Something worked</div>
  <div slot="message">That thing you wanted to do worked as expected</div>
</calcite-notice>`, ct = {
  calcitePaginationColor: "",
  calcitePaginationColorHover: "",
  calcitePaginationColorBorderHover: "",
  calcitePaginationColorBorderActive: "",
  calcitePaginationBackgroundColor: "",
  calcitePaginationIconColorBackgroundHover: ""
}, ot = e`<calcite-pagination
  total-items="1200"
  page-size="100"
  start-item="1"
></calcite-pagination>`, at = {
  calcitePopoverBackgroundColor: "",
  calcitePopoverBorderColor: "",
  calcitePopoverCornerRadius: "",
  calcitePopoverTextColor: "",
  calcitePopoverZIndex: ""
}, it = e`
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
`, lt = {
  calciteProgressBackgroundColor: "",
  calciteProgressFillColor: "",
  calciteProgressTextColor: ""
}, rt = e`
  <calcite-label layout="inline">
    <calcite-progress text="optional text" type="determinate" value="50"></calcite-progress>
  </calcite-label>
`, nt = {
  calciteSegmentedControlColor: "",
  calciteSegmentedControlBackgroundColor: "",
  calciteSegmentedControlBorderColor: "",
  calciteSegmentedControlShadow: "",
  calciteSegmentedControlIconColor: ""
}, st = e`<calcite-label>
  Segmented Control
  <calcite-segmented-control>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item> </calcite-segmented-control
  ><calcite-label></calcite-label
></calcite-label>`, dt = {
  calciteSelectFontSize: "",
  calciteSelectTextColor: "",
  calciteSelectBorderColor: "",
  calciteSelectIconColor: "",
  calciteSelectIconColorHover: ""
}, ut = e`<calcite-select>
  <calcite-option>uno</calcite-option>
  <calcite-option>dos</calcite-option>
  <calcite-option>tres</calcite-option>
</calcite-select>`, pt = {
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
}, bt = e`<calcite-stepper layout="horizontal" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 4" selected> </calcite-stepper-item>
</calcite-stepper>`, mt = e`<calcite-stepper layout="vertical" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 4" selected> </calcite-stepper-item>
</calcite-stepper>`, Ct = {
  calciteRadioButtonBackgroundColor: "",
  calciteRadioButtonBorderColor: "",
  calciteRadioButtonCornerRadius: "",
  calciteRadioButtonSize: ""
}, gt = e`<calcite-radio-button></calcite-radio-button>`, xt = {
  calciteRadioButtonGroupGap: "",
  calciteRadioButtonInputMessageSpacing: ""
}, vt = e`<calcite-radio-button-group>
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
</calcite-radio-button-group>`, ht = {
  calciteRatingSpacing: "",
  calciteRatingColorHover: "",
  calciteRatingColorPress: "",
  calciteRatingColor: "",
  calciteRatingAverageColor: "",
  calciteRatingAverageTextColor: "",
  calciteRatingCountTextColor: ""
}, Tt = e`<calcite-rating></calcite-rating>`, kt = {
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
}, It = e`<calcite-slider
  min="0"
  max="100"
  min-value="50"
  max-value="85"
  step="1"
  min-label="Temperature range (lower)"
  max-label="Temperature range (upper)"
  precise
></calcite-slider>`, ft = {
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
}, Bt = e`
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
`, St = e`
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
`, wt = {
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
}, At = e`<calcite-text-area placeholder="testing" max-length="10"></calcite-text-area>`, Pt = {
  calciteTooltipBackgroundColor: "",
  calciteTooltipBorderColor: "",
  calciteTooltipCornerRadius: "",
  calciteTooltipTextColor: "",
  calciteTooltipZIndex: ""
}, yt = e`
  <calcite-label layout="inline">
    <calcite-button title="Reference Element" id="tooltip-reference-element">nostrud exercitation</calcite-button>
    <calcite-tooltip reference-element="tooltip-reference-element" placement="auto" open>
      these 🥨s are making me thirsty
    </calcite-tooltip>
  </calcite-label>
`, Ht = {
  calciteAvatarCornerRadius: "",
  calciteAvatarColor: "",
  calciteAvatarBackgroundColor: ""
}, $t = e`<calcite-avatar full-name="Urbano Monti"></calcite-avatar>`, Dt = e`<calcite-avatar user-id="umonti"></calcite-avatar>`, Ft = e`<calcite-avatar
  thumbnail="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
></calcite-avatar>`, Rt = {
  calciteNavigationAccentColor: "",
  calciteNavigationBackgroundColor: "",
  calciteNavigationLogoHeadingTextColor: "",
  calciteNavigationLogoTextColor: ""
}, x = (t = !1) => e`
  <calcite-navigation-logo
    heading="Walt's Chips"
    description="Eastern Potato Chip Company"
    icon="layers"
    label="Walt's Chips"
    ${k("active", t)}
  >
  </calcite-navigation-logo>
`, Lt = e` ${x(!0)} ${x()} `, Nt = {
  calciteNavigationAccentColor: "",
  calciteNavigationUserBackgroundColor: "",
  calciteNavigationUserAvatarCornerRadius: "",
  calciteNavigationUserAvatarColor: "",
  calciteNavigationUserFullNameTextColor: "",
  calciteNavigationUserUserNameTextColor: ""
}, v = (t = !1) => e`
  <calcite-navigation-user
    full-name="Wendell Berry"
    username="w_berry"
    ${k("active", t)}
  ></calcite-navigation-user>
`, Mt = e`${v(!0)} ${v()}`, Et = {
  calciteTileAccentColorPress: "",
  calciteTileBackgroundColor: "",
  calciteTileBorderColor: "",
  calciteTileCornerRadius: "",
  calciteTileHeadingTextColor: "",
  calciteTileLinkColor: "",
  calciteTileShadow: "",
  calciteTileTextColor: ""
}, zt = e`
  <calcite-tile
    heading="Tile heading lorem ipsum"
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    icon="layers"
    selected
  ></calcite-tile>
`, Gt = {
  calciteTimePickerBackgroundColor: "",
  calciteTimePickerCornerRadius: "",
  calciteTimePickerButtonBackgroundColorHover: "",
  calciteTimePickerButtonBackgroundColorPress: "",
  calciteTimePickerColor: "",
  calciteTimePickerIconColor: "",
  calciteTimePickerInputBorderColorPress: "",
  calciteTimePickerInputBorderColorHover: ""
}, Wt = e`<calcite-time-picker></calcite-time-picker>`, _t = {
  calciteNavigationBackgroundColor: "",
  calciteNavigationBorderColor: "",
  calciteNavigationWidth: "",
  calciteNavigationBackground: ""
}, Ot = e`<calcite-navigation>
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
</calcite-navigation>`, Ut = {
  calciteMenuItemAccentColor: "",
  calciteMenuBackgroundColor: "",
  calciteMenuItemSubMenuBorderColor: "",
  calciteMenuItemSubMenuCornerRadius: "",
  calciteMenuTextColor: ""
}, h = (t) => e`<calcite-menu layout="${t}">
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
  </calcite-menu>`, jt = e` ${h("horizontal")} ${h("vertical")} `, Vt = {
  calciteStepperBarGap: "",
  calciteStepperBarInactiveFillColor: "",
  calciteStepperBarActiveFillColor: "",
  calciteStepperBarCompleteFillColor: "",
  calciteStepperBarErrorFillColor: ""
}, qt = e`<calcite-stepper layout="horizontal-single" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item>
</calcite-stepper>`, Yt = {
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
}, Qt = e`<calcite-combobox label="test" max-items="6" open>
  <calcite-combobox-item-group value="Trees" label="Trees">
    <calcite-combobox-item value="Pine" text-label="Pine">
      <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`, Zt = e`<calcite-combobox label="test" selection-mode="single">
  <calcite-combobox-item value="Trees" text-label="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`, Kt = e`<calcite-combobox label="test" placeholder-icon="layers">
  <calcite-combobox-item value="Trees" text-label="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
</calcite-combobox>`, Xt = {
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
}, Jt = e`
  <calcite-panel heading="Panel Heading" description="Panel description" closable collapsible>
    <calcite-action text="Action 1" text-enabled icon="icon1" slot="header-menu-actions"></calcite-action>
    <calcite-action text="Action 2" text-enabled icon="icon2" slot="header-menu-actions"></calcite-action>
    <calcite-action text="Action 3" icon="icon3" slot="header-actions-end"></calcite-action>
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
`, ec = {
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
}, tc = e`<calcite-shell-panel
  ><calcite-panel heading="Panel Heading" description="Panel description" closable collapsible>
    <calcite-action text="Action 1" text-enabled icon="icon1" slot="header-menu-actions"></calcite-action>
    <calcite-action text="Action 2" text-enabled icon="icon2" slot="header-menu-actions"></calcite-action>
    <calcite-action text="Action 3" icon="icon3" slot="header-actions-end"></calcite-action>
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
</calcite-shell-panel>`, cc = {
  calciteMeterBackgroundColor: "",
  calciteMeterBorderColor: "",
  calciteMeterShadow: "",
  calciteMeterCornerRadius: "",
  calciteMeterFillColor: "",
  calciteMeterRangeTextColor: "",
  calciteMeterValueTextColor: ""
}, oc = e`
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
`, f = {
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
function T(t) {
  return t.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function ac(t, o = !1) {
  if (o) {
    const a = Object.keys(t).map((c) => `--${T(c)}`);
    return A(a, " ");
  } else
    return Object.entries(t).map(([a, c]) => c && c !== "" ? `--${T(a)}: ${c};` : null).filter((a) => a).join("");
}
const B = (t, o = !1) => e`<div style="${ac(t, o)}">
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
        ${_} ${H} ${U} ${tt} ${st}
        <div style="display: flex">
          ${L}
          <div style="width: 40px; height: 40px;">${R}</div>
          ${De}
        </div>
        ${Re} ${Ne} ${je} ${ut} ${Zt} ${Ge} ${We}
        ${Oe} ${Ue} ${_e}
        ${Kt} ${Qt}
      </div>
      <div class="demo-column">
        <div>${te}</div>
        ${ce}
        <div>${ve} ${Y}</div>
        <div>${Se}</div>
        <div>${ae}</div>
        ${le} ${ot} ${It} ${oc}
      </div>
      <div class="demo-column">
        ${Bt} ${St} ${qe} ${Qe} ${Ke} ${Je} ${X} ${Dt} ${$t}
        ${Ft} ${rt} ${$e} ${ye} ${At} ${it} ${zt} ${Wt} ${yt}
        ${ne} ${se}
      </div>
      <div class="demo-column">
        ${Ot} ${Lt} ${Mt} ${Z} ${V} ${Tt} ${Jt} ${tc}
      </div>
      <div class="demo-column"><div class="demo-column">${M}</div></div>
      <div class="demo-column">${jt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${be}</div>
      <div class="demo-column">${me}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Te}</div>
      <div class="demo-column">${ke}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${fe}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Ee}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${gt}</div>
      <div class="demo-column">${vt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${I}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${qt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${mt}</div>
      <div class="demo-column">${bt}</div>
    </div>
  </div>`, S = {
  ...f,
  ...E,
  ...W,
  ...y,
  ...$,
  ...D,
  ...F,
  ...P,
  ...N,
  ...O,
  ...Ht,
  ...Q,
  ...j,
  ...J,
  ...oe,
  ...ie,
  ...re,
  ...Yt,
  ...pe,
  ...Ce,
  ...xe,
  ...ge,
  ...he,
  ...Ie,
  ...Be,
  ...He,
  ...Fe,
  ...ze,
  ...Pe,
  ...Le,
  ...Me,
  ...Ve,
  ...Ye,
  ...Ze,
  ...Xe,
  ...Rt,
  ..._t,
  ...Nt,
  ...et,
  ...ct,
  ...Xt,
  ...at,
  ...lt,
  ...nt,
  ...Ct,
  ...xt,
  ...ht,
  ...dt,
  ...pt,
  ...kt,
  ...K,
  ...ft,
  ...wt,
  ...Et,
  ...Gt,
  ...Pt,
  ...G,
  ...Ut,
  ...ec,
  ...cc,
  ...Vt
}, ic = {
  title: "Theming/Custom Theme",
  args: {
    ...f,
    ...S
  }
}, l = (t) => B(t), r = () => B({
  ...S
}, !0);
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(args: Record<string, string>): string => {
  return kitchenSink(args);
}`,
      ...l.parameters?.docs?.source
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
const lc = ["themingInteractive", "theming"], bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __namedExportsOrder: lc,
  default: ic,
  theming: r,
  themingInteractive: l
}, Symbol.toStringTag, { value: "Module" }));
export {
  bc as s
};
