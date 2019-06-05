/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  TabRegisterEventDetail,
} from './interfaces/TabRegister';
import {
  TabChangeEventDetail,
} from './interfaces/TabChange';


export namespace Components {
  interface CalciteAlert {
    'close': () => Promise<void>;
    'color': string;
    'currentAlert': string;
    'dismiss': boolean;
    'duration': string;
    'icon': boolean;
    'id': string;
    'queueLength': number;
    'theme': string;
  }
  interface CalciteAlerts {
    'id': string;
    'open': (requestedAlert: any) => Promise<void>;
  }
  interface CalciteExample {
    'close': () => Promise<void>;
    'property': string;
  }
  interface CalciteLoader {
    'isActive': boolean;
    'text': string;
  }
  interface CalciteProgress {
    'reversed': boolean;
    'text': string;
    'type': "indeterminate" | "determinate";
    'value': number;
  }
  interface CalciteSwitch {
    'color': "red" | "blue";
    'name': string;
    'switched': boolean;
    'value': string;
  }
  interface CalciteTab {
    'getTabIndex': () => Promise<any>;
    'id': string;
    'isActive': boolean;
    'registerLabeledBy': (id: any) => Promise<void>;
    'tab': string;
  }
  interface CalciteTabNav {
    'id': string;
    'selectedTab': number | string;
    'storageId': string;
    'syncId': string;
  }
  interface CalciteTabTitle {
    'getTabIndex': () => Promise<any>;
    'id': string;
    'isActive': boolean;
    'setControlledBy': (id: string) => Promise<void>;
    'tab': string;
  }
  interface CalciteTabs {
    'layout': "center" | "inline";
    'theme': "light" | "dark";
  }
}

declare global {


  interface HTMLCalciteAlertElement extends Components.CalciteAlert, HTMLStencilElement {}
  var HTMLCalciteAlertElement: {
    prototype: HTMLCalciteAlertElement;
    new (): HTMLCalciteAlertElement;
  };

  interface HTMLCalciteAlertsElement extends Components.CalciteAlerts, HTMLStencilElement {}
  var HTMLCalciteAlertsElement: {
    prototype: HTMLCalciteAlertsElement;
    new (): HTMLCalciteAlertsElement;
  };

  interface HTMLCalciteExampleElement extends Components.CalciteExample, HTMLStencilElement {}
  var HTMLCalciteExampleElement: {
    prototype: HTMLCalciteExampleElement;
    new (): HTMLCalciteExampleElement;
  };

  interface HTMLCalciteLoaderElement extends Components.CalciteLoader, HTMLStencilElement {}
  var HTMLCalciteLoaderElement: {
    prototype: HTMLCalciteLoaderElement;
    new (): HTMLCalciteLoaderElement;
  };

  interface HTMLCalciteProgressElement extends Components.CalciteProgress, HTMLStencilElement {}
  var HTMLCalciteProgressElement: {
    prototype: HTMLCalciteProgressElement;
    new (): HTMLCalciteProgressElement;
  };

  interface HTMLCalciteSwitchElement extends Components.CalciteSwitch, HTMLStencilElement {}
  var HTMLCalciteSwitchElement: {
    prototype: HTMLCalciteSwitchElement;
    new (): HTMLCalciteSwitchElement;
  };

  interface HTMLCalciteTabElement extends Components.CalciteTab, HTMLStencilElement {}
  var HTMLCalciteTabElement: {
    prototype: HTMLCalciteTabElement;
    new (): HTMLCalciteTabElement;
  };

  interface HTMLCalciteTabNavElement extends Components.CalciteTabNav, HTMLStencilElement {}
  var HTMLCalciteTabNavElement: {
    prototype: HTMLCalciteTabNavElement;
    new (): HTMLCalciteTabNavElement;
  };

  interface HTMLCalciteTabTitleElement extends Components.CalciteTabTitle, HTMLStencilElement {}
  var HTMLCalciteTabTitleElement: {
    prototype: HTMLCalciteTabTitleElement;
    new (): HTMLCalciteTabTitleElement;
  };

  interface HTMLCalciteTabsElement extends Components.CalciteTabs, HTMLStencilElement {}
  var HTMLCalciteTabsElement: {
    prototype: HTMLCalciteTabsElement;
    new (): HTMLCalciteTabsElement;
  };
  interface HTMLElementTagNameMap {
    'calcite-alert': HTMLCalciteAlertElement;
    'calcite-alerts': HTMLCalciteAlertsElement;
    'calcite-example': HTMLCalciteExampleElement;
    'calcite-loader': HTMLCalciteLoaderElement;
    'calcite-progress': HTMLCalciteProgressElement;
    'calcite-switch': HTMLCalciteSwitchElement;
    'calcite-tab': HTMLCalciteTabElement;
    'calcite-tab-nav': HTMLCalciteTabNavElement;
    'calcite-tab-title': HTMLCalciteTabTitleElement;
    'calcite-tabs': HTMLCalciteTabsElement;
  }
}

