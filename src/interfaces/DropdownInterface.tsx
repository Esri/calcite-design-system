import { h } from "@stencil/core";
import { createProviderConsumer } from "@stencil/state-tunnel";

export interface DropdownInterface {
  requestedDropdownGroup: string;
  requestedDropdownItem: string;
}

export default createProviderConsumer<DropdownInterface>(
  {
    requestedDropdownGroup: "",
    requestedDropdownItem: ""
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
