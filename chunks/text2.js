/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as C, L as b, s as r, b as p, d as g } from "./index.js";
import { e as d, n as a } from "./ref.js";
import { I as w, E as T, J as S } from "./dom.js";
import { c as m, u as E } from "./observers.js";
const M = C`:host{display:block;overflow-wrap:break-word;overflow:hidden;white-space:normal}:host([truncate-position=end]){text-overflow:ellipsis;white-space:nowrap}:host([truncate-position=middle]){white-space:nowrap}.text-container{overflow:inherit;text-overflow:inherit}:host([truncate-position=middle]:not([max-lines])) slot{display:none}:host(:not([truncate-position=middle])) .middle-truncated-text,:host([max-lines]) .middle-truncated-text{display:none}:host([max-lines]) .text-container{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:var(--calcite-internal-text-max-lines, none);white-space:normal}:host([hidden]){display:none}[hidden]{display:none}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}`, f = "…", h = {
  middleTruncatedText: "middle-truncated-text",
  textContainer: "text-container",
  assistiveText: "assistive-text"
};
class y extends b {
  constructor() {
    super(...arguments), this.assistiveTextSpanRef = d(), this.defaultSlotRef = d(), this.middleTruncatedSpanRef = d(), this.mutationObserver = m("mutation", (t) => {
      const e = w(this.defaultSlotRef.value);
      t.some(({ target: i }) => e.includes(i)) && this.setValue(e.map((i) => i.textContent).join("").trim());
    }), this.resizeObserver = m("resize", () => {
      this.handleTruncation();
    }), this.renderedText = "";
  }
  static {
    this.properties = { maxLines: 11, truncatePosition: 3 };
  }
  static {
    this.styles = M;
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
  getTruncatedText(t, e, i, c) {
    let s = 0, o = t.length;
    const u = (n) => {
      const l = Math.ceil(n / 2), v = Math.floor(n / 2);
      return t.slice(0, l) + f + t.slice(t.length - v);
    };
    for (; s < o; ) {
      const n = Math.ceil((s + o) / 2), l = u(n);
      T(l, i, c) <= e ? s = n : o = n - 1;
    }
    const x = Math.max(0, s);
    return x <= 1 ? f : u(x);
  }
  handleDefaultSlotChange(t) {
    this.setValue(S(t));
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
        const s = this.getTruncatedText(this.renderedText, t, i, e.letterSpacing);
        this.setMiddleTruncatedText(s), this.setTooltipTitle();
      }
    });
  }
  updateMaxLinesToken() {
    this.textContainerEl?.style.setProperty("--calcite-internal-text-max-lines", this.maxLines?.toString() || null);
  }
  setTextContainerRef(t) {
    E(this.resizeObserver, this.textContainerEl, t), this.textContainerEl = t, this.updateMaxLinesToken();
  }
  isTruncatePositionMiddle() {
    return this.truncatePosition === "middle" && !this.maxLines;
  }
  render() {
    return p`<div class=${r(h.textContainer)} ${a(this.setTextContainerRef)}><slot @slotchange=${this.handleDefaultSlotChange} ${a(this.defaultSlotRef)}></slot><span aria-hidden=true class=${r(h.middleTruncatedText)} ${a(this.middleTruncatedSpanRef)}></span>${this.isTruncatePositionMiddle() && p`<span aria-live=polite class=${r(h.assistiveText)} ${a(this.assistiveTextSpanRef)}></span>` || ""}</div>`;
  }
}
g("calcite-text", y);
export {
  y as Text
};
