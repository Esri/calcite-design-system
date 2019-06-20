'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./calcite-8834ad67.js');

// File generated automatically by path-data.js, do not edit directly
const checkCircle24F = "M23 11.5A11.5 11.5 0 1 1 11.5 0 11.5 11.5 0 0 1 23 11.5zm-5.5-6.018l-8.5 8.5-3.5-3.5-2 2L9.018 18l.018-.018L11.018 16l8.5-8.5z";
const exclamationMarkTriangle24F = "M22.3 19.795l-9-17.901a1.5 1.5 0 0 0-2.597 0L1.7 19.795a1.502 1.502 0 0 0 0 1.502A1.456 1.456 0 0 0 2.998 22H21a1.458 1.458 0 0 0 1.299-.703 1.506 1.506 0 0 0 .001-1.502zM13 19h-2v-2h2zm0-3h-2V8h2z";
const lightbulb24F = "M11 13h1v4h-1zm3.895 5.45a.311.311 0 0 0-.12-.27l-.232-.18h-6.19l-.232.18a.312.312 0 0 0 .04.518l1.387.771-1.367.76a.311.311 0 0 0-.028.526l3.09 2.18a.356.356 0 0 0 .41 0l3.09-2.18a.311.311 0 0 0-.029-.527l-1.366-.759 1.388-.77a.312.312 0 0 0 .159-.25zM11.59 0l-.173.002L11.244 0a6.2 6.2 0 0 0-6.182 6.698c.31 2.575 2.784 5.207 2.939 6.134.13.78.116 1.844.199 2.472A2.542 2.542 0 0 0 9.088 17H10v-4.412L8.83 9.37l.94-.342L10.85 12h1.3l1.08-2.97.94.341L13 12.588V17h.745a2.542 2.542 0 0 0 .889-1.696c.083-.628.068-1.692.199-2.472.154-.927 2.628-3.559 2.938-6.134A6.2 6.2 0 0 0 11.59 0z";
const x32 = "M16.707 16l10.607 10.606-.708.707L16 16.707 5.394 27.313l-.708-.707L15.293 16 4.686 5.394l.708-.707L16 15.293 26.606 4.687l.708.707z";

const createProviderConsumer = (defaultState, consumerRender) => {
    let listeners = new Map();
    let currentState = defaultState;
    const updateListener = (fields, instance) => {
        if (Array.isArray(fields)) {
            [...fields].forEach(fieldName => {
                instance[fieldName] = currentState[fieldName];
            });
        }
        else {
            instance[fields] = Object.assign({}, currentState);
        }
    };
    const subscribe = (instance, propList) => {
        if (!listeners.has(instance)) {
            listeners.set(instance, propList);
            updateListener(propList, instance);
        }
    };
    const Provider = ({ state }, children) => {
        currentState = state;
        listeners.forEach(updateListener);
        return children;
    };
    const Consumer = (props, children) => {
        // The casting on subscribe is to allow for crossover through the stencil compiler
        // In the future we should allow for generics in components.
        return consumerRender(subscribe, children[0]);
    };
    const injectProps = (Cstr, fieldList) => {
        const CstrPrototype = Cstr.prototype;
        const cstrComponentWillLoad = CstrPrototype.componentWillLoad;
        const cstrComponentDidUnload = CstrPrototype.componentDidUnload;
        CstrPrototype.componentWillLoad = function () {
            subscribe(this, fieldList);
            if (cstrComponentWillLoad) {
                return cstrComponentWillLoad.call(this);
            }
        };
        CstrPrototype.componentDidUnload = function () {
            listeners.delete(this);
            if (cstrComponentDidUnload) {
                cstrComponentDidUnload.call(this);
            }
        };
    };
    return {
        Provider,
        Consumer,
        injectProps
    };
};

const AlertInterface = createProviderConsumer({
    currentAlert: "",
    queueLength: 0
}, (subscribe, child) => (__chunk_1.h("context-consumer", { subscribe: subscribe, renderer: child })));

