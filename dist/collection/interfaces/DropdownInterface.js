import { h } from "@stencil/core";
import { createProviderConsumer } from "@stencil/state-tunnel";
export default createProviderConsumer({
    requestedDropdownGroup: "",
    requestedDropdownItem: ""
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));
