/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as I, L as T, c as r, A as l, s as u, b as a, d as D } from "./index.js";
import { n as v } from "./ref.js";
import { i as d } from "./keyed.js";
import { d as R } from "./floating-ui.js";
import { u as y } from "./useT9n.js";
import { u as P } from "./useSetFocus.js";
import { u as H } from "./useInteractive.js";
const b = {
  handle: "handle",
  dropdown: "dropdown"
}, g = {
  drag: "drag",
  blank: "blank"
}, c = {
  label: "{label}",
  position: "{position}",
  total: "{total}"
}, f = ["top", "up", "down", "bottom"], A = {
  trigger: "trigger"
}, p = {
  add: "add",
  move: "move",
  reorder: "reorder"
}, B = I`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.dropdown{block-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class O extends T {
  constructor() {
    super(...arguments), this.focusSetter = P()(this), this.interactiveContainer = H(this), this.disabled = !1, this.messages = y({ blocking: !0 }), this.addToItems = [], this.moveToItems = [], this.open = !1, this.overlayPositioning = "absolute", this.placement = R, this.scale = "m", this.sortDisabled = !1, this.topLayerDisabled = !1, this.calciteSortHandleAdd = r({ cancelable: !0 }), this.calciteSortHandleBeforeClose = r({ cancelable: !1 }), this.calciteSortHandleBeforeOpen = r({ cancelable: !1 }), this.calciteSortHandleClose = r({ cancelable: !1 }), this.calciteSortHandleMove = r({ cancelable: !0 }), this.calciteSortHandleOpen = r({ cancelable: !1 }), this.calciteSortHandleReorder = r({ cancelable: !0 });
  }
  static {
    this.properties = { disabled: 7, flipPlacements: 0, label: 1, messageOverrides: 0, messages: 0, addToItems: 0, moveToItems: 0, open: 7, overlayPositioning: 3, placement: 3, scale: 3, setPosition: 9, setSize: 9, sortDisabled: 7, topLayerDisabled: 7, widthScale: 3 };
  }
  static {
    this.styles = B;
  }
  get hasSetInfo() {
    return typeof this.setPosition == "number" && typeof this.setSize == "number";
  }
  get hasValidSetInfo() {
    return this.hasSetInfo ? this.setPosition > 0 && this.setPosition <= this.setSize && this.setSize > 0 : !0;
  }
  get hasReorderItems() {
    return !this.sortDisabled && this.hasValidSetInfo;
  }
  get hasMoveToItems() {
    return this.moveToItems.length > 0;
  }
  get hasAddToItems() {
    return this.addToItems.length > 0;
  }
  get reorderGroupTitle() {
    return this.hasMoveToItems || this.hasAddToItems ? this.messages.reorder : "";
  }
  get hasNoItems() {
    return !this.hasReorderItems && !this.hasMoveToItems && !this.hasAddToItems;
  }
  get hasAllReorderItemsDisabled() {
    return this.hasReorderItems && this.isTopReorderDisabled && this.isUpReorderDisabled && this.isDownReorderDisabled && this.isBottomReorderDisabled;
  }
  get hasOnlyDisabledReorderItems() {
    return this.hasReorderItems && !this.hasMoveToItems && !this.hasAddToItems && this.hasAllReorderItemsDisabled;
  }
  get isTopReorderDisabled() {
    const { setPosition: e } = this;
    return e === 1 || e === 2;
  }
  get isUpReorderDisabled() {
    return this.setPosition === 1;
  }
  get isDownReorderDisabled() {
    return this.hasSetInfo && this.setPosition === this.setSize;
  }
  get isBottomReorderDisabled() {
    const { setPosition: e, setSize: t } = this;
    return this.hasSetInfo && (e === t || e === t - 1);
  }
  async setFocus(e) {
    return this.focusSetter(() => this.dropdownEl, e);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler();
  }
  openHandler() {
    if (this.disabled) {
      this.open = !1;
      return;
    }
    this.dropdownEl && (this.dropdownEl.open = this.open);
  }
  setDropdownEl(e) {
    e && (this.dropdownEl = e, this.openHandler());
  }
  getLabel() {
    const { label: e, messages: t, setPosition: s, setSize: o, hasSetInfo: i } = this;
    if (!i)
      return e ?? "";
    let n = e ? t.repositionLabel.replace(c.label, e) : t.reposition;
    return n = n.replace(c.position, s ? s.toString() : ""), n.replace(c.total, o ? o.toString() : "");
  }
  handleBeforeOpen(e) {
    e.stopPropagation(), this.calciteSortHandleBeforeOpen.emit();
  }
  handleOpen(e) {
    e.stopPropagation(), this.calciteSortHandleOpen.emit(), this.open = !0;
  }
  handleBeforeClose(e) {
    e.stopPropagation(), this.calciteSortHandleBeforeClose.emit();
  }
  handleClose(e) {
    e.stopPropagation(), this.calciteSortHandleClose.emit(), this.open = !1;
  }
  handleReorder(e) {
    this.calciteSortHandleReorder.emit({
      reorder: e.target.dataset.value
    });
  }
  handleMoveTo(e) {
    const t = e.target.dataset.id, s = this.moveToItems.find((o) => o.id === t);
    this.calciteSortHandleMove.emit({ moveTo: s });
  }
  handleAddTo(e) {
    const t = e.target.dataset.id, s = this.addToItems.find((o) => o.id === t);
    this.calciteSortHandleAdd.emit({ addTo: s });
  }
  render() {
    const { disabled: e, flipPlacements: t, hasOnlyDisabledReorderItems: s, open: o, overlayPositioning: i, placement: n, scale: m, widthScale: $, hasNoItems: S } = this, h = this.getLabel(), w = e || S || s;
    return this.interactiveContainer({ disabled: e, children: a`<calcite-dropdown class=${u(b.dropdown)} .disabled=${w} .flipPlacements=${t} @calciteDropdownBeforeClose=${this.handleBeforeClose} @calciteDropdownBeforeOpen=${this.handleBeforeOpen} @calciteDropdownClose=${this.handleClose} @calciteDropdownOpen=${this.handleOpen} .overlayPositioning=${i} .placement=${n} .scale=${m} .topLayerDisabled=${this.topLayerDisabled} .widthScale=${$} ${v(this.setDropdownEl)}><calcite-action .active=${o} .aria=${{ expanded: o }} class=${u(b.handle)} .dragHandle=${!0} .icon=${e ? g.blank : g.drag} .label=${h} .scale=${m} slot=${A.trigger} .text=${h} title=${h ?? l}></calcite-action>${this.renderReorderGroup()}${this.renderMoveToGroup()}${this.renderAddToGroup()}</calcite-dropdown>` });
  }
  renderAddToItem(e) {
    return d(e.id, a`<calcite-dropdown-item data-id=${e.id ?? l} .label=${e.label} @calciteDropdownItemSelect=${this.handleAddTo}>${e.label}</calcite-dropdown-item>`);
  }
  renderMoveToItem(e) {
    return d(e.id, a`<calcite-dropdown-item data-id=${e.id ?? l} .label=${e.label} @calciteDropdownItemSelect=${this.handleMoveTo}>${e.label}</calcite-dropdown-item>`);
  }
  renderReorderGroup() {
    return this.hasReorderItems ? d("reorder", a`<calcite-dropdown-group .groupTitle=${this.reorderGroupTitle} id=${p.reorder} .scale=${this.scale} selection-mode=none>${this.renderTop()}${this.renderUp()}${this.renderDown()}${this.renderBottom()}</calcite-dropdown-group>`) : null;
  }
  renderAddToGroup() {
    const { messages: e, addToItems: t, scale: s, hasAddToItems: o } = this;
    return o ? d("add-to-items", a`<calcite-dropdown-group .groupTitle=${e.addTo} id=${p.add} .scale=${s} selection-mode=none>${t.map((i) => this.renderAddToItem(i))}</calcite-dropdown-group>`) : null;
  }
  renderMoveToGroup() {
    const { messages: e, moveToItems: t, scale: s, hasMoveToItems: o } = this;
    return o ? d("move-to-items", a`<calcite-dropdown-group .groupTitle=${e.moveTo} id=${p.move} .scale=${s} selection-mode=none>${t.map((i) => this.renderMoveToItem(i))}</calcite-dropdown-group>`) : null;
  }
  renderDropdownItem(e, t, s = !1) {
    return d(f[e], a`<calcite-dropdown-item data-value=${f[e] ?? l} .disabled=${s} .label=${t} @calciteDropdownItemSelect=${this.handleReorder}>${t}</calcite-dropdown-item>`);
  }
  renderTop() {
    return this.renderDropdownItem(0, this.messages.moveToTop, this.isTopReorderDisabled);
  }
  renderUp() {
    return this.renderDropdownItem(1, this.messages.moveUp, this.isUpReorderDisabled);
  }
  renderDown() {
    return this.renderDropdownItem(2, this.messages.moveDown, this.isDownReorderDisabled);
  }
  renderBottom() {
    return this.renderDropdownItem(3, this.messages.moveToBottom, this.isBottomReorderDisabled);
  }
}
D("calcite-sort-handle", O);
export {
  O as SortHandle
};
