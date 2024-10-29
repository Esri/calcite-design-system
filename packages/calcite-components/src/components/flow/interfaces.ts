export type FlowDirection = "advancing" | "retreating" | "standby";

export type FlowItemLike = Pick<
  HTMLCalciteFlowItemElement,
  "beforeBack" | "menuOpen" | "setFocus" | "showBackButton" | "selected"
>;

export type FlowItemLikeElement = FlowItemLike & HTMLElement;
