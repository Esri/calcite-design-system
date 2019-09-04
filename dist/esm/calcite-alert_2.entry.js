import { h, r as registerInstance, c as createEvent, H as Host, g as getElement } from './core-26bd2899.js';
import { g as getElementDir } from './dom-73b84262.js';
import { c as checkCircle24F, e as exclamationMarkTriangle24F, l as lightbulb24F, a as x32 } from './index-12295034.js';
import { c as createProviderConsumer } from './index-df72ec0c.js';

const AlertInterface = createProviderConsumer({
    currentAlert: "",
    queueLength: 0
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));

const CalciteAlert = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Is the alert currently active or not */
        this.active = false;
        /** Close the alert automatically (recommended for passive, non-blocking alerts) */
        this.dismiss = false;
        /** Length before autodismissal (only used with `dismiss`) */
        this.duration = this.dismiss
            ? "medium"
            : null;
        /** Color for the alert (will apply to top border and icon) */
        this.color = "blue";
        /** Select theme (light or dark) */
        this.theme = "light";
        /** If false, no icon will be shown in the alert */
        this.icon = false;
        /** Unique ID for this alert */
        /** @internal */
        this.alertId = this.el.id;
        /** @internal */
        this.currentAlert = "";
        /** @internal */
        this.queueLength = 0;
        this.durationDefaults = {
            slow: 14000,
            medium: 10000,
            fast: 6000
        };
        this.iconDefaults = {
            green: checkCircle24F,
            yellow: exclamationMarkTriangle24F,
            red: exclamationMarkTriangle24F,
            blue: lightbulb24F
        };
        this.calciteAlertClose = createEvent(this, "calciteAlertClose", 7);
        this.calciteAlertOpen = createEvent(this, "calciteAlertOpen", 7);
    }
    /** watch for changes to currentAlert passed from <calcite-alerts> */
    watchCurrentAlert() {
        if (!this.active && this.currentAlert === this.alertId) {
            if (this.dismiss)
                setTimeout(() => this.closeCalciteAlert(), this.durationDefaults[this.duration]);
            setTimeout(() => (this.active = true), 300);
        }
        else {
            this.active = false;
        }
    }
    /** emit the `calciteAlertClose` event - <calcite-alerts> listens for this */
    async closeCalciteAlert() {
        this.calciteAlertClose.emit({ requestedAlert: this.alertId });
    }
    /**  emit the `calciteAlertOpen` event - <calcite-alerts> listens for this  */
    async openCalciteAlert() {
        this.calciteAlertOpen.emit({ requestedAlert: this.alertId });
    }
    connectedCallback() {
        // prop validations
        let colors = ["blue", "red", "green", "yellow"];
        if (!colors.includes(this.color))
            this.color = "blue";
        let durations = ["slow", "medium", "fast"];
        if (this.duration !== null && !durations.includes(this.duration))
            this.duration = "medium";
        let themes = ["dark", "light"];
        if (!themes.includes(this.theme))
            this.theme = "light";
    }
    setIcon() {
        var path = this.iconDefaults[this.color];
        return (h("div", { class: "alert-icon" }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 24 24" }, h("path", { d: path }))));
    }
    render() {
        const dir = getElementDir(this.el);
        const closeButton = (h("button", { class: "alert-close", "aria-label": "close", onClick: () => this.closeCalciteAlert() }, h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "32", width: "32", viewBox: "0 0 32 32" }, h("path", { d: x32 }))));
        const close = !this.dismiss ? closeButton : "";
        const icon = this.icon ? this.setIcon() : "";
        const count = (h("div", { class: `${this.queueLength > 0 ? "active " : ""}alert-count` }, "+", this.queueLength > 0 ? this.queueLength : 1));
        const progress = this.active && this.dismiss ? h("div", { class: "alert-dismiss" }) : "";
        return (h(Host, { active: !!this.active, dir: dir }, icon, h("div", { class: "alert-content" }, h("slot", { name: "alert-title" }), h("slot", { name: "alert-message" }), h("slot", { name: "alert-link" })), count, close, progress));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "currentAlert": ["watchCurrentAlert"]
    }; }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{--calcite-alert-background:#fff;--calcite-alert-title-text:#404040;--calcite-alert-message-text:#555;--calcite-alert-icon-fill:#151515;--calcite-alert-close-background-hover:#f3f3f3;--calcite-alert-close-background-pressed:#eaeaea;--calcite-alert-count-text:#404040;--calcite-alert-count-border:#f3f3f3;--calcite-alert-dismiss-background:hsla(0,0%,100%,0.6);--calcite-alert-border-blue:#007ac2;--calcite-alert-border-green:#35ac46;--calcite-alert-border-red:#d83020;--calcite-alert-border-yellow:#edd317}:host([theme=dark]){--calcite-alert-background:#2b2b2b;--calcite-alert-title-text:#f8f8f8;--calcite-alert-message-text:#f3f3f3;--calcite-alert-icon-fill:#d4d4d4;--calcite-alert-close-background-hover:#202020;--calcite-alert-close-background-pressed:#151515;--calcite-alert-count-text:#d4d4d4;--calcite-alert-count-border:#202020;--calcite-alert-dismiss-background:rgba(43,43,43,0.6);--calcite-alert-border-blue:#3db8ff;--calcite-alert-border-green:#3bed52;--calcite-alert-border-red:#ff0015;--calcite-alert-border-yellow:#fe3}:host{display:-ms-flexbox;display:flex;position:relative;-ms-flex-pack:center;justify-content:center;pointer-events:none;z-index:102;margin:0 auto;width:50em;max-width:90%;max-height:0;background-color:var(--calcite-alert-background);-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15);border-radius:2px;opacity:0;-webkit-transform:translate3d(0,1.5rem,0);transform:translate3d(0,1.5rem,0);-webkit-transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;-webkit-border-before:0 solid transparent;border-block-start:0 solid transparent}\@media only screen and (max-width:860px){:host{width:100%;max-width:100%;border-radius:2px 2px 0 0;-webkit-box-shadow:0 -8px 16px 0 rgba(0,0,0,.15);box-shadow:0 -8px 16px 0 rgba(0,0,0,.15)}}:host:host(.hydrated){visibility:hidden!important}:host:host([active]){opacity:1;max-height:100%;-webkit-transform:translate3d(0,-1.5rem,0);transform:translate3d(0,-1.5rem,0);pointer-events:auto;border-block-start-width:3px}:host:host([active]):host(.hydrated){visibility:visible!important}\@media only screen and (max-width:860px){:host:host([active]){-webkit-transform:translateZ(0);transform:translateZ(0)}}:host slot[name=alert-title]::slotted(div){font-size:1rem;line-height:1.5;color:var(--calcite-alert-title-text);font-weight:500}:host slot[name=alert-link]::slotted(a),:host slot[name=alert-link]::slotted(calcite-button){font-size:.9375rem;line-height:1.5}:host slot[name=alert-message]::slotted(div){display:inline;margin-right:.75rem;font-size:.9375rem;line-height:1.5;color:var(--calcite-alert-message-text)}:host([dir=rtl]) slot[name=alert-message]::slotted(div){margin-right:unset;margin-left:.75rem}.alert-content{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;-webkit-padding-before:.75rem;padding-block-start:.75rem;-webkit-padding-after:.75rem;padding-block-end:.75rem;-webkit-padding-end:.75rem;padding-inline-end:.75rem;-webkit-padding-start:0;padding-inline-start:0}.alert-content svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-content{padding:1.5rem}}.alert-content:first-of-type{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}\@media only screen and (max-width:860px){.alert-content{-webkit-padding-before:1.5rem;padding-block-start:1.5rem;-webkit-padding-after:1.5rem;padding-block-end:1.5rem;-webkit-padding-end:.75rem;padding-inline-end:.75rem;-webkit-padding-start:0;padding-inline-start:0}}.alert-icon{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.alert-icon svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-icon{padding:1.5rem}}.alert-close{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;border-radius:0 0 2px 0}.alert-close svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-close{padding:1.5rem}}.alert-close svg{fill:var(--calcite-alert-icon-fill)}.alert-close:focus,.alert-close:hover{background-color:var(--calcite-alert-close-background-hover)}.alert-close:active{background-color:var(--calcite-alert-close-background-pressed)}:host([dir=rtl]) .alert-close{border-radius:0 0 0 2px}\@media only screen and (max-width:860px){:host([dir=rtl]) .alert-close{border-radius:0}}.alert-count{font-size:.875rem;line-height:1.5;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:space-evenly;justify-content:space-evenly;overflow:hidden;width:0;visibility:hidden;font-weight:500;text-align:center;color:var(--calcite-alert-count-text);opacity:0;-webkit-border-start:0 solid transparent;border-inline-start:0 solid transparent;-webkit-border-end:0 solid transparent;border-inline-end:0 solid transparent;cursor:default;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.alert-count.active{visibility:visible;opacity:1;padding:0 .375rem;width:3rem;-webkit-border-start:1px solid var(--calcite-alert-count-border);border-inline-start:1px solid var(--calcite-alert-count-border);-webkit-border-end:1px solid var(--calcite-alert-count-border);border-inline-end:1px solid var(--calcite-alert-count-border)}.alert-count.active:last-child{-webkit-border-end:0 solid transparent;border-inline-end:0 solid transparent}\@media only screen and (max-width:860px){.alert-count{border-radius:0}}.alert-dismiss{left:0;top:0;width:100%;z-index:103}.alert-dismiss,.alert-dismiss:after{display:block;position:absolute;right:0;height:3px}.alert-dismiss:after{top:-3px;border-radius:2px 2px 0 0;content:\"\";background-color:var(--calcite-alert-dismiss-background);z-index:104}:host([color=blue]){border-block-start-color:var(--calcite-alert-border-blue)}:host([color=blue]) .alert-icon svg{fill:var(--calcite-alert-border-blue)}:host([color=red]){border-block-start-color:var(--calcite-alert-border-red)}:host([color=red]) .alert-icon svg{fill:var(--calcite-alert-border-red)}:host([color=yellow]){border-block-start-color:var(--calcite-alert-border-yellow)}:host([color=yellow]) .alert-icon svg{fill:var(--calcite-alert-border-yellow)}:host([color=green]){border-block-start-color:var(--calcite-alert-border-green)}:host([color=green]) .alert-icon svg{fill:var(--calcite-alert-border-green)}:host([duration=fast]) .alert-dismiss:after{-webkit-animation:dismissProgress 6s ease-out;animation:dismissProgress 6s ease-out}:host([duration=medium]) .alert-dismiss:after{-webkit-animation:dismissProgress 10s ease-out;animation:dismissProgress 10s ease-out}:host([duration=slow]) .alert-dismiss:after{-webkit-animation:dismissProgress 14s ease-out;animation:dismissProgress 14s ease-out}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}"; }
};
AlertInterface.injectProps(CalciteAlert, ["currentAlert", "queueLength"]);

