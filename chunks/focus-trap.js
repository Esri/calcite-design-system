/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { a as s, L as a, c as i, b as c, d as o } from "./index.js";
import { u as r } from "./useFocusTrap.js";
import { u as n } from "./useSetFocus.js";
const l = s`:host{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class u extends a {
  constructor() {
    super(...arguments), this._active = !1, this.focusSetter = n()(this), this.focusTrapController = r({
      focusTrapOptions: {
        onActivate: () => {
          this.setActive(!0);
        },
        onDeactivate: () => {
          this.setActive(!1);
        }
      }
    })(this), this.focusTrapDisabled = !1, this.calciteFocusTrapActiveChange = i({ cancelable: !1 });
  }
  static {
    this.properties = { focusTrapDisabled: 7, active: 32, focusTrapDisabledOverride: 0, focusTrapOptions: 0 };
  }
  static {
    this.styles = l;
  }
  get active() {
    return this._active;
  }
  async activate() {
    this.focusTrapController.activate();
  }
  async deactivate() {
    this.focusTrapController.deactivate();
  }
  async setFocus(t) {
    return this.focusSetter(() => this.el, t);
  }
  async updateFocusTrapElements(t) {
    this.focusTrapController.setExtraContainers(t), this.focusTrapController.updateContainerElements();
  }
  setActive(t) {
    const e = this._active;
    this._active = t, this.requestUpdate("active", e), this.calciteFocusTrapActiveChange.emit();
  }
  render() {
    return c`<slot></slot>`;
  }
}
o("calcite-focus-trap", u);
export {
  u as FocusTrap
};
