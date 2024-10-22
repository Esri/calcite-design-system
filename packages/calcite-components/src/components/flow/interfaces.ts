import type { FlowItem } from "../flow-item/flow-item";

export type FlowDirection = "advancing" | "retreating";

export type FlowItemLike = Pick<FlowItem["el"], "beforeBack" | "menuOpen" | "setFocus" | "showBackButton">;

export type FlowItemLikeElement = FlowItemLike & HTMLElement;