const CalciteAlerts = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.currentAlert = "";
        this.active = false;
        this.alertQueue = [];
        this.calciteAlertsClose = createEvent(this, "calciteAlertsClose", 7);
        this.calciteAlertsOpen = createEvent(this, "calciteAlertsOpen", 7);
    }
    /** Adds the requested alert to the alert queue, if not present */
    updateQueueOnOpen(event) {
        if (!this.alertQueue.includes(event.detail.requestedAlert)) {
            this.active = true;
            this.currentAlert = event.detail.requestedAlert;
            this.alertQueue.push(event.detail.requestedAlert);
            this.calciteAlertsOpen.emit({
                currentAlert: this.currentAlert,
                alertQueue: this.alertQueue
            });
        }
    }
    /** Closes the requested alert and removes from the queue, or removes from queue if not active */
    updateQueueOnClose(event) {
        if (this.alertQueue.includes(event.detail.requestedAlert))
            this.alertQueue = this.alertQueue.filter(e => e !== event.detail.requestedAlert);
        if (this.alertQueue.length < 1)
            setTimeout(() => {
                this.active = false;
            }, 400);
        this.calciteAlertsClose.emit({
            currentAlert: this.currentAlert,
            alertQueue: this.alertQueue
        });
    }
    componentWillUpdate() {
        this.currentAlert = this.alertQueue.length > 0 ? this.alertQueue[0] : "";
    }
    render() {
        const alertState = {
            currentAlert: this.currentAlert,
            queueLength: this.alertQueue.length >= 2 ? this.alertQueue.length - 1 : 0
        };
        return (h(Host, { active: !!this.active }, h(AlertInterface.Provider, { state: alertState }, h("slot", null))));
    }
    get el() { return getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}.overflow-hidden{overflow:hidden}calcite-tab{display:none}calcite-tab[is-active]{display:block}a{color:#007ac2}:host{display:none;position:fixed;left:0;right:0;bottom:0;pointer-events:none;z-index:101}:host:host([active]){display:block}"; }
};

export { CalciteAlert as calcite_alert, CalciteAlerts as calcite_alerts };
