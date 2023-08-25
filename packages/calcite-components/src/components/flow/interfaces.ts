export type FlowDirection = "advancing" | "retreating";

export type FlowItemLikeElement = Pick<
  HTMLCalciteFlowItemElement,
  "beforeBack" | "menuOpen" | "setFocus" | "showBackButton"
> &
  HTMLElement;
