import { b as w, L as v, c as i, s as m, E as l, x as a, q as T } from "./index.js";
import { n as I } from "./ref.js";
import { i as n } from "./keyed.js";
import { u as D, I as H } from "./interactive.js";
import { d as P } from "./floating-ui.js";
import { u as y } from "./useT9n.js";
import { u as O } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const u = {
  handle: "handle",
  dropdown: "dropdown"
}, g = {
  drag: "drag",
  blank: "blank"
}, h = {
  label: "{label}",
  position: "{position}",
  total: "{total}"
}, f = ["top", "up", "down", "bottom"], B = {
  trigger: "trigger"
}, p = {
  add: "add",
  move: "move",
  reorder: "reorder"
}, C = w`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.dropdown{block-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class E extends v {
  constructor() {
    super(...arguments), this.focusSetter = O()(this), this.disabled = !1, this.messages = y({ blocking: !0 }), this.addToItems = [], this.moveToItems = [], this.open = !1, this.overlayPositioning = "absolute", this.placement = P, this.scale = "m", this.sortDisabled = !1, this.calciteSortHandleBeforeClose = i({ cancelable: !1 }), this.calciteSortHandleBeforeOpen = i({ cancelable: !1 }), this.calciteSortHandleClose = i({ cancelable: !1 }), this.calciteSortHandleMove = i({ cancelable: !0 }), this.calciteSortHandleAdd = i({ cancelable: !0 }), this.calciteSortHandleOpen = i({ cancelable: !1 }), this.calciteSortHandleReorder = i({ cancelable: !0 });
  }
  static {
    this.properties = { disabled: 7, flipPlacements: 0, label: 1, messageOverrides: 0, messages: 0, addToItems: 0, moveToItems: 0, open: 7, overlayPositioning: 3, placement: 3, scale: 3, setPosition: 9, setSize: 9, sortDisabled: 7, widthScale: 3 };
  }
  static {
    this.styles = C;
  }
  get hasSetInfo() {
    return typeof this.setPosition == "number" && typeof this.setSize == "number";
  }
  get hasValidSetInfo() {
    return this.hasSetInfo ? this.setPosition > 0 && this.setSize > 1 : !0;
  }
  get hasReorderItems() {
    return !this.sortDisabled && this.hasValidSetInfo;
  }
  get hasNoItems() {
    return !this.hasReorderItems && this.moveToItems.length < 1 && this.addToItems.length < 1;
  }
  async setFocus(e) {
    return this.focusSetter(() => this.dropdownEl, e);
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler();
  }
  updated() {
    D(this);
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
    const { label: e, messages: t, setPosition: o, setSize: s, hasSetInfo: d } = this;
    if (!d)
      return e ?? "";
    let r = e ? t.repositionLabel.replace(h.label, e) : t.reposition;
    return r = r.replace(h.position, o ? o.toString() : ""), r.replace(h.total, s ? s.toString() : "");
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
    const t = e.target.dataset.id, o = this.moveToItems.find((s) => s.id === t);
    this.calciteSortHandleMove.emit({ moveTo: o });
  }
  handleAddTo(e) {
    const t = e.target.dataset.id, o = this.addToItems.find((s) => s.id === t);
    this.calciteSortHandleAdd.emit({ addTo: o });
  }
  render() {
    const { disabled: e, flipPlacements: t, open: o, overlayPositioning: s, placement: d, scale: r, widthScale: $, hasNoItems: b } = this, c = this.getLabel(), S = e || b;
    return H({ disabled: e, children: a`<calcite-dropdown class=${m(u.dropdown)} .disabled=${S} .flipPlacements=${t} @calciteDropdownBeforeClose=${this.handleBeforeClose} @calciteDropdownBeforeOpen=${this.handleBeforeOpen} @calciteDropdownClose=${this.handleClose} @calciteDropdownOpen=${this.handleOpen} .overlayPositioning=${s} .placement=${d} .scale=${r} .widthScale=${$} ${I(this.setDropdownEl)}><calcite-action .active=${o} appearance=transparent .aria=${{ expanded: o }} class=${m(u.handle)} .dragHandle=${!0} .icon=${e ? g.blank : g.drag} .label=${c} .scale=${r} slot=${B.trigger} .text=${c} title=${c ?? l}></calcite-action>${this.renderReorderGroup()}${this.renderMoveToGroup()}${this.renderAddToGroup()}</calcite-dropdown>` });
  }
  renderAddToItem(e) {
    return n(e.id, a`<calcite-dropdown-item data-id=${e.id ?? l} .label=${e.label} @calciteDropdownItemSelect=${this.handleAddTo}>${e.label}</calcite-dropdown-item>`);
  }
  renderMoveToItem(e) {
    return n(e.id, a`<calcite-dropdown-item data-id=${e.id ?? l} .label=${e.label} @calciteDropdownItemSelect=${this.handleMoveTo}>${e.label}</calcite-dropdown-item>`);
  }
  renderReorderGroup() {
    return this.hasReorderItems ? n("reorder", a`<calcite-dropdown-group .groupTitle=${this.messages.reorder} id=${p.reorder} .scale=${this.scale} selection-mode=none>${this.renderTop()}${this.renderUp()}${this.renderDown()}${this.renderBottom()}</calcite-dropdown-group>`) : null;
  }
  renderAddToGroup() {
    const { messages: e, addToItems: t, scale: o } = this;
    return t.length ? n("add-to-items", a`<calcite-dropdown-group .groupTitle=${e.addTo} id=${p.add} .scale=${o} selection-mode=none>${t.map((s) => this.renderAddToItem(s))}</calcite-dropdown-group>`) : null;
  }
  renderMoveToGroup() {
    const { messages: e, moveToItems: t, scale: o } = this;
    return t.length ? n("move-to-items", a`<calcite-dropdown-group .groupTitle=${e.moveTo} id=${p.move} .scale=${o} selection-mode=none>${t.map((s) => this.renderMoveToItem(s))}</calcite-dropdown-group>`) : null;
  }
  renderDropdownItem(e, t) {
    return n(f[e], a`<calcite-dropdown-item data-value=${f[e] ?? l} .label=${t} @calciteDropdownItemSelect=${this.handleReorder}>${t}</calcite-dropdown-item>`);
  }
  renderTop() {
    const { setPosition: e } = this;
    return e !== 1 && e !== 2 ? this.renderDropdownItem(0, this.messages.moveToTop) : null;
  }
  renderUp() {
    return this.setPosition !== 1 ? this.renderDropdownItem(1, this.messages.moveUp) : null;
  }
  renderDown() {
    return this.setPosition !== this.setSize ? this.renderDropdownItem(2, this.messages.moveDown) : null;
  }
  renderBottom() {
    const { setPosition: e, setSize: t } = this;
    return e !== t && e !== t - 1 ? this.renderDropdownItem(3, this.messages.moveToBottom) : null;
  }
}
T("calcite-sort-handle", E);
export {
  E as SortHandle
};
