import { a as w, L as S, d as i, s as h, E as d, x as n, c as $ } from "./iframe.js";
import { n as v } from "./ref.js";
import { i as l } from "./keyed.js";
import { c as D } from "./component.js";
import { u as I, I as T } from "./interactive.js";
import { d as P } from "./floating-ui.js";
import { u as y } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.3.0-next.9 */
const m = {
  handle: "handle",
  dropdown: "dropdown"
}, u = {
  drag: "drag",
  blank: "blank"
}, c = {
  label: "{label}",
  position: "{position}",
  total: "{total}"
}, f = ["top", "up", "down", "bottom"], H = w`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.dropdown{block-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class B extends S {
  constructor() {
    super(...arguments), this.disabled = !1, this.messages = y({ blocking: !0 }), this.moveToItems = [], this.open = !1, this.overlayPositioning = "absolute", this.placement = P, this.scale = "m", this.calciteSortHandleBeforeClose = i({ cancelable: !1 }), this.calciteSortHandleBeforeOpen = i({ cancelable: !1 }), this.calciteSortHandleClose = i({ cancelable: !1 }), this.calciteSortHandleMove = i({ cancelable: !0 }), this.calciteSortHandleOpen = i({ cancelable: !1 }), this.calciteSortHandleReorder = i({ cancelable: !0 });
  }
  static {
    this.properties = { hasSetInfo: 16, isSetDisabled: 16, disabled: 7, flipPlacements: 0, label: 1, messageOverrides: 0, messages: 0, moveToItems: 0, open: 7, overlayPositioning: 3, placement: 3, scale: 3, setPosition: 9, setSize: 9, widthScale: 3 };
  }
  static {
    this.styles = H;
  }
  get hasSetInfo() {
    return typeof this.setPosition == "number" && typeof this.setSize == "number";
  }
  get isSetDisabled() {
    const { setPosition: e, setSize: t, moveToItems: o } = this;
    return this.hasSetInfo ? e < 1 || t < 1 || t < 2 && o.length < 1 : !1;
  }
  async setFocus() {
    await D(this), this.dropdownEl?.setFocus();
  }
  willUpdate(e) {
    e.has("open") && (this.hasUpdated || this.open !== !1) && this.openHandler();
  }
  updated() {
    I(this);
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
    const { label: e, messages: t, setPosition: o, setSize: s } = this;
    if (!this.hasSetInfo)
      return e ?? "";
    let a = e ? t.repositionLabel.replace(c.label, e) : t.reposition;
    return a = a.replace(c.position, o ? o.toString() : ""), a.replace(c.total, s ? s.toString() : "");
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
  render() {
    const { disabled: e, flipPlacements: t, open: o, overlayPositioning: s, placement: a, scale: p, widthScale: b } = this, r = this.getLabel(), g = e || this.isSetDisabled;
    return T({ disabled: e, children: n`<calcite-dropdown class=${h(m.dropdown)} .disabled=${g} .flipPlacements=${t} @calciteDropdownBeforeClose=${this.handleBeforeClose} @calciteDropdownBeforeOpen=${this.handleBeforeOpen} @calciteDropdownClose=${this.handleClose} @calciteDropdownOpen=${this.handleOpen} .overlayPositioning=${s} .placement=${a} .scale=${p} .widthScale=${b} ${v(this.setDropdownEl)}><calcite-action .active=${o} appearance=transparent class=${h(m.handle)} .dragHandle=${!0} .icon=${e ? u.blank : u.drag} .label=${r} .scale=${p} slot=trigger .text=${r} title=${r ?? d}></calcite-action>${this.renderGroup()}${this.renderMoveToGroup()}</calcite-dropdown>` });
  }
  renderMoveToItem(e) {
    return l(e.id, n`<calcite-dropdown-item data-id=${e.id ?? d} .label=${e.label} @calciteDropdownItemSelect=${this.handleMoveTo}>${e.label}</calcite-dropdown-item>`);
  }
  renderGroup() {
    return this.hasSetInfo ? l("reorder", n`<calcite-dropdown-group .groupTitle=${this.messages.reorder} .scale=${this.scale} selection-mode=none>${this.renderTop()}${this.renderUp()}${this.renderDown()}${this.renderBottom()}</calcite-dropdown-group>`) : null;
  }
  renderMoveToGroup() {
    const { messages: e, moveToItems: t, scale: o } = this;
    return t.length ? l("move-to-items", n`<calcite-dropdown-group .groupTitle=${e.moveTo} .scale=${o} selection-mode=none>${t.map((s) => this.renderMoveToItem(s))}</calcite-dropdown-group>`) : null;
  }
  renderDropdownItem(e, t) {
    return l(f[e], n`<calcite-dropdown-item data-value=${f[e] ?? d} .label=${t} @calciteDropdownItemSelect=${this.handleReorder}>${t}</calcite-dropdown-item>`);
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
$("calcite-sort-handle", B);
export {
  B as SortHandle
};
