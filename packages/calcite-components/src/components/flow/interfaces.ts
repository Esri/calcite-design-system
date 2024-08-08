export type FlowDirection = "advancing" | "retreating";

export type FlowItemLike = Pick<
  HTMLCalciteFlowItemElement,
  "beforeBack" | "menuOpen" | "setFocus" | "showBackButton" | "selected"
>;

export type FlowItemLikeElement = FlowItemLike & HTMLElement;
