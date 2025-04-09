import { Platform } from "../build/utils/enums.js";

export type Stylesheet = Extract<Platform, "css" | "scss">;
export type RegisterFn = () => void;
