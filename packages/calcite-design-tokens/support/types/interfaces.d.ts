import StyleDictionary from "style-dictionary";

export type RegisterFn = (sd: typeof StyleDictionary) => Promise<void>;
