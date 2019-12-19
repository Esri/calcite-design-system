import { getElementDir } from "../utils/dom";
export function getPlacement(el, placement) {
    const values = ["left", "right"];
    if (getElementDir(el) === "rtl") {
        values.reverse();
    }
    return placement
        .replace(/leading/gi, values[0])
        .replace(/trailing/gi, values[1]);
}
