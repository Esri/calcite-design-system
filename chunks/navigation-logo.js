/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { a as d, L as h, s as t, b as e, o as n, f as p } from "./index.js";
import { i as s } from "./keyed.js";
import { H as f } from "./Heading.js";
import { u as m } from "./useFocusable.js";
import { C as i } from "./resources21.js";
const u = d`:host{display:inline-flex}:host([scale=s]){--calcite-internal-navigation-logo-padding-inline: var(--calcite-space-md);--calcite-internal-navigation-logo-image-size: 1.75rem;--calcite-internal-navigation-logo-heading-font-size: var(--calcite-font-size-relative-base);--calcite-internal-navigation-logo-heading-standalone-font-size: var(--calcite-font-size-1);--calcite-internal-navigation-logo-description-font-size: var(--calcite-font-size-relative-sm);--calcite-internal-navigation-logo-heading-line-height: var(--calcite-space-lg);--calcite-internal-navigation-logo-description-line-height: var(--calcite-space-lg)}:host([scale=m]){--calcite-internal-navigation-logo-padding-inline: var(--calcite-space-lg);--calcite-internal-navigation-logo-image-size: 1.75rem;--calcite-internal-navigation-logo-heading-font-size: var(--calcite-font-size-relative-md);--calcite-internal-navigation-logo-heading-standalone-font-size: var(--calcite-font-size-relative-xl);--calcite-internal-navigation-logo-description-font-size: var(--calcite-font-size-relative-base);--calcite-internal-navigation-logo-heading-line-height: var(--calcite-space-xl);--calcite-internal-navigation-logo-description-line-height: var(--calcite-space-lg)}:host([scale=l]){--calcite-internal-navigation-logo-padding-inline: var(--calcite-space-xl);--calcite-internal-navigation-logo-image-size: 2.75rem;--calcite-internal-navigation-logo-heading-font-size: var(--calcite-font-size-relative-xl);--calcite-internal-navigation-logo-heading-standalone-font-size: var(--calcite-font-size-relative-2xl);--calcite-internal-navigation-logo-description-font-size: var(--calcite-font-size-relative-lg);--calcite-internal-navigation-logo-heading-line-height: var(--calcite-space-2xl);--calcite-internal-navigation-logo-description-line-height: var(--calcite-space-2xl)}.container{font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);display:flex;margin:var(--calcite-space-none);align-items:center;justify-content:center;background-color:var(--calcite-navigation-background-color, var(--calcite-internal-navigation-logo-background-color, var(--calcite-theme-color-surface-2, var(--calcite-color-foreground-1))));border-block-end:2px solid var(--calcite-color-transparent)}.container--link{outline-color:var(--calcite-color-transparent);cursor:pointer;text-decoration-line:none}:host(:focus) .container--link{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-1 * var(--calcite-space-base) * (1 - 2 * clamp(0,var(--calcite-offset-invert-focus),1)))}.image{block-size:var(--calcite-internal-navigation-logo-image-size)}.image,.icon{display:flex;margin:var(--calcite-space-none);color:var(--calcite-navigation-logo-text-color, var(--calcite-icon-color, var(--calcite-internal-navigation-logo-text-color, var(--calcite-ui-icon-color, inherit))));padding-inline:var(--calcite-internal-navigation-logo-padding-inline)}.image~.icon{padding-inline-start:var(--calcite-space-none)}.image~.text-container,.icon~.text-container{padding-inline-start:var(--calcite-space-none)}:host([href]:hover),:host([href]:focus){--calcite-internal-navigation-logo-background-color: var( --calcite-theme-color-surface-3, var(--calcite-color-foreground-2) )}:host([href]:active){--calcite-internal-navigation-logo-background-color: var( --calcite-theme-color-surface-4, var(--calcite-color-foreground-3) )}:host([active]) .container{border-block-end-color:var(--calcite-navigation-accent-color, var(--calcite-color-brand))}:host([active]),:host([href]:active){--calcite-internal-navigation-logo-text-color: var(--calcite-color-brand)}.text-container{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:flex;flex-direction:column;text-align:start;margin-block-start:var(--calcite-space-base);padding-inline:var(--calcite-internal-navigation-logo-padding-inline)}.heading{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-inline-start:var(--calcite-space-none);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-navigation-logo-heading-text-color, var(--calcite-color-text-1));font-size:var(--calcite-internal-navigation-logo-heading-font-size);padding-block-start:var(--calcite-space-2xs);line-height:var(--calcite-internal-navigation-logo-heading-line-height)}.standalone{font-size:var(--calcite-internal-navigation-logo-heading-standalone-font-size);padding-block-start:0}.description{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--calcite-navigation-logo-text-color, var(--calcite-color-text-2));font-size:var(--calcite-internal-navigation-logo-description-font-size);line-height:var(--calcite-internal-navigation-logo-description-line-height)}:host([hidden]){display:none}[hidden]{display:none}`;
class x extends h {
  constructor() {
    super(...arguments), this.focusSetter = m()(this).setFocus, this.active = !1, this.iconFlipRtl = !1, this.scale = "m";
  }
  static {
    this.properties = { active: 7, description: 1, heading: 1, headingLevel: 11, href: 3, icon: 3, iconFlipRtl: 7, label: 1, rel: 3, target: 3, thumbnail: 1, scale: 3 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = u;
  }
  async setFocus(a) {
    return this.focusSetter(() => this.href ? this.el : void 0, a);
  }
  renderIcon() {
    return e`<calcite-icon class=${t(i.icon)} .flipRtl=${this.iconFlipRtl} .icon=${this.icon} .scale=${this.scale === "s" ? "m" : "l"}></calcite-icon>`;
  }
  renderHeaderContent() {
    const { heading: a, headingLevel: o, description: c } = this, l = a ? s(i.heading, f({ class: {
      [i.heading]: !0,
      [i.standalone]: !this.description
    }, level: o, children: a })) : null, r = c ? s(i.description, e`<span class=${t(i.description)}>${c}</span>`) : null;
    return l || r ? s(i.textContainer, e`<div class=${t(i.textContainer)}>${l}${r}</div>`) : null;
  }
  render() {
    const { icon: a, href: o, label: c, rel: l, target: r, thumbnail: g } = this, v = e`${g && e`<img alt=${(c || "") ?? n} class=${t(i.image)} src=${g ?? n}>` || ""}${a && this.renderIcon() || ""}${this.renderHeaderContent()}`;
    return o ? e`<a class=${t({
      [i.container]: !0,
      [i.containerLink]: !0
    })} href=${o ?? n} rel=${l ?? n} target=${r ?? n}>${v}</a>` : e`<div class=${t(i.container)}>${v}</div>`;
  }
}
p("calcite-navigation-logo", x);
export {
  x as NavigationLogo
};
