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
import { n as w, o as B, q as P, r as S, u as f, v as A, w as D, x as H, y as $, z as y, A as F, B as R, C as L, D as M, E as N, F as E, f as G, a as z, e as W, g as O, c as U, G as _, H as q, I as V, J as j, K as Y, L as X, i as Z, M as Q, N as K, O as J, P as ee, d as te, k as ce, Q as ae, b as oe, p as ie, l as le, t as re, j as ne, R as se, m as de, s as pe, h as me } from "./color-picker2.js";
import "./block.js";
import "./icon.js";
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
import "./stepper-item.js";
import "./stepper.js";
import "./radio-button.js";
import "./radio-button-group.js";
import "./rating.js";
import "./slider.js";
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
import "./menu-item.js";
import "./menu.js";
import "./navigation.js";
import "./combobox-item-group.js";
import "./combobox.js";
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
import "./input-time-picker.js";
const ue = {
  calciteActionIndicatorColor: "",
  calciteActionBackgroundColor: "",
  calciteActionBackgroundColorHover: "",
  calciteActionBackgroundColorPressed: "",
  calciteActionTextColor: "",
  calciteActionTextColorPressed: "",
  calciteActionLoaderColor: ""
}, be = {
  calciteActionBarExpandedMaxWidth: "",
  calciteActionBarItemsSpace: ""
}, Ce = e`<calcite-action-bar layout="horizontal" style="width:100%">
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
</calcite-action-bar>`, ge = {
  calciteActionGroupBorderColor: "",
  calciteActionGroupColumns: ""
}, ve = { calciteActionMenuItemsSpace: "" }, he = {
  calciteActionPadCornerRadius: "",
  calciteActionPadExpandedMaxWidth: "",
  calciteActionPadItemsSpace: ""
}, Te = e`<calcite-action-menu open>
  <calcite-action slot="trigger" text="Add" icon="banana"></calcite-action>
  <calcite-action-group>
    <calcite-action text="Plus" icon="plus" text-enabled></calcite-action
    ><calcite-action text="Minus" icon="minus" text-enabled></calcite-action>
  </calcite-action-group>
  <calcite-action-group> <calcite-action text="Table" icon="table" text-enabled></calcite-action></calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Save" icon="save" text-enabled></calcite-action>
  </calcite-action-group>
</calcite-action-menu>`, ke = e`<calcite-action-pad expanded>
  <calcite-action-group>
    <calcite-action text="Add to my custom action pad application" icon="plus"></calcite-action>
    <calcite-action text="Save to my custom action pad application" icon="save"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Layers in my custom action pad application" icon="layers"></calcite-action>
  </calcite-action-group>
</calcite-action-pad>`, xe = {
  calciteAlertWidth: "",
  calciteAlertBackgroundColor: "",
  calciteAlertCornerRadius: "",
  calciteAlertShadow: ""
}, Ie = e`<calcite-alert label="this is a default alert" scale="s" open>
  <div slot="${r.title}">Test title</div>
  <div slot="${r.message}">Test message</div>
</calcite-alert>`, we = {
  calciteAccordionItemContentSpace: "",
  calciteAccordionItemExpandIconColor: "",
  calciteAccordionItemHeaderBackgroundColor: "",
  calciteAccordionItemHeadingTextColor: "",
  calciteAccordionItemIconColorEnd: "",
  calciteAccordionItemIconColorStart: ""
}, Be = (t) => e`<calcite-accordion-item
    icon-end="car"
    icon-start="layers"
    heading="${t === 0 ? "Accordion Item" : `Accordion Item ${t + 1}`}"
    ><img src="${I({ width: 100, height: 50 })}" />
  </calcite-accordion-item>`, Pe = {
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
</calcite-tree>`, Se = {
  calciteAccordionBackgroundColor: "",
  calciteAccordionBorderColor: "",
  calciteAccordionTextColor: "",
  calciteAccordionTextColorHover: "",
  calciteAccordionTextColorPress: ""
}, fe = e`<style>
    calcite-accordion-item:hover {
      --calcite-accordion-item-background-color: white;
    }
    calcite-accordion-item[expanded] {
      --calcite-accordion-item-header-background-color: #ccc;
    }</style
  ><calcite-accordion>
    ${[0, 1, 2, 3, 4].map((t) => Be(t)).join(`
`)}
    <calcite-accordion-item heading="Accordion Item 6" expanded>${v}</calcite-accordion-item>
  </calcite-accordion>`, Ae = {
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
}, De = e` <calcite-block
  heading="heading"
  description="description"
  open
  expandable
  icon-end="pen"
  icon-start="pen"
>
  <calcite-icon icon="compass" slot="content-start"></calcite-icon>
  <div>content</div>
</calcite-block>`, He = {
  calciteBlockSectionBackgroundColor: "",
  calciteBlockSectionBorderColor: "",
  calciteBlockSectionContentSpace: "",
  calciteBlockSectionHeaderTextColor: "",
  calciteBlockSectionHeaderTextColorHover: "",
  calciteBlockSectionTextColor: ""
}, $e = e`
  <calcite-block-section text="Planes" open icon-end="pen" icon-start="pen" text="a block-section">
    <p>Block section content</p>
  </calcite-block-section>
`, ye = {
  calciteSwitchBackgroundColor: "",
  calciteSwitchBackgroundColorHover: "",
  calciteSwitchBorderColor: "",
  calciteSwitchHandleBorderColor: "",
  calciteSwitchHandleBackgroundColor: "",
  calciteSwitchHandleShadow: "",
  calciteSwitchCornerRadius: ""
}, Fe = e`
  <calcite-label layout="inline">
    <calcite-switch scale="m" checked></calcite-switch>
    Red switch scale medium
  </calcite-label>
`, Re = {
  calciteCheckboxSize: "",
  calciteCheckboxBorderColor: "",
  calciteCheckboxBorderColorHover: "",
  calciteCheckboxBorderColorPress: "",
  calciteCheckboxIconColor: ""
}, Le = e`<label>
  <calcite-checkbox indeterminate></calcite-checkbox>
  Initially indeterminate and unchecked
</label>`, Me = {
  calciteChipBackgroundColor: "",
  calciteChipBorderColor: "",
  calciteChipCloseIconColor: "",
  calciteChipCornerRadius: "",
  calciteChipIconColor: "",
  calciteChipSelectIconColorPress: "",
  calciteChipSelectIconColor: "",
  calciteChipTextColor: ""
}, Ne = e`<div>
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
  </div>`, Ee = {
  calciteComboboxTextColor: "",
  calciteComboboxTextColorHover: "",
  calciteComboboxItemBackgroundColorActive: "",
  calciteComboboxItemBackgroundColorHover: "",
  calciteComboboxSelectedIconColor: "",
  calciteComboboxDescriptionTextColor: "",
  calciteComboboxDescriptionTextColorPress: "",
  calciteComboboxHeadingTextColor: ""
}, Ge = e` <calcite-combobox-item
  value="Pikachu"
  heading="Pikachu"
  description="Pokemon's mascot"
  short-heading="0025"
  icon="tree"
></calcite-combobox-item>`, ze = e`<calcite-combobox-item
  value="Pikachu"
  heading="Pikachu"
  description="Pokemon's mascot"
  short-heading="0025"
  icon="tree"
  selected
></calcite-combobox-item>`, We = {
  calciteDropdownWidth: "",
  calciteDropdownBackgroundColor: "",
  calciteDropdownMaxHeight: ""
}, Oe = {
  calciteDropdownGroupBorderColor: "",
  calciteDropdownGroupTitleTextColor: ""
}, Ue = {
  calciteDropdownItemTextColor: "",
  calciteDropdownItemBackgroundColorHover: "",
  calciteDropdownItemBackgroundColorPress: "",
  calciteDropdownItemIconColorHover: "",
  calciteDropdownItemIconColorPress: "",
  calciteDropdownItemTextColorPress: ""
}, _e = e`<calcite-dropdown open>
  <calcite-button slot="trigger">Primary</calcite-button>
  <calcite-dropdown-group group-title="View">
    <calcite-dropdown-item icon-start="list-bullet" icon-end="list-bullet" selected>List</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="grid">Grid</calcite-dropdown-item>
    <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-group>
    <calcite-dropdown-item href="esri.com" icon-start="home">Home</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>`, qe = {
  calciteFabBackgroundColor: "",
  calciteFabBorderColor: "",
  calciteFabCornerRadius: "",
  calciteFabTextColor: "",
  calciteFabLoaderColor: "",
  calciteFabShadow: ""
}, Ve = e`<calcite-fab></calcite-fab>`, je = e`<calcite-fab loading></calcite-fab>`, Ye = {
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
}, Xe = e`<calcite-filter></calcite-filter>`, Ze = {
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
}, Qe = e`
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
var n = Object.freeze, Ke = Object.defineProperty, Je = (t, l) => n(Ke(t, "raw", { value: n(t.slice()) })), s;
const et = {
  calciteGraphHighlightFillColor: ""
}, tt = e(s || (s = Je([`<div style="width:300px; height:100px">
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
  <\/script>`]))), ct = {
  calciteHandleBackgroundColor: "",
  calciteHandleBackgroundColorHover: "",
  calciteHandleBackgroundColorSelected: "",
  calciteHandleIconColor: "",
  calciteHandleIconColorHover: "",
  calciteHandleIconColorSelected: ""
}, at = e`<calcite-handle></calcite-handle>`, ot = e`<calcite-icon icon="3d-glasses"></calcite-icon>`, it = {
  calciteInlineEditableBackgroundColor: "",
  calciteInlineEditableBackgroundColorHover: "",
  calciteInlineEditableButtonBackgroundColor: "",
  calciteInlineEditableButtonBackgroundColorHover: "",
  calciteInlineEditableButtonBackgroundColorPress: "",
  calciteInlineEditableButtonCornerRadius: "",
  calciteInlineEditableButtonLoaderColor: "",
  calciteInlineEditableButtonTextColor: "",
  calciteInlineEditableButtonTextColorPress: ""
}, lt = e`
  <calcite-inline-editable>
    <calcite-input />
  </calcite-inline-editable>
`, rt = {
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
}, nt = e`<calcite-input-date-picker open></calcite-input-date-picker>`, st = e`<calcite-input-date-picker range open></calcite-input-date-picker>`, dt = e`<calcite-input-date-picker
  range
  layout="vertical"
  open
></calcite-input-date-picker>`, pt = {
  calciteInputMessageIconColor: "",
  calciteInputMessageSpacing: "",
  calciteInputMessageSpacingValue: ""
}, mt = e`<calcite-input-message status="invalid" icon="frown"
  >Message</calcite-input-message
>`, ut = e`<calcite-input-message status="valid" icon="smile"
  >Message</calcite-input-message
>`, bt = e`<calcite-input-message status="idle" icon="information"
  >Message</calcite-input-message
>`, Ct = {
  calciteLabelMarginBottom: "",
  calciteLabelTextColor: ""
}, gt = e`
  <calcite-label>
    Label text
    <calcite-input></calcite-input>
  </calcite-label>
`, vt = {
  calciteLinkTextColor: ""
}, ht = e` <calcite-link href="#" icon-start="banana" icon-end="information">link</calcite-link> `, Tt = {
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
}, kt = e`<calcite-list>
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
</calcite-list>`, xt = {
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
}, It = e`<calcite-loader class="chromatic-ignore"></calcite-loader>`, wt = {
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
}, d = (t) => e`<calcite-notice appearance="${t}" kind="success" scale="s" open closable><div slot="title" > Something worked </div>
    < div slot = "message" > That thing you wanted to do worked as expected</ div >
      </calcite-notice>`, Bt = e` ${d("outline-fill")} ${d("transparent")} `, Pt = {
  calcitePaginationColor: "",
  calcitePaginationColorHover: "",
  calcitePaginationColorBorderHover: "",
  calcitePaginationColorBorderActive: "",
  calcitePaginationBackgroundColor: "",
  calcitePaginationIconColorBackgroundHover: ""
}, St = e`<calcite-pagination
  total-items="1200"
  page-size="100"
  start-item="1"
></calcite-pagination>`, ft = {
  calcitePopoverBackgroundColor: "",
  calcitePopoverBorderColor: "",
  calcitePopoverCornerRadius: "",
  calcitePopoverMaxSizeX: "",
  calcitePopoverTextColor: "",
  calcitePopoverZIndex: ""
}, At = e`
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
`, Dt = {
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
}, Ht = e`<calcite-stepper layout="horizontal" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 4" selected> </calcite-stepper-item>
</calcite-stepper>`, $t = e`<calcite-stepper layout="vertical" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 4" selected> </calcite-stepper-item>
</calcite-stepper>`, yt = {
  calciteRadioButtonBackgroundColor: "",
  calciteRadioButtonBorderColor: "",
  calciteRadioButtonCornerRadius: "",
  calciteRadioButtonSize: ""
}, Ft = e`<calcite-radio-button></calcite-radio-button>`, Rt = {
  calciteRadioButtonGroupGap: "",
  calciteRadioButtonInputMessageSpacing: ""
}, Lt = e`<calcite-radio-button-group>
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
</calcite-radio-button-group>`, Mt = {
  calciteRatingSpacing: "",
  calciteRatingColorHover: "",
  calciteRatingColorPress: "",
  calciteRatingColor: "",
  calciteRatingAverageColor: "",
  calciteRatingAverageTextColor: "",
  calciteRatingCountTextColor: ""
}, Nt = e`<calcite-rating></calcite-rating>`, Et = {
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
}, Gt = e`<calcite-slider
  min="0"
  max="100"
  min-value="50"
  max-value="85"
  step="1"
  min-label="Temperature range (lower)"
  max-label="Temperature range (upper)"
  precise
></calcite-slider>`, zt = {
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
}, Wt = e`
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
`, Ot = e`
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
`, Ut = {
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
}, _t = e`<calcite-text-area placeholder="testing" max-length="10"></calcite-text-area>`, qt = {
  calciteTooltipBackgroundColor: "",
  calciteTooltipBorderColor: "",
  calciteTooltipCornerRadius: "",
  calciteTooltipMaxSizeX: "",
  calciteTooltipTextColor: "",
  calciteTooltipZIndex: ""
}, Vt = e`
  <calcite-label layout="inline">
    <calcite-button title="Reference Element" id="tooltip-reference-element">nostrud exercitation</calcite-button>
    <calcite-tooltip reference-element="tooltip-reference-element" placement="auto" open>
      these 🥨s are making me thirsty
    </calcite-tooltip>
  </calcite-label>
`, jt = {
  calciteAvatarCornerRadius: "",
  calciteAvatarColor: "",
  calciteAvatarBackgroundColor: ""
}, Yt = e`<calcite-avatar full-name="Urbano Monti"></calcite-avatar>`, Xt = e`<calcite-avatar user-id="umonti"></calcite-avatar>`, Zt = e`<calcite-avatar
  thumbnail="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
></calcite-avatar>`, Qt = {
  calciteNavigationAccentColor: "",
  calciteNavigationBackgroundColor: "",
  calciteNavigationLogoHeadingTextColor: "",
  calciteNavigationLogoTextColor: ""
}, p = (t = !1) => e`
  <calcite-navigation-logo
    heading="Walt's Chips"
    description="Eastern Potato Chip Company"
    icon="layers"
    label="Walt's Chips"
    ${g("active", t)}
  >
  </calcite-navigation-logo>
`, Kt = e` ${p(!0)} ${p()} `, Jt = {
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
`, ec = e`${m(!0)} ${m()}`, tc = {
  calciteNavigationBackgroundColor: "",
  calciteNavigationBorderColor: "",
  calciteNavigationWidth: "",
  calciteNavigationBackground: ""
}, cc = e`<calcite-navigation>
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
</calcite-navigation>`, ac = {
  calciteMenuItemAccentColor: "",
  calciteMenuBackgroundColor: "",
  calciteMenuItemSubMenuBorderColor: "",
  calciteMenuItemSubMenuCornerRadius: "",
  calciteMenuTextColor: ""
}, u = (t) => e`<calcite-menu layout="${t}">
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
  </calcite-menu>`, oc = e` ${u("horizontal")} ${u("vertical")} `, ic = {
  calciteStepperBarGap: "",
  calciteStepperBarInactiveFillColor: "",
  calciteStepperBarActiveFillColor: "",
  calciteStepperBarCompleteFillColor: "",
  calciteStepperBarErrorFillColor: ""
}, lc = e`<calcite-stepper layout="horizontal-single" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item>
</calcite-stepper>`, rc = {
  calciteComboboxInputHeight: "",
  calciteComboboxInputBackgroundColor: "",
  calciteComboboxInputTextColor: "",
  calciteComboboxInputBorderColor: "",
  calciteComboboxIconColor: "",
  calciteComboboxIconColorHover: "",
  calciteComboboxBackgroundColor: "",
  calciteComboboxCornerRadius: "",
  calciteChipBackgroundColor: "",
  calciteChipTextColor: "",
  calciteChipIconColor: "",
  calciteChipCloseIconColor: "",
  calciteChipCornerRadius: "",
  calciteComboboxItemGroupTextColor: "",
  calciteComboboxItemGroupBorderColor: ""
}, nc = e`<calcite-combobox label="test" max-items="6" open>
  <calcite-combobox-item-group value="Trees" label="Trees">
    <calcite-combobox-item value="Pine" heading="Pine">
      <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
  <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`, sc = e`<calcite-combobox label="test" selection-mode="single">
  <calcite-combobox-item value="Trees" heading="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
</calcite-combobox>`, dc = e`<calcite-combobox label="test" placeholder-icon="layers">
  <calcite-combobox-item value="Trees" heading="Trees"></calcite-combobox-item>
  <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
  <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
</calcite-combobox>`;
e`
  <calcite-combobox open filter-text="Three" selection-mode="single">
    <calcite-combobox-item value="one" heading="One"></calcite-combobox-item>
    <calcite-combobox-item value="two" heading="Two"></calcite-combobox-item>
  </calcite-combobox>
`;
const pc = {
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
}, mc = e`
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
}, bc = e`<calcite-shell-panel
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
</calcite-shell-panel>`, Cc = {
  calciteMeterBackgroundColor: "",
  calciteMeterBorderColor: "",
  calciteMeterShadow: "",
  calciteMeterCornerRadius: "",
  calciteMeterFillColor: "",
  calciteMeterRangeTextColor: "",
  calciteMeterValueTextColor: ""
}, gc = e`
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
`, vc = {
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
}, hc = e`
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
`, Tc = {
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
}, kc = e`
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
`, xc = {
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
`, wc = {
  calciteSwatchCornerRadius: ""
}, Bc = e` <calcite-swatch color="#aabbcc" label="example" value="calcite swatch"></calcite-swatch> `, Pc = {
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
  calciteInputTimePickerActionBackgroundColorPress: "",
  calciteInputTimePickerInputActionBackgroundColor: "",
  calciteInputTimePickerInputActionBackgroundColorHover: "",
  calciteInputTimePickerInputActionBackgroundColorPress: "",
  calciteInputTimePickerInputActionIconColor: "",
  calciteInputTimePickerInputActionIconColorHover: "",
  calciteInputTimePickerInputActionIconColorPress: ""
}, Sc = e`<calcite-input-time-picker open></calcite-input-time-picker>`, h = {
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
function fc(t, l = !1) {
  if (l) {
    const o = Object.keys(t).map((i) => `--${b(i)}`);
    return x(o, " ");
  } else
    return Object.entries(t).map(([o, i]) => i && i !== "" ? `--${b(o)}: ${i};` : null).filter((o) => o).join("");
}
const T = (t, l = !1) => e`<div style="${fc(t, l)}">
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
        ${fe} ${Ce} ${G} ${Bt} ${z}
        <div style="display: flex">
          ${ke}
          <div style="width: 40px; height: 40px;">${Te}</div>
          ${ot}
        </div>
        ${lt} ${W} ${O} ${sc} ${U} ${_}
        ${q} ${V} ${j}
        ${Y} ${X} ${Z} ${Q}
        ${K} ${J} ${ee} ${Sc} ${te}
        ${dc} ${nc}
      </div>
      <div class="demo-column">
        <div>${ce}</div>
        ${ae}
        <div>${_e} ${oe}</div>
        <div>${Qe}</div>
        <div>${Le}</div>
        ${Ne} ${St} ${Gt} ${gc}
      </div>
      <div class="demo-column">
        ${Wt} ${Ot} ${gt} ${ht} ${kt} ${It} ${Fe} ${Xt} ${Yt}
        ${Zt} ${ie} ${at} ${tt} ${_t} ${At} ${le} ${re} ${Vt}
        ${Ge} ${ze}
      </div>
      <div class="demo-column">
        ${cc} ${Kt} ${ec} ${$e} ${De} ${Nt} ${mc} ${bc}
      </div>
      <div class="demo-column"><div class="demo-column">${Ie}</div></div>
      <div class="demo-column">${oc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${ne}</div>
      <div class="demo-column">${se}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Ve}</div>
      <div class="demo-column">${je}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Xe}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${nt}</div>
      <div class="demo-column">${st}</div>
      <div class="demo-column">${dt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${mt}</div>
      <div class="demo-column">${ut}</div>
      <div class="demo-column">${bt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Ft}</div>
      <div class="demo-column">${Lt}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${v}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${lc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${$t}</div>
      <div class="demo-column">${Ht}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${de}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${hc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${kc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Ic}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${Bc}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${pe}</div>
    </div>
    <div class="demo-row">
      <div class="demo-column">${me}</div>
    </div>
  </div>`, k = {
  ...h,
  ...we,
  ...Se,
  ...be,
  ...ge,
  ...ve,
  ...he,
  ...ue,
  ...xe,
  ...E,
  ...jt,
  ...He,
  ...Ae,
  ...N,
  ...M,
  ...Re,
  ...Me,
  ...Ee,
  ...rc,
  ...L,
  ...We,
  ...Ue,
  ...Oe,
  ...qe,
  ...Ye,
  ...Ze,
  ...ct,
  ...it,
  ...R,
  ...et,
  ...rt,
  ...F,
  ...y,
  ...pt,
  ...Ct,
  ...vt,
  ...Tt,
  ...xt,
  ...Qt,
  ...tc,
  ...Jt,
  ...wt,
  ...Pt,
  ...pc,
  ...ft,
  ...$,
  ...H,
  ...yt,
  ...Rt,
  ...Mt,
  ...D,
  ...Dt,
  ...Et,
  ...ye,
  ...zt,
  ...Ut,
  ...A,
  ...f,
  ...qt,
  ...Pe,
  ...ac,
  ...uc,
  ...Cc,
  ...ic,
  ...S,
  ...vc,
  ...Tc,
  ...xc,
  ...wc,
  ...P,
  ...Pc,
  ...B,
  ...w
}, Ac = {
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
const Dc = ["themingInteractive", "theming"], eo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __namedExportsOrder: Dc,
  default: Ac,
  theming: a,
  themingInteractive: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  eo as s
};
