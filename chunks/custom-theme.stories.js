import { h as e } from "./formatting.js";
import { s as S } from "./cssTokenValues.js";
import { S as d } from "./resources4.js";
import { p as r } from "./placeholder-image.js";
import { S as b } from "./resources5.js";
import { b as k } from "./utils.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.2.0-next.9 */
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
}, D = { calciteActionMenuItemsSpace: "" }, L = {
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
</calcite-action-menu>`, R = e`<calcite-action-pad expanded>
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
</calcite-alert>`, E = {
  calciteAccordionItemContentSpace: "",
  calciteAccordionItemExpandIconColor: "",
  calciteAccordionItemHeaderBackgroundColor: "",
  calciteAccordionItemHeadingTextColor: "",
  calciteAccordionItemIconColorEnd: "",
  calciteAccordionItemIconColorStart: ""
}, _ = (t) => e`<calcite-accordion-item
    icon-end="car"
    icon-start="layers"
    heading="${t === 0 ? "Accordion Item" : `Accordion Item ${t + 1}`}"
    ><img src="${r({ width: 100, height: 50 })}" />
  </calcite-accordion-item>`, G = {
  calciteTreeTextColor: "",
  calciteTreeTextColorSelected: "",
  calciteTreeSelectedIconColor: ""
}, f = e`<calcite-tree lines>
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
}, z = e`<style>
    calcite-accordion-item:hover {
      --calcite-accordion-item-background-color: white;
    }
    calcite-accordion-item[expanded] {
      --calcite-accordion-item-header-background-color: #ccc;
    }</style
  ><calcite-accordion>
    ${[0, 1, 2, 3, 4].map((t) => _(t)).join(`
`)}
    <calcite-accordion-item heading="Accordion Item 6" expanded>${f}</calcite-accordion-item>
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
  <div slot="${b.contentTop}">Top</div>
  <div slot="${b.contentBottom}">Bottom</div>
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
  calciteBlockHeadingTextColorPress: ""
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
</calcite-block>`, q = ["", ""], u = (t) => {
  const [o, a] = Object.entries(t).filter(([c, i]) => c && i && i !== "").reduce(([c, i], [I, s]) => (c += `${I}="${s}" `, i += `${s} `, [c, i]), q);
  return e`<calcite-button ${o.trim()}>${a.trim()}</calcite-button>`;
}, Y = e`${u({ appearance: "outline" })} ${u({ kind: "danger" })}`, Q = {
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
  src="${r({
  width: 380,
  height: 180
})}"
  style="width: 380px;"
