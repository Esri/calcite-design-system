/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as d, L as h, c as b, l as u, s as m, b as g, d as p } from "./index.js";
import { c as f } from "./observers.js";
import { f as v } from "./dom.js";
import { u as y } from "./useInteractive.js";
import { u as O } from "./useSortable.js";
const o = {
  container: "container",
  containerHorizontal: "container--horizontal",
  containerVertical: "container--vertical"
}, S = d`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{display:flex;flex:1 1 auto}.container--vertical{flex-direction:column}.container--horizontal{flex-direction:row}:host([hidden]){display:none}[hidden]{display:none}`;
class x extends h {
  constructor() {
    super(), this.dragEnabled = !0, this.items = [], this.mutationObserver = f("mutation", () => {
      this.setUpSorting();
    }), this.sortable = O()(this), this.interactiveContainer = y(this), this.disabled = !1, this.handleSelector = "calcite-handle", this.layout = "vertical", this.loading = !1, this.calciteListOrderChange = b({ cancelable: !1 }), this.listen("calciteHandleNudge", this.calciteHandleNudgeNextHandler);
  }
  static {
    this.properties = { canPull: 0, canPut: 0, disabled: 7, dragSelector: 3, group: 3, handleSelector: 3, layout: 3, loading: 7 };
  }
  static {
    this.styles = S;
  }
  connectedCallback() {
    super.connectedCallback(), this.setUpSorting(), this.beginObserving();
  }
  load() {
    u.deprecated("component", {
      component: this,
      name: "sortable-list",
      removalVersion: 5,
      suggested: "block-group"
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.endObserving();
  }
  calciteHandleNudgeNextHandler(t) {
    this.handleNudgeEvent(t);
  }
  onGlobalDragStart() {
    this.endObserving();
  }
  onGlobalDragEnd() {
    this.beginObserving();
  }
  onDragEnd() {
  }
  onDragStart() {
  }
  onDragSort() {
    this.items = Array.from(this.el.children), this.calciteListOrderChange.emit();
  }
  handleNudgeEvent(t) {
    const { direction: r } = t.detail, e = t.composedPath().find((a) => a.matches(this.handleSelector)), i = this.items.find((a) => e && a.contains(e) || t.composedPath().includes(a)), c = this.items.length - 1, s = i ? this.items.indexOf(i) : -1;
    let l = !1, n;
    r === "up" ? s === 0 ? l = !0 : n = s - 1 : s === c ? n = 0 : s === c - 1 ? l = !0 : n = s + 2, this.endObserving(), l ? i.parentElement.appendChild(i) : i.parentElement.insertBefore(i, this.items[n]), this.items = Array.from(this.el.children), this.beginObserving(), requestAnimationFrame(() => v(e)), e && "selected" in e && (e.selected = !0);
  }
  setUpSorting() {
    this.items = Array.from(this.el.children), this.sortable.reset();
  }
  beginObserving() {
    this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  endObserving() {
    this.mutationObserver?.disconnect();
  }
  render() {
    const { disabled: t, layout: r } = this, e = r === "horizontal" || !1;
    return this.interactiveContainer({ disabled: t, children: g`<div class=${m({
      [o.container]: !0,
      [o.containerVertical]: !e,
      [o.containerHorizontal]: e
    })}><slot></slot></div>` });
  }
}
p("calcite-sortable-list", x);
export {
  x as SortableList
};
