'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-01bf3bd6.js');

const ContextConsumer = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.context = {};
        this.renderer = () => null;
    }
    connectedCallback() {
        if (this.subscribe != null) {
            this.unsubscribe = this.subscribe(this.el, 'context');
        }
    }
    disconnectedCallback() {
        if (this.unsubscribe != null) {
            this.unsubscribe();
        }
    }
    render() {
        return this.renderer(Object.assign({}, this.context));
    }
    get el() { return core.getElement(this); }
};

exports.context_consumer = ContextConsumer;