/** Alerts are not meant to be used inline with content, or be present in view on page load.
 * As such, calcite-alert relies on calcite-alerts for positioning - displaying an alert on its own
 * will lead to unexpected and potentially undesireable results
 */
/**
 * @slot alert-title - Title of the alert (optional)
 * @slot alert-message - Main text of the alert
 * @slot alert-link - Optional action to take from the alert (undo, try again, etc.)
 */
class CalciteAlert {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        /**
         * Is the alert currently active or not
         */
        this.active = false;
        /**
         * Close the alert automatically (recommended for passive, non-blocking alerts)
         */
        this.dismiss = false;
        /**
         * Length before autodismissal (only used with `dismiss`)
         */
        this.duration = this.dismiss
            ? "medium"
            : null;
        /**
         * Color for the alert (will apply to top border and icon)
         */
        this.color = "blue";
        /**
         * Select theme (light or dark)
         */
        this.theme = "light";
        /**
         * If false, no icon will be shown in the alert
         */
        this.icon = false;
        /**
         * Unique ID for this alert
         */
        this.id = "1";
        /**
         * @internal
         */
        this.currentAlert = "";
        /**
         * @internal
         */
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
        this.calciteAlertClose = __chunk_1.createEvent(this, "calciteAlertClose", 7);
        this.calciteAlertOpen = __chunk_1.createEvent(this, "calciteAlertOpen", 7);
    }
    /**
     * watch for changes to currentAlert passed from <calcite-alerts>
     */
    watchCurrentAlert() {
        this.active = this.currentAlert === this.id;
        if (this.active)
            this.openCalciteAlert();
        if (this.active && this.dismiss)
            setTimeout(() => this.closeCalciteAlert(), this.durationDefaults[this.duration]);
    }
    /**
     * emit the `calciteAlerClose` event - <calcite-alerts> listens for this, if the alert is not active, but is the queue, this will remove it from the queue
     */
    async closeCalciteAlert() {
        this.calciteAlertClose.emit(this.id);
    }
    /**
     * emit the `calciteAlertOpen` event - <calcite-alerts> listens for this, and determines if it should open the alert or add it to the queue
     */
    async openCalciteAlert() {
        this.calciteAlertOpen.emit(this.id);
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
        return (__chunk_1.h("div", { class: "alert-icon" }, __chunk_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 0 24 24" }, __chunk_1.h("path", { d: path }))));
    }
    render() {
        const closeButton = (__chunk_1.h("button", { class: "alert-close", "aria-label": "close", onClick: () => this.closeCalciteAlert() }, __chunk_1.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "32", width: "32", viewBox: "0 0 32 32" }, __chunk_1.h("path", { d: x32 }))));
        const close = !this.dismiss ? closeButton : "";
        const icon = this.icon ? this.setIcon() : "";
        const count = (__chunk_1.h("div", { class: `${this.queueLength > 0 ? "active " : ""}alert-count` }, "+", this.queueLength > 0 ? this.queueLength : 1));
        const progress = this.active && this.dismiss ? __chunk_1.h("div", { class: "alert-dismiss" }) : "";
        return (__chunk_1.h(__chunk_1.Host, { theme: this.theme, active: !!this.active, duration: this.duration }, icon, __chunk_1.h("div", { class: "alert-content" }, __chunk_1.h("slot", { name: "alert-title" }), __chunk_1.h("slot", { name: "alert-message" }), __chunk_1.h("slot", { name: "alert-link" })), count, close, progress));
    }
    get el() { return __chunk_1.getElement(this); }
    static get watchers() { return {
        "currentAlert": ["watchCurrentAlert"]
    }; }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}calcite-tabs{display:block}:host{display:-ms-flexbox;display:flex;position:relative;-ms-flex-pack:center;justify-content:center;pointer-events:none;z-index:102;margin:0 auto;width:50em;max-width:90%;max-height:0;background-color:#fff;-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.15);box-shadow:0 0 16px 0 rgba(0,0,0,.15);border-radius:2px;opacity:0;-webkit-transform:translate3d(0,1.5rem,0);transform:translate3d(0,1.5rem,0);-webkit-transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:.3s cubic-bezier(.215,.44,.42,.88),opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;-webkit-border-before:0 solid transparent;border-block-start:0 solid transparent}\@media only screen and (max-width:860px){:host{max-width:100%;border-radius:2px 2px 0 0;-webkit-box-shadow:0 -8px 16px 0 rgba(0,0,0,.15);box-shadow:0 -8px 16px 0 rgba(0,0,0,.15)}}:host:host([active]){visibility:visible;opacity:1;max-height:100%;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transform:translate3d(0,-1.5rem,0);transform:translate3d(0,-1.5rem,0);pointer-events:auto;border-block-start-width:3px}\@media only screen and (max-width:860px){:host:host([active]){-webkit-transform:translateZ(0);transform:translateZ(0)}}:host slot[name=alert-title]::slotted(div){font-size:1rem;line-height:1.5;font-weight:500}:host slot[name=alert-link]::slotted(a){font-size:.9375rem;line-height:1.5;color:#007ac2;margin-left:.75rem}:host slot[name=alert-message]::slotted(div){font-size:.9375rem;line-height:1.5;color:#555;display:inline}.alert-content{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;-webkit-padding-before:.75rem;padding-block-start:.75rem;-webkit-padding-after:.75rem;padding-block-end:.75rem;-webkit-padding-end:.75rem;padding-inline-end:.75rem;-webkit-padding-start:0;padding-inline-start:0}.alert-content svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-content{padding:1.5rem}}.alert-content:first-of-type{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}\@media only screen and (max-width:860px){.alert-content{-webkit-padding-before:1.5rem;padding-block-start:1.5rem;-webkit-padding-after:1.5rem;padding-block-end:1.5rem;-webkit-padding-end:.75rem;padding-inline-end:.75rem;-webkit-padding-start:0;padding-inline-start:0}}.alert-icon{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.alert-icon svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-icon{padding:1.5rem}}.alert-close{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;background-color:transparent;-webkit-appearance:none;border:none;outline:none;cursor:pointer;border-radius:0 0 2px 0}.alert-close svg{height:16px;width:16px;vertical-align:top}\@media only screen and (max-width:860px){.alert-close{padding:1.5rem}}.alert-close svg{fill:#151515}.alert-close:focus,.alert-close:hover{background-color:#f3f3f3}.alert-close:active{background-color:#eaeaea}.alert-close:last-child{border-radius:0 0 2px 0}\@media only screen and (max-width:860px){.alert-close{border-radius:0}}.alert-count{font-size:.875rem;line-height:1.5;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:space-evenly;justify-content:space-evenly;overflow:hidden;width:0;visibility:hidden;font-weight:500;text-align:center;color:#404040;opacity:0;-webkit-border-start:0 solid transparent;border-inline-start:0 solid transparent;-webkit-border-end:0 solid transparent;border-inline-end:0 solid transparent;cursor:default;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out}.alert-count.active{visibility:visible;-webkit-transition-delay:.3s;transition-delay:.3s;opacity:1;padding:0 .375rem;width:3rem;-webkit-border-start:1px solid #f3f3f3;border-inline-start:1px solid #f3f3f3;-webkit-border-end:1px solid #f3f3f3;border-inline-end:1px solid #f3f3f3}.alert-count.active:last-child{-webkit-border-end:0 solid transparent;border-inline-end:0 solid transparent}\@media only screen and (max-width:860px){.alert-count{border-radius:0}}.alert-dismiss{left:0;top:0;width:100%;z-index:103}.alert-dismiss,.alert-dismiss:after{display:block;position:absolute;right:0;height:3px}.alert-dismiss:after{top:-3px;border-radius:2px 2px 0 0;content:\"\";background-color:hsla(0,0%,100%,.6);-webkit-transition:all .3s linear;transition:all .3s linear;z-index:104}:host([theme=dark]){background-color:#2b2b2b}:host([theme=dark]) slot[name=alert-title]::slotted(div){color:#f8f8f8}:host([theme=dark]) slot[name=alert-message]::slotted(div){color:#f3f3f3}:host([theme=dark]) .alert-close svg{fill:#d4d4d4}:host([theme=dark]) .alert-close:focus,:host([theme=dark]) .alert-close:hover{background-color:#202020}:host([theme=dark]) .alert-close:active{background-color:#151515}:host([theme=dark]) .alert-count{color:#d4d4d4}:host([theme=dark]) .alert-count.active{border-left:1px solid #202020;border-right:1px solid #202020}:host([theme=dark]) .alert-dismiss:after{background-color:rgba(43,43,43,.6)}:host([dir=rtl]) .alert-close:last-child{border-radius:0 0 0 2px}:host([dir=rtl]) slot[name=alert-link]::slotted(a){margin-left:unset;margin-right:.75rem}:host([color=blue]){border-block-start-color:#007ac2}:host([color=blue]) .alert-icon svg{fill:#007ac2}:host([color=red]){border-block-start-color:#d83020}:host([color=red]) .alert-icon svg{fill:#d83020}:host([color=yellow]){border-block-start-color:#edd317}:host([color=yellow]) .alert-icon svg{fill:#edd317}:host([color=green]){border-block-start-color:#35ac46}:host([color=green]) .alert-icon svg{fill:#35ac46}:host([duration=fast]) .alert-dismiss:after{-webkit-animation:dismissProgress 6s linear;animation:dismissProgress 6s linear}:host([duration=medium]) .alert-dismiss:after{-webkit-animation:dismissProgress 10s linear;animation:dismissProgress 10s linear}:host([duration=slow]) .alert-dismiss:after{-webkit-animation:dismissProgress 14s linear;animation:dismissProgress 14s linear}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}"; }
}
AlertInterface.injectProps(CalciteAlert, ["currentAlert", "queueLength"]);

