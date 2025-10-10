import { b as d, L as h, c as u, s as b, x as m, q as p } from "./index.js";
import { u as g, I as f } from "./interactive.js";
import { c as v } from "./observers.js";
import { d as y, c as O } from "./sortableComponent.js";
import { f as S } from "./dom.js";
import { l as x } from "./logger.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const l = {
  container: "container",
  containerHorizontal: "container--horizontal",
  containerVertical: "container--vertical"
}, C = d`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{display:flex;flex:1 1 auto}.container--vertical{flex-direction:column}.container--horizontal{flex-direction:row}:host([hidden]){display:none}[hidden]{display:none}`;
class E extends h {
  constructor() {
    super(), this.dragEnabled = !0, this.items = [], this.mutationObserver = v("mutation", () => {
      this.setUpSorting();
    }), this.disabled = !1, this.handleSelector = "calcite-handle", this.layout = "vertical", this.loading = !1, this.calciteListOrderChange = u({ cancelable: !1 }), this.listen("calciteHandleNudge", this.calciteHandleNudgeNextHandler);
  }
  static {
    this.properties = { canPull: 0, canPut: 0, disabled: 7, dragSelector: 3, group: 3, handleSelector: 3, layout: 3, loading: 7 };
  }
  static {
    this.styles = C;
  }
  connectedCallback() {
    super.connectedCallback(), this.setUpSorting(), this.beginObserving();
  }
  load() {
    x.deprecated("component", {
      name: "sortable-list",
      removalVersion: 4,
      suggested: "block-group"
    });
  }
  updated() {
    g(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), y(this), this.endObserving();
  }
  calciteHandleNudgeNextHandler(e) {
    this.handleNudgeEvent(e);
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
  handleNudgeEvent(e) {
    const { direction: o } = e.detail, t = e.composedPath().find((a) => a.matches(this.handleSelector)), i = this.items.find((a) => a.contains(t) || e.composedPath().includes(a)), c = this.items.length - 1, s = this.items.indexOf(i);
    let r = !1, n;
    o === "up" ? s === 0 ? r = !0 : n = s - 1 : s === c ? n = 0 : s === c - 1 ? r = !0 : n = s + 2, this.endObserving(), r ? i.parentElement.appendChild(i) : i.parentElement.insertBefore(i, this.items[n]), this.items = Array.from(this.el.children), this.beginObserving(), requestAnimationFrame(() => S(t)), "selected" in t && (t.selected = !0);
  }
  setUpSorting() {
    this.items = Array.from(this.el.children), O(this);
  }
  beginObserving() {
    this.mutationObserver?.observe(this.el, { childList: !0, subtree: !0 });
  }
  endObserving() {
    this.mutationObserver?.disconnect();
  }
  render() {
    const { disabled: e, layout: o } = this, t = o === "horizontal" || !1;
    return f({ disabled: e, children: m`<div class=${b({
      [l.container]: !0,
      [l.containerVertical]: !t,
      [l.containerHorizontal]: t
    })}><slot></slot></div>` });
  }
}
p("calcite-sortable-list", E);
export {
  E as SortableList
};
