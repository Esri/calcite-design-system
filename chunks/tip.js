import { b as c, L as d, c as h, s as a, x as t, q as m } from "./index.js";
import { i as g } from "./keyed.js";
import { H as u, c as f } from "./Heading.js";
import { l as p } from "./logger.js";
import { s as b } from "./dom.js";
import { u as v } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const e = {
  container: "container",
  header: "header",
  heading: "heading",
  close: "close",
  imageFrame: "image-frame",
  content: "content",
  info: "info",
  infoNoThumbnail: "info--no-thumbnail"
}, x = {
  close: "x"
}, $ = {
  thumbnail: "thumbnail"
}, T = c`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{position:relative;margin:1rem;box-sizing:border-box;display:flex;flex-direction:row;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-2);background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}.container{inline-size:100%;padding:1rem}:host([closed]),:host([closed]) .container{display:none}:host([selected]) .container{margin:0;border-style:none;padding:0}.header{margin:0;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0;padding:0;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:.5rem}.header{margin-block-end:.5rem}.header .heading{padding:0;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-1)}.content{display:flex}.info{padding-block:0px;padding-inline:1rem;inline-size:70%}.info--no-thumbnail{inline-size:100%;padding-inline:0px}::slotted(p){margin-block-start:0px}::slotted(a){outline-color:transparent;color:var(--calcite-color-brand)}::slotted(a:focus){outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.image-frame{inline-size:25%}.image-frame img{max-inline-size:100%}::slotted(img){max-inline-size:100%}:host([hidden]){display:none}[hidden]{display:none}`;
class z extends d {
  constructor() {
    super(...arguments), this.messages = v(), this.hasThumbnail = !1, this.closeDisabled = !1, this.closed = !1, this.selected = !1, this.calciteTipDismiss = h({ cancelable: !1 });
  }
  static {
    this.properties = { hasThumbnail: 16, closeDisabled: 7, closed: 7, heading: 1, headingLevel: 11, messageOverrides: 0, selected: 7 };
  }
  static {
    this.styles = T;
  }
  async load() {
    p.deprecated("component", {
      name: "tip",
      removalVersion: 4,
      suggested: ["card", "notice", "panel", "tile"]
    });
  }
  hideTip() {
    this.closed = !0, this.calciteTipDismiss.emit();
  }
  handleThumbnailSlotChange(i) {
    this.hasThumbnail = b(i);
  }
  renderHeader() {
    const { heading: i, headingLevel: n, el: s } = this, o = s.closest("calcite-tip-manager")?.headingLevel, l = o ? f(o + 1) : null, r = n || l;
    return i ? t`<header class=${a(e.header)}>${u({ class: e.heading, level: r, children: i })}</header>` : null;
  }
  renderDismissButton() {
    const { closeDisabled: i, hideTip: n } = this;
    return i ? null : t`<calcite-action class=${a(e.close)} .icon=${x.close} @click=${n} scale=l .text=${this.messages.close}></calcite-action>`;
  }
  renderImageFrame() {
    return g("thumbnail", t`<div class=${a(e.imageFrame)} .hidden=${!this.hasThumbnail}><slot name=${$.thumbnail} @slotchange=${this.handleThumbnailSlotChange}></slot></div>`);
  }
  renderInfoNode() {
    return t`<div class=${a({ [e.info]: !0, [e.infoNoThumbnail]: !this.hasThumbnail })}><slot></slot></div>`;
  }
  renderContent() {
    return t`<div class=${a(e.content)}>${this.renderImageFrame()}${this.renderInfoNode()}</div>`;
  }
  render() {
    return t`<article class=${a(e.container)}>${this.renderHeader()}${this.renderContent()}</article>${this.renderDismissButton()}`;
  }
}
m("calcite-tip", z);
export {
  z as Tip
};
