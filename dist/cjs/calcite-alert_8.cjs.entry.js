'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./calcite-15323450.js');

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
        return () => {
            if (listeners.has(instance)) {
                listeners.delete(instance);
            }
        };
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
        const cstrConnectedCallback = CstrPrototype.connectedCallback;
        const cstrDisconnectedCallback = CstrPrototype.disconnectedCallback;
        CstrPrototype.connectedCallback = function () {
            subscribe(this, fieldList);
            if (cstrConnectedCallback) {
                return cstrConnectedCallback.call(this);
            }
        };
        CstrPrototype.disconnectedCallback = function () {
            listeners.delete(this);
            if (cstrDisconnectedCallback) {
                cstrDisconnectedCallback.call(this);
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
    currentAlert: '',
    queueLength: 0
}, (subscribe, child) => (__chunk_1.h("context-consumer", { subscribe: subscribe, renderer: child })));

class CalciteAlert {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.currentAlert = '';
        this.dismiss = false;
        this.icon = false;
        this.id = '1';
        this.queueLength = 0;
        this.color = 'blue';
        this.theme = null;
        this.duration = this.dismiss ? 'medium' : null;
        this.isActive = this.id === this.currentAlert;
        this.alertClose = __chunk_1.createEvent(this, "alertClose", 7);
        this.alertOpen = __chunk_1.createEvent(this, "alertOpen", 7);
    }
    async close() {
        if (this.isActive) {
            this.isActive = false;
            this.alertClose.emit(this.id);
        }
    }
    componentWillUpdate() {
        this.isActive = this.currentAlert === this.id;
        if (this.isActive)
            this.alertOpen.emit(this.id);
        if (this.isActive && this.dismiss)
            setTimeout(() => { this.close(); }, this.duration === 'fast' ? 6000 : this.duration === 'slow' ? 14000 : 10000);
    }
    setIcon() {
        var path = this.color === 'green' ? checkCircle24F : (this.color === 'red' || this.color === 'yellow') ? exclamationMarkTriangle24F : lightbulb24F;
        return (__chunk_1.h("div", { class: "alert-icon" }, __chunk_1.h("svg", { xmlns: 'http://www.w3.org/2000/svg', height: '24', width: '24', viewBox: '0 0 24 24' }, __chunk_1.h("path", { d: path }))));
    }
    render() {
        const closeButton = (__chunk_1.h("button", { class: "alert-close", "aria-label": "close", onClick: () => this.close() }, __chunk_1.h("svg", { xmlns: 'http://www.w3.org/2000/svg', height: '32', width: '32', viewBox: '0 0 32 32' }, __chunk_1.h("path", { d: x32 }))));
        const close = !this.dismiss ? closeButton : '';
        const icon = this.icon ? this.setIcon() : '';
        const count = __chunk_1.h("div", { class: `${this.queueLength > 0 ? 'is-active ' : ''}alert-count` }, "+", this.queueLength > 0 ? this.queueLength : 1);
        const progress = this.isActive && this.dismiss ? __chunk_1.h("div", { class: "alert-dismiss" }) : '';
        return (__chunk_1.h(__chunk_1.Host, { theme: this.theme, "is-active": !!this.isActive, duration: this.duration }, icon, __chunk_1.h("div", { class: "alert-content" }, __chunk_1.h("slot", { name: "alert-title" }), __chunk_1.h("slot", { name: "alert-message" }), __chunk_1.h("slot", { name: "alert-link" })), count, close, progress));
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}:host{position:relative;-ms-flex-pack:center;justify-content:center;right:0;left:0;margin-right:auto;margin-left:auto;z-index:100;width:50em;max-width:90%;border-radius:2px;background-color:#fff;-webkit-box-shadow:0 0 12px 0 rgba(0,0,0,.15);box-shadow:0 0 12px 0 rgba(0,0,0,.15);height:0;opacity:0;overflow:visible;display:-ms-flexbox;display:flex;border-top:3px solid;-webkit-transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;transition:visibility 0ms linear .3s,opacity .3s cubic-bezier(.215,.44,.42,.88),all .15s ease-in-out;-webkit-transform:translate3d(0,1.5rem,0);transform:translate3d(0,1.5rem,0);pointer-events:none;border-width:0}\@media only screen and (max-width:600px){:host{max-width:100%;border-radius:2px 2px 0 0;-webkit-box-shadow:0 -6px 12px 0 rgba(0,0,0,.15);box-shadow:0 -6px 12px 0 rgba(0,0,0,.15)}}:host([is-active]){visibility:visible;border-width:3px;opacity:1;height:100%;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transform:translateZ(0);transform:translateZ(0);pointer-events:auto}:host slot[name=alert-title]::slotted(div){display:block;font-weight:500;font-size:16px}:host slot[name=alert-link]::slotted(a){display:inline-block;font-size:15px;color:#007ac2}:host slot[name=alert-message]::slotted(div){font-size:15px;color:#555;display:inline;-webkit-margin-end:.75rem;margin-inline-end:.75rem}:host([theme=dark]){background-color:#2b2b2b}:host([theme=dark]) slot[name=alert-title]::slotted(div){color:#f8f8f8}:host([theme=dark]) slot[name=alert-message]::slotted(div){color:#f3f3f3}.alert-content{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;word-wrap:break-word;-webkit-padding-before:.75rem;padding-block-start:.75rem;-webkit-padding-after:.75rem;padding-block-end:.75rem;-webkit-padding-end:.75rem;padding-inline-end:.75rem;-webkit-padding-start:0;padding-inline-start:0}\@media only screen and (max-width:600px){.alert-content{padding:1.5rem}}.alert-content svg{position:relative;vertical-align:top;height:16px;width:16px}.alert-content:first-of-type{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}\@media only screen and (max-width:600px){.alert-content{-webkit-padding-before:1.5rem;padding-block-start:1.5rem;-webkit-padding-after:1.5rem;padding-block-end:1.5rem;-webkit-padding-end:.75rem;padding-inline-end:.75rem;-webkit-padding-start:0;padding-inline-start:0}}.alert-icon{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}\@media only screen and (max-width:600px){.alert-icon{padding:1.5rem}}.alert-icon svg{position:relative;vertical-align:top;height:16px;width:16px}.alert-close{padding:.75rem 1.5rem;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-transition-delay:.3s;transition-delay:.3s;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-webkit-appearance:none;background-color:transparent;border:none;outline:none;cursor:pointer;border-radius:0 0 2px 0}\@media only screen and (max-width:600px){.alert-close{padding:1.5rem}}.alert-close svg{position:relative;vertical-align:top;height:16px;width:16px;fill:#151515}.alert-close:focus,.alert-close:hover{background-color:#f3f3f3}.alert-close:active{background-color:#eaeaea}.alert-close:last-child{border-radius:0 0 2px 0}:host([dir=rtl]) .alert-close:last-child{border-radius:0 0 0 2px}\@media only screen and (max-width:600px){.alert-close{border-radius:0}}:host([theme=dark]) .alert-close svg{fill:#d4d4d4}:host([theme=dark]) .alert-close:focus,:host([theme=dark]) .alert-close:hover{background-color:#202020}:host([theme=dark]) .alert-close:active{background-color:#151515}.alert-count{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:space-evenly;justify-content:space-evenly;-webkit-transition:all .15s ease-in;transition:all .15s ease-in;width:0;font-size:14px;visibility:hidden;padding:0;font-weight:500;text-align:center;background-color:transparent;color:#757575;opacity:0;border-left:1px solid transparent;border-right:1px solid transparent;cursor:default}.alert-count.is-active{visibility:visible;-webkit-transition-delay:.3s;transition-delay:.3s;opacity:1;padding:0 .375rem;width:3rem;border-left:1px solid #f3f3f3;border-right:1px solid #f3f3f3}.alert-count.is-active:last-child{border-right-color:transparent}\@media only screen and (max-width:600px){.alert-count{border-radius:0}}:host([theme=dark]) .alert-count{color:#d4d4d4}:host([theme=dark]) .alert-count.is-active{border-left:1px solid #202020;border-right:1px solid #202020}.alert-dismiss{left:0;top:0;z-index:101}.alert-dismiss,.alert-dismiss:after{display:block;position:absolute;right:0;height:3px}.alert-dismiss:after{top:-3px;border-radius:2px 2px 0 0;content:\"\";width:50%;background-color:hsla(0,0%,100%,.6);-webkit-animation:dismissProgress 10s linear;animation:dismissProgress 10s linear;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;z-index:200}:host([theme=dark]) .alert-dismiss:after{background-color:rgba(43,43,43,.6)}:host([duration=fast]) .alert-dismiss:after{-webkit-animation:dismissProgress 6s linear;animation:dismissProgress 6s linear}:host([duration=medium]) .alert-dismiss:after{-webkit-animation:dismissProgress 10s linear;animation:dismissProgress 10s linear}:host([duration=slow]) .alert-dismiss:after{-webkit-animation:dismissProgress 14s linear;animation:dismissProgress 14s linear}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}:host([color=blue]){border-top-color:#007ac2}:host([color=blue]) .alert-icon svg{fill:#007ac2}:host([color=red]){border-top-color:#d83020}:host([color=red]) .alert-icon svg{fill:#d83020}:host([color=yellow]){border-top-color:#edd317}:host([color=yellow]) .alert-icon svg{fill:#edd317}:host([color=green]){border-top-color:#35ac46}:host([color=green]) .alert-icon svg{fill:#35ac46}"; }
}
AlertInterface.injectProps(CalciteAlert, ['currentAlert', 'queueLength']);