/> `, te = e`<calcite-card selected selectable>
  <img alt="thumbnail" slot="thumbnail" style="width:260px" src="${r({ width: 260, height: 160 })}" />
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
  calciteCheckboxColor: "",
  calciteCheckboxBorderColor: ""
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
  </div>`, ne = {
  calciteComboboxTextColor: "",
  calciteComboboxTextColorHover: "",
  calciteComboboxItemBackgroundColorActive: "",
  calciteComboboxItemBackgroundColorHover: "",
  calciteComboboxSelectedIconColor: "",
  calciteComboboxDescriptionTextColor: "",
  calciteComboboxDescriptionTextColorPress: "",
  calciteComboboxHeadingTextColor: ""
}, re = e` <calcite-combobox-item
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
var m = Object.freeze, de = Object.defineProperty, be = (t, o) => m(de(t, "raw", { value: m(t.slice()) })), p;
const ue = {
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
}, me = e` <calcite-date-picker value="2020-11-27"></calcite-date-picker> `, pe = e(p || (p = be([`
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
}, he = e`<calcite-dropdown open>
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
}, ve = e`<calcite-fab></calcite-fab>`, ke = e`<calcite-fab loading></calcite-fab>`, fe = {
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
}, we = e`
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
var C = Object.freeze, Ae = Object.defineProperty, Be = (t, o) => C(Ae(t, "raw", { value: C(t.slice()) })), g;
const Ie = {
  calciteGraphHighlightFillColor: ""
}, Se = e(g || (g = Be([`<div style="width:300px; height:100px">
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
  <\/script>`]))), Pe = {
  calciteHandleBackgroundColor: "",
  calciteHandleBackgroundColorHover: "",
  calciteHandleBackgroundColorSelected: "",
  calciteHandleIconColor: "",
  calciteHandleIconColorHover: "",
  calciteHandleIconColorSelected: ""
}, ye = e`<calcite-handle></calcite-handle>`, He = e`<calcite-icon icon="3d-glasses"></calcite-icon>`, $e = {
  calciteInlineEditableBackgroundColor: "",
  calciteInlineEditableBackgroundColorHover: "",
  calciteInlineEditableButtonBackgroundColor: "",
  calciteInlineEditableButtonCornerRadius: "",
  calciteInlineEditableButtonLoaderColor: "",
  calciteInlineEditableButtonShadowColor: "",
  calciteInlineEditableButtonTextColor: ""
}, De = e`
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
}, Fe = e`<calcite-input
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input>`, Re = {
  calciteInputMessageIconColor: "",
  calciteInputMessageSpacing: "",
  calciteInputMessageSpacingValue: ""
}, Me = e`<calcite-input-message status="invalid" icon="frown">Message</calcite-input-message>`, Ne = e`<calcite-input-number
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input-number>`, Ee = e`<calcite-input-text
  placeholder="Placeholder text"
  prefix-text="prefix"
  suffix-text="suffix"
></calcite-input-text>`, _e = {
  calciteLabelMarginBottom: "",
  calciteLabelTextColor: ""
}, Ge = e`
  <calcite-label>
    Label text
    <calcite-input></calcite-input>
  </calcite-label>
`, We = {
  calciteLinkTextColor: ""
}, ze = e` <calcite-link href="#" icon-start="banana" icon-end="information">link</calcite-link> `, Oe = {
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
}, Ue = e`<calcite-list>
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
</calcite-list>`, je = {
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
}, Ve = e`<calcite-loader class="chromatic-ignore"></calcite-loader>`, qe = {
  calciteNoticeBackgroundColor: "",
  calciteNoticeCloseBackgroundColorFocus: "",
  calciteNoticeCloseBackgroundColorPress: "",
  calciteNoticeCloseTextColorHover: "",
  calciteNoticeCloseTextColor: "",
  calciteNoticeContentTextColor: ""
}, Ye = e`<calcite-notice kind="success" scale="s" open closable>
  <div slot="title">Something worked</div>
  <div slot="message">That thing you wanted to do worked as expected</div>
</calcite-notice>`, Qe = {
  calcitePaginationColor: "",
  calcitePaginationColorHover: "",
  calcitePaginationColorBorderHover: "",
  calcitePaginationColorBorderActive: "",
  calcitePaginationBackgroundColor: "",
  calcitePaginationIconColorBackgroundHover: ""
}, Ze = e`<calcite-pagination
  total-items="1200"
  page-size="100"
  start-item="1"
></calcite-pagination>`, Ke = {
  calcitePopoverBackgroundColor: "",
  calcitePopoverBorderColor: "",
  calcitePopoverCornerRadius: "",
  calcitePopoverTextColor: "",
  calcitePopoverZIndex: ""
}, Xe = e`
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
`, Je = {
  calciteProgressBackgroundColor: "",
  calciteProgressFillColor: "",
  calciteProgressTextColor: ""
}, et = e`
  <calcite-label layout="inline">
    <calcite-progress text="optional text" type="determinate" value="50"></calcite-progress>
  </calcite-label>
`, tt = {
  calciteSegmentedControlColor: "",
  calciteSegmentedControlBackgroundColor: "",
  calciteSegmentedControlBorderColor: "",
  calciteSegmentedControlShadow: "",
  calciteSegmentedControlIconColor: ""
}, ct = e`<calcite-label>
  Segmented Control
  <calcite-segmented-control>
    <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
    <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
    <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
    <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item> </calcite-segmented-control
  ><calcite-label></calcite-label
></calcite-label>`, ot = {
  calciteSelectFontSize: "",
  calciteSelectTextColor: "",
  calciteSelectBorderColor: "",
  calciteSelectIconColor: "",
  calciteSelectIconColorHover: ""
}, at = e`<calcite-select>
  <calcite-option>uno</calcite-option>
  <calcite-option>dos</calcite-option>
  <calcite-option>tres</calcite-option>
</calcite-select>`, it = {
  calciteRatingSpacing: "",
  calciteRatingColorHover: "",
  calciteRatingColorPress: "",
  calciteRatingColor: "",
  calciteRatingAverageColor: "",
  calciteRatingAverageTextColor: "",
  calciteRatingCountTextColor: ""
}, lt = e`<calcite-rating></calcite-rating>`, nt = {
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
}, rt = e`<calcite-slider
  min="0"
  max="100"
  min-value="50"
  max-value="85"
  step="1"
  min-label="Temperature range (lower)"
  max-label="Temperature range (upper)"
  precise
></calcite-slider>`, st = {
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
}, dt = e`
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
`, bt = e`
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
`, ut = {
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
}, mt = e`<calcite-text-area placeholder="testing" max-length="10"></calcite-text-area>`, pt = {
  calciteTooltipBackgroundColor: "",
  calciteTooltipBorderColor: "",
  calciteTooltipCornerRadius: "",
  calciteTooltipTextColor: "",
  calciteTooltipZIndex: ""
}, Ct = e`
  <calcite-label layout="inline">
    <calcite-button title="Reference Element" id="tooltip-reference-element">nostrud exercitation</calcite-button>
    <calcite-tooltip reference-element="tooltip-reference-element" placement="auto" open>
      these 🥨s are making me thirsty
    </calcite-tooltip>
  </calcite-label>
`, gt = {
  calciteAvatarCornerRadius: "",
  calciteAvatarColor: "",
  calciteAvatarBackgroundColor: ""
}, xt = e`<calcite-avatar full-name="Urbano Monti"></calcite-avatar>`, ht = e`<calcite-avatar user-id="umonti"></calcite-avatar>`, Tt = e`<calcite-avatar
  thumbnail="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
></calcite-avatar>`, vt = {
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
`, kt = e` ${x(!0)} ${x()} `, ft = {
  calciteNavigationAccentColor: "",
  calciteNavigationUserBackgroundColor: "",
  calciteNavigationUserAvatarCornerRadius: "",
  calciteNavigationUserAvatarColor: "",
  calciteNavigationUserFullNameTextColor: "",
  calciteNavigationUserUserNameTextColor: ""
}, h = (t = !1) => e`
  <calcite-navigation-user
    full-name="Wendell Berry"
    username="w_berry"
    ${k("active", t)}
  ></calcite-navigation-user>
`, wt = e`${h(!0)} ${h()}`, At = {
  calciteTileAccentColorPress: "",
  calciteTileBackgroundColor: "",
  calciteTileBorderColor: "",
  calciteTileCornerRadius: "",
  calciteTileHeadingTextColor: "",
  calciteTileLinkColor: "",
  calciteTileShadow: "",
  calciteTileTextColor: ""
}, Bt = e`
  <calcite-tile
    heading="Tile heading lorem ipsum"
    description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
    icon="layers"
    selected
  ></calcite-tile>
`, It = {
  calciteNavigationBackgroundColor: "",
  calciteNavigationBorderColor: "",
  calciteNavigationWidth: "",
  calciteNavigationBackground: ""
}, St = e`<calcite-navigation>
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
</calcite-navigation>`, Pt = {
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
  </calcite-menu>`, yt = e` ${T("horizontal")} ${T("vertical")} `, Ht = {
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
}, $t = e`<calcite-combobox label="test" max-items="6" open>
  <calcite-combobox-item-group value="Trees" label="Trees">
    <calcite-combobox-item value="Pine" text-label="Pine">
      <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`, Dt = e`<calcite-combobox label="test" selection-mode="single">
  <calcite-combobox-item value="Trees" text-label="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`, Lt = e`<calcite-combobox label="test" placeholder-icon="layers">
  <calcite-combobox-item value="Trees" text-label="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
</calcite-combobox>`, Ft = {
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
}, Rt = e`
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
`, Mt = {
  calciteShellPanelWidth: "",
  calciteShellPanelMaxWidth: "",
  calciteShellPanelMinWidth: "",
  calciteShellPanelHeight: "",
  calciteShellPanelMaxHeight: "",
  calciteShellPanelMinHeight: "",
  calciteShellPanelZIndex: "",
  calciteShellPanelBorderColor: "",
  calciteShellPanelCornerRadius: "",
  calciteShellPanelShadow: ""
}, Nt = e`<calcite-shell-panel
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
</calcite-shell-panel>`, Et = {
  calciteMeterBackgroundColor: "",
  calciteMeterBorderColor: "",
  calciteMeterShadow: "",
  calciteMeterCornerRadius: "",
  calciteMeterFillColor: "",
  calciteMeterRangeTextColor: "",
  calciteMeterValueTextColor: ""
}, _t = e`
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
`, w = {
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
function v(t) {
  return t.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function Gt(t, o = !1) {
  if (o) {
    const a = Object.keys(t).map((c) => `--${v(c)}`);
    return S(a, " ");
  } else
    return Object.entries(t).map(([a, c]) => c && c !== "" ? `--${v(a)}: ${c};` : null).filter((a) => a).join("");
}
const A = (t, o = !1) => e`<div style="${Gt(t, o)}">
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
        ${z} ${H} ${U} ${Ye} ${ct}
        <div style="display: flex">
          ${R}
          <div style="width: 40px; height: 40px;">${F}</div>
          ${He}
        </div>
        ${De} ${Fe} ${Ne} ${Ee} ${at} ${Dt}
        ${Lt} ${$t}
      </div>
      <div class="demo-column">
        <div>${te}</div>
        ${ce}
        <div>${he} ${Y}</div>
        <div>${we}</div>
        <div>${ae}</div>
        ${le} ${Ze} ${rt} ${_t}
      </div>
      <div class="demo-column">
        ${dt} ${bt} ${Ge} ${ze} ${Ue} ${Ve} ${X} ${ht} ${xt}
        ${Tt} ${et} ${ye} ${Se} ${mt} ${Xe} ${Bt} ${Ct} ${re}
        ${se}
      </div>
      <div class="demo-column">
        ${St} ${kt} ${wt} ${Z} ${V} ${lt} ${Rt} ${Nt}
      </div>
      <div class="demo-column"><div class="demo-column">${N}</div></div>
      <div class="demo-column">${yt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${me}</div>
      <div class="demo-column">${pe}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${ve}</div>
      <div class="demo-column">${ke}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Me}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${f}</div>
    </div>
  </div>`, B = {
  ...w,
  ...E,
  ...W,
  ...y,
  ...$,
  ...D,
  ...L,
  ...P,
  ...M,
  ...O,
  ...gt,
  ...Q,
  ...j,
  ...J,
  ...oe,
  ...ie,
  ...ne,
  ...Ht,
  ...ue,
  ...Ce,
  ...xe,
  ...ge,
  ...Te,
  ...fe,
  ...Pe,
  ...$e,
  ...Ie,
  ...Le,
  ...Re,
  ..._e,
  ...We,
  ...Oe,
  ...je,
  ...vt,
  ...It,
  ...ft,
  ...qe,
  ...Qe,
  ...Ft,
  ...Ke,
  ...Je,
  ...tt,
  ...it,
  ...ot,
  ...nt,
  ...K,
  ...st,
  ...ut,
  ...At,
  ...pt,
  ...G,
  ...Pt,
  ...Mt,
  ...Et
}, Wt = {
  title: "Theming/Custom Theme",
  args: {
    ...w,
    ...B
  }
}, l = (t) => A(t), n = () => A({
  ...B
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
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => {
  return kitchenSink({
    ...componentTokens
  }, true);
}`,
      ...n.parameters?.docs?.source
    }
  }
};
const zt = ["themingInteractive", "theming"], Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __namedExportsOrder: zt,
  default: Wt,
  theming: n,
  themingInteractive: l
}, Symbol.toStringTag, { value: "Module" }));
export {
  Qt as s
};
