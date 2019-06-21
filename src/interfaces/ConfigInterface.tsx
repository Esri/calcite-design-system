import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface ConfigInterface {
  globalTheme: string
}

export default createProviderConsumer<ConfigInterface>({
    globalTheme: ''
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