class CalciteAlerts {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.id = '1';
        this.currentAlert = '';
        this.isActive = false;
        this.queue = [];
        this.alertsClose = __chunk_1.createEvent(this, "alertsClose", 7);
        this.alertsOpen = __chunk_1.createEvent(this, "alertsOpen", 7);
    }
    async open(requestedAlert) {
        if (!this.queue.includes(requestedAlert)) {
            this.isActive = true;
            this.currentAlert = requestedAlert;
            this.queue.push(requestedAlert);
            this.alertsOpen.emit({ id: this.id, currentAlert: this.currentAlert, queue: this.queue });
        }
    }
    updateQueue(event) {
        if (this.queue.includes(event.detail))
            this.queue = this.queue.filter(e => e !== event.detail);
        if (this.queue.length < 1)
            setTimeout(() => { this.isActive = false; }, 300);
        this.alertsClose.emit({ id: this.id, currentAlert: this.currentAlert, queue: this.queue });
    }
    componentWillUpdate() {
        this.currentAlert = this.queue.length > 0 ? this.queue[0] : '';
    }
    render() {
        const alertState = {
            currentAlert: this.currentAlert,
            queueLength: this.queue.length >= 2 ? this.queue.length - 1 : 0
        };
        return (__chunk_1.h(__chunk_1.Host, { "is-active": !!this.isActive }, __chunk_1.h(AlertInterface.Provider, { state: alertState }, __chunk_1.h("slot", null))));
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}:host{position:fixed;visibility:hidden;opacity:0;left:0;right:0;bottom:1.5rem;height:0;z-index:101;pointer-events:none;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;-webkit-transition-delay:.3s;transition-delay:.3s}\@media only screen and (max-width:600px){:host{bottom:0}}:host([is-active]){height:auto;visibility:visible;opacity:1}"; }
}

