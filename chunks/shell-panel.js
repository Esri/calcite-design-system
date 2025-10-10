import { b as R, L as E, c as S, s as d, x as v, C as u, y as D, H as V, q as L } from "./index.js";
import { i as k } from "./keyed.js";
import { i as I } from "./interact.min.js";
import { e as M, n as $ } from "./ref.js";
import { a as B, k as b, d as P, s as O } from "./dom.js";
import { c as _ } from "./math.js";
import { g as C } from "./dynamicClasses.js";
import { u as N } from "./useT9n.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const o = {
  container: "container",
  actionBarContainer: "action-bar-container",
  contentContainer: "content-container",
  content: "content",
  contentHeader: "content__header",
  contentBody: "content__body",
  contentOverlay: "content--overlay",
  floatAll: "float-all",
  floatContent: "float--content",
  resizeHandle: "resize-handle",
  resizeHandleBar: "resize-handle-bar"
}, H = {
  actionBar: "action-bar",
  header: "header"
}, A = {
  dragVertical: "drag-resize-vertical",
  dragHorizontal: "drag-resize-horizontal"
}, U = R`:host{--calcite-internal-color-focus: var( --calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)) )}:host{pointer-events:none;position:relative;display:flex;flex:0 1 auto;align-items:stretch;z-index:var(--calcite-shell-panel-z-index, var(--calcite-z-index));--calcite-shell-panel-max-height: unset;--calcite-internal-shell-panel-shadow-block-start: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-block-end: 0 -4px 8px -1px rgba(0, 0, 0, .08), 0 -2px 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-inline-start: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-inline-end: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04)}.calcite--rtl.content--overlay{--calcite-internal-shell-panel-shadow-inline-start: -4px 0 8px -1px rgba(0, 0, 0, .08), -2px 0 4px -1px rgba(0, 0, 0, .04);--calcite-internal-shell-panel-shadow-inline-end: 4px 0 8px -1px rgba(0, 0, 0, .08), 2px 0 4px -1px rgba(0, 0, 0, .04)}:host([layout=vertical]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index) + 1))}:host([layout=vertical][display-mode=overlay]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index-header) + 1))}:host([layout=vertical][display-mode=float-all]) .content{flex:2}:host([layout=vertical]:not([display-mode=float-all])) .width-s{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-max-width: var(--calcite-shell-panel-max-width, 300px);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical][display-mode=float-all]) .width-s{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical]:not([display-mode=float-all])) .width-m{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-max-width: var(--calcite-shell-panel-max-width, 420px);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical][display-mode=float-all]) .width-m{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical]:not([display-mode=float-all])) .width-l{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-max-width: var(--calcite-shell-panel-max-width, 680px);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 340px)}:host([layout=vertical][display-mode=float-all]) .width-l{--calcite-internal-shell-panel-width: var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-min-width: var(--calcite-shell-panel-min-width, 340px)}:host([layout=horizontal]) .content{--calcite-internal-shell-panel-height: var(--calcite-shell-panel-height);--calcite-internal-shell-panel-min-height: var(--calcite-shell-panel-min-height, 5vh);--calcite-internal-shell-panel-max-height: var(--calcite-shell-panel-max-height, 30vh)}:host([layout=horizontal]) .height-s{--calcite-internal-shell-panel-height: var(--calcite-shell-panel-height);--calcite-internal-shell-panel-min-height: var(--calcite-shell-panel-min-height, 5vh);--calcite-internal-shell-panel-max-height: var(--calcite-shell-panel-max-height, 20vh)}:host([layout=horizontal]) .height-l{--calcite-internal-shell-panel-height: var(--calcite-shell-panel-height);--calcite-internal-shell-panel-min-height: var(--calcite-shell-panel-min-height, 5vh);--calcite-internal-shell-panel-max-height: var(--calcite-shell-panel-max-height, 40vh)}.container{pointer-events:none;box-sizing:border-box;display:flex;block-size:100%;flex:1 1 auto;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-shell-panel-text-color, var(--calcite-color-text-2))}.container *{box-sizing:border-box}.container.float-all{margin-block:var(--calcite-spacing-sm);margin-inline:var(--calcite-spacing-sm)}.float-all{max-block-size:var(--calcite-internal-shell-panel-max-height, calc(100% - 1rem) );box-shadow:var(--calcite-shell-panel-shadow, var(--calcite-shadow-sm));border-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round));overflow:hidden}:host([layout=vertical][position=start]) .float-all{border-inline-start:var(--calcite-border-width-sm) solid var(--calcite-shell-panel-border-color, var(--calcite-color-border-3))}:host([layout=vertical][position=end]) .float-all{border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-shell-panel-border-color, var(--calcite-color-border-3)))}:host([layout=horizontal]) .float-all{border-inline:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-shell-panel-border-color, var(--calcite-color-border-3)))}:host([layout=horizontal]) .container{block-size:auto;inline-size:100%;flex-direction:column}.resize-handle{position:absolute;box-sizing:border-box;display:flex;-webkit-user-select:none;user-select:none;align-items:center;justify-content:center;outline:2px solid transparent;outline-offset:2px;--calcite-internal-shell-panel-resize-handle-offset: calc( (var(--calcite-size-fixed-xxl) - var(--calcite-size-fixed-sm-plus)) / 2 * -1 );z-index:var(--calcite-z-index-header)}.resize-handle:active .resize-handle-bar,.resize-handle:hover .resize-handle-bar{color:var(--calcite-shell-panel-resize-icon-color, var(--calcite-color-text-1));background-color:var(--calcite-shell-panel-resize-background-color, var(--calcite-color-foreground-3))}.resize-handle-bar{pointer-events:none;display:flex;align-items:center;justify-content:center;color:var(--calcite-shell-panel-resize-icon-color, var(--calcite-color-border-input));background-color:var(--calcite-shell-panel-resize-background-color, var(--calcite-color-background))}.resize-handle:focus .resize-handle-bar{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-color:transparent;outline:var(--calcite-border-width-md) solid var(--calcite-internal-color-focus)}:host([position=start][layout=vertical]) .resize-handle{inline-size:var(--calcite-size-fixed-xxl);inset-inline-end:var(--calcite-internal-shell-panel-resize-handle-offset);block-size:100%}:host([position=start][layout=vertical]) .resize-handle-bar{block-size:100%;inline-size:var(--calcite-size-fixed-sm-plus);border-inline-start:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-color-border-3))}:host([position=start][layout=vertical]):host([display-mode^=float]) .resize-handle-bar{border-start-end-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round));border-end-end-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round))}:host([position=end][layout=vertical]) .resize-handle{inline-size:var(--calcite-size-fixed-xxl);inset-inline-start:var(--calcite-internal-shell-panel-resize-handle-offset);block-size:100%}:host([position=end][layout=vertical]) .resize-handle-bar{block-size:100%;inline-size:var(--calcite-size-fixed-sm-plus);border-inline-end:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-color-border-3))}:host([position=end][layout=vertical]):host([display-mode^=float]) .resize-handle-bar{border-start-start-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round));border-end-start-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round))}:host([position=start][layout=horizontal]) .resize-handle{block-size:var(--calcite-size-fixed-xxl);inline-size:100%;inset-block-end:var(--calcite-internal-shell-panel-resize-handle-offset)}:host([position=start][layout=horizontal]) .resize-handle-bar{inline-size:100%;block-size:var(--calcite-size-fixed-sm-plus);border-block-start:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-color-border-3))}:host([position=start][layout=horizontal]):host([display-mode^=float]) .resize-handle-bar{border-end-end-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round));border-end-start-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round))}:host([position=end][layout=horizontal]) .resize-handle{block-size:var(--calcite-size-fixed-xxl);inline-size:100%;inset-block-start:var(--calcite-internal-shell-panel-resize-handle-offset)}:host([position=end][layout=horizontal]) .resize-handle-bar{inline-size:100%;block-size:var(--calcite-size-fixed-sm-plus);border-block-end:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-color-border-3))}:host([position=end][layout=horizontal]):host([display-mode^=float]) .resize-handle-bar{border-start-start-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round));border-start-end-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round))}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%;inline-size:100%;flex:1 1 auto;max-block-size:unset;max-inline-size:unset}::slotted(.calcite-match-height){display:flex;flex:1 1 auto;overflow:hidden}.action-bar-container{pointer-events:auto;box-sizing:border-box;display:flex;flex:1 1 auto}.content-container{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;align-items:stretch;align-self:stretch}:host([layout=horizontal]) .action-bar-container,:host([layout=horizontal]) .content-container{flex-direction:column}.content{pointer-events:auto;position:relative;box-sizing:border-box;display:flex;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;align-self:stretch;padding:0;background-color:var(--calcite-shell-panel-background-color, var(--calcite-color-background));transition:max-block-size var(--calcite-animation-timing),max-inline-size var(--calcite-animation-timing)}:host([layout=vertical]:not([display-mode=float-all])) .content{inline-size:var(--calcite-internal-shell-panel-width);max-inline-size:var(--calcite-internal-shell-panel-max-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=vertical][display-mode=float-all]) .content{inline-size:var(--calcite-internal-shell-panel-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=horizontal]) .content{block-size:var(--calcite-internal-shell-panel-height);max-block-size:var(--calcite-internal-shell-panel-max-height);min-block-size:var(--calcite-internal-shell-panel-min-height)}:host([resizable][layout=vertical][position=start]) .content{padding-inline-end:var(--calcite-size-fixed-sm-plus)}:host([resizable][layout=vertical][position=end]) .content{padding-inline-start:var(--calcite-size-fixed-sm-plus)}:host([resizable][layout=horizontal][position=start]) .content{padding-block-end:var(--calcite-size-fixed-sm-plus)}:host([resizable][layout=horizontal][position=end]) .content{padding-block-start:var(--calcite-size-fixed-sm-plus)}.content__header{display:flex;flex:0 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch}.content__body{display:flex;flex:1 1 auto;flex-direction:column;overflow:hidden}.content--overlay{position:absolute;--tw-shadow: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--tw-shadow-colored: 0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--calcite-shell-panel-shadow, var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow))}:host([layout=vertical]) .content--overlay{inset-block-start:0px;block-size:100%}:host([layout=horizontal]) .content--overlay{inset-inline-start:0px;inline-size:100%}:host([layout=vertical][position=start]) .content--overlay{inset-inline-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-start)}:host([layout=vertical][position=end]) .content--overlay{inset-inline-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-end)}:host([layout=horizontal][position=start]) .content--overlay{inset-block-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-start)}:host([layout=horizontal][position=end]) .content--overlay{inset-block-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-end)}.float--content{margin-block-end:auto;block-size:auto;overflow:hidden;--tw-shadow: 0 4px 8px -1px rgba(0, 0, 0, .08), 0 2px 4px -1px rgba(0, 0, 0, .04);--tw-shadow-colored: 0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--calcite-shell-panel-shadow, var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow));border-radius:var(--calcite-shell-panel-corner-radius, var(--calcite-corner-radius-round));margin-inline:var(--calcite-spacing-sm);margin-block-start:var(--calcite-spacing-sm);max-block-size:var(--calcite-internal-shell-panel-max-height, calc(100% - 1rem) )}.float--content ::slotted(calcite-panel),.float--content ::slotted(calcite-flow){max-block-size:unset}:host([layout=horizontal]) .float--content{margin-block:var(--calcite-spacing-sm)}:host([position=start]) .float--content ::slotted(calcite-panel),:host([position=start]) .float--content ::slotted(calcite-flow),:host([position=end]) .float--content ::slotted(calcite-panel),:host([position=end]) .float--content ::slotted(calcite-flow){border-style:none}slot[name=action-bar]::slotted(calcite-action-bar),.content ::slotted(calcite-flow),.content ::slotted(calcite-panel:not([closed])){border:var(--calcite-border-width-sm) solid var(--calcite-shell-border-color, var(--calcite-color-border-3))}:host([position=start]:not([slot=panel-end])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start]:not([slot=panel-end])) .content ::slotted(calcite-flow),:host([position=start]:not([slot=panel-end])) .content ::slotted(calcite-panel),:host([position=end][slot=panel-start]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end][slot=panel-start]) .content ::slotted(calcite-flow),:host([position=end][slot=panel-start]) .content ::slotted(calcite-panel){border-inline-start:none}:host([resizable][layout=vertical]) .content ::slotted(calcite-flow),:host([resizable][layout=vertical]) .content ::slotted(calcite-panel){border-inline-start:none;border-inline-end:none}:host([resizable][layout=horizontal]) .content ::slotted(calcite-flow),:host([resizable][layout=horizontal]) .content ::slotted(calcite-panel){border-block-start:none;border-block-end:none}:host([position=end]:not([slot=panel-start])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-flow),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-panel),:host([position=start][slot=panel-end]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start][slot=panel-end]) .content ::slotted(calcite-flow),:host([position=start][slot=panel-end]) .content ::slotted(calcite-panel){border-inline-end:none}:host([layout=horizontal]) slot[name=action-bar]::slotted(calcite-action-bar){border-inline:0}:host([layout=horizontal][position=start]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=start]) .content ::slotted(calcite-panel){border-inline:0;border-block-start:0}:host([layout=horizontal][position=end]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=end]) .content ::slotted(calcite-panel){border-inline:0;border-block-end:0}:host([hidden]){display:none}[hidden]{display:none}`;
class K extends E {
  constructor() {
    super(...arguments), this.actionBars = [], this.contentRef = M(), this.messages = N(), this.resizeValues = {
      inlineSize: null,
      blockSize: null,
      minInlineSize: null,
      minBlockSize: null,
      maxInlineSize: null,
      maxBlockSize: null
    }, this.hasHeader = !1, this.collapsed = !1, this.displayMode = "dock", this.layout = "vertical", this.position = "start", this.resizable = !1, this.widthScale = "m", this.calciteInternalShellPanelResizeEnd = S({ cancelable: !1 }), this.calciteInternalShellPanelResizeStart = S({ cancelable: !1 }), this.calciteShellPanelCollapse = S({ cancelable: !1 }), this.calciteShellPanelExpand = S({ cancelable: !1 });
  }
  static {
    this.properties = { resizeValues: 16, hasHeader: 16, collapsed: 7, displayMode: 3, heightScale: 3, layout: 3, messageOverrides: 0, position: 3, resizable: 7, height: 3, widthScale: 3, width: 3 };
  }
  static {
    this.styles = U;
  }
  willUpdate(e) {
    e.has("layout") && (this.hasUpdated || this.layout !== "vertical") && this.setActionBarsLayout(this.actionBars), e.has("collapsed") && this.hasUpdated && (this.collapsed ? this.calciteShellPanelCollapse.emit() : this.calciteShellPanelExpand.emit());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.cleanupInteractions();
  }
  getContentElDOMRect() {
    return this.contentRef.value.getBoundingClientRect();
  }
  handleKeyDown(e) {
    const { key: l, defaultPrevented: r, shiftKey: a } = e, { position: i, layout: t, resizable: n, contentRef: s, el: x, resizeValues: { maxBlockSize: m, maxInlineSize: w, minBlockSize: p, minInlineSize: g } } = this, y = [...t === "horizontal" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"], "Home", "End"];
    if (!n || !s.value || r || !y.includes(l))
      return;
    const h = this.getContentElDOMRect(), f = B(x) === "rtl" ? -1 : 1, c = a ? D : V;
    switch (l) {
      case "ArrowUp":
        this.updateSize({
          size: h.height + (t === "horizontal" && i === "end" ? c : -c),
          type: "blockSize"
        }), e.preventDefault();
        break;
      case "ArrowDown":
        this.updateSize({
          size: h.height + (t === "horizontal" && i === "end" ? -c : c),
          type: "blockSize"
        }), e.preventDefault();
        break;
      case "ArrowLeft":
        this.updateSize({
          size: h.width + (t === "vertical" && i === "end" ? c : -c) * f,
          type: "inlineSize"
        }), e.preventDefault();
        break;
      case "ArrowRight":
        this.updateSize({
          size: h.width + (t === "vertical" && i === "end" ? -c : c) * f,
          type: "inlineSize"
        }), e.preventDefault();
        break;
      case "Home":
        this.updateSize({
          size: t === "horizontal" ? p : g,
          type: t === "horizontal" ? "blockSize" : "inlineSize"
        }), e.preventDefault();
        break;
      case "End":
        this.updateSize({
          size: t === "horizontal" ? m : w,
          type: t === "horizontal" ? "blockSize" : "inlineSize"
        }), e.preventDefault();
        break;
    }
  }
  updateSize({ type: e, size: l }) {
    const { contentRef: r, resizeValues: a } = this;
    if (!r.value)
      return;
    const i = e === "blockSize" ? "minBlockSize" : "minInlineSize", t = e === "blockSize" ? "maxBlockSize" : "maxInlineSize", n = a[i] && a[t] ? _(l, a[i], a[t]) : l, s = Math.round(n);
    this.resizeValues = {
      ...a,
      [e]: s
    }, r.value.style[e] = l !== null ? `${s}px` : null;
  }
  cleanupInteractions() {
    this.interaction?.unset();
  }
  async setupInteractions() {
    this.cleanupInteractions();
    const { el: e, contentRef: l, resizable: r, position: a, collapsed: i, resizeHandleEl: t, layout: n } = this;
    if (!l.value || i || !r || !t)
      return;
    await this.el.componentOnReady();
    const { inlineSize: s, minInlineSize: x, blockSize: m, minBlockSize: w, maxInlineSize: p, maxBlockSize: g } = window.getComputedStyle(l.value), z = {
      inlineSize: b(s),
      blockSize: b(m),
      minInlineSize: b(x),
      minBlockSize: b(w),
      maxInlineSize: b(p) || window.innerWidth,
      maxBlockSize: b(g) || window.innerHeight
    };
    this.resizeValues = z;
    const y = B(e) === "rtl";
    this.interaction = I(l.value, { context: e.ownerDocument }).resizable({
      edges: {
        top: a === "end" && n === "horizontal" ? t : !1,
        right: a === (y ? "end" : "start") && n === "vertical" ? t : !1,
        bottom: a === "start" && n === "horizontal" ? t : !1,
        left: a === (y ? "start" : "end") && n === "vertical" ? t : !1
      },
      modifiers: [
        I.modifiers.restrictSize({
          min: {
            width: z.minInlineSize,
            height: z.minBlockSize
          },
          max: {
            width: z.maxInlineSize,
            height: z.maxBlockSize
          }
        })
      ],
      listeners: {
        resizestart: () => {
          this.calciteInternalShellPanelResizeStart.emit();
        },
        resizeend: () => {
          this.calciteInternalShellPanelResizeEnd.emit();
        },
        move: ({ rect: h }) => {
          const f = n === "horizontal";
          this.updateSize({
            size: f ? h.height : h.width,
            type: f ? "blockSize" : "inlineSize"
          });
        }
      }
    });
  }
  setResizeHandleEl(e) {
    this.resizeHandleEl = e, this.setupInteractions();
  }
  setActionBarsLayout(e) {
    e.forEach((l) => l.layout = this.layout);
  }
  handleActionBarSlotChange(e) {
    const l = P(e).filter((r) => r?.matches("calcite-action-bar"));
    this.actionBars = l, this.setActionBarsLayout(l);
  }
  handleHeaderSlotChange(e) {
    this.hasHeader = O(e);
  }
  getResizeIcon() {
    const { layout: e } = this;
    return e === "horizontal" ? A.dragVertical : A.dragHorizontal;
  }
  renderHeader() {
    return k("header", v`<div class=${d(o.contentHeader)} .hidden=${!this.hasHeader}><slot name=${H.header} @slotchange=${this.handleHeaderSlotChange}></slot></div>`);
  }
  render() {
    const { collapsed: e, position: l, resizable: r, layout: a, displayMode: i, resizeValues: t } = this, n = B(this.el), s = !e && r ? k("resize-handle", v`<div .ariaLabel=${this.messages.resize} .ariaOrientation=${a === "horizontal" ? "vertical" : "horizontal"} .ariaValueMax=${a == "horizontal" ? t.maxBlockSize : t.maxInlineSize} .ariaValueMin=${a == "horizontal" ? t.minBlockSize : t.minInlineSize} .ariaValueNow=${a == "horizontal" ? t.blockSize : t.inlineSize} class=${d(o.resizeHandle)} @keydown=${this.handleKeyDown} role=separator tabindex=0 touch-action=none ${$(this.setResizeHandleEl)}><div class=${d(o.resizeHandleBar)}><calcite-icon .icon=${this.getResizeIcon()} scale=s></calcite-icon></div></div>`) : null, x = () => a === "horizontal" ? l === "start" ? u.calciteAnimateInDown : u.calciteAnimateInUp : n === "ltr" && l === "end" || n === "rtl" && l === "start" ? u.calciteAnimateInLeft : u.calciteAnimateInRight, m = v`<div class=${d(o.contentContainer)}>${k("content", v`<div class=${d({
      [u.rtl]: n === "rtl",
      [o.content]: !0,
      [o.contentOverlay]: i === "overlay",
      [o.floatContent]: i === "float-content" || i === "float",
      [u.calciteAnimate]: i === "overlay",
      [x()]: i === "overlay",
      [C("width", this.width, this.widthScale)]: !!(this.width || this.widthScale),
      [C("height", this.height, this.heightScale)]: !!(this.height || this.heightScale)
    })} .hidden=${e} ${$(this.contentRef)}>${this.renderHeader()}<div class=${d(o.contentBody)}><slot></slot></div>${s}</div>`)}</div>`, p = [k("action-bar-container", v`<div class=${d(o.actionBarContainer)}><slot name=${H.actionBar} @slotchange=${this.handleActionBarSlotChange}></slot></div>`), m];
    return l === "end" && p.reverse(), v`<div class=${d({ [o.container]: !0, [o.floatAll]: i === "float-all" })}>${p}</div>`;
  }
}
L("calcite-shell-panel", K);
export {
  K as ShellPanel
};
