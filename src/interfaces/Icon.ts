import { Scale as AllScales} from "./common";

export type Scale = Extract<AllScales, "s" | "m" | "l">