class CalciteLoader {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.isActive = false;
        this.text = "Loading...";
    }
    render() {
        return (__chunk_1.h(__chunk_1.Host, { "is-active": !!this.isActive }, __chunk_1.h("div", { class: "loader-bars" }), __chunk_1.h("div", { class: "loader-text" }, this.text)));
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}:host .loader-bars,:host .loader-bars:after,:host .loader-bars:before{background:#007ac2;-webkit-animation:load .8s ease-in-out infinite;animation:load .8s ease-in-out infinite;width:.85rem;height:2rem}:host .loader-bars:after,:host .loader-bars:before{position:absolute;top:0;content:\"\"}:host{position:relative;display:none;padding-bottom:4.5rem;padding-top:4.5rem}:host([is-active]){display:block}:host .loader-bars{text-indent:-9999em;margin:auto;position:absolute;right:calc(50% - .425rem);font-size:11px;-webkit-animation-delay:.16s;animation-delay:.16s}:host .loader-bars:before{left:-1.25rem}:host .loader-bars:after{left:1.25rem;-webkit-animation-delay:.32s;animation-delay:.32s}:host .loader-text{padding-top:4rem;text-align:center}\@-webkit-keyframes load{0%,80%,to{opacity:.75;-webkit-box-shadow:0 0 #007ac2;box-shadow:0 0 #007ac2;height:2rem}40%{opacity:1;-webkit-box-shadow:0 -.5rem #007ac2;box-shadow:0 -.5rem #007ac2;height:2.5rem}}\@keyframes load{0%,80%,to{opacity:.75;-webkit-box-shadow:0 0 #007ac2;box-shadow:0 0 #007ac2;height:2rem}40%{opacity:1;-webkit-box-shadow:0 -.5rem #007ac2;box-shadow:0 -.5rem #007ac2;height:2.5rem}}"; }
}

