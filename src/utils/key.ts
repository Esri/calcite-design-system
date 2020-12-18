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
