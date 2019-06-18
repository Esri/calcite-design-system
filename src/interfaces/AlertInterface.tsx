import { h } from "@stencil/core";
import { createProviderConsumer } from "@stencil/state-tunnel";

export interface AlertInterface {
  currentAlert: string;
  queueLength: number;
}

export default createProviderConsumer<AlertInterface>(
  {
    currentAlert: "",
    queueLength: 0
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