function format(first, middle, last) {
    return ((first || "") + (middle ? ` ${middle}` : "") + (last ? ` ${last}` : ""));
}

class CalciteModal {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
    }
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return __chunk_1.h("div", { class: "example-class" }, "Hello, World! I'm ", this.getText());
    }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}.example-class{padding:1.5rem;color:#d83020;-webkit-box-shadow:0 0 16px 0 rgba(0,0,0,.05);box-shadow:0 0 16px 0 rgba(0,0,0,.05);border:1px solid #007ac2}"; }
}

// from https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues#Examples
function random() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / 1e10;
}
function gen(count) {
    var out = "";
    for (var i = 0; i < count; i++) {
        out += (((1 + random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return out;
}
function guid() {
    return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
}

class CalciteTab {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.id = `calite-tab-${guid()}`;
        this.isActive = false;
        this.calciteRegisterTab = __chunk_1.createEvent(this, "calciteRegisterTab", 7);
    }
    tabChangeHandler(event) {
        if (this.tab) {
            this.isActive = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then(index => {
                this.isActive = index === event.detail.tab;
            });
        }
    }
    componentDidLoad() {
        this.getTabIndex().then(index => {
            this.calciteRegisterTab.emit({
                id: this.id,
                index
            });
        });
    }
    async getTabIndex() {
        return Promise.resolve(Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-tab"), this.el));
    }
    async registerLabeledBy(id) {
        this.labeledBy = id;
    }
    render() {
        return (__chunk_1.h(__chunk_1.Host, { "aria-labeledby": this.labeledBy, "aria-expanded": this.isActive ? "true" : "false", role: "tabpanel" }, __chunk_1.h("section", null, __chunk_1.h("slot", null))));
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}:host([is-active]) section{display:block}section{display:none}"; }
}

class CalciteTabNav {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.id = `calite-tab-nav-${guid()}`;
        this.selectedTab = 0;
        this.calciteTabChange = __chunk_1.createEvent(this, "calciteTabChange", 7);
    }
    selectedTabChanged() {
        this.calciteTabChange.emit({
            tab: this.selectedTab
        });
    }
    focusPreviousTabHandler(e) {
        const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
        const currentIndex = this.getIndexOfTabTitle(e.target);
        const previousTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
        previousTab.focus();
    }
    focusNextTabHandler(e) {
        const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
        const currentIndex = this.getIndexOfTabTitle(e.target);
        const nextTab = tabs[currentIndex + 1] || tabs[0];
        nextTab.focus();
    }
    tabTitleRegistationHandler(e) {
        e.target.setControledBy(this.id);
    }
    activateTabHandler(e) {
        if (e.detail.tab) {
            this.selectedTab = e.detail.tab;
        }
        else {
            this.selectedTab = this.getIndexOfTabTitle(e.target);
        }
    }
    getIndexOfTabTitle(el) {
        const tabs = this.el.parentElement.querySelectorAll("calcite-tab-title");
        return [...tabs].indexOf(el);
    }
    componentWillLoad() {
        this.selectedTabChanged();
    }
    render() {
        return (__chunk_1.h(__chunk_1.Host, { role: "tablist" }, __chunk_1.h("nav", { class: "tab-nav" }, __chunk_1.h("slot", null))));
    }
    get el() { return __chunk_1.getElement(this); }
    static get watchers() { return {
        "selectedTab": ["selectedTabChanged"]
    }; }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}.tab-nav{display:-ms-flexbox;display:flex;padding:.5rem 0}::slotted(calcite-tab-title){margin-right:1.25rem}:host([dir=rtl]) ::slotted(calcite-tab-title){margin-right:0;margin-left:1.25rem}"; }
}

const ENTER = 13;
const SPACE = 32;
const LEFT = 37;
const RIGHT = 39;

class CalciteTabTitle {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.id = `calite-tab-title-${guid()}`;
        this.isActive = false;
        this.calciteActivateTab = __chunk_1.createEvent(this, "calciteActivateTab", 7);
        this.calciteFocusNextTab = __chunk_1.createEvent(this, "calciteFocusNextTab", 7);
        this.calciteFocusPreviousTab = __chunk_1.createEvent(this, "calciteFocusPreviousTab", 7);
        this.calciteRegisterTabTitle = __chunk_1.createEvent(this, "calciteRegisterTabTitle", 7);
    }
    tabChangeHand(event) {
        if (this.tab) {
            this.isActive = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then(index => {
                this.isActive = index === event.detail.tab;
            });
        }
    }
    onClick() {
        this.calciteActivateTab.emit({
            tab: this.tab
        });
    }
    keyDownHandler(e) {
        switch (e.keyCode) {
            case SPACE:
            case ENTER:
                this.onClick();
                break;
            case RIGHT:
                this.calciteFocusNextTab.emit();
                break;
            case LEFT:
                this.calciteFocusPreviousTab.emit();
                break;
        }
    }
    componentDidLoad() {
        this.getTabIndex().then(index => {
            this.calciteRegisterTabTitle.emit({
                id: this.id,
                index
            });
        });
    }
    async getTabIndex() {
        return Promise.resolve(Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-tab-title"), this.el));
    }
    async setControledBy(id) {
        this.controls = id;
    }
    render() {
        return (__chunk_1.h(__chunk_1.Host, { "aria-controls": this.controls, "aria-expanded": this.isActive ? "true" : "false", role: "tab", tabindex: "0" }, __chunk_1.h("a", null, __chunk_1.h("slot", null))));
    }
    get el() { return __chunk_1.getElement(this); }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}:host{-ms-flex:0 1 auto;flex:0 1 auto;outline:none}:host(:active) a,:host(:focus) a,:host(:hover) a{outline:none;text-decoration:none;color:var(--calcite-tabs-color-active);border-bottom-color:var(--calcite-tabs-border-hover)}:host([is-active]) a{color:var(--calcite-tabs-color-active);border-bottom-color:var(--calcite-tabs-border-active)}a{-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.875rem;line-height:1.5;padding:.5rem 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:3px solid transparent;cursor:pointer;-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;color:var(--calcite-tabs-color);outline:none}"; }
}

class CalciteTabs {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
        this.tabs = {};
        this.tabTitles = {};
        this.theme = "light";
    }
    tabTitleRegistationHandler(e) {
        const { index, id } = e.detail;
        this.tabTitles[index] = {
            id: id,
            title: e.target
        };
        if (this.tabs[index]) {
            this.tabs[index].tab.registerLabeledBy(id);
        }
    }
    tabRegistationHandler(e) {
        const { index, id } = e.detail;
        this.tabs[index] = {
            id: id,
            tab: e.target
        };
        if (this.tabTitles[index]) {
            this.tabs[index].tab.registerLabeledBy(this.tabTitles[index].id);
        }
    }
    render() {
        return (__chunk_1.h("div", null, __chunk_1.h("slot", { name: "tab-nav" }), __chunk_1.h("section", { class: "tab-contents" }, __chunk_1.h("slot", null))));
    }
    static get style() { return "body{font-family:Avenir Next W01,Avenir Next W00,Avenir Next,Avenir,Helvetica Neue,sans-serif}\@-webkit-keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}\@keyframes dismissProgress{0%{width:0;opacity:0}to{width:100%;opacity:1}}:host{--calcite-tabs-color:#2b2b2b;--calcite-tabs-border:#eaeaea;--calcite-tabs-border-hover:#dfdfdf;--calcite-tabs-color-active:#151515;--calcite-tabs-border-active:#007ac2}:host([theme=dark]){--calcite-tabs-color:#f3f3f3;--calcite-tabs-border:#404040;--calcite-tabs-border-hover:#757575;--calcite-tabs-color-active:#f8f8f8;--calcite-tabs-border-active:#fff}.tab-contents{margin-top:1px;border-top:1px solid var(--calcite-tabs-border)}"; }
}

exports.calcite_alert = CalciteAlert;
exports.calcite_alerts = CalciteAlerts;
exports.calcite_loader = CalciteLoader;
exports.calcite_modal = CalciteModal;
exports.calcite_tab = CalciteTab;
exports.calcite_tab_nav = CalciteTabNav;
exports.calcite_tab_title = CalciteTabTitle;
exports.calcite_tabs = CalciteTabs;