declare namespace LocalJSX {
  interface CalciteAlert extends JSXBase.HTMLAttributes<HTMLCalciteAlertElement> {
    'color'?: string;
    'currentAlert'?: string;
    'dismiss'?: boolean;
    'duration'?: string;
    'icon'?: boolean;
    'id'?: string;
    'onAlertClose'?: (event: CustomEvent<any>) => void;
    'onAlertOpen'?: (event: CustomEvent<any>) => void;
    'queueLength'?: number;
    'theme'?: string;
  }
  interface CalciteAlerts extends JSXBase.HTMLAttributes<HTMLCalciteAlertsElement> {
    'id'?: string;
    'onAlertsClose'?: (event: CustomEvent<any>) => void;
    'onAlertsOpen'?: (event: CustomEvent<any>) => void;
  }
  interface CalciteExample extends JSXBase.HTMLAttributes<HTMLCalciteExampleElement> {
    'onOpen'?: (event: CustomEvent<any>) => void;
    'property'?: string;
  }
  interface CalciteLoader extends JSXBase.HTMLAttributes<HTMLCalciteLoaderElement> {
    'isActive'?: boolean;
    'text'?: string;
  }
  interface CalciteProgress extends JSXBase.HTMLAttributes<HTMLCalciteProgressElement> {
    'reversed'?: boolean;
    'text'?: string;
    'type'?: "indeterminate" | "determinate";
    'value'?: number;
  }
  interface CalciteSwitch extends JSXBase.HTMLAttributes<HTMLCalciteSwitchElement> {
    'color'?: "red" | "blue";
    'name'?: string;
    'onCalciteSwitchChange'?: (event: CustomEvent<any>) => void;
    'switched'?: boolean;
    'value'?: string;
  }
  interface CalciteTab extends JSXBase.HTMLAttributes<HTMLCalciteTabElement> {
    'id'?: string;
    'isActive'?: boolean;
    'onCalciteTabsRegisterTab'?: (event: CustomEvent<TabRegisterEventDetail>) => void;
    'tab'?: string;
  }
  interface CalciteTabNav extends JSXBase.HTMLAttributes<HTMLCalciteTabNavElement> {
    'id'?: string;
    'onCalciteTabChange'?: (event: CustomEvent<TabChangeEventDetail>) => void;
    'selectedTab'?: number | string;
    'storageId'?: string;
    'syncId'?: string;
  }
  interface CalciteTabTitle extends JSXBase.HTMLAttributes<HTMLCalciteTabTitleElement> {
    'id'?: string;
    'isActive'?: boolean;
    'onCalciteTabsActivate'?: (event: CustomEvent<TabChangeEventDetail>) => void;
    'onCalciteTabsFocusNext'?: (event: CustomEvent<any>) => void;
    'onCalciteTabsFocusPrevious'?: (event: CustomEvent<any>) => void;
    'onCalciteTabsRegisterTitle'?: (event: CustomEvent<TabRegisterEventDetail>) => void;
    'tab'?: string;
  }
  interface CalciteTabs extends JSXBase.HTMLAttributes<HTMLCalciteTabsElement> {
    'layout'?: "center" | "inline";
    'theme'?: "light" | "dark";
  }

  interface IntrinsicElements {
    'calcite-alert': CalciteAlert;
    'calcite-alerts': CalciteAlerts;
    'calcite-example': CalciteExample;
    'calcite-loader': CalciteLoader;
    'calcite-progress': CalciteProgress;
    'calcite-switch': CalciteSwitch;
    'calcite-tab': CalciteTab;
    'calcite-tab-nav': CalciteTabNav;
    'calcite-tab-title': CalciteTabTitle;
    'calcite-tabs': CalciteTabs;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


