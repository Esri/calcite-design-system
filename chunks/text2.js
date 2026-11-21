/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as v, L as S, s as r, C as g, b as x, f as b } from "./index.js";
import { e as d, n as a } from "./ref.js";
import { H as w, E as T, I as E } from "./dom.js";
import { c as p, u as y } from "./observers.js";
import { s as L } from "./screen-reader.js";
const M = v`:host{display:block;overflow-wrap:break-word;overflow:hidden;white-space:normal}:host([truncate-position=end]){text-overflow:ellipsis;white-space:nowrap}:host([truncate-position=middle]){white-space:nowrap}.text-container{overflow:inherit;text-overflow:inherit}:host([truncate-position=middle]:not([max-lines])) slot{display:none}:host(:not([truncate-position=middle])) .middle-truncated-text,:host([max-lines]) .middle-truncated-text{display:none}:host([max-lines]) .text-container{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:var(--calcite-internal-text-max-lines, none);white-space:normal}:host([hidden]){display:none}[hidden]{display:none}`, m = "…", f = {
  middleTruncatedText: "middle-truncated-text",
  textContainer: "text-container"
};
class P extends S {
  constructor() {
    super(...arguments), this.assistiveTextSpanRef = d(), this.defaultSlotRef = d(), this.middleTruncatedSpanRef = d(), this.mutationObserver = p("mutation", (t) => {
      const e = w(this.defaultSlotRef.value);
      t.some(({ target: i }) => e.includes(i)) && this.setValue(e.map((i) => i.textContent).join("").trim());
    }), this.resizeObserver = p("resize", () => {
      this.handleTruncation();
    }), this.renderedText = "";
  }
  static {
    this.properties = { maxLines: 11, truncatePosition: 3 };
  }
  static {
    this.styles = [M, L];
  }
  connectedCallback() {
    super.connectedCallback(), this.mutationObserver?.observe(this.el, {
      characterData: !0,
      subtree: !0
    });
  }
  willUpdate(t) {
    t.has("maxLines") && this.hasUpdated && (this.maxLines || this.clearTooltipTitle(), this.updateMaxLinesToken());
  }
  updated(t) {
    t.has("truncatePosition") && !this.maxLines && this.handleTruncatePositionChange(t.get("truncatePosition"));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect(), this.mutationObserver?.disconnect();
  }
  clearTooltipTitle() {
    this.textContainerEl.title = "";
  }
  getTruncatedText(t, e, i, h) {
    let n = 0, o = t.length;
    const c = (s) => {
      const l = Math.ceil(s / 2), C = Math.floor(s / 2);
      return t.slice(0, l) + m + t.slice(t.length - C);
    };
    for (; n < o; ) {
      const s = Math.ceil((n + o) / 2), l = c(s);
      T(l, i, h) <= e ? n = s : o = s - 1;
    }
    const u = Math.max(0, n);
    return u <= 1 ? m : c(u);
  }
  handleDefaultSlotChange(t) {
    this.setValue(E(t));
  }
  setValue(t) {
    this.value = t, this.renderedText = t, this.handleTruncation();
  }
  handleTruncation() {
    if (!this.textContainerEl)
      return;
    const { truncatePosition: t, maxLines: e } = this;
    this.isTruncatePositionMiddle() ? (this.truncateMiddleText(), this.assistiveTextSpanRef.value.textContent = this.value || "") : (t === "end" || e && e >= 1) && this.syncTooltipState();
  }
  hasOverflow() {
    return this.textContainerEl.scrollWidth > this.textContainerEl.clientWidth || this.textContainerEl.scrollHeight > this.textContainerEl.clientHeight;
  }
  syncTooltipState() {
    this.hasOverflow() ? this.setTooltipTitle() : this.clearTooltipTitle();
  }
  handleTruncatePositionChange(t) {
    const e = this.truncatePosition;
    t && !e ? this.clearTooltipTitle() : this.handleTruncation();
  }
  setTooltipTitle() {
    this.textContainerEl.title = this.value || "";
  }
  setMiddleTruncatedText(t) {
    const e = this.middleTruncatedSpanRef.value;
    e && (e.textContent = t || "");
  }
  truncateMiddleText() {
    requestAnimationFrame(() => {
      if (!this.textContainerEl || !this.textContainerEl.clientWidth || this.maxLines || this.truncatePosition !== "middle")
        return;
      const t = this.textContainerEl.clientWidth, e = getComputedStyle(this.el), i = e.font || `${e.fontSize} ${e.fontFamily}`;
      if (T(this.value, i, e.letterSpacing) <= t)
        this.setMiddleTruncatedText(this.value), this.clearTooltipTitle();
      else {
        const n = this.getTruncatedText(this.renderedText, t, i, e.letterSpacing);
        this.setMiddleTruncatedText(n), this.setTooltipTitle();
      }
    });
  }
  updateMaxLinesToken() {
    this.textContainerEl?.style.setProperty("--calcite-internal-text-max-lines", this.maxLines?.toString() || null);
  }
  setTextContainerRef(t) {
    y(this.resizeObserver, this.textContainerEl, t), this.textContainerEl = t, this.updateMaxLinesToken();
  }
  isTruncatePositionMiddle() {
    return this.truncatePosition === "middle" && !this.maxLines;
  }
  render() {
    return x`<div class=${r(f.textContainer)} ${a(this.setTextContainerRef)}><slot @slotchange=${this.handleDefaultSlotChange} ${a(this.defaultSlotRef)}></slot><span aria-hidden=true class=${r(f.middleTruncatedText)} ${a(this.middleTruncatedSpanRef)}></span>${this.isTruncatePositionMiddle() && x`<span aria-live=polite class=${r(g.screenReaderText)} ${a(this.assistiveTextSpanRef)}></span>` || ""}</div>`;
  }
}
b("calcite-text", P);
export {
  P as Text
};
