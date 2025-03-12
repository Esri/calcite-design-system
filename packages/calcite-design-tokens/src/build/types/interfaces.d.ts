import StyleDictionary from "style-dictionary";

export type Stylesheet = "css" | "scss";
export type RegisterFn = (sd: typeof StyleDictionary) => Promise<void>;
