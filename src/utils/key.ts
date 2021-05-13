/**
 * Standardize key property of keyboard event (mostly for ie11)
 */
export function getKey(key: string, dir?: "rtl" | "ltr"): string {
  const lookup = {
    Up: "ArrowUp",
    Down: "ArrowDown",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Spacebar: " ",
    Esc: "Escape"
  };
  const adjustedKey = lookup[key] || key;
  const isRTL = dir === "rtl";

  if (isRTL && adjustedKey === "ArrowLeft") {
    return "ArrowRight";
  }

  if (isRTL && adjustedKey === "ArrowRight") {
    return "ArrowLeft";
  }

  return adjustedKey;
}

export const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const letterKeys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