class CalciteAlerts {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        /**
         * Unique ID for this instance of calcite-alerts
         */
        this.id = "1";
        this.currentAlert = "";
        this.active = false;
        this.alertQueue = [];
        this.calciteAlertsClose = __chunk_1.createEvent(this, "calciteAlertsClose", 7);
        this.calciteAlertsOpen = __chunk_1.createEvent(this, "calciteAlertsOpen", 7);
    }
    /**
     * Adds the requested alert to the alert queue, if not present
     */
    updateQueueOnOpen(event) {
        let requestedAlert = event.target.id;
        if (!this.alertQueue.includes(requestedAlert)) {
            this.active = true;
            this.currentAlert = requestedAlert;
            this.alertQueue.push(requestedAlert);
            this.calciteAlertsOpen.emit({
                id: this.id,
                currentAlert: this.currentAlert,
                alertQueue: this.alertQueue
            });
        }
    }
    /**
     * Closes the requested alert and removes from the queue
     */
    updateQueueOnClose(event) {
        let requestedAlert = event.target.id;
        if (this.alertQueue.includes(requestedAlert))
            this.alertQueue = this.alertQueue.filter(e => e !== requestedAlert);
        if (this.alertQueue.length < 1)
            setTimeout(() => {
                this.active = false;
            }, 300);
        this.calciteAlertsClose.emit({
            id: this.id,
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
        return (__chunk_1.h(__chunk_1.Host, { active: !!this.active }, __chunk_1.h(AlertInterface.Provider, { state: alertState }, __chunk_1.h("slot", null))));
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}calcite-tabs{display:block}:host{display:none;position:fixed;left:0;right:0;bottom:0;pointer-events:none;z-index:101}:host:host([active]){display:block}"; }
}

exports.calcite_alert = CalciteAlert;
exports.calcite_alerts = CalciteAlerts;
