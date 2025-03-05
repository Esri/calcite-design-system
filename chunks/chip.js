import { h, L as d, k as a, i as v, s as t, x as i, j as m } from "./iframe.js";
import { e as o, n as r } from "./ref.js";
import { s as g } from "./dom.js";
import { c as u, g as n } from "./component.js";
import { u as b, I as x } from "./interactive.js";
import { i as f } from "./key.js";
import { u as k } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.22 */
const c = {
  title: "title",
  close: "close",
  imageContainer: "image-container",
  chipIcon: "chip-icon",
  textSlotted: "text--slotted",
  container: "container",
  imageSlotted: "image--slotted",
  closable: "closable",
  multiple: "multiple",
  single: "single",
  selectable: "selectable",
  selectIcon: "select-icon",
  selectIconActive: "select-icon--active",
  nonInteractive: "non-interactive",
  isCircle: "is-circle",
  selected: "selected"
}, z = {
  image: "image"
}, l = {
  close: "x",
  checkedSingle: "circle-f",
  uncheckedMultiple: "square",
  checkedMultiple: "check-square-f"
}, y = h`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-flex;cursor:default;border-radius:var(--calcite-chip-corner-radius, 9999px)}:host([closed]){display:none}:host([appearance=outline]) .container,:host([appearance=outline-fill]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-1))}:host([appearance=outline]) .close,:host([appearance=outline-fill]) .close{color:var(--calcite-chip-close-icon-color, var(--calcite-close-icon-color, var(--calcite-color-text-3)))}:host([appearance=outline]):host([kind=brand]) .container,:host([appearance=outline-fill]):host([kind=brand]) .container{border-color:var(--calcite-chip-border-color, var(--calcite-color-brand))}:host([appearance=outline]):host([kind=inverse]) .container,:host([appearance=outline-fill]):host([kind=inverse]) .container{border-color:var(--calcite-chip-border-color, var(--calcite-color-border-inverse))}:host([appearance=outline]):host([kind=neutral]) .container,:host([appearance=outline-fill]):host([kind=neutral]) .container{border-color:var(--calcite-chip-border-color, var(--calcite-color-border-1))}:host([appearance=outline]) .container{background-color:transparent}:host([appearance=outline-fill]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-foreground-1))}:host([appearance=solid]) .container{border-color:transparent}:host([appearance=solid]):host([kind=brand]) .container,:host([appearance=solid]):host([kind=inverse]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-inverse))}:host([appearance=solid]):host([kind=brand]) .close,:host([appearance=solid]):host([kind=inverse]) .close{outline-color:var(--calcite-color-text-inverse)}:host([appearance=solid]):host([kind=brand]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-brand))}:host([appearance=solid]):host([kind=inverse]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-inverse))}:host([appearance=solid]):host([kind=inverse]) .close:hover{background-color:var(--calcite-color-inverse-hover)}:host([appearance=solid]):host([kind=inverse]) .close:active{background-color:var(--calcite-color-inverse-press)}:host([appearance=solid]):host([kind=neutral]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-foreground-2))}:host([kind=neutral]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-1))}:host([kind=neutral]) .close{color:var(--calcite-chip-close-icon-color, var(--calcite-close-icon-color, var(--calcite-color-text-3)))}:host([selected]) .select-icon{opacity:1}:host([appearance=solid]):host([kind=neutral]) .container.selectable:hover{background-color:var(--calcite-color-foreground-3)}:host([appearance=solid]):host([kind=neutral]) .container.selectable:active{background-color:var(--calcite-color-border-3)}:host([appearance=solid]):host([kind=inverse]) .container.selectable:hover{background-color:var(--calcite-color-inverse-hover)}:host([appearance=solid]):host([kind=inverse]) .container.selectable:active{background-color:var(--calcite-color-inverse-press)}:host([appearance=solid]):host([kind=brand]) .container.selectable:hover{background-color:var(--calcite-color-brand-hover)}:host([appearance=solid]):host([kind=brand]) .container.selectable:active{background-color:var(--calcite-color-brand-press)}:host([appearance=outline-fill]):host([kind=neutral]) .container.selectable:hover{background-color:var(--calcite-color-foreground-2);border-color:var(--calcite-color-border-input)}:host([appearance=outline-fill]):host([kind=neutral]) .container.selectable:active{background-color:var(--calcite-color-foreground-3);border-color:var(--calcite-color-text-3)}:host([appearance=outline-fill]):host([kind=inverse]) .container.selectable:hover,:host([appearance=outline-fill]):host([kind=brand]) .container.selectable:hover{background-color:var(--calcite-color-foreground-2)}:host([appearance=outline-fill]):host([kind=inverse]) .container.selectable:active,:host([appearance=outline-fill]):host([kind=brand]) .container.selectable:active{background-color:var(--calcite-color-foreground-3)}:host([appearance=outline]):host([kind=neutral]) .container.selectable:hover{background-color:var(--calcite-color-transparent-hover);border-color:var(--calcite-color-border-input)}:host([appearance=outline]):host([kind=neutral]) .container.selectable:active{background-color:var(--calcite-color-transparent-press);border-color:var(--calcite-color-text-3)}:host([appearance=outline]):host([kind=inverse]) .container.selectable:hover,:host([appearance=outline]):host([kind=brand]) .container.selectable:hover{background-color:var(--calcite-color-transparent-hover)}:host([appearance=outline]):host([kind=inverse]) .container.selectable:active,:host([appearance=outline]):host([kind=brand]) .container.selectable:active{background-color:var(--calcite-color-transparent-press)}:host([scale=s]) .container{--calcite-internal-chip-block-size: var(--calcite-size-sm, 1.5rem) ;--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-font-size: var(--calcite-font-size--2);--calcite-internal-chip-icon-size: var(--calcite-size-xs, 1rem) ;--calcite-internal-chip-icon-space: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-image-size: var(--calcite-spacing-xl, 1.25rem) ;--calcite-internal-chip-title-space: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-close-size: var(--calcite-size-xs, 1rem) }:host([scale=s]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px);--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-px)}:host([scale=s]) .container.image--slotted:has(.chip-icon),:host([scale=s]) .container.image--slotted.text--slotted,:host([scale=s]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end: var(--calcite-spacing-xxs, .25rem) }:host([scale=s]) .container.image--slotted:not(.text--slotted,:has(.chip-icon)),:host([scale=s]) .container.image--slotted:not(.selectable){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=s]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=s]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-none, 0)}:host([scale=s]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end: .5rem ;--calcite-internal-chip-select-space-x-start: .125rem }:host([scale=s]) .container.multiple:not(.is-circle){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=s]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end: .5rem ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=s]) .container.multiple:not(.is-circle).image--slotted:not(.text--slotted){--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=m]) .container{--calcite-internal-chip-block-size: var(--calcite-size-md, 2rem) ;--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-font-size: var(--calcite-font-size--1);--calcite-internal-chip-icon-size: var(--calcite-size-sm, 1.5rem) ;--calcite-internal-chip-icon-space: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-image-size: var(--calcite-size-sm, 1.5rem) ;--calcite-internal-chip-title-space: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-close-size: var(--calcite-size-sm, 1.5rem) }:host([scale=m]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-px);--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=m]) .container.image--slotted:not(.is-circle){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=m]) .container.image--slotted:has(.chip-icon),:host([scale=m]) .container.image--slotted.text--slotted,:host([scale=m]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end: var(--calcite-spacing-xs, .375rem) }:host([scale=m]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=m]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-px);--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-none, 0)}:host([scale=m]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=m]) .container.multiple:not(.is-circle){--calcite-internal-chip-select-space-x-end: .125rem ;--calcite-internal-chip-select-space-x-start: .125rem }:host([scale=m]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end: .5rem ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=m]) .container.closable:not(.is-circle){--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xxs, .25rem) }:host([scale=l]) .container{--calcite-internal-chip-block-size: 2.75rem ;--calcite-internal-chip-container-space-x-end: .5rem ;--calcite-internal-chip-container-space-x-start: .5rem ;--calcite-internal-chip-font-size: var(--calcite-font-size-0);--calcite-internal-chip-icon-size: var(--calcite-size-md, 2rem) ;--calcite-internal-chip-icon-space: .5rem ;--calcite-internal-chip-image-size: var(--calcite-size-md, 2rem) ;--calcite-internal-chip-title-space: .5rem ;--calcite-internal-close-size: var(--calcite-size-md, 2rem) }:host([scale=l]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=l]) .container.image--slotted:not(.is-circle){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=l]) .container.image--slotted:has(.chip-icon),:host([scale=l]) .container.image--slotted.text--slotted,:host([scale=l]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end: .5rem }:host([scale=l]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=l]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-none, 0)}:host([scale=l]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-select-space-x-start: .5rem }:host([scale=l]) .container.multiple:not(.is-circle){--calcite-internal-chip-container-space-x-start: .5rem ;--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=l]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end: .75rem }:host([scale=l]) .container.closable:not(.is-circle){--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xs, .375rem) }.container{box-sizing:border-box;display:inline-flex;block-size:100%;max-inline-size:100%;align-items:center;justify-content:center;font-weight:var(--calcite-font-weight-medium);outline-color:transparent;border-radius:var(--calcite-chip-corner-radius, 9999px);border-width:var(--calcite-border-width-sm);border-style:solid;font-size:var(--calcite-internal-chip-font-size, var(--calcite-font-size));padding-inline-start:var(--calcite-internal-chip-container-space-x-start);padding-inline-end:var(--calcite-internal-chip-container-space-x-end);block-size:var(--calcite-internal-chip-block-size, auto);inline-size:var(--calcite-internal-chip-inline-size, auto);min-inline-size:var(--calcite-internal-chip-block-size, auto)}.container:hover .select-icon--active{opacity:var(--calcite-opacity-full, 1)}.container.selectable{cursor:pointer}.container:not(.non-interactive):focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container.text--slotted .title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.container:not(.text--slotted) .title,.container:not(.image--slotted) .image-container{display:none}.container.is-circle .chip-icon,.container.is-circle .image-container{padding:var(--calcite-spacing-none, 0)}.title{padding-inline:var(--calcite-internal-chip-title-space)}.image-container{display:inline-flex;overflow:hidden;align-items:center;justify-content:center;pointer-events:none;block-size:var(--calcite-internal-chip-image-size, var(--calcite-spacing-xxl, 1.5rem));inline-size:var(--calcite-internal-chip-image-size, var(--calcite-spacing-xxl, 1.5rem));padding-inline-start:var(--calcite-spacing-none, 0);padding-inline-end:var(--calcite-internal-chip-image-space-x-end, 0)}.chip-icon{position:relative;margin-block:0px;display:inline-flex;transition-duration:.15s;transition-timing-function:cubic-bezier(.4,0,.2,1);color:var(--calcite-chip-icon-color, var(--calcite-chip-text-color, var(--calcite-icon-color, currentColor)));padding-inline:var(--calcite-internal-chip-icon-space, var(--calcite-spacing-xs, .375rem))}.select-icon{align-self:center;justify-content:center;align-items:center;display:flex;inset-block-start:-1px;position:absolute;visibility:hidden;inline-size:auto;opacity:0;transition:opacity .15s ease-in-out,inline-size .15s ease-in-out;color:var(--calcite-chip-select-icon-color, currentColor)}.select-icon.select-icon--active{position:relative;visibility:visible;opacity:var(--calcite-opacity-half, .5);color:var(--calcite-chip-select-icon-color-press, var(--calcite-chip-select-icon-color-pressed, var(--calcite-chip-select-icon-color, currentColor)))}.multiple .select-icon{display:flex;align-items:center;justify-content:center}.multiple .select-icon,.single .select-icon--active{padding-inline-start:var(--calcite-internal-chip-select-space-x-start);padding-inline-end:var(--calcite-internal-chip-select-space-x-end);block-size:var(--calcite-internal-chip-icon-size, var(--calcite-spacing-xxl, 1.5rem));inline-size:var(--calcite-internal-chip-icon-size, var(--calcite-spacing-xxl, 1.5rem))}slot[name=image]::slotted(*){display:flex;block-size:100%;inline-size:100%;overflow:hidden;border-radius:50%}.close{margin:0;cursor:pointer;align-items:center;border-radius:50%;border-style:none;outline-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;background-color:var(--calcite-close-background-color, var(--calcite-color-transparent));-webkit-appearance:none;display:flex;align-content:center;justify-content:center;color:var(--calcite-chip-close-icon-color, var(--calcite-close-icon-color, currentColor));block-size:var(--calcite-internal-close-size, var(--calcite-spacing-xxl, 1.5rem));inline-size:var(--calcite-internal-close-size, var(--calcite-spacing-xxl, 1.5rem));padding:0}.close:hover,.close:focus{background-color:var(--calcite-close-background-color-hover, var(--calcite-color-transparent-hover))}.close:focus{outline:2px solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(-2px*(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.close:active{background-color:var(--calcite-close-background-color-press, var(--calcite-color-transparent-press))}.close calcite-icon{color:inherit}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
class C extends d {
  // #endregion
  // #region Lifecycle
  constructor() {
    super(), this.closeButtonEl = o(), this.containerEl = o(), this.hasImage = !1, this.hasText = !1, this.appearance = "solid", this.closable = !1, this.closed = !1, this.closeOnDelete = !1, this.disabled = !1, this.iconFlipRtl = !1, this.interactive = !1, this.kind = "neutral", this.messages = k(), this.scale = "m", this.selected = !1, this.selectionMode = "none", this.calciteChipClose = a({ cancelable: !1 }), this.calciteChipSelect = a({ cancelable: !1 }), this.calciteInternalChipKeyEvent = a({ cancelable: !1 }), this.calciteInternalChipSelect = a({ cancelable: !1 }), this.calciteInternalSyncSelectedChips = a({ cancelable: !1 }), this.listen("keydown", this.keyDownHandler), this.listen("click", this.clickHandler);
  }
  static {
    this.properties = { hasImage: 16, hasText: 16, appearance: 3, closable: 7, closed: 7, closeOnDelete: 7, disabled: 7, icon: 3, iconFlipRtl: 7, interactive: 5, kind: 3, label: 1, messageOverrides: 0, parentChipGroup: 0, scale: 3, selected: 7, selectionMode: 1, value: 1 };
  }
  static {
    this.styles = y;
  }
  // #endregion
  // #region Public Methods
  /** Sets focus on the component. */
  async setFocus() {
    await u(this), !this.disabled && this.interactive ? this.containerEl.value?.focus() : !this.disabled && this.closable && this.closeButtonEl.value?.focus();
  }
  async load() {
    v() && this.updateHasText();
  }
  willUpdate(e) {
    e.has("selected") && this.hasUpdated && this.watchSelected(this.selected);
  }
  updated() {
    b(this);
  }
  loaded() {
    this.selectionMode !== "none" && this.interactive && this.selected && this.handleSelectionPropertyChange(this.selected);
  }
  // #endregion
  // #region Private Methods
  watchSelected(e) {
    this.selectionMode !== "none" && this.handleSelectionPropertyChange(e);
  }
  keyDownHandler(e) {
    if (e.target === this.el)
      switch (e.key) {
        case " ":
        case "Enter":
          this.handleEmittingEvent(), e.preventDefault();
          break;
        case "Backspace":
        case "Delete":
          this.closable && !this.closed && this.closeOnDelete && (e.preventDefault(), this.close());
          break;
        case "ArrowRight":
        case "ArrowLeft":
        case "Home":
        case "End":
          this.calciteInternalChipKeyEvent.emit(e), e.preventDefault();
          break;
      }
  }
  clickHandler() {
    !this.interactive && this.closable && this.closeButtonEl.value.focus();
  }
  handleDefaultSlotChange() {
    this.updateHasText();
  }
  close() {
    this.calciteChipClose.emit(), this.selected = !1, this.closed = !0;
  }
  closeButtonKeyDownHandler(e) {
    f(e.key) && (e.preventDefault(), this.close());
  }
  updateHasText() {
    this.hasText = this.el.textContent.trim().length > 0;
  }
  handleSlotImageChange(e) {
    this.hasImage = g(e);
  }
  handleEmittingEvent() {
    this.interactive && this.calciteChipSelect.emit();
  }
  handleSelectionPropertyChange(e) {
    this.selectionMode === "single" && this.calciteInternalSyncSelectedChips.emit(), !this.parentChipGroup.selectedItems.includes(this.el) && e && this.selectionMode !== "multiple" && this.calciteInternalChipSelect.emit(), this.selectionMode !== "single" && this.calciteInternalSyncSelectedChips.emit();
  }
  // #endregion
  // #region Rendering
  renderChipImage() {
    return i`<div class=${t(c.imageContainer)}><slot name=${z.image} @slotchange=${this.handleSlotImageChange}></slot></div>`;
  }
  renderSelectionIcon() {
    const e = this.selectionMode === "multiple" ? this.selected ? l.checkedMultiple : l.uncheckedMultiple : this.selected ? l.checkedSingle : void 0;
    return i`<div class=${t({
      [c.selectIcon]: !0,
      [c.selectIconActive]: this.selectionMode === "multiple" || this.selected
    })}>${e ? i`<calcite-icon .icon=${e} .scale=${n(this.scale)}></calcite-icon>` : null}</div>`;
  }
  renderCloseButton() {
    return i`<button .ariaLabel=${this.messages.dismissLabel} class=${t(c.close)} @click=${this.close} @keydown=${this.closeButtonKeyDownHandler} .tabIndex=${this.disabled ? -1 : 0} ${r(this.closeButtonEl)}><calcite-icon .icon=${l.close} .scale=${n(this.scale)}></calcite-icon></button>`;
  }
  renderIcon() {
    return i`<calcite-icon class=${t(c.chipIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.icon} .scale=${n(this.scale)}></calcite-icon>`;
  }
  render() {
    const { disabled: e } = this, s = e || !e && !this.interactive, p = this.selectionMode === "multiple" && this.interactive ? "checkbox" : this.selectionMode !== "none" && this.interactive ? "radio" : this.interactive ? "button" : "img";
    return x({ disabled: e, children: i`<div .ariaChecked=${this.selectionMode !== "none" && this.interactive ? this.selected : void 0} .ariaLabel=${this.label} class=${t({
      [c.container]: !0,
      [c.textSlotted]: this.hasText,
      [c.imageSlotted]: this.hasImage,
      [c.selectable]: this.selectionMode !== "none",
      [c.multiple]: this.selectionMode === "multiple",
      [c.single]: this.selectionMode === "single" || this.selectionMode === "single-persist",
      [c.selected]: this.selected,
      [c.closable]: this.closable,
      [c.nonInteractive]: !this.interactive,
      [c.isCircle]: !this.closable && !this.hasText && (!this.icon || !this.hasImage) && (this.selectionMode === "none" || !!this.selectionMode && this.selectionMode !== "multiple" && !this.selected)
    })} @click=${this.handleEmittingEvent} .role=${p} .tabIndex=${s ? -1 : 0} ${r(this.containerEl)}>${this.selectionMode !== "none" && this.renderSelectionIcon() || ""}${this.renderChipImage()}${this.icon && this.renderIcon() || ""}<span class=${t(c.title)}><slot @slotchange=${this.handleDefaultSlotChange}></slot></span>${this.closable && this.renderCloseButton() || ""}</div>` });
  }
}
m("calcite-chip", C);
export {
  C as Chip
};
