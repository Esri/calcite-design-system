export type FlowDirection = "advancing" | "retreating";

export type FlowItemLike = Pick<HTMLCalciteFlowItemElement, "beforeBack" | "menuOpen" | "setFocus" | "showBackButton">;

export type FlowItemLikeElement = FlowItemLike & HTMLElement;
