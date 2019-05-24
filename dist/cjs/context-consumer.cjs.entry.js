'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const __chunk_1 = require('./calcite-15323450.js');

class ContextConsumer {
    constructor(hostRef) {
        __chunk_1.registerInstance(this, hostRef);
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
    get el() { return __chunk_1.getElement(this); }
}

exports.context_consumer = ContextConsumer;
