import { b as v, L as h, s as o, x as e, z as n, q as p } from "./index.js";
import { i as s } from "./keyed.js";
import { H as f } from "./Heading.js";
import { u } from "./useSetFocus.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const t = {
  container: "container",
  containerLink: "container--link",
  textContainer: "text-container",
  heading: "heading",
  description: "description",
  image: "image",
  standalone: "standalone",
  icon: "icon"
}, m = v`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{display:inline-flex}.container{margin:0;display:flex;align-items:center;justify-content:center;font-size:var(--calcite-font-size-0);line-height:1.25rem;background-color:var(--calcite-navigation-background-color, var(--calcite-internal-navigation-logo-background-color, var(--calcite-color-foreground-1)));border-block-end:2px solid var(--calcite-color-transparent);transition-property:background-color;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}.container--link{cursor:pointer;text-decoration-line:none;outline-color:transparent}:host(:focus) .container--link{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.image,.icon{margin:0;display:flex;block-size:1.75rem;padding-inline:1rem;color:var(--calcite-navigation-logo-text-color, var(--calcite-icon-color, var(--calcite-internal-navigation-logo-text-color, inherit)))}.image~.icon{padding-inline-start:0px}.image~.text-container,.icon~.text-container{padding-inline-start:0px}:host([href]:hover),:host([href]:focus){--calcite-internal-navigation-logo-background-color: var(--calcite-color-foreground-2)}:host([href]:active){--calcite-internal-navigation-logo-background-color: var(--calcite-color-foreground-3)}:host([active]) .container{border-block-end-color:var(--calcite-navigation-accent-color, var(--calcite-color-brand))}:host([active]),:host([href]:active){--calcite-internal-navigation-logo-text-color: var(--calcite-color-brand)}.text-container{margin-block-start:.125rem;display:flex;flex-direction:column;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-inline:1rem;text-align:start}.heading{margin-inline-start:0px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-navigation-logo-heading-text-color, var(--calcite-color-text-1))}.standalone{font-size:var(--calcite-font-size-1)}.description{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--calcite-color-text-2);color:var(--calcite-navigation-logo-text-color, var(--calcite-color-text-2));font-size:var(--calcite-font-size--1)}:host([hidden]){display:none}[hidden]{display:none}`;
class x extends h {
  constructor() {
    super(...arguments), this.focusSetter = u()(this), this.iconFlipRtl = !1;
  }
  static {
    this.properties = { active: 7, description: 1, heading: 1, headingLevel: 11, href: 3, icon: [3, { type: String }], iconFlipRtl: 7, label: 1, rel: 3, target: 3, thumbnail: 1 };
  }
  static {
    this.shadowRootOptions = { mode: "open", delegatesFocus: !0 };
  }
  static {
    this.styles = m;
  }
  async setFocus(i) {
    return this.focusSetter(() => this.href ? this.el : void 0, i);
  }
  renderIcon() {
    return e`<calcite-icon class=${o(t.icon)} .flipRtl=${this.iconFlipRtl} .icon=${this.icon} scale=l></calcite-icon>`;
  }
  renderHeaderContent() {
    const { heading: i, headingLevel: a, description: c } = this, r = i ? s(t.heading, f({ class: {
      [t.heading]: !0,
      [t.standalone]: !this.description
    }, level: a, children: i })) : null, l = c ? s(t.description, e`<span class=${o(t.description)}>${c}</span>`) : null;
    return r || l ? s(t.textContainer, e`<div class=${o(t.textContainer)}>${r}${l}</div>`) : null;
  }
  render() {
    const { icon: i, href: a, label: c, rel: r, target: l, thumbnail: d } = this, g = e`${d && e`<img alt=${(c || "") ?? n} class=${o(t.image)} src=${d ?? n}>` || ""}${i && this.renderIcon() || ""}${this.renderHeaderContent()}`;
    return a ? e`<a class=${o({
      [t.container]: !0,
      [t.containerLink]: !0
    })} href=${a ?? n} rel=${r ?? n} target=${l ?? n}>${g}</a>` : e`<div class=${o(t.container)}>${g}</div>`;
  }
}
p("calcite-navigation-logo", x);
export {
  x as NavigationLogo
};
