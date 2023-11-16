import { resolve, join } from "path";

export function setStringInObjectToPath<T>(object: T, dir?: string): T {
  const obj = Object.entries(object).reduce((acc, [key, v]) => {
    acc[key] = typeof v === "string" ? resolve(dir || "", v) : setStringInObjectToPath(v, join(dir, key));
    return acc;
  }, {} as T);

  return obj;
}
