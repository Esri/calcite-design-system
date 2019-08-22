import { h } from "@stencil/core";
import { createProviderConsumer } from "@stencil/state-tunnel";
export default createProviderConsumer({
    currentAlert: "",
    queueLength: 0
}, (subscribe, child) => (h("context-consumer", { subscribe: subscribe, renderer: child })));
