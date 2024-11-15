import type { FlowItem } from "../flow-item/flow-item";

export type FlowDirection = "advancing" | "retreating" | "standby";

export type FlowItemLike = Pick<FlowItem["el"], "beforeBack" | "menuOpen" | "setFocus" | "showBackButton" | "selected">;

export type FlowItemLikeElement = FlowItemLike & HTMLElement;
