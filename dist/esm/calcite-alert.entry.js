import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-30c05663.js';
import { g as getElementDir } from './dom-0361c8d2.js';

const CalciteAlert = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        //--------------------------------------------------------------------------
        //
        //  Properties
        //
        //---------------------------------------------------------------------------
        /** Is the alert currently active or not */
        this.active = false;
        /** Close the alert automatically (recommended for passive, non-blocking alerts) */
        this.autoDismiss = false;
        /** Duration of autoDismiss (only used with `autoDismiss`) */
        this.autoDismissDuration = this.autoDismiss ? "medium" : null;
        /** Color for the alert (will apply to top border and icon) */
        this.color = "blue";
        /** Select theme (light or dark) */
        this.theme = "light";
        /** specify the scale of the button, defaults to m */
        this.scale = "m";
        /** specify if the alert should display an icon */
        this.icon = false;
        //--------------------------------------------------------------------------
        //
        //  Private State/Props
        //
        //--------------------------------------------------------------------------
        /** a managed list of alerts */
        this.alertQueue = [];
        /** Unique ID for this alert */
        this.alertId = this.el.id;
        /** map dismissal durations */
        this.autoDismissDurations = {
            slow: 14000,
            medium: 10000,
            fast: 6000
        };
        this.iconDefaults = {
            green: "checkCircle",
            yellow: "exclamationMarkTriangle",
            red: "exclamationMarkTriangle",
            blue: "lightbulb"
        };
        this.calciteAlertClose = createEvent(this, "calciteAlertClose", 7);
        this.calciteAlertOpen = createEvent(this, "calciteAlertOpen", 7);
        this.calciteAlertSync = createEvent(this, "calciteAlertSync", 7);
    }
    // listen for emitted open event from other calcite alerts and determine active state
    alertOpen(event) {
        this.calciteAlertSync.emit({ alertQueue: this.alertQueue });
        if (!this.alertQueue.includes(event.detail.requestedAlert)) {
            this.alertQueue.push(event.detail.requestedAlert);
        }
        this.determineActiveAlert();
    }
    // listen for emitted close event from other calcite alerts and determine active state
    alertClose(event) {
        if (this.alertQueue.includes(event.detail.requestedAlert)) {
            this.alertQueue = this.alertQueue.filter(e => e !== event.detail.requestedAlert);
        }
        if (this.alertId === event.detail.requestedAlert)
            this.active = false;
        this.determineActiveAlert();
    }
    // when an alert is opened / added to dom, update the queue to match any previously present queues
    alertRegister(event) {
        if (this.alertQueue !== event.detail.alertQueue) {
            this.alertQueue = event.detail.alertQueue;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // prop validations
        let colors = ["blue", "red", "green", "yellow"];
        if (!colors.includes(this.color))
            this.color = "blue";
        let themes = ["dark", "light"];
        if (!themes.includes(this.theme))
            this.theme = "light";
        let scale = ["s", "m", "l"];
        if (!scale.includes(this.scale))
            this.scale = "m";
        let durations = ["slow", "medium", "fast"];
        if (this.autoDismissDuration !== null &&
            !durations.includes(this.autoDismissDuration)) {
            this.autoDismissDuration = "medium";
        }
    }
    componentDidLoad() {
        this.alertLinkEl = this.el.querySelectorAll("calcite-button")[0];
    }
    render() {
        const dir = getElementDir(this.el);
        const closeButton = (h("button", { class: "alert-close", "aria-label": "close", onClick: () => this.close(), ref: el => (this.closeButton = el) }, h("calcite-icon", { icon: "x", scale: "s" })));
        const count = (h("div", { class: `${this.alertQueue.length > 1 ? "active " : ""}alert-count` }, "+", this.alertQueue.length > 2 ? this.alertQueue.length - 1 : 1));
        const progress = h("div", { class: "alert-dismiss-progress" });
        const role = !this.active
            ? null
            : this.autoDismiss
                ? "alert"
                : "alertdialog";
        return (h(Host, { active: this.active, dir: dir, role: role }, this.icon ? this.setIcon() : null, h("div", { class: "alert-content" }, h("slot", { name: "alert-title" }), h("slot", { name: "alert-message" }), h("slot", { name: "alert-link" })), count, !this.autoDismiss ? closeButton : null, this.active && this.autoDismiss ? progress : null));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** open alert and emit the opened alert  */
    async open() {
        this.calciteAlertOpen.emit({
            requestedAlert: this.alertId,
            alertQueue: this.alertQueue
        });
    }
    /** close alert and emit the closed alert */
    async close() {
        this.calciteAlertClose.emit({
            requestedAlert: this.alertId,
            alertQueue: this.alertQueue
        });
    }
    /** focus the close button, if present and requested */
    async setFocus() {
        if (!this.closeButton && !this.alertLinkEl) {
            return;
        }
        if (this.alertLinkEl)
            this.alertLinkEl.setFocus();
        else if (this.closeButton) {
            this.closeButton.focus();
        }
    }
    /** based on the current alert determine which alert is active */
    determineActiveAlert() {
        this.alertQueueLength = this.alertQueue.length;
        this.currentAlert = this.alertQueue.length > 0 ? this.alertQueue[0] : null;
        if (!this.active && this.currentAlert === this.alertId) {
            setTimeout(() => (this.active = true), 300);
            if (this.autoDismiss) {
                setTimeout(() => this.close(), this.autoDismissDurations[this.autoDismissDuration]);
            }
        }
    }
    setIcon() {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "alert-icon" }, h("calcite-icon", { icon: path, filled: true, scale: "s" })));
    }
    get el() { return getElement(this); }
    static get style() { return ":root{--calcite-ui-blue:#007ac2;--calcite-ui-blue-hover:#2890ce;--calcite-ui-blue-press:#00619b;--calcite-ui-green:#35ac46;--calcite-ui-green-hover:#50ba5f;--calcite-ui-green-press:#288835;--calcite-ui-yellow:#edd317;--calcite-ui-yellow-hover:#f9e54e;--calcite-ui-yellow-press:#d9bc00;--calcite-ui-red:#d83020;--calcite-ui-red-hover:#e65240;--calcite-ui-red-press:#a82b1e;--calcite-ui-background:#f8f8f8;--calcite-ui-foreground:#fff;--calcite-ui-foreground-hover:#f3f3f3;--calcite-ui-foreground-press:#eaeaea;--calcite-ui-text-1:#151515;--calcite-ui-text-2:#4a4a4a;--calcite-ui-text-3:#6a6a6a;--calcite-ui-border-1:#cacaca;--calcite-ui-border-2:#dfdfdf;--calcite-ui-border-3:#eaeaea;--calcite-ui-border-hover:#9f9f9f;--calcite-ui-border-press:#757575}:host([theme=dark]){--calcite-ui-blue:#00a0ff;--calcite-ui-blue-hover:#0087d7;--calcite-ui-blue-press:#47bbff;--calcite-ui-green:#36da43;--calcite-ui-green-hover:#11ad1d;--calcite-ui-green-press:#44ed51;--calcite-ui-yellow:#ffc900;--calcite-ui-yellow-hover:#f4b000;--calcite-ui-yellow-press:#ffe24d;--calcite-ui-red:#fe583e;--calcite-ui-red-hover:#f3381b;--calcite-ui-red-press:#ff7465;--calcite-ui-background:#202020;--calcite-ui-foreground:#2b2b2b;--calcite-ui-foreground-hover:#353535;--calcite-ui-foreground-press:#404040;--calcite-ui-text-1:#fff;--calcite-ui-text-2:#bfbfbf;--calcite-ui-text-3:#9f9f9f;--calcite-ui-border-1:#4a4a4a;--calcite-ui-border-2:#404040;--calcite-ui-border-3:#353535;--calcite-ui-border-hover:#757575;--calcite-ui-border-press:#9f9f9f}:root{--calcite-border-radius:3px}:host([hidden]){display:none}body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}.hydrated--invisible{visibility:hidden}:host{--calcite-alert-dismiss-progress-background:hsla(0,0%,100%,0.8)}:host([theme=dark]){--calcite-alert-dismiss-progress-background:rgba(43,43,43,0.8)}:host([scale=s]){--calcite-alert-width:40em;--calcite-alert-spacing-token-small:0.75rem;--calcite-alert-spacing-token-large:1rem}:host([scale=s]) div::slotted([slot=alert-title]),:host([scale=s]) slot[name=alert-title]::slotted(div){font-size:.875rem;line-height:1.5}:host([scale=s]) ::slotted(calcite-button),:host([scale=s]) div::slotted([slot=alert-message]),:host([scale=s]) slot[name=alert-message]::slotted(div){font-size:.8125rem;line-height:1.5}:host([scale=m]){--calcite-alert-width:50em;--calcite-alert-spacing-token-small:1rem;--calcite-alert-spacing-token-large:1.5rem}:host([scale=m]) div::slotted([slot=alert-title]),:host([scale=m]) slot[name=alert-title]::slotted(div){font-size:.9375rem;line-height:1.5}:host([scale=m]) ::slotted(calcite-button),:host([scale=m]) div::slotted([slot=alert-message]),:host([scale=m]) slot[name=alert-message]::slotted(div){font-size:.875rem;line-height:1.5}:host([scale=l]){--calcite-alert-width:60em;--calcite-alert-spacing-token-small:1.2rem;--calcite-alert-spacing-token-large:1.875rem}:host([scale=l]) div::slotted([slot=alert-title]),:host([scale=l]) slot[name=alert-title]::slotted(div){font-size:1rem;line-height:1.5}:host([scale=l]) ::slotted(calcite-button),:host([scale=l]) div::slotted([slot=alert-message]),:host([scale=l]) slot[name=alert-message]::slotted(div){font-size:.9375rem;line-height:1.5}:host{display:-ms-flexbox;display:flex;position:fixed;-ms-flex-pack:center;justify-content:center;margin:0 auto;width:var(--calcite-alert-width);max-width:90%;max-height:0;background-color:var(--calcite-ui-foreground);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.16);box-shadow:0 0 16px 0 rgba(0,0,0,.16);border-radius:var(--calcite-border-radius);opacity:0;left:0;right:0;bottom:0;pointer-events:none;z-index:101;-webkit-transform:translate3d(0,1.5rem,0);transform:translate3d(0,1.5rem,0);-webkit-transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;border-top:0 solid transparent}\@media only screen and (max-width:860px){:host{width:100%;max-width:100%;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}}:host:host(.hydrated){visibility:hidden!important}:host([active]){opacity:1;max-height:100%;-webkit-transform:translate3d(0,-1.5rem,0);transform:translate3d(0,-1.5rem,0);pointer-events:auto;border-top-width:3px}:host([active]):host(.hydrated){visibility:visible!important}\@media only screen and (max-width:860px){:host([active]){-webkit-transform:translateZ(0);transform:translateZ(0)}}div::slotted([slot=alert-title]),slot[name=alert-title]::slotted(div){font-size:1rem;line-height:1.5;color:var(--calcite-ui-text-1);font-weight:500}div::slotted([slot=alert-message]),slot[name=alert-message]::slotted(div){display:inline;margin-right:.75rem;font-size:.9375rem;line-height:1.5;color:var(--calcite-ui-text-2)}:host([dir=rtl]) div::slotted([slot=alert-message]),:host([dir=rtl]) slot[name=alert-message]::slotted(div){margin-right:unset;margin-left:.75rem}.alert-content{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small) 0}\@media only screen and (max-width:860px){.alert-content{padding:1.5rem}}.alert-content:first-of-type:not(:only-child){padding-left:var(--calcite-alert-spacing-token-large)}.alert-content:only-child{padding:var(--calcite-alert-spacing-token-small)}\@media only screen and (max-width:860px){.alert-content{padding:var(--calcite-alert-spacing-token-large) var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large) 0}}:host([dir=rtl]) .alert-content{padding:var(--calcite-alert-spacing-token-small) 0 var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small)}:host([dir=rtl]) .alert-content:first-of-type:not(:only-child){padding-right:var(--calcite-alert-spacing-token-large)}\@media only screen and (max-width:860px){:host([dir=rtl]) .alert-content{padding:var(--calcite-alert-spacing-token-large) 0 var(--calcite-alert-spacing-token-large) var(--calcite-alert-spacing-token-small)}}.alert-icon{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}\@media only screen and (max-width:860px){.alert-icon{padding:1.5rem}}.alert-close{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;color:var(--calcite-ui-text-3);overflow:hidden;border-radius:0 0 var(--calcite-border-radius) 0}\@media only screen and (max-width:860px){.alert-close{padding:1.5rem}}.alert-close:focus,.alert-close:hover{background-color:var(--calcite-ui-foreground-hover)}.alert-close:active{background-color:var(--calcite-ui-foreground-press)}\@media only screen and (max-width:860px){.alert-close{border-radius:0}}:host([dir=rtl]) .alert-close{border-radius:0 0 0 var(--calcite-border-radius)}.alert-count{font-size:.875rem;line-height:1.5;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around;overflow:hidden;width:0;visibility:hidden;font-weight:500;text-align:center;color:var(--calcite-ui-text-2);opacity:0;border-left:0 solid transparent;border-right:0 solid transparent;cursor:default;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.alert-count.active{visibility:visible;opacity:1;padding:0 .375rem;width:3rem;border-left:1px solid var(--calcite-ui-border-3);border-right:1px solid var(--calcite-ui-border-3)}.alert-count.active:last-child{border-right:0 solid transparent}\@media only screen and (max-width:860px){.alert-count{border-radius:0}}:host([dir=rtl]).active:last-child{border-left:1px solid var(--calcite-ui-border-3);border-right:0 solid transparent}.alert-dismiss-progress{display:block;position:absolute;left:0;right:0;top:0;width:100%;height:3px;z-index:103}.alert-dismiss-progress:after{height:3px;top:-3px;right:0;display:block;position:absolute;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0;content:\"\";background-color:var(--calcite-alert-dismiss-progress-background);z-index:104}:host([color=blue]){border-top-color:var(--calcite-ui-blue)}:host([color=blue]) .alert-icon{color:var(--calcite-ui-blue)}:host([color=red]){border-top-color:var(--calcite-ui-red)}:host([color=red]) .alert-icon{color:var(--calcite-ui-red)}:host([color=yellow]){border-top-color:var(--calcite-ui-yellow)}:host([color=yellow]) .alert-icon{color:var(--calcite-ui-yellow)}:host([color=green]){border-top-color:var(--calcite-ui-green)}:host([color=green]) .alert-icon{color:var(--calcite-ui-green)}:host([auto-dismiss-duration=fast]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 6s ease-out;animation:dismissProgress 6s ease-out}:host([auto-dismiss-duration=medium]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 10s ease-out;animation:dismissProgress 10s ease-out}:host([auto-dismiss-duration=slow]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 14s ease-out;animation:dismissProgress 14s ease-out}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:.8}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:.8}to{width:100%;opacity:1}}"; }
};

export { CalciteAlert as calcite_alert };
